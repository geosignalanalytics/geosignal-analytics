'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function ResearchArea2Page() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le menu déroulant si on clique en dehors ou sur Échap
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
    <div className="min-h-screen bg-[#070b12] text-slate-100 font-sans selection:bg-sky-500 selection:text-white flex flex-col antialiased relative">
      
      {/* Subtle Tech Grid Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
      />

      {/* 1. NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#070b12]/85 px-6 py-4 backdrop-blur-xl md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            {/* LOGO GEOSIGNAL INSTITUTE */}
            <div className="flex items-center rounded-lg bg-white px-3 py-1.5 shadow-sm ring-1 ring-white/20 transition-all group-hover:scale-105">
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

          <ul className="hidden md:flex items-center gap-8 font-medium text-slate-300 text-sm md:text-base m-0 p-0 list-none">
            <li>
              <Link href="/" className="transition-colors hover:text-sky-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition-colors hover:text-sky-400">
                About
              </Link>
            </li>

            {/* MENU DÉROULANT GEOSIGNAL INSTITUTE */}
            <li className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="flex items-center gap-1.5 text-white font-semibold transition-colors hover:text-sky-400 focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                GeoSignal Institute 
                <svg 
                  className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-sky-400' : 'text-slate-400'}`} 
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
                    { label: 'Software & Open Source', href: '/institute/software' },
                    { label: 'Careers & Opportunities', href: '/institute/careers' },
                    { label: 'Blog', href: '/institute/blog' },
                    { label: 'Contact', href: '/institute/contact' },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-xl px-4 py-2.5 text-xs sm:text-sm transition-all hover:bg-slate-800/70 hover:text-sky-300 hover:translate-x-1 ${
                        item.href === '/institute/research' ? 'bg-slate-800/80 text-sky-400 font-semibold' : 'text-slate-300'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link href="/services" className="transition-colors hover:text-sky-400">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-sky-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
<section 
  className="relative overflow-hidden border-b border-slate-800/80 bg-[#050b14] px-6 py-20 text-center md:px-12 md:py-28"
  style={{ 
    backgroundImage: `linear-gradient(180deg, rgba(5, 11, 20, 0.82) 0%, rgba(7, 11, 18, 0.98) 100%), url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=80')`,
    backgroundPosition: 'center',
    backgroundSize: 'cover'
  }}
>
      {/* Effet d'onde géophysique en arrière-plan */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/10 animate-ping [animation-duration:4s]" />
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/5 animate-ping [animation-duration:6s] delay-1000" />
        </div>

  <div className="relative z-10 mx-auto max-w-4xl">
    {/* Badge Cyan */}
    <span className="mb-6 inline-block rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-md">
      Research Area 2
    </span>

    {/* Titre avec Dégradé Cyan -> Sky -> Indigo */}
    <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
      Mineral &amp;<br />
      <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
        AI-Enhanced Exploration
      </span>
    </h1>

    <p className="mx-auto mb-8 max-w-2xl text-base font-normal leading-relaxed text-slate-300 drop-shadow sm:text-lg">
      Driving the technological modernization of mineral prospecting by optimizing resource detection through physics-guided AI architectures and multi-method data integration.
    </p>

    <div className="flex flex-wrap items-center justify-center gap-4">
      {/* Bouton Principal Cyan / Sky */}
      <Link 
        href="/institute/publications" 
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:from-cyan-400 hover:to-sky-400 hover:scale-105"
      >
        Related Publications
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </Link>

      {/* Bouton Secondaire */}
      <Link 
        href="/institute/research" 
        className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3 text-sm font-semibold text-slate-300 transition-all hover:bg-slate-800 hover:text-white"
      >
        ← All Research Areas
      </Link>
    </div>
  </div>
</section>

      {/* 3. MAIN CONTENT CONTAINER */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-16 flex-1 w-full space-y-12">
        
        {/* OVERVIEW CARD */}
        <article className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-10 shadow-xl backdrop-blur-md space-y-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 shadow-inner">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <span className="text-xs font-mono text-sky-400 uppercase tracking-widest font-semibold">Department Pillar</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Core Focus &amp; Scope
              </h2>
            </div>
          </div>

          <div className="space-y-4 pt-2 text-slate-300 text-base sm:text-lg leading-relaxed">
            <p>
              <strong className="text-sky-400 font-semibold">Focus:</strong> Drives the technological modernization of mineral prospecting. By fusing physical geoscience constraints with deep learning interpretation models, this research area enhances the accuracy of sub-surface resource targeting while minimizing environmental footprint and field exploration risks.
            </p>
            <p className="border-t border-slate-800/80 pt-4">
              <strong className="text-white font-semibold">Scope:</strong> Physics-guided AI architectures, joint inversion of multi-method geophysics (magnetometry, gravimetry, airborne EM, and induced polarization), and automated structural mapping for complex or remote mineralized terrains.
            </p>
          </div>
        </article>

        {/* DETAILED RESEARCH PILLARS GRID */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-400"></span>
            Key Research Pillars
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition-colors space-y-3">
              <span className="text-xs font-mono text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-md">
                Pillar 01
              </span>
              <h4 className="text-lg font-bold text-white">Multi-Method Joint Inversion</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Combining gravity, magnetic, airborne EM, and electrical resistivity datasets into unified, high-resolution 3D subsurface physical property models to reduce exploration ambiguity.
              </p>
            </div>

            <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition-colors space-y-3">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">
                Pillar 02
              </span>
              <h4 className="text-lg font-bold text-white">Physics-Guided Target Identification</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Applying deep machine learning models constrained by petrophysical relationships to automatically flag high-probability mineralization targets in massive regional datasets.
              </p>
            </div>

            <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition-colors space-y-3">
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-md">
                Pillar 03
              </span>
              <h4 className="text-lg font-bold text-white">Structural &amp; Geological Lineament Mapping</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Utilizing computer vision and spatial edge-detection on satellite and airborne geophysical grids to extract fault networks, shear zones, and structural conduits.
              </p>
            </div>

            <div className="bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 hover:border-slate-700 transition-colors space-y-3">
              <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md">
                Pillar 04
              </span>
              <h4 className="text-lg font-bold text-white">Remote &amp; Deep Target Prospecting</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Pioneering signal enhancement and noise suppression techniques to identify deeply buried or covered mineral reserves in challenging and under-explored terrains.
              </p>
            </div>

          </div>
        </div>

        {/* INQUIRIES & COLLABORATION BOX */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl backdrop-blur-md">
          <h3 className="text-xl font-bold text-white mb-4">Collaborate on Mineral Exploration Research</h3>
          <ul className="space-y-4 text-slate-300 text-sm sm:text-base">
            <li className="flex items-start gap-3">
              <span className="text-sky-400 font-bold text-lg leading-none">•</span>
              <div>
                <strong className="text-white font-semibold">Research &amp; Exploration Inquiries: </strong>
                For inquiries regarding multi-method joint inversion (gravity, mag, IP), physics-guided AI architectures, or structural target identification in complex terrains.
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-sky-400 font-bold text-lg leading-none">•</span>
              <div>
                <strong className="text-white font-semibold">Training &amp; Industrial Partnerships: </strong>
                To explore joint ventures, industrial mineral exploration partnerships, or technical workshops on AI-driven prospecting methods.
              </div>
            </li>
          </ul>

          {/* CTA BUTTON */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono text-slate-400">Ready to initiate an exploration partnership?</span>
            <Link 
              href="/institute/contact" 
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-6 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 transition-all shadow-md shadow-sky-500/20"
            >
              Send an Exploration Inquiry ↗
            </Link>
          </div>
        </div>

      </main>

      {/* 4. FOOTER */}
      <footer className="relative z-10 w-full border-t border-slate-800/80 bg-[#04070d] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl">
          {/* GRILLE TOP */}
          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">
            
            {/* BRAND & NEWSLETTER */}
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
                    className="w-full rounded-lg border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none transition-colors"
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

            {/* LINKS COLUMNS */}
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
                  Socials &amp; Academic
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

          {/* BOTTOM BAR */}
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