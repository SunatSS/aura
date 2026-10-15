import { cloudflare } from '@cloudflare/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Плагин Cloudflare запускает worker/index.ts в рантайме Workers (с локальной D1)
// прямо внутри dev-сервера Vite и собирает фронт + Worker для деплоя.
//
// Workers AI локально не эмулируется — модели всегда работают в облаке и требуют
// входа в Cloudflare. Поэтому по умолчанию `npm run dev` запускается без AI
// (сайт работает, AI-ментор отвечает «недоступен»), а с AI — через `npm run dev:ai`
// после `npx wrangler login`.
export default defineConfig({
  plugins: [react(), cloudflare({ remoteBindings: process.env.AI_REMOTE === '1' })],
});
