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
  const [activeTab, setActiveTab] = useState<'positions' | 'apply'>('positions');
  const [submitted, setSubmitted] = useState(false);
  
  // Dynamic Accessibility ID
  const dropdownId = useId();

  // Form State
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
    <div className="min-h-screen bg-[#070b12] text-slate-100 font-sans antialiased selection:bg-sky-500 selection:text-white relative flex flex-col">
      
      {/* Background Subtle Tech Grid */}
      <div 
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
      />

      {/* ==================== NAVBAR ==================== */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#070b12]/85 px-6 py-4 backdrop-blur-xl md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-lg">
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
              <Link href="/" className="transition-colors hover:text-sky-400 focus:text-sky-400 focus:outline-none">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition-colors hover:text-sky-400 focus:text-sky-400 focus:outline-none">
                About
              </Link>
            </li>

            {/* MENU DÉROULANT GEOSIGNAL INSTITUTE */}
            <li className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsOpen((prev) => !prev)} 
                className="flex items-center gap-1.5 text-white font-semibold transition-colors hover:text-sky-400 focus:text-sky-400 focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
                aria-controls={dropdownId}
                aria-haspopup="true"
              >
                GeoSignal Institute 
                <svg 
                  className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-sky-400' : 'text-slate-400'}`} 
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
                  className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-800 bg-[#0c121e]/95 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-50"
                >
                  {DROPDOWN_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-xl px-4 py-2.5 text-xs sm:text-sm transition-all hover:bg-slate-800/70 hover:text-sky-300 hover:translate-x-1 ${
                        item.href === '/institute/careers' ? 'bg-slate-800/80 text-sky-400 font-semibold' : 'text-slate-300'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link href="/services" className="transition-colors hover:text-sky-400 focus:text-sky-400 focus:outline-none">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-sky-400 focus:text-sky-400 focus:outline-none">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

{/* ==================== HERO SECTION ==================== */}
<section 
  className="relative overflow-hidden border-b border-slate-800/80 bg-[#050b14] px-6 py-20 text-center md:px-12 md:py-28"
  style={{ 
    backgroundImage: `linear-gradient(180deg, rgba(5, 11, 20, 0.85) 0%, rgba(7, 11, 18, 0.98) 100%), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80')`,
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
      Join GSRI Research Community
    </span>
    <h1 className="mb-6 text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
      Careers &amp; <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Research Opportunities</span>
    </h1>
    <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-300 drop-shadow sm:text-lg">
      Collaborate on cutting-edge research in computational geophysics, machine learning, Distributed Acoustic Sensing (DAS), and signal processing.
    </p>
  </div>
</section>

      {/* ==================== MAIN CONTENT ==================== */}
      <main id="main-content" className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-16 flex-1 w-full space-y-16">

        {/* WHY JOIN US SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-2xl shadow-xl backdrop-blur-md hover:border-sky-500/40 transition-all duration-300">
            <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-bold mb-4 font-mono">
              01
            </div>
            <h3 className="text-lg font-bold text-white mb-2">High-Impact Research</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Work on real-world geophysical datasets using state-of-the-art computational algorithms, high-density DAS arrays, and machine learning models.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-2xl shadow-xl backdrop-blur-md hover:border-sky-500/40 transition-all duration-300">
            <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-bold mb-4 font-mono">
              02
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Open &amp; Collaborative</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              We promote open science, reproducible code, and international collaborations with leading institutions and research hubs worldwide.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-6 sm:p-8 rounded-2xl shadow-xl backdrop-blur-md hover:border-sky-500/40 transition-all duration-300">
            <div className="h-10 w-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 font-bold mb-4 font-mono">
              03
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Mentorship &amp; Growth</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Direct guidance from senior researchers, paper publication support in high-impact journals, and continuous skills development.
            </p>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex justify-center border-b border-slate-800/80 pb-4 gap-4">
          <button
            onClick={() => setActiveTab('positions')}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer focus:outline-none ${
              activeTab === 'positions'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                : 'bg-slate-900/40 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            Research Tracks &amp; Roles
          </button>
          <button
            onClick={() => setActiveTab('apply')}
            className={`px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer focus:outline-none ${
              activeTab === 'apply'
                ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                : 'bg-slate-900/40 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
            }`}
          >
            Spontaneous Application Form
          </button>
        </div>

        {/* TAB 1: POSITIONS LIST */}
        {activeTab === 'positions' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-white mb-2">Open Research Tracks</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                While structured funding calls are published periodically, we continuously review spontaneous applications from exceptional candidates across all levels.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {opportunitiesData.map((opp) => (
                <article 
                  key={opp.id} 
                  className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-6 sm:p-8 hover:border-sky-500/40 transition-all duration-300 shadow-xl flex flex-col justify-between backdrop-blur-md group"
                >
                  <div>
                    <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                      <span className="text-xs font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-3 py-1 rounded-md">
                        {opp.type}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-slate-300 bg-slate-900/80 px-2.5 py-1 rounded border border-slate-800">
                          📍 {opp.location}
                        </span>
                        <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded">
                          {opp.status}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-sky-300 transition-colors">
                      {opp.title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                      {opp.description}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                        Key Qualifications &amp; Skills:
                      </h4>
                      <ul className="list-disc list-inside text-xs sm:text-sm text-slate-300 space-y-1">
                        {opp.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-4">
                    <span className="text-xs text-slate-400">
                      Send CV + Brief Proposal directly to our academic team.
                    </span>
                    <button
                      onClick={() => {
                        setActiveTab('apply');
                        setFormData((prev) => ({ ...prev, roleInterest: opp.type }));
                      }}
                      className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-sky-500/20 cursor-pointer hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400"
                    >
                      Apply for this Track
                      <span>→</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: APPLICATION FORM */}
        {activeTab === 'apply' && (
          <div className="max-w-3xl mx-auto bg-slate-900/40 border border-slate-800/80 rounded-2xl p-8 sm:p-12 shadow-2xl backdrop-blur-md">
            <h2 className="text-2xl font-bold text-white mb-2 text-center">Spontaneous Application</h2>
            <p className="text-xs sm:text-sm text-slate-400 text-center mb-8">
              Submit your CV, Google Scholar link, and research interest. We will contact you if your profile aligns with our ongoing or upcoming grants.
            </p>

            {submitted ? (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-8 text-center space-y-4 animate-in fade-in duration-300">
                <div className="h-12 w-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ✓
                </div>
                <h3 className="text-xl font-bold text-white">Application Received!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for your interest in GeoSignal Institute. Our research committee will review your submission and reach out via email.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-sky-400 hover:underline cursor-pointer"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Dr. Alex Morgan"
                      className="w-full rounded-xl border border-slate-800 bg-[#070b12] px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex.morgan@university.edu"
                      className="w-full rounded-xl border border-slate-800 bg-[#070b12] px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="roleInterest" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Desired Track / Role *
                    </label>
                    <select
                      id="roleInterest"
                      value={formData.roleInterest}
                      onChange={(e) => setFormData({ ...formData, roleInterest: e.target.value })}
                      className="w-full rounded-xl border border-slate-800 bg-[#070b12] px-4 py-3 text-xs sm:text-sm text-white focus:border-sky-500 focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Postdoctoral">Postdoctoral Researcher</option>
                      <option value="PhD Student">PhD Fellow / Student</option>
                      <option value="Visiting Scholar">Visiting Researcher / Professor</option>
                      <option value="Research Internship">Master / Research Intern</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="researchArea" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      Primary Research Specialty *
                    </label>
                    <input
                      id="researchArea"
                      type="text"
                      required
                      value={formData.researchArea}
                      onChange={(e) => setFormData({ ...formData, researchArea: e.target.value })}
                      placeholder="e.g. DAS, Seismic Denoising, PINNs"
                      className="w-full rounded-xl border border-slate-800 bg-[#070b12] px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="coverLetter" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Research Statement / Summary *
                  </label>
                  <textarea
                    id="coverLetter"
                    rows={5}
                    required
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    placeholder="Briefly describe your research experience, academic background, and why you wish to collaborate with GeoSignal Institute..."
                    className="w-full rounded-xl border border-slate-800 bg-[#070b12] px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl text-sm transition-all shadow-lg shadow-sky-500/20 active:scale-[0.99] cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400"
                >
                  Submit Application &amp; CV
                </button>
              </form>
            )}
          </div>
        )}

      </main>

      {/* ==================== FOOTER ==================== */}
      <footer className="relative z-10 w-full border-t border-slate-800/80 bg-[#04070d] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl">
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
                <label htmlFor="newsletter-email-input" className="block text-xs font-medium text-slate-300">
                  Join our newsletter
                </label>
                <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
                  <input
                    id="newsletter-email-input"
                    type="email"
                    placeholder="name@email.com"
                    required
                    className="w-full rounded-lg border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-lg bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-medium text-white border border-slate-700 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500"
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
                <ul className="space-y-2 text-slate-400 text-xs list-none p-0 m-0">
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
                <ul className="space-y-2 text-slate-400 text-xs list-none p-0 m-0">
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
                <ul className="space-y-2 text-slate-400 text-xs list-none p-0 m-0">
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