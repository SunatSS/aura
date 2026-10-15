// Хеширование паролей и сессии на WebCrypto — без внешних зависимостей.

const PBKDF2_ITERATIONS = 100_000; // максимум, который поддерживает Workers runtime
export const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
export const SESSION_COOKIE = 'aura_session';

const enc = new TextEncoder();

const toHex = (buf: ArrayBuffer | Uint8Array) =>
  [...(buf instanceof Uint8Array ? buf : new Uint8Array(buf))].map((b) => b.toString(16).padStart(2, '0')).join('');

const fromHex = (hex: string) => new Uint8Array(hex.match(/.{2}/g)!.map((h) => parseInt(h, 16)));

export const randomHex = (bytes: number) => toHex(crypto.getRandomValues(new Uint8Array(bytes)));

async function pbkdf2(password: string, salt: Uint8Array) {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: PBKDF2_ITERATIONS }, key, 256);
  return new Uint8Array(bits);
}

export async function hashPassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return { hash: toHex(await pbkdf2(password, salt)), salt: toHex(salt) };
}

export async function verifyPassword(password: string, hashHex: string, saltHex: string) {
  const actual = await pbkdf2(password, fromHex(saltHex));
  const expected = fromHex(hashHex);
  if (actual.length !== expected.length) return false;
  // сравнение за постоянное время
  let diff = 0;
  for (let i = 0; i < actual.length; i++) diff |= actual[i] ^ expected[i];
  return diff === 0;
}

// В cookie лежит случайный токен, в БД — только его SHA-256:
// утечка таблицы sessions не даёт войти под пользователем.
export async function hashToken(token: string) {
  return toHex(await crypto.subtle.digest('SHA-256', enc.encode(token)));
}
