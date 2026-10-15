// Общие помощники для роутов API.
import type { Context } from 'hono';
import { getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';
import type { User } from '../src/api/types';
import { SESSION_COOKIE, hashToken } from './auth';
import { userBySession } from './db';

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
  if (!user) return fail(c, 401, 'Нужно войти.');
  c.set('user', user);
  await next();
});
