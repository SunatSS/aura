import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CountryCard } from '../components/CountryCard';
import { countries, type Degree } from '../data/countries';
import './pages.css';

const degreeFilters: { id: Degree; label: string }[] = [
  { id: 'bachelor', label: 'Бакалавриат' },
  { id: 'master', label: 'Магистратура' },
  { id: 'phd', label: 'PhD' },
];

export default function Catalog() {
  const [params, setParams] = useSearchParams();
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
    return countries.filter(
      (c) =>
        (!needle || [c.name, c.grant, c.tags].some((s) => s.toLowerCase().includes(needle))) &&
        (!degree || c.degrees.includes(degree)) &&
        (!full || c.fullGrant),
    );
  }, [q, degree, full]);

  return (
    <div className="container page">
      <p className="eyebrow">Каталог</p>
      <h1 className="landing-h2">Куда поступаем?</h1>
      <p className="landing-sub">{countries.length} направлений для бесплатной учёбы за рубежом. Найди свою страну, оцени шансы и следи за дедлайнами в одном окне.</p>

      <div className="filters">
        <input
          className="input filters__search"
          placeholder="Страна или грант…"
          value={q}
          onChange={(e) => set('q', e.target.value || null)}
          aria-label="Поиск"
        />
        <div className="filters__chips">
          {degreeFilters.map((d) => (
            <button
              key={d.id}
              className={`chip ${degree === d.id ? 'chip--active' : ''}`}
              onClick={() => set('degree', degree === d.id ? null : d.id)}
            >
              {d.label}
            </button>
          ))}
          <button className={`chip ${full ? 'chip--active' : ''}`} onClick={() => set('full', full ? null : '1')}>
            Полный грант
          </button>
        </div>
      </div>

      {list.length ? (
        <div className="country-grid">
          {list.map((c) => <CountryCard key={c.id} country={c} />)}
        </div>
      ) : (
        <div className="empty card">
          <h3>Ничего не нашли</h3>
          <p>Попробуй другое название страны или сбрось фильтры.</p>
          <button className="btn btn--lime" onClick={() => setParams({}, { replace: true })}>Сбросить</button>
        </div>
      )}
    </div>
  );
}
