// Общие помощники для роутов API.
import type { Context } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';
import type { User } from '../src/api/types';
import { SESSION_COOKIE, SESSION_TTL_MS, hashToken, randomHex } from './auth';
import { createSession, userBySession } from './db';
import { msg } from './messages';

export type AppEnv = { Bindings: Env; Variables: { user: User } };

export const fail = (c: Context, status: 400 | 401 | 404 | 409 | 429 | 503, error: string) => c.json({ error }, status);

export async function readJson<T>(c: Context): Promise<Partial<T>> {
  try {
    const body = await c.req.json();
    return body && typeof body === 'object' ? body : {};
  } catch {
    return {};
  }
}

export const requireUser = createMiddleware<AppEnv>(async (c, next) => {
  const token = getCookie(c, SESSION_COOKIE);
  const user = token ? await userBySession(c.env.DB, await hashToken(token)) : null;
  if (!user) return fail(c, 401, msg(c).needLogin);
  c.set('user', user);
  await next();
});

export async function startSession(c: Context<AppEnv>, userId: string) {
  const token = randomHex(32);
  const expiresAt = Date.now() + SESSION_TTL_MS;
  await createSession(c.env.DB, await hashToken(token), userId, expiresAt);
  setCookie(c, SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'Lax',
    path: '/',
    maxAge: SESSION_TTL_MS / 1000,
  });
}

