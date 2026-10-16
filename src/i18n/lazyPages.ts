// Ленивые тексты страниц для браузера: Vite делает отдельный файл на каждую
// страну/гайд и каждый язык, а скачивается только тот, что открыли.
import { useEffect, useState } from 'react';
import type { ContentPage } from '../data/types';
import type { Locale } from './locales';

type Loader = () => Promise<Record<string, unknown>>;

// Пути → загрузчики. Файл называется как экспорт: northCyprus.ts → export const northCyprus
const countryFiles: Record<Locale, Record<string, Loader>> = {
  ru: import.meta.glob<Record<string, unknown>>(['../data/countryDetails/*.ts', '!../data/countryDetails/index.ts']),
  en: import.meta.glob<Record<string, unknown>>('../data/i18n/en/countryDetails/*.ts'),
  tj: import.meta.glob<Record<string, unknown>>('../data/i18n/tj/countryDetails/*.ts'),
};

const guideFiles: Record<Locale, Record<string, Loader>> = {
  ru: import.meta.glob<Record<string, unknown>>(['../data/guides/*.ts', '!../data/guides/index.ts', '!../data/guides/pages.ts']),
  en: import.meta.glob<Record<string, unknown>>('../data/i18n/en/guides/*.ts'),
  tj: import.meta.glob<Record<string, unknown>>('../data/i18n/tj/guides/*.ts'),
};

// «north-cyprus» → «northCyprus», «common-app» → «commonApp»
const camel = (id: string) => id.replace(/-([a-z])/g, (_, ch: string) => ch.toUpperCase());

async function load(files: Record<Locale, Record<string, Loader>>, locale: Locale, id: string): Promise<ContentPage | null> {
  const name = camel(id);
  for (const l of locale === 'ru' ? (['ru'] as const) : ([locale, 'ru'] as const)) {
    const entry = Object.entries(files[l]).find(([path]) => path.endsWith(`/${name}.ts`));
    if (entry) return ((await entry[1]())[name] as ContentPage) ?? null;
  }
  return null;
}

const cache = new Map<string, ContentPage | null>();

// undefined — загружается, null — текста нет (страна по общему шаблону)
function usePage(kind: 'country' | 'guide', locale: Locale, id: string): ContentPage | null | undefined {
  const key = `${kind}:${locale}:${id}`;
  const [page, setPage] = useState<ContentPage | null | undefined>(() => cache.get(key));

  useEffect(() => {
    if (cache.has(key)) {
      setPage(cache.get(key));
      return;
    }
    let alive = true;
    setPage(undefined);
    load(kind === 'country' ? countryFiles : guideFiles, locale, id)
      .catch(() => null)
      .then((p) => {
        cache.set(key, p);
        if (alive) setPage(p);
      });
    return () => {
      alive = false;
    };
  }, [key, kind, locale, id]);

  return page;
}

export const useCountryPage = (locale: Locale, id: string) => usePage('country', locale, id);
export const useGuidePage = (locale: Locale, slug: string) => usePage('guide', locale, slug);
