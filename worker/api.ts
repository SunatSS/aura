import { Hono, type Context } from 'hono';
import { deleteCookie, getCookie } from 'hono/cookie';
import type { Profile, User } from '../src/api/types';
import { countryById, normalizeDocId } from '../src/data/countries';
import { aiRoutes } from './aiRoutes';
import { SESSION_COOKIE, hashPassword, hashToken, verifyPassword } from './auth';
import * as db from './db';
import { fail, readJson, requireUser, startSession, type AppEnv } from './http';
import { msg } from './messages';
import { googleConfigured, googleRoutes } from './oauth';

const app = new Hono<AppEnv>().basePath('/api');

const DUMMY_SALT = '00'.repeat(16);
const DUMMY_HASH = '00'.repeat(32);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  if (!EMAIL_RE.test(email) || email.length > 200) return fail(c, 400, msg(c).emailInvalid);
  if (password.length < 8 || password.length > 200) return fail(c, 400, msg(c).passwordShort);
  if (await db.findUserByEmail(c.env.DB, email)) return fail(c, 409, msg(c).emailTaken);

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
    return fail(c, 401, msg(c).badLogin);
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
    if (allowed && !allowed.includes(str)) return fail(c, 400, msg(c).badField(key));
    profile[key] = str;
  }
  await db.saveProfile(c.env.DB, c.get('user').id, profile as Profile);
  return c.json({ profile });
});

app.post('/tracker', requireUser, async (c) => {
  const { countryId } = await readJson<{ countryId: string }>(c);
  if (!countryId || !countryById(String(countryId))) return fail(c, 400, msg(c).unknownCountry);
  await db.addTrackerItem(c.env.DB, c.get('user').id, String(countryId));
  return c.json({ tracker: await db.getTracker(c.env.DB, c.get('user').id) });
});

app.delete('/tracker/:countryId', requireUser, async (c) => {
  await db.removeTrackerItem(c.env.DB, c.get('user').id, c.req.param('countryId'));
  return c.json({ ok: true });
});

app.patch('/tracker/:countryId', requireUser, async (c) => {
  const country = countryById(c.req.param('countryId'));
  if (!country) return fail(c, 400, msg(c).unknownCountry);
  const body = await readJson<{ done: string[]; submitted: boolean }>(c);

  const patch: { done?: string[]; submitted?: boolean } = {};
  if (body.done !== undefined) {
    // принимаем id документов (и старые русские подписи — переводим их в id)
    const ids = Array.isArray(body.done) ? body.done.map((d) => normalizeDocId(country, String(d))) : [null];
    if (ids.some((d) => d === null)) return fail(c, 400, msg(c).unknownDoc);
    patch.done = [...new Set(ids as string[])];
  }
  if (body.submitted !== undefined) patch.submitted = Boolean(body.submitted);

  const item = await db.updateTrackerItem(c.env.DB, c.get('user').id, country.id, patch);
  if (!item) return fail(c, 404, msg(c).notTracked);
  return c.json({ item });
});

app.route('/ai', aiRoutes);
app.route('/auth/google', googleRoutes);
app.get('/auth/providers', (c) => c.json({ google: googleConfigured(c.env) }));

app.notFound((c) => fail(c, 404, msg(c).noMethod));

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: msg(c).serverError }, 500);
});

export const api = app;
