// /api/ai/* — AI-ментор: ревью эссе, упаковщик CV, FAQ-бот.
// Все функции только для вошедших и считаются в дневной лимит пользователя.
import { Hono, type Context } from 'hono';
import type { AiQuota, CvPack, EssayReview, FaqAnswer } from '../src/api/types';
import { searchKb } from '../src/data/kb';
import { AiUnavailableError, chat, parseJsonObject, refundUserRequest, reserveUserRequest, userDailyLimit, userUsage, type ChatInput } from './ai';
import { fail, readJson, requireUser, type AppEnv } from './http';
import { CV_SYSTEM, ESSAY_SYSTEM, FAQ_SYSTEM } from './prompts';

export const aiRoutes = new Hono<AppEnv>();
aiRoutes.use(requireUser);

async function quota(c: Context<AppEnv>): Promise<AiQuota> {
  const tomorrow = new Date();
  tomorrow.setUTCHours(24, 0, 0, 0);
  return { used: await userUsage(c.env, c.get('user').id), limit: userDailyLimit(c.env), resetsAt: tomorrow.toISOString() };
}

// Общая обёртка: занять запрос из лимита → вызвать модель → вернуть лимит, если модель не ответила
async function withQuota<T>(c: Context<AppEnv>, input: ChatInput, toResult: (text: string) => T | null) {
  const userId = c.get('user').id;
  if (!(await reserveUserRequest(c.env, userId))) {
    return fail(c, 429, `Твой лимит на сегодня — ${userDailyLimit(c.env)} AI-запросов — закончился. Он обновится в 00:00 UTC.`);
  }
  try {
    const { text, provider } = await chat(c.env, input);
    const result = toResult(text);
    if (!result) {
      await refundUserRequest(c.env, userId);
      return fail(c, 503, 'Модель ответила в неожиданном формате. Попробуй ещё раз — запрос не списан.');
    }
    return c.json({ result, meta: { provider, quota: await quota(c) } });
  } catch (err) {
    await refundUserRequest(c.env, userId);
    if (err instanceof AiUnavailableError) return fail(c, 503, err.message);
    throw err;
  }
}

const clampText = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);

aiRoutes.get('/quota', async (c) => c.json(await quota(c)));

aiRoutes.post('/essay', async (c) => {
  const { text } = await readJson<{ text: string }>(c);
  const essay = String(text ?? '').trim();
  if (essay.length < 300) return fail(c, 400, 'Вставь черновик целиком — хотя бы 300 символов.');
  if (essay.length > 6000) return fail(c, 400, 'Слишком длинно: максимум 6000 символов (~900 слов).');

  return withQuota(c, { system: ESSAY_SYSTEM, user: `Черновик эссе:\n"""\n${essay}\n"""`, maxTokens: 1200, json: true }, (out) => {
    const r = parseJsonObject<EssayReview>(out);
    if (!r || !r.scores || !Array.isArray(r.issues)) return null;
    const score = (n: unknown) => Math.max(0, Math.min(10, Math.round(Number(n) || 0)));
    return {
      scores: { hook: score(r.scores.hook), structure: score(r.scores.structure), specificity: score(r.scores.specificity), future: score(r.scores.future) },
      verdict: clampText(r.verdict, 500),
      issues: r.issues.slice(0, 6).map((i) => ({ quote: clampText(i.quote, 300), problem: clampText(i.problem, 400), fix: clampText(i.fix, 500) })),
      cliches: (r.cliches ?? []).slice(0, 10).map((s) => clampText(s, 120)),
      strengths: (r.strengths ?? []).slice(0, 5).map((s) => clampText(s, 300)),
      betterHook: clampText(r.betterHook, 400),
    } satisfies EssayReview;
  });
});

aiRoutes.post('/cv', async (c) => {
  const { text } = await readJson<{ text: string }>(c);
  const input = String(text ?? '').trim();
  if (input.length < 10) return fail(c, 400, 'Опиши хотя бы одно своё занятие.');
  if (input.length > 2000) return fail(c, 400, 'Максимум 2000 символов — разбей на несколько запросов.');

  return withQuota(c, { system: CV_SYSTEM, user: `Опыт пользователя:\n"""\n${input}\n"""`, maxTokens: 1000, json: true }, (out) => {
    const r = parseJsonObject<CvPack>(out);
    if (!r || !Array.isArray(r.items) || !r.items.length) return null;
    return {
      items: r.items.slice(0, 8).map((i) => ({
        original: clampText(i.original, 300),
        role: clampText(i.role, 120),
        ru: clampText(i.ru, 400),
        en: clampText(i.en, 400),
        skills: (i.skills ?? []).slice(0, 6).map((s) => clampText(s, 60)),
        askForNumber: clampText(i.askForNumber, 300),
      })),
      tips: (r.tips ?? []).slice(0, 3).map((s) => clampText(s, 300)),
    } satisfies CvPack;
  });
});

aiRoutes.post('/faq', async (c) => {
  const { question } = await readJson<{ question: string }>(c);
  const q = String(question ?? '').trim();
  if (q.length < 3) return fail(c, 400, 'Задай вопрос.');
  if (q.length > 500) return fail(c, 400, 'Вопрос слишком длинный — максимум 500 символов.');

  const chunks = searchKb(q);
  const sources = chunks.map((ch) => ({ title: ch.title, path: ch.path }));
  // Нечего показать модели — не тратим лимит, честно отвечаем сами
  if (!chunks.length) {
    return c.json({
      result: { answer: 'В базе AURA пока нет ответа на этот вопрос. Попробуй переформулировать (например, назови страну или документ) или проверь официальный сайт программы.', sources: [] } satisfies FaqAnswer,
      meta: { provider: null, quota: await quota(c) },
    });
  }

  const context = chunks.map((ch, i) => `[${i + 1}] ${ch.title}\n${ch.text}`).join('\n\n').slice(0, 9000);
  return withQuota(c, { system: FAQ_SYSTEM, user: `БАЗА ЗНАНИЙ:\n${context}\n\nВОПРОС: ${q}`, maxTokens: 600 }, (out) =>
    out.trim() ? ({ answer: out.trim(), sources } satisfies FaqAnswer) : null,
  );
});
