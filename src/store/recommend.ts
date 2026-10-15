import { countries, type Country } from '../data/countries';
import type { Profile } from './AppStore';

// Простой подбор стран по ответам квиза: фильтр по степени,
// затем ранжирование по типу финансирования и баллам.
export function recommend(profile: Profile | null, limit = 6): Country[] {
  if (!profile) return countries.slice(0, limit);
  const ielts = parseFloat(profile.ielts ?? '');

  return countries
    .filter((c) => !profile.degree || c.degrees.includes(profile.degree))
    .map((c) => {
      let score = 0;
      if (profile.funding === 'full' && c.fullGrant) score += 3;
      if (profile.funding === 'self' && !c.fullGrant) score += 2;
      if (!Number.isNaN(ielts) && c.ieltsMin) score += ielts >= c.ieltsMin ? 2 : -2;
      if (c.links.length) score += 1; // есть проверенные первоисточники
      return { c, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.c);
}

// Ближайшая дата для дедлайна вида MM-DD
export function nextDate(mmdd: string, from = new Date()): Date {
  const [m, d] = mmdd.split('-').map(Number);
  const date = new Date(from.getFullYear(), m - 1, d);
  if (date < new Date(from.getFullYear(), from.getMonth(), from.getDate())) date.setFullYear(date.getFullYear() + 1);
  return date;
}

export const daysUntil = (date: Date, from = new Date()) =>
  Math.ceil((date.getTime() - new Date(from.getFullYear(), from.getMonth(), from.getDate()).getTime()) / 86_400_000);

export const formatDate = (date: Date) => date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
