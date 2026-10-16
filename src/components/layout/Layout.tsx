import { Suspense, useEffect, useState, type FormEvent } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n/I18n';
import { LOCALE_META, LOCALES } from '../../i18n/locales';
import { useStore } from '../../store/AppStore';
import './layout.css';

export function Logo({ size = 'md' }: { size?: 'md' | 'lg' }) {
  const { t, path } = useI18n();
  return (
    <Link to={path('/')} className={`logo logo--${size}`} aria-label={t.header.home}>
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

// Переключатель языка: та же страница на другом языке
function LanguageSwitch() {
  const { locale, t, switchPath } = useI18n();
  return (
    <nav className="lang" aria-label={t.common.language}>
      {LOCALES.map((l) => (
        <Link
          key={l}
          to={switchPath(l)}
          className={`lang__item ${l === locale ? 'is-active' : ''}`}
          hrefLang={LOCALE_META[l].htmlLang}
          lang={LOCALE_META[l].htmlLang}
          aria-current={l === locale ? 'true' : undefined}
          title={LOCALE_META[l].label}
        >
          <span aria-hidden="true">{LOCALE_META[l].short}</span>
          <span className="visually-hidden">{LOCALE_META[l].label}</span>
        </Link>
      ))}
    </nav>
  );
}

function Header() {
  const { user, logout, loading } = useStore();
  const { t, path } = useI18n();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');

  // Escape закрывает мобильное меню
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const search = (e: FormEvent) => {
    e.preventDefault();
    navigate(path(`/catalog${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''}`));
    setOpen(false);
  };

  return (
    <header className="header">
      <div className="container header__row">
        <Logo />
        <nav id="main-nav" aria-label={t.header.nav} className={`header__nav ${open ? 'is-open' : ''}`} onClick={() => setOpen(false)}>
          <NavLink to={path('/catalog')} className="chip">{t.header.catalog}</NavLink>
          <NavLink to={path('/guides')} className="chip">{t.header.guides}</NavLink>
          <NavLink to={path('/dashboard')} className="chip">{t.header.tracker}</NavLink>
          <NavLink to={path('/mentor')} className="chip">{t.header.mentor}</NavLink>
        </nav>
        <div className="header__actions">
          <LanguageSwitch />
          {loading ? null : user ? (
            <>
              <Link to={path('/dashboard')} className="btn btn--lime btn--sm header__mine">{t.header.myTracker}</Link>
              <button className="btn btn--sm header__logout" onClick={() => logout().then(() => navigate(path('/')))}>{t.header.logout}</button>
            </>
          ) : (
            <>
              <Link to={path('/login')} className="btn btn--sm">{t.header.login}</Link>
              <Link to={path('/register')} className="btn btn--orange btn--sm">{t.header.register}</Link>
            </>
          )}
          <button
            className="header__burger btn btn--sm"
            aria-label={open ? t.header.closeMenu : t.header.openMenu}
            aria-expanded={open}
            aria-controls="main-nav"
            onClick={() => setOpen(!open)}
          >
            <span aria-hidden="true">{open ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>
      <form className="container header__search" onSubmit={search} role="search">
        <span className="header__search-icon" aria-hidden="true">⌕</span>
        <input
          type="search"
          className="header__search-input"
          placeholder={t.header.searchPlaceholder}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label={t.header.searchLabel}
        />
      </form>
    </header>
  );
}

export function CtaBanner() {
  const { user } = useStore();
  const { t, path } = useI18n();
  return (
    <section className="cta">
      <div className="container cta__inner">
        <h2 className="cta__title">{t.cta.title}</h2>
        <Link to={path(user ? '/dashboard' : '/register')} className="btn btn--lime btn--lg">{t.cta.button}</Link>
      </div>
    </section>
  );
}

function Footer() {
  const { t, path } = useI18n();
  return (
    <footer className="footer">
      <div className="container footer__row">
        <Logo />
        <p className="footer__text">{t.footer.text}</p>
        <nav className="footer__nav" aria-label={t.footer.nav}>
          <Link to={path('/catalog')}>{t.footer.catalog}</Link>
          <Link to={path('/guides')}>{t.footer.guides}</Link>
          <Link to={path('/dashboard')}>{t.footer.tracker}</Link>
        </nav>
      </div>
    </footer>
  );
}

function ErrorBanner() {
  const { error } = useStore();
  if (!error) return null;
  return (
    <div className="error-banner" role="alert">
      <div className="container">{error}</div>
    </div>
  );
}

export function Layout() {
  const { t } = useI18n();
  return (
    <>
      <a className="skip-link" href="#main">{t.header.skip}</a>
      <Header />
      <ErrorBanner />
      <main id="main" tabIndex={-1}>
        <Suspense fallback={<div className="container page muted" role="status">{t.common.loading}</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
