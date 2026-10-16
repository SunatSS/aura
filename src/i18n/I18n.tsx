import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { localizePath, splitLocale, type Locale } from './locales';
import { dictionaries, type Dict } from './ui';

type I18n = {
  locale: Locale;
  t: Dict;
  // путь на текущем языке: path('/catalog') → '/en/catalog'
  path: (p: string) => string;
  // текущая страница на другом языке (для переключателя)
  switchPath: (l: Locale) => string;
};

const Ctx = createContext<I18n | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const { pathname, search } = useLocation();
  const value = useMemo<I18n>(() => {
    const { locale, path: bare } = splitLocale(pathname);
    return {
      locale,
      t: dictionaries[locale],
      path: (p) => localizePath(p, locale),
      switchPath: (l) => localizePath(bare, l) + search,
    };
  }, [pathname, search]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const v = useContext(Ctx);
  if (!v) throw new Error('useI18n must be used inside I18nProvider');
  return v;
}
