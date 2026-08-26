'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function ServicesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const services = [
    {
      id: 'subsurface-imaging',
      title: 'AI-Powered Subsurface Imaging',
      tagline: 'High-Resolution Seismic & Geophysical Data Processing',
      description: 'We leverage cutting-edge Artificial Intelligence and Machine Learning algorithms to enhance seismic resolution, accelerate structural interpretation, and extract subtle geological features from complex datasets.',
      features: [
        'Automated fault & horizon tracking',
        'AI-enhanced seismic inversion',
        'Noise attenuation and signal quality improvement',
        '3D/4D subsurface structural modeling'
      ]
    },
    {
      id: 'das-processing',
      title: 'DAS & Signal Processing Solutions',
      tagline: 'Advanced Processing for Distributed Acoustic Sensing',
      description: 'Expertise in processing continuous, high-volume Distributed Acoustic Sensing (DAS) data. We develop custom algorithms to protect signal integrity, filter ambient noise, and deliver real-time monitoring insights.',
      features: [
        'Custom DAS noise reduction algorithms',
        'Real-time acoustic signal interpretation',
        'High-throughput data workflow optimization',
        'Fiber-optic sensing applications for energy & infrastructure'
      ]
    },
    {
      id: 'resource-exploration',
      title: 'GeoAI for Resource Exploration',
      tagline: 'Water, Mineral & Energy Reservoir Assessment',
      description: 'Our predictive GeoAI models integrate multi-physics geophysical data, geological constraints, and satellite imagery to identify high-potential target zones and de-risk exploration projects.',
      features: [
        'Predictive modeling for groundwater mapping',
        'Target generation for mineral exploration',
        'Multi-data fusion (seismic, gravity, magnetic, borehole)',
        'Uncertainty quantification in resource estimates'
      ]
    },
    {
      id: 'custom-geoai',
      title: 'Custom GeoAI Software Development',
      tagline: 'Tailored Machine Learning Pipelines for Proprietary Data',
      description: 'We build proprietary GeoAI workflows tailored specifically to your company’s unique datasets and operational needs, seamlessly integrating machine learning into your existing software stack.',
      features: [
        'Custom PyTorch / TensorFlow architecture design',
        'Automated geological feature classification',
        'Integration with GIS and geophysical platforms',
        'Scalable cloud & edge deployment'
      ]
    },
    {
      id: 'consulting-audit',
      title: 'Geophysical Consulting & Risk Audit',
      tagline: 'Independent Technical Expertise & Decision Support',
      description: 'Independent expert review of geophysical interpretation, survey designs, and AI model implementations to ensure scientific rigor, minimize exploration risk, and optimize ROI.',
      features: [
        'Peer review of seismic & geophysical interpretations',
        'Survey design & acquisition strategy audit',
        'Risk & uncertainty assessment for drilling decisions',
        'Strategic advice on GeoAI adoption'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white flex flex-col antialiased">
      
      {/* 1. NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-[#050b14]/90 px-6 py-4 backdrop-blur-md md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center rounded-lg bg-white px-2.5 py-1 transition-transform group-hover:scale-105 shadow-md">
              <Image 
                src="/images/logo-institute.jpeg" 
                alt="GeoSignal Institute Logo" 
                width={120} 
                height={35} 
                className="h-8 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          <ul className="hidden md:flex items-center gap-8 font-medium text-slate-400 text-sm md:text-base m-0 p-0 list-none">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            
            {/* DROPDOWN INSTITUTE */}
            <li className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="flex items-center gap-1.5 transition-colors hover:text-white focus:outline-none"
              >
                <span>GeoSignal Institute</span>
                <span className="text-xs transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  ▼
                </span>
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-xl border border-slate-800 bg-[#0b1329] p-2 shadow-2xl backdrop-blur-xl transition-all">
                  <Link href="/institute" onClick={() => setIsOpen(false)} className="block rounded-lg px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#1e293b] hover:text-white transition-colors">Overview</Link>
                  <Link href="/institute/about" onClick={() => setIsOpen(false)} className="block rounded-lg px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#1e293b] hover:text-white transition-colors">About Us</Link>
                  <Link href="/institute/research" onClick={() => setIsOpen(false)} className="block rounded-lg px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#1e293b] hover:text-white transition-colors">Research</Link>
                  <Link href="/institute/publications" onClick={() => setIsOpen(false)} className="block rounded-lg px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#1e293b] hover:text-white transition-colors">Publications</Link>
                  <Link href="/institute/training" onClick={() => setIsOpen(false)} className="block rounded-lg px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#1e293b] hover:text-white transition-colors">Training</Link>
                  <Link href="/institute/people" onClick={() => setIsOpen(false)} className="block rounded-lg px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#1e293b] hover:text-white transition-colors">People</Link>
                  <Link href="/institute/events" onClick={() => setIsOpen(false)} className="block rounded-lg px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#1e293b] hover:text-white transition-colors">Events &amp; Seminars</Link>
                  <Link href="/institute/software" onClick={() => setIsOpen(false)} className="block rounded-lg px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#1e293b] hover:text-white transition-colors">Software &amp; Open Source</Link>
                  <Link href="/institute/careers" onClick={() => setIsOpen(false)} className="block rounded-lg px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#1e293b] hover:text-white transition-colors">Careers &amp; Opportunities</Link>
                  <Link href="/institute/blog" onClick={() => setIsOpen(false)} className="block rounded-lg px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#1e293b] hover:text-white transition-colors">Blog</Link>
                  <Link href="/institute/contact" onClick={() => setIsOpen(false)} className="block rounded-lg px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#1e293b] hover:text-white transition-colors">Contact</Link>
                </div>
              )}
            </li>

            <li>
              <Link href="/services" className="text-cyan-400 font-semibold transition-colors">
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

{/* HERO SECTION - INDUSTRIAL SOLUTIONS */}
<section className="relative overflow-hidden border-b border-slate-800/80 bg-[#040711] px-6 py-20 text-center md:px-12 md:py-28">
  
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
    <span className="mb-8 inline-block rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-md">
      Industrial Solutions
    </span>

    {/* Titre avec Dégradé Cyan -> Sky -> Indigo */}
    <h1 className="mb-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl">
      Industrial &amp;<br />
      <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
        Technical Services
      </span>
    </h1>

    <p className="mx-auto mb-8 max-w-2xl text-base font-normal leading-relaxed text-slate-400 sm:text-lg">
      Empowering energy, mining, and hydrogeological operations through advanced GeoAI workflows, custom signal processing, and high-resolution subsurface imaging.
    </p>

    <div className="flex justify-center">
      {/* Bouton Principal Cyan -> Sky */}
      <Link 
        href="/contact" 
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 px-8 py-3.5 text-sm font-semibold text-slate-950 shadow-[0_0_25px_rgba(6,182,212,0.3)] transition-all hover:from-cyan-400 hover:to-sky-400 hover:shadow-[0_0_35px_rgba(6,182,212,0.5)]"
      >
        Request a Technical Consultation
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      </Link>
    </div>
  </div>
</section>

      {/* 3. MAIN SERVICES LIST */}
      <main className="mx-auto max-w-5xl px-6 py-16 md:py-20 w-full flex-1">
        <div className="flex flex-col gap-10">
          {services.map((service) => (
            <div 
              key={service.id} 
              id={service.id} 
              className="group relative rounded-2xl border border-slate-800/80 bg-[#0b1329] p-8 md:p-10 shadow-xl hover:border-cyan-500/50 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all"></div>
              
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {service.title}
              </h2>
              <div className="text-sm font-semibold text-cyan-400 mb-4">
                {service.tagline}
              </div>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {service.description}
              </p>

              <div className="border-t border-slate-800/80 pt-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-4">
                  Key Capabilities:
                </span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-none p-0 m-0">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                      <svg className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CALL TO ACTION */}
        <div className="mt-16 rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-[#0b1329] to-[#050b14] p-8 md:p-12 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-cyan-500/5 blur-xl -z-10"></div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Need a Custom GeoAI Solution?
          </h3>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
            Whether you need custom model development for proprietary datasets, expert peer review, or specialized DAS signal processing, our team is ready to assist.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 hover:bg-cyan-500 transition-all duration-300"
          >
            Get in Touch with Our Experts ↗
          </Link>
        </div>
      </main>

      {/* 4. FOOTER INSTITUT */}
      <footer className="w-full border-t border-slate-800/80 bg-[#030712] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl">
          
          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">
            
            {/* BRAND & NEWSLETTER */}
            <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
              <h3 className="text-lg font-bold text-white tracking-wide">
                GeoSignal Research Institute
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
                Bridging the gap between Earth Sciences and Artificial Intelligence through academic excellence and rigorous methodology.
              </p>

              <div className="pt-3 space-y-2">
                <span className="block text-xs font-semibold text-white">
                  Join our newsletter
                </span>
                <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
                  <input
                    type="email"
                    placeholder="name@email.com"
                    className="w-full rounded-lg border border-slate-800 bg-[#0b1329]/70 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
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

            {/* NAVIGATION LINKS */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-6 text-xs sm:text-sm">
              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  Services
                </h4>
                <ul className="space-y-2.5 text-slate-400 list-none p-0 m-0">
                  <li><Link href="#subsurface-imaging" className="hover:text-white transition-colors">Subsurface Imaging</Link></li>
                  <li><Link href="#das-processing" className="hover:text-white transition-colors">DAS Signal Processing</Link></li>
                  <li><Link href="#resource-exploration" className="hover:text-white transition-colors">Resource Exploration</Link></li>
                  <li><Link href="#custom-geoai" className="hover:text-white transition-colors">Custom GeoAI</Link></li>
                  <li><Link href="#consulting-audit" className="hover:text-white transition-colors">Consulting &amp; Audit</Link></li>
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
              
              <p className="text-slate-400 m-0">
                Developed and designed by Dr. Innocent Oboué, PhD
              </p>

              <p className="text-slate-500 m-0">
                © {new Date().getFullYear()} GeoSignal Research Institute — All Rights Reserved
              </p>

            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}