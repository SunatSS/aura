# AURA — база программ и трекер заявок

Образовательная платформа для самостоятельного поступления за рубеж на гранты.
Дизайн — [Figma AURA01](https://www.figma.com/design/Fz0b5mE2fDTU3igLv9Lom8/AURA01).

## Стек

- **Фронтенд:** React + Vite + TypeScript, React Router.
- **Бэкенд:** Cloudflare Worker на [Hono](https://hono.dev) (`worker/`), отдаёт и статику, и `/api/*`.
- **База данных:** Cloudflare D1 (SQLite), схема в `migrations/`.
- Всё укладывается в бесплатный план Cloudflare Workers.

## Страницы

| Путь | Экран |
|---|---|
| `/` | Лендинг |
| `/catalog` | Каталог 18 стран с поиском и фильтрами |
| `/country/:id` | Страница страны (полный разбор: `korea`, `turkey`; остальные — шаблон) |
| `/guides`, `/guides/:slug` | Гайды: эссе, рекомендательное письмо, Common App |
| `/register`, `/login` | Регистрация и вход по email + пароль |
| `/onboarding` | Квиз: степень, этап, финансирование, баллы |
| `/dashboard` | Кабинет: прогресс, мои программы, чек-лист документов, дедлайны, рекомендации |

## API

| Метод | Путь | |
|---|---|---|
| POST | `/api/auth/register` | `{name, email, password}` |
| POST | `/api/auth/login` | `{email, password}` |
| POST | `/api/auth/logout` | |
| GET | `/api/me` | пользователь, анкета, трекер |
| PUT | `/api/profile` | ответы квиза |
| POST | `/api/tracker` | `{countryId}` |
| PATCH | `/api/tracker/:countryId` | `{done?, submitted?}` |
| DELETE | `/api/tracker/:countryId` | |

Пароли хешируются PBKDF2-SHA256, сессия — HttpOnly-cookie на 30 дней (в базе хранится только хеш токена).

## Локальный запуск

Нужен Node.js 22+ (`.nvmrc`).

```bash
npm install
npm run db:migrate:local   # создать таблицы в локальной D1 (.wrangler/)
npm run dev                # http://localhost:5173 — фронт + Worker + локальная D1
```

Логин в Cloudflare для локальной разработки не нужен.

## Деплой (Workers Builds)

Один раз в дашборде Cloudflare: **Workers & Pages → Create → Import a repository → SunatSS/aura**.

- Имя проекта: `aura` (совпадает с `name` в `wrangler.jsonc`)
- Build command: `npm run build`
- Deploy command: `npx wrangler d1 migrations apply DB --remote && npx wrangler deploy`

После этого каждый push в `main` собирается и деплоится сам, новые миграции применяются автоматически.

## Где править контент

- `src/data/countries.ts` — страны, гранты, пороги IELTS/GPA, дедлайны, ссылки, документы (места с `TODO` сверить с первоисточниками).
- `src/data/countryDetails/*.ts`, `src/data/guides/*.ts` — тексты страниц, описываются блоками из `src/data/types.ts`.

## Новая таблица или поле

```bash
npx wrangler d1 migrations create DB <название>   # создаст migrations/000N_<название>.sql
npm run db:migrate:local
```

## Дальше

- AI-функции на Workers AI (ревьюер эссе, упаковщик CV, FAQ-бот) — binding `AI` в `wrangler.jsonc`.
- Вход через Google (OAuth).
