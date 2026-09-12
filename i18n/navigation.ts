import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// Remplace les imports next/link et next/navigation partout dans le site :
// import { Link } from '@/i18n/navigation';  (au lieu de 'next/link')
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
