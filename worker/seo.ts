// HTML-страницы, sitemap.xml и robots.txt.
// SPA отдаёт один index.html на все адреса, поэтому Worker подставляет в него
// title, description, canonical, Open Graph и JSON-LD конкретной страницы.
import { LOCALE_META, LOCALES } from '../src/i18n/locales';
import { alternates, metaFor, publicBarePaths, SITE_NAME, type PageMeta } from '../src/seo/meta';

const siteUrl = (env: Env, request: Request) => (env.SITE_URL || new URL(request.url).origin).replace(/\/$/, '');

const escapeJsonForHtml = (v: unknown) => JSON.stringify(v).replace(/</g, '\\u003c');

function headTags(meta: PageMeta, site: string) {
  const url = site + meta.path;
  const image = `${site}/og.png`;
  const attr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  return [
    `<meta name="description" content="${attr(meta.description)}">`,
    ...(meta.noindex ? [] : [`<link rel="canonical" href="${attr(url)}">`]),
    // языковые версии страницы: поисковик покажет пользователю нужную
    ...(meta.noindex
      ? []
      : [
          ...alternates(meta.barePath).map((a) => `<link rel="alternate" hreflang="${LOCALE_META[a.locale].htmlLang}" href="${attr(site + a.path)}">`),
          `<link rel="alternate" hreflang="x-default" href="${attr(site + meta.barePath)}">`,
        ]),
    meta.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">',
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${SITE_NAME}">`,
    `<meta property="og:locale" content="${LOCALE_META[meta.locale].ogLocale}">`,
    ...LOCALES.filter((l) => l !== meta.locale).map((l) => `<meta property="og:locale:alternate" content="${LOCALE_META[l].ogLocale}">`),
    `<meta property="og:title" content="${attr(meta.title)}">`,
    `<meta property="og:description" content="${attr(meta.description)}">`,
    `<meta property="og:url" content="${attr(url)}">`,
    `<meta property="og:image" content="${image}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${attr(meta.title)}">`,
    `<meta name="twitter:description" content="${attr(meta.description)}">`,
    `<meta name="twitter:image" content="${image}">`,
    ...(meta.jsonLd ?? []).map((d) => `<script type="application/ld+json">${escapeJsonForHtml(d)}</script>`),
  ].join('\n    ');
}

export async function renderPage(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const site = siteUrl(env, request);
  const meta = metaFor(url.pathname, site);

  // index.html из статики (assets отдают его на «/»)
  const shell = await env.ASSETS.fetch(new Request(new URL('/', url), { headers: request.headers }));
  const res = new HTMLRewriter()
    .on('html', {
      element(el) {
        el.setAttribute('lang', LOCALE_META[meta.locale].htmlLang);
      },
    })
    .on('title', {
      element(el) {
        el.setInnerContent(meta.title);
      },
    })
    .on('meta[name="description"]', {
      element(el) {
        el.remove(); // заменяем своим вместе с остальными тегами ниже
      },
    })
    .on('head', {
      element(el) {
        el.append(headTags(meta, site), { html: true });
      },
    })
    .transform(shell);

  const headers = new Headers(res.headers);
  headers.set('Content-Type', 'text/html; charset=utf-8');
  // HTML не кэшируем надолго: после деплоя ссылки на ассеты меняются
  headers.set('Cache-Control', 'public, max-age=0, must-revalidate');
  if (meta.noindex) headers.set('X-Robots-Tag', 'noindex');
  return new Response(res.body, { status: meta.status ?? 200, headers });
}

export function robots(request: Request, env: Env) {
  const site = siteUrl(env, request);
  const privatePaths = ['/dashboard', '/onboarding', '/mentor'];
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    ...privatePaths.flatMap((p) => ['', '/en', '/tj'].map((prefix) => `Disallow: ${prefix}${p}`)),
    '',
    `Sitemap: ${site}/sitemap.xml`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}

export function sitemap(request: Request, env: Env) {
  const site = siteUrl(env, request);
  // каждая страница на каждом языке + ссылки на все её языковые версии
  const urls = publicBarePaths()
    .flatMap((bare) => {
      const alts = alternates(bare)
        .map((a) => `<xhtml:link rel="alternate" hreflang="${LOCALE_META[a.locale].htmlLang}" href="${site}${a.path}"/>`)
        .join('');
      const priority = bare === '/' ? '1.0' : bare.startsWith('/country/') ? '0.8' : '0.6';
      return alternates(bare).map(
        (a) => `  <url><loc>${site}${a.path}</loc>${alts}<changefreq>${bare === '/' ? 'weekly' : 'monthly'}</changefreq><priority>${priority}</priority></url>`,
      );
    })
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
