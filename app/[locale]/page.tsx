'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tNav = useTranslations('Navigation');
  const tHero = useTranslations('Hero');
  const tServices = useTranslations('Services');
  const tMethodology = useTranslations('Methodology');
  const tCaseStudy = useTranslations('CaseStudy');
  const tTrackRecord = useTranslations('TrackRecord');
  const tFaq = useTranslations('Faq');
  const tFooter = useTranslations('Footer');

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Changement de langue, cohérent avec routing.ts : defaultLocale = 'en' (sans préfixe),
  // 'fr' porte le préfixe /fr (localePrefix: 'as-needed').
  const switchLanguage = (newLocale: 'en' | 'fr') => {
    if (newLocale === locale) return;

    // Retire un préfixe /fr existant pour obtenir le chemin "nu"
    const bareePath = pathname.startsWith('/fr')
      ? pathname.replace(/^\/fr/, '') || '/'
      : pathname;

    const newPath = newLocale === 'fr' ? `/fr${bareePath === '/' ? '' : bareePath}` : bareePath;

    router.push(newPath || '/');
  };

  const navLinks = [
    { href: '/', label: tNav('home') },
    { href: '/about', label: tNav('about') },
    { href: '/institute', label: tNav('institute') },
    { href: '/services', label: tNav('services') },
  ];

  const faqs = [
    { q: tFaq('q1'), a: tFaq('a1') },
    { q: tFaq('q2'), a: tFaq('a2') },
    { q: tFaq('q3'), a: tFaq('a3') },
    { q: tFaq('q4'), a: tFaq('a4') },
  ];

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white flex flex-col antialiased">

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/70 bg-[#060a12] px-6 py-3.5 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center rounded-md bg-white px-2.5 py-1">
              <Image
                src="/images/logo.png"
                alt="GeoSignal Analytics"
                width={150}
                height={40}
                className="h-7 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Liens desktop */}
          <ul className="hidden md:flex items-center gap-9 text-[13.5px] font-medium text-slate-400 m-0 p-0 list-none">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    link.href === '/'
                      ? 'text-white border-b-2 border-cyan-500 pb-[18px] -mb-[14px]'
                      : 'hover:text-slate-200 transition-colors'
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Zone droite : langue + contact + burger */}
          <div className="flex items-center gap-3">
            {/* Sélecteur de langue */}
            <div className="hidden sm:flex items-center rounded-md border border-slate-700 text-[11px] font-semibold overflow-hidden">
              <button
                onClick={() => switchLanguage('en')}
                className={`px-2.5 py-1.5 transition-colors ${locale === 'en' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}
              >
                EN
              </button>
              <button
                onClick={() => switchLanguage('fr')}
                className={`px-2.5 py-1.5 transition-colors ${locale === 'fr' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}
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

            {/* Burger mobile */}
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

        {/* Menu mobile déroulant */}
        {mobileMenuOpen && (
          <div className="md:hidden mx-auto max-w-7xl mt-4 pb-2 border-t border-slate-800/70 pt-4">
            <ul className="flex flex-col gap-1 text-sm font-medium m-0 p-0 list-none">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block rounded-md px-3 py-2.5 transition-colors ${
                      link.href === '/' ? 'text-white bg-[#0b1329]' : 'text-slate-400 hover:bg-[#0b1329] hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors"
                >
                  {tNav('contact')}
                </Link>
              </li>
            </ul>

            {/* Sélecteur langue mobile */}
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
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)',
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-5">
              {tHero('badge')}
            </p>

            <h1 className="text-[2.3rem] leading-[1.12] sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-7">
              {tHero('title')}
            </h1>

            <p className="text-slate-400 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
              {tHero('subtitle')}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="#sectors"
                className="rounded-md bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-500 transition-colors"
              >
                {tHero('ctaServices')}
              </Link>
              <Link
                href="/contact"
                className="rounded-md border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500 hover:text-white transition-colors"
              >
                {tHero('ctaContact')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <main className="mx-auto max-w-7xl px-6 md:px-12 py-16 w-full space-y-24 flex-1">

        {/* SERVICES */}
        <section id="sectors" className="scroll-mt-24">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-3">
              {tServices('badge')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              {tServices('title')}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {tServices('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

            <div className="lg:col-span-7 bg-[#0b1329] p-8 rounded-xl border border-slate-800/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-slate-600">01</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">{tServices('s1_title')}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {tServices('s1_desc')}
                </p>
              </div>
              <Link href="/services/advanced-geophysics-and-ai" className="text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-colors">
                {tServices('readMore')}
              </Link>
            </div>

            <div className="lg:col-span-5 bg-[#0b1329] p-8 rounded-xl border border-slate-800/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-slate-600">02</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3">{tServices('s2_title')}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {tServices('s2_desc')}
                </p>
              </div>
              <Link href="/services/geoscience-and-exploration" className="text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-colors">
                {tServices('readMore')}
              </Link>
            </div>

            <div className="lg:col-span-4 bg-[#0b1329] p-8 rounded-xl border border-slate-800/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-slate-600">03</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3">{tServices('s3_title')}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {tServices('s3_desc')}
                </p>
              </div>
              <Link href="/services/water-resources" className="text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-colors">
                {tServices('readMore')}
              </Link>
            </div>

            <div className="lg:col-span-4 bg-[#0b1329] p-8 rounded-xl border border-slate-800/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-slate-600">04</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3">{tServices('s4_title')}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {tServices('s4_desc')}
                </p>
              </div>
              <Link href="/services/mapping-gis-and-remote-sensing" className="text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-colors">
                {tServices('readMore')}
              </Link>
            </div>

            <div className="lg:col-span-4 bg-[#0b1329] p-8 rounded-xl border border-slate-800/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-slate-600">05</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3">{tServices('s5_title')}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  {tServices('s5_desc')}
                </p>
              </div>
              <Link href="/services/environmental-solutions" className="text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-colors">
                {tServices('readMore')}
              </Link>
            </div>

            <div className="lg:col-span-12 bg-[#0b1329] p-8 rounded-xl border border-slate-800/80 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="md:max-w-2xl">
                <span className="text-xs font-mono text-slate-600">06</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-2">{tServices('s6_title')}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {tServices('s6_desc')}
                </p>
              </div>
              <Link href="/services/qhse" className="shrink-0 text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-colors">
                {tServices('readMore')}
              </Link>
            </div>

          </div>
        </section>

        {/* MÉTHODOLOGIE */}
        <section>
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-3">
              {tMethodology('badge')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              {tMethodology('title')}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {tMethodology('subtitle')}
            </p>
          </div>

          <div className="divide-y divide-slate-800/80 border-t border-b border-slate-800/80">

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
              <span className="md:col-span-2 text-xs font-mono text-slate-600">01</span>
              <h3 className="md:col-span-3 text-base font-bold text-white">{tMethodology('m1_title')}</h3>
              <p className="md:col-span-7 text-slate-400 text-sm leading-relaxed">
                {tMethodology('m1_desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
              <span className="md:col-span-2 text-xs font-mono text-slate-600">02</span>
              <h3 className="md:col-span-3 text-base font-bold text-white">{tMethodology('m2_title')}</h3>
              <p className="md:col-span-7 text-slate-400 text-sm leading-relaxed">
                {tMethodology('m2_desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
              <span className="md:col-span-2 text-xs font-mono text-slate-600">03</span>
              <h3 className="md:col-span-3 text-base font-bold text-white">{tMethodology('m3_title')}</h3>
              <p className="md:col-span-7 text-slate-400 text-sm leading-relaxed">
                {tMethodology('m3_desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
              <span className="md:col-span-2 text-xs font-mono text-slate-600">04</span>
              <h3 className="md:col-span-3 text-base font-bold text-white">{tMethodology('m4_title')}</h3>
              <p className="md:col-span-7 text-slate-400 text-sm leading-relaxed">
                {tMethodology('m4_desc')}
              </p>
            </div>

          </div>
        </section>

        {/* CASE STUDY */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500">
                {tCaseStudy('badge')}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                {tCaseStudy('title')}
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                {tCaseStudy('desc')}
              </p>
              <ul className="space-y-2.5 text-slate-400 text-sm pt-1">
                <li className="flex gap-2.5">
                  <span className="text-slate-600">—</span>
                  {tCaseStudy('point1')}
                </li>
                <li className="flex gap-2.5">
                  <span className="text-slate-600">—</span>
                  {tCaseStudy('point2')}
                </li>
                <li className="flex gap-2.5">
                  <span className="text-slate-600">—</span>
                  {tCaseStudy('point3')}
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-xl border border-slate-800 bg-[#0b1329] p-2.5">
                <Image
                  src="/images/seismic-3d-model.jpeg"
                  alt="3D seismic reconstruction model"
                  width={800}
                  height={500}
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
              <p className="text-xs text-slate-600 mt-3">
                {tCaseStudy('caption')}
              </p>
            </div>

          </div>
        </section>

        {/* VALIDATION SCIENTIFIQUE & INDUSTRIELLE */}
        <section>
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-3">
              {tTrackRecord('badge')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              {tTrackRecord('title')}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {tTrackRecord('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0b1329] p-8 rounded-xl border border-slate-800/80">
              <h3 className="text-lg font-bold text-white mb-3">{tTrackRecord('card1_title')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {tTrackRecord('card1_desc')}
              </p>
            </div>

            <div className="bg-[#0b1329] p-8 rounded-xl border border-slate-800/80">
              <h3 className="text-lg font-bold text-white mb-3">{tTrackRecord('card2_title')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {tTrackRecord('card2_desc')}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-3">
              {tFaq('badge')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              {tFaq('title')}
            </h2>
          </div>

          <div className="max-w-3xl space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-slate-800/80 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left text-sm sm:text-[15px] font-semibold text-white hover:bg-[#0b1329]/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`shrink-0 w-4 h-4 border-r-[1.5px] border-b-[1.5px] border-slate-500 transition-transform duration-200 ${
                      openFaq === index ? '-rotate-[135deg] mt-1' : 'rotate-45 -mt-1'
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-800/80 bg-[#030712] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">

            {/* MARQUE & NEWSLETTER */}
            <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
              <h3 className="text-lg font-bold text-white tracking-wide">
                GeoSignal Analytics
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
                {tFooter('about')}
              </p>

              <div className="pt-3 space-y-2">
                <span className="block text-xs font-semibold text-white">
                  {tFooter('newsletterTitle')}
                </span>
                <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
                  <input
                    type="email"
                    placeholder="name@company.com"
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

            {/* NAVIGATION LINKS */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-6 text-xs sm:text-sm">
              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  {tNav('services')}
                </h4>
                <ul className="space-y-2.5 text-slate-400">
                  <li><Link href="/services/advanced-geophysics-and-ai" className="hover:text-white transition-colors">{tServices('s1_title')}</Link></li>
                  <li><Link href="/services/geoscience-and-exploration" className="hover:text-white transition-colors">{tServices('s2_title')}</Link></li>
                  <li><Link href="/services/water-resources" className="hover:text-white transition-colors">{tServices('s3_title')}</Link></li>
                  <li><Link href="/services/mapping-gis-and-remote-sensing" className="hover:text-white transition-colors">{tServices('s4_title')}</Link></li>
                  <li><Link href="/services/environmental-solutions" className="hover:text-white transition-colors">{tServices('s5_title')}</Link></li>
                  <li><Link href="/services/qhse" className="hover:text-white transition-colors">{tServices('s6_title')}</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  {tFooter('company')}
                </h4>
                <ul className="space-y-2.5 text-slate-400">
                  <li><Link href="/" className="hover:text-white transition-colors">{tNav('home')}</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">{tNav('about')}</Link></li>
                  <li><Link href="/institute" className="hover:text-white transition-colors">{tNav('institute')}</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">{tNav('contact')}</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  {tFooter('connect')}
                </h4>
                <ul className="space-y-2.5 text-slate-400">
                  <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
                  <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a></li>
                </ul>
              </div>
            </div>

          </div>

          {/* BOTTOM BAR */}
          <div className="border-t border-slate-800/80 pt-6">
            <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-500 text-center md:flex-row md:text-left">

              <div className="bg-white rounded-md px-3 py-1.5 flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="GeoSignal Analytics"
                  width={120}
                  height={35}
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
