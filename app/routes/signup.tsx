import { useState, useEffect } from 'react';
import { useAuth } from '~/lib/modules/auth/context/AuthContext';
import { useNavigate } from '@remix-run/react';
import { useTranslation } from 'react-i18next';
import { useStore } from '@nanostores/react';
import { toast } from 'react-toastify';

import { DefaultLayout } from '~/components/defaultLayout/DefaultLayout';
import { localeStore } from '~/lib/stores/locale';

export default function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const locale = useStore(localeStore);

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  // Handle RTL + language change
  useEffect(() => {
    const isArabic = locale === 'ar';
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // Input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { email, password } = credentials;

    try {
      const user = await signUp(email, password);

      if (user) {
        toast.success(t('auth.account_created_success'));
        navigate('/');
      }
    } catch (err: any) {
      toast.error(err.message || t('auth.signup_failed'));
    }
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-bolt-elements-bg-depth-1">
        <form
          onSubmit={handleSubmit}
          className="w-96 p-8 rounded-2xl shadow-xl bg-bolt-elements-bg-depth-2 border border-bolt-elements-borderColor space-y-5 transition-all duration-300 hover:shadow-2xl"
        >
          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-bolt-elements-textPrimary">
            {t('auth.create_an_account')}
          </h2>

          {/* Subtitle */}
          <p className="text-center text-bolt-elements-textSecondary text-sm mb-2">
            {t('auth.welcome_to')} <span className="font-semibold text-blue-500">{t('auth.modhesh_ai')}</span>
          </p>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder={t('auth.email_placeholder')}
            value={credentials.email}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-bg-depth-3 placeholder-bolt-elements-textTertiary focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder={t('auth.password_placeholder')}
            value={credentials.password}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 rounded-lg border border-bolt-elements-borderColor bg-bolt-elements-bg-depth-3 placeholder-bolt-elements-textTertiary focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
          />

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg font-semibold bg-gradient-to-r from-blue-600 via-blue-500 to-yellow-400 text-white shadow-md hover:opacity-90 hover:shadow-lg transition-all duration-300"
          >
            {t('auth.sign_up')}
          </button>

          {/* Already have account */}
          <p className="text-sm text-center text-bolt-elements-textSecondary">
            {t('auth.already_have_account')}{' '}
            <a href="/login" className="text-blue-500 hover:text-yellow-500 font-medium transition-colors">
              {t('auth.log_in')}
            </a>
          </p>
        </form>
      </div>
    </DefaultLayout>
  );
}
