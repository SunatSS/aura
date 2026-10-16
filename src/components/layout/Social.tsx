// Иконки соцсетей для подвала. Ссылки на страницы проекта пока ведут на главные
// страницы сервисов — заменить на реальные профили, когда они появятся.
import type { ReactNode } from 'react';

export const CONTACT_EMAIL = 'maryam.saidova.444@gmail.com';
export const TELEGRAM_URL = 'https://t.me/OuKurva_ZMS';

const icon = (children: ReactNode) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
    {children}
  </svg>
);

export const ICONS = {
  telegram: icon(<path fill="currentColor" d="M21.5 3.6 2.9 10.8c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.5l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.4-1.5ZM9.2 13.6l8.6-5.4c.4-.3.8-.1.5.2l-7.1 6.4-.3 3-1.7-4.2Z" />),
  instagram: icon(
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.4" cy="6.6" r="1.3" fill="currentColor" />
    </>,
  ),
  tiktok: icon(<path fill="currentColor" d="M16.6 2h-3.3v13.2a2.9 2.9 0 1 1-2.1-2.8V9a6.2 6.2 0 1 0 5.4 6.2V8.6a7.6 7.6 0 0 0 4.4 1.4V6.7a4.4 4.4 0 0 1-4.4-4.7Z" />),
  youtube: icon(<path fill="currentColor" d="M22 8.1a3 3 0 0 0-2.1-2.1C18 5.5 12 5.5 12 5.5s-6 0-7.9.5A3 3 0 0 0 2 8.1 31 31 0 0 0 1.5 12 31 31 0 0 0 2 15.9 3 3 0 0 0 4.1 18c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.4-1.3.5-2.6.5-3.9s-.1-2.6-.5-3.9ZM10 15.1V8.9l5.2 3.1L10 15.1Z" />),
};

export const SOCIALS: { id: keyof typeof ICONS; name: string; url: string }[] = [
  { id: 'instagram', name: 'Instagram', url: 'https://instagram.com' },
  { id: 'tiktok', name: 'TikTok', url: 'https://tiktok.com' },
  { id: 'youtube', name: 'YouTube', url: 'https://youtube.com' },
];
