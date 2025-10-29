import { atom } from 'nanostores';

export type Locale = 'en' | 'ar';

// ✅ Initialize safely for SSR (no localStorage access on server)
export const localeStore = atom<Locale>(getInitialLocale());

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    // Running on the server — just default to English
    return 'en';
  }

  const localeKey = 'lng';
  const persistedLocale = localStorage.getItem(localeKey) as Locale | null;

  return persistedLocale ?? 'en';
}

// ✅ Optional: keep store and localStorage in sync when changed
if (typeof window !== 'undefined') {
  localeStore.subscribe((value) => {
    localStorage.setItem('lng', value);
    document.documentElement.lang = value;
    document.documentElement.dir = value === 'ar' ? 'rtl' : 'ltr';
  });
}
