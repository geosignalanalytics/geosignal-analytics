'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const MENU_ITEMS = [
  { label: 'Overview', href: '/institute' },
  { label: 'About Us', href: '/institute/about' },
  { label: 'Research', href: '/institute/research' },
  { label: 'Publications', href: '/institute/publications' },
  { label: 'Training', href: '/institute/training' },
  { label: 'People', href: '/institute/people' },
  { label: 'Events & Seminars', href: '/institute/events' },
  { label: 'News & Updates', href: '/institute/news' },
  { label: 'Software & Open Source', href: '/institute/software' },
  { label: 'Careers & Opportunities', href: '/institute/careers' },
  { label: 'Blog', href: '/institute/blog' },
  { label: 'Contact', href: '/institute/contact' },
];

const RESEARCH_AREAS = [
  {
    id: 'research-area-1',
    title: 'Computational & Physics-Informed Geophysics',
    desc: 'Merging physical laws with deep learning to create interpretable subsurface models via PINNs and advanced numerical algorithms.',
    href: '/institute/research/research-area-1',
  },
  {
    id: 'research-area-2',
    title: 'Mineral & AI-Enhanced Exploration',
    desc: 'Optimizing mineral prospecting with physics-guided AI, integrating magnetometry, gravimetry, and induced polarization.',
    href: '/institute/research/research-area-2',
  },
  {
    id: 'research-area-3',
    title: 'Seismic Imaging & Physics-Based Monitoring',
    desc: 'Mapping subsurface structures using active/passive seismic data through high-resolution inversion and automated hazard forecasting.',
    href: '/institute/research/research-area-3',
  },
  {
    id: 'research-area-4',
    title: 'Subsurface & Environmental Characterization',
    desc: 'Applying geophysical rigor to environmental engineering challenges, groundwater exploration, and near-surface safety.',
    href: '/institute/research/research-area-4',
  },
];

export default function InstitutePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div className="min-h-screen bg-[#040711] text-slate-200 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 relative">
      {/* Background Grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      {/* EN-TÊTE DE NAVIGATION */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#040711]/80 px-6 py-4 backdrop-blur-xl md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center rounded-lg bg-white/95 px-3 py-1.5 shadow-sm ring-1 ring-white/20 transition-all group-hover:bg-white group-hover:shadow-md">
              <Image 
                src="/images/logo-institute.jpeg" 
                alt="GeoSignal Institute Logo" 
                width={140} 
                height={40} 
                className="h-7 w-auto object-contain"
                priority
              />
            </div>
          </Link>
          
          {/* Menu Desktop */}
          <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <li>
              <Link href="/" className="transition-colors hover:text-cyan-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition-colors hover:text-cyan-400">
                About
              </Link>
            </li>

            {/* Menu Déroulant Institut */}
            <li className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="flex items-center gap-1.5 font-semibold text-white transition-colors hover:text-cyan-400 focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                GeoSignal Institute 
                <svg 
                  className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-800 bg-[#0c121e]/95 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  {MENU_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-300 transition-all hover:bg-slate-800/60 hover:text-cyan-300 hover:translate-x-1"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link href="/services" className="transition-colors hover:text-cyan-400">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-cyan-400">
                Contact
              </Link>
            </li>
          </ul>

          {/* Bouton Mobile Hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Menu Mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-800/80 space-y-3">
            <Link href="/" className="block text-slate-300 hover:text-cyan-400" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/about" className="block text-slate-300 hover:text-cyan-400" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <div className="pl-2 border-l border-slate-800 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">GeoSignal Institute</span>
              {MENU_ITEMS.map((item) => (
                <Link key={item.href} href={item.href} className="block text-xs text-slate-400 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
            <Link href="/services" className="block text-slate-300 hover:text-cyan-400" onClick={() => setMobileMenuOpen(false)}>Services</Link>
            <Link href="/contact" className="block text-slate-300 hover:text-cyan-400" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </div>
        )}
      </nav>

      {/* HERO SECTION - UNIFIÉE EN CYAN/BLEU */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-[#040711] py-32 px-6 text-center md:px-12 md:py-40">
        
        {/* Halo lumineux Cyan / Bleu */}
        <div 
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[650px] rounded-full bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-transparent blur-[120px]" 
        />

    {/* Effet d'onde géophysique en arrière-plan */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/10 animate-ping [animation-duration:4s]" />
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/5 animate-ping [animation-duration:6s] delay-1000" />
        </div>
        
        {/* Strates géologiques & Failles tectoniques */}
        <div className="absolute inset-0 opacity-30 pointer-events-none overflow-hidden">
          <svg className="w-full h-full text-slate-700" viewBox="0 0 1440 600" preserveAspectRatio="none" fill="none">
            <path d="M0,240 L250,210 L450,260 L700,220 L950,280 L1200,230 L1440,250 L1440,600 L0,600 Z" fill="url(#rock-layer-1)" />
            <path d="M0,380 L350,340 L600,410 L900,360 L1150,430 L1440,390 L1440,600 L0,600 Z" fill="url(#rock-layer-2)" />
            <line x1="450" y1="260" x2="400" y2="450" stroke="#06b6d4" strokeWidth="1" strokeDasharray="4 8" opacity="0.4" />
            <line x1="950" y1="280" x2="920" y2="500" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="4 8" opacity="0.4" />

            <defs>
              <linearGradient id="rock-layer-1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#040711" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="rock-layer-2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#040711" stopOpacity="1" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Signal sismique brut (Uniformisé Cyan/Bleu) */}
        <div className="absolute inset-0 opacity-40 pointer-events-none flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full text-cyan-500/20" viewBox="0 0 1200 400" preserveAspectRatio="none" fill="none">
            <path d="M0,180 L100,180 L150,150 L180,210 L210,120 L240,240 L270,160 L300,190 L350,180 L500,180 L550,140 L580,230 L620,80 L660,280 L700,150 L750,180 L1200,180" stroke="currentColor" strokeWidth="1.5" />
            <path d="M0,230 Q200,200 400,260 T800,210 T1200,240" stroke="#0ea5e9" strokeWidth="1" opacity="0.5" />
          </svg>
        </div>

        {/* Contenu principal */}
        <div className="relative z-10 mx-auto max-w-4xl">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 rounded-full mb-6 tracking-wide shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-md">
            GeoSignal Institute
          </span>

          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl leading-[1.15] tracking-tight mb-6">
            AI for Next-Generation<br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
              Geophysics & Earth Science
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed mb-10">
            Advancing subsurface imaging, signal processing, and environmental intelligence through physics-informed artificial intelligence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              href="/institute/research" 
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-8 py-3.5 font-semibold text-white transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] text-sm"
            >
              Explore Research
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link 
              href="/institute/about" 
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 px-7 py-3.5 font-medium text-slate-200 transition-all backdrop-blur-md text-sm"
            >
              About GSI
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-12">
        
        {/* OVERVIEW SECTION */}
        <section className="mb-24">
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 p-8 md:p-12 backdrop-blur-xl shadow-2xl">
            <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent" />
            
            <div className="max-w-3xl">
              <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">
                Institutional Overview
              </h2>
              <h3 className="text-2xl font-semibold text-white md:text-3xl mb-6">
                Bridging Earth Sciences and Artificial Intelligence
              </h3>
              
              <div className="space-y-4 text-slate-300 leading-relaxed text-base md:text-lg">
                <p>
                  The <strong className="text-white font-medium">GeoSignal Institute (GSI)</strong> operates as the academic and scientific division of <strong className="text-white font-medium">GeoSignal Analytics LLC</strong>.
                </p>
                <p>
                  We serve as an international platform for long-term scientific inquiry, peer-reviewed publications, and methodology transfer—ensuring advanced computational tools address critical real-world subsurface challenges.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CORE AREAS SECTION */}
        <section className="mb-24">
          <div className="mb-12 text-center md:text-left">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
              Our Pillars
            </h2>
            <p className="text-3xl font-semibold text-white md:text-4xl">
              Core Institutional Areas
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              { num: '01', title: 'Innovative Research', desc: 'Advancing geophysics, signal processing, and data-driven subsurface science through cutting-edge computational frameworks.' },
              { num: '02', title: 'Academic Excellence', desc: 'Fostering long-term scientific inquiry, high-impact publications, and worldwide academic collaborations.' },
              { num: '03', title: 'Methodological Rigor', desc: 'Establishing robust, reproducible methodologies and promoting responsible knowledge transfer.' },
              { num: '04', title: 'Global Impact', desc: 'Deploying advanced computational tools to address critical environmental and energy challenges.' },
            ].map((card, i) => (
              <div 
                key={i} 
                className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/30 p-8 transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-900/60 shadow-lg"
              >
                <span className="text-xs font-mono font-bold text-cyan-400 mb-4 block">
                  [{card.num}]
                </span>
                <h3 className="mb-3 text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link 
              href="/institute/about" 
              className="inline-flex items-center gap-2 rounded-xl bg-slate-800/80 border border-slate-700 px-6 py-3 text-sm font-medium text-slate-200 transition-all hover:bg-slate-700 hover:text-white"
            >
              Learn more about GSI
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </section>

        {/* RESEARCH AREAS SECTIONS */}
        <section className="mb-16">
          <div className="mb-12 text-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
              Focus Areas
            </h2>
            <p className="text-3xl font-semibold text-white md:text-4xl mb-4">
              Our Key Research Directions
            </p>
            <p className="mx-auto max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed">
              Applying state-of-the-art machine learning and physical modeling to solve complex Earth system problems.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {RESEARCH_AREAS.map((area) => (
              <div 
                key={area.id} 
                id={area.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/30 p-8 transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-900/60 shadow-lg scroll-mt-24"
              >
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {area.title}
                  </h3>
                  <p className="mb-6 text-slate-400 text-sm leading-relaxed">
                    {area.desc}
                  </p>
                </div>
                <Link 
                  href={area.href} 
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 transition-colors hover:text-cyan-300"
                >
                  Explore Area
                  <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/institute/research" 
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-7 py-3.5 text-sm font-semibold text-white transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]"
            >
              Explore All Research Programs
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </section>

      </main>

      {/* PIED DE PAGE */}
      <footer className="relative z-10 w-full border-t border-slate-800/80 bg-[#02040a] px-6 py-14 text-slate-400 text-sm md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">
            
            <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
              <h3 className="text-base font-semibold text-white tracking-wide">
                GeoSignal Institute
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                Bridging Earth Sciences and Artificial Intelligence through academic rigor and scientific excellence.
              </p>

              <div className="pt-3 space-y-2">
                <span className="block text-xs font-medium text-slate-300">
                  Join our newsletter
                </span>
                <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
                  <input
                    type="email"
                    placeholder="name@email.com"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-lg bg-cyan-600 hover:bg-cyan-500 px-4 py-2 text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-3 gap-6 text-xs sm:text-sm">
              <div>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Links
                </h4>
                <ul className="space-y-2 text-slate-400 text-xs">
                  <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                  <li><Link href="/institute/approach" className="hover:text-white transition-colors">The Institute Approach</Link></li>
                  <li><Link href="/institute/publications" className="hover:text-white transition-colors">Publications</Link></li>
                  <li><Link href="/institute/training" className="hover:text-white transition-colors">Training</Link></li>
                  <li><Link href="/institute/software" className="hover:text-white transition-colors">Open Source</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Pages
                </h4>
                <ul className="space-y-2 text-slate-400 text-xs">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/institute" className="hover:text-white transition-colors">Overview</Link></li>
                  <li><Link href="/institute/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/institute/careers" className="hover:text-white transition-colors">Careers</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Socials & Academic
                </h4>
                <ul className="space-y-2 text-slate-400 text-xs">
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
            <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-500 md:flex-row">
              <div className="flex items-center">
                <div className="rounded-md bg-white/90 px-2.5 py-1">
                  <Image 
                    src="/images/logo-institute.jpeg" 
                    alt="GeoSignal Institute Logo" 
                    width={110} 
                    height={30} 
                    className="h-6 w-auto object-contain"
                  />
                </div>
              </div>

              <div className="text-center md:text-left text-slate-400">
                Developed and designed by Dr. Innocent Oboué, PhD
              </div>

              <div className="text-center md:text-right text-slate-500">
                © {new Date().getFullYear()} GeoSignal Institute — All Rights Reserved
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}