'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const NAV_DROPDOWN_ITEMS = [
  { href: '/institute', label: 'Overview' },
  { href: '/institute/about', label: 'About Us' },
  { href: '/institute/research', label: 'Research' },
  { href: '/institute/publications', label: 'Publications' },
  { href: '/institute/training', label: 'Training' },
  { href: '/institute/people', label: 'People' },
  { href: '/institute/events', label: 'Events & Seminars' },
  { href: '/institute/news', label: 'News & Updates' },
  { href: '/institute/software', label: 'Software & Open Source' },
  { href: '/institute/careers', label: 'Careers & Opportunities' },
  { href: '/institute/blog', label: 'Blog' },
  { href: '/institute/contact', label: 'Contact' },
];

const services = [
  {
    id: 'subsurface-imaging',
    title: 'Imagerie du sous-sol assistée par IA',
    tagline: 'Traitement sismique et géophysique haute résolution',
    description:
      "On utilise des modèles de machine learning pour améliorer la résolution sismique, accélérer l'interprétation structurale et faire ressortir des détails géologiques difficiles à voir dans des jeux de données complexes.",
    features: [
      'Détection automatique de failles et horizons',
      'Inversion sismique assistée par IA',
      "Atténuation du bruit et amélioration du signal",
      'Modélisation structurale 3D/4D',
    ],
  },
  {
    id: 'das-processing',
    title: 'Traitement DAS et signal',
    tagline: 'Traitement avancé pour la détection acoustique distribuée',
    description:
      "On traite des flux continus et volumineux de données DAS (Distributed Acoustic Sensing) avec des algorithmes conçus sur mesure pour préserver l'intégrité du signal, filtrer le bruit ambiant et produire un suivi en temps réel.",
    features: [
      'Algorithmes de réduction de bruit sur mesure',
      'Interprétation acoustique en temps réel',
      'Optimisation de workflows à haut débit',
      "Applications fibre optique pour l'énergie et les infrastructures",
    ],
  },
  {
    id: 'resource-exploration',
    title: 'GeoAI pour l\u2019exploration de ressources',
    tagline: 'Évaluation de réservoirs d\u2019eau, minéraux et énergie',
    description:
      "Nos modèles prédictifs combinent données géophysiques multi-physiques, contraintes géologiques et imagerie satellite pour identifier des zones à fort potentiel et réduire le risque d'exploration.",
    features: [
      'Modélisation prédictive pour la cartographie des eaux souterraines',
      "Génération de cibles pour l'exploration minérale",
      'Fusion multi-données (sismique, gravité, magnétique, forage)',
      "Quantification de l'incertitude dans les estimations de ressources",
    ],
  },
  {
    id: 'custom-geoai',
    title: 'Développement GeoAI sur mesure',
    tagline: 'Pipelines de machine learning adaptés à vos données',
    description:
      "On construit des workflows GeoAI propres à vos jeux de données et à vos besoins opérationnels, intégrés directement dans votre stack logicielle existante.",
    features: [
      'Architectures PyTorch / TensorFlow sur mesure',
      'Classification automatique de caractéristiques géologiques',
      'Intégration avec vos plateformes SIG et géophysiques',
      "Déploiement cloud et edge à l'échelle",
    ],
  },
  {
    id: 'consulting-audit',
    title: 'Conseil géophysique et audit de risque',
    tagline: 'Expertise technique indépendante',
    description:
      "Revue indépendante de vos interprétations géophysiques, de la conception d'acquisitions et de vos implémentations de modèles IA, pour garantir la rigueur scientifique et limiter le risque d'exploration.",
    features: [
      "Revue par les pairs d'interprétations sismiques et géophysiques",
      "Audit de conception et de stratégie d'acquisition",
      'Évaluation du risque pour les décisions de forage',
      "Conseil stratégique sur l'adoption de la GeoAI",
    ],
  },
];

export default function ServicesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
                src="/images/logo-institute.jpeg"
                alt="GeoSignal Institute"
                width={140}
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
                <div className="absolute right-0 mt-4 w-60 rounded-lg border border-slate-800 bg-[#0b1329] p-1.5 shadow-xl z-50">
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
              Services
            </p>
            <h1 className="text-[2.3rem] leading-[1.12] sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-5">
              Services techniques et industriels
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10">
              Workflows GeoAI, traitement du signal sur mesure et imagerie du sous-sol,
              au service des opérations énergie, mines et hydrogéologie.
            </p>
            <Link
              href="/contact"
              className="rounded-md bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-500 transition-colors inline-block"
            >
              Demander un échange technique
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-6 md:px-12 py-16 flex-1 w-full space-y-6">

        {services.map((service) => (
          <article
            key={service.id}
            id={service.id}
            className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 md:p-10"
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              {service.title}
            </h2>
            <div className="text-sm font-semibold text-cyan-400 mb-4">
              {service.tagline}
            </div>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
              {service.description}
            </p>

            <div className="border-t border-slate-800/80 pt-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-4">
                Points clés
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0 m-0">
                {service.features.map((feature, idx) => (
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
        ))}

        {/* CALL TO ACTION */}
        <div className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 md:p-10 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Un besoin spécifique en GeoAI ?
          </h3>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
            Développement de modèle sur mesure, revue par un expert, ou traitement DAS spécialisé —
            parlons de votre projet.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-md bg-cyan-600 hover:bg-cyan-500 px-6 py-3 text-sm font-semibold text-white transition-colors"
          >
            Contacter l&apos;équipe
          </Link>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-800/80 bg-[#030712] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">

            <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
              <h3 className="text-lg font-bold text-white tracking-wide">
                GeoSignal Research Institute
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
                Le pôle recherche et publications de GeoSignal Analytics.
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
                  <li><Link href="#subsurface-imaging" className="hover:text-white transition-colors">Imagerie du sous-sol</Link></li>
                  <li><Link href="#das-processing" className="hover:text-white transition-colors">Traitement DAS</Link></li>
                  <li><Link href="#resource-exploration" className="hover:text-white transition-colors">Exploration de ressources</Link></li>
                  <li><Link href="#custom-geoai" className="hover:text-white transition-colors">GeoAI sur mesure</Link></li>
                  <li><Link href="#consulting-audit" className="hover:text-white transition-colors">Conseil &amp; audit</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  Pages
                </h4>
                <ul className="space-y-2.5 text-slate-400 list-none p-0 m-0">
                  <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                  <li><Link href="/institute" className="hover:text-white transition-colors">Vue d&apos;ensemble</Link></li>
                  <li><Link href="/institute/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/institute/careers" className="hover:text-white transition-colors">Carrières</Link></li>
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
                Developed and designed by Dr. Innocent Oboué, PhD
              </p>
              <p className="text-slate-500 m-0">
                © {currentYear ?? 2026} GeoSignal Research Institute — Tous droits réservés
              </p>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
