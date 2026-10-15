-- Учёт AI-запросов: лимит на пользователя и общий дневной бюджет нейронов Workers AI.
-- day — дата в UTC (YYYY-MM-DD): бесплатный лимит Cloudflare сбрасывается в 00:00 UTC.

CREATE TABLE ai_user_usage (
  user_id  TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  day      TEXT NOT NULL,
  requests INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, day)
);

CREATE TABLE ai_daily_budget (
  day             TEXT PRIMARY KEY,
  neurons         REAL NOT NULL DEFAULT 0,
  workers_ai_runs INTEGER NOT NULL DEFAULT 0,
  gemini_runs     INTEGER NOT NULL DEFAULT 0
);
