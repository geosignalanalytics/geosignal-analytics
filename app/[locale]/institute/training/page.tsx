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
    num: '01',
    title: 'Computational Geophysics',
    focus: 'Numerical modeling, inversion theory, and high-performance computing.',
    target: 'Graduate students / researchers',
    href: '/institute/training/computational-geophysics',
  },
  {
    num: '02',
    title: 'Signal Processing for Geophysical Applications',
    focus: 'Seismic and DAS signal enhancement, filtering, and time-frequency methods.',
    target: 'Graduate students / researchers / industry professionals',
    href: '/institute/training/signal-processing',
  },
  {
    num: '03',
    title: 'Machine Learning in Seismic Processing',
    focus: 'Data-driven denoising, deep learning architectures, and physics-informed models.',
    target: 'Graduate students / researchers / industry professionals',
    href: '/institute/training/machine-learning',
  },
  {
    num: '04',
    title: 'DAS Data Analysis & Interpretation',
    focus: 'Distributed acoustic sensing physics, noise sources, and microseismic applications.',
    target: 'Researchers / engineers / field practitioners',
    href: '/institute/training/das-data-analysis',
  },
  {
    num: '05',
    title: 'Applied GeoAI for Subsurface Imaging',
    focus: 'AI-driven structural interpretation, fault tracking, and uncertainty quantification.',
    target: 'Graduate students / researchers / geophysics professionals',
    href: '/institute/training/geoai-subsurface-imaging',
  },
];

export default function TrainingPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'fr'>('en');
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
                  {MENU_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-md px-3.5 py-2 text-[13px] transition-colors hover:bg-[#060a12] hover:text-white ${
                        item.href === '/institute/training' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
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
              {MENU_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-md px-3 py-2 text-[13px] hover:bg-[#0b1329] hover:text-white transition-colors ${
                    item.href === '/institute/training' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
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
              Education &amp; capacity building
            </p>
            <h1 className="text-[2.3rem] leading-[1.12] sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-7">
              Training &amp; professional development
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10">
              Research-driven programs for geophysicists, built to connect theoretical foundations with
              modern computational practice.
            </p>
            <Link 
              href="/contact" 
              className="rounded-md bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-500 transition-colors inline-block"
            >
              Join a program
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-20 md:px-12 flex-1 w-full space-y-16">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800/80 pb-6 gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-2">
              Curriculum tracks
            </p>
            <p className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Specialized training modules
            </p>
          </div>
          <span className="text-sm text-slate-500">
            5 active modules
          </span>
        </div>

        {/* TRAINING PROGRAM CARDS */}
        <div className="flex flex-col gap-6">
          {TRAINING_PROGRAMS.map((program) => (
            <div 
              key={program.num}
              className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-3 max-w-3xl">
                <span className="text-xs font-mono text-slate-600">{program.num}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {program.title}
                </h3>
                <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                  <strong className="text-slate-200 font-medium">Focus:</strong> {program.focus}
                </p>
                <p className="text-slate-500 text-sm">
                  <strong className="text-slate-400 font-medium">Audience:</strong> {program.target}
                </p>
              </div>

              <div className="shrink-0 pt-2 md:pt-0">
                <Link 
                  href={program.href} 
                  className="inline-flex items-center text-sm font-medium text-cyan-500 hover:text-cyan-400 border border-slate-700 hover:border-slate-500 px-5 py-2.5 rounded-md transition-colors"
                >
                  Learn details
                </Link>
              </div>
            </div>
          ))}

          {/* LEARNING FORMATS */}
          <div className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 md:p-12 mt-4">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Learning formats</h3>
              <p className="text-slate-500 text-sm">Structured to fit academic schedules and corporate timelines.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <span className="text-xs font-mono text-slate-600 block mb-2">01</span>
                <strong className="block text-white text-lg mb-2 font-medium">Workshops</strong>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Intensive 3-to-5 day technical sessions focused on direct problem solving and hands-on coding.
                </p>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-600 block mb-2">02</span>
                <strong className="block text-white text-lg mb-2 font-medium">Short courses</strong>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Flexible multi-week modules built around specific software frameworks and open-source packages.
                </p>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-600 block mb-2">03</span>
                <strong className="block text-white text-lg mb-2 font-medium">Professional certificates</strong>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Evaluation and credentials meant to support careers in energy, civil engineering, and
                  environmental sectors.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="inline-flex flex-col items-center p-8 rounded-xl border border-slate-800/80 bg-[#0b1329] max-w-2xl w-full">
            <h3 className="text-xl font-bold text-white mb-2">Ready to build these skills?</h3>
            <p className="text-slate-400 text-sm mb-6 max-w-md">Contact our academic team to discuss custom training sessions or registration.</p>
            <Link 
              href="/contact" 
              className="rounded-md bg-cyan-600 hover:bg-cyan-500 px-8 py-3.5 text-sm font-semibold text-white transition-colors"
            >
              Contact the training coordinator
            </Link>
          </div>
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
