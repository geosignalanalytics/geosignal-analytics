"use client";

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MonitoringStation {
  id: string;
  name: string;
  location: string;
  depth: string;
  status: 'optimal' | 'warning' | 'alert';
  ph: number;
  tds: number; // Total Dissolved Solids (ppm)
  flowRate: number; // m3/h
  salinity: number; // ppt
}

export default function WaterResourcesPage() {
  // État du menu déroulant de l'entête
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Ferme le menu si l'utilisateur clique en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Données de simulation pour le suivi des stations de surveillance hydrogéologique
  const [stations, setStations] = useState<MonitoringStation[]>([
    { id: 'ST-01', name: 'Aquifère Régional Nord', location: 'Bassin 1 - Côte Nord', depth: '140 m', status: 'optimal', ph: 7.2, tds: 240, flowRate: 85, salinity: 0.3 },
    { id: 'ST-02', name: 'Zone Industrielle Est', location: 'Puits de captage #4', depth: '85 m', status: 'warning', ph: 6.5, tds: 610, flowRate: 42, salinity: 0.8 },
    { id: 'ST-03', name: 'Périmètre Agricole Ouest', location: 'Bassin d\'infiltration', depth: '210 m', status: 'optimal', ph: 7.4, tds: 310, flowRate: 120, salinity: 0.4 },
    { id: 'ST-04', name: 'Bassin Côtier Sud', location: 'Interface Eau Douce / Salée', depth: '60 m', status: 'alert', ph: 8.1, tds: 1250, flowRate: 18, salinity: 3.2 },
  ]);

  const [selectedStation, setSelectedStation] = useState<MonitoringStation>(stations[0]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'optimal' | 'warning' | 'alert'>('all');
  const [showProposalModal, setShowProposalModal] = useState(false);

  const filteredStations = stations.filter(s => activeFilter === 'all' || s.status === activeFilter);

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
        className="relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 md:pt-40 md:pb-32 bg-cover bg-center bg-no-repeat border-b border-slate-800 overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.70), rgba(0, 0, 0, 0.85)), url('/images/water-resources-bg.jpg')"
        }}
      >
      {/* EFFET D'ONDE GÉOPHYSIQUE / ACOUSTIQUE (Radar/Sonar) */}
<div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
  {/* Première onde */}
  <div 
    className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full bg-cyan-500/5 border border-cyan-500/30 animate-ping" 
    style={{ animationDuration: '4s', animationDelay: '0s' }}
  />
  {/* Deuxième onde (parfaitement décalée de 2 secondes) */}
  <div 
    className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full bg-cyan-500/5 border border-cyan-500/20 animate-ping" 
    style={{ animationDuration: '4s', animationDelay: '4s' }}
  />
</div>

        <div className="max-w-4xl mx-auto z-10 relative">
          <div className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-cyan-400 uppercase bg-cyan-950/60 border border-cyan-800 rounded-full">
            Hydrogeology & Smart Water Security
          </div>
          
          {/* TITRE AVEC DÉGRADÉ CYAN ANIMÉ LENTEMENT */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight bg-gradient-to-r from-white via-cyan-400 to-white bg-[length:200%_auto] text-transparent bg-clip-text animate-[gradient_8s_ease_infinite]">
            Water Resources & Analytics
          </h1>
          
          <p className="text-base sm:text-lg text-slate-200 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            We provide integrated water resources expertise to support sustainable water management, groundwater exploration, and hydrological planning. By merging hydrogeological science with geophysical precision and AI modeling, we ensure long-term water security for industrial, agricultural, and community needs.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => setShowProposalModal(true)}
              className="px-6 py-3 rounded-md bg-cyan-600 hover:bg-cyan-500 text-white font-semibold transition-all duration-300 shadow-lg shadow-cyan-600/20 cursor-pointer hover:scale-[1.02]"
            >
              Discuss Your Project
            </button>
            <a 
              href="#sub-services" 
              className="px-6 py-3 rounded-md bg-[#0b1329] border border-slate-700 hover:border-cyan-500 text-white font-medium transition-all duration-300 shadow-lg hover:scale-[1.02]"
            >
              Explore Our Expertise
            </a>
            <a 
              href="#telemetry-dashboard" 
              className="px-6 py-3 rounded-md bg-slate-900/80 hover:bg-slate-800 text-cyan-400 font-medium transition-all duration-300 shadow-lg border border-slate-800 hover:border-cyan-500/50 hover:scale-[1.02]"
            >
              Live Monitoring Dashboard
            </a>
          </div>
        </div>
      </section>

      {/* 3. SECTION METRIQUES EN TEMPS REEL (Dashboard) */}
      <section id="telemetry-dashboard" className="py-20 px-6 bg-[#040812] border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <span className="text-cyan-400 text-sm font-semibold tracking-wide uppercase">Interactive Intelligence</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-1">Subsurface Telemetry & Aquifer Monitoring</h2>
              <p className="text-slate-400 text-sm mt-1">Real-time geophysical & water quality metrics interpretation</p>
            </div>
            
            {/* Filtres d'état */}
            <div className="flex items-center gap-2 bg-[#0a101f] p-1.5 rounded-lg border border-slate-800">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer ${activeFilter === 'all' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                All Stations ({stations.length})
              </button>
              <button 
                onClick={() => setActiveFilter('optimal')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer ${activeFilter === 'optimal' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Optimal
              </button>
              <button 
                onClick={() => setActiveFilter('warning')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer ${activeFilter === 'warning' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Warning
              </button>
              <button 
                onClick={() => setActiveFilter('alert')}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-all cursor-pointer ${activeFilter === 'alert' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Alert
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Liste des stations */}
            <div className="lg:col-span-1 bg-[#060b18] border border-slate-800 rounded-xl p-4 flex flex-col gap-3">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-2">Monitoring Wells</h3>
              {filteredStations.map((station) => (
                <button
                  key={station.id}
                  onClick={() => setSelectedStation(station)}
                  className={`text-left p-3.5 rounded-lg border transition-all cursor-pointer ${
                    selectedStation.id === station.id 
                      ? 'bg-[#0d1b3d] border-cyan-500 shadow-md' 
                      : 'bg-[#080f21] border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-white text-sm">{station.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      station.status === 'optimal' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                      station.status === 'warning' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                      'bg-rose-950 text-rose-400 border border-rose-800'
                    }`}>
                      {station.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex justify-between">
                    <span>{station.location}</span>
                    <span className="text-cyan-400 font-mono">{station.depth}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Détails télémétriques */}
            <div className="lg:col-span-2 bg-[#060b18] border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start pb-4 mb-6 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-white">{selectedStation.name}</h3>
                      <span className="text-xs text-slate-400 font-mono bg-slate-900 px-2 py-1 rounded border border-slate-800">
                        {selectedStation.id}
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 mt-1">{selectedStation.location} • Target Depth: <span className="text-slate-200">{selectedStation.depth}</span></p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block">Status</span>
                    <span className={`font-semibold capitalize text-sm ${
                      selectedStation.status === 'optimal' ? 'text-emerald-400' :
                      selectedStation.status === 'warning' ? 'text-amber-400' : 'text-rose-400'
                    }`}>
                      {selectedStation.status} Condition
                    </span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="bg-[#091126] p-4 rounded-lg border border-slate-800/80">
                    <span className="text-xs text-slate-400 block mb-1">pH Level</span>
                    <span className="text-2xl font-bold text-white font-mono">{selectedStation.ph}</span>
                    <span className="text-[10px] text-slate-500 block mt-1">Normal Range: 6.5 - 8.5</span>
                  </div>
                  <div className="bg-[#091126] p-4 rounded-lg border border-slate-800/80">
                    <span className="text-xs text-slate-400 block mb-1">TDS (Dissolved Solids)</span>
                    <span className="text-2xl font-bold text-white font-mono">{selectedStation.tds} <span className="text-xs font-normal text-slate-400">ppm</span></span>
                    <span className="text-[10px] text-slate-500 block mt-1">Target: &lt; 500 ppm</span>
                  </div>
                  <div className="bg-[#091126] p-4 rounded-lg border border-slate-800/80">
                    <span className="text-xs text-slate-400 block mb-1">Pumping Rate</span>
                    <span className="text-2xl font-bold text-cyan-400 font-mono">{selectedStation.flowRate} <span className="text-xs font-normal text-slate-400">m³/h</span></span>
                    <span className="text-[10px] text-slate-500 block mt-1">Yield Efficiency</span>
                  </div>
                  <div className="bg-[#091126] p-4 rounded-lg border border-slate-800/80">
                    <span className="text-xs text-slate-400 block mb-1">Salinity Index</span>
                    <span className="text-2xl font-bold text-white font-mono">{selectedStation.salinity} <span className="text-xs font-normal text-slate-400">ppt</span></span>
                    <span className="text-[10px] text-slate-500 block mt-1">Intrusion Metric</span>
                  </div>
                </div>

                {/* AI Insight */}
                <div className="bg-[#0a152e] border border-cyan-900/40 rounded-lg p-4">
                  <h4 className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    GeoSignal Analytics Insight
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {selectedStation.status === 'optimal' && "Aquifer hydraulic head is stable. Electrical resistivity tomography confirms no saline intrusion risk in the immediate 500m radius."}
                    {selectedStation.status === 'warning' && "Elevated TDS detected. Recommending time-lapse 2D ERT profile to delineate potential surface runoff migration."}
                    {selectedStation.status === 'alert' && "High salinity signature detected at depth. Immediate reduction of extraction rates recommended to prevent coastal saltwater upconing."}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs text-slate-500">
                <span>Last telemetry refresh: Live Sync</span>
                <button 
                  onClick={() => setShowProposalModal(true)}
                  className="text-cyan-400 hover:text-cyan-300 font-medium cursor-pointer"
                >
                  Download Full Geophysical Report ➔
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION CONTENUS / SOUS-SERVICES (Les 4 cartes) */}
      <section id="sub-services" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Core Water Solutions</h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            Combining non-invasive geophysics, hydraulic modeling, and spatial analytics to solve complex water challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Carte 1 */}
          <div className="bg-[#060a17] p-8 rounded-xl border border-[#1e2a52] flex flex-col justify-start hover:border-cyan-500/50 transition-all group">
            <h3 className="text-2xl font-bold text-white mb-4 text-center group-hover:text-cyan-400 transition-colors">Hydrological &<br/>Hydrogeological Studies</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              In-depth characterization of surface and groundwater systems to understand flow, recharge, and quality.
            </p>
            <ul className="text-slate-300 text-sm space-y-3 mb-4 list-none p-0">
              <li><strong className="text-white">• Focus Points:</strong> Catchment area analysis, aquifer parameter estimation, and 3D hydrodynamic modeling.</li>
              <li>
                <strong className="text-white">• The &quot;GeoSignal&quot; Edge:</strong> Predicting aquifer behavior under climate change and intensive extraction scenarios.{' '}
                <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-medium">
                  [ Learn more ➔ ]
                </Link>
              </li>
            </ul>
          </div>

          {/* Carte 2 */}
          <div className="bg-[#060a17] p-8 rounded-xl border border-[#1e2a52] flex flex-col justify-start hover:border-cyan-500/50 transition-all group">
            <h3 className="text-2xl font-bold text-white mb-4 text-center group-hover:text-cyan-400 transition-colors">Water Resource<br/>Planning & Management</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Strategic frameworks for the sustainable use and protection of water assets.
            </p>
            <ul className="text-slate-300 text-sm space-y-3 mb-4 list-none p-0">
              <li><strong className="text-white">• Focus Points:</strong> Integrated Water Resources Management (IWRM), drought risk assessment, and regulatory compliance.</li>
              <li>
                <strong className="text-white">• The &quot;GeoSignal&quot; Edge:</strong> Custom GIS dashboards for real-time monitoring of water levels and usage across multiple sites.{' '}
                <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-medium">
                  [ Learn more ➔ ]
                </Link>
              </li>
            </ul>
          </div>

          {/* Carte 3 */}
          <div className="bg-[#060a17] p-8 rounded-xl border border-[#1e2a52] flex flex-col justify-start hover:border-cyan-500/50 transition-all group">
            <h3 className="text-2xl font-bold text-white mb-4 text-center group-hover:text-cyan-400 transition-colors">Geophysical<br/>Groundwater Exploration</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Non-invasive subsurface imaging to pinpoint high-potential drilling locations and reduce failure rates.
            </p>
            <ul className="text-slate-300 text-sm space-y-3 mb-4 list-none p-0">
              <li><strong className="text-white">• Focus Points:</strong> Electrical Resistivity Tomography (ERT), Magnetic Resonance Sounding (MRS), and Seismic Refraction.</li>
              <li>
                <strong className="text-white">• The &quot;GeoSignal&quot; Edge:</strong> AI-enhanced interpretation to distinguish between saline and fresh water layers with high accuracy.{' '}
                <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-medium">
                  [ Learn more ➔ ]
                </Link>
              </li>
            </ul>
          </div>

          {/* Carte 4 */}
          <div className="bg-[#060a17] p-8 rounded-xl border border-[#1e2a52] flex flex-col justify-start hover:border-cyan-500/50 transition-all group">
            <h3 className="text-2xl font-bold text-white mb-4 text-center group-hover:text-cyan-400 transition-colors">Water Quality &<br/>Environmental Protection</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Monitoring and safeguarding water resources from contamination and industrial impact.
            </p>
            <ul className="text-slate-300 text-sm space-y-3 mb-4 list-none p-0">
              <li><strong className="text-white">• Focus Points:</strong> Salinity mapping, industrial pollutant plume tracking, and design of protection zones.</li>
              <li>
                <strong className="text-white">• The &quot;GeoSignal&quot; Edge:</strong> Time-lapse geophysical monitoring to track the evolution of underground contamination in real-time.{' '}
                <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 font-medium">
                  [ Learn more ➔ ]
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bouton Proposal */}
        <div className="mt-12 flex justify-center">
          <button 
            onClick={() => setShowProposalModal(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-md bg-[#0a1954] hover:bg-blue-800 text-white font-medium transition-colors shadow-lg cursor-pointer"
          >
            Request a Technical Proposal ↗
          </button>
        </div>
      </section>

      {/* MODAL INTERACTIF */}
      {showProposalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#070d1e] border border-slate-800 rounded-xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative">
            <button 
              onClick={() => setShowProposalModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-2xl font-bold text-white mb-2">Request a Technical Proposal</h3>
            <p className="text-slate-400 text-sm mb-6">Provide your project specifications and our hydrogeophysical team will respond within 24 hours.</p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Proposal request submitted successfully!'); setShowProposalModal(false); }} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                <input type="text" required placeholder="Dr. John Doe" className="w-full bg-[#0a1226] border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email</label>
                  <input type="email" required placeholder="j.doe@company.com" className="w-full bg-[#0a1226] border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Organization / Agency</label>
                  <input type="text" placeholder="Mining / Municipality / Enterprise" className="w-full bg-[#0a1226] border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Service Requirement</label>
                <select className="w-full bg-[#0a1226] border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500">
                  <option>Hydrological & Hydrogeological Studies</option>
                  <option>Water Resource Planning & Management</option>
                  <option>Geophysical Groundwater Exploration (ERT, MRS, Seismic)</option>
                  <option>Water Quality & Environmental Contamination Tracking</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Details & Target Location</label>
                <textarea rows={3} placeholder="Describe site conditions, estimated target depths, or objectives..." className="w-full bg-[#0a1226] border border-slate-800 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 rounded transition-colors mt-2 cursor-pointer">
                Submit Technical Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 5. FOOTER */}
      <footer className="bg-black border-t border-slate-900 pt-16 pb-12 px-6 lg:px-16 text-slate-400">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
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

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-sm">Links</h4>
            <ul className="space-y-2.5 text-sm list-none p-0 m-0">
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="#sub-services" className="hover:text-white transition-colors">The GeoSignal Approach</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Case studies</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Benefits</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">How We Collaborate</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-sm">Pages</h4>
            <ul className="space-y-2.5 text-sm list-none p-0 m-0">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">404</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <h4 className="text-white font-semibold text-sm">Socials</h4>
            <ul className="space-y-2.5 text-sm list-none p-0 m-0">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Linkedin</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a></li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6 text-xs text-slate-400">
          
          {/* Logo Footer - rendu identique à la Navbar */}
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