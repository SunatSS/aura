// Вход через Google (OAuth 2.0 Authorization Code + PKCE).
// 1. /api/auth/google/start — кладём state и PKCE-verifier в короткоживущую cookie и отправляем в Google.
// 2. /api/auth/google/callback — сверяем state, меняем code на токены, проверяем id_token,
//    находим/привязываем/создаём пользователя и открываем обычную сессию AURA.
import { Hono, type Context } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { pkceChallenge, pkceVerifier, randomHex } from './auth';
import * as db from './db';
import { startSession, type AppEnv } from './http';
import { DEFAULT_LOCALE, isLocale, localizePath, type Locale } from '../src/i18n/locales';

const STATE_COOKIE = 'aura_oauth';
const COOKIE_PATH = '/api/auth/google';
const GOOGLE_ISSUERS = ['https://accounts.google.com', 'accounts.google.com'];

export const googleConfigured = (env: Env) => Boolean(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET);

const redirectUri = (c: Context<AppEnv>) => `${new URL(c.req.url).origin}/api/auth/google/callback`;

// Разрешаем возвращать только на свои страницы: «/dashboard», но не «//evil.com»
const safeNext = (next: string | undefined) => (next && /^\/(?!\/)[\w\-/?=&#%.]*$/.test(next) ? next : '');

const backToLogin = (c: Context<AppEnv>, error: string, locale: Locale = DEFAULT_LOCALE) =>
  c.redirect(`${localizePath('/login', locale)}?error=${error}`, 302);

type IdToken = { iss: string; aud: string; sub: string; exp: number; email?: string; email_verified?: boolean; name?: string; given_name?: string };

// id_token пришёл напрямую от Google по TLS в ответ на наш запрос с client_secret,
// поэтому подпись можно не проверять (так разрешает документация Google), но поля проверяем.
function decodeIdToken(token: string): IdToken | null {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    const json = new TextDecoder().decode(Uint8Array.from(atob(payload), (ch) => ch.charCodeAt(0)));
    return JSON.parse(json) as IdToken;
  } catch {
    return null;
  }
}

export const googleRoutes = new Hono<AppEnv>();

googleRoutes.get('/start', async (c) => {
  const lang = c.req.query('lang');
  const locale: Locale = isLocale(lang) ? lang : DEFAULT_LOCALE;
  if (!googleConfigured(c.env)) return backToLogin(c, 'google_unavailable', locale);

  const state = randomHex(16);
  const verifier = pkceVerifier();
  const next = safeNext(c.req.query('next'));
  setCookie(c, STATE_COOKIE, JSON.stringify({ state, verifier, next, locale }), {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax', // cookie должна прийти обратно при редиректе из Google
    path: COOKIE_PATH,
    maxAge: 600,
  });

  const params = new URLSearchParams({
    client_id: c.env.GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri(c),
    response_type: 'code',
    scope: 'openid email profile',
    state,
    code_challenge: await pkceChallenge(verifier),
    code_challenge_method: 'S256',
    prompt: 'select_account',
  });
  return c.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params}`, 302);
});

googleRoutes.get('/callback', async (c) => {
  const raw = getCookie(c, STATE_COOKIE);
  deleteCookie(c, STATE_COOKIE, { path: COOKIE_PATH, secure: true });

  let saved: { state: string; verifier: string; next: string; locale?: string };
  try {
    saved = JSON.parse(raw ?? '');
  } catch {
    return backToLogin(c, 'google_state');
  }
  const locale: Locale = isLocale(saved.locale) ? saved.locale : DEFAULT_LOCALE;
  if (!googleConfigured(c.env)) return backToLogin(c, 'google_unavailable', locale);
  if (c.req.query('error')) return backToLogin(c, 'google_cancelled', locale); // пользователь нажал «Отмена»
  const code = c.req.query('code');
  if (!code || !saved.state || c.req.query('state') !== saved.state) return backToLogin(c, 'google_state', locale);

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      code,
      client_id: c.env.GOOGLE_CLIENT_ID,
      client_secret: c.env.GOOGLE_CLIENT_SECRET!,
      redirect_uri: redirectUri(c),
      grant_type: 'authorization_code',
      code_verifier: saved.verifier,
    }),
  });
  if (!tokenRes.ok) {
    console.error('Google token exchange failed', tokenRes.status, await tokenRes.text());
    return backToLogin(c, 'google_failed', locale);
  }
  const { id_token } = (await tokenRes.json()) as { id_token?: string };
  const claims = id_token ? decodeIdToken(id_token) : null;
  if (
    !claims ||
    claims.aud !== c.env.GOOGLE_CLIENT_ID ||
    !GOOGLE_ISSUERS.includes(claims.iss) ||
    claims.exp * 1000 < Date.now() ||
    !claims.email ||
    claims.email_verified !== true
  ) {
    return backToLogin(c, 'google_failed', locale);
  }

  const email = claims.email.toLowerCase();
  let user = await db.userByOAuth(c.env.DB, 'google', claims.sub);
  let isNew = false;
  if (!user) {
    // Почта подтверждена Google — привязываем к существующему аккаунту с той же почтой, чтобы не плодить дубли
    const existing = await db.findUserByEmail(c.env.DB, email);
    if (existing) {
      user = { id: existing.id, email: existing.email, name: existing.name };
    } else {
      user = { id: crypto.randomUUID(), email, name: (claims.given_name || claims.name || 'Студент').slice(0, 60) };
      await db.createUser(c.env.DB, { ...user, hash: '', salt: '' });
      isNew = true;
    }
    await db.linkOAuth(c.env.DB, 'google', claims.sub, user.id, email);
  }

  await startSession(c, user.id);
  const hasProfile = !isNew && (await db.getProfile(c.env.DB, user.id)) !== null;
  return c.redirect(saved.next || localizePath(hasProfile ? '/dashboard' : '/onboarding', locale), 302);
});
