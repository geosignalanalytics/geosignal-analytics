'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

const SERVICE_IDS = [
  'subsurface-imaging',
  'das-processing',
  'resource-exploration',
  'custom-geoai',
  'consulting-audit',
];

export default function ServicesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLLIElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  const tNav = useTranslations('Navigation');
  const tMenu = useTranslations('InstituteMenu');
  const tHero = useTranslations('ServicesHero');
  const tList = useTranslations('ServicesList');
  const tCta = useTranslations('ServicesCta');
  const tFooter = useTranslations('ServicesFooter');

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLocale: 'en' | 'fr') => {
    if (newLocale === locale) return;
    const barePath = pathname.startsWith('/fr')
      ? pathname.replace(/^\/fr/, '') || '/'
      : pathname;
    const newPath = newLocale === 'fr' ? `/fr${barePath === '/' ? '' : barePath}` : barePath;
    router.push(newPath || '/');
  };

  const NAV_DROPDOWN_ITEMS = [
    { href: '/institute', key: 'overview' },
    { href: '/institute/about', key: 'about' },
    { href: '/institute/research', key: 'research' },
    { href: '/institute/publications', key: 'publications' },
    { href: '/institute/training', key: 'training' },
    { href: '/institute/people', key: 'people' },
    { href: '/institute/events', key: 'events' },
    { href: '/institute/news', key: 'news' },
    { href: '/institute/software', key: 'software' },
    { href: '/institute/careers', key: 'careers' },
    { href: '/institute/blog', key: 'blog' },
    { href: '/institute/contact', key: 'contact' },
  ];

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col antialiased">

      {/* NAVIGATION */}
      <nav aria-label="Main Navigation" ref={mobileNavRef} className="sticky top-0 z-50 border-b border-slate-800/70 bg-[#060a12] px-6 py-3.5 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
            <div className="flex items-center rounded-md bg-white px-2.5 py-1">
              <Image
                src="/images/logo-institute.jpeg"
                alt="GeoSignal Institute"
                width={140}
                height={40}
                className="h-7 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation (Centré) */}
          <ul className="hidden md:flex flex-1 justify-center items-center gap-9 text-[13.5px] font-medium text-slate-400 m-0 p-0 list-none">
            <li><Link href="/" className="hover:text-slate-200 transition-colors">{tNav('home')}</Link></li>
            <li><Link href="/about" className="hover:text-slate-200 transition-colors">{tNav('about')}</Link></li>

            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 pb-[18px] -mb-[14px] focus:outline-none transition-colors"
                aria-expanded={isOpen}
              >
                {tNav('institute')}
                <svg
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-60 rounded-lg border border-slate-800 bg-[#0b1329] p-1.5 shadow-xl z-50">
                  {NAV_DROPDOWN_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-md px-3.5 py-2 text-[13px] text-slate-400 transition-colors hover:bg-[#060a12] hover:text-white"
                    >
                      {tMenu(item.key)}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link href="/services" className="text-white border-b-2 border-cyan-500 pb-[18px] -mb-[14px]">
                {tNav('services')}
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center rounded-md border border-slate-700 text-[11px] font-semibold overflow-hidden">
              <button
                onClick={() => switchLanguage('en')}
                className={`px-2.5 py-1.5 transition-colors ${locale === 'en' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}
              >
                EN
              </button>
              <button
                onClick={() => switchLanguage('fr')}
                className={`px-2.5 py-1.5 transition-colors ${locale === 'fr' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}
              >
                FR
              </button>
            </div>

            <Link
              href="/contact"
              className="hidden md:inline-block rounded-md border border-slate-700 px-4 py-1.5 text-[13.5px] font-medium text-slate-200 hover:border-cyan-600 hover:text-white transition-colors"
            >
              {tNav('contact')}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className={`block h-[1.5px] w-6 bg-slate-200 transition-transform duration-200 ${mobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
              <span className={`block h-[1.5px] w-6 bg-slate-200 transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-[1.5px] w-6 bg-slate-200 transition-transform duration-200 ${mobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mx-auto max-w-7xl mt-4 pb-2 border-t border-slate-800/70 pt-4">
            <ul className="flex flex-col gap-1 text-sm font-medium m-0 p-0 list-none">
              <li><Link href="/" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">{tNav('home')}</Link></li>
              <li><Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">{tNav('about')}</Link></li>
              <li><Link href="/services" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-cyan-400 font-semibold">{tNav('services')}</Link></li>
              <li><Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">{tNav('contact')}</Link></li>
            </ul>
            <div className="mt-3 pt-3 border-t border-slate-800/70">
              <span className="block px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-cyan-500">{tNav('institute')}</span>
              {NAV_DROPDOWN_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-[13px] text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors"
                >
                  {tMenu(item.key)}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 px-3 sm:hidden">
              <span className="text-xs text-slate-500">{tNav('language')}</span>
              <div className="flex items-center rounded-md border border-slate-700 text-[11px] font-semibold overflow-hidden">
                <button
                  onClick={() => switchLanguage('en')}
                  className={`px-2.5 py-1 transition-colors ${locale === 'en' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}
                >
                  EN
                </button>
                <button
                  onClick={() => switchLanguage('fr')}
                  className={`px-2.5 py-1 transition-colors ${locale === 'fr' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}
                >
                  FR
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative border-b border-slate-800/70 px-6 pt-20 pb-24 md:px-12 md:pt-28 md:pb-32">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)',
          }}
        />
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-5">
              {tHero('badge')}
            </p>
            <h1 className="text-[2.3rem] leading-[1.12] sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-5">
              {tHero('title')}
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10">
              {tHero('subtitle')}
            </p>
            <Link
              href="/contact"
              className="rounded-md bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-500 transition-colors inline-block"
            >
              {tHero('cta')}
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-6 md:px-12 py-16 flex-1 w-full space-y-6">

        {SERVICE_IDS.map((id) => {
          const features = tList.raw(`${id}.features`) as string[];
          return (
            <article
              key={id}
              id={id}
              className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 md:p-10"
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                {tList(`${id}.title`)}
              </h2>
              <div className="text-sm font-semibold text-cyan-400 mb-4">
                {tList(`${id}.tagline`)}
              </div>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
                {tList(`${id}.description`)}
              </p>

              <div className="border-t border-slate-800/80 pt-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-4">
                  {tList('highlightsLabel')}
                </span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0 m-0">
                  {features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-400">
                      <svg className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}

        {/* CALL TO ACTION */}
        <div className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 md:p-10 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            {tCta('title')}
          </h3>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
            {tCta('body')}
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-md bg-cyan-600 hover:bg-cyan-500 px-6 py-3 text-sm font-semibold text-white transition-colors"
          >
            {tCta('cta')}
          </Link>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-800/80 bg-[#030712] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">

            <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
              <h3 className="text-lg font-bold text-white tracking-wide">
                {tFooter('title')}
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
                {tFooter('tagline')}
              </p>

              <div className="pt-3 space-y-2">
                <label htmlFor="newsletter-email" className="block text-xs font-semibold text-white">
                  {tFooter('newsletterLabel')}
                </label>
                <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="name@email.com"
                    className="w-full rounded-md border border-slate-800 bg-[#0b1329]/70 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-md bg-[#1e293b] hover:bg-[#283853] px-4 py-2 text-xs font-medium text-white border border-slate-700 transition-colors"
                  >
                    {tFooter('subscribe')}
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-3 gap-6 text-xs sm:text-sm pt-2 lg:pt-0">
              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  {tNav('services')}
                </h4>
                <ul className="space-y-2.5 text-slate-400 list-none p-0 m-0">
                  <li><Link href="#subsurface-imaging" className="hover:text-white transition-colors">{tFooter('link_subsurface')}</Link></li>
                  <li><Link href="#das-processing" className="hover:text-white transition-colors">{tFooter('link_das')}</Link></li>
                  <li><Link href="#resource-exploration" className="hover:text-white transition-colors">{tFooter('link_resource')}</Link></li>
                  <li><Link href="#custom-geoai" className="hover:text-white transition-colors">{tFooter('link_custom')}</Link></li>
                  <li><Link href="#consulting-audit" className="hover:text-white transition-colors">{tFooter('link_consulting')}</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  {tFooter('pagesHeader')}
                </h4>
                <ul className="space-y-2.5 text-slate-400 list-none p-0 m-0">
                  <li><Link href="/" className="hover:text-white transition-colors">{tNav('home')}</Link></li>
                  <li><Link href="/institute" className="hover:text-white transition-colors">{tMenu('overview')}</Link></li>
                  <li><Link href="/institute/blog" className="hover:text-white transition-colors">{tMenu('blog')}</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">{tNav('contact')}</Link></li>
                  <li><Link href="/institute/careers" className="hover:text-white transition-colors">{tMenu('careers')}</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  {tFooter('socialHeader')}
                </h4>
                <ul className="space-y-2.5 text-slate-400 list-none p-0 m-0">
                  <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
                  <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
                </ul>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-800/80 pt-6">
            <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-500 text-center md:flex-row md:text-left">
              <div className="bg-white rounded-md px-3 py-1.5 flex items-center justify-center">
                <Image
                  src="/images/logo-institute.jpeg"
                  alt="GeoSignal Institute"
                  width={120}
                  height={35}
                  className="h-8 w-auto object-contain"
                />
              </div>
              <p className="text-slate-500 m-0">
                {tFooter('copyright', { year: currentYear ?? 2026 })}
              </p>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
