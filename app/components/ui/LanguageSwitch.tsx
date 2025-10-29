import { useStore } from '@nanostores/react';
import { localeStore, type Locale } from '~/lib/stores/locale';
import { Globe } from 'lucide-react';

export const LocalizationButton = () => {
  const locale = useStore(localeStore);

  const toggleLocale = () => {
    const newLocale: Locale = locale === 'en' ? 'ar' : 'en';
    localeStore.set(newLocale);
    localStorage.setItem('lng', newLocale);
  };

  return (
    <button
      onClick={toggleLocale}
      className={`
        flex items-center gap-2 px-3 py-2 w-full justify-start
        text-sm font-medium transition-all rounded-lg
        border border-transparent
        focus:outline-none focus:ring-2 focus:ring-blue-400/40
        bg-bolt-elements-item-backgroundDefault
        text-bolt-elements-item-contentDefault
        hover:bg-bolt-elements-item-backgroundAccent
        hover:text-bolt-elements-item-contentAccent
        active:ring-yellow-400/40
      `}
    >
      <Globe className="w-4 h-4 text-blue-500 group-hover:text-yellow-400 transition-colors" />
      <span className="uppercase">{locale}</span>
    </button>
  );
};
