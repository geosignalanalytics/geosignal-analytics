'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function PeoplePage() {
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
                        item.href === '/institute/people' ? 'bg-slate-800/80 text-cyan-400 font-semibold' : 'text-slate-300'
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

{/* HERO SECTION - LEADERSHIP & TEAM */}
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
      Leadership &amp; Team
    </span>

    {/* Titre avec Dégradé Cyan -> Sky -> Indigo */}
    <h1 className="mb-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl">
      Our People &amp;<br />
      <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
        Scientific Leadership
      </span>
    </h1>

    <p className="mx-auto mb-10 max-w-2xl text-base font-normal leading-relaxed text-slate-400 sm:text-lg md:text-xl">
      Leadership, researchers, and global collaborators driving scientific excellence and computational innovation at GeoSignal Institute.
    </p>

    <div className="flex flex-wrap items-center justify-center gap-4">
      {/* Bouton Principal Cyan -> Sky */}
      <Link 
        href="/institute/research" 
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-8 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all hover:from-cyan-400 hover:to-sky-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.5)]"
      >
        Explore Research Areas
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>

      {/* Bouton Secondaire */}
      <Link 
        href="/institute/careers" 
        className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-7 py-3.5 text-sm font-medium text-slate-200 backdrop-blur-md transition-all hover:border-slate-600 hover:bg-slate-800/80"
      >
        Careers &amp; Open Positions
      </Link>
    </div>
  </div>
</section>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-12 flex-1 w-full space-y-24">
        
        {/* LEADERSHIP SECTION */}
        <section className="space-y-8">
          <div className="mb-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
              Institutional Leadership
            </h2>
            <p className="text-3xl font-semibold text-white md:text-4xl">
              Director's Profile
            </p>
          </div>
          
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 backdrop-blur-xl shadow-2xl grid grid-cols-1 lg:grid-cols-[360px_1fr]">
            <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-cyan-500 via-indigo-500 to-transparent" />

            {/* Photo & Identity */}
            <div className="flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800/80 bg-[#060c17]">
              <div className="relative h-80 sm:h-96 lg:h-full min-h-[340px] w-full bg-slate-800">
                <Image 
                  src="/images/dr-oboue.jpeg" 
                  alt="Dr. Innocent Oboué" 
                  fill
                  className="object-cover object-top transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6 bg-slate-900/80 border-t border-slate-800/80">
                <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded uppercase tracking-wider mb-2">
                  Founder &amp; Director
                </span>
                <h3 className="text-xl font-bold text-white mb-1">Dr. Innocent Oboué, PhD</h3>
                <p className="text-xs sm:text-sm text-cyan-400/90 font-medium">Director, GeoSignal Institute</p>
              </div>
            </div>

            {/* Biography Content */}
            <div className="p-8 sm:p-12 flex flex-col justify-center space-y-5 text-slate-300 text-base md:text-lg leading-relaxed">
              <p>
                Dr. Oboué is a computational geophysicist specializing in <strong className="text-white font-medium">geophysical signal processing, high-resolution imaging, and data-driven subsurface characterization</strong>. His research centers on the development of pioneering <strong className="text-white font-medium">physics-informed artificial intelligence (AI)</strong> frameworks to solve complex Earth science challenges.
              </p>
              <p>
                His methodologies address critical real-world applications including the precise localization of subsurface resources—ranging from groundwater and geothermal energy to minerals and energy systems—as well as seismic hazard monitoring and automated processing of Distributed Acoustic Sensing (DAS) data.
              </p>
              <p>
                Leveraging extensive international research experience and a proven track record in applied problem-solving, Dr. Oboué defines the scientific vision of the Institute. He leads its research strategy, academic publications, and global partnerships, effectively <strong className="text-white font-medium">bridging the gap between theoretical innovation and industrial application</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* ECOSYSTEM SECTION */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
              Collaborative Framework
            </h2>
            <p className="text-3xl font-semibold text-white md:text-4xl mb-4">
              Research Ecosystem
            </p>
            <p className="mx-auto max-w-2xl text-slate-400 text-sm sm:text-base leading-relaxed">
              Combining core institutional expertise with international academic and industrial research alliances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Core Research Members */}
            <div className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/30 p-8 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/60 shadow-lg flex flex-col justify-between space-y-6">
              <div>
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors mb-3">
                  Core Research Members
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Permanent and long-term researchers actively contributing to the Institute&apos;s core scientific programs, methodological advancements, and open-source software initiatives.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800/60">
                <span className="text-xs font-mono font-semibold text-cyan-400">
                  Focus: Methodological Innovation
                </span>
              </div>
            </div>

            {/* Affiliated Researchers & Collaborators */}
            <div className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/30 p-8 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/60 shadow-lg flex flex-col justify-between space-y-6">
              <div>
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors mb-3">
                  Affiliated Collaborators
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Strong international partnerships with leading academic institutions, laboratories, and industrial partners.
                </p>
                <ul className="space-y-2 text-xs text-slate-400 list-disc pl-4">
                  <li>Global academic research cooperation.</li>
                  <li>Co-authored peer-reviewed publications.</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-800/60">
                <span className="text-xs font-mono font-semibold text-cyan-400">
                  Focus: International Alliances
                </span>
              </div>
            </div>

            {/* Students & Early-Career Researchers */}
            <div className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/30 p-8 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/60 shadow-lg flex flex-col justify-between space-y-6">
              <div>
                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors mb-3">
                  Early-Career Fellows
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Dedicated mentorship and skill development for graduate students, PhD candidates, and postdoctoral fellows.
                </p>
                <ul className="space-y-2 text-xs text-slate-400 list-disc pl-4">
                  <li>Advanced computational training.</li>
                  <li>Direct supervision &amp; research guidance.</li>
                </ul>
              </div>
              <div className="pt-4 border-t border-slate-800/60">
                <span className="text-xs font-mono font-semibold text-cyan-400">
                  Focus: Talent Development
                </span>
              </div>
            </div>

          </div>

          {/* Eco Note */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-4 text-center text-xs sm:text-sm text-slate-400 italic max-w-2xl mx-auto">
            Note: The research directory is actively expanding as formal appointments and international research fellow positions are finalized.
          </div>

          {/* Call To Action */}
          <div className="text-center pt-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 rounded-xl bg-slate-800/80 border border-slate-700 px-6 py-3 text-sm font-medium text-slate-200 transition-all hover:bg-slate-700 hover:text-white"
            >
              Join Our Research Team
              <svg className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </section>

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