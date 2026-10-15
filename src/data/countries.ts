// База направлений. Названия и теги — из макета (каталог «Куда поступаем?»).
// Пороги IELTS/GPA, дедлайны и ссылки — ориентир для MVP; команда контента
// должна сверить их с первоисточниками перед релизом (см. TODO ниже).

export type Degree = 'bachelor' | 'master' | 'phd';

export type Country = {
  id: string;
  name: string;
  short?: string; // сокращение для узкой карточки, как «Великобрит.» в макете
  flag: string; // ISO-код для круглого флага
  grant: string;
  tags: string;
  degrees: Degree[];
  fullGrant: boolean;
  ieltsMin?: number;
  gpaMin?: string;
  // Ориентировочные окна подачи в формате MM-DD (повторяются каждый год)
  deadlines: { early?: string; late: string; note?: string };
  links: { label: string; url: string }[];
  extraDocs?: string[];
};

export const countries: Country[] = [
  {
    id: 'china', name: 'Китай', flag: 'cn', grant: 'CSC', tags: 'Бак/Маг/PhD • Полный грант',
    degrees: ['bachelor', 'master', 'phd'], fullGrant: true, ieltsMin: 6.0, gpaMin: '75%+',
    deadlines: { early: '01-15', late: '04-15', note: 'Окно CSC: январь — апрель, у каждого вуза свой срок' },
    links: [{ label: 'Campus China — портал CSC', url: 'https://www.campuschina.org' }],
    extraDocs: ['Форма медосмотра Foreigner Physical Examination', 'Справка о несудимости'],
  },
  {
    id: 'germany', name: 'Германия', flag: 'de', grant: 'DAAD', tags: 'Маг/PhD • Стипендии',
    degrees: ['master', 'phd'], fullGrant: true, ieltsMin: 6.5, gpaMin: 'Хорошо+ (≈ 3.0/4.0)',
    deadlines: { early: '08-01', late: '10-31', note: 'Программы EPOS обычно принимают заявки с августа по октябрь' },
    links: [
      { label: 'DAAD — база стипендий', url: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/' },
      { label: 'uni-assist — подача в вузы', url: 'https://www.uni-assist.de/en/' },
    ],
    extraDocs: ['CV в формате Europass', 'Подтверждение опыта работы (для EPOS)'],
  },
  {
    id: 'turkey', name: 'Турция', flag: 'tr', grant: 'Türkiye Burslari', tags: 'Бак/Маг/PhD • 100% + жильё',
    degrees: ['bachelor', 'master', 'phd'], fullGrant: true, gpaMin: '70% (бак), 75% (маг/PhD)',
    deadlines: { late: '02-20', note: 'Подача на tbbs.turkiyeburslari.gov.tr — январь–февраль' },
    links: [{ label: 'Türkiye Burslari — официальный сайт', url: 'https://www.turkiyeburslari.gov.tr' }],
    extraDocs: ['Скан удостоверения личности/паспорта', 'Результаты экзаменов (если есть)'],
  },
  {
    id: 'italy', name: 'Италия', flag: 'it', grant: 'DSU', tags: 'Бак/Маг • Социальный грант (по доходу)',
    degrees: ['bachelor', 'master'], fullGrant: false, ieltsMin: 6.0, gpaMin: 'Без жёсткого порога',
    deadlines: { early: '03-01', late: '09-01', note: 'Предзаявка в вуз весной, DSU-заявка в регионе — июль–сентябрь' },
    links: [{ label: 'Universitaly — предзаявка и виза', url: 'https://www.universitaly.it' }],
    extraDocs: ['ISEE parificato — справка о доходах семьи', 'Dichiarazione di Valore / CIMEA'],
  },
  {
    id: 'usa', name: 'США', flag: 'us', grant: 'COMMON APP', tags: 'Платформа заявок',
    degrees: ['bachelor'], fullGrant: true, ieltsMin: 7.0, gpaMin: '3.7/4.0+ для сильных вузов',
    deadlines: { early: '11-01', late: '01-01', note: 'Early Decision/Action — 1 ноября, Regular — 1 января' },
    links: [
      { label: 'Common App', url: 'https://www.commonapp.org' },
      { label: 'CSS Profile — need-based помощь', url: 'https://cssprofile.collegeboard.org' },
    ],
    extraDocs: ['CSS Profile / финансовые документы', 'Школьный транскрипт от советника', 'SAT/ACT (если не test-optional)'],
  },
  {
    id: 'hungary', name: 'Венгрия', flag: 'hu', grant: 'Stipendium Hungaricum', tags: 'Бак/Маг/PhD • Полный грант',
    degrees: ['bachelor', 'master', 'phd'], fullGrant: true, ieltsMin: 5.5, gpaMin: '≈ 70%+',
    deadlines: { late: '01-15', note: 'Основной приём заявок — ноябрь–январь' },
    links: [{ label: 'Stipendium Hungaricum', url: 'https://stipendiumhungaricum.hu' }],
    extraDocs: ['Медицинская справка по форме программы'],
  },
  {
    id: 'korea', name: 'Южная Корея', flag: 'kr', grant: 'GKS', tags: 'Бак/Маг/PhD • 100% + языковой год',
    degrees: ['bachelor', 'master', 'phd'], fullGrant: true, ieltsMin: 5.5, gpaMin: '80% (3.2/4.0)',
    deadlines: { early: '10-10', late: '10-25', note: 'Embassy Track — ~10–15 октября, University Track — середина-конец октября' },
    links: [
      { label: 'Study in Korea — официальный портал', url: 'https://www.studyinkorea.go.kr' },
      { label: 'NIIED — институт, который выдаёт GKS', url: 'https://www.niied.go.kr' },
    ],
    extraDocs: ['Study Plan', 'Personal Statement', 'Портфолио грамот (A4, цветное)', 'TOPIK (по желанию)'],
  },
  {
    id: 'japan', name: 'Япония', flag: 'jp', grant: 'MEXT', tags: 'Бак/Маг/PhD • Полный грант',
    degrees: ['bachelor', 'master', 'phd'], fullGrant: true, ieltsMin: 6.0, gpaMin: '≈ 80%+',
    deadlines: { late: '05-31', note: 'Embassy Recommendation — весна, экзамены в посольстве летом' },
    links: [{ label: 'Study in Japan (JASSO)', url: 'https://www.studyinjapan.go.jp/en/' }],
    extraDocs: ['Field of Study and Study Program', 'Медицинский сертификат по форме MEXT'],
  },
  {
    id: 'uae', name: 'ОАЭ', flag: 'ae', grant: 'частн. гранты', tags: 'Скидки вузов до 100%',
    degrees: ['bachelor', 'master'], fullGrant: false, ieltsMin: 6.0,
    deadlines: { late: '03-01', note: 'Сроки различаются по вузам — уточняй на сайте выбранного вуза' /* TODO: контент */ },
    links: [],
  },
  {
    id: 'uk', name: 'Великобритания', short: 'Великобрит.', flag: 'gb', grant: 'Chevening Scholarship', tags: 'Только магистратура • 100%',
    degrees: ['master'], fullGrant: true, ieltsMin: 6.5, gpaMin: 'Диплом бакалавра + 2 года опыта',
    deadlines: { late: '11-05', note: 'Приём заявок на Chevening — август–начало ноября' },
    links: [{ label: 'Chevening — официальный сайт', url: 'https://www.chevening.org' }],
    extraDocs: ['4 эссе Chevening', '3 оффера от британских вузов'],
  },
  {
    id: 'malaysia', name: 'Малайзия', flag: 'my', grant: 'MIS и частн./академ. гранты', tags: 'Маг/PhD • Стипендия',
    degrees: ['master', 'phd'], fullGrant: false, ieltsMin: 6.0,
    deadlines: { late: '06-30', note: 'Сроки различаются по вузам — уточняй на сайте выбранного вуза' /* TODO: контент */ },
    links: [{ label: 'Education Malaysia', url: 'https://educationmalaysia.gov.my' }],
  },
  {
    id: 'singapore', name: 'Сингапур', flag: 'sg', grant: 'MOE и частн. стипендии', tags: 'Субсидия • Отработка 3 года',
    degrees: ['bachelor', 'master'], fullGrant: false, ieltsMin: 6.5,
    deadlines: { late: '02-28', note: 'Приём в NUS/NTU для школьников — ориентировочно до конца февраля' },
    links: [{ label: 'MOE Tuition Grant', url: 'https://www.moe.gov.sg' }],
  },
  {
    id: 'north-cyprus', name: 'Кипр Северный', flag: 'cy-nc', grant: 'частн. гранты', tags: 'Скидки вузов до 100%',
    degrees: ['bachelor', 'master'], fullGrant: false, ieltsMin: 5.5,
    deadlines: { late: '08-15', note: 'Сроки различаются по вузам — уточняй на сайте выбранного вуза' /* TODO: контент */ },
    links: [],
  },
  {
    id: 'russia', name: 'Россия', flag: 'ru', grant: 'ЕГЭ/ОГЭ и частн. гранты', tags: 'Бюджет • Квоты Правительства',
    degrees: ['bachelor', 'master', 'phd'], fullGrant: true,
    deadlines: { late: '01-15', note: 'Квота Правительства: отбор осенью–зимой' },
    links: [{ label: 'Education in Russia — квота', url: 'https://education-in-russia.com' }],
  },
  {
    id: 'kazakhstan', name: 'Казахстан', flag: 'kz', grant: 'гос./частн. гранты', tags: 'Скидки вузов до 100%',
    degrees: ['bachelor', 'master'], fullGrant: false, ieltsMin: 6.0,
    deadlines: { late: '03-01', note: 'Сроки различаются по вузам — уточняй на сайте выбранного вуза' /* TODO: контент */ },
    links: [],
  },
  {
    id: 'uzbekistan', name: 'Узбекистан', flag: 'uz', grant: 'гос./частн. гранты', tags: 'Скидки вузов до 100%',
    degrees: ['bachelor', 'master'], fullGrant: false,
    deadlines: { late: '07-15', note: 'Сроки различаются по вузам — уточняй на сайте выбранного вуза' /* TODO: контент */ },
    links: [],
  },
  {
    id: 'kyrgyzstan', name: 'Киргизстан', flag: 'kg', grant: 'AUCA', tags: 'Бак/Маг • Скидки и гранты',
    degrees: ['bachelor', 'master'], fullGrant: false, ieltsMin: 5.5,
    deadlines: { early: '01-15', late: '05-15', note: 'Сроки различаются по вузам — уточняй на сайте выбранного вуза' /* TODO: контент */ },
    links: [{ label: 'AUCA — Американский университет в Центральной Азии', url: 'https://auca.kg' }],
  },
  {
    id: 'tajikistan', name: 'Таджикистан', flag: 'tj', grant: 'гос./частн. гранты', tags: 'Скидки вузов до 100%',
    degrees: ['bachelor', 'master'], fullGrant: false,
    deadlines: { late: '07-15', note: 'Сроки различаются по вузам — уточняй на сайте выбранного вуза' /* TODO: контент */ },
    links: [],
  },
];

export const countryById = (id: string) => countries.find((c) => c.id === id);

export const baseDocs = [
  'Загранпаспорт',
  'Аттестат / диплом + вкладыш',
  'Апостиль на оригинал',
  'Нотариальный перевод',
  'Сертификат IELTS / TOEFL',
  'Мотивационное письмо',
  '2 рекомендательных письма',
  'CV',
];

export const docsFor = (c: Country) => [...baseDocs, ...(c.extraDocs ?? [])];

// Северный Кипр не входит в набор circle-flags — показываем флаг Кипра
export const flagUrl = (code: string) =>
  `https://cdn.jsdelivr.net/gh/HatScripts/circle-flags@2.7.0/flags/${code === 'cy-nc' ? 'cy' : code}.svg`;
