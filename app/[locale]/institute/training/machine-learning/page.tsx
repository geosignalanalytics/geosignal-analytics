'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

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

const PROGRAM_TOPICS = [
  {
    title: 'Denoising & Interpolation',
    description: 'Deep learning architectures for random/coherent noise attenuation and spatial data reconstruction.',
  },
  {
    title: 'Deep Learning Architectures',
    description: 'CNNs, Transformers, and autoencoders adapted for 2D/3D seismic waveform interpretation.',
  },
  {
    title: 'Physics-Informed Neural Networks',
    description: 'Wave equation constraints built into neural networks to keep results physically consistent.',
  },
  {
    title: 'Industry & Research Case Studies',
    description: 'Real deployment scenarios across offshore exploration, DAS monitoring, and microseismic tracking.',
  },
];

const TEACHING_MATERIALS = [
  {
    title: 'Introduction to Machine Learning for Seismology',
    type: 'Foundational module',
    deliverables: 'Course notes (PDF), lecture slides, Python environment setup',
  },
  {
    title: 'Deep Learning for Seismic Denoising & Interpolation',
    type: 'Core hands-on',
    deliverables: 'Course notes (PDF), PyTorch implementation exercises, benchmark datasets',
  },
  {
    title: 'Neural Network Architectures for Waveform Data',
    type: 'Advanced workshop',
    deliverables: 'Course notes (PDF), Jupyter notebooks, pre-trained models',
  },
  {
    title: 'Physics-Informed & Hybrid Learning Approaches',
    type: 'Research seminar',
    deliverables: 'Course notes (PDF), PINNs code examples, synthetic case studies',
  },
  {
    title: 'Research Case Studies in ML-Based Processing',
    type: 'Capstone',
    deliverables: 'Technical documentation (PDF), field dataset benchmarks',
  },
];

export default function MachineLearningPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'fr'>('en');
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
    <div className="min-h-screen bg-[#060a12] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col antialiased">

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
              {DROPDOWN_LINKS.map((item) => (
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
              Training &amp; research curriculum
            </p>
            <h1 className="text-[2.3rem] leading-[1.12] sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-5">
              Machine learning in seismic processing
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10">
              A core research and training program of the GeoSignal Research Institute.
            </p>
            <Link 
              href="/institute/research" 
              className="rounded-md bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-500 transition-colors inline-block"
            >
              Explore research areas
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-6 md:px-12 py-16 flex-1 w-full space-y-6">

        {/* INTRO */}
        <article className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Program introduction
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            This program introduces machine learning techniques tailored to seismic data processing,
            with an emphasis on practical implementation, physical validity, and applications relevant
            to current industry problems.
          </p>
        </article>

        {/* SCOPE */}
        <article className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Program scope
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            The training connects classical physical wavefield operators with modern data-driven methods,
            including deep learning and hybrid physics-informed neural networks (PINNs) that respect the
            underlying wave equations.
          </p>
        </article>

        {/* TOPICS */}
        <article className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Program topics
          </h2>
          <p className="text-slate-500 text-sm mb-5">
            Core thematic pillars covered throughout the training:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROGRAM_TOPICS.map((topic) => (
              <div key={topic.title} className="p-4 rounded-md bg-[#060a12] border border-slate-800/80">
                <h3 className="text-white font-semibold text-sm md:text-base mb-1">{topic.title}</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{topic.description}</p>
              </div>
            ))}
          </div>
        </article>

        {/* COURSES */}
        <article className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Courses &amp; teaching materials
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
            Resources are organized to build from foundational knowledge up to reproducible workflows on
            complex 2D/3D seismic datasets.
          </p>

          <div className="space-y-3 pt-2 border-t border-slate-800/80">
            {TEACHING_MATERIALS.map((course) => (
              <div key={course.title} className="p-4 rounded-md bg-[#060a12] border border-slate-800/80">
                <span className="text-xs font-mono text-slate-600 uppercase tracking-wider">
                  {course.type}
                </span>
                <h3 className="text-white font-semibold text-sm md:text-base mt-1">{course.title}</h3>
                <p className="text-slate-500 text-xs md:text-sm mt-1">{course.deliverables}</p>
              </div>
            ))}
          </div>
        </article>

        {/* AUDIENCE */}
        <article className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Target audience
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Graduate students, geophysicists, PhD researchers, and industry professionals looking to
            integrate machine learning into seismic acquisition, processing, and interpretation pipelines.
          </p>
        </article>

        {/* TERMS */}
        <div className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-6 text-center text-slate-400 text-sm md:text-base">
          By clicking "Join", you agree to our{' '}
          <Link href="/institute/terms-and-conditions" className="text-cyan-500 font-semibold hover:text-cyan-400 transition-colors">
            Terms &amp; Conditions
          </Link>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link 
            href="/institute/training" 
            className="w-full sm:w-auto text-center rounded-md border border-slate-700 px-8 py-3.5 text-sm font-semibold text-slate-200 hover:border-slate-500 hover:text-white transition-colors"
          >
            Back to training
          </Link>
          <Link 
            href="/institute/contact" 
            className="w-full sm:w-auto text-center rounded-md bg-cyan-600 hover:bg-cyan-500 px-8 py-3.5 text-sm font-semibold text-white transition-colors"
          >
            Join a program
          </Link>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-800/80 bg-[#030712] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
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
                <label htmlFor="newsletter-email" className="block text-xs font-semibold text-white">
                  Occasional research updates, no spam
                </label>
                <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
                  <input
                    id="newsletter-email"
                    type="email"
                    placeholder="name@email.com"
                    className="w-full rounded-md border border-slate-800 bg-[#0b1329]/70 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-md bg-[#1e293b] hover:bg-[#283853] px-4 py-2 text-xs font-medium text-white border border-slate-700 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-3 gap-6 text-xs sm:text-sm pt-2 lg:pt-0">
              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  Links
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
                  Pages
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
                  Socials
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

          <div className="border-t border-slate-800/80 pt-6">
            <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-500 text-center md:flex-row md:text-left">
              <div className="bg-white rounded-md px-3 py-1.5 flex items-center justify-center">
                <Image 
                  src="/images/logo-institute.jpeg" 
                  alt="GeoSignal Institute" 
                  width={120} 
                  height={35} 
                  className="h-8 w-auto object-contain"
                />
              </div>
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
