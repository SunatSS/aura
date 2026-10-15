// Запросы к D1. Формы ответов совпадают с типами фронтенда (src/api/types.ts).
import type { Profile, TrackerItem, User } from '../src/api/types';

type UserRow = { id: string; email: string; name: string; password_hash: string; password_salt: string };
type TrackerRow = { country_id: string; added_at: string; submitted: number; done_docs: string };

export const findUserByEmail = (db: D1Database, email: string) =>
  db.prepare('SELECT id, email, name, password_hash, password_salt FROM users WHERE email = ?').bind(email).first<UserRow>();

export async function createUser(db: D1Database, user: { id: string; email: string; name: string; hash: string; salt: string }) {
  await db
    .prepare('INSERT INTO users (id, email, name, password_hash, password_salt) VALUES (?, ?, ?, ?, ?)')
    .bind(user.id, user.email, user.name, user.hash, user.salt)
    .run();
}

export async function createSession(db: D1Database, tokenHash: string, userId: string, expiresAt: number) {
  await db.prepare('INSERT INTO sessions (token_hash, user_id, expires_at) VALUES (?, ?, ?)').bind(tokenHash, userId, expiresAt).run();
}

export const deleteSession = (db: D1Database, tokenHash: string) =>
  db.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(tokenHash).run();

export async function userBySession(db: D1Database, tokenHash: string): Promise<User | null> {
  const row = await db
    .prepare('SELECT u.id, u.email, u.name FROM sessions s JOIN users u ON u.id = s.user_id WHERE s.token_hash = ? AND s.expires_at > ?')
    .bind(tokenHash, Date.now())
    .first<{ id: string; email: string; name: string }>();
  return row ? { id: row.id, email: row.email, name: row.name } : null;
}

export async function getProfile(db: D1Database, userId: string): Promise<Profile | null> {
  const row = await db
    .prepare('SELECT degree, stage, funding, ielts, gpa, sat FROM profiles WHERE user_id = ?')
    .bind(userId)
    .first<Record<keyof Profile, string | null>>();
  if (!row) return null;
  // null из БД → отсутствующее поле, как на фронтенде
  return Object.fromEntries(Object.entries(row).filter(([, v]) => v !== null)) as Profile;
}

export async function saveProfile(db: D1Database, userId: string, p: Profile) {
  await db
    .prepare(
      `INSERT INTO profiles (user_id, degree, stage, funding, ielts, gpa, sat, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
       ON CONFLICT(user_id) DO UPDATE SET degree = excluded.degree, stage = excluded.stage, funding = excluded.funding,
         ielts = excluded.ielts, gpa = excluded.gpa, sat = excluded.sat, updated_at = excluded.updated_at`,
    )
    .bind(userId, p.degree ?? null, p.stage ?? null, p.funding ?? null, p.ielts ?? null, p.gpa ?? null, p.sat ?? null)
    .run();
}

const toItem = (r: TrackerRow): TrackerItem => ({
  countryId: r.country_id,
  addedAt: r.added_at,
  submitted: r.submitted === 1,
  done: JSON.parse(r.done_docs),
});

export async function getTracker(db: D1Database, userId: string): Promise<TrackerItem[]> {
  const { results } = await db
    .prepare('SELECT country_id, added_at, submitted, done_docs FROM tracker_items WHERE user_id = ? ORDER BY added_at')
    .bind(userId)
    .all<TrackerRow>();
  return results.map(toItem);
}

export async function addTrackerItem(db: D1Database, userId: string, countryId: string) {
  await db.prepare('INSERT OR IGNORE INTO tracker_items (user_id, country_id) VALUES (?, ?)').bind(userId, countryId).run();
}

export const removeTrackerItem = (db: D1Database, userId: string, countryId: string) =>
  db.prepare('DELETE FROM tracker_items WHERE user_id = ? AND country_id = ?').bind(userId, countryId).run();

export async function updateTrackerItem(db: D1Database, userId: string, countryId: string, patch: { done?: string[]; submitted?: boolean }) {
  const row = await db
    .prepare(
      `UPDATE tracker_items SET
         done_docs = COALESCE(?, done_docs),
         submitted = COALESCE(?, submitted)
       WHERE user_id = ? AND country_id = ?
       RETURNING country_id, added_at, submitted, done_docs`,
    )
    .bind(
      patch.done ? JSON.stringify(patch.done) : null,
      patch.submitted === undefined ? null : Number(patch.submitted),
      userId,
      countryId,
    )
    .first<TrackerRow>();
  return row ? toItem(row) : null;
}
