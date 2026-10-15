import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

// MVP без бэкенда: всё состояние живёт в localStorage браузера.
// Пароли не хешируются и никуда не отправляются — это демо, не настоящая авторизация.

export type Profile = {
  degree?: 'bachelor' | 'master';
  stage?: 'preparing' | 'applying' | 'admitted';
  funding?: 'full' | 'self';
  ielts?: string;
  gpa?: string;
  sat?: string;
};

export type User = { name: string; email: string; provider: 'email' | 'google' };

export type TrackerItem = {
  countryId: string;
  addedAt: string;
  done: string[]; // отмеченные документы чек-листа
  submitted: boolean;
};

type State = {
  user: User | null;
  accounts: Record<string, { name: string; password: string }>;
  profile: Profile | null;
  tracker: TrackerItem[];
};

const STORAGE_KEY = 'aura-state-v1';
const empty: State = { user: null, accounts: {}, profile: null, tracker: [] };

function load(): State {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}

type Store = State & {
  register: (name: string, email: string, password: string) => string | null;
  login: (email: string, password: string) => string | null;
  loginWithGoogle: () => void;
  logout: () => void;
  saveProfile: (p: Profile) => void;
  toggleTracked: (countryId: string) => void;
  isTracked: (countryId: string) => boolean;
  toggleDoc: (countryId: string, doc: string) => void;
  toggleSubmitted: (countryId: string) => void;
};

const Ctx = createContext<Store | null>(null);

export function AppStoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // приватный режим / заблокированное хранилище — работаем без сохранения
    }
  }, [state]);

  const store = useMemo<Store>(() => {
    const updateItem = (countryId: string, fn: (i: TrackerItem) => TrackerItem) =>
      setState((s) => ({ ...s, tracker: s.tracker.map((i) => (i.countryId === countryId ? fn(i) : i)) }));

    return {
      ...state,
      register(name, email, password) {
        const key = email.trim().toLowerCase();
        if (state.accounts[key]) return 'Аккаунт с таким email уже есть — войди.';
        setState((s) => ({
          ...s,
          accounts: { ...s.accounts, [key]: { name, password } },
          user: { name, email: key, provider: 'email' },
          profile: null,
        }));
        return null;
      },
      login(email, password) {
        const key = email.trim().toLowerCase();
        const acc = state.accounts[key];
        if (!acc || acc.password !== password) return 'Неверный email или пароль.';
        setState((s) => ({ ...s, user: { name: acc.name, email: key, provider: 'email' } }));
        return null;
      },
      loginWithGoogle() {
        setState((s) => ({ ...s, user: { name: 'Демо-студент', email: 'demo@gmail.com', provider: 'google' } }));
      },
      logout() {
        setState((s) => ({ ...s, user: null }));
      },
      saveProfile(profile) {
        setState((s) => ({ ...s, profile }));
      },
      isTracked: (id) => state.tracker.some((i) => i.countryId === id),
      toggleTracked(countryId) {
        setState((s) =>
          s.tracker.some((i) => i.countryId === countryId)
            ? { ...s, tracker: s.tracker.filter((i) => i.countryId !== countryId) }
            : { ...s, tracker: [...s.tracker, { countryId, addedAt: new Date().toISOString(), done: [], submitted: false }] },
        );
      },
      toggleDoc(countryId, doc) {
        updateItem(countryId, (i) => ({
          ...i,
          done: i.done.includes(doc) ? i.done.filter((d) => d !== doc) : [...i.done, doc],
        }));
      },
      toggleSubmitted(countryId) {
        updateItem(countryId, (i) => ({ ...i, submitted: !i.submitted }));
      },
    };
  }, [state]);

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}

export function useStore() {
  const s = useContext(Ctx);
  if (!s) throw new Error('useStore must be used inside AppStoreProvider');
  return s;
}
