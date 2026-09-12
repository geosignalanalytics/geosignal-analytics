'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

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

const NAV_DROPDOWN_ITEMS = [
  { href: '/institute', label: 'Overview' },
  { href: '/institute/about', label: 'About Us' },
  { href: '/institute/training', label: 'Training' },
  { href: '/institute/research', label: 'Research' },
  { href: '/institute/publications', label: 'Publications' },
];

const SUB_SERVICES = [
  {
    title: 'Hydrological & Hydrogeological Studies',
    summary:
      'In-depth characterization of surface and groundwater systems to analyze flow dynamics, recharge rates, and water quality.',
    focus: 'Catchment area analysis, aquifer parameter estimation, 3D hydrodynamic modeling.',
    edge: 'Predicting aquifer behavior under climate variability and intensive extraction scenarios.',
  },
  {
    title: 'Water Resource Planning & Management',
    summary:
      'Strategic frameworks for the sustainable exploitation, management, and long-term protection of critical water assets.',
    focus: 'Integrated Water Resources Management (IWRM), drought risk modeling, regulatory compliance.',
    edge: 'Custom spatial dashboards for real-time tracking of groundwater levels and multi-site extraction.',
  },
  {
    title: 'Geophysical Groundwater Exploration',
    summary:
      'Non-invasive subsurface imaging to locate high-yield aquifers and optimize well-drilling success rates.',
    focus: 'Electrical Resistivity Tomography (ERT), Magnetic Resonance Sounding (MRS), Seismic Refraction.',
    edge: 'AI-assisted signal interpretation to accurately delineate freshwater-saline interfaces at depth.',
  },
  {
    title: 'Water Quality & Contamination Tracking',
    summary:
      'Advanced monitoring and mapping solutions to safeguard water resources from industrial pollutants and saline intrusion.',
    focus: 'Salinity mapping, industrial pollutant plume tracing, protective wellhead zoning.',
    edge: 'Time-lapse geophysical monitoring to track underground contaminant transport in real time.',
  },
];

const METHODOLOGY = [
  { step: '01', title: 'Data Acquisition', text: 'High-resolution ERT, MRS, and hydrological sampling across target catchment zones.' },
  { step: '02', title: 'Signal Processing', text: 'AI-driven noise attenuation and multi-dimensional inversion of subsurface resistivity models.' },
  { step: '03', title: 'Hydrodynamic Modeling', text: '3D spatial simulation of aquifer storage, flow paths, and recharge capacities.' },
  { step: '04', title: 'Sustainable Strategy', text: 'Actionable monitoring protocols and drilling recommendations for long-term water security.' },
];

export default function WaterResourcesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);

  // Live telemetry dashboard state
  const [stations] = useState<MonitoringStation[]>([
    { id: 'ST-01', name: 'Northern Regional Aquifer', location: 'Basin 1 - Coastal Sector', depth: '140 m', status: 'optimal', ph: 7.2, tds: 240, flowRate: 85, salinity: 0.3 },
    { id: 'ST-02', name: 'Eastern Industrial Zone', location: 'Extraction Wellhead #4', depth: '85 m', status: 'warning', ph: 6.5, tds: 610, flowRate: 42, salinity: 0.8 },
    { id: 'ST-03', name: 'Western Agricultural Belt', location: 'Infiltration Basin', depth: '210 m', status: 'optimal', ph: 7.4, tds: 310, flowRate: 120, salinity: 0.4 },
    { id: 'ST-04', name: 'Southern Coastal Margin', location: 'Fresh/Saline Water Interface', depth: '60 m', status: 'alert', ph: 8.1, tds: 1250, flowRate: 18, salinity: 3.2 },
  ]);

  const [selectedStation, setSelectedStation] = useState<MonitoringStation>(stations[0]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'optimal' | 'warning' | 'alert'>('all');
  const [showProposalModal, setShowProposalModal] = useState(false);

  const filteredStations = stations.filter(s => activeFilter === 'all' || s.status === activeFilter);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
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
      <nav aria-label="Main Navigation" className="sticky top-0 z-50 border-b border-slate-800/70 bg-[#060a12] px-6 py-3.5 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center rounded-md bg-white px-2.5 py-1">
              <Image
                src="/images/logo.png"
                alt="GeoSignal Analytics"
                width={150}
                height={40}
                className="h-7 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* MAIN MENU LINKS */}
          <ul className="hidden md:flex items-center gap-9 text-[13.5px] font-medium text-slate-400 m-0 p-0 list-none">
            <li><Link href="/" className="hover:text-slate-200 transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-slate-200 transition-colors">About</Link></li>

            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 focus:outline-none transition-colors"
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
                <div className="absolute left-0 mt-4 w-56 rounded-lg border border-slate-800 bg-[#0b1329] p-1.5 shadow-xl z-50">
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
              <Link href="/services" className="text-white border-b-2 border-cyan-500 pb-1">
                Services
              </Link>
            </li>
          </ul>

          {/* LANGUAGE SELECTOR & CONTACT ACTION BUTTON */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
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
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section
        className="relative border-b border-slate-800/70 px-6 pt-20 pb-24 md:px-12 md:pt-28 md:pb-32 bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6, 10, 18, 0.85), rgba(6, 10, 18, 0.92)), url('/images/water-resources-bg.jpg')",
        }}
      >
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)',
          }}
        />

        {/* GEOPHYSICAL RADAR / HYDROLOGICAL WAVE PULSE */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/10 animate-ping [animation-duration:4s]" />
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/5 animate-ping [animation-duration:4s] [animation-delay:2s]" />
        </div>

        <div className="relative mx-auto max-w-7xl z-10">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-5">
              Hydrogeology &amp; Smart Water Security
            </p>
            <h1 className="text-[2.3rem] leading-[1.12] sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-5">
              Water Resources &amp; Analytics
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-10">
              We deliver integrated water resources expertise for sustainable management, groundwater exploration, and hydrological planning. By combining hydrogeological science with geophysical precision and AI modeling, we secure water resources for industrial, agricultural, and municipal needs.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setShowProposalModal(true)}
                className="rounded-md bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-500 transition-colors inline-block cursor-pointer"
              >
                Discuss your project
              </button>
              <Link
                href="#sub-services"
                className="rounded-md border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-cyan-600 hover:text-white transition-colors inline-block"
              >
                View domains
              </Link>
              <Link
                href="#telemetry-dashboard"
                className="rounded-md bg-[#0b1329] border border-slate-700/80 px-6 py-3 text-sm font-semibold text-cyan-400 hover:border-cyan-500 hover:text-cyan-300 transition-colors inline-block"
              >
                Live Monitoring Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DASHBOARD SECTION */}
      <section id="telemetry-dashboard" className="border-b border-slate-800/80 bg-[#030712] px-6 py-16 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <span className="text-cyan-500 text-xs font-semibold uppercase tracking-widest block mb-1">Interactive Intelligence</span>
              <h2 className="text-2xl font-bold text-white">Subsurface Telemetry &amp; Aquifer Monitoring</h2>
              <p className="text-slate-400 text-sm mt-1">Real-time geophysical and water quality metrics interpretation.</p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 bg-[#0b1329] p-1.5 rounded-lg border border-slate-800">
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
            {/* Station List */}
            <div className="lg:col-span-1 bg-[#0b1329] border border-slate-800/80 rounded-xl p-4 flex flex-col gap-3">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Monitoring Wells</h3>
              {filteredStations.map((station) => (
                <button
                  key={station.id}
                  onClick={() => setSelectedStation(station)}
                  className={`text-left p-3.5 rounded-lg border transition-all cursor-pointer ${
                    selectedStation.id === station.id
                      ? 'bg-[#060a12] border-cyan-500 shadow-md'
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

            {/* Telemetry Details */}
            <div className="lg:col-span-2 bg-[#0b1329] border border-slate-800/80 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start pb-4 mb-6 border-b border-slate-800/80">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-bold text-white">{selectedStation.name}</h3>
                      <span className="text-xs text-slate-400 font-mono bg-[#060a12] px-2 py-1 rounded border border-slate-800">
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

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="bg-[#060a12] p-4 rounded-lg border border-slate-800/80">
                    <span className="text-xs text-slate-400 block mb-1">pH Level</span>
                    <span className="text-2xl font-bold text-white font-mono">{selectedStation.ph}</span>
                    <span className="text-[10px] text-slate-500 block mt-1">Normal: 6.5 - 8.5</span>
                  </div>
                  <div className="bg-[#060a12] p-4 rounded-lg border border-slate-800/80">
                    <span className="text-xs text-slate-400 block mb-1">TDS (Solids)</span>
                    <span className="text-2xl font-bold text-white font-mono">{selectedStation.tds} <span className="text-xs font-normal text-slate-400">ppm</span></span>
                    <span className="text-[10px] text-slate-500 block mt-1">Target: &lt; 500 ppm</span>
                  </div>
                  <div className="bg-[#060a12] p-4 rounded-lg border border-slate-800/80">
                    <span className="text-xs text-slate-400 block mb-1">Pumping Rate</span>
                    <span className="text-2xl font-bold text-cyan-400 font-mono">{selectedStation.flowRate} <span className="text-xs font-normal text-slate-400">m³/h</span></span>
                    <span className="text-[10px] text-slate-500 block mt-1">Yield Efficiency</span>
                  </div>
                  <div className="bg-[#060a12] p-4 rounded-lg border border-slate-800/80">
                    <span className="text-xs text-slate-400 block mb-1">Salinity Index</span>
                    <span className="text-2xl font-bold text-white font-mono">{selectedStation.salinity} <span className="text-xs font-normal text-slate-400">ppt</span></span>
                    <span className="text-[10px] text-slate-500 block mt-1">Intrusion Metric</span>
                  </div>
                </div>

                {/* AI Insight Box */}
                <div className="bg-[#060a12] border border-cyan-900/40 rounded-lg p-4">
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

              <div className="mt-6 pt-4 border-t border-slate-800/80 flex justify-between items-center text-xs text-slate-500">
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

      {/* DOMAINS / SUB-SERVICES SECTION */}
      <main id="sub-services" className="max-w-6xl mx-auto px-6 md:px-12 py-16 flex-1 w-full">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">Domains Covered</h2>
          <p className="text-slate-400 text-sm max-w-2xl">
            Combining non-invasive geophysics, hydraulic modeling, and spatial analytics to solve complex water challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SUB_SERVICES.map((service) => (
            <article
              key={service.title}
              className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">{service.summary}</p>

                <div className="border-t border-slate-800/80 pt-5 space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">What we cover</span>
                    <p className="text-xs sm:text-sm text-slate-400">{service.focus}</p>
                  </div>
                  <div className="space-y-1.5 pt-3 border-t border-slate-800/40">
                    <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 block">Our approach</span>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{service.edge}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/40">
                <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors">
                  Learn more <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* METHODOLOGY SECTION */}
      <section className="border-t border-slate-800/80 bg-[#030712] px-6 py-16 md:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">Our Water Investigation Workflow</h2>
            <p className="text-slate-400 text-sm">A rigorous four-step method for high-precision water intelligence.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {METHODOLOGY.map((m) => (
              <div key={m.step} className="bg-[#0b1329] border border-slate-800/80 rounded-lg p-6">
                <span className="text-cyan-400 font-mono font-bold text-sm block mb-2">{m.step}</span>
                <h3 className="text-white font-semibold text-sm mb-2">{m.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROPOSAL CTA BUTTON */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 w-full flex justify-center">
        <button
          onClick={() => setShowProposalModal(true)}
          className="rounded-md bg-cyan-600 hover:bg-cyan-500 px-8 py-3.5 text-sm font-semibold text-white transition-colors cursor-pointer"
        >
          Request a Technical Proposal ↗
        </button>
      </div>

      {/* MODAL FORM */}
      {showProposalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b1329] border border-slate-800/90 rounded-xl p-6 sm:p-8 max-w-xl w-full shadow-2xl relative">
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
                <input type="text" required placeholder="Dr. John Doe" className="w-full bg-[#060a12] border border-slate-800 rounded-md px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Work Email</label>
                  <input type="email" required placeholder="j.doe@company.com" className="w-full bg-[#060a12] border border-slate-800 rounded-md px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Organization / Agency</label>
                  <input type="text" placeholder="Mining / Municipality / Enterprise" className="w-full bg-[#060a12] border border-slate-800 rounded-md px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Primary Service Requirement</label>
                <select className="w-full bg-[#060a12] border border-slate-800 rounded-md px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500">
                  <option>Hydrological &amp; Hydrogeological Studies</option>
                  <option>Water Resource Planning &amp; Management</option>
                  <option>Geophysical Groundwater Exploration (ERT, MRS, Seismic)</option>
                  <option>Water Quality &amp; Environmental Contamination Tracking</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Project Details &amp; Target Location</label>
                <textarea rows={3} placeholder="Describe site conditions, estimated target depths, or objectives..." className="w-full bg-[#060a12] border border-slate-800 rounded-md px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"></textarea>
              </div>
              <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-3 rounded-md transition-colors mt-2 cursor-pointer text-sm">
                Submit Technical Request
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-800/80 bg-[#030712] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">

            <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
              <h3 className="text-lg font-bold text-white tracking-wide">
                GeoSignal Analytics
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
                Geophysics and artificial intelligence supporting exploration projects
                and environmental studies.
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
                  <li><Link href="/services/advanced-geophysics-and-ai" className="hover:text-white transition-colors">Advanced Geophysics</Link></li>
                  <li><Link href="/services/geoscience-and-exploration" className="hover:text-white transition-colors">Exploration</Link></li>
                  <li><Link href="/services/water-resources" className="hover:text-white transition-colors">Water Resources</Link></li>
                  <li><Link href="/services/mapping-gis-and-remote-sensing" className="hover:text-white transition-colors">GIS &amp; Remote Sensing</Link></li>
                  <li><Link href="/services/environmental-solutions" className="hover:text-white transition-colors">Environment</Link></li>
                  <li><Link href="/services/qhse" className="hover:text-white transition-colors">QHSE Consulting</Link></li>
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
                  Social
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

          <div className="border-t border-slate-800/80 pt-6">
            <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-500 text-center md:flex-row md:text-left">
              <div className="bg-white rounded-md px-3 py-1.5 flex items-center justify-center">
                <Image
                  src="/images/logo.png"
                  alt="GeoSignal Analytics"
                  width={120}
                  height={35}
                  className="h-8 w-auto object-contain"
                />
              </div>
              <p className="text-slate-500 m-0">
                © {currentYear ?? 2026} GeoSignal Analytics — All rights reserved
              </p>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}