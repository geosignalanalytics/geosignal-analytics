import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    // Permet d'effectuer le déploiement sur Vercel même si le projet contient des erreurs TypeScript
    ignoreBuildErrors: true,
  },
  // Gardez le reste de votre configuration existante ici s'il y en a une
};

export default nextConfig;