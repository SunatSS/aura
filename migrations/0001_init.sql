-- Пользователи, сессии, анкета квиза и трекер программ

CREATE TABLE users (
  id            TEXT PRIMARY KEY,
  email         TEXT NOT NULL UNIQUE,
  name          TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  password_salt TEXT NOT NULL,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE sessions (
  token_hash TEXT PRIMARY KEY,
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at INTEGER NOT NULL
);
CREATE INDEX sessions_user ON sessions(user_id);

CREATE TABLE profiles (
  user_id    TEXT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  degree     TEXT,
  stage      TEXT,
  funding    TEXT,
  ielts      TEXT,
  gpa        TEXT,
  sat        TEXT,
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE tracker_items (
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  country_id TEXT NOT NULL,
  added_at   TEXT NOT NULL DEFAULT (datetime('now')),
  submitted  INTEGER NOT NULL DEFAULT 0,
  done_docs  TEXT NOT NULL DEFAULT '[]', -- JSON-массив отмеченных документов
  PRIMARY KEY (user_id, country_id)
);
