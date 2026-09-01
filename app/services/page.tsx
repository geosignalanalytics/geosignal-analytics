'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const NAV_DROPDOWN_ITEMS = [
  { href: '/institute', label: 'Overview' },
  { href: '/institute/about', label: 'About Us' },
  { href: '/institute/research', label: 'Research' },
  { href: '/institute/publications', label: 'Publications' },
  { href: '/institute/training', label: 'Training' },
  { href: '/institute/people', label: 'People' },
  { href: '/institute/events', label: 'Events & Seminars' },
  { href: '/institute/news', label: 'News & Updates' },
  { href: '/institute/software', label: 'Software & Open Source' },
  { href: '/institute/careers', label: 'Careers & Opportunities' },
  { href: '/institute/blog', label: 'Blog' },
  { href: '/institute/contact', label: 'Contact' },
];

const services = [
  {
    id: 'subsurface-imaging',
    title: 'AI-assisted subsurface imaging',
    tagline: 'High-resolution seismic and geophysical processing',
    description:
      "We use machine learning models to improve seismic resolution, accelerate structural interpretation, and reveal geological details that are difficult to see in complex datasets.",
    features: [
      'Automatic fault and horizon detection',
      'AI-assisted seismic inversion',
      'Noise attenuation and signal enhancement',
      '3D/4D structural modeling',
    ],
  },
  {
    id: 'das-processing',
    title: 'DAS and signal processing',
    tagline: 'Advanced processing for distributed acoustic sensing',
    description:
      "We process continuous, high-volume DAS (Distributed Acoustic Sensing) streams with custom-built algorithms designed to preserve signal integrity, filter ambient noise, and provide real-time monitoring.",
    features: [
      'Custom noise reduction algorithms',
      'Real-time acoustic interpretation',
      'High-throughput workflow optimization',
      'Fiber optic applications for energy and infrastructure',
    ],
  },
  {
    id: 'resource-exploration',
    title: 'GeoAI for resource exploration',
    tagline: 'Evaluation of water reservoirs, minerals, and energy',
    description:
      "Our predictive models combine multi-physics geophysical data, geological constraints, and satellite imagery to identify high-potential target zones and reduce exploration risk.",
    features: [
      'Predictive modeling for groundwater mapping',
      'Target generation for mineral exploration',
      'Multi-data fusion (seismic, gravity, magnetic, borehole)',
      'Uncertainty quantification in resource estimates',
    ],
  },
  {
    id: 'custom-geoai',
    title: 'Custom GeoAI development',
    tagline: 'Machine learning pipelines tailored to your data',
    description:
      "We build GeoAI workflows specific to your datasets and operational needs, integrated directly into your existing software stack.",
    features: [
      'Custom PyTorch / TensorFlow architectures',
      'Automated classification of geological features',
      'Integration with your GIS and geophysical platforms',
      'Cloud and edge deployment at scale',
    ],
  },
  {
    id: 'consulting-audit',
    title: 'Geophysical consulting and risk audit',
    tagline: 'Independent technical expertise',
    description:
      "Independent review of your geophysical interpretations, acquisition designs, and AI model implementations to ensure scientific rigor and mitigate exploration risk.",
    features: [
      'Peer review of seismic and geophysical interpretations',
      'Audit of acquisition strategy and design',
      'Risk evaluation for drilling decisions',
      'Strategic advice on GeoAI adoption',
    ],
  },
];

export default function ServicesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLLIElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setMobileMenuOpen(false);
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
    <div className="min-h-screen bg-[#060a12] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col antialiased">

      {/* NAVIGATION */}
      <nav aria-label="Main Navigation" ref={mobileNavRef} className="sticky top-0 z-50 border-b border-slate-800/70 bg-[#060a12] px-6 py-3.5 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
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

          {/* Desktop Navigation (Centré) */}
          <ul className="hidden md:flex flex-1 justify-center items-center gap-9 text-[13.5px] font-medium text-slate-400 m-0 p-0 list-none">
            <li><Link href="/" className="hover:text-slate-200 transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-slate-200 transition-colors">About</Link></li>

            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 pb-[18px] -mb-[14px] focus:outline-none transition-colors"
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
                <div className="absolute left-1/2 -translate-x-1/2 mt-4 w-60 rounded-lg border border-slate-800 bg-[#0b1329] p-1.5 shadow-xl z-50">
                  {NAV_DROPDOWN_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-md px-3.5 py-2 text-[13px] text-slate-400 transition-colors hover:bg-[#060a12] hover:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link href="/services" className="text-white border-b-2 border-cyan-500 pb-[18px] -mb-[14px]">
                Services
              </Link>
            </li>
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
              className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className={`block h-[1.5px] w-6 bg-slate-200 transition-transform duration-200 ${mobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
              <span className={`block h-[1.5px] w-6 bg-slate-200 transition-opacity duration-200 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-[1.5px] w-6 bg-slate-200 transition-transform duration-200 ${mobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mx-auto max-w-7xl mt-4 pb-2 border-t border-slate-800/70 pt-4">
            <ul className="flex flex-col gap-1 text-sm font-medium m-0 p-0 list-none">
              <li><Link href="/" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">About</Link></li>
              <li><Link href="/services" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-cyan-400 font-semibold">Services</Link></li>
              <li><Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">Contact</Link></li>
            </ul>
            <div className="mt-3 pt-3 border-t border-slate-800/70">
              <span className="block px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-cyan-500">GeoSignal Institute</span>
              {NAV_DROPDOWN_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-md px-3 py-2 text-[13px] text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors"
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
              Services
            </p>
            <h1 className="text-[2.3rem] leading-[1.12] sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-5">
              Technical and Industrial Services
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10">
              GeoAI workflows, custom signal processing, and subsurface imaging serving energy, mining, and hydrogeology operations.
            </p>
            <Link
              href="/contact"
              className="rounded-md bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-500 transition-colors inline-block"
            >
              Request a technical consultation
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-6 md:px-12 py-16 flex-1 w-full space-y-6">

        {services.map((service) => (
          <article
            key={service.id}
            id={service.id}
            className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 md:p-10"
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              {service.title}
            </h2>
            <div className="text-sm font-semibold text-cyan-400 mb-4">
              {service.tagline}
            </div>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
              {service.description}
            </p>

            <div className="border-t border-slate-800/80 pt-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-4">
                Key highlights
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0 m-0">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-slate-400">
                    <svg className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}

        {/* CALL TO ACTION */}
        <div className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 md:p-10 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            Have a specific GeoAI requirement?
          </h3>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
            Custom model development, expert review, or specialized DAS processing. Let's discuss your project.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-md bg-cyan-600 hover:bg-cyan-500 px-6 py-3 text-sm font-semibold text-white transition-colors"
          >
            Contact the team
          </Link>
        </div>

      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-800/80 bg-[#030712] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">

            <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
              <h3 className="text-lg font-bold text-white tracking-wide">
                GeoSignal Research Institute
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
                The research and publications hub of GeoSignal Analytics.
              </p>

              <div className="pt-3 space-y-2">
                <label htmlFor="newsletter-email" className="block text-xs font-semibold text-white">
                  Research updates, spam-free
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
                  Services
                </h4>
                <ul className="space-y-2.5 text-slate-400 list-none p-0 m-0">
                  <li><Link href="#subsurface-imaging" className="hover:text-white transition-colors">Subsurface imaging</Link></li>
                  <li><Link href="#das-processing" className="hover:text-white transition-colors">DAS processing</Link></li>
                  <li><Link href="#resource-exploration" className="hover:text-white transition-colors">Resource exploration</Link></li>
                  <li><Link href="#custom-geoai" className="hover:text-white transition-colors">Custom GeoAI</Link></li>
                  <li><Link href="#consulting-audit" className="hover:text-white transition-colors">Consulting &amp; audit</Link></li>
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
                  Social
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
              <p className="text-slate-500 m-0">
                © {currentYear ?? 2026} GeoSignal Research Institute — All rights reserved
              </p>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}