// Точка входа Worker: API, SEO-файлы и HTML-страницы с метаданными.
// Собранная статика (/assets/*, картинки) отдаётся мимо Worker'а — см. run_worker_first в wrangler.jsonc.
import { api } from './api';
import { renderPage, robots, sitemap } from './seo';

// Адрес страницы, а не файла. В dev-режиме сюда же приходят служебные пути Vite
// (/@vite/client, /src/main.tsx, /node_modules/...) — их отдаёт сам Vite через ASSETS.
const isPagePath = (p: string) => !/\.[a-z0-9]+$/i.test(p) && !/^\/(@|src\/|node_modules\/)/.test(p);

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    if (pathname.startsWith('/api/')) return api.fetch(request, env, ctx);
    if (pathname === '/robots.txt') return robots(request, env);
    if (pathname === '/sitemap.xml') return sitemap(request, env);
    if ((request.method === 'GET' || request.method === 'HEAD') && isPagePath(pathname)) return renderPage(request, env);
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
