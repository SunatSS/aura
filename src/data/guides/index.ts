// Список гайдов (лёгкий: без текстов). Сами тексты — guides/<slug>.ts,
// на клиенте они грузятся только при открытии гайда (src/i18n/lazyPages.ts).
export type GuideMeta = { slug: string; title: string; summary: string; available: boolean };

export const guides: GuideMeta[] = [
  { slug: 'essay', title: 'Как написать мотивационное эссе, которое запомнят?', summary: 'Hook, метод STAR и вектор будущего — 15/70/15.', available: true },
  { slug: 'recommendation', title: 'Рекомендательное письмо: полное руководство', summary: 'Кого просить, Brag Sheet, архитектура письма, peer rec.', available: true },
  { slug: 'common-app', title: 'Как заполнить Common App', summary: 'Семь разделов анкеты и need-based vs merit-based.', available: true },
  // Гайды из ТЗ, контент для которых ещё пишется
  { slug: 'cv', title: 'Упаковка CV', summary: 'Формула XYZ и мокап CV с подсветкой блоков.', available: false },
  { slug: 'interview', title: 'Прохождение интервью', summary: 'Типовые вопросы комиссий и как на них отвечать.', available: false },
  { slug: 'bureaucracy', title: 'Бюрократия: апостили и переводы', summary: 'Порядок печатей, нотариус, сроки.', available: false },
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);
