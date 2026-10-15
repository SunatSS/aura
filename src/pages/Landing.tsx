import { Link } from 'react-router-dom';
import { CountryCard, Flag } from '../components/CountryCard';
import { CtaBanner } from '../components/layout/Layout';
import { countries, countryById } from '../data/countries';
import { guides } from '../data/guides';
import { useStore } from '../store/AppStore';
import './landing.css';

const features = [
  { icon: '🗓', color: 'var(--lime)', title: 'Дедлайны без сюрпризов', text: 'Все сроки подачи, вступительных и апелляций собраны в одном календаре и обновляются автоматически.' },
  { icon: '★', color: 'var(--blue)', title: 'Гранты и стипендии', text: 'Фильтруй программы по бюджету и находи стипендии, которые реально покрывают обучение и жильё.' },
  { icon: '✓', color: 'var(--orange)', title: 'Честные критерии', text: 'Требования вузов — языковые баллы, портфолио, эссе — без приукрашивания и без платных агентов.' },
];

const steps = [
  { title: 'Выбери программу', text: 'Отфильтруй каталог по специальности, стране и бюджету — или добавь свой вуз вручную.' },
  { title: 'Собери документы', text: 'AURA формирует чек-лист под конкретную программу: что нужно, в каком формате и к какому сроку.' },
  { title: 'Следи за трекером', text: 'Статус каждой заявки — в одном месте, с напоминаниями до дедлайна.' },
];

function HeroTracker() {
  const { user, tracker } = useStore();
  const items = tracker.map((t) => countryById(t.countryId)).filter(Boolean);

  if (user && items.length > 0) {
    return (
      <div className="hero-tracker hero-tracker--filled card">
        <h3 className="hero-tracker__title">Мой трекер</h3>
        <ul className="hero-tracker__list">
          {items.slice(0, 4).map((c) => (
            <li key={c!.id}>
              <Flag code={c!.flag} size={28} />
              <span>{c!.name}</span>
              <small>{c!.grant}</small>
            </li>
          ))}
        </ul>
        <Link to="/dashboard" className="btn btn--lime btn--sm">Открыть трекер →</Link>
      </div>
    );
  }

  return (
    <div className="hero-tracker">
      <h3 className="hero-tracker__title">Трекер пуст</h3>
      <div className="hero-tracker__spacer" />
      <Link to={user ? '/catalog' : '/register'} className="btn btn--lime">+ Добавить ВУЗ</Link>
      <p className="hero-tracker__hint">Выбери программу из каталога слева или добавь свой университет вручную. Дедлайны и документы подтянутся сами :)</p>
    </div>
  );
}

export default function Landing() {
  const { user } = useStore();
  return (
    <>
      <section className="hero container">
        <div className="hero__text">
          <h1 className="hero__title">
            База программ<br />Трекер заявок<br />
            <span className="hero__pill">Ноль посредников</span>
          </h1>
          <p className="hero__lead">Честные критерии отбора, дедлайны и пошаговый контроль подачи документов под твою специальность и бюджет.</p>
          <Link to={user ? '/dashboard' : '/register'} className="btn btn--blue">Найти подходящее направление</Link>
        </div>
        <HeroTracker />
      </section>

      <section className="trust">
        <div className="container trust__row">
          <div className="trust__item">
            <strong>18+</strong>
            <span className="trust__label">Стран в базе</span>
            <p>Страны с доступной или бесплатной учёбой.</p>
          </div>
          <div className="trust__item">
            <strong>НЕТ</strong>
            <span className="trust__label">Посредников и агентств</span>
            <p>Никаких навязанных платных услуг и комиссий за подачу. Все инструкции открыты, чтобы поступать самостоятельно.</p>
          </div>
          <div className="trust__item">
            <strong>100%</strong>
            <span className="trust__label">Прямые ссылки на первоисточники</span>
            <p>Официальные регламенты грантов, дедлайны и требования напрямую с сайтов университетов и министерств.</p>
          </div>
        </div>
      </section>

      <section className="container block">
        <h2 className="section-title">Что умеет AURA</h2>
        <div className="features">
          {features.map((f) => (
            <div key={f.title} className="feature card">
              <div className="feature__head">
                <span className="feature__icon" style={{ background: f.color }}>{f.icon}</span>
                <h3>{f.title}</h3>
              </div>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container block">
        <h2 className="section-title">Как это работает</h2>
        <div className="features">
          {steps.map((s, i) => (
            <div key={s.title} className="step card">
              <span className="badge badge--orange step__num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container block">
        <p className="eyebrow">Каталог</p>
        <h2 className="landing-h2">Куда поступаем?</h2>
        <p className="landing-sub">15+ направлений для бесплатной учёбы за рубежом. Найди свою страну, оцени шансы и следи за дедлайнами в одном окне.</p>
        <div className="country-grid">
          {countries.slice(0, 6).map((c) => <CountryCard key={c.id} country={c} />)}
        </div>
        <Link to="/catalog" className="btn btn--blue btn--block btn--lg show-all">
          Показать все {countries.length} стран →
        </Link>
      </section>

      <section className="container block">
        <p className="eyebrow">База знаний</p>
        <h2 className="landing-h2">Гайды поступающего</h2>
        <div className="guide-links">
          {guides.filter((g) => g.page).map((g) => (
            <Link key={g.slug} to={`/guides/${g.slug}`} className="guide-link card">
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
