'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const NAV_DROPDOWN_LINKS = [
  { label: 'Overview', href: '/institute' },
  { label: 'About Us', href: '/institute/about' },
  { label: 'Publications', href: '/institute/publications' },
  { label: 'Training', href: '/institute/training' },
  { label: 'People', href: '/institute/people' },
  { label: 'Events & Seminars', href: '/institute/events' },
  { label: 'Software & Open Source', href: '/institute/software' },
  { label: 'Careers & Opportunities', href: '/institute/careers' },
  { label: 'Blog', href: '/institute/blog' },
  { label: 'Contact', href: '/institute/contact' },
];

const PROGRAM_TOPICS = [
  {
    title: 'Denoising & Interpolation',
    description: 'Advanced deep learning architectures for random/coherent noise attenuation and spatial data reconstruction.',
  },
  {
    title: 'Deep Learning Architectures',
    description: 'CNNs, Transformers, and Autoencoders customized for 2D/3D seismic waveform interpretation.',
  },
  {
    title: 'Physics-Informed Neural Networks',
    description: 'Integrating wave equation constraints into deep neural networks to guarantee physical consistency.',
  },
  {
    title: 'Industry & Research Case Studies',
    description: 'Real-world deployment scenarios across offshore exploration, DAS monitoring, and microseismic tracking.',
  },
];

const TEACHING_MATERIALS = [
  {
    title: 'Introduction to Machine Learning for Seismology',
    type: 'Foundational Module',
    deliverables: ['Course notes (PDF)', 'Lecture slides', 'Python environment setup'],
  },
  {
    title: 'Deep Learning for Seismic Denoising & Interpolation',
    type: 'Core Hands-On',
    deliverables: ['Course notes (PDF)', 'PyTorch implementation exercises', 'Benchmark datasets'],
  },
  {
    title: 'Neural Network Architectures for Waveform Data',
    type: 'Advanced Workshop',
    deliverables: ['Course notes (PDF)', 'Jupyter numerical notebooks', 'Pre-trained models'],
  },
  {
    title: 'Physics-Informed & Hybrid Learning Approaches',
    type: 'Research Seminar',
    deliverables: ['Course notes (PDF)', 'PINNs code examples', 'Synthetic case studies'],
  },
  {
    title: 'Research Case Studies in ML-Based Processing',
    type: 'Capstone',
    deliverables: ['Technical Documentation (PDF)', 'Field dataset benchmarks'],
  },
];

export default function MachineLearningPage() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    <div className="min-h-screen bg-[#050b14] text-slate-100 font-sans selection:bg-sky-500 selection:text-white flex flex-col antialiased">
      
      {/* ==================== NAVBAR ==================== */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-[#050b14]/90 px-6 py-4 backdrop-blur-md md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group focus:outline-none">
            <div className="flex items-center rounded-lg bg-white px-3 py-1.5 transition-transform duration-300 group-hover:scale-105 shadow-md">
              <Image 
                src="/images/logo-institute.jpeg" 
                alt="GeoSignal Institute Logo" 
                width={140} 
                height={40} 
                className="h-8 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          <ul className="hidden md:flex items-center gap-8 font-medium text-slate-400 text-sm md:text-base list-none m-0 p-0">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>

            {/* MENU DÉROULANT GEOSIGNAL INSTITUTE */}
            <li className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="flex items-center gap-1.5 text-white font-semibold transition-colors hover:text-sky-400 focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                Institute 
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
                <div className="absolute right-0 mt-3 w-64 rounded-xl border border-slate-800 bg-[#0b1329] p-2 shadow-2xl backdrop-blur-lg animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  {NAV_DROPDOWN_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-lg px-4 py-2.5 text-xs sm:text-sm text-slate-300 transition-all hover:bg-slate-800/70 hover:text-white hover:translate-x-1"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link href="/services" className="transition-colors hover:text-white">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

{/* ==================== HERO SECTION - MACHINE LEARNING IN SEISMIC PROCESSING ==================== */}
<section className="relative overflow-hidden border-b border-slate-800/80 bg-[#040711] px-6 py-20 text-center md:px-12 md:py-24">
  
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
      Training &amp; Research Curriculum
    </span>

    {/* Titre avec Dégradé Cyan -> Sky -> Indigo */}
    <h1 className="mb-6 text-3xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
      <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
        Machine Learning in Seismic Processing
      </span>
    </h1>

    <p className="mx-auto mb-8 max-w-2xl text-base font-normal leading-relaxed text-slate-400 sm:text-lg">
      A core research and training program of the GeoSignal Research Institute
    </p>

    <div className="flex justify-center">
      {/* Bouton Principal Cyan -> Sky */}
      <Link 
        href="/institute/research-area" 
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-8 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all hover:from-cyan-400 hover:to-sky-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.5)]"
      >
        Explore Research Areas
      </Link>
    </div>
  </div>
</section>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="max-w-5xl mx-auto px-6 md:px-12 py-16 flex-1 w-full space-y-8">
        
        {/* PROGRAM INTRODUCTION */}
        <article className="bg-[#0b1329] border border-slate-800/90 rounded-2xl p-8 md:p-10 shadow-xl hover:border-sky-500/30 transition-colors">
          <h2 className="text-2xl font-bold text-white mb-4">
            Program Introduction
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            This program introduces advanced machine learning techniques specifically tailored for seismic data processing. Emphasis is placed on practical implementation, physical validity, and research-oriented applications for modern industry challenges.
          </p>
        </article>

        {/* PROGRAM SCOPE */}
        <article className="bg-[#0b1329] border border-slate-800/90 rounded-2xl p-8 md:p-10 shadow-xl hover:border-sky-500/30 transition-colors">
          <h2 className="text-2xl font-bold text-white mb-4">
            Program Scope
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            The training bridges classical physical wavefield operators with modern data-driven methodologies, including deep learning and hybrid physics-informed neural networks (PINNs) that respect structural wave equations.
          </p>
        </article>

        {/* PROGRAM TOPICS */}
        <article className="bg-[#0b1329] border border-slate-800/90 rounded-2xl p-8 md:p-10 shadow-xl hover:border-sky-500/30 transition-colors">
          <h2 className="text-2xl font-bold text-white mb-4">
            Program Topics
          </h2>
          <p className="text-slate-300 text-sm md:text-base mb-6 font-medium">
            Core thematic pillars covered throughout the training modules:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROGRAM_TOPICS.map((topic, index) => (
              <div key={index} className="flex gap-3 p-4 rounded-xl bg-[#050b14]/60 border border-slate-800/80">
                <span className="text-sky-400 font-bold text-lg leading-none mt-0.5">•</span>
                <div>
                  <h3 className="text-white font-semibold text-sm md:text-base mb-1">{topic.title}</h3>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{topic.description}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* COURSES / TEACHING MATERIALS */}
        <article className="bg-[#0b1329] border border-slate-800/90 rounded-2xl p-8 md:p-10 shadow-xl hover:border-sky-500/30 transition-colors">
          <h2 className="text-2xl font-bold text-white mb-4">
            Courses / Teaching Materials
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
            Teaching resources are organized to progressively build foundational knowledge up to deploying reproducible workflows on complex 2D/3D seismic datasets.
          </p>

          <div className="space-y-4 pt-2 border-t border-slate-800">
            {TEACHING_MATERIALS.map((course, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#050b14]/60 border border-slate-800/80">
                <div className="flex items-start gap-3">
                  <span className="text-sky-400 font-bold text-lg leading-none mt-0.5">•</span>
                  <div>
                    <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20 mb-1">
                      {course.type}
                    </span>
                    <h3 className="text-white font-semibold text-sm md:text-base">{course.title}</h3>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 pl-6 sm:pl-0">
                  {course.deliverables.map((item, dIdx) => (
                    <span key={dIdx} className="text-xs text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-md border border-slate-700/50">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* TARGET AUDIENCE */}
        <article className="bg-[#0b1329] border border-slate-800/90 rounded-2xl p-8 md:p-10 shadow-xl hover:border-sky-500/30 transition-colors">
          <h2 className="text-2xl font-bold text-white mb-4">
            Target Audience
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Designed for graduate students, geophysicists, PhD researchers, and industry professionals looking to integrate state-of-the-art machine learning algorithms into modern seismic acquisition, processing, and interpretation pipelines.
          </p>
        </article>

        {/* TERMS BANNER */}
        <div className="bg-[#0b1329] border border-slate-800/90 rounded-2xl p-6 text-center text-slate-300 text-sm md:text-base shadow-xl">
          By clicking &apos;Join&apos;, you agree to our{' '}
          <Link href="/institute/terms-and-conditions" className="text-sky-400 font-semibold underline hover:text-sky-300 transition-colors">
            Terms &amp; Conditions
          </Link>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link 
            href="/institute/training" 
            className="w-full sm:w-auto text-center rounded-xl bg-[#0a1954] border border-blue-600 hover:bg-blue-700 hover:border-sky-400 px-8 py-3.5 text-sm font-semibold text-white transition-all shadow-md"
          >
            ← Back to Training
          </Link>
          <Link 
            href="/institute/contact" 
            className="w-full sm:w-auto text-center rounded-xl bg-sky-500 hover:bg-sky-400 px-8 py-3.5 text-sm font-semibold text-[#050b14] transition-all shadow-lg shadow-sky-500/20"
          >
            Join a Program ↗
          </Link>
        </div>

      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="w-full border-t border-slate-800/80 bg-[#030712] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl">
          
          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">
            
            {/* MARQUE & NEWSLETTER */}
            <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
              <h3 className="text-lg font-bold text-white tracking-wide">
                GeoSignal Research Institute
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
                Bridging the gap between Earth Sciences and Artificial Intelligence through academic excellence and rigorous methodology.
              </p>

              <div className="pt-3 space-y-2">
                <label htmlFor="newsletter-email" className="block text-xs font-semibold text-white">
                  Join our newsletter
                </label>
                <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="name@email.com"
                    className="w-full rounded-lg border border-slate-800 bg-[#0b1329]/70 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-lg bg-[#1e293b] hover:bg-[#283853] px-4 py-2 text-xs font-medium text-white border border-slate-700 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* COLONNES DE LIENS */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-6 text-xs sm:text-sm pt-2 lg:pt-0">
              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  LINKS
                </h4>
                <ul className="space-y-2.5 text-slate-400 list-none p-0 m-0">
                  <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                  <li><Link href="/institute/about" className="hover:text-white transition-colors">The Institute Approach</Link></li>
                  <li><Link href="/institute/publications" className="hover:text-white transition-colors">Publications</Link></li>
                  <li><Link href="/institute/training" className="hover:text-white transition-colors">Training</Link></li>
                  <li><Link href="/institute/software" className="hover:text-white transition-colors">Open Source</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  PAGES
                </h4>
                <ul className="space-y-2.5 text-slate-400 list-none p-0 m-0">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/institute" className="hover:text-white transition-colors">Overview</Link></li>
                  <li><Link href="/institute/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/institute/careers" className="hover:text-white transition-colors">Careers</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  SOCIALS
                </h4>
                <ul className="space-y-2.5 text-slate-400 list-none p-0 m-0">
                  <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
                  <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
                </ul>
              </div>
            </div>

          </div>

          {/* BOTTOM BAR */}
          <div className="border-t border-slate-800/80 pt-6">
            <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-400 text-center md:flex-row md:text-left">
              
              <div className="bg-white rounded-lg px-3 py-1.5 shadow-md flex items-center justify-center">
                <Image 
                  src="/images/logo-institute.jpeg" 
                  alt="GeoSignal Institute Logo" 
                  width={120} 
                  height={35} 
                  className="h-8 w-auto object-contain"
                />
              </div>

              <p className="text-slate-400">
                Developed and designed by Dr. Innocent Oboué, PhD
              </p>

              <p className="text-slate-500">
                © {new Date().getFullYear()} GeoSignal Research Institute — All Rights Reserved
              </p>

            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}