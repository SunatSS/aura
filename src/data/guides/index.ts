import type { ContentPage } from '../types';
import { commonApp } from './commonApp';
import { essay } from './essay';
import { recommendation } from './recommendation';

export type GuideMeta = { slug: string; title: string; summary: string; page?: ContentPage };

export const guides: GuideMeta[] = [
  { slug: 'essay', title: 'Как написать мотивационное эссе, которое запомнят?', summary: 'Hook, метод STAR и вектор будущего — 15/70/15.', page: essay },
  { slug: 'recommendation', title: 'Рекомендательное письмо: полное руководство', summary: 'Кого просить, Brag Sheet, архитектура письма, peer rec.', page: recommendation },
  { slug: 'common-app', title: 'Как заполнить Common App', summary: 'Семь разделов анкеты и need-based vs merit-based.', page: commonApp },
  // Гайды из ТЗ, контент для которых ещё пишется
  { slug: 'cv', title: 'Упаковка CV', summary: 'Формула XYZ и мокап CV с подсветкой блоков.' },
  { slug: 'interview', title: 'Прохождение интервью', summary: 'Типовые вопросы комиссий и как на них отвечать.' },
  { slug: 'bureaucracy', title: 'Бюрократия: апостили и переводы', summary: 'Порядок печатей, нотариус, сроки.' },
];

export const guideBySlug = (slug: string) => guides.find((g) => g.slug === slug);
