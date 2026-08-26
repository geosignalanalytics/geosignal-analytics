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

const TRAINING_PROGRAMS = [
  {
    title: 'Computational Geophysics',
    focus: 'Numerical modeling, inversion theory, and high-performance computing.',
    target: 'Graduate Students / Researchers',
    href: '/institute/training/computational-geophysics',
    badge: 'Core Program',
  },
  {
    title: 'Signal Processing for Geophysical Applications',
    focus: 'Seismic and DAS signal enhancement, filtering, and time-frequency methods.',
    target: 'Graduate Students / Researchers / Industry Professionals',
    href: '/institute/training/signal-processing',
    badge: 'Advanced',
  },
  {
    title: 'Machine Learning in Seismic Processing',
    focus: 'Data-driven denoising, deep learning architectures, and physics-informed models.',
    target: 'Graduate Students / Researchers / Industry Professionals',
    href: '/institute/training/machine-learning',
    badge: 'Featured',
  },
  {
    title: 'DAS Data Analysis & Interpretation',
    focus: 'Distributed Acoustic Sensing physics, noise sources, and microseismic applications.',
    target: 'Researchers / Engineers / Field Practitioners',
    href: '/institute/training/das-data-analysis',
    badge: 'Specialized',
  },
  {
    title: 'Applied GeoAI for Subsurface Imaging',
    focus: 'AI-driven structural interpretation, fault tracking, and uncertainty quantification.',
    target: 'Graduate Students / Researchers / Geophysics Professionals',
    href: '/institute/training/geoai-subsurface-imaging',
    badge: 'Applied AI',
  },
];

export default function TrainingPage() {
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
    <div className="min-h-screen bg-[#040711] text-slate-200 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col relative">
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
                      className={`block rounded-xl px-4 py-2.5 text-xs sm:text-sm transition-all hover:bg-slate-800/60 hover:text-cyan-300 hover:translate-x-1 ${
                        item.href === '/institute/training' ? 'bg-slate-800/80 text-cyan-400 font-semibold' : 'text-slate-300'
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

      {/* HERO SECTION */}
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
        
        {/* Motif SVG Sismique & Ondes */}
        <div className="absolute inset-0 opacity-30 pointer-events-none flex items-center justify-center overflow-hidden">
          <svg className="w-full h-full text-cyan-500/20" viewBox="0 0 1200 400" preserveAspectRatio="none" fill="none">
            <path d="M0,200 C300,280 500,80 900,200 C1200,290 1400,130 1600,180" stroke="#0ea5e9" strokeWidth="1.5" opacity="0.6" />
            <path d="M0,230 Q200,200 400,260 T800,210 T1200,240" stroke="#06b6d4" strokeWidth="1" opacity="0.4" />
            <path d="M80,200 L200,200 L215,130 L230,280 L245,70 L260,320 L275,120 L290,250 L305,180 L320,210 L335,200 L580,200" stroke="#38bdf8" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Contenu principal Hero */}
        <div className="relative z-10 mx-auto max-w-4xl">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 rounded-full mb-6 tracking-wide shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-md">
            GSI Education &amp; Capacity Building
          </span>

          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl leading-[1.15] tracking-tight mb-6">
            Training &amp;<br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400 bg-clip-text text-transparent">
              Professional Development
            </span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg md:text-xl font-normal max-w-3xl mx-auto leading-relaxed mb-10">
            Advanced, research-driven programs for the next generation of geophysicists. The GeoSignal Institute offers high-level training designed to bridge theoretical foundations with modern computational expertise.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-8 py-3.5 font-semibold text-white transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] text-sm"
            >
              Join a Program
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-12 flex-1 w-full space-y-16">
        
        {/* EN-TÊTE DE SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-6 gap-4">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-2">
              Curriculum Tracks
            </h2>
            <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Specialized Training Modules
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 px-3 py-1.5 rounded-md self-start md:self-auto">
            5 Active Modules
          </span>
        </div>

        {/* CARTES DE PROGRAMMES */}
        <div className="flex flex-col gap-6">
          {TRAINING_PROGRAMS.map((program, idx) => (
            <div 
              key={idx}
              className="group relative rounded-2xl border border-slate-800/80 bg-slate-900/30 p-8 transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-900/60 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 border border-cyan-800/60 px-2.5 py-0.5 rounded">
                    {program.badge}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                  {program.title}
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  <strong className="text-white font-medium">Focus:</strong> {program.focus}
                </p>
                <p className="text-slate-400 text-xs sm:text-sm flex items-center gap-2">
                  <svg className="w-4 h-4 text-cyan-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span><strong className="text-slate-200 font-medium">Target Audience:</strong> {program.target}</span>
                </p>
              </div>

              <div className="shrink-0 pt-2 md:pt-0">
                <Link 
                  href={program.href} 
                  className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500/40 px-5 py-2.5 rounded-xl transition-all"
                >
                  Learn details 
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          ))}

          {/* HIGHLIGHT : LEARNING FORMATS */}
          <div className="relative rounded-3xl border border-slate-800 bg-slate-900/40 p-8 md:p-12 backdrop-blur-xl shadow-2xl mt-4 overflow-hidden">
            <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-cyan-500 via-blue-500 to-transparent" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-500/30 shadow-inner">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-white">Flexible Learning Formats</h3>
                  <p className="text-slate-400 text-xs sm:text-sm">Structured to fit academic schedules and corporate timelines.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-300 text-sm sm:text-base">
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 transition-all hover:border-cyan-500/30">
                  <div className="text-cyan-400 font-mono font-bold text-xs mb-2 uppercase tracking-wider">Option 01</div>
                  <strong className="block text-white text-lg mb-2 font-medium">Workshops</strong>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Intensive 3-to-5 day technical deep-dives focusing on direct problem solving and hands-on coding sessions.
                  </p>
                </div>

                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 transition-all hover:border-cyan-500/30">
                  <div className="text-cyan-400 font-mono font-bold text-xs mb-2 uppercase tracking-wider">Option 02</div>
                  <strong className="block text-white text-lg mb-2 font-medium">Short Courses</strong>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Flexible multi-week modules designed around specialized software frameworks and open-source packages.
                  </p>
                </div>

                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 transition-all hover:border-cyan-500/30">
                  <div className="text-cyan-400 font-mono font-bold text-xs mb-2 uppercase tracking-wider">Option 03</div>
                  <strong className="block text-white text-lg mb-2 font-medium">Professional Certificates</strong>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    Rigorous evaluation and credentials designed to advance careers in energy, civil engineering, and environmental sectors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <div className="text-center pt-8 pb-4">
          <div className="inline-flex flex-col items-center p-8 rounded-3xl border border-slate-800 bg-slate-900/30 max-w-2xl w-full backdrop-blur-md">
            <h3 className="text-xl font-semibold text-white mb-2">Ready to elevate your technical skills?</h3>
            <p className="text-slate-400 text-sm mb-6 max-w-md">Contact our academic team to discuss custom training sessions or registration details.</p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-8 py-3.5 font-semibold text-white transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] text-sm"
            >
              Contact Training Coordinator
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>

      </main>

      {/* PIED DE PAGE */}
      <footer className="relative z-10 w-full border-t border-slate-800/80 bg-[#02040a] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
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