'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const tNav = useTranslations('Navigation');
  const tHero = useTranslations('AboutHero');
  const tWho = useTranslations('WhoWeAre');
  const tValues = useTranslations('Values');
  const tWhy = useTranslations('WhyWork');
  const tTeam = useTranslations('Team');
  const tFaq = useTranslations('AboutFaq');
  const tCta = useTranslations('AboutCta');
  const tServices = useTranslations('Services');
  const tFooter = useTranslations('Footer');

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const switchLanguage = (newLocale: 'en' | 'fr') => {
    if (newLocale === locale) return;
    const barePath = pathname.startsWith('/fr')
      ? pathname.replace(/^\/fr/, '') || '/'
      : pathname;
    const newPath = newLocale === 'fr' ? `/fr${barePath === '/' ? '' : barePath}` : barePath;
    router.push(newPath || '/');
  };

  const faqs = [
    { q: tFaq('q1'), a: tFaq('a1') },
    { q: tFaq('q2'), a: tFaq('a2') },
    { q: tFaq('q3'), a: tFaq('a3') },
    { q: tFaq('q4'), a: tFaq('a4') },
    { q: tFaq('q5'), a: tFaq('a5') },
  ];

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white flex flex-col antialiased">

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
            <li><Link href="/" className="hover:text-slate-200 transition-colors">{tNav('home')}</Link></li>
            <li>
              <Link href="/about" className="text-white border-b-2 border-cyan-500 pb-[18px] -mb-[14px]">
                {tNav('about')}
              </Link>
            </li>
            <li><Link href="/institute" className="hover:text-slate-200 transition-colors">{tNav('institute')}</Link></li>
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
              <li>
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">
                  {tNav('home')}
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-white bg-[#0b1329] transition-colors">
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href="/institute" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">
                  {tNav('institute')}
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

            <p className="text-slate-400 text-base md:text-lg mb-5 leading-relaxed">
              {tHero('body1')}
            </p>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              {tHero('body2')}
            </p>
          </div>
        </div>
      </section>

      {/* CONTENEUR PRINCIPAL */}
      <main className="mx-auto max-w-7xl px-6 md:px-12 py-16 w-full space-y-24 flex-1">

        {/* WHO WE ARE */}
        <section>
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-3">
              {tWho('badge')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              {tWho('title')}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {tWho('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0b1329] p-8 rounded-xl border border-slate-800/80">
              <span className="text-xs font-mono text-slate-600">01</span>
              <h3 className="text-lg font-bold text-white mt-2 mb-3">{tWho('c1_title')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{tWho('c1_desc')}</p>
            </div>
            <div className="bg-[#0b1329] p-8 rounded-xl border border-slate-800/80">
              <span className="text-xs font-mono text-slate-600">02</span>
              <h3 className="text-lg font-bold text-white mt-2 mb-3">{tWho('c2_title')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{tWho('c2_desc')}</p>
            </div>
            <div className="bg-[#0b1329] p-8 rounded-xl border border-slate-800/80">
              <span className="text-xs font-mono text-slate-600">03</span>
              <h3 className="text-lg font-bold text-white mt-2 mb-3">{tWho('c3_title')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{tWho('c3_desc')}</p>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section>
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-3">
              {tValues('badge')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              {tValues('title')}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {tValues('subtitle')}
            </p>
          </div>

          <div className="divide-y divide-slate-800/80 border-t border-b border-slate-800/80">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
              <span className="md:col-span-2 text-xs font-mono text-slate-600">01</span>
              <h3 className="md:col-span-3 text-base font-bold text-white">{tValues('v1_title')}</h3>
              <p className="md:col-span-7 text-slate-400 text-sm leading-relaxed">{tValues('v1_desc')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
              <span className="md:col-span-2 text-xs font-mono text-slate-600">02</span>
              <h3 className="md:col-span-3 text-base font-bold text-white">{tValues('v2_title')}</h3>
              <p className="md:col-span-7 text-slate-400 text-sm leading-relaxed">{tValues('v2_desc')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
              <span className="md:col-span-2 text-xs font-mono text-slate-600">03</span>
              <h3 className="md:col-span-3 text-base font-bold text-white">{tValues('v3_title')}</h3>
              <p className="md:col-span-7 text-slate-400 text-sm leading-relaxed">{tValues('v3_desc')}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
              <span className="md:col-span-2 text-xs font-mono text-slate-600">04</span>
              <h3 className="md:col-span-3 text-base font-bold text-white">{tValues('v4_title')}</h3>
              <p className="md:col-span-7 text-slate-400 text-sm leading-relaxed">{tValues('v4_desc')}</p>
            </div>
          </div>
        </section>

        {/* WHY WORK WITH US */}
        <section>
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-3">
              {tWhy('badge')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              {tWhy('title')}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {tWhy('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0b1329] p-8 rounded-xl border border-slate-800/80">
              <h3 className="text-lg font-bold text-white mb-4">{tWhy('w1_title')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{tWhy('w1_desc1')}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{tWhy('w1_desc2')}</p>
            </div>
            <div className="bg-[#0b1329] p-8 rounded-xl border border-slate-800/80">
              <h3 className="text-lg font-bold text-white mb-4">{tWhy('w2_title')}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{tWhy('w2_desc1')}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{tWhy('w2_desc2')}</p>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section>
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-3">
              {tTeam('badge')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              {tTeam('title')}
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              {tTeam('subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0b1329] rounded-xl border border-slate-800/80 overflow-hidden flex flex-col">
              <div className="relative h-64 w-full bg-[#050b14] p-3 flex items-center justify-center">
                <Image src="/images/dr-oboue.jpeg" alt="Dr. Innocent Oboué, PhD" fill className="object-contain object-center scale-90" />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white">{tTeam('t1_name')}</h3>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors p-1.5 border border-slate-800 rounded-md bg-[#080f1e] shrink-0 ml-2">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                  </div>
                  <p className="text-xs font-semibold text-cyan-400 mb-3">{tTeam('t1_role')}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{tTeam('t1_desc')}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0b1329] rounded-xl border border-slate-800/80 overflow-hidden flex flex-col">
              <div className="relative h-64 w-full bg-[#050b14]">
                <Image src="/images/global-network.png" alt="Global Collaborative Network" fill className="object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white">{tTeam('t2_name')}</h3>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors p-1.5 border border-slate-800 rounded-md bg-[#080f1e] shrink-0 ml-2">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                  </div>
                  <p className="text-xs font-semibold text-cyan-400 mb-3">{tTeam('t2_role')}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{tTeam('t2_desc')}</p>
                </div>
              </div>
            </div>

            <div className="bg-[#0b1329] rounded-xl border border-slate-800/80 overflow-hidden flex flex-col">
              <div className="relative h-64 w-full bg-[#050b14]">
                <Image src="/images/multidisciplinary.jpeg" alt="Multi-Disciplinary Experts" fill className="object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white">{tTeam('t3_name')}</h3>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors p-1.5 border border-slate-800 rounded-md bg-[#080f1e] shrink-0 ml-2">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                  </div>
                  <p className="text-xs font-semibold text-cyan-400 mb-3">{tTeam('t3_role')}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{tTeam('t3_desc')}</p>
                </div>
              </div>
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
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-800/80 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left text-sm sm:text-[15px] font-semibold text-white hover:bg-[#0b1329]/50 transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`shrink-0 w-4 h-4 border-r-[1.5px] border-b-[1.5px] border-slate-500 transition-transform duration-200 ${
                      openFaq === idx ? '-rotate-[135deg] mt-1' : 'rotate-45 -mt-1'
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="rounded-xl border border-slate-800/80 bg-[#0b1329] p-10 sm:p-14 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-5 tracking-tight">
              {tCta('title')}
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base mb-9 leading-relaxed">
              {tCta('body')}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-md bg-cyan-600 px-7 py-3.5 text-sm font-semibold text-white hover:bg-cyan-500 transition-colors"
            >
              {tCta('cta')}
            </Link>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-800/80 bg-[#030712] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">

            <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
              <h3 className="text-lg font-bold text-white tracking-wide">GeoSignal Analytics</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
                {tFooter('about')}
              </p>

              <div className="pt-3 space-y-2">
                <span className="block text-xs font-semibold text-white">{tFooter('newsletterTitle')}</span>
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

            <div className="lg:col-span-7 grid grid-cols-3 gap-6 text-xs sm:text-sm">
              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">{tNav('services')}</h4>
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
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">{tFooter('company')}</h4>
                <ul className="space-y-2.5 text-slate-400">
                  <li><Link href="/" className="hover:text-white transition-colors">{tNav('home')}</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">{tNav('about')}</Link></li>
                  <li><Link href="/institute" className="hover:text-white transition-colors">{tNav('institute')}</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">{tNav('contact')}</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">{tFooter('connect')}</h4>
                <ul className="space-y-2.5 text-slate-400">
                  <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
                  <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-6">
            <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-500 text-center md:flex-row md:text-left">
              <div className="bg-white rounded-md px-3 py-1.5 flex items-center justify-center">
                <Image src="/images/logo.png" alt="GeoSignal Analytics" width={120} height={35} className="h-7 w-auto object-contain" />
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
