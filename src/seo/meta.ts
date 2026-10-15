// SEO-метаданные страниц. Общий модуль: Worker подставляет их в HTML при первой
// загрузке (это видят поисковики и превью ссылок в мессенджерах), а React обновляет
// title/description при переходах внутри сайта.
import { countries, countryById } from '../data/countries';
import { guideBySlug, guides } from '../data/guides';

export const SITE_NAME = 'AURA';
const DEFAULT_DESCRIPTION =
  'AURA — бесплатная база программ и трекер заявок для поступления за рубеж на гранты: CSC, DAAD, GKS, Türkiye Burslari, Chevening и другие. Дедлайны, документы и прямые ссылки на первоисточники. Ноль посредников.';

export type PageMeta = {
  title: string;
  description: string;
  path: string; // канонический путь
  noindex?: boolean;
  status?: 200 | 404;
  jsonLd?: Record<string, unknown>[];
};

const crumbs = (site: string, items: [string, string][]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: site + path })),
});

const PRIVATE: Record<string, string> = {
  '/login': 'Вход',
  '/register': 'Регистрация',
  '/onboarding': 'Анкета',
  '/dashboard': 'Личный кабинет',
  '/mentor': 'AI-ментор',
};

export function metaFor(pathname: string, site = ''): PageMeta {
  const path = pathname.replace(/\/+$/, '') || '/';

  if (path === '/') {
    return {
      title: 'AURA — гранты на учёбу за рубежом без посредников',
      description: DEFAULT_DESCRIPTION,
      path,
      jsonLd: [
        { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: site + '/', inLanguage: 'ru' },
        {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: SITE_NAME,
          url: site + '/',
          logo: site + '/favicon.svg',
          description: 'Бесплатная платформа для самостоятельного поступления за рубеж на гранты.',
        },
      ],
    };
  }

  if (path === '/catalog') {
    return {
      title: `Каталог стран и грантов на учёбу за рубежом — ${SITE_NAME}`,
      description: `${countries.length} направлений для бесплатной учёбы: ${countries.slice(0, 8).map((c) => `${c.name} (${c.grant})`).join(', ')} и другие. Требования, дедлайны и документы.`,
      path,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          itemListElement: countries.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: `${c.name}: ${c.grant}`, url: `${site}/country/${c.id}` })),
        },
      ],
    };
  }

  const country = path.match(/^\/country\/([a-z-]+)$/);
  if (country) {
    const c = countryById(country[1]);
    if (c) {
      const reqs = [c.ieltsMin && `IELTS от ${c.ieltsMin}`, c.gpaMin && `GPA ${c.gpaMin}`].filter(Boolean).join(', ');
      return {
        title: `${c.name}: ${c.grant} — как поступить на грант | ${SITE_NAME}`,
        description: `Учёба в стране «${c.name}» на грант ${c.grant}: ${c.tags}.${reqs ? ` Требования: ${reqs}.` : ''} Этапы, документы, дедлайны и официальные ссылки.`,
        path,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: `${c.name}: ${c.grant} — как поступить на грант`,
            inLanguage: 'ru',
            mainEntityOfPage: site + path,
            publisher: { '@type': 'Organization', name: SITE_NAME },
          },
          crumbs(site, [['Главная', '/'], ['Каталог', '/catalog'], [c.name, path]]),
        ],
      };
    }
  }

  if (path === '/guides') {
    return {
      title: `Гайды поступающего: эссе, рекомендации, Common App — ${SITE_NAME}`,
      description: 'Пошаговые гайды без воды: как написать мотивационное эссе, попросить рекомендательное письмо и заполнить Common App.',
      path,
    };
  }

  const guide = path.match(/^\/guides\/([a-z-]+)$/);
  if (guide) {
    const g = guideBySlug(guide[1]);
    if (g?.page) {
      return {
        title: `${g.title.replace(/\?$/, '')} — ${SITE_NAME}`,
        description: `${g.summary} ${g.page.lead}`.slice(0, 200),
        path,
        jsonLd: [
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: g.page.title,
            description: g.summary,
            inLanguage: 'ru',
            mainEntityOfPage: site + path,
            publisher: { '@type': 'Organization', name: SITE_NAME },
          },
          crumbs(site, [['Главная', '/'], ['Гайды', '/guides'], [g.title, path]]),
        ],
      };
    }
  }

  if (PRIVATE[path]) {
    return { title: `${PRIVATE[path]} — ${SITE_NAME}`, description: DEFAULT_DESCRIPTION, path, noindex: true };
  }

  return { title: `Страница не найдена — ${SITE_NAME}`, description: DEFAULT_DESCRIPTION, path, noindex: true, status: 404 };
}

// Страницы для sitemap.xml
export function publicPaths(): string[] {
  return ['/', '/catalog', '/guides', ...countries.map((c) => `/country/${c.id}`), ...guides.filter((g) => g.page).map((g) => `/guides/${g.slug}`)];
}
