'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

interface NewsItem {
  id: number;
  date: string;
  title: string;
  desc: string;
  category: 'Institutional' | 'Research' | 'Partnership' | 'Education';
  readTime?: string;
}

const updatesData: NewsItem[] = [
  {
    id: 1,
    date: 'January 2026',
    title: 'Official Launch of GeoSignal Research Institute',
    desc: 'The GeoSignal Research Institute officially opens its research pipelines, focusing on computational geophysics, advanced subsurface imaging, and AI-driven signal processing workflows.',
    category: 'Institutional',
    readTime: '2 min read'
  },
  {
    id: 2,
    date: 'December 2025',
    title: 'New Research Directions in DAS & Seismic Processing',
    desc: 'Initiating technical efforts dedicated to Distributed Acoustic Sensing (DAS) array monitoring and multidimensional spatial anti-aliasing to address subsurface characterization challenges.',
    category: 'Research',
    readTime: '4 min read'
  },
  {
    id: 3,
    date: 'November 2025',
    title: 'International Academic Collaborations',
    desc: 'GeoSignal Research Institute strengthens scientific ties with academic and research institutions across Asia, Europe, Africa, and North America in GeoAI and environmental monitoring.',
    category: 'Partnership',
    readTime: '3 min read'
  },
  {
    id: 4,
    date: 'October 2025',
    title: 'Advanced Training & Mentorship Programs',
    desc: 'Applications open for research-oriented workshops and advanced courses covering machine learning applications in geoscience, wavefield reconstruction, and seismic processing.',
    category: 'Education',
    readTime: '3 min read'
  },
];

export default function InstituteNewsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermeture du menu si clic à l'extérieur ou Échap
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
    <div className="min-h-screen bg-[#070b12] text-slate-100 font-sans selection:bg-sky-500 selection:text-white flex flex-col antialiased relative">
      
      {/* Subtle Tech Grid Overlay */}
      <div 
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
      />

      {/* 1. NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#070b12]/85 px-6 py-4 backdrop-blur-xl md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
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
                    { label: 'News & Updates', href: '/institute/news' },
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
                        item.href === '/institute/news' ? 'bg-slate-800/80 text-sky-400 font-semibold' : 'text-slate-300'
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
    backgroundImage: `linear-gradient(180deg, rgba(5, 11, 20, 0.85) 0%, rgba(7, 11, 18, 0.98) 100%), url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1920&q=80')`,
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
      Announcements &amp; Scientific Progress
    </span>
    <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
      Institute <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">News</span>
    </h1>
    <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300 drop-shadow sm:text-lg">
      Stay informed on our latest research milestones, academic partnerships, computational releases, and institutional announcements.
    </p>
  </div>
</section>

      {/* 3. MAIN CONTENT CONTAINER */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-16 flex-1 w-full space-y-10">
        
        {/* BANNER HEADER */}
        <div className="flex items-center justify-between bg-slate-900/40 border border-slate-800/80 p-4 rounded-2xl shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky-500"></span>
            </span>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
              Latest Activity Feed
            </h2>
          </div>
          <span className="text-xs font-medium text-slate-400">
            {updatesData.length} Recent Updates
          </span>
        </div>

        {/* UPDATES CARDS */}
        <div className="space-y-6">
          {updatesData.map((item) => (
            <article 
              key={item.id} 
              className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 hover:border-slate-700 transition-all duration-300 shadow-xl backdrop-blur-md space-y-4 group"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-md">
                    {item.category}
                  </span>
                  {item.readTime && (
                    <span className="text-xs text-slate-400 font-medium">
                      • {item.readTime}
                    </span>
                  )}
                </div>
                <time className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {item.date}
                </time>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug group-hover:text-sky-300 transition-colors">
                {item.title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {item.desc}
              </p>
            </article>
          ))}
        </div>

        {/* BOTTOM ACTIONS */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/institute"
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 px-6 py-2.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white transition-all shadow-md backdrop-blur-md hover:scale-105"
          >
            ← Back to Institute Overview
          </Link>
          <Link
            href="/institute/training"
            className="inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-6 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 shadow-md shadow-sky-500/20 transition-all hover:scale-105"
          >
            Explore Training Programs ↗
          </Link>
        </div>

      </main>

      {/* 4. FOOTER */}
      <footer className="relative z-10 w-full border-t border-slate-800/80 bg-[#04070d] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl">
          {/* TOP GRID */}
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

            {/* NAVIGATION LINKS */}
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