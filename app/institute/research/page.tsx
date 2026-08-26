'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function ResearchAreasPage() {
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="min-h-screen bg-[#070b12] text-slate-200 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 relative flex flex-col">
      {/* Background Subtle Tech Grid */}
      <div 
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
      />

      {/* 1. EN-TÊTE */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#070b12]/80 px-6 py-4 backdrop-blur-xl md:px-12">
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

          <ul className="flex items-center gap-8 text-sm font-medium text-slate-300">
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

            {/* MENU DÉROULANT INSTITUT */}
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
                  {[
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
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-xl px-4 py-2.5 text-xs sm:text-sm transition-all hover:bg-slate-800/60 hover:text-cyan-300 hover:translate-x-1 ${
                        item.href === '/institute/research' ? 'bg-slate-800/80 text-cyan-400 font-semibold' : 'text-slate-300'
                      }`}
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
        </div>
      </nav>

{/* HERO SECTION - STYLE ÉPURÉ, ONDE & IA GÉOPHYSIQUE */}
<section className="relative overflow-hidden border-b border-slate-800/80 bg-[#040711] px-6 py-24 text-center md:px-12 md:py-32">
  
  {/* 1. Halo lumineux en arrière-plan (Glow Gradient Cyan / Sky) */}
  <div 
    className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-cyan-500/15 via-sky-500/15 to-transparent blur-[120px]" 
  />

    {/* Effet d'onde géophysique en arrière-plan */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/10 animate-ping [animation-duration:4s]" />
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/5 animate-ping [animation-duration:6s] delay-1000" />
        </div>
        
  {/* 2. Représentation vectorielle : Onde sinusoïdale & Signal sismique */}
  <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-40">
    <svg 
      className="h-full w-full" 
      viewBox="0 0 1400 500" 
      preserveAspectRatio="none" 
      fill="none"
    >
      {/* Onde sinusoïdale fluide */}
      <path 
        d="M -100,280 C 300,360 500,160 900,280 C 1200,370 1400,210 1600,260" 
        stroke="url(#gradient-wave-1)" 
        strokeWidth="1.5" 
        opacity="0.8"
      />

      {/* Seconde couche d'onde parallèle */}
      <path 
        d="M -100,310 C 320,390 520,190 920,310 C 1220,400 1420,240 1600,290" 
        stroke="url(#gradient-wave-2)" 
        strokeWidth="1" 
        opacity="0.3"
      />

      {/* Sismogramme (Signal à pics - Cyan) */}
      <path 
        d="M 80,295 L 200,295 L 215,220 L 230,370 L 245,160 L 260,410 L 275,210 L 290,340 L 305,270 L 320,310 L 335,295 L 580,295" 
        stroke="#06b6d4" 
        strokeWidth="1.5" 
        opacity="0.6" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Axe vertical discret */}
      <line x1="260" y1="100" x2="260" y2="420" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.25" />

      {/* Dégradés pour les tracés SVG */}
      <defs>
        <linearGradient id="gradient-wave-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="gradient-wave-2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  </div>

  {/* 3. Contenu principal */}
  <div className="relative z-10 mx-auto max-w-4xl">
    {/* Badge Cyan */}
    <span className="mb-8 inline-block rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-md">
      Scientific Framework
    </span>

    {/* Titre avec Dégradé Cyan -> Sky -> Indigo */}
    <h1 className="mb-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl">
      Research Areas &amp;<br />
      <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
        Scientific Directions
      </span>
    </h1>

    <p className="mx-auto mb-10 max-w-2xl text-base font-normal leading-relaxed text-slate-400 sm:text-lg md:text-xl">
      Advancing computational geophysics through physics-guided artificial intelligence, high-resolution imaging, and multi-scale subsurface characterization.
    </p>

    <div className="flex flex-wrap items-center justify-center gap-4">
      {/* Bouton Principal Cyan -> Sky */}
      <Link 
        href="/institute/publications" 
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-8 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all hover:from-cyan-400 hover:to-sky-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.5)]"
      >
        Peer-Reviewed Publications
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>

      {/* Bouton Secondaire */}
      <Link 
        href="/institute/software" 
        className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-7 py-3.5 text-sm font-medium text-slate-200 backdrop-blur-md transition-all hover:border-slate-600 hover:bg-slate-800/80"
      >
        Open-Source Software
      </Link>
    </div>
  </div>
</section>

      {/* SUMMARY STATS BAR */}
      <section className="border-b border-slate-800/80 bg-slate-900/30 py-6 px-6 backdrop-blur-md">
        <div className="mx-auto max-w-5xl flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-center text-xs sm:text-sm font-medium text-slate-300">
          <div className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-800/80 px-4 py-2 rounded-xl shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" />
            4 Core Research Pillars
          </div>
          <div className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-800/80 px-4 py-2 rounded-xl shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
            30+ Peer-Reviewed Contributions
          </div>
          <div className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-800/80 px-4 py-2 rounded-xl shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-400 shadow-sm shadow-indigo-400/50" />
            Global Academic Alliances
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-12 flex-1 w-full space-y-20">
        
        {/* CARTE GRILLE DE RECHERCHE */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* CARTE 1 */}
          <article className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/30 p-8 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/60 shadow-lg flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                Computational &amp; Physics-Informed Geophysics
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                <strong className="text-cyan-400 font-semibold">Focus:</strong> Serves as the institute&apos;s foundational methodology department. It bridges fundamental physical laws with artificial intelligence to construct robust, interpretable, and predictive subsurface models.
              </p>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed border-t border-slate-800/60 pt-4">
                <strong className="text-slate-200 font-semibold">Scope:</strong> Development of Physics-Informed Neural Networks (PINNs), advanced multi-dimensional forward modeling, high-performance computing (HPC) deployment, and automated high-density dataset processing.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-800/60">
              <Link 
                href="/institute/research/research-area-1" 
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
              >
                Explore Methodologies <span className="transition-transform group-hover/link:translate-x-1">→</span>
              </Link>
            </div>
          </article>

          {/* CARTE 2 */}
          <article className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/30 p-8 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/60 shadow-lg flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                Mineral &amp; AI-Enhanced Exploration
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                <strong className="text-cyan-400 font-semibold">Focus:</strong> Drives the technological modernization of mineral prospecting. It optimizes resource detection by integrating physical geoscience constraints with AI-driven interpretation models.
              </p>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed border-t border-slate-800/60 pt-4">
                <strong className="text-slate-200 font-semibold">Scope:</strong> Physics-guided AI architectures, joint inversion of multi-method data (magnetometry, gravimetry, and induced polarization), and advanced structural mapping for complex or remote terrains.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-800/60">
              <Link 
                href="/institute/research/research-area-2" 
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
              >
                Explore Prospecting AI <span className="transition-transform group-hover/link:translate-x-1">→</span>
              </Link>
            </div>
          </article>

          {/* CARTE 3 */}
          <article className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/30 p-8 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/60 shadow-lg flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                Seismic Imaging &amp; Physics-Based Monitoring
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                <strong className="text-cyan-400 font-semibold">Focus:</strong> Focuses on structural dynamic imaging and risk management. It combines active and passive wave-propagation physics with computational inversion to monitor subsurface changes over time.
              </p>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed border-t border-slate-800/60 pt-4">
                <strong className="text-slate-200 font-semibold">Scope:</strong> High-resolution seismic inversion, active and passive data processing, physics-based wavefield simulation, and automated forecasting for geological and environmental hazards.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-800/60">
              <Link 
                href="/institute/research/research-area-3" 
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
              >
                Explore Imaging Models <span className="transition-transform group-hover/link:translate-x-1">→</span>
              </Link>
            </div>
          </article>

          {/* CARTE 4 */}
          <article className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/30 p-8 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/60 shadow-lg flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V11.414m-1.414-1.414A2 2 0 0016.586 9H15a2 2 0 01-2-2V5.5A2.5 2.5 0 0010.5 3h-.5a2.5 2.5 0 00-2.5 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors tracking-tight">
                Subsurface &amp; Environmental Characterization
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                <strong className="text-cyan-400 font-semibold">Focus:</strong> Applies rigorous geophysical and physical principles to near-surface engineering, environmental protection, and shallow-depth site investigations.
              </p>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed border-t border-slate-800/60 pt-4">
                <strong className="text-slate-200 font-semibold">Scope:</strong> Groundwater exploration, near-surface safety and geotechnical assessments, environmental hazard mitigation, and high-precision shallow-depth physical property mapping.
              </p>
            </div>
            <div className="pt-2 border-t border-slate-800/60">
              <Link 
                href="/institute/research/research-area-4" 
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link"
              >
                Explore Near-Surface Applications <span className="transition-transform group-hover/link:translate-x-1">→</span>
              </Link>
            </div>
          </article>

        </div>

        {/* INQUIRIES BOX & CALL TO ACTION */}
        <div className="relative rounded-3xl border border-slate-800 bg-slate-900/40 p-8 sm:p-12 shadow-2xl overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-cyan-500 via-indigo-500 to-transparent" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-8 text-center">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
                Academic &amp; Industrial Synergy
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Collaborate With Our Research Team
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="rounded-2xl border border-slate-800/80 bg-[#060c17] p-5 space-y-2">
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
                  Research Inquiries
                </span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  For technical questions regarding our methodologies, publications, or ongoing research themes (PINNs, DAS, Inversion).
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800/80 bg-[#060c17] p-5 space-y-2">
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block">
                  Training &amp; Workshops
                </span>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  Inquire about advanced technical courses, computational workshops, and customized professional development programs.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link 
                href="/institute/contact" 
                className="inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-8 py-3.5 font-semibold text-slate-950 transition-all shadow-lg shadow-sky-500/20 hover:shadow-sky-500/35"
              >
                Send a Research Inquiry
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

      </main>

      {/* 2. PIED DE PAGE */}
      <footer className="relative z-10 w-full border-t border-slate-800/80 bg-[#04070d] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
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
                    className="shrink-0 rounded-lg bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-medium text-white border border-slate-700 transition-colors cursor-pointer"
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
                  <li><Link href="/institute/about" className="hover:text-white transition-colors">The Institute Approach</Link></li>
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