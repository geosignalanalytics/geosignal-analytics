import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Ne s'applique pas aux fichiers statiques, à l'API, ni aux assets internes de Next.js
  matcher: ['/((?!api|trpc|_next|_vercel|.*\\..*).*)'],
};
