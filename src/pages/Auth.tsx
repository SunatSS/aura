import { useState, type FormEvent, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/AppStore';
import './pages.css';

function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: ReactNode }) {
  return (
    <div className="container auth">
      <div className="auth__card card">
        <h1 className="auth__title">{title}</h1>
        <p className="auth__subtitle">{subtitle}</p>
        <button type="button" className="btn btn--block" disabled title="Вход через Google появится позже">
          <span className="google-g" aria-hidden="true">G</span> Продолжить с Google <span className="tag">скоро</span>
        </button>
        <div className="auth__divider"><span>или по email</span></div>
        {children}
        <p className="auth__demo">Номер телефона не нужен. Никакого спама.</p>
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { submit, error, busy } = useSubmit(() => login(email, password), () => navigate('/dashboard'));

  return (
    <AuthShell title="Вход" subtitle="С возвращением! Твой трекер ждёт.">
      <form className="auth__form" onSubmit={submit}>
        <label>
          <span className="label">Email</span>
          <input className="input" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <span className="label">Пароль</span>
          <input className="input" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className="auth__error" role="alert">{error}</p>}
        <button className="btn btn--orange btn--block" disabled={busy}>{busy ? 'Входим…' : 'Войти'}</button>
      </form>
      <p className="auth__switch">Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
    </AuthShell>
  );
}

export function Register() {
  const { register } = useStore();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { submit, error, busy } = useSubmit(
    async () => (password.length < 8 ? 'Пароль — минимум 8 символов.' : register(name.trim(), email, password)),
    () => navigate('/onboarding'),
  );

  return (
    <AuthShell title="Регистрация" subtitle="30 секунд — и у тебя свой трекер поступления. Бесплатно, без спама.">
      <form className="auth__form" onSubmit={submit}>
        <label>
          <span className="label">Как тебя зовут</span>
          <input className="input" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          <span className="label">Email</span>
          <input className="input" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <span className="label">Пароль (минимум 8 символов)</span>
          <input className="input" type="password" autoComplete="new-password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className="auth__error" role="alert">{error}</p>}
        <button className="btn btn--orange btn--block" disabled={busy}>{busy ? 'Создаём…' : 'Создать аккаунт'}</button>
      </form>
      <p className="auth__switch">Уже есть аккаунт? <Link to="/login">Войти</Link></p>
    </AuthShell>
  );
}
