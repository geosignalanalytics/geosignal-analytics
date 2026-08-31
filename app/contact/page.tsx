'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const NAV_DROPDOWN_ITEMS = [
  { href: '/institute', label: 'Overview' },
  { href: '/institute/about', label: 'About Us' },
  { href: '/institute/research', label: 'Research' },
  { href: '/institute/publications', label: 'Publications' },
  { href: '/institute/training', label: 'Training' },
  { href: '/institute/people', label: 'People' },
  { href: '/institute/events', label: 'Events & Seminars' },
  { href: '/institute/news', label: 'News & Updates' },
  { href: '/institute/software', label: 'Software & Open Source' },
  { href: '/institute/careers', label: 'Careers & Opportunities' },
  { href: '/institute/blog', label: 'Blog' },
  { href: '/institute/contact', label: 'Contact' },
];

export default function ContactPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xaeywayk';

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: 'Research Collaboration',
    message: '',
  });

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone || 'N/A',
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        setErrorMessage(data?.error || "Un problème est survenu à l'envoi. Réessayez.");
      }
    } catch (error) {
      setErrorMessage('Connexion impossible. Vérifiez votre réseau et réessayez.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col antialiased">

      {/* NAVIGATION */}
      <nav aria-label="Main Navigation" className="sticky top-0 z-50 border-b border-slate-800/70 bg-[#060a12] px-6 py-3.5 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex items-center rounded-md bg-white px-2.5 py-1">
              <Image
                src="/images/logo-institute.jpeg"
                alt="GeoSignal Institute"
                width={140}
                height={40}
                className="h-7 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          <ul className="hidden md:flex items-center gap-9 text-[13.5px] font-medium text-slate-400 m-0 p-0 list-none">
            <li><Link href="/" className="hover:text-slate-200 transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-slate-200 transition-colors">About</Link></li>

            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 pb-[18px] -mb-[14px] focus:outline-none transition-colors"
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
                <div className="absolute right-0 mt-4 w-60 rounded-lg border border-slate-800 bg-[#0b1329] p-1.5 shadow-xl z-50">
                  {NAV_DROPDOWN_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-md px-3.5 py-2 text-[13px] transition-colors hover:bg-[#060a12] hover:text-white ${
                        item.href === '/institute/contact' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li><Link href="/services" className="hover:text-slate-200 transition-colors">Services</Link></li>
            <li>
              <Link href="/contact" className="text-white border-b-2 border-cyan-500 pb-[18px] -mb-[14px]">
                Contact
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:inline-block rounded-md bg-cyan-600 px-4 py-1.5 text-[13.5px] font-medium text-white hover:bg-cyan-500 transition-colors"
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
              <li><Link href="/services" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-cyan-400 font-semibold">Contact</Link></li>
            </ul>
            <div className="mt-3 pt-3 border-t border-slate-800/70">
              <span className="block px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-cyan-500">GeoSignal Institute</span>
              {NAV_DROPDOWN_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-md px-3 py-2 text-[13px] hover:bg-[#0b1329] hover:text-white transition-colors ${
                    item.href === '/institute/contact' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative border-b border-slate-800/70 px-6 pt-20 pb-24 md:px-12 md:pt-28 md:pb-32">
        <div
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 0%, black 40%, transparent 100%)',
          }}
        />
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 mb-5">
              Contact
            </p>
            <h1 className="text-[2.3rem] leading-[1.12] sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-5">
              Contactez l&apos;équipe de l&apos;Institut
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-2">
              Une question sur nos recherches, une formation, ou un projet de collaboration ?
              Écrivez-nous, on vous répond directement.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-6 md:px-12 py-16 flex-1 w-full space-y-6">

        {/* CONTACT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-6">
            <h3 className="text-white font-semibold text-sm mb-2">Email</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Pour toute question générale, technique ou de recherche.
            </p>
            <a href="mailto:io@geosignalanalytics.com" className="text-cyan-400 text-xs sm:text-sm font-medium hover:text-cyan-300 transition-colors break-all">
              io@geosignalanalytics.com
            </a>
          </div>

          <div className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-6">
            <h3 className="text-white font-semibold text-sm mb-2">Téléphone / WhatsApp</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Du lundi au vendredi, 8h–18h GMT.
            </p>
            <div className="space-y-1">
              <p className="text-cyan-400 text-xs sm:text-sm font-medium">+225 07 47 39 47 90</p>
              <p className="text-slate-400 text-xs">+86 (131) 659-67530</p>
            </div>
          </div>

          <div className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-6">
            <h3 className="text-white font-semibold text-sm mb-2">Implantations</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Activités de recherche et partenariats académiques.
            </p>
            <p className="text-slate-300 text-xs font-medium">
              Abidjan, Côte d&apos;Ivoire &amp; Hangzhou, Chine
            </p>
          </div>
        </div>

        {/* FORM */}
        <article className="bg-[#0b1329] border border-slate-800/80 rounded-xl p-8 md:p-10">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-400 mx-auto text-xl">
                ✓
              </div>
              <h3 className="text-xl font-bold text-white">Message envoyé</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
                Merci pour votre message. Notre équipe le lira et reviendra vers vous rapidement.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ firstName: '', lastName: '', email: '', phone: '', subject: 'Research Collaboration', message: '' });
                }}
                className="mt-2 rounded-md border border-slate-700 px-5 py-2 text-xs font-medium text-slate-200 hover:border-slate-500 hover:text-white transition-colors"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3.5 rounded-md border border-red-500/30 bg-red-950/20 text-red-400 text-xs text-center">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="firstName" className="block text-xs font-semibold text-slate-300">
                    Prénom <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-800 bg-[#060a12] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="lastName" className="block text-xs font-semibold text-slate-300">
                    Nom <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-800 bg-[#060a12] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-xs font-semibold text-slate-300">
                    Email <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-800 bg-[#060a12] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="block text-xs font-semibold text-slate-300">
                    Téléphone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-800 bg-[#060a12] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="block text-xs font-semibold text-slate-300">
                  Sujet <span className="text-cyan-400">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-800 bg-[#060a12] px-3.5 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none transition-colors"
                >
                  <option value="Research Collaboration">Collaboration académique &amp; recherche</option>
                  <option value="Training & Courses">Formations &amp; ateliers</option>
                  <option value="Consultancy & Software">Traitement de données DAS &amp; conseil</option>
                  <option value="General Inquiry">Autre demande</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-xs font-semibold text-slate-300">
                  Message <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Décrivez votre projet, votre question ou votre besoin de formation..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-800 bg-[#060a12] px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors resize-y min-h-[130px]"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-md bg-cyan-600 hover:bg-cyan-500 px-6 py-3 text-sm font-semibold text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Envoi en cours...
                  </>
                ) : (
                  'Envoyer'
                )}
              </button>
            </form>
          )}
        </article>

      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-800/80 bg-[#030712] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl">

          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">

            <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
              <h3 className="text-lg font-bold text-white tracking-wide">
                GeoSignal Institute
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-md">
                Le pôle recherche et publications de GeoSignal Analytics.
              </p>

              <div className="pt-3 space-y-2">
                <label htmlFor="newsletter-email" className="block text-xs font-semibold text-white">
                  Actualités de recherche, sans spam
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
                    S&apos;inscrire
                  </button>
                </form>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-3 gap-6 text-xs sm:text-sm pt-2 lg:pt-0">
              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  Liens
                </h4>
                <ul className="space-y-2.5 text-slate-400 list-none p-0 m-0">
                  <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                  <li><Link href="/institute/about" className="hover:text-white transition-colors">L&apos;Institut</Link></li>
                  <li><Link href="/institute/publications" className="hover:text-white transition-colors">Publications</Link></li>
                  <li><Link href="/institute/training" className="hover:text-white transition-colors">Formations</Link></li>
                  <li><Link href="/institute/software" className="hover:text-white transition-colors">Open Source</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  Pages
                </h4>
                <ul className="space-y-2.5 text-slate-400 list-none p-0 m-0">
                  <li><Link href="/" className="hover:text-white transition-colors">Accueil</Link></li>
                  <li><Link href="/institute" className="hover:text-white transition-colors">Vue d&apos;ensemble</Link></li>
                  <li><Link href="/institute/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/institute/careers" className="hover:text-white transition-colors">Carrières</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">
                  Réseaux
                </h4>
                <ul className="space-y-2.5 text-slate-400 list-none p-0 m-0">
                  <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
                  <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter</a></li>
                  <li><a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Google Scholar</a></li>
                </ul>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-800/80 pt-6">
            <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-500 text-center md:flex-row md:text-left">
              <div className="bg-white rounded-md px-3 py-1.5 flex items-center justify-center">
                <Image
                  src="/images/logo-institute.jpeg"
                  alt="GeoSignal Institute"
                  width={120}
                  height={35}
                  className="h-8 w-auto object-contain"
                />
              </div>
              <p className="text-slate-500 m-0">
                © {currentYear ?? 2026} GeoSignal Research Institute — Tous droits réservés
              </p>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
