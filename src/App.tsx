import { lazy, type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { I18nProvider, useI18n } from './i18n/I18n';
import { AppStoreProvider, useStore } from './store/AppStore';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';

// Главная — в основном файле (её открывают первой), остальные страницы
// скачиваются при первом переходе на них
const Catalog = lazy(() => import('./pages/Catalog'));
const Country = lazy(() => import('./pages/Country'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const Mentor = lazy(() => import('./pages/Mentor'));
const GuidesIndex = lazy(() => import('./pages/Guides').then((m) => ({ default: m.GuidesIndex })));
const GuidePage = lazy(() => import('./pages/Guides').then((m) => ({ default: m.GuidePage })));
const Login = lazy(() => import('./pages/Auth').then((m) => ({ default: m.Login })));
const Register = lazy(() => import('./pages/Auth').then((m) => ({ default: m.Register })));
import { RouteEffects } from './seo/RouteEffects';

function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useStore();
  const { t, path } = useI18n();
  if (loading) return <div className="container page muted" role="status">{t.common.loading}</div>;
  return user ? children : <Navigate to={path('/login')} replace />;
}

// Одни и те же страницы на каждом языке: «/catalog», «/en/catalog», «/tj/catalog»
const pages = (
  <>
    <Route index element={<Landing />} />
    <Route path="catalog" element={<Catalog />} />
    <Route path="country/:id" element={<Country />} />
    <Route path="guides" element={<GuidesIndex />} />
    <Route path="guides/:slug" element={<GuidePage />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="onboarding" element={<RequireAuth><Onboarding /></RequireAuth>} />
    <Route path="dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
    <Route path="mentor" element={<RequireAuth><Mentor /></RequireAuth>} />
    <Route path="*" element={<NotFound />} />
  </>
);

export default function App() {
  return (
    <AppStoreProvider>
      <BrowserRouter>
        <I18nProvider>
          <RouteEffects />
          <Routes>
            <Route path="/en" element={<Layout />}>{pages}</Route>
            <Route path="/tj" element={<Layout />}>{pages}</Route>
            <Route path="/" element={<Layout />}>{pages}</Route>
          </Routes>
        </I18nProvider>
      </BrowserRouter>
    </AppStoreProvider>
  );
}
