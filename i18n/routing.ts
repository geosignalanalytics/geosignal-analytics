import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Langues supportées par le site
  locales: ['en', 'fr'],

  // Langue utilisée si aucune préférence n'est détectée
  defaultLocale: 'en',

  // 'as-needed' : l'anglais (langue par défaut) reste à la racine (tonsite.com/about),
  // le français passe par un préfixe (tonsite.com/fr/about)
  localePrefix: 'as-needed',

  // Désactive la détection automatique de la langue du navigateur.
  // Sans ça, next-intl redirige vers /fr si le navigateur du visiteur
  // est configuré en français, même sur la première visite de "/".
  // Ici, "/" affiche toujours l'anglais par défaut ; le visiteur doit
  // cliquer sur FR pour changer de langue.
  localeDetection: false,
});
