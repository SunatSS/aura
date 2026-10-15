import { Link, useNavigate } from 'react-router-dom';
import { flagUrl, type Country } from '../data/countries';
import { useStore } from '../store/AppStore';
import './countryCard.css';

export function Flag({ code, size = 48 }: { code: string; size?: number }) {
  return <img className="flag" src={flagUrl(code)} width={size} height={size} alt="" />;
}

export function CountryCard({ country }: { country: Country }) {
  const { user, isTracked, toggleTracked } = useStore();
  const navigate = useNavigate();
  const tracked = isTracked(country.id);

  const onStar = () => {
    if (!user) {
      navigate('/register');
      return;
    }
    toggleTracked(country.id);
  };

  return (
    <article className="country-card card">
      <div className="country-card__top">
        <Flag code={country.flag} />
        <button
          className={`country-card__star ${tracked ? 'is-on' : ''}`}
          onClick={onStar}
          aria-pressed={tracked}
          aria-label={tracked ? `Убрать «${country.name}» из трекера` : `Добавить «${country.name}» в трекер`}
          title={tracked ? 'Убрать из трекера' : 'Добавить в трекер'}
        >
          <span aria-hidden="true">{tracked ? '★' : '☆'}</span>
        </button>
      </div>
      <h3 className="country-card__name">
        <span className="country-card__full">{country.name}</span>
        <span className="country-card__short">{country.short ?? country.name}</span>
      </h3>
      <p className="country-card__meta">
        <strong>{country.grant}</strong> <span>{country.tags}</span>
      </p>
      <Link to={`/country/${country.id}`} className="country-card__more" aria-label={`Узнать больше: ${country.name}, ${country.grant}`}>
        Узнать больше о стране <span aria-hidden="true">›</span>
      </Link>
    </article>
  );
}
