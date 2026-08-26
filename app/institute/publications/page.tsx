'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useMemo } from 'react';

interface Publication {
  id: number;
  title: string;
  journal: string;
  year: string;
  type: 'Journal Article' | 'Conference Paper' | 'Preprint / Chapter';
  doi: string;
  abstract: string;
  authors: string[];
  topics: string[];
}

const publicationsData: Publication[] = [
  {
    id: 1,
    title: "Local Orthogonalization Methods for Seismic Data Denoising and Signal Preservation",
    journal: "Geophysics (SEG)",
    year: "2024",
    type: "Journal Article",
    doi: "https://doi.org/10.1190/geo2024-xxxx",
    abstract: "We propose local orthogonalization framework for multidimensional seismic data processing to effectively suppress random and coherent noise while preserving weak reflection events.",
    authors: ["Innocent Oboué", "Collaborators"],
    topics: ["Denoising", "Signal Processing", "Seismic"]
  },
  {
    id: 2,
    title: "Deep Learning Architectures for Distributed Acoustic Sensing (DAS) Event Detection",
    journal: "SEG Technical Program Expanded Abstracts",
    year: "2025",
    type: "Conference Paper",
    doi: "https://doi.org/10.1190/segam2025-xxxx",
    abstract: "This study explores physics-guided deep learning architectures for automated, real-time microseismic event detection and classification in continuous DAS streams.",
    authors: ["Innocent Oboué", "Collaborators"],
    topics: ["DAS", "Machine Learning", "Event Location"]
  },
  {
    id: 3,
    title: "Multidimensional Reconstruction and Aliasing Mitigation in Spatial Seismic Sampling",
    journal: "IEEE Transactions on Geoscience and Remote Sensing",
    year: "2023",
    type: "Journal Article",
    doi: "https://doi.org/10.1109/TGRS.2023.xxxx",
    abstract: "A non-uniform sampling theory application that resolves spatial aliasing issues in complex acquisition geometries through sparse inversion.",
    authors: ["Innocent Oboué", "Collaborators"],
    topics: ["Aliasing", "Sampling Theory", "Inversion"]
  },
  {
    id: 4,
    title: "Physics-Informed Neural Networks (PINNs) for Seismic Wavefield Modeling",
    journal: "EAGE Annual Conference & Exhibition",
    year: "2025",
    type: "Conference Paper",
    doi: "https://doi.org/10.3997/2214-4609.2025xxxx",
    abstract: "Integrating acoustic wave equation constraints into deep neural operators to accelerate forward modeling in heterogenous media.",
    authors: ["Innocent Oboué", "Collaborators"],
    topics: ["PINN", "Forward Modeling", "HPC"]
  }
];

export default function PublicationsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermeture du dropdown au clic extérieur ou Échap
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

  // Extraire la liste unique des années
  const availableYears = useMemo(() => {
    const years = publicationsData.map((p) => p.year);
    return ['All', ...Array.from(new Set(years)).sort((a, b) => Number(b) - Number(a))];
  }, []);

  // Filtrage dynamique des publications
  const filteredPublications = useMemo(() => {
    return publicationsData.filter((pub) => {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        pub.title.toLowerCase().includes(query) ||
        pub.journal.toLowerCase().includes(query) ||
        pub.abstract.toLowerCase().includes(query) ||
        pub.authors.some((a) => a.toLowerCase().includes(query)) ||
        pub.topics.some((t) => t.toLowerCase().includes(query));

      const matchesType = selectedType === 'All' || pub.type === selectedType;
      const matchesYear = selectedYear === 'All' || pub.year === selectedYear;

      return matchesSearch && matchesType && matchesYear;
    });
  }, [searchQuery, selectedType, selectedYear]);

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-200 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 relative flex flex-col">
      {/* Background Subtle Tech Grid */}
      <div 
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
      />

      {/* 1. EN-TÊTE NAVBAR */}
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
                        item.href === '/institute/publications' ? 'bg-slate-800/80 text-cyan-400 font-semibold' : 'text-slate-300'
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

      {/* HERO SECTION */}
      <section 
        className="relative overflow-hidden border-b border-slate-800 bg-[#050b14] py-24 px-6 text-center md:px-12 md:py-32"
        style={{ 
          backgroundImage: `linear-gradient(180deg, rgba(5, 11, 20, 0.8) 0%, rgba(5, 11, 20, 0.95) 100%), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      >
            {/* Effet d'onde géophysique en arrière-plan */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/10 animate-ping [animation-duration:4s]" />
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/5 animate-ping [animation-duration:6s] delay-1000" />
        </div>
        
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(56, 189, 248, 0.4) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative z-10 mx-auto max-w-4xl">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/30 rounded-full mb-6 tracking-wide shadow-inner">
            Academic Contributions
          </span>

          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl leading-tight tracking-tight drop-shadow-md mb-6">
            Publications &amp;<br />
            <span className="bg-gradient-to-r from-sky-400 via-blue-200 to-indigo-300 bg-clip-text text-transparent">
              Peer-Reviewed Work
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal max-w-2xl mx-auto leading-relaxed drop-shadow">
            Explore scientific contributions, journal papers, and conference abstracts generated by GeoSignal Institute researchers.
          </p>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-b border-slate-800/80 bg-slate-900/30 py-5 px-6 backdrop-blur-md">
        <div className="mx-auto max-w-5xl flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-center text-xs sm:text-sm font-medium text-slate-300">
          <div className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-800/80 px-4 py-2 rounded-xl shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" />
            {publicationsData.length} Indexed Works
          </div>
          <div className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-800/80 px-4 py-2 rounded-xl shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
            Peer-Reviewed Open Access &amp; SEG/EAGE
          </div>
          <div className="flex items-center gap-2.5 bg-slate-900/80 border border-slate-800/80 px-4 py-2 rounded-xl shadow-sm">
            <span className="h-2.5 w-2.5 rounded-full bg-indigo-400 shadow-sm shadow-indigo-400/50" />
            Reproducible Research Code Included
          </div>
        </div>
      </section>

      {/* MAIN CONTENT CONTAINER */}
      <main className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:px-12 flex-1 w-full space-y-10">
        
        {/* BARRE DE RECHERCHE ET FILTRES */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl shadow-xl backdrop-blur-md">
          
          {/* Champ de recherche */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search title, author, keyword, or journal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-800 bg-[#050b14] pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
            />
            <svg 
              className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Boutons Filtres Type & Année */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Type selector */}
            <div className="flex items-center gap-1.5 bg-[#050b14] border border-slate-800 p-1 rounded-xl overflow-x-auto">
              {['All', 'Journal Article', 'Conference Paper'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`shrink-0 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedType === type
                      ? 'bg-cyan-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Year Dropdown */}
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="rounded-xl border border-slate-800 bg-[#050b14] px-3.5 py-2 text-xs font-semibold text-slate-300 focus:border-cyan-500 focus:outline-none cursor-pointer"
            >
              {availableYears.map((yr) => (
                <option key={yr} value={yr} className="bg-[#0c121e] text-white">
                  {yr === 'All' ? 'All Years' : yr}
                </option>
              ))}
            </select>

          </div>

        </div>

        {/* LISTE DES PUBLICATIONS */}
        <div className="space-y-6">
          {filteredPublications.length > 0 ? (
            filteredPublications.map((pub) => (
              <article
                key={pub.id}
                className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/30 p-6 sm:p-8 transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/60 shadow-lg space-y-5"
              >
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-lg">
                      {pub.type}
                    </span>
                    <span className="text-xs font-mono font-semibold text-slate-400 bg-[#050b14] border border-slate-800 px-3 py-1 rounded-lg">
                      {pub.year}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {pub.topics.map((topic, i) => (
                      <span key={i} className="text-[11px] font-mono text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700/50">
                        #{topic}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug tracking-tight">
                  {pub.title}
                </h2>

                <p className="text-xs sm:text-sm font-semibold text-sky-400/90 tracking-wide">
                  {pub.journal}
                </p>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {pub.abstract}
                </p>

                <div className="pt-4 border-t border-slate-800/60 flex flex-wrap justify-between items-center gap-4">
                  {pub.authors && pub.authors.length > 0 && (
                    <span className="text-xs text-slate-400">
                      Authors: <strong className="text-slate-200">{pub.authors.join(', ')}</strong>
                    </span>
                  )}
                  <a
                    href={pub.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono font-semibold text-cyan-400 hover:text-cyan-300 transition-colors group/link ml-auto"
                  >
                    View DOI / Publication 
                    <svg className="h-4 w-4 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-16 bg-slate-900/20 border border-slate-800/80 rounded-2xl space-y-3">
              <p className="text-slate-300 font-medium text-base">
                No publications match your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('All');
                  setSelectedYear('All');
                }}
                className="text-xs text-cyan-400 hover:underline cursor-pointer font-semibold"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

      </main>

      {/* 2. PIED DE PAGE FOOTER */}
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