import { useEffect, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api, ApiError } from '../api/client';
import type { AiQuota, CvPack, EssayReview, FaqAnswer } from '../api/types';
import { Rich } from '../components/content/ContentPageView';
import { useI18n } from '../i18n/I18n';
import './mentor.css';

type Tab = 'essay' | 'cv' | 'faq';

const tabs: { id: Tab }[] = [{ id: 'essay' }, { id: 'cv' }, { id: 'faq' }];

// Общий хук запроса к AI: состояние загрузки, ошибка, обновление лимита
function useAi<T>(onQuota: (q: AiQuota) => void) {
  const { t } = useI18n();
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
      setError(e instanceof ApiError ? e.message : t.common.error);
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
      <div className="score__bar" role="meter" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={10}>
        <div style={{ width: `${value * 10}%` }} />
      </div>
      <strong aria-hidden="true">{value}/10</strong>
    </div>
  );
}

function EssayTab({ onQuota }: { onQuota: (q: AiQuota) => void }) {
  const { t, path } = useI18n();
  const M = t.mentor;
  const [text, setText] = useState('');
  const { result, error, busy, run } = useAi<EssayReview>(onQuota);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    run(() => api.reviewEssay(text));
  };

  return (
    <div className="ai-grid">
      <form className="ai-form card" onSubmit={submit}>
        <label className="label" htmlFor="essay">{M.essayLabel}</label>
        <textarea id="essay" className="input ai-textarea" rows={14} maxLength={6000} value={text} onChange={(e) => setText(e.target.value)}
          placeholder={M.essayPlaceholder} />
        <div className="ai-form__foot">
          <small className="muted">{M.essayCount(text.length)}</small>
          <button className="btn btn--lime" disabled={busy || text.trim().length < 300}>{busy ? M.essayBusy : M.essayButton}</button>
        </div>
        <p className="ai-note">{M.essayNotePre} <Link to={path('/guides/essay')}>{M.essayNoteLink}</Link>{M.essayNotePost}</p>
      </form>

      <div className="ai-result">
        <Status busy={busy} error={error} label={M.essayStatus} />
        {result && !busy && (
          <>
            <div className="card ai-card">
              <h3>{M.verdict}</h3>
              <p>{result.verdict}</p>
              <div className="scores">
                <ScoreBar label={M.scores.hook} value={result.scores.hook} />
                <ScoreBar label={M.scores.structure} value={result.scores.structure} />
                <ScoreBar label={M.scores.specificity} value={result.scores.specificity} />
                <ScoreBar label={M.scores.future} value={result.scores.future} />
              </div>
            </div>
            {result.issues.map((i, n) => (
              <div key={n} className="card ai-card ai-issue">
                <span className="badge badge--orange">{n + 1}</span>
                <div>
                  {i.quote && <blockquote>«{i.quote}»</blockquote>}
                  <p><strong>{M.problem}</strong> {i.problem}</p>
                  <p><strong>{M.fix}</strong> {i.fix}</p>
                </div>
              </div>
            ))}
            {result.betterHook && (
              <div className="c-callout c-callout--purple">{M.betterHook(result.betterHook)}</div>
            )}
            {(result.cliches.length > 0 || result.strengths.length > 0) && (
              <div className="ai-two">
                {result.cliches.length > 0 && (
                  <div className="c-compare__item c-compare__item--bad">
                    <span className="tag tag--red">{M.cliches}</span>
                    <ul>{result.cliches.map((s) => <li key={s}>{s}</li>)}</ul>
                  </div>
                )}
                {result.strengths.length > 0 && (
                  <div className="c-compare__item c-compare__item--good">
                    <span className="tag">{M.strengths}</span>
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
  const { t } = useI18n();
  const M = t.mentor;
  const [text, setText] = useState('');
  const { result, error, busy, run } = useAi<CvPack>(onQuota);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    run(() => api.packCv(text));
  };

  return (
    <div className="ai-grid">
      <form className="ai-form card" onSubmit={submit}>
        <label className="label" htmlFor="cv">{M.cvLabel}</label>
        <textarea id="cv" className="input ai-textarea" rows={8} maxLength={2000} value={text} onChange={(e) => setText(e.target.value)}
          placeholder={M.cvExample} />
        <div className="ai-form__foot">
          <button type="button" className="btn btn--sm" onClick={() => setText(M.cvExample)}>{M.cvExampleButton}</button>
          <button className="btn btn--lime" disabled={busy || text.trim().length < 10}>{busy ? M.cvBusy : M.cvButton}</button>
        </div>
        <p className="ai-note">{M.cvNote}</p>
      </form>

      <div className="ai-result">
        <Status busy={busy} error={error} label={M.cvStatus} />
        {result && !busy && (
          <>
            {result.items.map((i, n) => (
              <div key={n} className="card ai-card">
                {i.original && <p className="muted ai-original">«{i.original}»</p>}
                <h3 className="ai-role">{i.role}</h3>
                <p>{i.ru}</p>
                <p className="ai-en">{i.en}</p>
                {i.skills.length > 0 && <div className="ai-skills">{i.skills.map((s) => <span key={s} className="chip">{s}</span>)}</div>}
                {i.askForNumber && <p className="ai-ask">{M.askNumber(i.askForNumber)}</p>}
              </div>
            ))}
            {result.tips.length > 0 && (
              <div className="c-note">
                <p><strong>{M.cvTips}</strong></p>
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
  const { t, path } = useI18n();
  const M = t.mentor;
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
      const error = e instanceof ApiError ? e.message : t.common.error;
      setLog((l) => l.map((m, i) => (i === l.length - 1 ? { ...m, error } : m)));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="faq card">
      <div className="faq__log" aria-live="polite" aria-label={M.faqLog} role="log">
        {log.length === 0 && (
          <div className="faq__empty">
            <p>{M.faqIntro}</p>
            <div className="faq__examples">
              {M.faqExamples.map((q) => <button key={q} className="chip" onClick={() => ask(q)}>{q}</button>)}
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
                    {M.faqSources} {m.a.sources.map((s, n) => <Link key={n} to={path(s.path)}>{s.title}</Link>)}
                  </p>
                )}
              </div>
            ) : m.error ? (
              <p className="ai-error">{m.error}</p>
            ) : (
              <p className="ai-status">{M.faqSearching}</p>
            )}
          </div>
        ))}
      </div>
      <form className="faq__form" onSubmit={(e) => { e.preventDefault(); ask(question); }}>
        <input className="input" maxLength={500} placeholder={M.faqPlaceholder} value={question} onChange={(e) => setQuestion(e.target.value)} aria-label={M.faqLabel} />
        <button className="btn btn--lime" disabled={busy || question.trim().length < 3}>{M.faqButton}</button>
      </form>
    </div>
  );
}

export default function Mentor() {
  const [params, setParams] = useSearchParams();
  const { t } = useI18n();
  const M = t.mentor;
  const tab = (tabs.find((x) => x.id === params.get('tab'))?.id ?? 'essay') as Tab;
  const [quota, setQuota] = useState<AiQuota | null>(null);

  useEffect(() => {
    api.aiQuota().then(setQuota).catch(() => undefined);
  }, []);

  const select = (id: Tab) => setParams({ tab: id }, { replace: true });

  // Стрелки влево/вправо переключают вкладки (паттерн WAI-ARIA Tabs)
  const onTabKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = tabs.findIndex((x) => x.id === tab);
    const next = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? i + 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? i - 1 : null;
    if (next === null) return;
    e.preventDefault();
    const nt = tabs[(next + tabs.length) % tabs.length];
    select(nt.id);
    document.getElementById(`tab-${nt.id}`)?.focus();
  };

  const panels: Record<Tab, ReactNode> = {
    essay: <EssayTab onQuota={setQuota} />,
    cv: <CvTab onQuota={setQuota} />,
    faq: <FaqTab onQuota={setQuota} />,
  };

  return (
    <div className="container page">
      <p className="eyebrow">{M.eyebrow}</p>
      <div className="mentor__head">
        <h1 className="landing-h2">{M.title}</h1>
        {quota && (
          <div className="quota card" title={M.quotaTitle} role="status">
            <strong>{Math.max(quota.limit - quota.used, 0)}</strong>
            <span>{M.quotaText(quota.limit)}<br />{M.quotaToday}</span>
          </div>
        )}
      </div>
      <p className="landing-sub">{M.sub}</p>

      <div className="mentor__tabs" role="tablist" aria-label={M.tabsLabel} onKeyDown={onTabKey}>
        {tabs.map((tb) => (
          <button
            key={tb.id}
            id={`tab-${tb.id}`}
            role="tab"
            aria-selected={tab === tb.id}
            aria-controls={`panel-${tb.id}`}
            tabIndex={tab === tb.id ? 0 : -1}
            className={`mentor__tab card ${tab === tb.id ? 'is-active' : ''}`}
            onClick={() => select(tb.id)}
          >
            <strong>{M.tabs[tb.id][0]}</strong>
            <span>{M.tabs[tb.id][1]}</span>
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`panel-${tab}`} aria-labelledby={`tab-${tab}`}>
        {panels[tab]}
      </div>
    </div>
  );
}
