import { useEffect, type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { AppStoreProvider, useStore } from './store/AppStore';
import { Login, Register } from './pages/Auth';
import Catalog from './pages/Catalog';
import Country from './pages/Country';
import Dashboard from './pages/Dashboard';
import { GuidePage, GuidesIndex } from './pages/Guides';
import Landing from './pages/Landing';
import NotFound from './pages/NotFound';
import Onboarding from './pages/Onboarding';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useStore();
  if (loading) return <div className="container page muted">Загружаем…</div>;
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AppStoreProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="country/:id" element={<Country />} />
            <Route path="guides" element={<GuidesIndex />} />
            <Route path="guides/:slug" element={<GuidePage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="onboarding" element={<RequireAuth><Onboarding /></RequireAuth>} />
            <Route path="dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppStoreProvider>
  );
}
