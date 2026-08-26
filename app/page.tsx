'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  // État pour gérer les accordéons de la section FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How does GeoSignal Analytics integrate AI into seismic data processing?",
      a: "We combine physics-informed machine learning algorithms (such as PINNs and multidimensional reconstruction frameworks) with traditional wave equation solvers. This drastically suppresses noise and interpolates missing spatial data while preserving physical wavefield validity."
    },
    {
      q: "What is the distinction between GeoSignal Analytics and GeoSignal Institute?",
      a: "GeoSignal Analytics is the commercial parent entity delivering specialized consulting, industrial processing, and enterprise geoscientific solutions. GeoSignal Institute serves as our dedicated academic R&D arm, advancing open research, publications, and professional training."
    },
    {
      q: "What types of industries do you partner with?",
      a: "We support natural resource exploration (minerals, hydrocarbons), hydrogeological and water infrastructure projects, civil geotechnical engineering, and environmental compliance organizations."
    },
    {
      q: "Can your workflows integrate with existing seismic and GIS software?",
      a: "Yes. Our processing pipelines export high-resolution deliverables in standard industry formats (SEG-Y, GeoTIFF, SHP, NetCDF) compatible with standard interpretation tools."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white flex flex-col antialiased">
      
      {/* 1. LA BARRE DE NAVIGATION */}
      <nav className="sticky top-0 z-50 border-b border-slate-800 bg-[#050b14]/90 px-6 py-4 backdrop-blur-md md:px-12">
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
            <li>
              <Link href="/" className="text-white font-semibold transition-colors hover:text-cyan-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition-colors hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link href="/institute" className="transition-colors hover:text-cyan-400">
                GeoSignal Institute
              </Link>
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

      {/* 2. HERO SECTION */}
      <section 
        className="relative overflow-hidden border-b border-slate-800 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-[#050b14] to-[#050b14] px-6 py-28 text-center md:px-12"
      >
        {/* Effet d'onde géophysique en arrière-plan */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/10 animate-ping [animation-duration:4s]" />
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/5 animate-ping [animation-duration:6s] delay-1000" />
        </div>

        {/* Conteneur principal (z-10 pour rester au-dessus de l'onde) */}
        <div className="relative mx-auto max-w-5xl z-10">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-[#0b1329] border border-cyan-500/30 rounded-full mb-6">
            Advanced Applied Geophysics &amp; Data Science
          </span>
          
          {/* Titre principal avec dégradé cyan animé */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-tight bg-gradient-to-r from-white via-cyan-400 to-white bg-[length:200%_auto] text-transparent bg-clip-text animate-[gradient_8s_ease_infinite]">
            Earth Intelligence Powered by Advanced Geophysics
          </h1>
          
          <p className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Delivering high-resolution subsurface imaging, AI-driven signal reconstruction, and environmental risk assessment for industrial and resource operations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="#sectors" 
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-cyan-600/20 transition-all hover:bg-cyan-500"
            >
              Explore Our Services
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 rounded-xl bg-[#0b1329] border border-slate-800 px-7 py-3.5 text-sm font-semibold text-slate-200 transition-all hover:bg-slate-800 hover:text-white"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>


      {/* MAIN CONTAINER (ALIGNEMENT HOMOGÈNE DES MARGES) */}
      <main className="mx-auto max-w-7xl px-6 md:px-12 py-16 w-full space-y-24 flex-1">

        {/* 3. KEY SECTORS */}
        <section id="sectors" className="scroll-mt-24">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300 bg-[#080f1e] border border-slate-800 rounded-full mb-4">
              Core Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-4xl mx-auto leading-tight mb-4 tracking-tight">
              Data-Driven Solutions for Earth &amp; Resources
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
              GeoSignal Analytics bridges physical earth principles and modern computational architectures, providing targeted expertise across key industrial sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Service 1 */}
            <div className="bg-[#0b1329] p-8 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition duration-300 flex flex-col justify-between shadow-xl">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Advanced Geophysics &amp; AI</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Proprietary algorithmic frameworks and machine learning models for high-resolution seismic data processing, spatial alias recovery, and multidimensional signal denoising.
                </p>
              </div>
              <Link href="/services/advanced-geophysics-and-ai" className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors">
                Learn more &rarr;
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-[#0b1329] p-8 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition duration-300 flex flex-col justify-between shadow-xl">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Geoscience &amp; Exploration</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Integrated geological and geophysical characterization to de-risk resource exploration, locate mineralized structures, and optimize field acquisition campaigns.
                </p>
              </div>
              <Link href="/services/geoscience-and-exploration" className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors">
                Learn more &rarr;
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-[#0b1329] p-8 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition duration-300 flex flex-col justify-between shadow-xl">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Water Resources</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Hydrogeophysical surveys, aquifer mapping, and predictive groundwater modeling designed to ensure sustainable water management for municipal and industrial use.
                </p>
              </div>
              <Link href="/services/water-resources" className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors">
                Learn more &rarr;
              </Link>
            </div>

            {/* Service 4 */}
            <div className="bg-[#0b1329] p-8 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition duration-300 flex flex-col justify-between shadow-xl">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Mapping, GIS &amp; Remote Sensing</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Multi-spectral spatial data integration, thematic GIS mapping, and satellite image analysis for precise territorial monitoring and environmental asset tracking.
                </p>
              </div>
              <Link href="/services/mapping-gis-and-remote-sensing" className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors">
                Learn more &rarr;
              </Link>
            </div>

            {/* Service 5 */}
            <div className="bg-[#0b1329] p-8 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition duration-300 flex flex-col justify-between shadow-xl">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">Environmental Solutions</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Non-invasive shallow subsurface imaging, hazard monitoring, and environmental baseline studies supporting sustainable infrastructure and land remediation.
                </p>
              </div>
              <Link href="/services/environmental-solutions" className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors">
                Learn more &rarr;
              </Link>
            </div>

            {/* Service 6 */}
            <div className="bg-[#0b1329] p-8 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition duration-300 flex flex-col justify-between shadow-xl">
              <div>
                <h3 className="text-xl font-bold text-white mb-3">QHSE Advisory</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Rigorous operational safety frameworks, ISO-compliant risk management, and environmental auditing tailored for complex field acquisition programs.
                </p>
              </div>
              <Link href="/services/qhse" className="inline-flex items-center text-xs font-semibold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors">
                Learn more &rarr;
              </Link>
            </div>

          </div>
        </section>
        
        {/* 4. THE GEOSIGNAL APPROACH */}
        <section className="bg-[#080f1e]/60 border border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-12 flex flex-col items-center">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-[#0b1329] border border-slate-800 rounded-full mb-4">
              Operational Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white max-w-3xl mx-auto leading-tight mb-4">
              Integrated Physics and Analytics
            </h2>
            <p className="text-slate-300 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
              We eliminate traditional gaps between data acquisition, signal processing, and interpretation. By blending physical constraints with machine learning, we turn complex earth measurements into clear decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#0b1329] p-6 rounded-xl border border-slate-800/60">
              <h3 className="text-lg font-bold text-white mb-2">Physics-Informed Processing</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Combining mathematical wavefield theory with machine learning models ensures algorithm predictions strictly satisfy real wave physics.
              </p>
            </div>

            <div className="bg-[#0b1329] p-6 rounded-xl border border-slate-800/60">
              <h3 className="text-lg font-bold text-white mb-2">Multi-Disciplinary Synthesis</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Fusing seismic, hydrogeological, and GIS data streams to provide single-source structural clarity for exploration and engineering teams.
              </p>
            </div>

            <div className="bg-[#0b1329] p-6 rounded-xl border border-slate-800/60">
              <h3 className="text-lg font-bold text-white mb-2">Full Lifecycle Data Management</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Assisting partners from initial survey geometry optimization to final 3D structural model delivery and compliance reporting.
              </p>
            </div>

            <div className="bg-[#0b1329] p-6 rounded-xl border border-slate-800/60">
              <h3 className="text-lg font-bold text-white mb-2">Standards Compliance</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Maintaining high operational standards (ISO/QHSE) across all survey design, data collection, and processing executions.
              </p>
            </div>
          </div>
        </section>

        {/* 5. CASE STUDY HIGHLIGHT */}
        <section className="bg-[#0b1329] border border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-[#080f1e] border border-slate-800 rounded-full">
                Technical Application
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                High-Fidelity Subsurface Imaging Through Multidimensional Reconstruction
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Severe spatial aliasing and random noise frequently degrade raw seismic datasets, causing structural uncertainties. Our proprietary 5D reconstruction algorithms restore complex wavefields and improve target resolution before drilling or engineering commitments.
              </p>
              <ul className="space-y-2 text-slate-400 text-xs sm:text-sm pt-2">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                  Enhanced Signal-to-Noise Ratio (SNR)
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                  Preservation of subtle structural amplitude variations
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
                  Streamlined, high-performance computing pipelines
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="relative rounded-2xl border border-slate-800 bg-[#050b14] p-3 shadow-inner">
                <Image 
                  src="/images/seismic-3d-model.jpeg" 
                  alt="3D Seismic Reconstruction Model" 
                  width={800} 
                  height={500} 
                  className="w-full h-auto rounded-xl object-cover"
                />
              </div>
            </div>

          </div>
        </section>

        {/* 6. TECHNICAL & SCIENTIFIC VALIDATION */}
        <section>
          <div className="text-center mb-12 flex flex-col items-center">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300 bg-[#080f1e] border border-slate-800 rounded-full mb-4">
              Foundational Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white max-w-3xl mx-auto leading-tight mb-4">
              Scientific &amp; Industrial Validation
            </h2>
            <p className="text-slate-400 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
              Our methods undergo peer review and extensive empirical testing to ensure accuracy across varied geological settings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0b1329] p-8 rounded-2xl border border-slate-800/80 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-3">Algorithmic Rigor</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Our multidimensional filtering methodologies (including rank-reduction and adaptive sparse inversion techniques) are routinely stress-tested against highly corrupted field data to maintain amplitude stability and structural continuity.
              </p>
            </div>

            <div className="bg-[#0b1329] p-8 rounded-2xl border border-slate-800/80 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-3">Applied Industry Experience</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                By integrating academic insights from the GeoSignal Institute directly into commercial operations, we ensure state-of-the-art technological advancement is paired with practical field utility.
              </p>
            </div>
          </div>
        </section>

        {/* 7. FAQ SECTION */}
        <section className="bg-[#080f1e]/40 border border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-[#0b1329] border border-slate-800 rounded-full mb-4">
              Frequently Asked Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Questions &amp; Insights
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-[#0b1329] border border-slate-800/80 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-white hover:text-cyan-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span className="ml-4 text-cyan-400 font-bold text-lg">
                    {openFaq === index ? '−' : '+'}
                  </span>
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 border-t border-slate-800/60 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* 8. FOOTER (PARFAITEMENT ALIGNÉ AVEC LE CONTENEUR PRINCIPAL) */}
      <footer className="w-full border-t border-slate-800/80 bg-[#030712] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl">
          
          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">
            
            {/* MARQUE & NEWSLETTER */}
            <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
              <h3 className="text-lg font-bold text-white tracking-wide">
                GeoSignal Analytics
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
                Advanced geophysics, computational data science, and environmental risk assessment for industry and research.
              </p>

              <div className="pt-3 space-y-2">
                <span className="block text-xs font-semibold text-white">
                  Stay updated with our technical publications
                </span>
                <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
                  <input
                    type="email"
                    placeholder="name@company.com"
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