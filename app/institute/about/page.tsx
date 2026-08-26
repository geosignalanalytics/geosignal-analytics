'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, ReactNode } from 'react';

// ==================== TYPES & DATA ====================
interface DropdownItem {
  label: string;
  href: string;
}

interface CardItem {
  title: string;
  description: string;
  icon: ReactNode;
  id?: string;
  badge?: string;
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

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

// ==================== SUB-COMPONENTS ====================

function FeatureCard({ title, description, icon, id, badge }: CardItem) {
  return (
    <article 
      id={id}
      className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/30 p-8 shadow-xl transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-900/60 scroll-mt-24"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-3 text-cyan-400 transition-transform group-hover:scale-105">
            {icon}
          </div>
          {badge && (
            <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-2.5 py-1 text-[10px] font-mono font-semibold uppercase tracking-wider text-cyan-400">
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-xl font-semibold text-white transition-colors group-hover:text-cyan-300">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-400">
          {description}
        </p>
      </div>
    </article>
  );
}

function HeroWaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40 overflow-hidden">
      <svg 
        className="h-full w-full" 
        viewBox="0 0 1400 500" 
        preserveAspectRatio="none" 
        fill="none"
        aria-hidden="true"
      >
        <path 
          d="M -100,280 C 300,360 500,160 900,280 C 1200,370 1400,210 1600,260" 
          stroke="url(#gradient-wave-1)" 
          strokeWidth="1.5" 
          opacity="0.8"
        />
        <path 
          d="M -100,310 C 320,390 520,190 920,310 C 1220,400 1420,240 1600,290" 
          stroke="url(#gradient-wave-2)" 
          strokeWidth="1" 
          opacity="0.3"
        />
        <path 
          d="M 80,295 L 200,295 L 215,220 L 230,370 L 245,160 L 260,410 L 275,210 L 290,340 L 305,270 L 320,310 L 335,295 L 580,295" 
          stroke="#10b981" 
          strokeWidth="1.5" 
          opacity="0.5" 
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line x1="260" y1="100" x2="260" y2="420" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.25" />

        <defs>
          <linearGradient id="gradient-wave-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#0ea5e9" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="gradient-wave-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#059669" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// ==================== MAIN PAGE COMPONENT ====================
export default function AboutInstitutePage() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-[#070b12] font-sans text-slate-200 antialiased selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Grid Pattern */}
      <div 
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
      />

      {/* 1. NAVIGATION BAR */}
      <header className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#070b12]/80 px-6 py-4 backdrop-blur-xl md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
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

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-300 md:flex">
            <Link href="/" className="transition-colors hover:text-cyan-400">Home</Link>
            <Link href="/about" className="transition-colors hover:text-cyan-400">About</Link>

            {/* Dropdown Menu */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                className="flex items-center gap-1.5 font-semibold text-white transition-colors hover:text-cyan-400 focus:outline-none cursor-pointer"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                GeoSignal Institute 
                <svg 
                  className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-800 bg-[#0c121e]/95 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  {DROPDOWN_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsDropdownOpen(false)}
                      className={`block rounded-xl px-4 py-2.5 text-xs sm:text-sm transition-all hover:bg-slate-800/60 hover:text-cyan-300 hover:translate-x-1 ${
                        item.href === '/institute/about' ? 'bg-slate-800/80 font-semibold text-cyan-400' : 'text-slate-300'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/services" className="transition-colors hover:text-cyan-400">Services</Link>
            <Link href="/contact" className="transition-colors hover:text-cyan-400">Contact</Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 md:hidden"
            aria-label="Toggle Navigation"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="mt-4 rounded-xl border border-slate-800 bg-[#0c121e] p-4 md:hidden">
            <nav className="flex flex-col gap-3 text-sm">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="py-1 text-slate-200">Home</Link>
              <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="py-1 text-slate-200">About</Link>
              <span className="mt-2 text-xs font-semibold uppercase tracking-wider text-cyan-400">Institute</span>
              {DROPDOWN_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="pl-3 py-1 text-xs text-slate-300 hover:text-cyan-400"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="pt-2 text-slate-200">Services</Link>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="py-1 text-slate-200">Contact</Link>
            </nav>
          </div>
        )}
      </header>

{/* 2. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-[#040711] px-6 py-32 text-center md:px-12 md:py-40">
        {/* Halo lumineux Cyan / Sky */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-cyan-500/15 via-sky-500/15 to-transparent blur-[120px]" />
        
        <HeroWaveBackground />
    {/* Effet d'onde géophysique en arrière-plan */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/10 animate-ping [animation-duration:4s]" />
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/5 animate-ping [animation-duration:6s] delay-1000" />
        </div>

        {/* Arrière-plan avec Ondes et Lumières Ambient */}
        <HeroWaveBackground />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="relative z-10 mx-auto max-w-4xl">
          {/* Badge Cyan */}
          <span className="mb-8 inline-block rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-md">
            GeoSignal Institute
          </span>
          
          {/* Titre avec Dégradé Cyan -> Sky -> Indigo */}
          <h1 className="mb-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl">
            About The <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Institute</span>
          </h1>
          
          <p className="mx-auto mb-10 max-w-2xl text-base font-normal leading-relaxed text-slate-400 sm:text-lg md:text-xl">
            An academic and scientific platform dedicated to rigorous research, computational innovation, and responsible geoscience.
          </p>
          
    <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              href="/institute/research" 
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-8 py-3.5 font-semibold text-white transition-all shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:shadow-[0_0_35px_rgba(6,182,212,0.5)] text-sm"
            >
              Explore Research
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            <Link 
              href="#experts" 
              className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-7 py-3.5 text-sm font-medium text-slate-200 backdrop-blur-md transition-all hover:border-slate-600 hover:bg-slate-800/80"
            >
              Our Experts
            </Link>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT CONTAINER */}
      <main className="relative z-10 mx-auto w-full max-w-7xl flex-1 space-y-24 px-6 py-20 md:px-12">

        {/* SECTION 1: INSTITUTIONAL BACKGROUND */}
        <section className="space-y-8">
          <div className="border-b border-slate-800/80 pb-4">
            <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
              Foundational Structure
            </h2>
            <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Institutional Framework
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FeatureCard 
              badge="Structure"
              title="Institutional Background"
              description="The GeoSignal Research Institute (GSRI) is the academic and scientific branch of GeoSignal Analytics LLC. The Institute was established to provide a dedicated framework for fundamental and applied research in geophysics, signal processing, and data-driven subsurface analysis. GSRI operates at the interface between academic research and applied geoscience, with the objective of developing scientifically rigorous methodologies that address both theoretical challenges and real-world applications."
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>}
            />
            <FeatureCard 
              badge="Transfer"
              title="Academic Mission & Knowledge Transfer"
              description="GSRI is committed to the production and dissemination of high-quality scientific knowledge through peer-reviewed publications, open research practices, and international collaboration. The Institute actively contributes to the training of students, early-career researchers, and professionals through advanced courses, workshops, and research-driven programs. By bridging academic research and applied geoscience, the Institute ensures responsible knowledge transfer while maintaining scientific independence and integrity."
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>}
            />
            <FeatureCard 
              badge="Global"
              title="Positioning & International Outlook"
              description="The GeoSignal Research Institute operates within an international research ecosystem, collaborating with universities, research centers, and industry partners worldwide. Our activities are designed to meet international academic standards and contribute to global scientific discussions in Earth and data sciences. Through its affiliation with GeoSignal Analytics LLC, the Institute maintains a unique position that enables close interaction between academic research and applied innovation, while preserving a clear distinction between scientific inquiry and commercial activities."
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V11.414m-1.414-1.414A2 2 0 0016.586 9H15a2 2 0 01-2-2V5.5A2.5 2.5 0 0010.5 3h-.5a2.5 2.5 0 00-2.5 2.5z" /></svg>}
            />
            <FeatureCard 
              badge="Philosophy"
              title="Scientific Scope & Philosophy"
              description="The Institute’s research philosophy is grounded in methodological rigor, physical interpretability, and long-term scientific vision. We emphasize computational geophysics, physics-informed data analysis, and artificial intelligence approaches that are transparent, reproducible, and firmly rooted in geophysical principles. Our work spans seismic imaging, signal processing, Distributed Acoustic Sensing (DAS), numerical modeling, and advanced machine learning methods for subsurface characterization."
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
            />
          </div>
        </section>

        {/* SECTION 2: OUR MISSION */}
        <section id="research" className="scroll-mt-24 space-y-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
              Core Purpose
            </h2>
            <p className="mb-4 text-3xl font-semibold text-white md:text-4xl">
              Our Mission
            </p>
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
              To advance the frontiers of Earth Sciences by integrating rigorous physical principles with computational intelligence, ensuring a sustainable and data-driven understanding of the subsurface.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <FeatureCard 
              title="Scientific Mission"
              description="Dedicated to advancing fundamental and applied research in geophysics, signal processing, and data-driven subsurface science. We focus on transparent, interpretable AI methods grounded in physical principles to solve complex Earth system challenges."
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>}
            />
            <FeatureCard 
              title="Research & Innovation"
              description="Contributing original knowledge through high-impact publications, open-source code, and reproducible methodologies. We foster innovation at the intersection of theory, numerical modeling, and large-scale DAS / seismic datasets."
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>}
            />
            <FeatureCard 
              title="Education & Training"
              description="Equipping students, researchers, and industry professionals with strong theoretical foundations and modern computational skills through specialized technical modules, workshops, and research programs."
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /></svg>}
            />
          </div>
        </section>

        {/* SECTION 3: OUR VISION */}
        <section className="space-y-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-2 text-xs font-bold uppercase tracking-widest text-cyan-400">
              Future Perspective
            </h2>
            <p className="mb-4 text-3xl font-semibold text-white md:text-4xl">
              Our Vision
            </p>
            <p className="text-base leading-relaxed text-slate-300 sm:text-lg">
              Shaping the future of geophysical intelligence through innovation, scientific leadership, and global impact.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FeatureCard 
              title="Global Cooperation & Societal Impact"
              description="The GeoSignal Research Institute actively promotes collaboration with universities, public research organizations, and industry partners worldwide. By bridging academic research and applied geoscience, the Institute contributes to sustainable resource management, hazard assessment, infrastructure monitoring, and responsible subsurface utilization."
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>}
            />
            <FeatureCard 
              title="Long-Term Scientific Vision"
              description="We envision a future where advanced geophysical intelligence plays a central role in addressing global challenges related to energy transition, environmental sustainability, and natural hazard mitigation—establishing computational geophysics as a foundational tool across spatial scales."
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>}
            />
            <FeatureCard 
              title="Physics-Guided Earth Science"
              description="We lead the integration of physics-based modeling and AI into coherent scientific frameworks. By advancing hybrid methodologies that combine physical laws with large-scale observational data, we transform raw subsurface signals into actionable scientific insight."
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
            />
            <FeatureCard 
              id="experts"
              title="Scientific Leadership"
              description="GSRI aims to be an internationally recognized center of excellence. Through rigorous research, mentorship, and open collaborations across academia and public institutions, we empower the next generation of geoscientists and drive progress in Earth science."
              icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
            />
          </div>
        </section>

        {/* CALL TO ACTION SECTION */}
        <section className="relative my-16 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/40 p-10 text-center shadow-2xl backdrop-blur-xl sm:p-14">
          <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-cyan-500 via-indigo-500 to-transparent" />
          
          <div className="relative z-10 mx-auto max-w-2xl space-y-6">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Let&apos;s Advance Science Together
            </h2>
            
            <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-slate-950/60 p-6 text-left text-xs leading-relaxed text-slate-300 sm:text-sm">
              <p><strong className="font-medium text-cyan-400">Academic Partnerships:</strong> Explore joint research ventures, faculty exchanges, and institutional collaborations.</p>
              <p><strong className="font-medium text-cyan-400">Research Inquiries:</strong> Technical deep-dives into our methodologies (PINNs, DAS, Inversion) and recent high-fidelity publications.</p>
              <p><strong className="font-medium text-cyan-400">Training &amp; Workshops:</strong> Upskill your team with our professional development programs and specialized technical tracks.</p>
            </div>

            <div className="pt-2">
              <Link 
                href="/institute/contact" 
                className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-8 py-3.5 text-sm font-semibold text-slate-950 transition-all hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
              >
                Reach Out to Us
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* 4. FOOTER */}
      <footer className="relative z-10 mt-auto w-full border-t border-slate-800/80 bg-[#04070d] px-6 py-14 text-sm text-slate-400 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">
            
            {/* BRAND & NEWSLETTER */}
            <div className="space-y-4 pr-0 lg:col-span-5 lg:pr-8">
              <h3 className="text-base font-semibold tracking-wide text-white">
                GeoSignal Institute
              </h3>
              <p className="max-w-md text-xs leading-relaxed text-slate-400">
                Bridging Earth Sciences and Artificial Intelligence through academic rigor and scientific excellence.
              </p>

              <div className="space-y-2 pt-3">
                <span className="block text-xs font-medium text-slate-300">
                  Join our newsletter
                </span>
                <form onSubmit={(e) => e.preventDefault()} className="flex max-w-md items-center gap-2">
                  <input
                    type="email"
                    placeholder="name@email.com"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 transition-colors focus:border-cyan-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="shrink-0 cursor-pointer rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-slate-700"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* NAVIGATION LINKS */}
            <div className="grid grid-cols-3 gap-6 text-xs sm:text-sm lg:col-span-7">
              <div>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Links
                </h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li><Link href="/services" className="transition-colors hover:text-white">Services</Link></li>
                  <li><Link href="/institute/about" className="transition-colors hover:text-white">The Institute Approach</Link></li>
                  <li><Link href="/institute/publications" className="transition-colors hover:text-white">Publications</Link></li>
                  <li><Link href="/institute/training" className="transition-colors hover:text-white">Training</Link></li>
                  <li><Link href="/institute/software" className="transition-colors hover:text-white">Open Source</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Pages
                </h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li><Link href="/" className="transition-colors hover:text-white">Home</Link></li>
                  <li><Link href="/institute" className="transition-colors hover:text-white">Overview</Link></li>
                  <li><Link href="/institute/blog" className="transition-colors hover:text-white">Blog</Link></li>
                  <li><Link href="/contact" className="transition-colors hover:text-white">Contact</Link></li>
                  <li><Link href="/institute/careers" className="transition-colors hover:text-white">Careers</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Socials & Academic
                </h4>
                <ul className="space-y-2 text-xs text-slate-400">
                  <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">LinkedIn</a></li>
                  <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">GitHub</a></li>
                  <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Twitter / X</a></li>
                  <li><a href="https://www.researchgate.net" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">ResearchGate</a></li>
                  <li><a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">Google Scholar</a></li>
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

              <div className="text-center text-slate-400 md:text-left">
                Developed and designed by Dr. Innocent Oboué, PhD
              </div>

              <div className="text-center text-slate-500 md:text-right">
                © {new Date().getFullYear()} GeoSignal Institute — All Rights Reserved
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}