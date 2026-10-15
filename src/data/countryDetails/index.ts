// Полные разборы стран по id из countries.ts.
// Страны без разбора (пока: Узбекистан, Кыргызстан, Таджикистан) показываются по общему шаблону.
import type { ContentPage } from '../types';
import { china } from './china';
import { germany } from './germany';
import { hungary } from './hungary';
import { italy } from './italy';
import { japan } from './japan';
import { kazakhstan } from './kazakhstan';
import { korea } from './korea';
import { malaysia } from './malaysia';
import { northCyprus } from './northCyprus';
import { russia } from './russia';
import { singapore } from './singapore';
import { turkey } from './turkey';
import { uae } from './uae';
import { uk } from './uk';
import { usa } from './usa';

export const countryDetails: Record<string, ContentPage> = {
  china,
  germany,
  hungary,
  italy,
  japan,
  kazakhstan,
  korea,
  malaysia,
  'north-cyprus': northCyprus,
  russia,
  singapore,
  turkey,
  uae,
  uk,
  usa,
};
