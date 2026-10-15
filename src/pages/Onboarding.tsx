import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore, type Profile } from '../store/AppStore';
import './pages.css';

type Option<K extends keyof Profile> = { value: NonNullable<Profile[K]>; label: string; hint?: string };

const degreeOptions: Option<'degree'>[] = [
  { value: 'bachelor', label: 'Бакалавриат', hint: 'После школы' },
  { value: 'master', label: 'Магистратура', hint: 'После бакалавриата' },
];
const stageOptions: Option<'stage'>[] = [
  { value: 'preparing', label: 'Готовлюсь', hint: 'Выбираю страну, учу язык' },
  { value: 'applying', label: 'Подаюсь', hint: 'Собираю документы' },
  { value: 'admitted', label: 'Поступил', hint: 'Виза и переезд' },
];
const fundingOptions: Option<'funding'>[] = [
  { value: 'full', label: 'Полный грант', hint: 'Обучение + стипендия' },
  { value: 'self', label: 'Свой бюджет', hint: 'Скидки и частичные гранты' },
];

const steps = ['Степень', 'Этап', 'Финансирование', 'Баллы'];

function Choice<K extends keyof Profile>({ options, value, onPick }: { options: Option<K>[]; value?: Profile[K]; onPick: (v: NonNullable<Profile[K]>) => void }) {
  return (
    <div className="quiz__options">
      {options.map((o) => (
        <button
          key={String(o.value)}
          className={`quiz__option card ${value === o.value ? 'is-picked' : ''}`}
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
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<Profile>(profile ?? {});

  const pick = <K extends keyof Profile>(key: K) => (v: Profile[K]) => {
    setDraft((d) => ({ ...d, [key]: v }));
    setStep((s) => s + 1);
  };

  const finish = (skipScores = false) => {
    saveProfile(skipScores ? { ...draft, ielts: undefined, gpa: undefined, sat: undefined } : draft);
    navigate('/dashboard');
  };

  return (
    <div className="container quiz">
      <p className="eyebrow">Привет{user ? `, ${user.name}` : ''}!</p>
      <h1 className="landing-h2">Соберём твой план</h1>
      <p className="landing-sub">4 коротких вопроса — и AURA подберёт страны и гранты под тебя.</p>

      <ol className="quiz__progress" aria-label="Шаги квиза">
        {steps.map((s, i) => (
          <li key={s} className={i < step ? 'is-done' : i === step ? 'is-current' : ''}>
            <button onClick={() => i <= step && setStep(i)} disabled={i > step}>
              <span className="badge">{i < step ? '✓' : i + 1}</span> {s}
            </button>
          </li>
        ))}
      </ol>

      <div className="quiz__panel">
        {step === 0 && (<><h2 className="quiz__q">Куда поступаешь?</h2><Choice options={degreeOptions} value={draft.degree} onPick={pick('degree')} /></>)}
        {step === 1 && (<><h2 className="quiz__q">На каком ты этапе?</h2><Choice options={stageOptions} value={draft.stage} onPick={pick('stage')} /></>)}
        {step === 2 && (<><h2 className="quiz__q">Как планируешь платить?</h2><Choice options={fundingOptions} value={draft.funding} onPick={pick('funding')} /></>)}
        {step === 3 && (
          <>
            <h2 className="quiz__q">Текущие баллы</h2>
            <p className="muted">Если ещё не сдавал — пропусти, вернёшься позже.</p>
            <div className="quiz__scores">
              <label>
                <span className="label">IELTS</span>
                <input className="input" inputMode="decimal" placeholder="6.5" value={draft.ielts ?? ''} onChange={(e) => setDraft({ ...draft, ielts: e.target.value })} />
              </label>
              <label>
                <span className="label">GPA / средний балл</span>
                <input className="input" placeholder="4.5 из 5 или 90%" value={draft.gpa ?? ''} onChange={(e) => setDraft({ ...draft, gpa: e.target.value })} />
              </label>
              <label>
                <span className="label">SAT</span>
                <input className="input" inputMode="numeric" placeholder="1350" value={draft.sat ?? ''} onChange={(e) => setDraft({ ...draft, sat: e.target.value })} />
              </label>
            </div>
            <div className="quiz__actions">
              <button className="btn" onClick={() => finish(true)}>Пропустить</button>
              <button className="btn btn--lime btn--lg" onClick={() => finish()}>Собрать дашборд →</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
