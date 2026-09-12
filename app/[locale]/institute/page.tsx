'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function InstitutePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const tNav = useTranslations('Navigation');
  const tMenu = useTranslations('InstituteMenu');
  const tHero = useTranslations('InstituteHero');
  const tOverview = useTranslations('InstituteOverview');
  const tCore = useTranslations('InstituteCoreAreas');
  const tResearch = useTranslations('InstituteResearchAreas');
  const tFooter = useTranslations('InstituteFooter');

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

  const MENU_ITEMS = [
    { key: 'overview', href: '/institute' },
    { key: 'about', href: '/institute/about' },
    { key: 'research', href: '/institute/research' },
    { key: 'publications', href: '/institute/publications' },
    { key: 'training', href: '/institute/training' },
    { key: 'people', href: '/institute/people' },
    { key: 'events', href: '/institute/events' },
    { key: 'news', href: '/institute/news' },
    { key: 'software', href: '/institute/software' },
    { key: 'careers', href: '/institute/careers' },
    { key: 'blog', href: '/institute/blog' },
    { key: 'contact', href: '/institute/contact' },
  ];

  const RESEARCH_AREAS = [
    { id: 'research-area-1', titleKey: 'r1_title', descKey: 'r1_desc', href: '/institute/research/research-area-1' },
    { id: 'research-area-2', titleKey: 'r2_title', descKey: 'r2_desc', href: '/institute/research/research-area-2' },
    { id: 'research-area-3', titleKey: 'r3_title', descKey: 'r3_desc', href: '/institute/research/research-area-3' },
    { id: 'research-area-4', titleKey: 'r4_title', descKey: 'r4_desc', href: '/institute/research/research-area-4' },
  ];

  const CORE_AREAS = [
    { num: '01', titleKey: 'c1_title', descKey: 'c1_desc' },
    { num: '02', titleKey: 'c2_title', descKey: 'c2_desc' },
    { num: '03', titleKey: 'c3_title', descKey: 'c3_desc' },
    { num: '04', titleKey: 'c4_title', descKey: 'c4_desc' },
  ];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-200 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200">

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/70 bg-[#060a12] px-6 py-3.5 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
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

          {/* Menu Desktop */}
          <ul className="hidden md:flex items-center gap-9 text-[13.5px] font-medium text-slate-400 m-0 p-0 list-none">
            <li><Link href="/" className="hover:text-slate-200 transition-colors">{tNav('home')}</Link></li>
            <li><Link href="/about" className="hover:text-slate-200 transition-colors">{tNav('about')}</Link></li>

            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 text-white border-b-2 border-cyan-500 pb-[18px] -mb-[14px] focus:outline-none"
                aria-expanded={isOpen}
                aria-haspopup="true"
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
                <div className="absolute right-0 mt-4 w-60 rounded-lg border border-slate-800 bg-[#0b1329] p-1.5 shadow-xl z-50">
                  {MENU_ITEMS.map((item) => (
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

            <li><Link href="/services" className="hover:text-slate-200 transition-colors">{tNav('services')}</Link></li>
          </ul>

          {/* Zone droite : langue + contact + burger */}
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

            {/* Bouton Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className={`block h-[1.5px] w-6 bg-slate-200 transition-transform duration-200 ${mobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
              <span className={`block h-[1.5px] w-6 bg-slate-200 transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-[1.5px] w-6 bg-slate-200 transition-transform duration-200 ${mobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden mx-auto max-w-7xl mt-4 pb-2 border-t border-slate-800/70 pt-4">
            <ul className="flex flex-col gap-1 text-sm font-medium m-0 p-0 list-none">
              <li>
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">
                  {tNav('home')}
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">
                  {tNav('services')}
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
            <div className="mt-3 pt-3 border-t border-slate-800/70">
              <span className="block px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-cyan-500">
                {tNav('institute')}
              </span>
              {MENU_ITEMS.map((item) => (
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
        <div
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-cyan-500/10 blur-[100px]"
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-5">
              {tNav('institute')}
            </p>

            <h1 className="text-[2.3rem] leading-[1.12] sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-7">
              {tHero('title')}
            </h1>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10">
              {tHero('subtitle')}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/institute/research"
                className="rounded-md bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-500 transition-colors"
              >
                {tHero('ctaResearch')}
              </Link>
              <Link
                href="/institute/about"
                className="rounded-md border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500 hover:text-white transition-colors"
              >
                {tHero('ctaAbout')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-12">

        {/* OVERVIEW */}
        <section className="mb-24">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-3">
              {tMenu('overview')}
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-6">
              {tOverview('title')}
            </h2>

            <div className="space-y-4 text-slate-400 leading-relaxed text-base">
              <p>{tOverview('body1')}</p>
              <p>{tOverview('body2')}</p>
            </div>
          </div>
        </section>

        {/* CORE AREAS */}
        <section className="mb-24">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-3">
              {tCore('badge')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              {tCore('title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {CORE_AREAS.map((card) => (
              <div
                key={card.num}
                className="bg-[#0b1329] p-8 rounded-xl border border-slate-800/80"
              >
                <span className="text-xs font-mono text-slate-600">{card.num}</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3">
                  {tCore(card.titleKey)}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {tCore(card.descKey)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/institute/about"
              className="inline-flex items-center rounded-md border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500 hover:text-white transition-colors"
            >
              {tCore('learnMore')}
            </Link>
          </div>
        </section>

        {/* RESEARCH AREAS */}
        <section className="mb-16">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-3">
              {tResearch('badge')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              {tResearch('title')}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {tResearch('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {RESEARCH_AREAS.map((area) => (
              <div
                key={area.id}
                id={area.id}
                className="flex flex-col justify-between bg-[#0b1329] p-8 rounded-xl border border-slate-800/80 scroll-mt-24"
              >
                <div>
                  <h3 className="mb-3 text-lg font-bold text-white">
                    {tResearch(area.titleKey)}
                  </h3>
                  <p className="mb-6 text-slate-400 text-sm leading-relaxed">
                    {tResearch(area.descKey)}
                  </p>
                </div>
                <Link
                  href={area.href}
                  className="text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-colors"
                >
                  {tResearch('readMore')}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/institute/research"
              className="inline-flex items-center rounded-md bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-500 transition-colors"
            >
              {tResearch('seeAll')}
            </Link>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-800/80 bg-[#030712] px-6 py-14 text-slate-400 text-sm md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">

            <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
              <h3 className="text-lg font-bold text-white tracking-wide">
                GeoSignal Institute
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
                {tFooter('tagline')}
              </p>

              <div className="pt-3 space-y-2">
                <span className="block text-xs font-semibold text-white">
                  {tFooter('newsletterTitle')}
                </span>
                <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
                  <input
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

            <div className="lg:col-span-7 grid grid-cols-3 gap-6 text-xs sm:text-sm">
              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  {tFooter('linksHeader')}
                </h4>
                <ul className="space-y-2.5 text-slate-400">
                  <li><Link href="/services" className="hover:text-white transition-colors">{tNav('services')}</Link></li>
                  <li><Link href="/institute/approach" className="hover:text-white transition-colors">{tFooter('link_approach')}</Link></li>
                  <li><Link href="/institute/publications" className="hover:text-white transition-colors">{tMenu('publications')}</Link></li>
                  <li><Link href="/institute/training" className="hover:text-white transition-colors">{tMenu('training')}</Link></li>
                  <li><Link href="/institute/software" className="hover:text-white transition-colors">{tFooter('link_opensource')}</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  {tFooter('pagesHeader')}
                </h4>
                <ul className="space-y-2.5 text-slate-400">
                  <li><Link href="/" className="hover:text-white transition-colors">{tNav('home')}</Link></li>
                  <li><Link href="/institute" className="hover:text-white transition-colors">{tMenu('overview')}</Link></li>
                  <li><Link href="/institute/blog" className="hover:text-white transition-colors">{tMenu('blog')}</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">{tNav('contact')}</Link></li>
                  <li><Link href="/institute/careers" className="hover:text-white transition-colors">{tMenu('careers')}</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  {tFooter('socialsHeader')}
                </h4>
                <ul className="space-y-2.5 text-slate-400">
                  <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
                  <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter / X</a></li>
                  <li><a href="https://www.researchgate.net" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ResearchGate</a></li>
                  <li><a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Google Scholar</a></li>
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
                  width={110}
                  height={30}
                  className="h-7 w-auto object-contain"
                />
              </div>

              <p className="text-slate-500">
                {tFooter('copyright', { year: new Date().getFullYear() })}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
