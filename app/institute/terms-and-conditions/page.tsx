'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function TermsAndConditionsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fermer le menu déroulant lors d'un clic à l'extérieur
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
          <Link href="/institute" className="flex items-center gap-3 group focus:outline-none">
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
                  {[
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
                  ].map((item) => (
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

      {/* ==================== HERO SECTION ==================== */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-[#050b14] py-20 px-6 text-center md:px-12 md:py-24">
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(rgba(56, 189, 248, 0.4) 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

    {/* Effet d'onde géophysique en arrière-plan */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/10 animate-ping [animation-duration:4s]" />
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/5 animate-ping [animation-duration:6s] delay-1000" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20 rounded-full mb-6 tracking-wide">
            Legal Terms &amp; Policies
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-slate-400 text-sm font-mono mb-6">
            Last Updated: March 19, 2026
          </p>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-8">
            Welcome to the <strong className="text-white">GeoSignal Research Institute (GSRI)</strong>. By accessing our platform, downloading open materials, or registering for specialized programs, you agree to comply with and be bound by the following terms.
          </p>
          <Link 
            href="/institute/about" 
            className="inline-flex items-center gap-2 rounded-xl bg-[#0a1954] border border-blue-600 hover:bg-blue-700 hover:border-sky-400 px-6 py-3 text-sm font-semibold text-white transition-all shadow-lg"
          >
            About The Institute
          </Link>
        </div>
      </section>

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="max-w-5xl mx-auto px-6 md:px-12 py-16 flex-1 w-full space-y-8">
        
        {/* INTELLECTUAL PROPERTY */}
        <article className="bg-[#0b1329] border border-slate-800/90 rounded-2xl p-8 md:p-10 shadow-xl hover:border-sky-500/30 transition-colors">
          <h2 className="text-2xl font-bold text-white mb-4 text-center md:text-left">
            1. Intellectual Property
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            All original research content provided on this platform—including but not limited to lecture notes (PDFs), presentation slides, numerical algorithms (Python, Julia, MATLAB), DAS denoising workflows, and academic publications—is the exclusive intellectual property of <strong>GeoSignal Research Institute</strong> and <strong>Dr. Innocent Oboué</strong>.
          </p>
          <ul className="space-y-3 text-slate-300 text-sm md:text-base pl-0 list-none">
            <li className="flex items-start gap-3">
              <span className="text-sky-400 font-bold text-lg leading-none">•</span>
              <span><strong className="text-white">Personal &amp; Academic Use:</strong> You are granted a limited, non-exclusive, non-transferable license to access, download, and utilize our open materials for individual educational, research, and non-commercial purposes.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-sky-400 font-bold text-lg leading-none">•</span>
              <span><strong className="text-white">Prohibitions:</strong> You may not re-sell, redistribute, commercialize, or mirror these computational assets or course structures on third-party platforms without express written authorization from GSRI.</span>
            </li>
          </ul>
        </article>

        {/* TRAINING & CAPACITY BUILDING */}
        <article className="bg-[#0b1329] border border-slate-800/90 rounded-2xl p-8 md:p-10 shadow-xl hover:border-sky-500/30 transition-colors">
          <h2 className="text-2xl font-bold text-white mb-4 text-center md:text-left">
            2. Training &amp; Capacity Building
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            Submitting a registration request (&quot;Join a Program&quot;) expresses an intent to participate in our capacity building and training modules.
          </p>
          <ul className="space-y-3 text-slate-300 text-sm md:text-base pl-0 list-none">
            <li className="flex items-start gap-3">
              <span className="text-sky-400 font-bold text-lg leading-none">•</span>
              <span><strong className="text-white">Course Access:</strong> Enrollment in advanced modules or access to specific high-density datasets may require prerequisites and verified institutional affiliation.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-sky-400 font-bold text-lg leading-none">•</span>
              <span><strong className="text-white">Syllabus Updates:</strong> GSRI reserves the right to continuously adjust course curricula, hands-on notebooks, and schedules to reflect recent breakthroughs in Machine Learning and Geophysical Signal Processing.</span>
            </li>
          </ul>
        </article>

        {/* SCIENTIFIC DISCLAIMER & LIABILITY */}
        <article className="bg-[#0b1329] border border-slate-800/90 rounded-2xl p-8 md:p-10 shadow-xl hover:border-sky-500/30 transition-colors">
          <h2 className="text-2xl font-bold text-white mb-4 text-center md:text-left">
            3. Scientific Disclaimer &amp; Liability
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            Geophysical processing, multidimensional signal analysis, and AI-assisted subsurface imaging are inherently probabilistic and model-dependent fields.
          </p>
          <ul className="space-y-3 text-slate-300 text-sm md:text-base pl-0 list-none">
            <li className="flex items-start gap-3">
              <span className="text-sky-400 font-bold text-lg leading-none">•</span>
              <span><strong className="text-white">No Operational Guarantee:</strong> While GSRI delivers state-of-the-art methodology, we do not guarantee specific industrial or exploratory outcomes (such as drill-site validation or exact reservoir mapping) derived from applying our open-source scripts or training materials.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-sky-400 font-bold text-lg leading-none">•</span>
              <span><strong className="text-white">Professional Responsibility:</strong> Users, independent geophysicists, and consulting partners bear full responsibility for verifying mathematical outputs prior to critical field operations.</span>
            </li>
          </ul>
        </article>

        {/* EXTERNAL LINKS & THIRD-PARTY TOOLS */}
        <article className="bg-[#0b1329] border border-slate-800/90 rounded-2xl p-8 md:p-10 shadow-xl hover:border-sky-500/30 transition-colors">
          <h2 className="text-2xl font-bold text-white mb-4 text-center md:text-left">
            4. External Links &amp; Third-Party Frameworks
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            Our codebase and technical notebooks heavily rely on open-source ecosystems (e.g., PyTorch, TensorFlow, SciPy, Seismic Unix, ObsPy). GSRI claims no ownership over third-party libraries and assumes no liability for updates, deprecated dependencies, or license terms dictated by external software maintainers.
          </p>
        </article>

        {/* GOVERNING LAW */}
        <article className="bg-[#0b1329] border border-slate-800/90 rounded-2xl p-8 md:p-10 shadow-xl hover:border-sky-500/30 transition-colors">
          <h2 className="text-2xl font-bold text-white mb-4 text-center md:text-left">
            5. Governing Law
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            These terms are constructed and governed in accordance with international academic and intellectual property conventions. Any disputes or claims arising out of the use of GSRI platforms or materials shall be resolved under the governing jurisdiction of the institute's primary registration.
          </p>
        </article>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <Link 
            href="/institute/training" 
            className="w-full sm:w-auto text-center rounded-xl bg-[#0a1954] border border-blue-600 hover:bg-blue-700 hover:border-sky-400 px-8 py-3.5 text-sm font-semibold text-white transition-all shadow-md"
          >
            Back to Training
          </Link>
          <Link 
            href="/institute/contact" 
            className="w-full sm:w-auto text-center rounded-xl bg-sky-500 hover:bg-sky-400 px-8 py-3.5 text-sm font-semibold text-[#050b14] transition-all shadow-lg shadow-sky-500/20"
          >
            Join a Program
          </Link>
        </div>

      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="w-full border-t border-slate-800/80 bg-[#030712] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">
            
            {/* BRAND */}
            <div className="lg:col-span-6 space-y-4 pr-0 lg:pr-8">
              <div className="bg-white rounded-lg px-3 py-1.5 shadow-md inline-block">
                <Image 
                  src="/images/logo-institute.jpeg" 
                  alt="GeoSignal Institute Logo" 
                  width={130} 
                  height={38} 
                  className="h-8 w-auto object-contain"
                />
              </div>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
                <strong className="text-white">GeoSignal Research Institute (GSRI)</strong>
                <br />
                Bridging the gap between Earth Sciences and Artificial Intelligence through academic excellence and rigorous methodology.
              </p>
            </div>

            {/* LINKS */}
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

          {/* BOTTOM BAR */}
          <div className="border-t border-slate-800/80 pt-6 flex flex-col items-center justify-between gap-4 text-xs text-slate-500 text-center md:flex-row md:text-left">
            <p>
              Founded and led by Dr. Innocent Oboué, PhD
            </p>
            <p>
              © {new Date().getFullYear()} GeoSignal Research Institute — A Scientific Branch of GeoSignal Analytics. All rights reserved.
            </p>
          </div>

        </div>
      </footer>
    </div>
  );
}