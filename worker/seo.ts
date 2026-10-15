// HTML-страницы, sitemap.xml и robots.txt.
// SPA отдаёт один index.html на все адреса, поэтому Worker подставляет в него
// title, description, canonical, Open Graph и JSON-LD конкретной страницы.
import { metaFor, publicPaths, SITE_NAME, type PageMeta } from '../src/seo/meta';

const siteUrl = (env: Env, request: Request) => (env.SITE_URL || new URL(request.url).origin).replace(/\/$/, '');

const escapeJsonForHtml = (v: unknown) => JSON.stringify(v).replace(/</g, '\\u003c');

function headTags(meta: PageMeta, site: string) {
  const url = site + meta.path;
  const image = `${site}/og.png`;
  const attr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  return [
    `<meta name="description" content="${attr(meta.description)}">`,
    ...(meta.noindex ? [] : [`<link rel="canonical" href="${attr(url)}">`]),
    meta.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow, max-image-preview:large">',
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${SITE_NAME}">`,
    `<meta property="og:locale" content="ru_RU">`,
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
  const body = [
    'User-agent: *',
    'Allow: /',
    'Disallow: /api/',
    'Disallow: /dashboard',
    'Disallow: /onboarding',
    'Disallow: /mentor',
    '',
    `Sitemap: ${site}/sitemap.xml`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}

export function sitemap(request: Request, env: Env) {
  const site = siteUrl(env, request);
  const urls = publicPaths()
    .map((p) => `  <url><loc>${site}${p}</loc><changefreq>${p === '/' ? 'weekly' : 'monthly'}</changefreq><priority>${p === '/' ? '1.0' : p.startsWith('/country/') ? '0.8' : '0.6'}</priority></url>`)
    .join('\n');
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
