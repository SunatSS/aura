// Тексты гайдов на русском по slug. Импортируется только сервером (база знаний FAQ-бота).
import type { ContentPage } from '../types';
import { commonApp } from './commonApp';
import { essay } from './essay';
import { recommendation } from './recommendation';

export const guidePages: Record<string, ContentPage> = { essay, recommendation, 'common-app': commonApp };
