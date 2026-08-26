'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  // État pour gérer les accordéons de la FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'What makes "Physics-Informed AI" different from standard AI?',
      a: 'Standard AI relies solely on historical data patterns. Our approach integrates the fundamental laws of physics into the machine learning models, ensuring results that are geologically consistent and physically plausible, even with limited data.'
    },
    {
      q: 'In which regions does GeoSignal Analytics operate?',
      a: 'We have a global reach with a focus on West Africa and the Asia-Pacific region. Thanks to our digital-first infrastructure, we can provide high-level computational analysis and consulting for projects worldwide.'
    },
    {
      q: 'Do you provide on-site geophysical surveys or just data analysis?',
      a: 'We offer a hybrid approach. While we specialize in advanced computational analysis and inversion, we also coordinate with local partners for data acquisition and provide oversight to ensure the highest data quality (QHSE).'
    },
    {
      q: 'How do you ensure the confidentiality of sensitive industrial data?',
      a: 'Data security is a pillar of our operations. We work under strict non-disclosure agreements (NDA) and use secure, encrypted environments for all computational tasks, ensuring your strategic assets remain protected.'
    },
    {
      q: 'Is your platform suitable for small-scale water management projects?',
      a: 'Yes. Our models are scalable. We assist both large-scale mining operations and regional water management initiatives, tailoring our precision to the specific needs and budget of the project.'
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
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-white font-semibold transition-colors hover:text-cyan-400">
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
      <section className="relative overflow-hidden border-b border-slate-800 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-[#050b14] to-[#050b14] px-6 py-28 text-center md:px-12">
        {/* Effet d'onde géophysique en arrière-plan */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/10 animate-ping [animation-duration:4s]" />
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/5 animate-ping [animation-duration:6s] delay-1000" />
        </div>

        {/* Conteneur principal (z-10 pour rester au-dessus de l'onde) */}
        <div className="relative mx-auto max-w-5xl z-10">
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-[#0b1329] border border-cyan-500/30 rounded-full mb-6">
            About Us
          </span>
          
          {/* Titre avec dégradé cyan/blanc animé */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-tight bg-gradient-to-r from-white via-cyan-400 to-white bg-[length:200%_auto] text-transparent bg-clip-text animate-[gradient_8s_ease_infinite]">
            Bridging Academic Rigor<br className="hidden sm:inline" />
            with Industrial Excellence
          </h1>
          
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-6 font-normal">
            GeoSignal Analytics was founded with a singular mission: to integrate advanced computational geophysics and artificial intelligence into the daily operations of the energy, water, and environmental sectors. Our foundation is built on years of high-level research and international collaboration.
          </p>
          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
            By leveraging physics-informed AI and geospatial intelligence, we transform complex data into clear, actionable insights. Whether we are optimizing subsurface exploration, managing critical water resources, or ensuring QHSE compliance, our commitment remains the same: delivering precision, safety, and sustainable innovation for a more resilient future.
          </p>
        </div>
      </section>


      {/* CONTENEUR PRINCIPAL ALIGNÉ */}
      <main className="mx-auto max-w-7xl px-6 md:px-12 py-16 w-full space-y-24 flex-1">

        {/* 3. EXPERTISE ROOTED IN SCIENCE & INNOVATION */}
        <section>
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300 bg-[#080f1e] border border-slate-800 rounded-full mb-4">
              Who We Are
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-4xl mx-auto leading-tight mb-6 tracking-tight">
              Expertise Rooted in Science &amp; Innovation
            </h2>
            <p className="text-slate-300 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
              We are a team of specialized geophysicists, geoscientists, data scientists, and engineers dedicated to solving the world&apos;s most complex subsurface and environmental challenges. Driven by academic excellence and industrial pragmatism, we combine cutting-edge AI with deep physical insights to deliver clarity where it matters most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0b1329] p-8 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition duration-300 flex flex-col text-left shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[#080f1e] border border-slate-800 flex items-center justify-center mb-6 text-xl">
                📊
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Multidisciplinary Expertise</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                From seismic inversion to QHSE auditing, our diverse skills allow us to tackle projects from multiple technical angles simultaneously.
              </p>
            </div>

            <div className="bg-[#0b1329] p-8 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition duration-300 flex flex-col text-left shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[#080f1e] border border-slate-800 flex items-center justify-center mb-6 text-xl">
                ⏱️
              </div>
              <h3 className="text-xl font-bold text-white mb-3">International Footprint</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                With a strong presence across Africa and Asia, we bridge global research standards with local industrial needs.
              </p>
            </div>

            <div className="bg-[#0b1329] p-8 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition duration-300 flex flex-col text-left shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[#080f1e] border border-slate-800 flex items-center justify-center mb-6 text-xl">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Data-Driven DNA</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Innovation is at our core. We don&apos;t just process data; we build the intelligent models that define the future of geosciences.
              </p>
            </div>
          </div>
        </section>

        {/* 4. OUR CORE VALUES */}
        <section className="bg-[#080f1e]/60 border border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-[#0b1329] border border-slate-800 rounded-full mb-4">
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight mb-4">
              Our Core Values
            </h2>
            <p className="text-slate-300 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
              At GeoSignal Analytics, our work is guided by a commitment to technical excellence and ethical responsibility. These core principles define how we solve complex challenges and build lasting partnerships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0b1329] p-8 rounded-2xl border border-slate-800/80 flex flex-col text-left">
              <div className="w-10 h-10 rounded-lg bg-[#080f1e] border border-slate-800 flex items-center justify-center mb-5 text-lg">
                💡
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Scientific Integrity</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                <strong className="text-white">The Principle:</strong> We prioritize rigorous methodologies and transparent results. In an industry where data is everything, we ensure that every model we deliver is backed by physical laws and verifiable science.
              </p>
            </div>

            <div className="bg-[#0b1329] p-8 rounded-2xl border border-slate-800/80 flex flex-col text-left">
              <div className="w-10 h-10 rounded-lg bg-[#080f1e] border border-slate-800 flex items-center justify-center mb-5 text-lg">
                🤝
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Innovation-Driven</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                <strong className="text-white">The Principle:</strong> We don&apos;t just follow trends; we set them. Through the continuous development of physics-informed AI and advanced methodologies, we push the boundaries of subsurface and environmental intelligence.
              </p>
            </div>

            <div className="bg-[#0b1329] p-8 rounded-2xl border border-slate-800/80 flex flex-col text-left">
              <div className="w-10 h-10 rounded-lg bg-[#080f1e] border border-slate-800 flex items-center justify-center mb-5 text-lg">
                🚀
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Strategic Collaboration</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                <strong className="text-white">The Principle:</strong> We believe in the power of synergy. By fostering strong partnerships across academia and industry—connecting Africa, China, and global research centers—we bridge high-level research with practical industrial application.
              </p>
            </div>

            <div className="bg-[#0b1329] p-8 rounded-2xl border border-slate-800/80 flex flex-col text-left">
              <div className="w-10 h-10 rounded-lg bg-[#080f1e] border border-slate-800 flex items-center justify-center mb-5 text-lg">
                👥
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Resilient Sustainability</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                <strong className="text-white">The Principle:</strong> We advocate for the responsible use of subsurface data and technologies. Our solutions are designed to support long-term environmental stewardship and sustainable resource development.
              </p>
            </div>
          </div>
        </section>

        {/* 5. WHY CHOOSE GEOSIGNAL ANALYTICS? */}
        <section>
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300 bg-[#080f1e] border border-slate-800 rounded-full mb-4">
              Why Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-3xl mx-auto leading-tight mb-4">
              Why Choose GeoSignal Analytics?
            </h2>
            <p className="text-slate-300 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
              In an era of complex environmental challenges, generic solutions are no longer enough. We provide a unique combination of high-level academic research and industrial pragmatism to de-risk your operations and maximize resource potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#0b1329] p-8 sm:p-10 rounded-2xl border border-slate-800/80 flex flex-col text-left shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Technical &amp; Scientific Leadership</h3>
              <ul className="space-y-4 text-slate-300 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                  <div><strong className="text-white">Physics-Informed AI:</strong> Models guided by physical laws, not just data patterns.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                  <div><strong className="text-white">Scientific Soundness:</strong> Results validated by rigorous computational geophysics.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                  <div><strong className="text-white">High-Fidelity Modeling:</strong> Extreme precision in subsurface and seismic imaging.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                  <div><strong className="text-white">Advanced Data Inversion:</strong> Transforming raw signals into clear geological insights.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                  <div><strong className="text-white">Smart Water Management:</strong> AI-driven analysis for sustainable resource mapping.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                  <div><strong className="text-white">R&amp;D Driven Solutions:</strong> Bridging academic breakthroughs with industrial needs.</div>
                </li>
              </ul>
            </div>

            <div className="bg-[#0b1329] p-8 sm:p-10 rounded-2xl border border-slate-800/80 flex flex-col text-left shadow-xl">
              <h3 className="text-2xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Global Operations &amp; Strategic Value</h3>
              <ul className="space-y-4 text-slate-300 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                  <div><strong className="text-white">Tri-Continental Insight:</strong> Expertise spanning China, Africa, and global networks.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                  <div><strong className="text-white">End-to-End Oversight:</strong> Total project management from signal to final report.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                  <div><strong className="text-white">Global Standard Compliance:</strong> Aligning every project with international regulations.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                  <div><strong className="text-white">Integrated QHSE Rigor:</strong> Safety and environmental auditing built into the workflow.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                  <div><strong className="text-white">Operational Cost Reduction:</strong> Optimizing resources to prevent fragmented reporting.</div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 mt-2 shrink-0"></span>
                  <div><strong className="text-white">Cross-Border Collaboration:</strong> Navigating diverse terrains with a global perspective.</div>
                </li>
              </ul>
            </div>
          </div>
        </section>

{/* 6. EXPERT LEADERSHIP & GLOBAL NETWORK */}
        <section>
          <div className="text-center mb-16 flex flex-col items-center">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-300 bg-[#080f1e] border border-slate-800 rounded-full mb-4">
              Our Team
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white max-w-4xl mx-auto leading-tight mb-4">
              Expert Leadership &amp; Global Network
            </h2>
            <p className="text-slate-300 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
              GeoSignal Analytics is led by specialized expertise and supported by a robust network of international collaborators. We assemble high-performance teams tailored to the specific technical demands of each project, ensuring world-class delivery every time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Carte 1: Dr. Innocent Oboué */}
            <div className="bg-[#0b1329] rounded-2xl border border-slate-800/80 overflow-hidden flex flex-col text-left shadow-xl hover:border-slate-700 transition duration-300">
              <div className="relative h-72 w-full bg-[#050b14] p-3 flex items-center justify-center">
                <Image 
                  src="/images/dr-oboue.jpeg" 
                  alt="Dr. Innocent Oboué, PhD" 
                  fill 
                  className="object-contain object-center scale-90 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">Dr. Innocent Oboué, PhD</h3>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors p-1.5 border border-slate-800 rounded-lg bg-[#080f1e]">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                  </div>
                  <p className="text-xs font-semibold text-cyan-400 mb-3">Founder &amp; Lead Geophysicist</p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    An expert in Physics-Informed AI and Computational Geophysics with a PhD from Zhejiang University. Dr. Oboué spearheads the technical vision and strategic direction of the firm, bridging the gap between advanced research and industrial applications.
                  </p>
                </div>
              </div>
            </div>

            {/* Carte 2: Global Collaborative Network */}
            <div className="bg-[#0b1329] rounded-2xl border border-slate-800/80 overflow-hidden flex flex-col text-left shadow-xl hover:border-slate-700 transition duration-300">
              <div className="relative h-72 w-full bg-[#050b14]">
                <Image 
                  src="/images/global-network.png" 
                  alt="Global Collaborative Network" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">Global Network</h3>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors p-1.5 border border-slate-800 rounded-lg bg-[#080f1e]">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                  </div>
                  <p className="text-xs font-semibold text-cyan-400 mb-3">Academic &amp; Industrial Partners</p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    We maintain active partnerships with leading researchers and laboratories in China, the USA, and Africa. This allows us to integrate the latest scientific breakthroughs directly into our client projects.
                  </p>
                </div>
              </div>
            </div>

            {/* Carte 3: Multi-Disciplinary Experts */}
            <div className="bg-[#0b1329] rounded-2xl border border-slate-800/80 overflow-hidden flex flex-col text-left shadow-xl hover:border-slate-700 transition duration-300">
              <div className="relative h-72 w-full bg-[#050b14]">
                <Image 
                  src="/images/multidisciplinary.jpeg" 
                  alt="Multi-Disciplinary Experts" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-white">Project Specialists</h3>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors p-1.5 border border-slate-800 rounded-lg bg-[#080f1e]">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                  </div>
                  <p className="text-xs font-semibold text-cyan-400 mb-3">Auditors, GIS &amp; Data Engineers</p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Depending on project scope, we mobilize a vetted network of QHSE auditors, GIS specialists, and data engineers. This agile model ensures that our clients always work with the best minds for their specific challenges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. FREQUENTLY ASKED QUESTIONS (FAQ) */}
        <section className="bg-[#080f1e]/40 border border-slate-800/80 rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 bg-[#0b1329] border border-slate-800 rounded-full mb-4">
              FAQs
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Browse the most frequently asked questions about our work and services.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-[#0b1329] border border-slate-800/80 rounded-xl overflow-hidden transition-colors"
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-5 text-left text-sm sm:text-base font-semibold text-white hover:text-cyan-400 transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className="ml-4 text-cyan-400 font-bold text-lg">
                    {openFaq === idx ? '−' : '+'}
                  </span>
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 border-t border-slate-800/60 pt-3 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* 8. READY TO INNOVATE? (CTA SECTION) */}
        <section>
          <div className="bg-gradient-to-r from-[#0b1329] via-[#080f1e] to-[#0b1329] rounded-3xl border border-slate-800 p-10 sm:p-16 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready to Innovate?
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto text-sm sm:text-base mb-10 leading-relaxed">
              Join the leading edge of computational geophysics. Connect with our experts today to unlock the full potential of your data.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-8 py-4 text-sm sm:text-base font-semibold text-white shadow-lg shadow-cyan-600/20 transition-all hover:bg-cyan-500"
            >
              Connect with Dr. Oboué &rarr;
            </Link>
          </div>
        </section>

      </main>

      {/* 9. FOOTER (PARFAITEMENT ALIGNÉ AVEC LE CONTENEUR PRINCIPAL) */}
      <footer className="w-full border-t border-slate-800/80 bg-[#030712] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl">
          
          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">
            
            {/* MARQUE & NEWSLETTER */}
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