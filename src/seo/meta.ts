// SEO-метаданные страниц. Общий модуль: Worker подставляет их в HTML при первой
// загрузке (это видят поисковики и превью ссылок в мессенджерах), а React обновляет
// title/description при переходах внутри сайта.
import { getCountries, getCountry, getGuide, getGuides } from '../i18n/content';
import { LOCALES, localizePath, splitLocale, type Locale } from '../i18n/locales';
import { dictionaries } from '../i18n/ui';

export const SITE_NAME = 'AURA';

export type PageMeta = {
  title: string;
  description: string;
  locale: Locale;
  path: string; // канонический путь на текущем языке
  barePath: string; // путь без языкового префикса — для hreflang
  noindex?: boolean;
  status?: 200 | 404;
  jsonLd?: Record<string, unknown>[];
};

const crumbs = (site: string, items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: site + path })),
});

export function metaFor(pathname: string, site = ''): PageMeta {
  const { locale, path: raw } = splitLocale(pathname);
  const bare = raw.replace(/\/+$/, '') || '/';
  const t = dictionaries[locale].meta;
  const L = (p: string) => localizePath(p, locale);
  const base = { locale, barePath: bare, path: L(bare) };

  if (bare === '/') {
    return {
      ...base,
      title: t.homeTitle,
      description: t.siteDescription,
      jsonLd: [
        { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: site + L('/'), inLanguage: locale === 'tj' ? 'tg' : locale },
        { '@context': 'https://schema.org', '@type': 'Organization', name: SITE_NAME, url: site + '/', logo: site + '/favicon.svg', description: t.orgDescription },
      ],
    };
  }

  if (bare === '/catalog') {
    const countries = getCountries(locale);
    return {
      ...base,
      title: `${t.catalogTitle} — ${SITE_NAME}`,
      description: t.catalogDescription(countries.length, countries.slice(0, 8).map((c) => `${c.name} (${c.grant})`).join(', ')),
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: countries.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: `${c.name}: ${c.grant}`, url: site + L(`/country/${c.id}`) })),
        },
      ],
    };
  }

  const country = bare.match(/^\/country\/([a-z-]+)$/);
  if (country) {
    const c = getCountry(locale, country[1]);
    if (c) {
      const reqs = [c.ieltsMin && `IELTS ${c.ieltsMin}+`, c.gpaMin && `GPA ${c.gpaMin}`].filter(Boolean).join(', ');
      const title = t.countryTitle(c.name, c.grant);
      return {
        ...base,
        title: `${title} | ${SITE_NAME}`,
        description: t.countryDescription(c.name, c.grant, c.tags, reqs).slice(0, 300),
        jsonLd: [
          { '@context': 'https://schema.org', '@type': 'Article', headline: title, inLanguage: locale === 'tj' ? 'tg' : locale, mainEntityOfPage: site + L(bare), publisher: { '@type': 'Organization', name: SITE_NAME } },
          crumbs(site, [[t.breadcrumbHome, L('/')], [t.breadcrumbCatalog, L('/catalog')], [c.name, L(bare)]]),
        ],
      };
    }
  }

  if (bare === '/guides') {
    return { ...base, title: `${t.guidesTitle} — ${SITE_NAME}`, description: t.guidesDescription };
  }

  const guide = bare.match(/^\/guides\/([a-z-]+)$/);
  if (guide) {
    const g = getGuide(locale, guide[1]);
    if (g?.available) {
      return {
        ...base,
        title: `${g.title.replace(/\?$/, '')} — ${SITE_NAME}`,
        description: `${g.summary} ${t.guidesDescription}`.slice(0, 200),
        jsonLd: [
          { '@context': 'https://schema.org', '@type': 'Article', headline: g.title, description: g.summary, inLanguage: locale === 'tj' ? 'tg' : locale, mainEntityOfPage: site + L(bare), publisher: { '@type': 'Organization', name: SITE_NAME } },
          crumbs(site, [[t.breadcrumbHome, L('/')], [t.breadcrumbGuides, L('/guides')], [g.title, L(bare)]]),
        ],
      };
    }
  }

  if (t.private[bare]) {
    return { ...base, title: `${t.private[bare]} — ${SITE_NAME}`, description: t.siteDescription, noindex: true };
  }

  return { ...base, title: `${t.notFoundTitle} — ${SITE_NAME}`, description: t.siteDescription, noindex: true, status: 404 };
}

// Публичные страницы без языкового префикса
export function publicBarePaths(): string[] {
  return ['/', '/catalog', '/guides', ...getCountries('ru').map((c) => `/country/${c.id}`), ...getGuides('ru').filter((g) => g.available).map((g) => `/guides/${g.slug}`)];
}

// Альтернативные языковые версии страницы (для <link rel="alternate" hreflang> и sitemap)
export const alternates = (barePath: string) => LOCALES.map((l) => ({ locale: l, path: localizePath(barePath, l) }));
