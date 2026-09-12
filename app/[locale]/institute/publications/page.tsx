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

const DROPDOWN_LINKS = [
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

export default function PublicationsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
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

  const availableYears = useMemo(() => {
    const years = publicationsData.map((p) => p.year);
    return ['All', ...Array.from(new Set(years)).sort((a, b) => Number(b) - Number(a))];
  }, []);

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
    <div className="min-h-screen bg-[#060a12] text-slate-200 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col">

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/70 bg-[#060a12] px-6 py-3.5 md:px-12">
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
                className="flex items-center gap-1.5 text-white border-b-2 border-cyan-500 pb-[18px] -mb-[14px] focus:outline-none"
                aria-expanded={isOpen}
                aria-haspopup="true"
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
                  {DROPDOWN_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-md px-3.5 py-2 text-[13px] transition-colors hover:bg-[#060a12] hover:text-white ${
                        item.href === '/institute/publications' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li><Link href="/services" className="hover:text-slate-200 transition-colors">Services</Link></li>
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="hidden sm:flex items-center rounded-md border border-slate-700 text-[11px] font-semibold overflow-hidden"
              aria-label="Switch language"
            >
              <span className={`px-2.5 py-1.5 transition-colors ${lang === 'en' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>EN</span>
              <span className={`px-2.5 py-1.5 transition-colors ${lang === 'fr' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>FR</span>
            </button>

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
              <li><Link href="/services" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">Contact</Link></li>
            </ul>
            <div className="mt-3 pt-3 border-t border-slate-800/70">
              <span className="block px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-cyan-500">GeoSignal Institute</span>
              {DROPDOWN_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-md px-3 py-2 text-[13px] hover:bg-[#0b1329] hover:text-white transition-colors ${
                    item.href === '/institute/publications' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-4 px-3 sm:hidden">
              <span className="text-xs text-slate-500">Language</span>
              <button
                onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
                className="flex items-center rounded-md border border-slate-700 text-[11px] font-semibold overflow-hidden"
              >
                <span className={`px-2.5 py-1 transition-colors ${lang === 'en' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>EN</span>
                <span className={`px-2.5 py-1 transition-colors ${lang === 'fr' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>FR</span>
              </button>
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
              Academic contributions
            </p>
            <h1 className="text-[2.3rem] leading-[1.12] sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-7">
              Publications
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Journal papers and conference work from the Institute's researchers, mostly on seismic
              processing, DAS, and physics-informed methods.
            </p>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-b border-slate-800/70 bg-[#0b1329]/50 py-4 px-6">
        <div className="mx-auto max-w-5xl flex flex-wrap justify-center items-center gap-3 sm:gap-6 text-xs sm:text-sm text-slate-400">
          <span>{publicationsData.length} indexed works</span>
          <span className="text-slate-700">•</span>
          <span>Peer-reviewed, SEG / EAGE</span>
          <span className="text-slate-700">•</span>
          <span>Code included where possible</span>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:px-12 flex-1 w-full space-y-10">

        {/* SEARCH & FILTERS */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-[#0b1329] border border-slate-800/80 p-5 rounded-xl">

          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search title, author, keyword, or journal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md border border-slate-800 bg-[#060a12] pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
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

          <div className="flex flex-wrap items-center gap-3">

            <div className="flex items-center gap-1.5 bg-[#060a12] border border-slate-800 p-1 rounded-md overflow-x-auto">
              {['All', 'Journal Article', 'Conference Paper'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`shrink-0 px-3 py-1.5 text-xs font-semibold rounded transition-colors cursor-pointer ${
                    selectedType === type
                      ? 'bg-cyan-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="rounded-md border border-slate-800 bg-[#060a12] px-3.5 py-2 text-xs font-semibold text-slate-300 focus:border-cyan-500 focus:outline-none cursor-pointer"
            >
              {availableYears.map((yr) => (
                <option key={yr} value={yr} className="bg-[#0b1329] text-white">
                  {yr === 'All' ? 'All Years' : yr}
                </option>
              ))}
            </select>

          </div>

        </div>

        {/* PUBLICATIONS LIST */}
        <div className="space-y-6">
          {filteredPublications.length > 0 ? (
            filteredPublications.map((pub) => (
              <article
                key={pub.id}
                className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-6 sm:p-8 space-y-5"
              >
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-md">
                      {pub.type}
                    </span>
                    <span className="text-xs font-mono text-slate-500 bg-[#060a12] border border-slate-800 px-3 py-1 rounded-md">
                      {pub.year}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {pub.topics.map((topic, i) => (
                      <span key={i} className="text-[11px] font-mono text-slate-500 bg-[#060a12] px-2 py-0.5 rounded border border-slate-800">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight">
                  {pub.title}
                </h2>

                <p className="text-xs sm:text-sm font-semibold text-cyan-500">
                  {pub.journal}
                </p>

                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  {pub.abstract}
                </p>

                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap justify-between items-center gap-4">
                  {pub.authors && pub.authors.length > 0 && (
                    <span className="text-xs text-slate-500">
                      {pub.authors.join(', ')}
                    </span>
                  )}
                  <a
                    href={pub.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-colors ml-auto"
                  >
                    View DOI / publication
                  </a>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-16 bg-[#0b1329] border border-slate-800/80 rounded-xl space-y-3">
              <p className="text-slate-400 text-base">
                No publications match your criteria.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedType('All');
                  setSelectedYear('All');
                }}
                className="text-xs text-cyan-500 hover:text-cyan-400 cursor-pointer font-semibold"
              >
                Reset filters
              </button>
            </div>
          )}
        </div>

      </main>

      {/* FOOTER */}
      <footer className="relative z-10 w-full border-t border-slate-800/80 bg-[#030712] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">

            <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
              <h3 className="text-lg font-bold text-white tracking-wide">
                GeoSignal Institute
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
                The research and publications arm of GeoSignal Analytics.
              </p>

              <div className="pt-3 space-y-2">
                <span className="block text-xs font-semibold text-white">
                  Occasional research updates, no spam
                </span>
                <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
                  <input
                    type="email"
                    placeholder="name@email.com"
                    className="w-full rounded-md border border-slate-800 bg-[#0b1329]/70 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-md bg-[#1e293b] hover:bg-[#283853] px-4 py-2 text-xs font-medium text-white border border-slate-700 transition-colors cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-3 gap-6 text-xs sm:text-sm">
              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">Links</h4>
                <ul className="space-y-2.5 text-slate-400">
                  <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                  <li><Link href="/institute/about" className="hover:text-white transition-colors">The Institute Approach</Link></li>
                  <li><Link href="/institute/publications" className="hover:text-white transition-colors">Publications</Link></li>
                  <li><Link href="/institute/training" className="hover:text-white transition-colors">Training</Link></li>
                  <li><Link href="/institute/software" className="hover:text-white transition-colors">Open Source</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">Pages</h4>
                <ul className="space-y-2.5 text-slate-400">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/institute" className="hover:text-white transition-colors">Overview</Link></li>
                  <li><Link href="/institute/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/institute/careers" className="hover:text-white transition-colors">Careers</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">Socials &amp; Academic</h4>
                <ul className="space-y-2.5 text-slate-400">
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
            <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-500 text-center md:flex-row md:text-left">
              <div className="bg-white rounded-md px-3 py-1.5 flex items-center justify-center">
                <Image
                  src="/images/logo-institute.jpeg"
                  alt="GeoSignal Institute"
                  width={110}
                  height={30}
                  className="h-7 w-auto object-contain"
                />
              </div>
              <p className="text-slate-500">
                © {new Date().getFullYear()} GeoSignal Institute — All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
