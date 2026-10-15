import { Hono, type Context } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';
import type { Profile, User } from '../src/api/types';
import { countryById, docsFor } from '../src/data/countries';
import { SESSION_COOKIE, SESSION_TTL_MS, hashPassword, hashToken, randomHex, verifyPassword } from './auth';
import * as db from './db';

type AppEnv = { Bindings: Env; Variables: { user: User } };

const app = new Hono<AppEnv>().basePath('/api');

const fail = (c: Context, status: 400 | 401 | 404 | 409, error: string) => c.json({ error }, status);

const DUMMY_SALT = '00'.repeat(16);
const DUMMY_HASH = '00'.repeat(32);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function readJson<T>(c: Context): Promise<Partial<T>> {
  try {
    const body = await c.req.json();
    return body && typeof body === 'object' ? body : {};
  } catch {
    return {};
  }
}

async function startSession(c: Context<AppEnv>, userId: string) {
  const token = randomHex(32);
  const expiresAt = Date.now() + SESSION_TTL_MS;
  await db.createSession(c.env.DB, await hashToken(token), userId, expiresAt);
  setCookie(c, SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  });
}

async function meResponse(c: Context<AppEnv>, user: User) {
  const [profile, tracker] = await Promise.all([db.getProfile(c.env.DB, user.id), db.getTracker(c.env.DB, user.id)]);
  return c.json({ user, profile, tracker });
}

// ---------- Авторизация ----------

app.post('/auth/register', async (c) => {
  const body = await readJson<{ name: string; email: string; password: string }>(c);
  const email = String(body.email ?? '').trim().toLowerCase();
  const name = String(body.name ?? '').trim().slice(0, 60) || 'Студент';
  const password = String(body.password ?? '');

  if (!EMAIL_RE.test(email) || email.length > 200) return fail(c, 400, 'Проверь email.');
  if (password.length < 8 || password.length > 200) return fail(c, 400, 'Пароль — минимум 8 символов.');
  if (await db.findUserByEmail(c.env.DB, email)) return fail(c, 409, 'Аккаунт с таким email уже есть — войди.');

  const { hash, salt } = await hashPassword(password);
  const user: User = { id: crypto.randomUUID(), email, name };
  await db.createUser(c.env.DB, { ...user, hash, salt });
  await startSession(c, user.id);
  return meResponse(c, user);
});

app.post('/auth/login', async (c) => {
  const body = await readJson<{ email: string; password: string }>(c);
  const email = String(body.email ?? '').trim().toLowerCase();
  const row = await db.findUserByEmail(c.env.DB, email);
  // одинаковая ошибка и примерно одинаковое время ответа для «нет такого email» и «неверный пароль»
  const ok = await verifyPassword(String(body.password ?? ''), row?.password_hash ?? DUMMY_HASH, row?.password_salt ?? DUMMY_SALT);
  if (!row || !ok) {
    return fail(c, 401, 'Неверный email или пароль.');
  }
  await startSession(c, row.id);
  return meResponse(c, { id: row.id, email: row.email, name: row.name });
});

app.post('/auth/logout', async (c) => {
  const token = getCookie(c, SESSION_COOKIE);
  if (token) await db.deleteSession(c.env.DB, await hashToken(token));
  deleteCookie(c, SESSION_COOKIE, { path: '/', secure: true });
  return c.json({ ok: true });
});

// ---------- Всё ниже — только для вошедших ----------

const requireUser = createMiddleware<AppEnv>(async (c, next) => {
  const token = getCookie(c, SESSION_COOKIE);
  const user = token ? await db.userBySession(c.env.DB, await hashToken(token)) : null;
  if (!user) return fail(c, 401, 'Нужно войти.');
  c.set('user', user);
  await next();
});

app.get('/me', requireUser, (c) => meResponse(c, c.get('user')));

const ALLOWED: Record<keyof Profile, readonly string[] | null> = {
  degree: ['bachelor', 'master'],
  stage: ['preparing', 'applying', 'admitted'],
  funding: ['full', 'self'],
  ielts: null,
  gpa: null,
  sat: null,
};

app.put('/profile', requireUser, async (c) => {
  const body = await readJson<Profile>(c);
  const profile: Record<string, string> = {};
  for (const [key, allowed] of Object.entries(ALLOWED) as [keyof Profile, readonly string[] | null][]) {
    const value = body[key];
    if (value === undefined || value === null || value === '') continue;
    const str = String(value).trim().slice(0, 20);
    if (allowed && !allowed.includes(str)) return fail(c, 400, `Недопустимое значение поля ${key}.`);
    profile[key] = str;
  }
  await db.saveProfile(c.env.DB, c.get('user').id, profile as Profile);
  return c.json({ profile });
});

app.post('/tracker', requireUser, async (c) => {
  const { countryId } = await readJson<{ countryId: string }>(c);
  if (!countryId || !countryById(String(countryId))) return fail(c, 400, 'Неизвестная страна.');
  await db.addTrackerItem(c.env.DB, c.get('user').id, String(countryId));
  return c.json({ tracker: await db.getTracker(c.env.DB, c.get('user').id) });
});

app.delete('/tracker/:countryId', requireUser, async (c) => {
  await db.removeTrackerItem(c.env.DB, c.get('user').id, c.req.param('countryId'));
  return c.json({ ok: true });
});

app.patch('/tracker/:countryId', requireUser, async (c) => {
  const country = countryById(c.req.param('countryId'));
  if (!country) return fail(c, 400, 'Неизвестная страна.');
  const body = await readJson<{ done: string[]; submitted: boolean }>(c);

  const patch: { done?: string[]; submitted?: boolean } = {};
  if (body.done !== undefined) {
    const allowed = docsFor(country);
    if (!Array.isArray(body.done) || body.done.some((d) => !allowed.includes(d))) return fail(c, 400, 'Неизвестный документ.');
    patch.done = [...new Set(body.done)];
  }
  if (body.submitted !== undefined) patch.submitted = Boolean(body.submitted);

  const item = await db.updateTrackerItem(c.env.DB, c.get('user').id, country.id, patch);
  if (!item) return fail(c, 404, 'Программы нет в трекере.');
  return c.json({ item });
});

app.notFound((c) => fail(c, 404, 'Нет такого метода API.'));

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: 'Ошибка сервера, попробуй ещё раз.' }, 500);
});

export default app;
