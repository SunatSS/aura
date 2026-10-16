// Контент на нужном языке. Русский — исходник (src/data/*), переводы — src/data/i18n/<lang>/*.
// Если перевода нет, берётся русская версия.
import { BASE_DOC_IDS, countries as ruCountries, countryById as ruCountryById, docsFor, type Country } from '../data/countries';
import { countryDetails as ruDetails } from '../data/countryDetails';
import { guides as ruGuides, type GuideMeta } from '../data/guides';
import type { CountryText } from '../data/i18n/types';
import type { ContentPage } from '../data/types';
import * as enCountries from '../data/i18n/en/countries';
import * as tjCountries from '../data/i18n/tj/countries';
import { enDetails, enGuides } from '../data/i18n/en';
import { tjDetails, tjGuides } from '../data/i18n/tj';
import type { Locale } from './locales';
import { dictionaries } from './ui';

type Pack = { text: Record<string, CountryText>; baseDocs: string[]; details: Record<string, ContentPage>; guides: Record<string, ContentPage> };

const packs: Record<Exclude<Locale, 'ru'>, Pack> = {
  en: { text: enCountries.countryText, baseDocs: enCountries.baseDocs, details: enDetails, guides: enGuides },
  tj: { text: tjCountries.countryText, baseDocs: tjCountries.baseDocs, details: tjDetails, guides: tjGuides },
};

function localizeCountry(c: Country, locale: Locale): Country {
  if (locale === 'ru') return c;
  const t = packs[locale].text[c.id];
  if (!t) return c;
  return {
    ...c,
    name: t.name,
    short: t.short ?? (c.short ? t.name : undefined),
    grant: t.grant,
    tags: t.tags,
    gpaMin: c.gpaMin ? (t.gpaMin ?? c.gpaMin) : undefined,
    deadlines: { ...c.deadlines, note: t.note || c.deadlines.note },
    links: c.links.map((l, i) => ({ ...l, label: t.links[i] ?? l.label })),
    extraDocs: c.extraDocs?.map((d, i) => t.extraDocs[i] ?? d),
  };
}

const cache = new Map<Locale, Country[]>();

export function getCountries(locale: Locale): Country[] {
  if (!cache.has(locale)) cache.set(locale, ruCountries.map((c) => localizeCountry(c, locale)));
  return cache.get(locale)!;
}

export const getCountry = (locale: Locale, id: string) => {
  const c = ruCountryById(id);
  return c ? localizeCountry(c, locale) : undefined;
};

export function getCountryPage(locale: Locale, id: string): ContentPage | undefined {
  if (locale !== 'ru' && packs[locale].details[id]) return packs[locale].details[id];
  return ruDetails[id];
}

export function getGuides(locale: Locale): GuideMeta[] {
  const meta = dictionaries[locale].guides.meta;
  return ruGuides.map((g) => ({
    ...g,
    title: meta[g.slug]?.title ?? g.title,
    summary: meta[g.slug]?.summary ?? g.summary,
    page: g.page && locale !== 'ru' ? (packs[locale].guides[g.slug] ?? g.page) : g.page,
  }));
}

export const getGuide = (locale: Locale, slug: string) => getGuides(locale).find((g) => g.slug === slug);

// Документы чек-листа: стабильный id + подпись на нужном языке
export function docItems(c: Country, locale: Locale): { id: string; label: string }[] {
  const ru = ruCountryById(c.id) ?? c;
  const base = locale === 'ru' ? docsFor(ru).slice(0, BASE_DOC_IDS.length) : packs[locale].baseDocs;
  const extra = getCountry(locale, c.id)?.extraDocs ?? [];
  return [...BASE_DOC_IDS.map((id, i) => ({ id: id as string, label: base[i] ?? id })), ...extra.map((label, i) => ({ id: `x${i}`, label }))];
}
