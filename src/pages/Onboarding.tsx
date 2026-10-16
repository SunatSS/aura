import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n/I18n';
import { useStore, type Profile } from '../store/AppStore';
import './pages.css';

type Option<K extends keyof Profile> = { value: NonNullable<Profile[K]>; label: string; hint?: string };

// Варианты ответа из словаря: { bachelor: ['Бакалавриат', 'После школы'], ... }
const toOptions = <K extends keyof Profile>(map: Record<string, string[]>) =>
  Object.entries(map).map(([value, [label, hint]]) => ({ value, label, hint }) as Option<K>);

function Choice<K extends keyof Profile>({ options, value, onPick }: { options: Option<K>[]; value?: Profile[K]; onPick: (v: NonNullable<Profile[K]>) => void }) {
  return (
    <div className="quiz__options">
      {options.map((o) => (
        <button
          key={String(o.value)}
          className={`quiz__option card ${value === o.value ? 'is-picked' : ''}`}
          aria-pressed={value === o.value}
          onClick={() => onPick(o.value)}
        >
          <strong>{o.label}</strong>
          {o.hint && <span>{o.hint}</span>}
        </button>
      ))}
    </div>
  );
}

export default function Onboarding() {
  const { profile, saveProfile, user } = useStore();
  const navigate = useNavigate();
  const { t, path } = useI18n();
  const Q = t.quiz;
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Profile>(profile ?? {});

  const pick = <K extends keyof Profile>(key: K) => (v: Profile[K]) => {
    setDraft((d) => ({ ...d, [key]: v }));
    setStep((s) => s + 1);
  };

  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const finish = async (skipScores = false) => {
    setBusy(true);
    const err = await saveProfile(skipScores ? { ...draft, ielts: undefined, gpa: undefined, sat: undefined } : draft);
    setBusy(false);
    if (err) setError(err);
    else navigate(path('/dashboard'));
  };

  return (
    <div className="container quiz">
      <p className="eyebrow">{Q.hello(user?.name)}</p>
      <h1 className="landing-h2">{Q.title}</h1>
      <p className="landing-sub">{Q.sub}</p>

      <ol className="quiz__progress" aria-label={Q.stepsLabel}>
        {Q.steps.map((s, i) => (
          <li key={s} className={i < step ? 'is-done' : i === step ? 'is-current' : ''} aria-current={i === step ? 'step' : undefined}>
            <button onClick={() => i <= step && setStep(i)} disabled={i > step}>
              <span className="badge" aria-hidden="true">{i < step ? '✓' : i + 1}</span> {s}
              {i < step && <span className="visually-hidden">{Q.done}</span>}
            </button>
          </li>
        ))}
      </ol>

      <div className="quiz__panel">
        {step === 0 && (<><h2 className="quiz__q">{Q.qDegree}</h2><Choice options={toOptions<'degree'>(Q.degree)} value={draft.degree} onPick={pick('degree')} /></>)}
        {step === 1 && (<><h2 className="quiz__q">{Q.qStage}</h2><Choice options={toOptions<'stage'>(Q.stage)} value={draft.stage} onPick={pick('stage')} /></>)}
        {step === 2 && (<><h2 className="quiz__q">{Q.qFunding}</h2><Choice options={toOptions<'funding'>(Q.funding)} value={draft.funding} onPick={pick('funding')} /></>)}
        {step === 3 && (
          <>
            <h2 className="quiz__q">{Q.qScores}</h2>
            <p className="muted">{Q.scoresHint}</p>
            <div className="quiz__scores">
              <label>
                <span className="label">IELTS</span>
                <input className="input" inputMode="decimal" placeholder="6.5" value={draft.ielts ?? ''} onChange={(e) => setDraft({ ...draft, ielts: e.target.value })} />
              </label>
              <label>
                <span className="label">{Q.gpa}</span>
                <input className="input" placeholder={Q.gpaPlaceholder} value={draft.gpa ?? ''} onChange={(e) => setDraft({ ...draft, gpa: e.target.value })} />
              </label>
              <label>
                <span className="label">SAT</span>
                <input className="input" inputMode="numeric" placeholder="1350" value={draft.sat ?? ''} onChange={(e) => setDraft({ ...draft, sat: e.target.value })} />
              </label>
            </div>
            {error && <p className="auth__error" role="alert">{error}</p>}
            <div className="quiz__actions">
              <button className="btn" disabled={busy} onClick={() => finish(true)}>{Q.skip}</button>
              <button className="btn btn--lime btn--lg" disabled={busy} onClick={() => finish()}>
                {busy ? Q.saving : Q.finish}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
