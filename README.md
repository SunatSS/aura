# AURA — база программ и трекер заявок

Образовательная платформа для самостоятельного поступления за рубеж на гранты.
Дизайн — [Figma AURA01](https://www.figma.com/design/Fz0b5mE2fDTU3igLv9Lom8/AURA01).

## Стек

- **Фронтенд:** React + Vite + TypeScript, React Router.
- **Бэкенд:** Cloudflare Worker на [Hono](https://hono.dev) (`worker/`), отдаёт и статику, и `/api/*`.
- **База данных:** Cloudflare D1 (SQLite), схема в `migrations/`.
- **AI:** Workers AI (`@cf/google/gemma-4-26b-a4b-it`), резерв — Gemini API (`worker/ai.ts`).
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
| `/mentor` | AI-ментор: ревью эссе, упаковщик CV, FAQ-бот «Бюрократ» |

## API

| Метод | Путь | |
|---|---|---|
| POST | `/api/auth/register` | `{name, email, password}` |
| POST | `/api/auth/login` | `{email, password}` |
| POST | `/api/auth/logout` | |
| GET | `/api/auth/providers` | `{google: bool}` — настроен ли вход через Google |
| GET | `/api/auth/google/start` → `/callback` | вход через Google (OAuth 2.0 + PKCE) |
| GET | `/api/me` | пользователь, анкета, трекер |
| PUT | `/api/profile` | ответы квиза |
| POST | `/api/tracker` | `{countryId}` |
| PATCH | `/api/tracker/:countryId` | `{done?, submitted?}` |
| DELETE | `/api/tracker/:countryId` | |
| GET | `/api/ai/quota` | сколько AI-запросов осталось сегодня |
| POST | `/api/ai/essay` | `{text}` → разбор эссе (JSON) |
| POST | `/api/ai/cv` | `{text}` → пункты CV |
| POST | `/api/ai/faq` | `{question}` → ответ по базе AURA + источники |

Пароли хешируются PBKDF2-SHA256, сессия — HttpOnly-cookie на 30 дней (в базе хранится только хеш токена).

## Вход через Google

1. Google Cloud Console → Google Auth Platform: экран согласия (External, scopes `openid email profile`),
   затем **Clients → Web application** с redirect URI:
   `https://aura.free-edu.workers.dev/api/auth/google/callback` и `http://localhost:5173/api/auth/google/callback`.
2. Client ID — в `GOOGLE_CLIENT_ID` (`wrangler.jsonc`), Client Secret — секретом `GOOGLE_CLIENT_SECRET`
   в Cloudflare (локально — в `.dev.vars`, см. `.dev.vars.example`).
3. Пока приложение в режиме Testing, войти могут только тестовые пользователи из консоли Google; для всех — Publish app.

Если почта из Google совпадает с уже зарегистрированной, аккаунты связываются (`oauth_accounts`).

## AI и лимиты

- Бесплатный Workers AI — 10 000 нейронов в день на аккаунт (~250 запросов к Gemma 4). Сервер ведёт учёт
  в таблице `ai_daily_budget` и останавливается на `AI_DAILY_NEURON_BUDGET` (9 000).
- Каждому пользователю — `AI_USER_DAILY_LIMIT` (15) запросов в день (`ai_user_usage`). Если модель не ответила, запрос не списывается.
- Лимиты сбрасываются в 00:00 UTC. Настройки — в `vars` файла `wrangler.jsonc`.
- **Gemini (необязательно):** если задан секрет `GEMINI_API_KEY`, он используется, когда бюджет Workers AI
  исчерпан или Workers AI ответил ошибкой. Ключ создаётся в [Google AI Studio](https://aistudio.google.com/apikey)
  и добавляется в дашборде Cloudflare: Worker `aura` → Settings → Variables and Secrets → Add → Secret.
  На бесплатном тарифе Google может использовать запросы для улучшения моделей.
- FAQ-бот ищет подходящие разделы в контенте сайта (`src/data/kb.ts`) и передаёт модели только их.
- Промпты — `worker/prompts.ts`.

## SEO

- Сайт — SPA, но Worker (`worker/seo.ts`) подставляет в HTML каждой страницы свои `title`, `description`,
  `canonical`, Open Graph / Twitter-карточку (`public/og.png`) и JSON-LD (WebSite, Organization, Article,
  BreadcrumbList, ItemList). Поисковики и превью ссылок в мессенджерах видят правильные данные без выполнения JS.
- Метаданные описаны в одном месте — `src/seo/meta.ts`; React обновляет их при переходах (`src/seo/RouteEffects.tsx`).
- `/sitemap.xml` и `/robots.txt` генерируются из данных сайта. Личные страницы (`/dashboard`, `/mentor` и т.д.)
  помечены `noindex`, несуществующие адреса отдают 404.
- Адрес сайта для canonical и sitemap — `SITE_URL` в `wrangler.jsonc`.

## Доступность

- Ссылка «Перейти к содержимому», заметная рамка фокуса для клавиатуры (`:focus-visible`).
- При переходе между страницами фокус переносится на основной контент, заголовок вкладки обновляется.
- Цвета под белым текстом и цветной текст проверены на контраст WCAG AA (≥ 4.5:1).
- ARIA: состояния фильтров и вариантов квиза (`aria-pressed`), аккордеоны (`aria-expanded`/`aria-controls`),
  вкладки AI-ментора по паттерну WAI-ARIA Tabs (стрелки переключают вкладки), прогресс-бары и оценки с подписями,
  живые области для результатов поиска и ответов бота.
- Мобильное меню закрывается по Escape; уважается настройка «уменьшить движение».

## Локальный запуск

Нужен Node.js 22+ (`.nvmrc`).

```bash
npm install
npm run db:migrate:local   # создать таблицы в локальной D1 (.wrangler/)
npm run dev                # http://localhost:5173 — фронт + Worker + локальная D1
```

Логин в Cloudflare для локальной разработки не нужен — но тогда AI-ментор отвечает «недоступен»:
модели Workers AI работают только в облаке. Чтобы проверить AI локально:

```bash
npx wrangler login   # один раз, откроется браузер
npm run dev:ai
```

Локальные запросы к AI тратят тот же дневной бесплатный лимит аккаунта.

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

- Вход через Google (OAuth).
