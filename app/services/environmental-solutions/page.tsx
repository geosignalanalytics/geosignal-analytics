'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const NAV_DROPDOWN_ITEMS = [
  { href: '/institute', label: 'Overview' },
  { href: '/institute/about', label: 'About Us' },
  { href: '/institute/training', label: 'Training' },
  { href: '/institute/research', label: 'Research' },
  { href: '/institute/publications', label: 'Publications' },
];

const SUB_SERVICES = [
  {
    title: "Études d'impact environnemental (EIE)",
    summary:
      "Études complètes pour identifier et limiter les effets environnementaux potentiels d'un projet.",
    focus: "État initial de l'environnement, prévision des impacts et conception des mesures d'atténuation.",
    edge: "On croise données géophysiques et SIG pour modéliser les impacts à long terme sur le sol et les eaux souterraines, en amont de l'approbation du projet.",
  },
  {
    title: 'Plans de gestion environnementale et sociale',
    summary:
      'Des cadres concrets pour que les engagements environnementaux et sociaux se traduisent réellement en actions.',
    focus: "Suivi de conformité, évaluation des risques sociaux, stratégies d'engagement des parties prenantes.",
    edge: 'Suivi numérique en temps réel des indicateurs du PGES pour garantir la conformité tout au long du projet.',
  },
  {
    title: 'Gestion des déchets',
    summary:
      "Conception de systèmes efficaces pour la réduction, la collecte et l'élimination sécurisée des déchets industriels et municipaux.",
    focus: "Caractérisation des déchets dangereux, choix de sites d'enfouissement, conseil en économie circulaire.",
    edge: "Géophysique ERT et GPR pour surveiller l'intégrité des sites d'enfouissement et prévenir les fuites de lixiviat vers les nappes.",
  },
  {
    title: 'Protection et suivi des écosystèmes',
    summary:
      'Observation continue et protection active des habitats sensibles et des ressources naturelles.',
    focus: "Suivi de la biodiversité, évaluation de l'état des écosystèmes, planification de la remise en état des sols.",
    edge: "Télédétection combinée à des capteurs de terrain pour détecter tôt les signes de dégradation d'un écosystème.",
  },
];

export default function EnvironmentalSolutionsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
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
      <nav aria-label="Main Navigation" className="sticky top-0 z-50 border-b border-slate-800/70 bg-[#060a12] px-6 py-3.5 md:px-12">
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

          <ul className="hidden md:flex items-center gap-9 text-[13.5px] font-medium text-slate-400 m-0 p-0 list-none">
            <li><Link href="/" className="hover:text-slate-200 transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-slate-200 transition-colors">About</Link></li>

            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 pb-[18px] -mb-[14px] focus:outline-none transition-colors"
                aria-expanded={isOpen}
              >
                GeoSignal Institute
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
                <div className="absolute left-0 mt-4 w-56 rounded-lg border border-slate-800 bg-[#0b1329] p-1.5 shadow-xl z-50">
                  {NAV_DROPDOWN_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-md px-3.5 py-2 text-[13px] text-slate-400 transition-colors hover:bg-[#060a12] hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link href="/services" className="text-white border-b-2 border-cyan-500 pb-[18px] -mb-[14px]">
                Services
              </Link>
            </li>
            <li><Link href="/contact" className="hover:text-slate-200 transition-colors">Contact</Link></li>
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:inline-block rounded-md border border-slate-700 px-4 py-1.5 text-[13.5px] font-medium text-slate-200 hover:border-cyan-600 hover:text-white transition-colors"
            >
              Contact
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

        {mobileMenuOpen && (
          <div className="md:hidden mx-auto max-w-7xl mt-4 pb-2 border-t border-slate-800/70 pt-4">
            <ul className="flex flex-col gap-1 text-sm font-medium m-0 p-0 list-none">
              <li><Link href="/" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">About</Link></li>
              <li><Link href="/services" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-cyan-400 font-semibold">Services</Link></li>
              <li><Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">Contact</Link></li>
            </ul>
            <div className="mt-3 pt-3 border-t border-slate-800/70">
              <span className="block px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-cyan-500">GeoSignal Institute</span>
              {NAV_DROPDOWN_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-[13px] text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        className="relative border-b border-slate-800/70 px-6 pt-20 pb-24 md:px-12 md:pt-28 md:pb-32 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6, 10, 18, 0.85), rgba(6, 10, 18, 0.92)), url('/images/environmental-solutions-bg.jpg')",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)',
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-5">
              Environnement
            </p>
            <h1 className="text-[2.3rem] leading-[1.12] sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-5">
              Solutions environnementales
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10">
              On accompagne les projets sur l&apos;évaluation environnementale, la protection des
              écosystèmes et la gestion des ressources, en s&apos;appuyant sur des données de terrain
              et des méthodes géophysiques.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-md bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-500 transition-colors inline-block"
              >
                Discuter de votre projet
              </Link>
              <Link
                href="#sub-services"
                className="rounded-md border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-cyan-600 hover:text-white transition-colors inline-block"
              >
                Voir les domaines
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SUB-SERVICES */}
      <main id="sub-services" className="max-w-6xl mx-auto px-6 md:px-12 py-16 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SUB_SERVICES.map((service) => (
            <article
              key={service.title}
              className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold text-white mb-3">{service.title}</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{service.summary}</p>

                <div className="border-t border-slate-800/80 pt-5 space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">Ce qu&apos;on couvre</span>
                    <p className="text-xs sm:text-sm text-slate-400">{service.focus}</p>
                  </div>
                  <div className="space-y-1.5 pt-3 border-t border-slate-800/40">
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 block">Notre approche</span>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{service.edge}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/40">
                <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors">
                  En savoir plus <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/contact"
            className="inline-block rounded-md bg-cyan-600 hover:bg-cyan-500 px-8 py-3.5 text-sm font-semibold text-white transition-colors"
          >
            Nous contacter
          </Link>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-800/80 bg-[#030712] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">

            <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
              <h3 className="text-lg font-bold text-white tracking-wide">
                GeoSignal Analytics
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
                Géophysique et intelligence artificielle, au service de projets d&apos;exploration
                et d&apos;études environnementales.
              </p>

              <div className="pt-3 space-y-2">
                <label htmlFor="newsletter-email" className="block text-xs font-semibold text-white">
                  Actualités de recherche, sans spam
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
                    S&apos;inscrire
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-3 gap-6 text-xs sm:text-sm pt-2 lg:pt-0">
              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  Services
                </h4>
                <ul className="space-y-2.5 text-slate-400 list-none p-0 m-0">
                  <li><Link href="/services/advanced-geophysics-and-ai" className="hover:text-white transition-colors">Géophysique avancée</Link></li>
                  <li><Link href="/services/geoscience-and-exploration" className="hover:text-white transition-colors">Exploration</Link></li>
                  <li><Link href="/services/water-resources" className="hover:text-white transition-colors">Ressources en eau</Link></li>
                  <li><Link href="/services/mapping-gis-and-remote-sensing" className="hover:text-white transition-colors">SIG &amp; télédétection</Link></li>
                  <li><Link href="/services/environmental-solutions" className="hover:text-white transition-colors">Environnement</Link></li>
                  <li><Link href="/services/qhse" className="hover:text-white transition-colors">Conseil QHSE</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  Pages
                </h4>
                <ul className="space-y-2.5 text-slate-400 list-none p-0 m-0">
                  <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">À propos</Link></li>
                  <li><Link href="/institute" className="hover:text-white transition-colors">GeoSignal Institute</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  Réseaux
                </h4>
                <ul className="space-y-2.5 text-slate-400 list-none p-0 m-0">
                  <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
                  <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a></li>
                </ul>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-800/80 pt-6">
            <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-500 text-center md:flex-row md:text-left">
              <div className="bg-white rounded-md px-3 py-1.5 flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="GeoSignal Analytics"
                  width={120}
                  height={35}
                  className="h-8 w-auto object-contain"
                />
              </div>
              <p className="text-slate-500 m-0">
                Developed and designed by Dr. Innocent Oboué, PhD
              </p>
              <p className="text-slate-500 m-0">
                © {currentYear ?? 2026} GeoSignal Analytics — Tous droits réservés
              </p>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
