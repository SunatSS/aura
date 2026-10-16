import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CountryCard } from '../components/CountryCard';
import type { Degree } from '../data/countries';
import { getCountries } from '../i18n/content';
import { useI18n } from '../i18n/I18n';
import './pages.css';

const degreeIds: Degree[] = ['bachelor', 'master', 'phd'];

export default function Catalog() {
  const [params, setParams] = useSearchParams();
  const { locale, t } = useI18n();
  const T = t.catalog;
  const countries = getCountries(locale);
  const q = params.get('q') ?? '';
  const degree = params.get('degree') as Degree | null;
  const full = params.get('full') === '1';

  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    // ищем и по переводу, и по русскому названию: «Корея» найдётся и на английской версии
    const ru = getCountries('ru');
    return countries.filter(
      (c, i) =>
        (!needle || [c.name, c.grant, c.tags, ru[i].name].some((s) => s.toLowerCase().includes(needle))) &&
        (!degree || c.degrees.includes(degree)) &&
        (!full || c.fullGrant),
    );
  }, [q, degree, full, countries]);

  return (
    <div className="container page">
      <p className="eyebrow">{T.eyebrow}</p>
      <h1 className="landing-h2">{T.title}</h1>
      <p className="landing-sub">{T.sub(countries.length)}</p>

      <div className="filters">
        <input
          type="search"
          className="input filters__search"
          placeholder={T.searchPlaceholder}
          value={q}
          onChange={(e) => set('q', e.target.value || null)}
          aria-label={t.header.searchLabel}
        />
        <div className="filters__chips" role="group" aria-label={T.filters}>
          {degreeIds.map((id) => (
            <button
              key={id}
              className={`chip ${degree === id ? 'chip--active' : ''}`}
              aria-pressed={degree === id}
              onClick={() => set('degree', degree === id ? null : id)}
            >
              {T.degrees[id]}
            </button>
          ))}
          <button className={`chip ${full ? 'chip--active' : ''}`} aria-pressed={full} onClick={() => set('full', full ? null : '1')}>
            {T.fullGrant}
          </button>
        </div>
      </div>

      <p className="visually-hidden" role="status" aria-live="polite">{T.found(list.length)}</p>
      {list.length ? (
        <div className="country-grid">
          {list.map((c) => <CountryCard key={c.id} country={c} />)}
        </div>
      ) : (
        <div className="empty card">
          <h3>{T.emptyTitle}</h3>
          <p>{T.emptyText}</p>
          <button className="btn btn--lime" onClick={() => setParams({}, { replace: true })}>{T.reset}</button>
        </div>
      )}
    </div>
  );
}
