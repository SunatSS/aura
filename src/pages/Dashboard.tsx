import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flag } from '../components/CountryCard';
import type { Country } from '../data/countries';
import { docItems, getCountry } from '../i18n/content';
import { useI18n } from '../i18n/I18n';
import { formatDateIn, type Locale } from '../i18n/locales';
import { useStore, type Profile, type TrackerItem } from '../store/AppStore';
import { daysUntil, nextDate, recommend } from '../store/recommend';
import './dashboard.css';

const stageIds: NonNullable<Profile['stage']>[] = ['preparing', 'applying', 'admitted'];

function itemProgress(item: TrackerItem, c: Country, locale: Locale) {
  const ids = docItems(c, locale).map((d) => d.id);
  // подача заявки считается ещё одним шагом
  return Math.round(((item.done.filter((d) => ids.includes(d)).length + (item.submitted ? 1 : 0)) / (ids.length + 1)) * 100);
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
  const { locale, t, path } = useI18n();
  const D = t.dash;
  const [open, setOpen] = useState(false);
  const docs = docItems(country, locale);
  const done = item.done.filter((d) => docs.some((x) => x.id === d)).length;
  const pct = itemProgress(item, country, locale);

  return (
    <div className="program card">
      <div className="program__head">
        <Flag code={country.flag} size={40} />
        <div className="program__name">
          <h3>{country.name}</h3>
          <span>{country.grant} · {country.tags}</span>
        </div>
        <button className="program__remove" onClick={() => toggleTracked(country.id)} title={D.removeTitle} aria-label={D.removeLabel(country.name)}>✕</button>
      </div>
      <ProgressBar value={pct} label={D.readiness(country.name)} />
      <div className="program__actions">
        <button className="btn btn--sm" onClick={() => setOpen(!open)} aria-expanded={open}>
          {open ? D.hideChecklist : D.showChecklist(done, docs.length)}
        </button>
        <label className="check check--inline">
          <input type="checkbox" checked={item.submitted} onChange={() => toggleSubmitted(country.id)} />
          <span>{D.submitted}</span>
        </label>
        <Link to={path(`/country/${country.id}`)} className="program__link">{D.countryGuide}</Link>
      </div>
      {open && (
        <ul className="checklist">
          {docs.map((d) => (
            <li key={d.id}>
              <label className="check">
                <input type="checkbox" checked={item.done.includes(d.id)} onChange={() => toggleDoc(country.id, d.id)} />
                <span>{d.label}</span>
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
  const { locale, t, path } = useI18n();
  const D = t.dash;

  const tracked = tracker
    .map((item) => ({ item, country: getCountry(locale, item.countryId) }))
    .filter((x): x is { item: TrackerItem; country: Country } => !!x.country);

  const overall = tracked.length
    ? Math.round(tracked.reduce((sum, x) => sum + itemProgress(x.item, x.country, locale), 0) / tracked.length)
    : 0;

  const deadlines = tracked
    .flatMap(({ country }) => [
      ...(country.deadlines.early ? [{ country, kind: D.early, date: nextDate(country.deadlines.early) }] : []),
      { country, kind: country.deadlines.early ? D.late : D.deadline, date: nextDate(country.deadlines.late) },
    ])
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const recs = recommend(profile, 8)
    .filter((c) => !tracker.some((x) => x.countryId === c.id))
    .slice(0, 4)
    .map((c) => getCountry(locale, c.id)!);
  const stageIdx = stageIds.findIndex((s) => s === profile?.stage);

  return (
    <div className="container dash">
      <div className="dash__hello">
        <div>
          <p className="eyebrow">{D.eyebrow}</p>
          <h1 className="landing-h2">{D.hello(user?.name ?? '')}</h1>
          {profile ? (
            <div className="dash__tags">
              {profile.degree && <span className="chip">{D.chips.degree[profile.degree]}</span>}
              {profile.stage && <span className="chip">{D.chips.stage[profile.stage]}</span>}
              {profile.funding && <span className="chip">{D.chips.funding[profile.funding]}</span>}
              {profile.ielts && <span className="chip">IELTS {profile.ielts}</span>}
              {profile.gpa && <span className="chip">GPA {profile.gpa}</span>}
              {profile.sat && <span className="chip">SAT {profile.sat}</span>}
              <Link to={path('/onboarding')} className="chip chip--active">{D.editProfile}</Link>
            </div>
          ) : (
            <Link to={path('/onboarding')} className="btn btn--lime">{D.takeQuiz}</Link>
          )}
        </div>
        <div className="dash__overall card">
          <span className="dash__overall-label">{D.progress}</span>
          <strong>{overall}%</strong>
          <ProgressBar value={overall} label={D.progressOverall} />
          <small>{tracked.length ? D.programsCount(tracked.length) : D.addFirst}</small>
        </div>
      </div>

      <ol className="stages">
        {D.stages.map(([title, text], i) => (
          <li key={stageIds[i]} className={`stage card ${i === stageIdx ? 'is-current' : ''} ${i < stageIdx ? 'is-done' : ''}`} aria-current={i === stageIdx ? 'step' : undefined}>
            <span className="stage__num" aria-hidden="true">{`0${i + 1}`}</span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="dash__grid">
        <section>
          <div className="dash__section-head">
            <h2>{D.myPrograms}</h2>
            <Link to={path('/catalog')} className="btn btn--lime btn--sm">{D.addUni}</Link>
          </div>
          {tracked.length ? (
            <div className="stack">
              {tracked.map(({ item, country }) => <ProgramCard key={country.id} item={item} country={country} />)}
            </div>
          ) : (
            <div className="hero-tracker">
              <h3 className="hero-tracker__title">{D.trackerEmpty}</h3>
              <p className="hero-tracker__hint">{D.trackerEmptyHint}</p>
            </div>
          )}
        </section>

        <aside className="stack">
          <section className="card timeline">
            <h2>{D.deadlines}</h2>
            {deadlines.length ? (
              <ul>
                {deadlines.map((d) => {
                  const left = daysUntil(d.date);
                  return (
                    <li key={d.country.id + d.kind} className={left <= 30 ? 'is-hot' : ''}>
                      <span className="timeline__days">{D.days(left)}</span>
                      <div>
                        <strong>{d.country.name} — {d.kind}</strong>
                        <small>{formatDateIn(locale, d.date)}</small>
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="muted">{D.deadlinesEmpty}</p>
            )}
            <p className="timeline__note">{D.deadlinesNote}</p>
          </section>

          {recs.length > 0 && (
            <section className="card recs">
              <h2>{D.recs}</h2>
              <ul>
                {recs.map((c) => (
                  <li key={c.id}>
                    <Flag code={c.flag} size={32} />
                    <Link to={path(`/country/${c.id}`)}>
                      <strong>{c.name}</strong>
                      <small>{c.grant}</small>
                    </Link>
                    <button className="btn btn--sm btn--lime" onClick={() => toggleTracked(c.id)} aria-label={D.addRec(c.name)}>+</button>
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
