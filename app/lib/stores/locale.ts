import { atom } from 'nanostores';

export type Locale = 'en' | 'ar';

export const localeStore = atom<Locale>(getInitialLocale());

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const localeKey = 'lng';
  const persistedLocale = localStorage.getItem(localeKey) as Locale | null;

  return persistedLocale ?? 'en';
}

if (typeof window !== 'undefined') {
  localeStore.subscribe((value) => {
    localStorage.setItem('lng', value);
    document.documentElement.lang = value;
    document.documentElement.dir = value === 'ar' ? 'rtl' : 'ltr';
  });
}
