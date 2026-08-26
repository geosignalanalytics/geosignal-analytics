'use client';

import Link from 'next/link';
import Image from 'next/image';

// Composant HeroWaveBackground intégré directement pour éviter l'erreur d'import
function HeroWaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-40 -z-10">
      <style>{`
        @keyframes pulseWave {
          0%, 100% { transform: translateY(0px) scaleY(1); opacity: 0.8; }
          50% { transform: translateY(-6px) scaleY(1.05); opacity: 0.4; }
        }
        @keyframes seismicFlow {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        .animate-wave-1 {
          animation: pulseWave 8s ease-in-out infinite;
        }
        .animate-wave-2 {
          animation: pulseWave 12s ease-in-out infinite reverse;
        }
        .animate-seismic {
          stroke-dasharray: 1000;
          animation: seismicFlow 15s linear infinite;
        }
      `}</style>

      <svg 
        className="h-full w-full" 
        viewBox="0 0 1400 500" 
        preserveAspectRatio="none" 
        fill="none"
      >
        {/* Onde sinusoïdale fluide 1 */}
        <path 
          className="animate-wave-1"
          d="M -100,280 C 300,360 500,160 900,280 C 1200,370 1400,210 1600,260" 
          stroke="url(#gradient-wave-1)" 
          strokeWidth="1.5" 
        />

        {/* Onde sinusoïdale fluide 2 */}
        <path 
          className="animate-wave-2"
          d="M -100,310 C 320,390 520,190 920,310 C 1220,400 1420,240 1600,290" 
          stroke="url(#gradient-wave-2)" 
          strokeWidth="1" 
        />

        {/* Sismogramme / Signal à pics (Cyan avec effet de flux) */}
        <path 
          className="animate-seismic"
          d="M 80,295 L 200,295 L 215,220 L 230,370 L 245,160 L 260,410 L 275,210 L 290,340 L 305,270 L 320,310 L 335,295 L 580,295" 
          stroke="#06b6d4" 
          strokeWidth="1.5" 
          opacity="0.6" 
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Axe vertical discret */}
        <line x1="260" y1="100" x2="260" y2="420" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.25" />

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
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white flex flex-col antialiased relative overflow-hidden">
      
      {/* 1. BARRE DE NAVIGATION */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#050b14]/90 px-6 py-4 backdrop-blur-md md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center rounded-lg bg-white px-2.5 py-1 transition-transform group-hover:scale-105">
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
            <li><Link href="/" className="transition-colors hover:text-white">Home</Link></li>
            <li><Link href="/about" className="transition-colors hover:text-white">About</Link></li>
            <li><Link href="/institute" className="transition-colors hover:text-cyan-400">GeoSignal Institute</Link></li>
            <li><Link href="/services" className="transition-colors hover:text-white">Services</Link></li>
            <li><Link href="/contact" className="text-cyan-400 font-semibold transition-colors">Contact</Link></li>
          </ul>
        </div>
      </nav>

      {/* 2. SECTION HERO & FORMULAIRE SPLIT */}
      <main className="relative flex-1 flex flex-col justify-center py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto w-full z-10">
        
        {/* Arrière-plan avec Ondes et Lumières Ambient */}
        <HeroWaveBackground />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

        {/* En-tête de la page */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/40 border border-cyan-500/30 rounded-full mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Let’s Solve Your <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">Subsurface Challenges</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Whether you are looking to optimize an exploration project, ensure environmental compliance, or integrate AI into your geological workflows, our team is ready to deliver.
          </p>
        </div>

        {/* Grille Principale (Split Screen) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* COLONNE GAUCHE : Cartes de Contact & Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <div className="bg-[#0b1329]/80 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#080f1e] border border-slate-800 text-cyan-400 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">Direct Email</h3>
                  <p className="text-slate-400 text-xs mb-2">Our technical team responds within 24 hours.</p>
                  <a href="mailto:contact@gsri.com" className="text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors">
                    contact@gsri.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-[#0b1329]/80 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-xl relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#080f1e] border border-slate-800 text-cyan-400 group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.08-7.074-6.97l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-base mb-1">Phone Inquiry</h3>
                  <p className="text-slate-400 text-xs mb-2">Mon - Fri from 8am to 6pm GMT.</p>
                  <a href="tel:+2250747394790" className="text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors">
                    +225 07 47 39 47 90
                  </a>
                </div>
              </div>
            </div>

            {/* Block d'engagement/confiance */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0b1329] to-[#080d1b] border border-slate-800/80">
              <h4 className="text-sm font-semibold text-white mb-2">Why Partner With Us?</h4>
              <ul className="space-y-2 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span> Proprietary Deep Learning &amp; Signal Algorithms
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span> High-precision Subsurface Reconstruction
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cyan-400">✓</span> Rigorous QHSE &amp; Academic Standards
                </li>
              </ul>
            </div>

          </div>

          {/* COLONNE DROITE : Formulaire Pro */}
          <div className="lg:col-span-7 bg-[#0b1329]/90 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative">
            
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="firstName" className="text-xs font-semibold uppercase tracking-wider text-slate-300">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    placeholder="Innocent" 
                    className="bg-[#050b14] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="lastName" className="text-xs font-semibold uppercase tracking-wider text-slate-300">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    placeholder="Oboue" 
                    className="bg-[#050b14] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-300">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="contact@example.com" 
                    className="bg-[#050b14] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-slate-300">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    placeholder="+225 00 00 00 00" 
                    className="bg-[#050b14] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="details" className="text-xs font-semibold uppercase tracking-wider text-slate-300">Project Details</label>
                <textarea 
                  id="details" 
                  rows={5}
                  placeholder="Describe your research, subsurface imaging, or exploration inquiry..." 
                  className="bg-[#050b14] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-y"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="mt-2 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-4 px-6 shadow-lg shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <span>Submit Project Inquiry</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>

            </form>
          </div>

        </div>
      </main>

      {/* 3. FOOTER */}
      <footer className="w-full border-t border-slate-800/80 bg-[#030712] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto z-10">
        <div className="mx-auto max-w-7xl">
          
          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">
            
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

            <div className="lg:col-span-7 grid grid-cols-3 gap-6 text-xs sm:text-sm">
              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  Services
                </h4>
                <ul className="space-y-2.5 text-slate-400">
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
                  Company
                </h4>
                <ul className="space-y-2.5 text-slate-400">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/institute" className="hover:text-white transition-colors">GeoSignal Institute</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  Connect
                </h4>
                <ul className="space-y-2.5 text-slate-400">
                  <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
                  <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a></li>
                </ul>
              </div>
            </div>

          </div>

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

              <p className="text-slate-400">
                Developed and designed by Dr. Innocent Oboué, PhD
              </p>

              <p className="text-slate-500">
                © {new Date().getFullYear()} GeoSignal Analytics — All Rights Reserved
              </p>

            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}