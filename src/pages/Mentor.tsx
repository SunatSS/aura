import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api, ApiError } from '../api/client';
import type { AiQuota, CvPack, EssayReview, FaqAnswer } from '../api/types';
import { Rich } from '../components/content/ContentPageView';
import './mentor.css';

type Tab = 'essay' | 'cv' | 'faq';

const tabs: { id: Tab; title: string; hint: string }[] = [
  { id: 'essay', title: 'Ревью эссе', hint: 'Найдёт воду, штампы и слабую структуру' },
  { id: 'cv', title: 'Упаковщик CV', hint: 'Переведёт опыт на академический язык' },
  { id: 'faq', title: 'Бюрократ', hint: 'Ответит по базе AURA: документы, сроки, гранты' },
];

const CV_EXAMPLE = 'Я староста, собирал деньги на нужды класса и играю в майнкрафт. Ещё помогаю маме в магазине по выходным.';
const FAQ_EXAMPLES = ['Как легализовать аттестат для Кореи?', 'Что такое CSS Profile?', 'Какие документы нужны для Türkiye Burslari?'];

// Общий хук запроса к AI: состояние загрузки, ошибка, обновление лимита
function useAi<T>(onQuota: (q: AiQuota) => void) {
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const run = async (call: () => Promise<{ result: T; meta: { quota: AiQuota } }>) => {
    setBusy(true);
    setError(null);
    try {
      const r = await call();
      setResult(r.result);
      onQuota(r.meta.quota);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Что-то пошло не так.');
    } finally {
      setBusy(false);
    }
  };
  return { result, error, busy, run };
}

function Status({ busy, error, label }: { busy: boolean; error: string | null; label: string }) {
  if (busy) return <p className="ai-status" aria-live="polite">{label}</p>;
  if (error) return <p className="ai-error" role="alert">{error}</p>;
  return null;
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="score">
      <span>{label}</span>
      <div className="score__bar"><div style={{ width: `${value * 10}%` }} /></div>
      <strong>{value}/10</strong>
    </div>
  );
}

function EssayTab({ onQuota }: { onQuota: (q: AiQuota) => void }) {
  const [text, setText] = useState('');
  const { result, error, busy, run } = useAi<EssayReview>(onQuota);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    run(() => api.reviewEssay(text));
  };

  return (
    <div className="ai-grid">
      <form className="ai-form card" onSubmit={submit}>
        <label className="label" htmlFor="essay">Вставь черновик мотивационного эссе</label>
        <textarea id="essay" className="input ai-textarea" rows={14} maxLength={6000} value={text} onChange={(e) => setText(e.target.value)}
          placeholder="С самого детства я мечтал…" />
        <div className="ai-form__foot">
          <small className="muted">{text.length} / 6000 · минимум 300</small>
          <button className="btn btn--lime" disabled={busy || text.trim().length < 300}>{busy ? 'Читаю…' : 'Разобрать эссе'}</button>
        </div>
        <p className="ai-note">Разбор строится по методике из гайда <Link to="/guides/essay">«Как написать мотивационное эссе»</Link>. Проверяй советы своей головой — AI может ошибаться.</p>
      </form>

      <div className="ai-result">
        <Status busy={busy} error={error} label="AI читает эссе — это займёт 10–30 секунд…" />
        {result && !busy && (
          <>
            <div className="card ai-card">
              <h3>Вердикт</h3>
              <p>{result.verdict}</p>
              <div className="scores">
                <ScoreBar label="Крючок" value={result.scores.hook} />
                <ScoreBar label="Структура STAR" value={result.scores.structure} />
                <ScoreBar label="Конкретика" value={result.scores.specificity} />
                <ScoreBar label="Вектор будущего" value={result.scores.future} />
              </div>
            </div>
            {result.issues.map((i, n) => (
              <div key={n} className="card ai-card ai-issue">
                <span className="badge badge--orange">{n + 1}</span>
                <div>
                  {i.quote && <blockquote>«{i.quote}»</blockquote>}
                  <p><strong>Проблема:</strong> {i.problem}</p>
                  <p><strong>Как исправить:</strong> {i.fix}</p>
                </div>
              </div>
            ))}
            {result.betterHook && (
              <div className="c-callout c-callout--purple">Попробуй начать так: «{result.betterHook}»</div>
            )}
            {(result.cliches.length > 0 || result.strengths.length > 0) && (
              <div className="ai-two">
                {result.cliches.length > 0 && (
                  <div className="c-compare__item c-compare__item--bad">
                    <span className="tag tag--red">Вода и штампы</span>
                    <ul>{result.cliches.map((s) => <li key={s}>{s}</li>)}</ul>
                  </div>
                )}
                {result.strengths.length > 0 && (
                  <div className="c-compare__item c-compare__item--good">
                    <span className="tag">Уже работает</span>
                    <ul>{result.strengths.map((s) => <li key={s}>{s}</li>)}</ul>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function CvTab({ onQuota }: { onQuota: (q: AiQuota) => void }) {
  const [text, setText] = useState('');
  const { result, error, busy, run } = useAi<CvPack>(onQuota);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    run(() => api.packCv(text));
  };

  return (
    <div className="ai-grid">
      <form className="ai-form card" onSubmit={submit}>
        <label className="label" htmlFor="cv">Опиши, чем занимаешься, обычными словами</label>
        <textarea id="cv" className="input ai-textarea" rows={8} maxLength={2000} value={text} onChange={(e) => setText(e.target.value)}
          placeholder={CV_EXAMPLE} />
        <div className="ai-form__foot">
          <button type="button" className="btn btn--sm" onClick={() => setText(CV_EXAMPLE)}>Вставить пример</button>
          <button className="btn btn--lime" disabled={busy || text.trim().length < 10}>{busy ? 'Упаковываю…' : 'Упаковать в CV'}</button>
        </div>
        <p className="ai-note">Пиши как есть — подработка, хобби, игры и помощь семье тоже опыт. AI не добавит того, чего ты не делал.</p>
      </form>

      <div className="ai-result">
        <Status busy={busy} error={error} label="Перевожу на академический язык…" />
        {result && !busy && (
          <>
            {result.items.map((i, n) => (
              <div key={n} className="card ai-card">
                {i.original && <p className="muted ai-original">«{i.original}»</p>}
                <h3 className="ai-role">{i.role}</h3>
                <p>{i.ru}</p>
                <p className="ai-en">{i.en}</p>
                {i.skills.length > 0 && <div className="ai-skills">{i.skills.map((s) => <span key={s} className="chip">{s}</span>)}</div>}
                {i.askForNumber && <p className="ai-ask">🔢 Уточни цифру: {i.askForNumber}</p>}
              </div>
            ))}
            {result.tips.length > 0 && (
              <div className="c-note">
                <p><strong>Что ещё добавить в CV</strong></p>
                <ol>{result.tips.map((t) => <li key={t}>{t}</li>)}</ol>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

type FaqMessage = { q: string; a?: FaqAnswer; error?: string };

function FaqTab({ onQuota }: { onQuota: (q: AiQuota) => void }) {
  const [question, setQuestion] = useState('');
  const [log, setLog] = useState<FaqMessage[]>([]);
  const [busy, setBusy] = useState(false);

  const ask = async (q: string) => {
    if (!q.trim() || busy) return;
    setQuestion('');
    setBusy(true);
    setLog((l) => [...l, { q }]);
    try {
      const r = await api.askFaq(q);
      onQuota(r.meta.quota);
      setLog((l) => l.map((m, i) => (i === l.length - 1 ? { ...m, a: r.result } : m)));
    } catch (e) {
      const error = e instanceof ApiError ? e.message : 'Что-то пошло не так.';
      setLog((l) => l.map((m, i) => (i === l.length - 1 ? { ...m, error } : m)));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="faq card">
      <div className="faq__log" aria-live="polite">
        {log.length === 0 && (
          <div className="faq__empty">
            <p>Спроси про документы, сроки, гранты или страны. Бюрократ отвечает только по базе AURA — если ответа там нет, он так и скажет.</p>
            <div className="faq__examples">
              {FAQ_EXAMPLES.map((q) => <button key={q} className="chip" onClick={() => ask(q)}>{q}</button>)}
            </div>
          </div>
        )}
        {log.map((m, i) => (
          <div key={i} className="faq__pair">
            <p className="faq__q">{m.q}</p>
            {m.a ? (
              <div className="faq__a">
                <p className="faq__text"><Rich text={m.a.answer} /></p>
                {m.a.sources.length > 0 && (
                  <p className="faq__sources">
                    Источники: {m.a.sources.map((s, n) => <Link key={n} to={s.path}>{s.title}</Link>)}
                  </p>
                )}
              </div>
            ) : m.error ? (
              <p className="ai-error">{m.error}</p>
            ) : (
              <p className="ai-status">Ищу в базе…</p>
            )}
          </div>
        ))}
      </div>
      <form className="faq__form" onSubmit={(e) => { e.preventDefault(); ask(question); }}>
        <input className="input" maxLength={500} placeholder="Где ставить апостиль?" value={question} onChange={(e) => setQuestion(e.target.value)} aria-label="Вопрос" />
        <button className="btn btn--lime" disabled={busy || question.trim().length < 3}>Спросить</button>
      </form>
    </div>
  );
}

export default function Mentor() {
  const [params, setParams] = useSearchParams();
  const tab = (tabs.find((t) => t.id === params.get('tab'))?.id ?? 'essay') as Tab;
  const [quota, setQuota] = useState<AiQuota | null>(null);

  useEffect(() => {
    api.aiQuota().then(setQuota).catch(() => undefined);
  }, []);

  const panels: Record<Tab, ReactNode> = {
    essay: <EssayTab onQuota={setQuota} />,
    cv: <CvTab onQuota={setQuota} />,
    faq: <FaqTab onQuota={setQuota} />,
  };

  return (
    <div className="container page">
      <p className="eyebrow">AI-ментор</p>
      <div className="mentor__head">
        <h1 className="landing-h2">Личный ментор без агентства</h1>
        {quota && (
          <div className="quota card" title="Лимит обновляется каждый день в 00:00 UTC">
            <strong>{Math.max(quota.limit - quota.used, 0)}</strong>
            <span>из {quota.limit} запросов<br />осталось сегодня</span>
          </div>
        )}
      </div>
      <p className="landing-sub">Бесплатные модели, честные советы. AURA не сохраняет тексты, которые ты сюда вставляешь.</p>

      <div className="mentor__tabs" role="tablist">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} className={`mentor__tab card ${tab === t.id ? 'is-active' : ''}`}
            onClick={() => setParams({ tab: t.id }, { replace: true })}>
            <strong>{t.title}</strong>
            <span>{t.hint}</span>
          </button>
        ))}
      </div>

      {panels[tab]}
    </div>
  );
}
