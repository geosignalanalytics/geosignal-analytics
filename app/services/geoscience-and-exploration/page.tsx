'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

export default function GeoscienceExplorationPage() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white flex flex-col antialiased">
      
      {/* 1. BARRE DE NAVIGATION */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-[#050b14]/90 px-6 py-4 backdrop-blur-md md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center rounded-lg bg-white px-2.5 py-1 transition-transform group-hover:scale-105 shadow-md">
              <Image 
                src="/images/logo.png" 
                alt="GeoSignal Analytics Logo" 
                width={150} 
                height={40} 
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
            <li>
              <Link href="/about" className="transition-colors hover:text-white">
                About
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
                <div className="absolute left-0 mt-3 w-56 rounded-xl border border-slate-800 bg-[#0b1329] p-2 shadow-2xl backdrop-blur-xl transition-all z-50">
                  <Link href="/institute" onClick={() => setIsOpen(false)} className="block rounded-lg px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#1e293b] hover:text-white transition-colors">Overview</Link>
                  <Link href="/institute/about" onClick={() => setIsOpen(false)} className="block rounded-lg px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#1e293b] hover:text-white transition-colors">About Us</Link>
                  <Link href="/institute/training" onClick={() => setIsOpen(false)} className="block rounded-lg px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#1e293b] hover:text-white transition-colors">Training</Link>
                  <Link href="/institute/research" onClick={() => setIsOpen(false)} className="block rounded-lg px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#1e293b] hover:text-white transition-colors">Research</Link>
                  <Link href="/institute/publications" onClick={() => setIsOpen(false)} className="block rounded-lg px-4 py-2 text-xs font-medium text-slate-300 hover:bg-[#1e293b] hover:text-white transition-colors">Publications</Link>
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

      {/* 2. SECTION HERO / INTRODUCTION */}
      <section 
        className="relative border-b border-slate-800/80 bg-[#050b14] py-20 px-6 text-center md:py-32 md:px-12 overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "linear-gradient(rgba(5, 11, 20, 0.75), rgba(5, 11, 20, 0.9)), url('/images/geoscience-bg.jpg')"
        }}
      >
        {/* Effet d'onde géophysique en arrière-plan */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/10 animate-ping [animation-duration:4s]" />
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/5 animate-ping [animation-duration:6s] delay-1000" />
        </div>

        {/* Conteneur principal (z-10 pour rester au-dessus de l'onde) */}
        <div className="mx-auto max-w-4xl relative z-10">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-[#0b1329] border border-cyan-500/30 rounded-full mb-6">
            Subsurface Intelligence
          </span>
          
          {/* Titre avec dégradé cyan animé */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl leading-tight mb-6 bg-gradient-to-r from-white via-cyan-400 to-white bg-[length:200%_auto] text-transparent bg-clip-text animate-[gradient_8s_ease_infinite]">
            Geoscience &amp; Exploration
          </h1>
          
          <p className="text-slate-200 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            We deliver integrated geoscience expertise to support resource exploration, infrastructure development, and environmental risk assessment. Our approach combines traditional field geology with advanced analytical modeling to de-risk your projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 hover:bg-cyan-500 transition-all duration-300"
            >
              Discuss Your Project
            </Link>
            <Link 
              href="#sub-services" 
              className="inline-flex items-center gap-2 rounded-xl bg-[#0b1329] border border-slate-700 hover:border-cyan-500 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300"
            >
              Explore Solutions
            </Link>
          </div>
        </div>
      </section>

      {/* 3. SECTION CONTENUS / SOUS-SERVICES */}
      <main id="sub-services" className="mx-auto max-w-7xl px-6 py-16 md:py-24 w-full flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Carte 1 : Geological Studies */}
          <div className="group relative rounded-2xl border border-slate-800/80 bg-[#0b1329] p-8 flex flex-col justify-between shadow-xl hover:border-cyan-500/50 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all"></div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Geological Studies</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Detailed surface and subsurface mapping to understand the geological framework of your project.
              </p>
              <div className="border-t border-slate-800/80 pt-5 space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Focus Points</span>
                  <p className="text-xs sm:text-sm text-slate-300">Lithological mapping, structural analysis, and stratigraphic correlation.</p>
                </div>
                <div className="space-y-1.5 pt-2 border-t border-slate-800/40">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 block">The GeoSignal Edge</span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Integration of satellite imagery and AI-driven lineament detection for regional geological modeling.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800/40">
              <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors">
                Learn More <span>→</span>
              </Link>
            </div>
          </div>

          {/* Carte 2 : Mineral Exploration */}
          <div className="group relative rounded-2xl border border-slate-800/80 bg-[#0b1329] p-8 flex flex-col justify-between shadow-xl hover:border-cyan-500/50 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all"></div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Mineral Exploration</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Targeted exploration programs designed to identify and evaluate mineral potential.
              </p>
              <div className="border-t border-slate-800/80 pt-5 space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Focus Points</span>
                  <p className="text-xs sm:text-sm text-slate-300">From Greenfield exploration to Brownfield expansion, geochemical sampling, drilling supervision, and core logging.</p>
                </div>
                <div className="space-y-1.5 pt-2 border-t border-slate-800/40">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 block">The GeoSignal Edge</span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Combining geophysical signatures with geochemical data through multivariate analysis for precise targeting.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800/40">
              <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors">
                Learn More <span>→</span>
              </Link>
            </div>
          </div>

          {/* Carte 3 : Soil & Land Studies */}
          <div className="group relative rounded-2xl border border-slate-800/80 bg-[#0b1329] p-8 flex flex-col justify-between shadow-xl hover:border-cyan-500/50 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all"></div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Soil &amp; Land Studies</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Comprehensive evaluation of land and soil properties for agricultural, industrial, or urban development.
              </p>
              <div className="border-t border-slate-800/80 pt-5 space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Focus Points</span>
                  <p className="text-xs sm:text-sm text-slate-300">Pedology, soil fertility assessment, and land suitability mapping.</p>
                </div>
                <div className="space-y-1.5 pt-2 border-t border-slate-800/40">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 block">The GeoSignal Edge</span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Using GIS and remote sensing to monitor soil degradation and land-use changes over time.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800/40">
              <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors">
                Learn More <span>→</span>
              </Link>
            </div>
          </div>

          {/* Carte 4 : Feasibility Studies */}
          <div className="group relative rounded-2xl border border-slate-800/80 bg-[#0b1329] p-8 flex flex-col justify-between shadow-xl hover:border-cyan-500/50 transition-all duration-300 overflow-hidden">
            <div className="absolute top-0 right-0 -mr-12 -mt-12 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all"></div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">Feasibility Studies</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Technical and economic evaluations to determine the viability of resource and infrastructure projects.
              </p>
              <div className="border-t border-slate-800/80 pt-5 space-y-4">
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">Focus Points</span>
                  <p className="text-xs sm:text-sm text-slate-300">Resource estimation, technical risk assessment, and environmental impact pre-scoping.</p>
                </div>
                <div className="space-y-1.5 pt-2 border-t border-slate-800/40">
                  <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 block">The GeoSignal Edge</span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Data-driven decision support models that integrate technical geosciences with cost-benefit analysis.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-slate-800/40">
              <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors">
                Learn More <span>→</span>
              </Link>
            </div>
          </div>

        </div>

        {/* Bouton CTA */}
        <div className="mt-14 flex justify-center">
          <Link 
            href="/contact" 
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 hover:bg-cyan-500 transition-all duration-300"
          >
            Get In Touch ↗
          </Link>
        </div>
      </main>

      {/* 4. FOOTER */}
      <footer className="w-full border-t border-slate-800/80 bg-[#030712] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl">
          
          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">
            
            {/* BRAND & NEWSLETTER */}
            <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
              <h3 className="text-lg font-bold text-white tracking-wide">
                GeoSignal Analytics
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
                Where Geophysics Meets Artificial Intelligence. Delivering high-fidelity subsurface and environmental solutions across the globe.
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
                  <li><Link href="/services/advanced-geophysics-and-ai" className="hover:text-white transition-colors">Advanced Geophysics</Link></li>
                  <li><Link href="/services/geoscience-and-exploration" className="hover:text-white transition-colors">Exploration</Link></li>
                  <li><Link href="/services/water-resources" className="hover:text-white transition-colors">Water Resources</Link></li>
                  <li><Link href="/services/mapping-gis-and-remote-sensing" className="hover:text-white transition-colors">GIS &amp; Remote Sensing</Link></li>
                  <li><Link href="/services/environmental-solutions" className="hover:text-white transition-colors">Environmental</Link></li>
                  <li><Link href="/services/qhse" className="hover:text-white transition-colors">QHSE Advisory</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  Pages
                </h4>
                <ul className="space-y-2.5 text-slate-400 list-none p-0 m-0">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                  <li><Link href="/institute" className="hover:text-white transition-colors">GeoSignal Institute</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
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
                  <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a></li>
                </ul>
              </div>
            </div>

          </div>

          {/* BOTTOM BAR */}
          <div className="border-t border-slate-800/80 pt-6">
            <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-400 text-center md:flex-row md:text-left">
              
              <div className="bg-white rounded-lg px-3 py-1.5 shadow-md flex items-center justify-center">
                <Image 
                  src="/images/logo.png" 
                  alt="GeoSignal Analytics Logo" 
                  width={120} 
                  height={35} 
                  className="h-8 w-auto object-contain"
                />
              </div>

              <p className="text-slate-400 m-0">
                Developed and designed by Dr. Innocent Oboué, PhD
              </p>

              <p className="text-slate-500 m-0">
                © {new Date().getFullYear()} GeoSignal Analytics — All Rights Reserved
              </p>

            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}