import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { api, ApiError, currentLocale } from '../api/client';
import { dictionaries } from '../i18n/ui';
import type { MeResponse, Profile, TrackerItem, User } from '../api/types';

// Состояние пользователя живёт на сервере (Cloudflare Worker + D1).
// Здесь — кэш ответа /api/me и оптимистичные обновления трекера.

export type { Profile, TrackerItem, User };

type State = { user: User | null; profile: Profile | null; tracker: TrackerItem[] };
const empty: State = { user: null, profile: null, tracker: [] };

type Store = State & {
  loading: boolean;
  error: string | null;
  register: (name: string, email: string, password: string) => Promise<string | null>;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => Promise<void>;
  saveProfile: (p: Profile) => Promise<string | null>;
  toggleTracked: (countryId: string) => void;
  isTracked: (countryId: string) => boolean;
  toggleDoc: (countryId: string, doc: string) => void;
  toggleSubmitted: (countryId: string) => void;
};

const Ctx = createContext<Store | null>(null);

const message = (e: unknown) => (e instanceof ApiError ? e.message : dictionaries[currentLocale()].common.error);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(empty);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    api
      .me()
      .then((me) => setState(me))
      .catch((e) => {
        if (!(e instanceof ApiError && e.status === 401)) setError(message(e));
      })
      .finally(() => setLoading(false));
  }, []);

  // Оптимистичное обновление: сразу меняем UI, при ошибке сервера откатываем
  const optimistic = useCallback((change: (s: State) => State, call: () => Promise<unknown>) => {
    const before = stateRef.current;
    setState(change(before));
    setError(null);
    call().catch((e) => {
      setState(before);
      setError(message(e));
    });
  }, []);

  const signedIn = (me: MeResponse) => {
    setState(me);
    setError(null);
    return null;
  };

  const store = useMemo<Store>(() => {
    const patchItem = (countryId: string, fn: (i: TrackerItem) => TrackerItem) => (s: State) => ({
      ...s,
      tracker: s.tracker.map((i) => (i.countryId === countryId ? fn(i) : i)),
    });
    const find = (countryId: string) => state.tracker.find((i) => i.countryId === countryId);

    return {
      ...state,
      loading,
      error,
      register: (name, email, password) => api.register(name, email, password).then(signedIn, message),
      login: (email, password) => api.login(email, password).then(signedIn, message),
      async logout() {
        await api.logout().catch(() => undefined);
        setState(empty);
      },
      saveProfile: (profile) =>
        api.saveProfile(profile).then(
          (r) => {
            setState((s) => ({ ...s, profile: r.profile }));
            return null;
          },
          message,
        ),
      isTracked: (id) => !!find(id),
      toggleTracked(countryId) {
        if (find(countryId)) {
          optimistic((s) => ({ ...s, tracker: s.tracker.filter((i) => i.countryId !== countryId) }), () => api.removeTracked(countryId));
        } else {
          optimistic(
            (s) => ({ ...s, tracker: [...s.tracker, { countryId, addedAt: new Date().toISOString(), done: [], submitted: false }] }),
            () => api.addTracked(countryId),
          );
        }
      },
      toggleDoc(countryId, doc) {
        const item = find(countryId);
        if (!item) return;
        const done = item.done.includes(doc) ? item.done.filter((d) => d !== doc) : [...item.done, doc];
        optimistic(patchItem(countryId, (i) => ({ ...i, done })), () => api.updateTracked(countryId, { done }));
      },
      toggleSubmitted(countryId) {
        const item = find(countryId);
        if (!item) return;
        const submitted = !item.submitted;
        optimistic(patchItem(countryId, (i) => ({ ...i, submitted })), () => api.updateTracked(countryId, { submitted }));
      },
    };
  }, [state, loading, error, optimistic]);

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore must be used inside AppStoreProvider');
  return s;
}
