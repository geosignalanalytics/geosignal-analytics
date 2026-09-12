import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // ... conserve ici ta config Next.js existante (images, redirects, etc.)
};

export default withNextIntl(nextConfig);
