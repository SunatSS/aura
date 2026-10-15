import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flag } from '../components/CountryCard';
import { countryById, docsFor, type Country } from '../data/countries';
import { useStore, type Profile, type TrackerItem } from '../store/AppStore';
import { daysUntil, formatDate, nextDate, recommend } from '../store/recommend';
import './dashboard.css';

const labels = {
  degree: { bachelor: 'Бакалавриат', master: 'Магистратура' },
  stage: { preparing: 'Готовлюсь', applying: 'Подаюсь', admitted: 'Поступил' },
  funding: { full: 'Полный грант', self: 'Свой бюджет' },
};

const stages: { id: NonNullable<Profile['stage']>; num: string; title: string; text: string }[] = [
  { id: 'preparing', num: '01', title: 'Готовлюсь', text: 'Выбор страны, язык, тесты' },
  { id: 'applying', num: '02', title: 'Подаюсь', text: 'Документы, эссе, подача' },
  { id: 'admitted', num: '03', title: 'Поступил', text: 'Виза, переезд, старт' },
];

function itemProgress(item: TrackerItem, c: Country) {
  const docs = docsFor(c);
  // подача заявки считается ещё одним шагом
  return Math.round(((item.done.filter((d) => docs.includes(d)).length + (item.submitted ? 1 : 0)) / (docs.length + 1)) * 100);
}

function ProgressBar({ value, label }: { value: number; label: string }) {
  return (
    <div className="progress" role="progressbar" aria-label={label} aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div className="progress__fill" style={{ width: `${value}%`, borderRightWidth: value > 0 && value < 100 ? 2 : 0 }} />
      <span className="progress__label">{value}%</span>
    </div>
  );
}

function ProgramCard({ item, country }: { item: TrackerItem; country: Country }) {
  const { toggleDoc, toggleSubmitted, toggleTracked } = useStore();
  const [open, setOpen] = useState(false);
  const docs = docsFor(country);
  const pct = itemProgress(item, country);

  return (
    <div className="program card">
      <div className="program__head">
        <Flag code={country.flag} size={40} />
        <div className="program__name">
          <h3>{country.name}</h3>
          <span>{country.grant} · {country.tags}</span>
        </div>
        <button className="program__remove" onClick={() => toggleTracked(country.id)} title="Убрать из трекера" aria-label={`Убрать ${country.name} из трекера`}>✕</button>
      </div>
      <ProgressBar value={pct} label={`Готовность заявки: ${country.name}`} />
      <div className="program__actions">
        <button className="btn btn--sm" onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? 'Скрыть чек-лист' : `Чек-лист документов (${item.done.length}/${docs.length})`}
        </button>
        <label className="check check--inline">
          <input type="checkbox" checked={item.submitted} onChange={() => toggleSubmitted(country.id)} />
          <span>Заявка отправлена</span>
        </label>
        <Link to={`/country/${country.id}`} className="program__link">Гайд по стране ›</Link>
      </div>
      {open && (
        <ul className="checklist">
          {docs.map((d) => (
            <li key={d}>
              <label className="check">
                <input type="checkbox" checked={item.done.includes(d)} onChange={() => toggleDoc(country.id, d)} />
                <span>{d}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Dashboard() {
  const { user, profile, tracker, toggleTracked } = useStore();
  const tracked = tracker
    .map((item) => ({ item, country: countryById(item.countryId) }))
    .filter((x): x is { item: TrackerItem; country: Country } => !!x.country);

  const overall = tracked.length
    ? Math.round(tracked.reduce((sum, t) => sum + itemProgress(t.item, t.country), 0) / tracked.length)
    : 0;

  const deadlines = tracked
    .flatMap(({ country }) => [
      country.deadlines.early && { country, kind: 'Ранняя подача', date: nextDate(country.deadlines.early) },
      { country, kind: country.deadlines.early ? 'Поздняя подача' : 'Дедлайн', date: nextDate(country.deadlines.late) },
    ])
    .filter((d): d is { country: Country; kind: string; date: Date } => !!d)
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const recs = recommend(profile, 8).filter((c) => !tracker.some((t) => t.countryId === c.id)).slice(0, 4);
  const stageIdx = stages.findIndex((s) => s.id === profile?.stage);

  return (
    <div className="container dash">
      <div className="dash__hello">
        <div>
          <p className="eyebrow">Личный кабинет</p>
          <h1 className="landing-h2">Привет, {user?.name}!</h1>
          {profile ? (
            <div className="dash__tags">
              {profile.degree && <span className="chip">{labels.degree[profile.degree]}</span>}
              {profile.stage && <span className="chip">{labels.stage[profile.stage]}</span>}
              {profile.funding && <span className="chip">{labels.funding[profile.funding]}</span>}
              {profile.ielts && <span className="chip">IELTS {profile.ielts}</span>}
              {profile.gpa && <span className="chip">GPA {profile.gpa}</span>}
              {profile.sat && <span className="chip">SAT {profile.sat}</span>}
              <Link to="/onboarding" className="chip chip--active">Изменить анкету</Link>
            </div>
          ) : (
            <Link to="/onboarding" className="btn btn--lime">Пройти анкету (1 минута)</Link>
          )}
        </div>
        <div className="dash__overall card">
          <span className="dash__overall-label">Прогресс поступления</span>
          <strong>{overall}%</strong>
          <ProgressBar value={overall} label="Общий прогресс поступления" />
          <small>{tracked.length ? `${tracked.length} программ в трекере` : 'Добавь первую программу'}</small>
        </div>
      </div>

      <ol className="stages">
        {stages.map((s, i) => (
          <li key={s.id} className={`stage card ${i === stageIdx ? 'is-current' : ''} ${i < stageIdx ? 'is-done' : ''}`} aria-current={i === stageIdx ? 'step' : undefined}>
            <span className="stage__num" aria-hidden="true">{s.num}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="dash__grid">
        <section>
          <div className="dash__section-head">
            <h2>Мои программы</h2>
            <Link to="/catalog" className="btn btn--lime btn--sm">+ Добавить ВУЗ</Link>
          </div>
          {tracked.length ? (
            <div className="stack">
              {tracked.map(({ item, country }) => <ProgramCard key={country.id} item={item} country={country} />)}
            </div>
          ) : (
            <div className="hero-tracker">
              <h3 className="hero-tracker__title">Трекер пуст</h3>
              <p className="hero-tracker__hint">Нажми ★ на карточке страны в каталоге или выбери из рекомендаций справа — дедлайны и документы подтянутся сами.</p>
            </div>
          )}
        </section>

        <aside className="stack">
          <section className="card timeline">
            <h2>Дедлайны</h2>
            {deadlines.length ? (
              <ul>
                {deadlines.map((d) => {
                  const left = daysUntil(d.date);
                  return (
                    <li key={d.country.id + d.kind} className={left <= 30 ? 'is-hot' : ''}>
                      <span className="timeline__days">{left} дн.</span>
                      <div>
                        <strong>{d.country.name} — {d.kind}</strong>
                        <small>{formatDate(d.date)}</small>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="muted">Здесь появятся ранние и поздние дедлайны добавленных программ.</p>
            )}
            <p className="timeline__note">Даты ориентировочные — всегда сверяй с официальным сайтом.</p>
          </section>

          {recs.length > 0 && (
            <section className="card recs">
              <h2>Подобрано для тебя</h2>
              <ul>
                {recs.map((c) => (
                  <li key={c.id}>
                    <Flag code={c.flag} size={32} />
                    <Link to={`/country/${c.id}`}>
                      <strong>{c.name}</strong>
                      <small>{c.grant}</small>
                    </Link>
                    <button className="btn btn--sm btn--lime" onClick={() => toggleTracked(c.id)} aria-label={`Добавить ${c.name}`}>+</button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </aside>
      </div>
    </div>
  );
}
