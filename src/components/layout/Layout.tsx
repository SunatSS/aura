import { useState, type FormEvent } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/AppStore';
import './layout.css';

export function Logo({ size = 'md' }: { size?: 'md' | 'lg' }) {
  return (
    <Link to="/" className={`logo logo--${size}`} aria-label="AURA — на главную">
      <svg className="logo__burst" viewBox="0 0 40 40" aria-hidden="true">
        <path
          d="M20 1 L24 13 L36 6 L29 18 L39 22 L27 25 L32 38 L21 29 L13 39 L14 26 L1 27 L11 18 L3 8 L16 12 Z"
          fill="var(--orange)"
          stroke="var(--ink)"
          strokeWidth="2"
          strokeLinejoin="round"
        />
      </svg>
      <span className="logo__word">AURA</span>
    </Link>
  );
}

function Header() {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');

  const search = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/catalog${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''}`);
    setOpen(false);
  };

  return (
    <header className="header">
      <div className="container header__row">
        <Logo />
        <nav className={`header__nav ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)}>
          <NavLink to="/catalog" className="chip">Каталог программ</NavLink>
          <NavLink to="/guides" className="chip">Гайды</NavLink>
          <NavLink to="/dashboard" className="chip">Трекер</NavLink>
        </nav>
        <div className="header__actions">
          {user ? (
            <>
              <Link to="/dashboard" className="btn btn--lime btn--sm">Мой трекер</Link>
              <button className="btn btn--sm header__logout" onClick={logout}>Выйти</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--sm">Войти</Link>
              <Link to="/register" className="btn btn--orange btn--sm">Зарегистрироваться</Link>
            </>
          )}
          <button className="header__burger btn btn--sm" aria-label="Меню" aria-expanded={open} onClick={() => setOpen(!open)}>
            ☰
          </button>
        </div>
      </div>
      <form className="container header__search" onSubmit={search} role="search">
        <span className="header__search-icon" aria-hidden="true">⌕</span>
        <input
          className="header__search-input"
          placeholder="Поиск по странам и грантам: Корея, DAAD, полный грант…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Поиск по странам"
        />
      </form>
    </header>
  );
}

export function CtaBanner() {
  const { user } = useStore();
  return (
    <section className="cta">
      <div className="container cta__inner">
        <h2 className="cta__title">Найди мою программу за рубежом — без посредников</h2>
        <Link to={user ? '/dashboard' : '/register'} className="btn btn--lime btn--lg">Начать бесплатно</Link>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__row">
        <Logo />
        <p className="footer__text">0 $ комиссий. Только прямые ссылки на первоисточники. Школьный проект, MVP.</p>
        <nav className="footer__nav">
          <Link to="/catalog">Каталог</Link>
          <Link to="/guides">Гайды</Link>
          <Link to="/dashboard">Трекер</Link>
        </nav>
      </div>
    </footer>
  );
}

export function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
