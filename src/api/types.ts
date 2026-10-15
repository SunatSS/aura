// Общие типы API — их импортируют и фронтенд, и Worker.

export type User = { id: string; email: string; name: string };

export type Profile = {
  degree?: 'bachelor' | 'master';
  stage?: 'preparing' | 'applying' | 'admitted';
  funding?: 'full' | 'self';
  ielts?: string;
  gpa?: string;
  sat?: string;
};

export type TrackerItem = {
  countryId: string;
  addedAt: string;
  done: string[]; // отмеченные документы чек-листа
  submitted: boolean;
};

export type MeResponse = { user: User; profile: Profile | null; tracker: TrackerItem[] };

export type ApiError = { error: string };

// ---------- AI-ментор ----------

export type AiQuota = { used: number; limit: number; resetsAt: string };
export type AiMeta = { quota: AiQuota; provider: 'workers-ai' | 'gemini' };

export type EssayReview = {
  scores: { hook: number; structure: number; specificity: number; future: number };
  verdict: string;
  issues: { quote: string; problem: string; fix: string }[];
  cliches: string[];
  strengths: string[];
  betterHook: string;
};

export type CvPack = {
  items: { original: string; role: string; ru: string; en: string; skills: string[]; askForNumber: string }[];
  tips: string[];
};

export type FaqAnswer = { answer: string; sources: { title: string; path: string }[] };
