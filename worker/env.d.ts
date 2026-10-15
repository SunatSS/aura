// Секреты не попадают в wrangler.jsonc, поэтому `wrangler types` о них не знает.
// GEMINI_API_KEY задаётся командой `wrangler secret put GEMINI_API_KEY` или в дашборде.
interface Env {
  GEMINI_API_KEY?: string;
  // Секрет OAuth-клиента Google: `wrangler secret put GOOGLE_CLIENT_SECRET` или дашборд
  GOOGLE_CLIENT_SECRET?: string;
}
