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

export default function TermsAndConditionsPage() {
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
                      className="block rounded-md px-3.5 py-2 text-[13px] text-slate-400 transition-colors hover:bg-[#060a12] hover:text-white"
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

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-5">
              Legal terms &amp; policies
            </p>
            <h1 className="text-[2.3rem] leading-[1.12] sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
              Terms &amp; conditions
            </h1>
            <p className="text-slate-500 text-sm font-mono mb-7">
              Last updated: March 19, 2026
            </p>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10">
              Welcome to the GeoSignal Research Institute (GSRI). By accessing our platform, downloading
              open materials, or registering for our programs, you agree to the following terms.
            </p>
            <Link 
              href="/institute/about" 
              className="inline-flex items-center rounded-md border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500 hover:text-white transition-colors"
            >
              About the Institute
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-6 md:px-12 py-16 flex-1 w-full space-y-6">

        {/* INTELLECTUAL PROPERTY */}
        <article className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            1. Intellectual property
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
            All original research content on this platform, including lecture notes, presentation slides,
            numerical algorithms (Python, Julia, MATLAB), DAS denoising workflows, and academic
            publications, is the intellectual property of GeoSignal Research Institute and Dr. Innocent Oboué.
          </p>
          <ul className="space-y-3 text-slate-400 text-sm md:text-base pl-0 list-none">
            <li>
              <strong className="text-white">Personal &amp; academic use:</strong> you're granted a limited,
              non-exclusive, non-transferable license to access, download, and use our open materials for
              individual educational, research, and non-commercial purposes.
            </li>
            <li>
              <strong className="text-white">Prohibitions:</strong> you may not resell, redistribute,
              commercialize, or mirror these computational assets or course structures on third-party
              platforms without written authorization from GSRI.
            </li>
          </ul>
        </article>

        {/* TRAINING */}
        <article className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            2. Training &amp; capacity building
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
            Submitting a registration request ("Join a Program") expresses intent to participate in our
            training modules.
          </p>
          <ul className="space-y-3 text-slate-400 text-sm md:text-base pl-0 list-none">
            <li>
              <strong className="text-white">Course access:</strong> enrollment in advanced modules or
              access to specific high-density datasets may require prerequisites and verified institutional
              affiliation.
            </li>
            <li>
              <strong className="text-white">Syllabus updates:</strong> GSRI may adjust course curricula,
              notebooks, and schedules to reflect recent developments in machine learning and geophysical
              signal processing.
            </li>
          </ul>
        </article>

        {/* DISCLAIMER */}
        <article className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            3. Scientific disclaimer &amp; liability
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
            Geophysical processing, multidimensional signal analysis, and AI-assisted subsurface imaging
            are inherently probabilistic and model-dependent fields.
          </p>
          <ul className="space-y-3 text-slate-400 text-sm md:text-base pl-0 list-none">
            <li>
              <strong className="text-white">No operational guarantee:</strong> GSRI does not guarantee
              specific industrial or exploratory outcomes (such as drill-site validation or exact reservoir
              mapping) derived from applying our open-source scripts or training materials.
            </li>
            <li>
              <strong className="text-white">Professional responsibility:</strong> users, independent
              geophysicists, and consulting partners are responsible for verifying outputs before critical
              field operations.
            </li>
          </ul>
        </article>

        {/* THIRD-PARTY */}
        <article className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            4. External links &amp; third-party frameworks
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            Our codebase and technical notebooks rely on open-source ecosystems (e.g. PyTorch, TensorFlow,
            SciPy, Seismic Unix, ObsPy). GSRI claims no ownership over third-party libraries and assumes no
            liability for updates, deprecated dependencies, or license terms set by external maintainers.
          </p>
        </article>

        {/* GOVERNING LAW */}
        <article className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 md:p-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            5. Governing law
          </h2>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            These terms are governed by international academic and intellectual property conventions. Any
            disputes arising from the use of GSRI platforms or materials fall under the jurisdiction of the
            Institute's primary registration.
          </p>
        </article>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6">
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

            <div className="lg:col-span-6 space-y-4 pr-0 lg:pr-8">
              <div className="bg-white rounded-md px-3 py-1.5 inline-block">
                <Image 
                  src="/images/logo-institute.jpeg" 
                  alt="GeoSignal Institute" 
                  width={130} 
                  height={38} 
                  className="h-7 w-auto object-contain"
                />
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
                <strong className="text-white">GeoSignal Research Institute (GSRI)</strong>
                <br />
                The research and publications arm of GeoSignal Analytics.
              </p>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-6 text-xs sm:text-sm">
              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  Research
                </h4>
                <ul className="space-y-2.5 text-slate-400 list-none p-0 m-0">
                  <li><Link href="/institute/publications" className="hover:text-white transition-colors">Publications</Link></li>
                  <li><Link href="/institute/research" className="hover:text-white transition-colors">Core Areas</Link></li>
                  <li><Link href="/institute/software" className="hover:text-white transition-colors">Open Source Software</Link></li>
                  <li><Link href="/institute/training" className="hover:text-white transition-colors">Training Modules</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  Connect
                </h4>
                <ul className="space-y-2.5 text-slate-400 list-none p-0 m-0">
                  <li><Link href="/institute/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/institute/people" className="hover:text-white transition-colors">People</Link></li>
                  <li><Link href="/institute/events" className="hover:text-white transition-colors">Events &amp; Seminars</Link></li>
                  <li><Link href="/institute/contact" className="hover:text-white transition-colors">Contact GSRI</Link></li>
                </ul>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-800/80 pt-6 flex flex-col items-center justify-between gap-4 text-xs text-slate-500 text-center md:flex-row md:text-left">
            <p>
              Founded and led by Dr. Innocent Oboué, PhD
            </p>
            <p>
              © {new Date().getFullYear()} GeoSignal Research Institute, a scientific branch of GeoSignal Analytics. All rights reserved.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}
