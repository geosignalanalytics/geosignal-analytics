'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useMemo } from 'react';

interface EventItem {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
  status: 'Upcoming' | 'Past' | 'Registration Open';
  category: 'Webinar' | 'Workshop' | 'Seminar' | 'Conference';
  link?: string;
}

const eventsData: EventItem[] = [
  {
    id: 1,
    title: "International Webinar: AI Applications in Modern Geophysics",
    date: "To Be Announced (Q3 2026)",
    location: "Online / Zoom",
    description: "Join our researchers for a deep dive into deep learning workflows for seismic noise suppression, signal processing, and DAS array event location.",
    status: "Upcoming",
    category: "Webinar",
    link: "/institute/contact"
  },
  {
    id: 2,
    title: "Workshop: Distributed Acoustic Sensing (DAS) Data Processing",
    date: "TBA",
    location: "Hybrid / Abidjan & Online",
    description: "A hands-on technical workshop introducing practical python tools for spatial aliasing mitigation and DAS array noise reduction.",
    status: "Upcoming",
    category: "Workshop",
    link: "/institute/contact"
  }
];

export default function EventsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('All');
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

  const filteredEvents = useMemo(() => {
    if (filterStatus === 'All') return eventsData;
    return eventsData.filter(ev => ev.status === filterStatus);
  }, [filterStatus]);

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
                        item.href === '/institute/events' ? 'bg-slate-800/80 text-sky-400 font-semibold' : 'text-slate-300'
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
    backgroundImage: `linear-gradient(180deg, rgba(5, 11, 20, 0.85) 0%, rgba(7, 11, 18, 0.98) 100%), url('https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1920&q=80')`,
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
      Community &amp; Knowledge Exchange
    </span>
    <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
      Events &amp; <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Seminars</span>
    </h1>
    <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300 drop-shadow sm:text-lg">
      Workshops, webinars, and scientific gatherings hosted by GeoSignal Research Institute to foster academic exchange and industrial innovation.
    </p>
  </div>
</section>

      {/* 3. MAIN CONTENT CONTAINER */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-16 flex-1 w-full space-y-10">
        
        {/* CONTROL & FILTER BAR */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/40 border border-slate-800/80 p-4 rounded-2xl shadow-xl backdrop-blur-md">
          <div className="text-xs sm:text-sm font-semibold text-slate-300 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-sky-400"></span>
            Filter Events Status:
          </div>
          <div className="flex items-center gap-2">
            {['All', 'Upcoming', 'Past'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-xl border transition-all cursor-pointer ${
                  filterStatus === status
                    ? 'bg-sky-500 border-sky-400 text-slate-950 shadow-md shadow-sky-500/20 font-bold'
                    : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* EVENTS LIST */}
        <div className="space-y-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((ev) => (
              <article 
                key={ev.id} 
                className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 hover:border-slate-700 transition-all duration-300 shadow-xl backdrop-blur-md space-y-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-md">
                      {ev.status}
                    </span>
                    <span className="text-xs font-medium text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-md">
                      {ev.category}
                    </span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {ev.title}
                </h2>

                {/* Metadata: Location & Date */}
                <div className="text-xs sm:text-sm text-slate-300 flex flex-wrap items-center gap-4 font-medium pt-1">
                  <div className="flex items-center gap-1.5 text-sky-400">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{ev.location}</span>
                  </div>

                  <span className="text-slate-700 hidden sm:inline">•</span>

                  <div className="flex items-center gap-1.5 text-slate-300">
                    <svg className="h-4 w-4 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{ev.date}</span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {ev.description}
                </p>

                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <Link
                    href={ev.link || "/institute/contact"}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm text-sky-400 hover:text-sky-300 font-semibold transition group"
                  >
                    Register Interest / Inquire
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="text-center py-12 bg-slate-900/30 border border-slate-800 rounded-2xl backdrop-blur-md">
              <p className="text-slate-400 text-sm">
                No events found matching the selected status.
              </p>
            </div>
          )}
        </div>

        {/* INVITATION SPEAKERS / HOSTING */}
        <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 text-center space-y-4 shadow-xl backdrop-blur-md">
          <h3 className="text-xl font-bold text-white tracking-tight">
            Host a Seminar or Present Your Research
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            We regularly invite external researchers, postdocs, and industry experts to present their scientific breakthroughs. Get in touch with our team to schedule a webinar or joint workshop.
          </p>
          <div className="pt-2">
            <Link
              href="/institute/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-6 py-2.5 text-xs sm:text-sm font-semibold text-slate-950 shadow-md shadow-sky-500/20 transition-all hover:scale-105"
            >
              Propose a Presentation ↗
            </Link>
          </div>
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