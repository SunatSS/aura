// Языки сайта. Русский — основной, без префикса в адресе; остальные — /en/..., /tj/...
// В адресе таджикский — «tj» (как просили), а в атрибутах lang/hreflang — ISO-код «tg».

export type Locale = 'ru' | 'en' | 'tj';

export const LOCALES: Locale[] = ['ru', 'en', 'tj'];
export const DEFAULT_LOCALE: Locale = 'ru';

export const LOCALE_META: Record<Locale, { label: string; short: string; htmlLang: string; ogLocale: string; dateLocale: string }> = {
  ru: { label: 'Русский', short: 'RU', htmlLang: 'ru', ogLocale: 'ru_RU', dateLocale: 'ru-RU' },
  en: { label: 'English', short: 'EN', htmlLang: 'en', ogLocale: 'en_US', dateLocale: 'en-GB' },
  tj: { label: 'Тоҷикӣ', short: 'TJ', htmlLang: 'tg', ogLocale: 'tg_TJ', dateLocale: 'tg-TJ' },
};

const prefixOf = (l: Locale) => (l === DEFAULT_LOCALE ? '' : `/${l}`);

// Язык и путь без префикса: «/en/country/korea» → { locale: 'en', path: '/country/korea' }
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  const m = pathname.match(/^\/(en|tj)(?=\/|$)/);
  if (!m) return { locale: DEFAULT_LOCALE, path: pathname || '/' };
  return { locale: m[1] as Locale, path: pathname.slice(m[0].length) || '/' };
}

// «/catalog» + en → «/en/catalog»; «/» + en → «/en»
export function localizePath(path: string, locale: Locale): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  const prefix = prefixOf(locale);
  if (!prefix) return p;
  return p === '/' ? prefix : prefix + p;
}

export const isLocale = (v: unknown): v is Locale => typeof v === 'string' && (LOCALES as string[]).includes(v);

export function formatDateIn(locale: Locale, date: Date) {
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
  try {
    return date.toLocaleDateString(LOCALE_META[locale].dateLocale, opts);
  } catch {
    return date.toLocaleDateString('ru-RU', opts);
  }
}
