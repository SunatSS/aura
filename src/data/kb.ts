// База знаний для FAQ-бота: тот же контент, что показывает сайт,
// нарезанный на фрагменты (раздел страницы или карточка страны).
import { countries, docsFor } from './countries';
import { korea } from './countryDetails/korea';
import { turkey } from './countryDetails/turkey';
import { commonApp } from './guides/commonApp';
import { essay } from './guides/essay';
import { recommendation } from './guides/recommendation';
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

const degreeRu = { bachelor: 'бакалавриат', master: 'магистратура', phd: 'PhD' };

const countryChunks: KbChunk[] = countries.map((c) => ({
  id: `country:${c.id}`,
  title: `${c.name}: ${c.grant}`,
  path: `/country/${c.id}`,
  text: [
    `Страна: ${c.name}. Грант/программа: ${c.grant}. ${c.tags}.`,
    `Ступени: ${c.degrees.map((d) => degreeRu[d]).join(', ')}. ${c.fullGrant ? 'Есть полные гранты.' : 'Частичные гранты и скидки вузов.'}`,
    c.ieltsMin ? `Минимальный IELTS: ${c.ieltsMin}.` : '',
    c.gpaMin ? `GPA: ${c.gpaMin}.` : '',
    `Сроки: ${c.deadlines.note ?? ''} (ранняя подача ${c.deadlines.early ?? '—'}, дедлайн ${c.deadlines.late}, формат ММ-ДД, ориентировочно).`,
    `Документы: ${docsFor(c).join('; ')}.`,
    c.links.length ? `Официальные ссылки: ${c.links.map((l) => `${l.label} ${l.url}`).join('; ')}.` : '',
  ].filter(Boolean).join('\n'),
}));

export const knowledgeBase: KbChunk[] = [
  ...countryChunks,
  ...pageChunks('korea', 'Корея', '/country/korea', korea),
  ...pageChunks('turkey', 'Турция', '/country/turkey', turkey),
  ...pageChunks('essay', 'Гайд: мотивационное эссе', '/guides/essay', essay),
  ...pageChunks('recommendation', 'Гайд: рекомендательное письмо', '/guides/recommendation', recommendation),
  ...pageChunks('common-app', 'Гайд: Common App', '/guides/common-app', commonApp),
];

// ---------- Поиск ----------
// Лексический поиск без эмбеддингов: база маленькая, а запросы к модели эмбеддингов
// тратили бы тот же дневной бюджет нейронов. Русская морфология грубо
// учитывается обрезкой слов до основы (первые 4 буквы: «Корея», «Кореи» → «коре»),
// а редкие слова весят больше частых (IDF), чтобы «IELTS» не находил все страны подряд.

const STOP = new Set(['как', 'что', 'где', 'для', 'это', 'мне', 'или', 'нужно', 'нужен', 'нужна', 'можно', 'какой', 'какие', 'какая', 'если', 'когда', 'сколько', 'есть', 'the', 'and']);

export const stems = (s: string) =>
  s
    .toLowerCase()
    .replace(/ё/g, 'е')
    .split(/[^a-zа-я0-9]+/i)
    .filter((w) => w.length >= 3 && !STOP.has(w))
    .map((w) => w.slice(0, 4));

const index = knowledgeBase.map((c) => ({ chunk: c, titleStems: new Set(stems(c.title)), bodyStems: stems(c.text) }));

const docFreq = new Map<string, number>();
for (const { titleStems, bodyStems } of index) {
  for (const w of new Set([...titleStems, ...bodyStems])) docFreq.set(w, (docFreq.get(w) ?? 0) + 1);
}
const idf = (w: string) => Math.log(1 + index.length / (docFreq.get(w) ?? index.length));

export function searchKb(query: string, limit = 4): KbChunk[] {
  const q = [...new Set(stems(query))];
  if (!q.length) return [];
  return index
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
