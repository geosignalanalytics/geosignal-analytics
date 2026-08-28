'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  // État pour gérer les accordéons de la FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'fr'>('en');

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: 'What makes "physics-informed AI" different from standard AI?',
      a: "Standard AI mostly learns from patterns in historical data. Ours is built on top of the physical laws that govern wave propagation and subsurface behavior, so a result that isn't geologically plausible gets rejected even if the data alone would have suggested it."
    },
    {
      q: 'Which regions do you actually work in?',
      a: "Most of our work is in West Africa and the Asia-Pacific region, but the infrastructure is digital-first, so we take on computational analysis and consulting projects elsewhere too."
    },
    {
      q: 'Do you run field surveys, or just analyze data someone else collected?',
      a: "Both, depending on the project. We specialize in the computational side (analysis, inversion), and coordinate with local partners for field acquisition, with oversight to keep data quality consistent."
    },
    {
      q: 'How do you handle confidentiality on sensitive industrial data?',
      a: "Standard NDAs, and computational work runs in encrypted environments. Nothing unusual here, but it's worth stating plainly since it comes up often."
    },
    {
      q: 'Is this only for large-scale operations?',
      a: "No. The same models scale down. We work with regional water management projects as often as with larger mining operations, and price the work accordingly."
    }
  ];

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white flex flex-col antialiased">
      
      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/70 bg-[#060a12] px-6 py-3.5 md:px-12">
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

          {/* Liens desktop */}
          <ul className="hidden md:flex items-center gap-9 text-[13.5px] font-medium text-slate-400 m-0 p-0 list-none">
            <li><Link href="/" className="hover:text-slate-200 transition-colors">Home</Link></li>
            <li>
              <Link href="/about" className="text-white border-b-2 border-cyan-500 pb-[18px] -mb-[14px]">
                About
              </Link>
            </li>
            <li><Link href="/institute" className="hover:text-slate-200 transition-colors">GeoSignal Institute</Link></li>
            <li><Link href="/services" className="hover:text-slate-200 transition-colors">Services</Link></li>
          </ul>

          {/* Zone droite : langue + contact + burger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
              className="hidden sm:flex items-center rounded-md border border-slate-700 text-[11px] font-semibold overflow-hidden"
              aria-label="Switch language"
            >
              <span className={`px-2.5 py-1.5 transition-colors ${lang === 'en' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>
                EN
              </span>
              <span className={`px-2.5 py-1.5 transition-colors ${lang === 'fr' ? 'bg-slate-700 text-white' : 'text-slate-500'}`}>
                FR
              </span>
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

        {/* Menu mobile déroulant */}
        {mobileMenuOpen && (
          <div className="md:hidden mx-auto max-w-7xl mt-4 pb-2 border-t border-slate-800/70 pt-4">
            <ul className="flex flex-col gap-1 text-sm font-medium m-0 p-0 list-none">
              <li>
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-white bg-[#0b1329] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/institute" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">
                  GeoSignal Institute
                </Link>
              </li>
              <li>
                <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>

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
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)',
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-5">
              About us
            </p>

            <h1 className="text-[2.3rem] leading-[1.12] sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-7">
              A research background, applied to real projects
            </h1>

            <p className="text-slate-400 text-base md:text-lg mb-5 leading-relaxed">
              GeoSignal Analytics grew out of academic work in computational geophysics, brought into daily use
              across energy, water, and environmental projects. The research side didn't stop when the
              consulting side started; the two still feed each other.
            </p>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              In practice, that means subsurface exploration, water resource management, and QHSE compliance
              work that's grounded in physics rather than in a model's best guess.
            </p>
          </div>
        </div>
      </section>


      {/* CONTENEUR PRINCIPAL ALIGNÉ */}
      <main className="mx-auto max-w-7xl px-6 md:px-12 py-16 w-full space-y-24 flex-1">

        {/* WHO WE ARE */}
        <section>
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-3">
              Who we are
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              A small team, several disciplines
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Geophysicists, geoscientists, data scientists and engineers working on the same problems from
              different angles. That mix is deliberate: a subsurface question rarely has a single-discipline answer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#0b1329] p-8 rounded-xl border border-slate-800/80">
              <span className="text-xs font-mono text-slate-600">01</span>
              <h3 className="text-lg font-bold text-white mt-2 mb-3">Several disciplines, one project</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                From seismic inversion to QHSE auditing, the same project usually gets looked at from more
                than one technical angle before we call it done.
              </p>
            </div>

            <div className="bg-[#0b1329] p-8 rounded-xl border border-slate-800/80">
              <span className="text-xs font-mono text-slate-600">02</span>
              <h3 className="text-lg font-bold text-white mt-2 mb-3">Working across Africa and Asia</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Research standards on one side, on-the-ground industrial constraints on the other. Both ends
                need to hold for the work to be useful.
              </p>
            </div>

            <div className="bg-[#0b1329] p-8 rounded-xl border border-slate-800/80">
              <span className="text-xs font-mono text-slate-600">03</span>
              <h3 className="text-lg font-bold text-white mt-2 mb-3">Building the models, not just running them</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Where an off-the-shelf tool doesn't fit the problem, we build something that does, rather than
                forcing the data to fit the tool.
              </p>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section>
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-3">
              What we hold to
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              A few things we don't compromise on
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Not a mission statement. Just the things that shape how a project actually gets run here.
            </p>
          </div>

          <div className="divide-y divide-slate-800/80 border-t border-b border-slate-800/80">

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
              <span className="md:col-span-2 text-xs font-mono text-slate-600">01</span>
              <h3 className="md:col-span-3 text-base font-bold text-white">Scientific integrity</h3>
              <p className="md:col-span-7 text-slate-400 text-sm leading-relaxed">
                A result that can't be traced back to a physical explanation doesn't go out under our name,
                no matter how good it looks on a slide.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
              <span className="md:col-span-2 text-xs font-mono text-slate-600">02</span>
              <h3 className="md:col-span-3 text-base font-bold text-white">Building, not just applying</h3>
              <p className="md:col-span-7 text-slate-400 text-sm leading-relaxed">
                When an existing method doesn't fit a problem well enough, the default here is to adapt or
                build one, rather than force the data through the wrong tool.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
              <span className="md:col-span-2 text-xs font-mono text-slate-600">03</span>
              <h3 className="md:col-span-3 text-base font-bold text-white">Real partnerships</h3>
              <p className="md:col-span-7 text-slate-400 text-sm leading-relaxed">
                Working relationships with academic groups across Africa and China are useful precisely
                because they're ongoing, not because a logo looks good on a page.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
              <span className="md:col-span-2 text-xs font-mono text-slate-600">04</span>
              <h3 className="md:col-span-3 text-base font-bold text-white">Thinking past the project</h3>
              <p className="md:col-span-7 text-slate-400 text-sm leading-relaxed">
                Subsurface and water resource decisions tend to outlive the report they came from, so we try
                to leave clients with something that still holds up years later.
              </p>
            </div>

          </div>
        </section>

        {/* WHY WORK WITH US */}
        <section>
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-3">
              Why work with us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              Two things clients tend to mention
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Neither is a differentiator on its own. Together, they're harder to find in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0b1329] p-8 rounded-xl border border-slate-800/80">
              <h3 className="text-lg font-bold text-white mb-4">The technical side holds up</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Physics-informed models instead of pattern-matching on historical data. Seismic imaging and
                data inversion built for precision rather than a quick-looking result. Water resource
                modeling meant to be revisited, not just delivered once.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                None of it exists in isolation. It's fed by ongoing research, not a fixed toolkit from
                a few years ago.
              </p>
            </div>

            <div className="bg-[#0b1329] p-8 rounded-xl border border-slate-800/80">
              <h3 className="text-lg font-bold text-white mb-4">The operational side is manageable</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Projects that span China, Africa and beyond need consistent oversight from raw signal to
                final report, not a handoff between disconnected teams. QHSE auditing is built into the
                workflow rather than bolted on at the end.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                In practice, that tends to mean fewer surprises and less fragmented reporting for the client.
              </p>
            </div>
          </div>
        </section>

{/* TEAM */}
        <section>
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-3">
              Who's involved
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              Leadership and network
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              A small core team plus a network we call on depending on what a project actually needs,
              not a fixed roster padded out for appearances.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Carte 1: Dr. Innocent Oboué */}
            <div className="bg-[#0b1329] rounded-xl border border-slate-800/80 overflow-hidden flex flex-col">
              <div className="relative h-64 w-full bg-[#050b14] p-3 flex items-center justify-center">
                <Image 
                  src="/images/dr-oboue.jpeg" 
                  alt="Dr. Innocent Oboué, PhD" 
                  fill 
                  className="object-contain object-center scale-90"
                />
              </div>
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-white">Dr. Innocent Oboué, PhD</h3>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors p-1.5 border border-slate-800 rounded-md bg-[#080f1e] shrink-0 ml-2">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                  </div>
                  <p className="text-xs font-semibold text-cyan-400 mb-3">Founder &amp; Lead Geophysicist</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    PhD from Zhejiang University, focused on physics-informed AI and computational geophysics.
                    Sets the technical direction and stays involved on the research side, not just the business one.
                  </p>
                </div>
              </div>
            </div>

            {/* Carte 2: Global Collaborative Network */}
            <div className="bg-[#0b1329] rounded-xl border border-slate-800/80 overflow-hidden flex flex-col">
              <div className="relative h-64 w-full bg-[#050b14]">
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
                    <h3 className="text-lg font-bold text-white">Research network</h3>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors p-1.5 border border-slate-800 rounded-md bg-[#080f1e] shrink-0 ml-2">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                  </div>
                  <p className="text-xs font-semibold text-cyan-400 mb-3">Academic &amp; industrial partners</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Ongoing contact with researchers and labs in China, the US, and Africa. When something new
                    comes out of that work, it tends to show up in client projects within the same year, not
                    five years later.
                  </p>
                </div>
              </div>
            </div>

            {/* Carte 3: Multi-Disciplinary Experts */}
            <div className="bg-[#0b1329] rounded-xl border border-slate-800/80 overflow-hidden flex flex-col">
              <div className="relative h-64 w-full bg-[#050b14]">
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
                    <h3 className="text-lg font-bold text-white">Project specialists</h3>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors p-1.5 border border-slate-800 rounded-md bg-[#080f1e] shrink-0 ml-2">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                  </div>
                  <p className="text-xs font-semibold text-cyan-400 mb-3">Auditors, GIS &amp; data engineers</p>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Brought in based on what a given project actually calls for: QHSE auditors, GIS specialists,
                    data engineers. It keeps the core team lean without limiting what we can take on.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-3">
              Questions we get
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              FAQ
            </h2>
          </div>

          <div className="max-w-3xl space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="border border-slate-800/80 rounded-lg overflow-hidden"
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left text-sm sm:text-[15px] font-semibold text-white hover:bg-[#0b1329]/50 transition-colors focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`shrink-0 w-4 h-4 border-r-[1.5px] border-b-[1.5px] border-slate-500 transition-transform duration-200 ${
                      openFaq === idx ? '-rotate-[135deg] mt-1' : 'rotate-45 -mt-1'
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section>
          <div className="rounded-xl border border-slate-800/80 bg-[#0b1329] p-10 sm:p-14 text-center">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-5 tracking-tight">
              Have a project in mind?
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base mb-9 leading-relaxed">
              The best way to know if this is a fit is to talk through the specifics. Reach out and
              we'll tell you honestly whether it's something we can help with.
            </p>
            <Link 
              href="/contact" 
              className="inline-flex items-center rounded-md bg-cyan-600 px-7 py-3.5 text-sm font-semibold text-white hover:bg-cyan-500 transition-colors"
            >
              Get in touch
            </Link>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-800/80 bg-[#030712] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl">
          
          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">
            
            {/* MARQUE & NEWSLETTER */}
            <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
              <h3 className="text-lg font-bold text-white tracking-wide">
                GeoSignal Analytics
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
                Applied geophysics, computational data science, and environmental risk assessment
                for industry and research.
              </p>

              <div className="pt-3 space-y-2">
                <span className="block text-xs font-semibold text-white">
                  Occasional technical notes, no spam
                </span>
                <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
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
            <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-500 text-center md:flex-row md:text-left">
              
              <div className="bg-white rounded-md px-3 py-1.5 flex items-center justify-center">
                <Image 
                  src="/images/logo.png" 
                  alt="GeoSignal Analytics" 
                  width={120} 
                  height={35} 
                  className="h-7 w-auto object-contain"
                />
              </div>

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
