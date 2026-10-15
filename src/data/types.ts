// Контент страниц стран и гайдов описывается блоками — один рендерер на всё.
// В тексте поддерживается **жирный** и *курсив*.

export type TitledText = { title: string; text: string };

export type Block =
  | { type: 'text'; text: string }
  | { type: 'cards'; items: TitledText[]; accent?: 'yellow' | 'plain' }
  | { type: 'grid'; items: TitledText[] }
  | { type: 'steps'; items: (TitledText & { when?: string })[]; badge?: 'lime' | 'blue' }
  | { type: 'costs'; rows: [string, string][] }
  | { type: 'timeline'; rows: { period: string; title: string; text: string }[] }
  | { type: 'callout'; text: string; title?: string; variant?: 'purple' | 'black' }
  | { type: 'links'; items: { label: string; url: string }[] }
  | { type: 'accordion'; items: { title: string; text: string; bullets?: string[] }[] }
  | { type: 'facts'; items: { value: string; label: string }[] }
  | { type: 'formula'; lines: string[] }
  | { type: 'letters'; rows: { letter: string; title: string; text: string }[] }
  | { type: 'highlights'; items: { tag: string; text: string }[] }
  | { type: 'subheading'; text: string }
  | { type: 'compare'; bad: { tag: string; text: string }; good: { tag: string; text: string } }
  | { type: 'note'; intro: string; items: string[] }
  | { type: 'dashed'; text: string }
  | { type: 'twoLists'; columns: { tag: string; color: 'purple' | 'orange'; title: string; items: string[] }[] };

export type Section = {
  id: string;
  chip?: string; // подпись якорного чипа вверху страницы
  badge: string; // содержимое кружка: номер, $, !
  kicker: string;
  title: string;
  blocks: Block[];
};

export type ContentPage = {
  title: string;
  lead: string;
  sections: Section[];
  footer?: { title: string; text?: string; steps?: string[] };
};
