import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from '~/lib/modules/localization/locales/en/translation.json';
import ar from '~/lib/modules/localization/locales/ar/translation.json';

// ✅ Check if we're running in the browser
const isBrowser = typeof window !== 'undefined';

// Initialize i18n only once
if (!i18n.isInitialized) {
  let i18nInstance = i18n.use(initReactI18next);

  // 👇 Only use LanguageDetector in the browser (not on server)
  if (isBrowser) {
    i18nInstance = i18nInstance.use(LanguageDetector);
  }

  i18nInstance.init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ar'],
    interpolation: { escapeValue: false },
    debug: process.env.NODE_ENV !== 'production',
    detection: isBrowser
      ? {
          order: ['localStorage', 'navigator', 'htmlTag'],
          lookupLocalStorage: 'lng',
          caches: ['localStorage'],
        }
      : undefined,
  });

  // 👇 Handle direction switching only on the client
  if (isBrowser) {
    i18n.on('languageChanged', (lng) => {
      localStorage.setItem('lng', lng);
      document.documentElement.lang = lng;
      document.documentElement.dir = lng === 'ar' ? 'rtl' : 'ltr';
    });
  }
}

export default i18n;
