'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useMemo, useId } from 'react';

interface Software {
  id: number;
  name: string;
  language: string;
  description: string;
  category: 'Signal Processing' | 'Distributed Sensing' | 'Inversion' | 'Modeling';
  github: string;
  version?: string;
  stars?: number;
}

interface DropdownItem {
  label: string;
  href: string;
}

const DROPDOWN_LINKS: DropdownItem[] = [
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

const softwareData: Software[] = [
  {
    id: 1,
    name: "SeisFilter-ML",
    language: "Python / MATLAB",
    category: "Signal Processing",
    description: "An open-source toolkit for seismic signal denoising using local orthogonalization, spatial aliasing mitigation, and deep neural network architectures.",
    github: "https://github.com",
    version: "v1.2.0"
  },
  {
    id: 2,
    name: "DAS-EventLocate",
    language: "Python",
    category: "Distributed Sensing",
    description: "Benchmark algorithms and pre-trained models for microseismic event detection and channel alignment in high-density Distributed Acoustic Sensing (DAS) arrays.",
    github: "https://github.com",
    version: "v0.8.4"
  },
  {
    id: 3,
    name: "PyGeoInvert",
    language: "Python / C++",
    category: "Inversion",
    description: "Physics-informed modular framework for joint inversion of electrical resistivity, gravimetry, and magnetic datasets with regularized spatial constraints.",
    github: "https://github.com",
    version: "v2.0.1"
  },
  {
    id: 4,
    name: "WaveField-Sim3D",
    language: "C++ / CUDA",
    category: "Modeling",
    description: "High-performance GPU-accelerated finite-difference solver for 3D elastic wave propagation in complex anisotropic media.",
    github: "https://github.com",
    version: "v1.1.0"
  }
];

export default function SoftwarePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Dynamic Accessibility ID for dropdown
  const dropdownId = useId();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside or Escape key
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

  // Combined filtering by category and search term
  const filteredSoftware = useMemo(() => {
    return softwareData.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.language.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categories = ['All', 'Signal Processing', 'Distributed Sensing', 'Inversion', 'Modeling'];

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 font-sans antialiased selection:bg-sky-500 selection:text-white relative flex flex-col">
      
      {/* Background Subtle Tech Grid */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
      />

      {/* ==================== NAVBAR ==================== */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#070b12]/85 px-6 py-4 backdrop-blur-xl md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg">
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
              <Link href="/" className="transition-colors hover:text-sky-400 focus:text-sky-400 focus:outline-none">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition-colors hover:text-sky-400 focus:text-sky-400 focus:outline-none">
                About
              </Link>
            </li>

            {/* MENU DÉROULANT GEOSIGNAL INSTITUTE */}
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex items-center gap-1.5 text-white font-semibold transition-colors hover:text-sky-400 focus:text-sky-400 focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
                aria-controls={dropdownId}
                aria-haspopup="true"
              >
                GeoSignal Institute 
                <svg 
                  className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-sky-400' : 'text-slate-400'}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div 
                  id={dropdownId}
                  className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-800 bg-[#0c121e]/95 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                >
                  {DROPDOWN_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-xl px-4 py-2.5 text-xs sm:text-sm transition-all hover:bg-slate-800/70 hover:text-sky-300 hover:translate-x-1 ${
                        item.href === '/institute/software' ? 'bg-slate-800/80 text-sky-400 font-semibold' : 'text-slate-300'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link href="/services" className="transition-colors hover:text-sky-400 focus:text-sky-400 focus:outline-none">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-sky-400 focus:text-sky-400 focus:outline-none">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

{/* ==================== HERO SECTION ==================== */}
<section 
  className="relative overflow-hidden border-b border-slate-800/80 bg-[#050b14] px-6 py-20 text-center md:px-12 md:py-28"
  style={{ 
    backgroundImage: `linear-gradient(180deg, rgba(5, 11, 20, 0.85) 0%, rgba(7, 11, 18, 0.98) 100%), url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1920&q=80')`,
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
    <span className="mb-6 inline-block rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-sky-400 shadow-inner">
      Open Science &amp; Reproducible Research
    </span>
    <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
      Software &amp; <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Open Source</span>
    </h1>
    <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300 drop-shadow sm:text-lg">
      Open-source toolkits, pre-trained computational models, and high-performance benchmark algorithms developed by GeoSignal Institute.
    </p>
  </div>
</section>

      {/* ==================== MAIN CONTENT ==================== */}
      <main id="main-content" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 flex-1 w-full space-y-10">
        
        {/* BARRE DE RECHERCHE ET FILTRES */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl shadow-xl backdrop-blur-md space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Barre de recherche */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search software or language..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-[#070b12] px-4 py-2.5 pl-10 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none transition-colors"
              />
              <svg className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Filtres par catégorie */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer focus:outline-none ${
                    selectedCategory === cat
                      ? 'bg-sky-500 border-sky-400 text-slate-950 font-bold shadow-md shadow-sky-500/20'
                      : 'bg-[#070b12] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* GRILLE DE LOGICIELS */}
        {filteredSoftware.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredSoftware.map((sw) => (
              <article 
                key={sw.id} 
                className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 hover:border-sky-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between backdrop-blur-md group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider bg-slate-800/60 border border-slate-700/50 px-2.5 py-1 rounded-md">
                      {sw.category}
                    </span>
                    <div className="flex items-center gap-2">
                      {sw.version && (
                        <span className="text-[11px] font-mono text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
                          {sw.version}
                        </span>
                      )}
                      <span className="text-xs font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-md">
                        {sw.language}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors duration-200 tracking-tight">
                    {sw.name}
                  </h2>
                  
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {sw.description}
                  </p>
                </div>

                <a
                  href={sw.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 text-xs sm:text-sm text-white bg-slate-800/90 hover:bg-sky-500 hover:text-slate-950 border border-slate-700/80 hover:border-sky-400 py-3 px-4 rounded-xl font-bold transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                  <span>GitHub Repository</span>
                  <span className="text-xs">↗</span>
                </a>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/40 border border-slate-800/80 rounded-2xl backdrop-blur-md">
            <p className="text-slate-400 text-xs sm:text-sm">
              No software repositories found matching your query.
            </p>
          </div>
        )}

        {/* CONTRIBUTIONS BOX */}
        <div className="bg-gradient-to-r from-sky-950/30 via-slate-900/50 to-slate-900/30 border border-slate-800/80 rounded-2xl p-8 text-center max-w-4xl mx-auto shadow-xl backdrop-blur-md space-y-4">
          <h3 className="text-xl font-bold text-white">
            Want to collaborate or contribute to our repositories?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Our codebase is open for community contributions, issue reporting, and academic benchmarking. We encourage reproducible research and open scientific collaboration.
          </p>
          <div className="pt-2">
            <Link
              href="/institute/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-6 py-2.5 text-xs sm:text-sm font-bold text-slate-950 transition-all shadow-lg shadow-sky-500/20 focus:outline-none focus:ring-2 focus:ring-sky-400"
            >
              Get in Touch with our Tech Team
            </Link>
          </div>
        </div>

      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="relative z-10 w-full border-t border-slate-800/80 bg-[#04070d] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl">
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
                <label htmlFor="newsletter-email-input" className="block text-xs font-medium text-slate-300">
                  Join our newsletter
                </label>
                <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
                  <input
                    id="newsletter-email-input"
                    type="email"
                    placeholder="name@email.com"
                    required
                    className="w-full rounded-lg border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-lg bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-medium text-white border border-slate-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* NAVIGATION LINKS */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-6 text-xs sm:text-sm">
              <div>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Links
                </h4>
                <ul className="space-y-2 text-slate-400 text-xs list-none p-0 m-0">
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
                <ul className="space-y-2 text-slate-400 text-xs list-none p-0 m-0">
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
                <ul className="space-y-2 text-slate-400 text-xs list-none p-0 m-0">
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