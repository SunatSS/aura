import { cloudflare } from '@cloudflare/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// Плагин Cloudflare запускает worker/index.ts в рантайме Workers (с локальной D1)
// прямо внутри dev-сервера Vite и собирает фронт + Worker для деплоя.
export default defineConfig({
  plugins: [react(), cloudflare()],
});
