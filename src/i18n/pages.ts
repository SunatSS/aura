// Тексты страниц стран и гайдов — синхронно, все сразу. Только для сервера
// (база знаний FAQ-бота). На клиенте используйте lazyPages.ts.
import { countryDetails as ruDetails } from '../data/countryDetails';
import { guidePages as ruGuides } from '../data/guides/pages';
import { enDetails, enGuides } from '../data/i18n/en';
import { tjDetails, tjGuides } from '../data/i18n/tj';
import type { ContentPage } from '../data/types';
import type { Locale } from './locales';

const details: Record<Locale, Record<string, ContentPage>> = { ru: ruDetails, en: enDetails, tj: tjDetails };
const guides: Record<Locale, Record<string, ContentPage>> = { ru: ruGuides, en: enGuides, tj: tjGuides };

export const getCountryPage = (locale: Locale, id: string): ContentPage | undefined => details[locale][id] ?? ruDetails[id];
export const getGuidePage = (locale: Locale, slug: string): ContentPage | undefined => guides[locale][slug] ?? ruGuides[slug];
