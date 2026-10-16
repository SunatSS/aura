import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { LOCALE_META } from '../i18n/locales';
import { metaFor } from './meta';

// При переходах внутри SPA:
// — обновляет title, description и canonical (Worker ставит их только при первой загрузке);
// — переносит фокус на основной контент и прокручивает вверх, чтобы пользователи
//   клавиатуры и скринридеров «узнали» о смене страницы.
export function RouteEffects() {
  const { pathname } = useLocation();
  const first = useRef(true);

  useEffect(() => {
    const meta = metaFor(pathname, window.location.origin);
    document.title = meta.title;
    document.documentElement.lang = LOCALE_META[meta.locale].htmlLang;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (meta.noindex) canonical?.remove();
    else {
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.append(canonical);
      }
      canonical.href = window.location.origin + meta.path;
    }

    if (first.current) {
      first.current = false;
      return;
    }
    window.scrollTo(0, 0);
    const main = document.getElementById('main');
    main?.focus({ preventScroll: true });
  }, [pathname]);

  return null;
}
