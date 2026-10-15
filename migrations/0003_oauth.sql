-- Вход через внешних провайдеров (пока только Google).
-- Пользователь, созданный через Google, хранится в users с пустым паролем.

CREATE TABLE oauth_accounts (
  provider   TEXT NOT NULL,
  subject    TEXT NOT NULL, -- постоянный id пользователя у провайдера (claim "sub")
  user_id    TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  email      TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (provider, subject)
);
CREATE INDEX oauth_accounts_user ON oauth_accounts(user_id);
