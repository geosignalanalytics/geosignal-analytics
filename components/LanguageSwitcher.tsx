'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    if (newLocale === locale) return;

    // Gestion propre du remplacement du préfixe de langue dans l'URL
    let newPath = pathname;
    if (pathname.startsWith(`/${locale}`)) {
      newPath = pathname.replace(`/${locale}`, newLocale === 'fr' ? '' : `/${newLocale}`);
    } else if (newLocale !== 'fr') {
      newPath = `/${newLocale}${pathname}`;
    }

    router.push(newPath || '/');
  };

  return (
    <div className="flex items-center gap-2 text-sm font-semibold">
      <button
        onClick={() => handleLanguageChange('fr')}
        className={`px-2 py-1 rounded transition-colors ${
          locale === 'fr'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:text-blue-600'
        }`}
      >
        FR
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => handleLanguageChange('en')}
        className={`px-2 py-1 rounded transition-colors ${
          locale === 'en'
            ? 'bg-blue-600 text-white'
            : 'text-gray-600 hover:text-blue-600'
        }`}
      >
        EN
      </button>
    </div>
  );
}