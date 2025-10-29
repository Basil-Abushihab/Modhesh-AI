import { useState, useEffect } from 'react';
import { useAuth } from '~/lib/modules/auth/context/AuthContext';
import { useNavigate } from '@remix-run/react';
import { toast } from 'react-toastify';
import { DefaultLayout } from '~/components/defaultLayout/DefaultLayout';
import { useTranslation } from 'react-i18next';
import { useStore } from '@nanostores/react';
import { localeStore } from '~/lib/stores/locale';

export default function LoginPage() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const locale = useStore(localeStore);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const user = await signIn(email, password);

      if (user) {
        toast.success(t('login_success'));
        navigate('/');
      }
    } catch (err: any) {
      toast.error(err.message || t('login_failed'));
    }
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-bolt-elements-bg-depth-1">
        <form
          onSubmit={handleSubmit}
          className="
            w-96 p-8 rounded-2xl shadow-xl
            bg-bolt-elements-bg-depth-2 border border-bolt-elements-borderColor
            space-y-5 transition-all duration-300 hover:shadow-2xl
          "
        >
          <h2 className="text-2xl font-bold text-center text-bolt-elements-textPrimary">{t('welcome_back')}</h2>

          <p className="text-center text-bolt-elements-textSecondary text-sm mb-2">
            {t('log_in_to')} <span className="font-semibold text-blue-500">{t('modhesh_ai')}</span>
          </p>

          <input
            type="email"
            placeholder={t('email_placeholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-full px-3 py-2 rounded-lg border
              border-bolt-elements-borderColor
              bg-bolt-elements-bg-depth-3
              placeholder-bolt-elements-textTertiary
              focus:outline-none focus:ring-2 focus:ring-blue-500
              transition-all
            "
          />

          <input
            type="password"
            placeholder={t('password_placeholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              w-full px-3 py-2 rounded-lg border
              border-bolt-elements-borderColor
              bg-bolt-elements-bg-depth-3
              placeholder-bolt-elements-textTertiary
              focus:outline-none focus:ring-2 focus:ring-yellow-400
              transition-all
            "
          />

          <button
            type="submit"
            className="
              w-full py-2 rounded-lg font-semibold
              bg-gradient-to-r from-blue-600 via-blue-500 to-yellow-400
              text-white shadow-md
              hover:opacity-90 hover:shadow-lg
              transition-all duration-300
            "
          >
            {t('log_in')}
          </button>

          <p className="text-sm text-center text-bolt-elements-textSecondary">
            {t('no_account')}{' '}
            <a href="/signup" className="text-blue-500 hover:text-yellow-500 font-medium transition-colors">
              {t('sign_up')}
            </a>
          </p>
        </form>
      </div>
    </DefaultLayout>
  );
}
