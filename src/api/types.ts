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
