"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function QHSEAuditingPage() {
  // État du menu déroulant de la navigation
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Fermer le menu déroulant si clic à l'extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <main className="bg-black text-slate-200 antialiased selection:bg-cyan-500 selection:text-white min-h-screen font-sans">
      
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
                className="flex items-center gap-1.5 transition-colors hover:text-white focus:outline-none cursor-pointer"
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
        className="relative flex flex-col items-center justify-center text-center px-4 py-32 bg-cover bg-center bg-no-repeat border-b border-slate-800 overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.55), rgba(5, 11, 20, 0.95)), url('/images/qhse-bg.jpg')"
        }}
      >
        {/* Effet d'onde géophysique en arrière-plan */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/10 animate-ping [animation-duration:4s]" />
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/5 animate-ping [animation-duration:6s] delay-1000" />
        </div>

        <div className="max-w-5xl mx-auto z-10 relative">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-cyan-950/60 border border-cyan-800/50 rounded-full">
            Compliance & Operational Risk
          </span>
          
          {/* Titre avec dégradé cyan animé */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight bg-gradient-to-r from-white via-cyan-400 to-white bg-[length:200%_auto] text-transparent bg-clip-text animate-[gradient_8s_ease_infinite]">
            QHSE & Environmental Auditing
          </h1>
          
          <p className="text-base sm:text-lg text-slate-300 max-w-4xl mx-auto mb-10 leading-relaxed font-medium">
            We support organizations in implementing integrated management systems to ensure quality, environmental responsibility, and workplace safety. Our auditing services ensure full compliance with international standards, mitigating risks and enhancing operational excellence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="px-6 py-3 rounded-md bg-[#0a1954] hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-lg shadow-blue-950/50 hover:scale-[1.02]">
              Discuss Your Project
            </Link>
            <Link href="#sub-services" className="px-6 py-3 rounded-md bg-[#0d6b82] hover:bg-cyan-700 text-white font-medium transition-all duration-200 shadow-lg shadow-cyan-950/50 hover:scale-[1.02]">
              Explore Services
            </Link>
          </div>
        </div>
      </section>


      {/* 3. SECTION CONTENUS / SOUS-SERVICES (Les 4 cartes) */}
      <section id="sub-services" className="py-24 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Core Focus Areas</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
            Tailored auditing and management frameworks built for complex industrial, geophysical, and environmental projects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Carte 1 : Integrated Management System (QHSE) */}
          <div className="bg-[#060a17] p-8 rounded-xl border border-[#1e2a52] flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-300 group">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                Integrated Management System (QHSE)
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Designing and implementing unified frameworks to manage Quality, Health, Safety, and Environment in demanding environments.
              </p>
              <ul className="text-slate-300 text-sm space-y-3 mb-6 list-none p-0">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong className="text-white">Focus Points:</strong> Gap analysis, QHSE policy development, and process optimization.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong className="text-white">The &quot;GeoSignal&quot; Edge:</strong> Tailored systems that integrate technical geophysical operations with rigorous safety protocols.</span>
                </li>
              </ul>
            </div>
            <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Learn more ➔
            </Link>
          </div>

          {/* Carte 2 : ISO 9001 - Quality Management */}
          <div className="bg-[#060a17] p-8 rounded-xl border border-[#1e2a52] flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-300 group">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                ISO 9001 – Quality Management
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Ensuring your organization consistently provides products and services that meet customer and regulatory standards.
              </p>
              <ul className="text-slate-300 text-sm space-y-3 mb-6 list-none p-0">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong className="text-white">Focus Points:</strong> Quality control procedures, internal audits, and continuous improvement cycles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong className="text-white">The &quot;GeoSignal&quot; Edge:</strong> Standardizing technical data delivery to ensure zero-defect reports for high-stakes field projects.</span>
                </li>
              </ul>
            </div>
            <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Learn more ➔
            </Link>
          </div>

          {/* Carte 3 : ISO 14001 - Environmental Management */}
          <div className="bg-[#060a17] p-8 rounded-xl border border-[#1e2a52] flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-300 group">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                ISO 14001 – Environmental Management
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Improving environmental performance through efficient resource utilization and systematic waste reduction.
              </p>
              <ul className="text-slate-300 text-sm space-y-3 mb-6 list-none p-0">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong className="text-white">Focus Points:</strong> Environmental Impact Assessments (EIA), carbon footprint monitoring, and mitigation plans.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong className="text-white">The &quot;GeoSignal&quot; Edge:</strong> Specialized expertise in monitoring and minimizing the footprint of heavy field equipment.</span>
                </li>
              </ul>
            </div>
            <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Learn more ➔
            </Link>
          </div>

          {/* Carte 4 : ISO 45001 - Occupational Health & Safety */}
          <div className="bg-[#060a17] p-8 rounded-xl border border-[#1e2a52] flex flex-col justify-between hover:border-cyan-500/50 transition-all duration-300 group">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                ISO 45001 – Health & Safety
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Proactive risk mitigation to prevent workplace injuries and create safe operational environments for field teams.
              </p>
              <ul className="text-slate-300 text-sm space-y-3 mb-6 list-none p-0">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong className="text-white">Focus Points:</strong> Hazard identification, risk assessment (HIRARC), and emergency response readiness.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong className="text-white">The &quot;GeoSignal&quot; Edge:</strong> Field-tested safety auditing for remote operations and high-risk technical surveys.</span>
                </li>
              </ul>
            </div>
            <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
              Learn more ➔
            </Link>
          </div>

        </div>
      </section>

      {/* 4. SECTION PROCESSUS / METHODOLOGIE */}
      <section className="py-20 px-4 bg-[#030712] border-t border-b border-slate-800/80">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">Our Auditing Methodology</h2>
            <p className="text-slate-400 text-sm sm:text-base">A structured, four-step approach to achieving full regulatory compliance.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#070d1e] p-6 rounded-lg border border-slate-800">
              <span className="text-cyan-400 font-mono font-bold text-lg mb-2 block">01. Gap Analysis</span>
              <p className="text-slate-300 text-xs sm:text-sm">Evaluating existing operations against target ISO standards to identify vulnerabilities.</p>
            </div>
            <div className="bg-[#070d1e] p-6 rounded-lg border border-slate-800">
              <span className="text-cyan-400 font-mono font-bold text-lg mb-2 block">02. System Design</span>
              <p className="text-slate-300 text-xs sm:text-sm">Developing custom protocols, documentation, and risk mitigation strategies.</p>
            </div>
            <div className="bg-[#070d1e] p-6 rounded-lg border border-slate-800">
              <span className="text-cyan-400 font-mono font-bold text-lg mb-2 block">03. Audit Execution</span>
              <p className="text-slate-300 text-xs sm:text-sm">Rigorous field and office evaluations to ensure seamless protocol adoption.</p>
            </div>
            <div className="bg-[#070d1e] p-6 rounded-lg border border-slate-800">
              <span className="text-cyan-400 font-mono font-bold text-lg mb-2 block">04. Certification</span>
              <p className="text-slate-300 text-xs sm:text-sm">Guiding your team through official certification and continuous improvement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION CTA / GET IN TOUCH */}
      <section className="py-16 px-4 bg-black flex justify-center items-center">
        <Link 
          href="/contact" 
          className="flex items-center gap-2 px-8 py-3.5 rounded-md bg-[#0a1954] hover:bg-blue-700 text-white font-medium transition-all duration-200 shadow-xl shadow-blue-950/40 hover:scale-105"
        >
          Get in touch ↗
        </Link>
      </section>

      {/* 5. PIED DE PAGE (FOOTER) */}
      <footer className="bg-black border-t border-slate-900 pt-16 pb-12 px-6 lg:px-16 text-slate-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Colonne 1 : Infos de la marque + Newsletter */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <h3 className="text-white text-xl font-bold">GeoSignal Analytics</h3>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Where Geophysics Meets Artificial Intelligence. Delivering high-fidelity subsurface and environmental solutions across the globe.
            </p>
            <div>
              <p className="text-white text-sm font-semibold mb-3">Join our newsletter</p>
              <form className="flex items-center gap-2 max-w-sm" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  className="bg-[#0a0f1d] border border-slate-800 rounded-md px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 flex-1"
                />
                <button 
                  type="submit" 
                  className="bg-[#0a1954] hover:bg-blue-800 text-white text-sm font-medium px-5 py-2 rounded-md transition-colors cursor-pointer"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Colonne 2 : Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-sm">Links</h4>
            <ul className="space-y-2.5 text-sm list-none p-0 m-0">
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="#sub-services" className="hover:text-white transition-colors">The GeoSignal Approach</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Case studies</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">Benefits</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">How We Collaborate</Link></li>
            </ul>
          </div>

          {/* Colonne 3 : Pages */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-sm">Pages</h4>
            <ul className="space-y-2.5 text-sm list-none p-0 m-0">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/institute" className="hover:text-white transition-colors">GeoSignal Institute</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Colonne 4 : Socials */}
          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-sm">Socials</h4>
            <ul className="space-y-2.5 text-sm list-none p-0 m-0">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a></li>
            </ul>
          </div>

        </div>

        {/* Ligne inférieure du Footer */}
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-400">
          
          {/* Logo Footer - rendu identique au Header */}
          <div className="flex items-center rounded-lg bg-white px-2.5 py-1 shadow-md">
            <Image 
              src="/images/logo.png" 
              alt="GeoSignal Analytics Logo Footer" 
              width={150} 
              height={40} 
              className="h-8 w-auto object-contain"
            />
          </div>

          <div className="text-center md:text-left">
            Developed and designed by Dr. Innocent Oboué, PhD
          </div>
          <div className="text-center md:text-right">
            © 2026 GeoSignal Analytics LLC | All Rights Reserved
          </div>
        </div>
      </footer>

    </main>
  );
}