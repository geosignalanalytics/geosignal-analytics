'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'fr'>('en');

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/institute', label: 'GeoSignal Institute' },
    { href: '/services', label: 'Services' },
  ];

  const faqs = [
    {
      q: "How does GeoSignal Analytics integrate AI into seismic data processing?",
      a: "We don't let a model run unconstrained. Machine learning handles noise suppression and gap-filling, but it's built on top of standard wave-equation solvers, so a result that isn't physically plausible gets rejected before it reaches interpretation."
    },
    {
      q: "What's the difference between GeoSignal Analytics and GeoSignal Institute?",
      a: "Analytics is the commercial side: consulting and processing work for clients. The Institute is where the research, publications and training happen. Methods generally get proven at the Institute before they're used on paid work."
    },
    {
      q: "Which industries do you typically work with?",
      a: "Mostly resource exploration (minerals and hydrocarbons), water infrastructure, geotechnical engineering, and a smaller amount of environmental compliance work."
    },
    {
      q: "Will your output work with the software we already use?",
      a: "In most cases, yes. We export in SEG-Y, GeoTIFF, SHP or NetCDF depending on the deliverable. If your stack needs something unusual, it's worth checking with us before the project starts rather than after."
    }
  ];

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 font-sans selection:bg-cyan-500 selection:text-white flex flex-col antialiased">

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
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={
                    link.href === '/'
                      ? 'text-white border-b-2 border-cyan-500 pb-[18px] -mb-[14px]'
                      : 'hover:text-slate-200 transition-colors'
                  }
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Zone droite : langue + contact + burger */}
          <div className="flex items-center gap-3">
            {/* Sélecteur de langue */}
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

            {/* Burger mobile */}
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
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block rounded-md px-3 py-2.5 transition-colors ${
                      link.href === '/' ? 'text-white bg-[#0b1329]' : 'text-slate-400 hover:bg-[#0b1329] hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* Sélecteur langue mobile */}
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
              Applied Geophysics &amp; Earth Data Science
            </p>

            <h1 className="text-[2.3rem] leading-[1.12] sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-7">
              Subsurface imaging and signal processing for organizations that need to know what the ground actually looks like.
            </h1>

            <p className="text-slate-400 text-base md:text-lg max-w-2xl mb-10 leading-relaxed">
              We process seismic and geospatial data using physics-based methods refined with machine learning.
              Our clients work in resource exploration, water infrastructure, and land engineering, where a wrong
              reading of the subsurface isn't something you can afford.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="#sectors"
                className="rounded-md bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-500 transition-colors"
              >
                See our services
              </Link>
              <Link
                href="/contact"
                className="rounded-md border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-slate-500 hover:text-white transition-colors"
              >
                Talk to our team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER */}
      <main className="mx-auto max-w-7xl px-6 md:px-12 py-16 w-full space-y-24 flex-1">

        {/* SERVICES */}
        <section id="sectors" className="scroll-mt-24">
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-3">
              What we do
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              Six areas, one working method
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Each engagement starts the same way: understand the physical problem before choosing the tool.
              Below is where that method gets applied.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

            <div className="lg:col-span-7 bg-[#0b1329] p-8 rounded-xl border border-slate-800/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-slate-600">01</span>
                <h3 className="text-xl font-bold text-white mt-2 mb-3">Advanced Geophysics &amp; AI</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Seismic data processing built on wave-equation solvers, extended with machine learning models
                  where they genuinely help, mainly for noise suppression and filling gaps in spatial coverage.
                  We stay close to the physics; the model doesn't get to invent a subsurface that isn't there.
                </p>
              </div>
              <Link href="/services/advanced-geophysics-and-ai" className="text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-colors">
                Read about this service
              </Link>
            </div>

            <div className="lg:col-span-5 bg-[#0b1329] p-8 rounded-xl border border-slate-800/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-slate-600">02</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3">Geoscience &amp; Exploration</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Combined geological and geophysical reads to narrow down where a field campaign should
                  actually focus, before money gets spent on the ground.
                </p>
              </div>
              <Link href="/services/geoscience-and-exploration" className="text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-colors">
                Read about this service
              </Link>
            </div>

            <div className="lg:col-span-4 bg-[#0b1329] p-8 rounded-xl border border-slate-800/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-slate-600">03</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3">Water Resources</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Hydrogeophysical surveys and aquifer mapping to support decisions on where water actually is,
                  and how it moves.
                </p>
              </div>
              <Link href="/services/water-resources" className="text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-colors">
                Read about this service
              </Link>
            </div>

            <div className="lg:col-span-4 bg-[#0b1329] p-8 rounded-xl border border-slate-800/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-slate-600">04</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3">Mapping, GIS &amp; Remote Sensing</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Spatial data brought into one coherent picture: satellite imagery, thematic mapping,
                  and monitoring over time.
                </p>
              </div>
              <Link href="/services/mapping-gis-and-remote-sensing" className="text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-colors">
                Read about this service
              </Link>
            </div>

            <div className="lg:col-span-4 bg-[#0b1329] p-8 rounded-xl border border-slate-800/80 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-slate-600">05</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3">Environmental Solutions</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Shallow subsurface imaging for hazard checks and baseline studies, done without disturbing
                  the site.
                </p>
              </div>
              <Link href="/services/environmental-solutions" className="text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-colors">
                Read about this service
              </Link>
            </div>

            <div className="lg:col-span-12 bg-[#0b1329] p-8 rounded-xl border border-slate-800/80 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="md:max-w-2xl">
                <span className="text-xs font-mono text-slate-600">06</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-2">QHSE Advisory</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Safety and risk frameworks for field acquisition programs, aligned with ISO practice
                  and built by people who've actually run field crews, not just written the policy.
                </p>
              </div>
              <Link href="/services/qhse" className="shrink-0 text-sm font-medium text-cyan-500 hover:text-cyan-400 transition-colors">
                Read about this service
              </Link>
            </div>

          </div>
        </section>

        {/* MÉTHODOLOGIE */}
        <section>
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-3">
              How we work
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              Physics first, machine learning second
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              A model that produces a clean-looking image but violates wave physics isn't useful. It's just
              confident-looking noise, and everything we do is built around avoiding that trap.
            </p>
          </div>

          <div className="divide-y divide-slate-800/80 border-t border-b border-slate-800/80">

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
              <span className="md:col-span-2 text-xs font-mono text-slate-600">01</span>
              <h3 className="md:col-span-3 text-base font-bold text-white">Physics-informed processing</h3>
              <p className="md:col-span-7 text-slate-400 text-sm leading-relaxed">
                Wavefield theory sets the boundaries; the learning model works inside them. It's slower to build
                than a purely data-driven pipeline, but it doesn't hallucinate structure that contradicts basic physics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
              <span className="md:col-span-2 text-xs font-mono text-slate-600">02</span>
              <h3 className="md:col-span-3 text-base font-bold text-white">Cross-discipline reads</h3>
              <p className="md:col-span-7 text-slate-400 text-sm leading-relaxed">
                Seismic, hydrogeological and GIS data rarely get looked at together, even though they should be.
                We read them as one dataset, which is usually where the real answer is hiding.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
              <span className="md:col-span-2 text-xs font-mono text-slate-600">03</span>
              <h3 className="md:col-span-3 text-base font-bold text-white">Full-lifecycle involvement</h3>
              <p className="md:col-span-7 text-slate-400 text-sm leading-relaxed">
                We're involved from survey design through to the final 3D model and reporting. It's rare that
                we're handed a dataset midway and asked to make it look presentable.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7">
              <span className="md:col-span-2 text-xs font-mono text-slate-600">04</span>
              <h3 className="md:col-span-3 text-base font-bold text-white">Standards compliance</h3>
              <p className="md:col-span-7 text-slate-400 text-sm leading-relaxed">
                ISO-aligned QHSE practice across survey design, data collection and processing. Not a
                certificate on a wall, but a checklist that actually gets followed on site.
              </p>
            </div>

          </div>
        </section>

        {/* CASE STUDY */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500">
                Case study
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                Reading through the noise on a heavily aliased seismic volume
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Spatial aliasing and random noise are common on raw seismic datasets and tend to introduce
                structural uncertainty right where accuracy matters most. On a recent volume, we applied a
                5D reconstruction approach to rebuild the wavefield before it reached the interpretation stage.
                It's the kind of step that's easy to skip, and expensive to skip badly.
              </p>
              <ul className="space-y-2.5 text-slate-400 text-sm pt-1">
                <li className="flex gap-2.5">
                  <span className="text-slate-600">—</span>
                  Signal-to-noise ratio improved without smoothing over real structure
                </li>
                <li className="flex gap-2.5">
                  <span className="text-slate-600">—</span>
                  Amplitude variations preserved, which matters for later interpretation
                </li>
                <li className="flex gap-2.5">
                  <span className="text-slate-600">—</span>
                  Processing pipeline kept lean enough to run on standard field hardware
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-xl border border-slate-800 bg-[#0b1329] p-2.5">
                <Image
                  src="/images/seismic-3d-model.jpeg"
                  alt="3D seismic reconstruction model"
                  width={800}
                  height={500}
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
              <p className="text-xs text-slate-600 mt-3">
                Reconstructed 3D volume after aliasing correction, prior to interpretation handoff.
              </p>
            </div>

          </div>
        </section>

        {/* VALIDATION SCIENTIFIQUE & INDUSTRIELLE */}
        <section>
          <div className="max-w-2xl mb-14">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-3">
              Track record
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
              Tested against real data, not clean demos
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Methods that only work on tidy synthetic datasets don't survive contact with a real field.
              Ours are built and stress-tested the other way around.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0b1329] p-8 rounded-xl border border-slate-800/80">
              <h3 className="text-lg font-bold text-white mb-3">Built to handle bad data</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our filtering methods, including rank-reduction and adaptive sparse inversion, get run
                against deliberately corrupted field data before they're trusted on a real project. If a
                method only performs well on clean input, it doesn't leave the lab.
              </p>
            </div>

            <div className="bg-[#0b1329] p-8 rounded-xl border border-slate-800/80">
              <h3 className="text-lg font-bold text-white mb-3">Research feeding practice</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                The GeoSignal Institute handles the academic side: publications, open research, training.
                What holds up there is what eventually makes it into client-facing work, not the reverse.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="max-w-2xl mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-3">
              Questions we actually get asked
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              FAQ
            </h2>
          </div>

          <div className="max-w-3xl space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-slate-800/80 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left text-sm sm:text-[15px] font-semibold text-white hover:bg-[#0b1329]/50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`shrink-0 w-4 h-4 border-r-[1.5px] border-b-[1.5px] border-slate-500 transition-transform duration-200 ${
                      openFaq === index ? '-rotate-[135deg] mt-1' : 'rotate-45 -mt-1'
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-5 pb-5 text-sm text-slate-400 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
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
