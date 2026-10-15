import type { AiMeta, AiQuota, CvPack, EssayReview, FaqAnswer, MeResponse, Profile, TrackerItem } from './types';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`/api${path}`, {
      method,
      credentials: 'same-origin',
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new ApiError(0, 'Нет связи с сервером. Проверь интернет.');
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new ApiError(res.status, data.error ?? 'Что-то пошло не так.');
  return data as T;
}

export const api = {
  me: () => request<MeResponse>('GET', '/me'),
  register: (name: string, email: string, password: string) => request<MeResponse>('POST', '/auth/register', { name, email, password }),
  login: (email: string, password: string) => request<MeResponse>('POST', '/auth/login', { email, password }),
  logout: () => request<{ ok: true }>('POST', '/auth/logout'),
  saveProfile: (profile: Profile) => request<{ profile: Profile }>('PUT', '/profile', profile),
  addTracked: (countryId: string) => request<{ tracker: TrackerItem[] }>('POST', '/tracker', { countryId }),
  removeTracked: (countryId: string) => request<{ ok: true }>('DELETE', `/tracker/${encodeURIComponent(countryId)}`),
  updateTracked: (countryId: string, patch: { done?: string[]; submitted?: boolean }) =>
    request<{ item: TrackerItem }>('PATCH', `/tracker/${encodeURIComponent(countryId)}`, patch),

  aiQuota: () => request<AiQuota>('GET', '/ai/quota'),
  reviewEssay: (text: string) => request<{ result: EssayReview; meta: AiMeta }>('POST', '/ai/essay', { text }),
  packCv: (text: string) => request<{ result: CvPack; meta: AiMeta }>('POST', '/ai/cv', { text }),
  askFaq: (question: string) => request<{ result: FaqAnswer; meta: AiMeta | { provider: null; quota: AiQuota } }>('POST', '/ai/faq', { question }),
};
