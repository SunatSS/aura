import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' — относительные пути, сайт работает по любому адресу
// (в том числе https://<user>.github.io/<repo>/ на GitHub Pages)
export default defineConfig({
  plugins: [react()],
  base: './',
});
