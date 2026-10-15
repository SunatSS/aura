// Вызов моделей с учётом лимитов.
// Основной провайдер — Workers AI (бесплатно 10 000 нейронов в день на аккаунт).
// Резерв — Gemini API, если задан секрет GEMINI_API_KEY: используется, когда дневной
// бюджет Workers AI исчерпан или Workers AI ответил ошибкой.

export type ChatInput = { system: string; user: string; maxTokens: number; json?: boolean };
export type ChatResult = { text: string; provider: 'workers-ai' | 'gemini' };

export class AiUnavailableError extends Error {}

export const utcDay = () => new Date().toISOString().slice(0, 10);

const num = (v: string | undefined, fallback: number) => {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

// ---------- Лимит на пользователя ----------

export const userDailyLimit = (env: Env) => num(env.AI_USER_DAILY_LIMIT, 15);

export async function userUsage(env: Env, userId: string) {
  const row = await env.DB.prepare('SELECT requests FROM ai_user_usage WHERE user_id = ? AND day = ?')
    .bind(userId, utcDay())
    .first<{ requests: number }>();
  return row?.requests ?? 0;
}

// Атомарно занимает один запрос из дневного лимита. false — лимит исчерпан.
export async function reserveUserRequest(env: Env, userId: string) {
  const row = await env.DB.prepare(
    `INSERT INTO ai_user_usage (user_id, day, requests) VALUES (?, ?, 1)
     ON CONFLICT(user_id, day) DO UPDATE SET requests = requests + 1 WHERE requests < ?
     RETURNING requests`,
  )
    .bind(userId, utcDay(), userDailyLimit(env))
    .first<{ requests: number }>();
  return row !== null;
}

// Возврат запроса, если модель так и не ответила
export async function refundUserRequest(env: Env, userId: string) {
  await env.DB.prepare('UPDATE ai_user_usage SET requests = MAX(requests - 1, 0) WHERE user_id = ? AND day = ?')
    .bind(userId, utcDay())
    .run();
}

// ---------- Общий бюджет нейронов ----------

async function neuronsUsed(env: Env) {
  const row = await env.DB.prepare('SELECT neurons FROM ai_daily_budget WHERE day = ?').bind(utcDay()).first<{ neurons: number }>();
  return row?.neurons ?? 0;
}

async function recordRun(env: Env, provider: ChatResult['provider'], neurons: number) {
  await env.DB.prepare(
    `INSERT INTO ai_daily_budget (day, neurons, workers_ai_runs, gemini_runs) VALUES (?, ?, ?, ?)
     ON CONFLICT(day) DO UPDATE SET neurons = neurons + excluded.neurons,
       workers_ai_runs = workers_ai_runs + excluded.workers_ai_runs, gemini_runs = gemini_runs + excluded.gemini_runs`,
  )
    .bind(utcDay(), neurons, provider === 'workers-ai' ? 1 : 0, provider === 'gemini' ? 1 : 0)
    .run();
}

// Грубая оценка токенов, чтобы заранее не выйти за бюджет: ~3 символа на токен для русского текста
const estimateTokens = (s: string) => Math.ceil(s.length / 3);

function neuronCost(env: Env, inputTokens: number, outputTokens: number) {
  return (inputTokens * num(env.AI_NEURONS_PER_M_INPUT, 9091) + outputTokens * num(env.AI_NEURONS_PER_M_OUTPUT, 27273)) / 1_000_000;
}

// ---------- Провайдеры ----------

type WorkersAiResponse = {
  response?: string;
  choices?: { message?: { content?: string } }[];
  usage?: { prompt_tokens?: number; completion_tokens?: number };
};

async function runWorkersAi(env: Env, input: ChatInput) {
  const res = (await env.AI.run(env.AI_MODEL as Parameters<Ai['run']>[0], {
    messages: [
      { role: 'system', content: input.system },
      { role: 'user', content: input.user },
    ],
    max_tokens: input.maxTokens,
    temperature: 0.4,
    // размышления модели тоже тратят токены — для наших задач они не нужны
    chat_template_kwargs: { enable_thinking: false },
  } as never)) as WorkersAiResponse;

  const text = res.choices?.[0]?.message?.content ?? res.response ?? '';
  const inTok = res.usage?.prompt_tokens ?? estimateTokens(input.system + input.user);
  const outTok = res.usage?.completion_tokens ?? estimateTokens(text);
  return { text, neurons: neuronCost(env, inTok, outTok) };
}

async function runGemini(env: Env, input: ChatInput) {
  const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${env.GEMINI_MODEL}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY! },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: input.system }] },
      contents: [{ role: 'user', parts: [{ text: input.user }] }],
      generationConfig: {
        maxOutputTokens: input.maxTokens,
        temperature: 0.4,
        ...(input.json ? { responseMimeType: 'application/json' } : {}),
      },
    }),
    signal: AbortSignal.timeout(30_000),
  });
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = (await res.json()) as { candidates?: { content?: { parts?: { text?: string }[] } }[] };
  return data.candidates?.[0]?.content?.parts?.map((p) => p.text ?? '').join('') ?? '';
}

export async function chat(env: Env, input: ChatInput): Promise<ChatResult> {
  const budget = num(env.AI_DAILY_NEURON_BUDGET, 9000);
  const worstCase = neuronCost(env, estimateTokens(input.system + input.user), input.maxTokens);
  const hasGemini = Boolean(env.GEMINI_API_KEY);

  if ((await neuronsUsed(env)) + worstCase <= budget) {
    try {
      const { text, neurons } = await runWorkersAi(env, input);
      await recordRun(env, 'workers-ai', neurons);
      if (text.trim()) return { text, provider: 'workers-ai' };
    } catch (err) {
      console.error('Workers AI failed', err);
      if (!hasGemini) throw new AiUnavailableError('AI сейчас недоступен, попробуй через пару минут.');
    }
  }

  if (!hasGemini) throw new AiUnavailableError('Дневной лимит AI на всю платформу исчерпан — он обновится в 00:00 UTC.');

  try {
    const text = await runGemini(env, input);
    await recordRun(env, 'gemini', 0);
    return { text, provider: 'gemini' };
  } catch (err) {
    console.error('Gemini failed', err);
    throw new AiUnavailableError('AI сейчас недоступен, попробуй через пару минут.');
  }
}

// Модели иногда оборачивают JSON в ```json … ``` или добавляют текст вокруг
export function parseJsonObject<T>(text: string): T | null {
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start === -1 || end <= start) return null;
  try {
    return JSON.parse(text.slice(start, end + 1)) as T;
  } catch {
    return null;
  }
}
