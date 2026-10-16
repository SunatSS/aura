// База знаний для FAQ-бота: тот же контент, что показывает сайт,
// нарезанный на фрагменты (раздел страницы или карточка страны).
import { docItems, getCountries, getCountryPage, getGuides } from '../i18n/content';
import { LOCALES, type Locale } from '../i18n/locales';
import { dictionaries } from '../i18n/ui';
import type { Block, ContentPage } from './types';

export type KbChunk = { id: string; title: string; path: string; text: string };

const strip = (s: string) => s.replace(/\*\*?/g, '');

function blockText(b: Block): string {
  switch (b.type) {
    case 'text': case 'dashed': return strip(b.text);
    case 'subheading': return b.text;
    case 'callout': return strip(b.text);
    case 'cards': case 'grid': return b.items.map((i) => `${i.title}: ${strip(i.text)}`).join('\n');
    case 'steps': return b.items.map((i, n) => `${n + 1}. ${i.when ? `(${i.when}) ` : ''}${i.title}: ${strip(i.text)}`).join('\n');
    case 'costs': return b.rows.map(([k, v]) => `${k} — ${v}`).join('\n');
    case 'timeline': return b.rows.map((r) => `${r.period}: ${r.title} — ${strip(r.text)}`).join('\n');
    case 'letters': return b.rows.map((r) => `${r.letter} — ${r.title}: ${r.text}`).join('\n');
    case 'links': return b.items.map((l) => `${l.label}: ${l.url}`).join('\n');
    case 'accordion': return b.items.map((i) => `${i.title}: ${strip(i.text)}${i.bullets ? '\n- ' + i.bullets.join('\n- ') : ''}`).join('\n');
    case 'facts': return b.items.map((f) => `${f.value} — ${f.label}`).join('; ');
    case 'formula': return b.lines.join(' ');
    case 'highlights': return b.items.map((h) => `${h.tag} ${h.text}`).join('\n');
    case 'compare': return `${b.bad.tag}: ${b.bad.text}\n${b.good.tag}: ${b.good.text}`;
    case 'note': return `${b.intro}\n${b.items.map((i, n) => `${n + 1}. ${i}`).join('\n')}`;
    case 'twoLists': return b.columns.map((c) => `${c.tag} (${c.title}):\n- ${c.items.join('\n- ')}`).join('\n');
  }
}

function pageChunks(prefix: string, pageTitle: string, path: string, page: ContentPage): KbChunk[] {
  return page.sections.map((s) => ({
    id: `${prefix}#${s.id}`,
    title: `${pageTitle} — ${s.title}`,
    path: `${path}#${s.id}`,
    text: s.blocks.map(blockText).join('\n'),
  }));
}

// Подписи полей карточки страны на каждом языке
const LABELS: Record<Locale, { country: string; grant: string; degrees: string; full: string; partial: string; ielts: string; deadlines: string; early: string; late: string; docs: string; links: string; guide: string }> = {
  ru: { country: 'Страна', grant: 'Грант/программа', degrees: 'Ступени', full: 'Есть полные гранты.', partial: 'Частичные гранты и скидки вузов.', ielts: 'Минимальный IELTS', deadlines: 'Сроки', early: 'ранняя подача', late: 'дедлайн (ММ-ДД, ориентировочно)', docs: 'Документы', links: 'Официальные ссылки', guide: 'Гайд' },
  en: { country: 'Country', grant: 'Scholarship/programme', degrees: 'Degrees', full: 'Full scholarships available.', partial: 'Partial grants and university discounts.', ielts: 'Minimum IELTS', deadlines: 'Deadlines', early: 'early deadline', late: 'deadline (MM-DD, approximate)', docs: 'Documents', links: 'Official links', guide: 'Guide' },
  tj: { country: 'Кишвар', grant: 'Грант/барнома', degrees: 'Зинаҳо', full: 'Грантҳои пурра ҳастанд.', partial: 'Грантҳои қисман ва тахфифҳои донишгоҳҳо.', ielts: 'Ҳадди ақали IELTS', deadlines: 'Мӯҳлатҳо', early: 'аризаи барвақт', late: 'мӯҳлат (ММ-РР, тахминӣ)', docs: 'Ҳуҷҷатҳо', links: 'Пайвандҳои расмӣ', guide: 'Дастур' },
};

function buildKnowledgeBase(locale: Locale): KbChunk[] {
  const L = LABELS[locale];
  const degreeNames = dictionaries[locale].degreeNames;
  const countries = getCountries(locale);

  const countryChunks: KbChunk[] = countries.map((c) => ({
    id: `country:${c.id}`,
    title: `${c.name}: ${c.grant}`,
    path: `/country/${c.id}`,
    text: [
      `${L.country}: ${c.name}. ${L.grant}: ${c.grant}. ${c.tags}.`,
      `${L.degrees}: ${c.degrees.map((d) => degreeNames[d]).join(', ')}. ${c.fullGrant ? L.full : L.partial}`,
      c.ieltsMin ? `${L.ielts}: ${c.ieltsMin}.` : '',
      c.gpaMin ? `GPA: ${c.gpaMin}.` : '',
      `${L.deadlines}: ${c.deadlines.note ?? ''} (${L.early} ${c.deadlines.early ?? '—'}, ${L.late} ${c.deadlines.late}).`,
      `${L.docs}: ${docItems(c, locale).map((d) => d.label).join('; ')}.`,
      c.links.length ? `${L.links}: ${c.links.map((l) => `${l.label} ${l.url}`).join('; ')}.` : '',
    ].filter(Boolean).join('\n'),
  }));

  return [
    ...countryChunks,
    ...countries.flatMap((c) => {
      const page = getCountryPage(locale, c.id);
      return page ? pageChunks(c.id, c.name, `/country/${c.id}`, page) : [];
    }),
    ...getGuides(locale).flatMap((g) => (g.page ? pageChunks(g.slug, `${L.guide}: ${g.title}`, `/guides/${g.slug}`, g.page) : [])),
  ];
}

// ---------- Поиск ----------
// Лексический поиск без эмбеддингов: база маленькая, а запросы к модели эмбеддингов
// тратили бы тот же дневной бюджет нейронов. Морфология грубо учитывается обрезкой
// слов до основы (первые 4 буквы: «Корея», «Кореи» → «коре»), а редкие слова весят
// больше частых (IDF), чтобы «IELTS» не находил все страны подряд.

const STOP = new Set([
  'как', 'что', 'где', 'для', 'это', 'мне', 'или', 'нужно', 'нужен', 'нужна', 'можно', 'какой', 'какие', 'какая', 'если', 'когда', 'сколько', 'есть',
  'the', 'and', 'what', 'how', 'where', 'which', 'when', 'for', 'need', 'can', 'does', 'with', 'about',
  'чӣ', 'чи', 'кадом', 'куҷо', 'барои', 'ман', 'кай', 'чанд', 'лозим', 'аст', 'ҳаст',
]);

export const stems = (s: string) =>
  s
    .toLowerCase()
    .replace(/ё/g, 'е')
    .split(/[^a-zа-яғӣқӯҳҷ0-9]+/i)
    .filter((w) => w.length >= 3 && !STOP.has(w))
    .map((w) => w.slice(0, 4));

type Index = { entries: { chunk: KbChunk; titleStems: Set<string>; bodyStems: string[] }[]; idf: (w: string) => number };

function buildIndex(kb: KbChunk[]): Index {
  const entries = kb.map((c) => ({ chunk: c, titleStems: new Set(stems(c.title)), bodyStems: stems(c.text) }));
  const docFreq = new Map<string, number>();
  for (const { titleStems, bodyStems } of entries) {
    for (const w of new Set([...titleStems, ...bodyStems])) docFreq.set(w, (docFreq.get(w) ?? 0) + 1);
  }
  return { entries, idf: (w) => Math.log(1 + entries.length / (docFreq.get(w) ?? entries.length)) };
}

// Индексы строятся при первом запросе на каждом языке
const indexes = new Map<Locale, Index>();
const indexFor = (locale: Locale) => {
  if (!indexes.has(locale)) indexes.set(locale, buildIndex(buildKnowledgeBase(locale)));
  return indexes.get(locale)!;
};

export const knowledgeBaseSize = () => LOCALES.map((l) => [l, indexFor(l).entries.length] as const);

export function searchKb(query: string, locale: Locale = 'ru', limit = 4): KbChunk[] {
  const q = [...new Set(stems(query))];
  if (!q.length) return [];
  const { entries, idf } = indexFor(locale);
  return entries
    .map(({ chunk, titleStems, bodyStems }) => {
      let score = 0;
      for (const w of q) {
        const weight = idf(w);
        if (titleStems.has(w)) score += 3 * weight; // совпадение в заголовке (страна, раздел) весит больше
        score += Math.min(bodyStems.filter((b) => b === w).length, 3) * weight;
      }
      return { chunk, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.chunk);
}
