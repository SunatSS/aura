import { useEffect, useState, type FormEvent, type ReactNode } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useI18n } from '../i18n/I18n';
import { useStore } from '../store/AppStore';
import './pages.css';

function GoogleButton() {
  const { locale, t } = useI18n();
  const [enabled, setEnabled] = useState<boolean | null>(null);
  useEffect(() => {
    fetch('/api/auth/providers')
      .then((r) => r.json())
      .then((p: { google?: boolean }) => setEnabled(Boolean(p.google)))
      .catch(() => setEnabled(false));
  }, []);

  if (enabled) {
    // Обычный переход, не fetch: дальше браузер уходит на страницу Google и возвращается к нам
    return (
      <a className="btn btn--block" href={`/api/auth/google/start?lang=${locale}`}>
        <span className="google-g" aria-hidden="true">G</span> {t.auth.google}
      </a>
    );
  }
  return (
    <button type="button" className="btn btn--block" disabled title={t.auth.googleSoonTitle}>
      <span className="google-g" aria-hidden="true">G</span> {t.auth.google} {enabled === false && <span className="tag">{t.auth.googleSoon}</span>}
    </button>
  );
}

function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  const [params] = useSearchParams();
  const { t } = useI18n();
  const googleError = t.auth.googleErrors[params.get('error') ?? ''];
  return (
    <div className="container auth">
      <div className="auth__card card">
        <h1 className="auth__title">{title}</h1>
        <p className="auth__subtitle">{subtitle}</p>
        {googleError && <p className="auth__error" role="alert">{googleError}</p>}
        <GoogleButton />
        <div className="auth__divider"><span>{t.auth.orEmail}</span></div>
        {children}
        <p className="auth__demo">{t.auth.noPhone}</p>
      </div>
    </div>
  );
}

function useSubmit(action: () => Promise<string | null>, onSuccess: () => void) {
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const err = await action();
    setBusy(false);
    if (err) setError(err);
    else onSuccess();
  };
  return { submit, error, busy };
}

export function Login() {
  const { login } = useStore();
  const navigate = useNavigate();
  const { t, path } = useI18n();
  const A = t.auth;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { submit, error, busy } = useSubmit(() => login(email, password), () => navigate(path('/dashboard')));

  return (
    <AuthShell title={A.loginTitle} subtitle={A.loginSubtitle}>
      <form className="auth__form" onSubmit={submit}>
        <label>
          <span className="label">{A.email}</span>
          <input className="input" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <span className="label">{A.password}</span>
          <input className="input" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className="auth__error" role="alert">{error}</p>}
        <button className="btn btn--orange btn--block" disabled={busy}>{busy ? A.loginBusy : A.loginButton}</button>
      </form>
      <p className="auth__switch">{A.noAccount} <Link to={path('/register')}>{A.toRegister}</Link></p>
    </AuthShell>
  );
}

export function Register() {
  const { register } = useStore();
  const navigate = useNavigate();
  const { t, path } = useI18n();
  const A = t.auth;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { submit, error, busy } = useSubmit(
    async () => (password.length < 8 ? A.passwordShort : register(name.trim(), email, password)),
    () => navigate(path('/onboarding')),
  );

  return (
    <AuthShell title={A.registerTitle} subtitle={A.registerSubtitle}>
      <form className="auth__form" onSubmit={submit}>
        <label>
          <span className="label">{A.name}</span>
          <input className="input" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          <span className="label">{A.email}</span>
          <input className="input" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <span className="label">{A.passwordHint}</span>
          <input className="input" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className="auth__error" role="alert">{error}</p>}
        <button className="btn btn--orange btn--block" disabled={busy}>{busy ? A.registerBusy : A.registerButton}</button>
      </form>
      <p className="auth__switch">{A.haveAccount} <Link to={path('/login')}>{A.toLogin}</Link></p>
    </AuthShell>
  );
}
