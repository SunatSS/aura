import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/AppStore';
import './pages.css';

function GoogleButton() {
  const { loginWithGoogle, profile } = useStore();
  const navigate = useNavigate();
  return (
    <button
      type="button"
      className="btn btn--block"
      onClick={() => {
        loginWithGoogle();
        navigate(profile ? '/dashboard' : '/onboarding');
      }}
    >
      <span className="google-g" aria-hidden="true">G</span> Продолжить с Google
    </button>
  );
}

function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="container auth">
      <div className="auth__card card">
        <h1 className="auth__title">{title}</h1>
        <p className="auth__subtitle">{subtitle}</p>
        <GoogleButton />
        <div className="auth__divider"><span>или по email</span></div>
        {children}
        <p className="auth__demo">Демо-версия: данные хранятся только в твоём браузере. Номер телефона не нужен.</p>
      </div>
    </div>
  );
}

export function Login() {
  const { login, profile } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const err = login(email, password);
    if (err) setError(err);
    else navigate(profile ? '/dashboard' : '/onboarding');
  };

  return (
    <AuthShell title="Вход" subtitle="С возвращением! Твой трекер ждёт.">
      <form className="auth__form" onSubmit={submit}>
        <label>
          <span className="label">Email</span>
          <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <span className="label">Пароль</span>
          <input className="input" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className="auth__error">{error}</p>}
        <button className="btn btn--orange btn--block">Войти</button>
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
  const [error, setError] = useState<string | null>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Пароль — минимум 6 символов.');
      return;
    }
    const err = register(name.trim() || 'Студент', email, password);
    if (err) setError(err);
    else navigate('/onboarding');
  };

  return (
    <AuthShell title="Регистрация" subtitle="30 секунд — и у тебя свой трекер поступления. Бесплатно, без спама.">
      <form className="auth__form" onSubmit={submit}>
        <label>
          <span className="label">Как тебя зовут</span>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          <span className="label">Email</span>
          <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          <span className="label">Пароль</span>
          <input className="input" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <p className="auth__error">{error}</p>}
        <button className="btn btn--orange btn--block">Создать аккаунт</button>
      </form>
      <p className="auth__switch">Уже есть аккаунт? <Link to="/login">Войти</Link></p>
    </AuthShell>
  );
}
