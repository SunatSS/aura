// Сообщения API на языке пользователя. Язык приходит в заголовке X-Locale (его ставит фронтенд).
import type { Context } from 'hono';
import { DEFAULT_LOCALE, isLocale, type Locale } from '../src/i18n/locales';

const ru = {
  emailInvalid: 'Проверь email.',
  passwordShort: 'Пароль — минимум 8 символов.',
  emailTaken: 'Аккаунт с таким email уже есть — войди.',
  badLogin: 'Неверный email или пароль.',
  badField: (key: string) => `Недопустимое значение поля ${key}.`,
  unknownCountry: 'Неизвестная страна.',
  unknownDoc: 'Неизвестный документ.',
  notTracked: 'Программы нет в трекере.',
  noMethod: 'Нет такого метода API.',
  needLogin: 'Нужно войти.',
  serverError: 'Ошибка сервера, попробуй ещё раз.',
  aiUnavailable: 'AI сейчас недоступен, попробуй через пару минут.',
  aiBudget: 'Дневной лимит AI на всю платформу исчерпан — он обновится в 00:00 UTC.',
  aiUserLimit: (n: number) => `Твой лимит на сегодня — ${n} AI-запросов — закончился. Он обновится в 00:00 UTC.`,
  aiBadFormat: 'Модель ответила в неожиданном формате. Попробуй ещё раз — запрос не списан.',
  essayShort: 'Вставь черновик целиком — хотя бы 300 символов.',
  essayLong: 'Слишком длинно: максимум 6000 символов (~900 слов).',
  cvShort: 'Опиши хотя бы одно своё занятие.',
  cvLong: 'Максимум 2000 символов — разбей на несколько запросов.',
  faqShort: 'Задай вопрос.',
  faqLong: 'Вопрос слишком длинный — максимум 500 символов.',
  faqNoAnswer: 'В базе AURA пока нет ответа на этот вопрос. Попробуй переформулировать (например, назови страну или документ) или проверь официальный сайт программы.',
};

type Messages = typeof ru;

const en: Messages = {
  emailInvalid: 'Check your email.',
  passwordShort: 'Password must be at least 8 characters.',
  emailTaken: 'An account with this email already exists — log in.',
  badLogin: 'Wrong email or password.',
  badField: (key) => `Invalid value for ${key}.`,
  unknownCountry: 'Unknown country.',
  unknownDoc: 'Unknown document.',
  notTracked: 'This programme is not in your tracker.',
  noMethod: 'No such API method.',
  needLogin: 'Please log in.',
  serverError: 'Server error, please try again.',
  aiUnavailable: 'AI is unavailable right now, try again in a couple of minutes.',
  aiBudget: 'The daily AI limit for the whole platform is used up — it resets at 00:00 UTC.',
  aiUserLimit: (n) => `Your limit for today — ${n} AI requests — is used up. It resets at 00:00 UTC.`,
  aiBadFormat: 'The model replied in an unexpected format. Try again — this request was not counted.',
  essayShort: 'Paste your whole draft — at least 300 characters.',
  essayLong: 'Too long: 6000 characters maximum (~900 words).',
  cvShort: 'Describe at least one thing you do.',
  cvLong: '2000 characters maximum — split it into several requests.',
  faqShort: 'Ask a question.',
  faqLong: 'The question is too long — 500 characters maximum.',
  faqNoAnswer: "The AURA knowledge base doesn't have an answer to this yet. Try rephrasing (name a country or document) or check the programme's official website.",
};

const tj: Messages = {
  emailInvalid: 'Email-ро тафтиш кун.',
  passwordShort: 'Парол бояд на камтар аз 8 аломат бошад.',
  emailTaken: 'Аккаунт бо ин email аллакай ҳаст — ворид шав.',
  badLogin: 'Email ё парол нодуруст аст.',
  badField: (key) => `Қимати нодуруст барои ${key}.`,
  unknownCountry: 'Кишвари номаълум.',
  unknownDoc: 'Ҳуҷҷати номаълум.',
  notTracked: 'Ин барнома дар трекер нест.',
  noMethod: 'Чунин усули API нест.',
  needLogin: 'Лутфан ворид шав.',
  serverError: 'Хатои сервер, бори дигар кӯшиш кун.',
  aiUnavailable: 'AI ҳоло дастрас нест, баъд аз чанд дақиқа кӯшиш кун.',
  aiBudget: 'Маҳдудияти рӯзонаи AI барои тамоми платформа тамом шуд — соати 00:00 UTC нав мешавад.',
  aiUserLimit: (n) => `Маҳдудияти имрӯзаи ту — ${n} дархости AI — тамом шуд. Соати 00:00 UTC нав мешавад.`,
  aiBadFormat: 'Модел дар шакли ғайричашмдошт ҷавоб дод. Бори дигар кӯшиш кун — дархост ҳисоб нашуд.',
  essayShort: 'Нусхаро пурра гузор — на камтар аз 300 аломат.',
  essayLong: 'Хеле дароз: ҳадди аксар 6000 аломат (~900 калима).',
  cvShort: 'Ақаллан як машғулияти худро нақл кун.',
  cvLong: 'Ҳадди аксар 2000 аломат — ба якчанд дархост тақсим кун.',
  faqShort: 'Савол деҳ.',
  faqLong: 'Савол хеле дароз аст — ҳадди аксар 500 аломат.',
  faqNoAnswer: 'Дар пойгоҳи AURA ҳоло ба ин савол ҷавоб нест. Саволро дигар хел навис (масалан, кишвар ё ҳуҷҷатро номбар кун) ё сомонаи расмии барномаро санҷ.',
};

const all: Record<Locale, Messages> = { ru, en, tj };

export const localeOf = (c: Context): Locale => {
  const l = c.req.header('X-Locale');
  return isLocale(l) ? l : DEFAULT_LOCALE;
};

export const msg = (c: Context) => all[localeOf(c)];
