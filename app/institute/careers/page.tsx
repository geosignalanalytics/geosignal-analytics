'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useId } from 'react';

interface Opportunity {
  id: string;
  title: string;
  type: 'Postdoctoral' | 'PhD Student' | 'Visiting Scholar' | 'Research Internship';
  location: 'Remote / Hybrid' | 'On-site';
  status: 'Open Spontaneous' | 'Upcoming';
  description: string;
  requirements: string[];
}

interface DropdownItem {
  label: string;
  href: string;
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

const opportunitiesData: Opportunity[] = [
  {
    id: 'postdoc-das',
    title: 'Postdoctoral Researcher in DAS Signal Processing & AI',
    type: 'Postdoctoral',
    location: 'Remote / Hybrid',
    status: 'Open Spontaneous',
    description: 'Focus on developing deep learning frameworks for Distributed Acoustic Sensing (DAS) denoising, signal reconstruction, and automatic microseismic event location.',
    requirements: [
      'PhD in Geophysics, Applied Mathematics, Computational Physics, or AI',
      'Strong publication record in signal processing or seismic data inversion',
      'Proficiency in Python (PyTorch/TensorFlow) and C++/CUDA'
    ]
  },
  {
    id: 'phd-inversion',
    title: 'PhD Fellowship in Multidimensional Seismic Inversion',
    type: 'PhD Student',
    location: 'On-site',
    status: 'Open Spontaneous',
    description: 'Investigate physics-informed neural networks (PINNs) and regularized spatial inversion methods for multi-component geophysical datasets.',
    requirements: [
      'Master’s degree in Geophysics, Physics, Data Science, or related fields',
      'Solid background in linear algebra, numerical analysis, and wave propagation',
      'Demonstrated coding proficiency in Python or Julia'
    ]
  },
  {
    id: 'visiting-scholar',
    title: 'Visiting Research Fellow / Academic Collaborator',
    type: 'Visiting Scholar',
    location: 'Remote / Hybrid',
    status: 'Open Spontaneous',
    description: 'Collaborative position for university faculty and international researchers looking to run joint research initiatives on open geophysical benchmarks.',
    requirements: [
      'Active academic appointment or faculty position',
      'Research alignment with machine learning, DAS, or seismic processing',
      'Proposal for joint publication or grant development'
    ]
  },
  {
    id: 'internship-ml',
    title: 'Research Internship: Deep Learning for Geo-Data',
    type: 'Research Internship',
    location: 'Remote / Hybrid',
    status: 'Open Spontaneous',
    description: 'Short-term (3 to 6 months) research project for graduate students interested in developing open-source Python packages for geophysical data denoising.',
    requirements: [
      'Currently enrolled in Master’s or final year Undergraduate program',
      'Experience with Scientific Python (NumPy, SciPy, PyTorch)',
      'Enthusiasm for open science and reproducible research'
    ]
  }
];

export default function CareersPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [activeTab, setActiveTab] = useState<'positions' | 'apply'>('positions');
  const [submitted, setSubmitted] = useState(false);
  const dropdownId = useId();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    roleInterest: 'Postdoctoral',
    researchArea: '',
    coverLetter: '',
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col">

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
                onClick={() => setIsOpen((prev) => !prev)} 
                className="flex items-center gap-1.5 text-white border-b-2 border-cyan-500 pb-[18px] -mb-[14px] focus:outline-none"
                aria-expanded={isOpen}
                aria-controls={dropdownId}
                aria-haspopup="true"
              >
                GeoSignal Institute 
                <svg 
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-500'}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div 
                  id={dropdownId}
                  className="absolute right-0 mt-4 w-60 rounded-lg border border-slate-800 bg-[#0b1329] p-1.5 shadow-xl z-50"
                >
                  {DROPDOWN_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-md px-3.5 py-2 text-[13px] transition-colors hover:bg-[#060a12] hover:text-white ${
                        item.href === '/institute/careers' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
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
                    item.href === '/institute/careers' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
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
              Careers at GSI
            </p>
            <h1 className="text-[2.3rem] leading-[1.12] sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-7">
              Careers &amp; research opportunities
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Postdoc, PhD, visiting scholar, and internship positions in computational geophysics,
              signal processing, and Distributed Acoustic Sensing (DAS).
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main id="main-content" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 flex-1 w-full space-y-16">

        {/* WHY JOIN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0b1329] border border-slate-800/80 p-8 rounded-xl">
            <span className="text-xs font-mono text-slate-600">01</span>
            <h3 className="text-lg font-bold text-white mt-2 mb-3">Datasets that are actually real</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Work on field data, not synthetic benchmarks: high-density DAS arrays and real seismic
              datasets, with the computational tools to match.
            </p>
          </div>

          <div className="bg-[#0b1329] border border-slate-800/80 p-8 rounded-xl">
            <span className="text-xs font-mono text-slate-600">02</span>
            <h3 className="text-lg font-bold text-white mt-2 mb-3">Open by default</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Reproducible code and open science as the norm, with collaborations across institutions
              rather than siloed work.
            </p>
          </div>

          <div className="bg-[#0b1329] border border-slate-800/80 p-8 rounded-xl">
            <span className="text-xs font-mono text-slate-600">03</span>
            <h3 className="text-lg font-bold text-white mt-2 mb-3">Actual mentorship</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              Direct guidance from senior researchers and support getting published, not left to figure
              things out alone.
            </p>
          </div>
        </div>

        {/* TABS */}
        <div className="flex justify-center border-b border-slate-800/80 pb-4 gap-3">
          <button
            onClick={() => setActiveTab('positions')}
            className={`px-6 py-2.5 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer focus:outline-none ${
              activeTab === 'positions'
                ? 'bg-cyan-600 text-white'
                : 'bg-[#0b1329] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            Research tracks &amp; roles
          </button>
          <button
            onClick={() => setActiveTab('apply')}
            className={`px-6 py-2.5 rounded-md text-xs sm:text-sm font-semibold transition-colors cursor-pointer focus:outline-none ${
              activeTab === 'apply'
                ? 'bg-cyan-600 text-white'
                : 'bg-[#0b1329] border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            Spontaneous application
          </button>
        </div>

        {/* TAB 1: POSITIONS */}
        {activeTab === 'positions' && (
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-bold text-white mb-2">Open research tracks</h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Structured funding calls go out periodically, but we review spontaneous applications
                on a rolling basis regardless of whether a call is currently open.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {opportunitiesData.map((opp) => (
                <article 
                  key={opp.id} 
                  className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-6 sm:p-8 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                      <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-md">
                        {opp.type}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-slate-400 bg-[#060a12] px-2.5 py-1 rounded border border-slate-800">
                          {opp.location}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">
                          {opp.status}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 tracking-tight">
                      {opp.title}
                    </h3>
                    
                    <p className="text-sm text-slate-400 leading-relaxed mb-6">
                      {opp.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        Key qualifications
                      </h4>
                      <ul className="list-disc list-inside text-sm text-slate-400 space-y-1">
                        {opp.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-4">
                    <span className="text-xs text-slate-500">
                      Send a CV and a brief proposal to our academic team.
                    </span>
                    <button
                      onClick={() => {
                        setActiveTab('apply');
                        setFormData((prev) => ({ ...prev, roleInterest: opp.type }));
                      }}
                      className="rounded-md bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold px-5 py-2.5 transition-colors cursor-pointer focus:outline-none"
                    >
                      Apply for this track
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: APPLICATION FORM */}
        {activeTab === 'apply' && (
          <div className="max-w-3xl mx-auto bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">Spontaneous application</h2>
            <p className="text-sm text-slate-400 text-center mb-8">
              Send your CV, Google Scholar link, and research interest. We'll reach out if your profile
              fits an ongoing or upcoming grant.
            </p>

            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 text-center space-y-4">
                <h3 className="text-xl font-bold text-white">Application received</h3>
                <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thanks for your interest in GeoSignal Institute. Our research committee will review
                  your submission and reach out by email.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-cyan-400 hover:underline cursor-pointer"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Full name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Dr. Alex Morgan"
                      className="w-full rounded-md border border-slate-800 bg-[#060a12] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Email address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex.morgan@university.edu"
                      className="w-full rounded-md border border-slate-800 bg-[#060a12] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="roleInterest" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Desired track / role *
                    </label>
                    <select
                      id="roleInterest"
                      value={formData.roleInterest}
                      onChange={(e) => setFormData({ ...formData, roleInterest: e.target.value })}
                      className="w-full rounded-md border border-slate-800 bg-[#060a12] px-4 py-3 text-sm text-white focus:border-cyan-500 focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Postdoctoral">Postdoctoral Researcher</option>
                      <option value="PhD Student">PhD Fellow / Student</option>
                      <option value="Visiting Scholar">Visiting Researcher / Professor</option>
                      <option value="Research Internship">Master / Research Intern</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="researchArea" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      Primary research specialty *
                    </label>
                    <input
                      id="researchArea"
                      type="text"
                      required
                      value={formData.researchArea}
                      onChange={(e) => setFormData({ ...formData, researchArea: e.target.value })}
                      placeholder="e.g. DAS, seismic denoising, PINNs"
                      className="w-full rounded-md border border-slate-800 bg-[#060a12] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="coverLetter" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Research statement *
                  </label>
                  <textarea
                    id="coverLetter"
                    rows={5}
                    required
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    placeholder="Briefly describe your research experience, academic background, and why you'd like to work with GeoSignal Institute."
                    className="w-full rounded-md border border-slate-800 bg-[#060a12] px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3.5 px-6 rounded-md text-sm transition-colors cursor-pointer focus:outline-none"
                >
                  Submit application &amp; CV
                </button>
              </form>
            )}
          </div>
        )}

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
                <label htmlFor="newsletter-email-input" className="block text-xs font-semibold text-white">
                  Occasional research updates, no spam
                </label>
                <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
                  <input
                    id="newsletter-email-input"
                    type="email"
                    placeholder="name@email.com"
                    required
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
                <ul className="space-y-2.5 text-slate-400 list-none p-0 m-0">
                  <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                  <li><Link href="/institute/about" className="hover:text-white transition-colors">The Institute Approach</Link></li>
                  <li><Link href="/institute/publications" className="hover:text-white transition-colors">Publications</Link></li>
                  <li><Link href="/institute/training" className="hover:text-white transition-colors">Training</Link></li>
                  <li><Link href="/institute/software" className="hover:text-white transition-colors">Open Source</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">Pages</h4>
                <ul className="space-y-2.5 text-slate-400 list-none p-0 m-0">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/institute" className="hover:text-white transition-colors">Overview</Link></li>
                  <li><Link href="/institute/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/institute/careers" className="hover:text-white transition-colors">Careers</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">Socials &amp; Academic</h4>
                <ul className="space-y-2.5 text-slate-400 list-none p-0 m-0">
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
