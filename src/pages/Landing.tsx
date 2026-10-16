import { Link } from 'react-router-dom';
import { CountryCard, Flag } from '../components/CountryCard';
import { CtaBanner } from '../components/layout/Layout';
import { getCountries, getCountry, getGuides } from '../i18n/content';
import { useI18n } from '../i18n/I18n';
import { useStore } from '../store/AppStore';
import './landing.css';

const featureIcons = [
  { icon: '🗓', color: 'var(--lime)' },
  { icon: '★', color: 'var(--blue)' },
  { icon: '✓', color: 'var(--orange)' },
];

function HeroTracker() {
  const { user, tracker } = useStore();
  const { locale, t, path } = useI18n();
  const items = tracker.map((i) => getCountry(locale, i.countryId)).filter((c) => c !== undefined);

  if (user && items.length > 0) {
    return (
      <div className="hero-tracker hero-tracker--filled card">
        <h3 className="hero-tracker__title">{t.landing.trackerMine}</h3>
        <ul className="hero-tracker__list">
          {items.slice(0, 4).map((c) => (
            <li key={c.id}>
              <Flag code={c.flag} size={28} />
              <span>{c.name}</span>
              <small>{c.grant}</small>
            </li>
          ))}
        </ul>
        <Link to={path('/dashboard')} className="btn btn--lime btn--sm">{t.landing.openTracker}</Link>
      </div>
    );
  }

  return (
    <div className="hero-tracker">
      <h3 className="hero-tracker__title">{t.landing.trackerEmpty}</h3>
      <div className="hero-tracker__spacer" />
      <Link to={path(user ? '/catalog' : '/register')} className="btn btn--lime">{t.landing.addUni}</Link>
      <p className="hero-tracker__hint">{t.landing.trackerHint}</p>
    </div>
  );
}

export default function Landing() {
  const { user } = useStore();
  const { locale, t, path } = useI18n();
  const countries = getCountries(locale);
  const L = t.landing;

  return (
    <>
      <section className="hero container">
        <div className="hero__text">
          <h1 className="hero__title">
            {L.titleLines[0]}<br />{L.titleLines[1]}<br />
            <span className="hero__pill">{L.pill}</span>
          </h1>
          <p className="hero__lead">{L.lead}</p>
          <Link to={path(user ? '/dashboard' : '/register')} className="btn btn--blue">{L.findButton}</Link>
        </div>
        <HeroTracker />
      </section>

      <section className="trust" aria-label={L.trustLabel}>
        <div className="container trust__row">
          {L.trust.map((f) => (
            <div key={f.label} className="trust__item">
              <strong>{f.value}</strong>
              <span className="trust__label">{f.label}</span>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container block">
        <h2 className="section-title">{L.featuresTitle}</h2>
        <div className="features">
          {L.features.map((f, i) => (
            <div key={f.title} className="feature card">
              <div className="feature__head">
                <span className="feature__icon" style={{ background: featureIcons[i].color }} aria-hidden="true">{featureIcons[i].icon}</span>
                <h3>{f.title}</h3>
              </div>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container block">
        <h2 className="section-title">{L.stepsTitle}</h2>
        <div className="features">
          {L.steps.map((s, i) => (
            <div key={s.title} className="step card">
              <span className="badge badge--orange step__num" aria-hidden="true">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container block">
        <p className="eyebrow">{L.catalogEyebrow}</p>
        <h2 className="landing-h2">{L.catalogTitle}</h2>
        <p className="landing-sub">{L.catalogSub}</p>
        <div className="country-grid">
          {countries.slice(0, 6).map((c) => <CountryCard key={c.id} country={c} />)}
        </div>
        <Link to={path('/catalog')} className="btn btn--blue btn--block btn--lg show-all">
          {L.showAll(countries.length)}
        </Link>
      </section>

      <section className="container block">
        <p className="eyebrow">{L.guidesEyebrow}</p>
        <h2 className="landing-h2">{L.guidesTitle}</h2>
        <div className="guide-links">
          {getGuides(locale).filter((g) => g.available).map((g) => (
            <Link key={g.slug} to={path(`/guides/${g.slug}`)} className="guide-link card">
              <span>{g.title}</span>
              <span aria-hidden="true">›</span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
