// Переводы страниц стран и гайдов (tj). Ключи — id стран и slug гайдов.
import type { ContentPage } from '../../types';
import { china } from './countryDetails/china';
import { germany } from './countryDetails/germany';
import { hungary } from './countryDetails/hungary';
import { italy } from './countryDetails/italy';
import { japan } from './countryDetails/japan';
import { kazakhstan } from './countryDetails/kazakhstan';
import { korea } from './countryDetails/korea';
import { malaysia } from './countryDetails/malaysia';
import { northCyprus } from './countryDetails/northCyprus';
import { russia } from './countryDetails/russia';
import { singapore } from './countryDetails/singapore';
import { turkey } from './countryDetails/turkey';
import { uae } from './countryDetails/uae';
import { uk } from './countryDetails/uk';
import { usa } from './countryDetails/usa';
import { commonApp } from './guides/commonApp';
import { essay } from './guides/essay';
import { recommendation } from './guides/recommendation';

export const tjDetails: Record<string, ContentPage> = {
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

export const tjGuides: Record<string, ContentPage> = { essay, recommendation, 'common-app': commonApp };
