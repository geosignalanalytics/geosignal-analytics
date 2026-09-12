'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useMemo } from 'react';

interface DropdownItem {
  label: string;
  href: string;
}

interface BlogPost {
  id: number;
  title: string;
  category: 'Article' | 'Resources' | 'Case Study' | 'Research Note';
  image: string;
  excerpt: string;
  date: string;
  readTime: string;
  link: string;
  featured?: boolean;
}

const DROPDOWN_LINKS: DropdownItem[] = [
  { label: 'Overview', href: '/institute' },
  { label: 'About Us', href: '/institute/about' },
  { label: 'Research', href: '/institute/research' },
  { label: 'Publications', href: '/institute/publications' },
  { label: 'Training', href: '/institute/training' },
  { label: 'People', href: '/institute/people' },
  { label: 'Events & Seminars', href: '/institute/events' },
  { label: 'News & Updates', href: '/institute/news' },
  { label: 'Software & Open Source', href: '/institute/software' },
  { label: 'Careers & Opportunities', href: '/institute/careers' },
  { label: 'Blog', href: '/institute/blog' },
  { label: 'Contact', href: '/institute/contact' },
];

const BLOG_POSTS_DATA: BlogPost[] = [
  {
    id: 1,
    title: "From Manual to Autonomous: Scaling Seismic Workflows with Machine Learning",
    category: "Article",
    image: "/images/blog/blog-1.jpg",
    excerpt: "Exploring automated signal preprocessing, noise reduction pipelines, and scalable deep learning architectures for modern seismic data processing.",
    date: "Feb 12, 2026",
    readTime: "6 min read",
    link: "/institute/blog/scaling-seismic-workflows",
    featured: true,
  },
  {
    id: 2,
    title: "Essential AI Toolkits for High-Density DAS Data Analysis",
    category: "Resources",
    image: "/images/blog/blog-2.jpg",
    excerpt: "A curated guide to open-source Python frameworks and deep learning tools engineered for Distributed Acoustic Sensing (DAS) channel alignment and denoising.",
    date: "Jan 28, 2026",
    readTime: "8 min read",
    link: "/institute/blog/das-data-analysis-toolkits",
  },
  {
    id: 3,
    title: "Optimization Metrics: Benchmarking AI-Driven Event Detection vs. Traditional Frameworks",
    category: "Article",
    image: "/images/blog/blog-3.jpg",
    excerpt: "A comparative evaluation of signal-to-noise ratio gains, computational latency, and detection thresholds across synthetic and field DAS datasets.",
    date: "Jan 15, 2026",
    readTime: "5 min read",
    link: "/institute/blog/optimization-metrics-benchmarking",
  },
  {
    id: 4,
    title: "Physics-Informed Neural Networks (PINNs) in Subsurface Modeling",
    category: "Research Note",
    image: "/images/blog/blog-4.jpg",
    excerpt: "Integrating acoustic wave equations into loss functions to enforce physical constraints in multidimensional seismic inversion.",
    date: "Dec 20, 2025",
    readTime: "7 min read",
    link: "/institute/blog/pinns-in-subsurface-modeling",
  },
];

const CATEGORIES = ['All', 'Article', 'Resources', 'Research Note'];

export default function BlogPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'fr'>('en');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS_DATA.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const featuredPost = BLOG_POSTS_DATA.find((post) => post.featured) || BLOG_POSTS_DATA[0];
  const regularPosts = filteredPosts.filter((post) => post.id !== (selectedCategory === 'All' && !searchQuery ? featuredPost.id : 0));

  return (
    <div className="min-h-screen bg-[#060a12] text-slate-200 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col">

      {/* NAVIGATION */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/70 bg-[#060a12] px-6 py-3.5 md:px-12">
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
                className="flex items-center gap-1.5 text-white border-b-2 border-cyan-500 pb-[18px] -mb-[14px] focus:outline-none"
                aria-expanded={isOpen}
                aria-haspopup="true"
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
                  {DROPDOWN_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-md px-3.5 py-2 text-[13px] transition-colors hover:bg-[#060a12] hover:text-white ${
                        item.href === '/institute/blog' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li><Link href="/services" className="hover:text-slate-200 transition-colors">Services</Link></li>
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}
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
              <li><Link href="/services" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-slate-400 hover:bg-[#0b1329] hover:text-white transition-colors">Contact</Link></li>
            </ul>
            <div className="mt-3 pt-3 border-t border-slate-800/70">
              <span className="block px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-cyan-500">GeoSignal Institute</span>
              {DROPDOWN_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-md px-3 py-2 text-[13px] hover:bg-[#0b1329] hover:text-white transition-colors ${
                    item.href === '/institute/blog' ? 'text-cyan-400 font-semibold' : 'text-slate-400'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
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
              Blog &amp; technical notes
            </p>
            <h1 className="text-[2.3rem] leading-[1.12] sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-7">
              Writing about the work, not around it
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed">
              Research notes, workflow write-ups, and the occasional benchmark, mostly on computational
              geophysics and signal processing.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-12 flex-1 w-full space-y-12">
        
        {/* SEARCH & FILTERS */}
        <div className="bg-[#0b1329] border border-slate-800/80 p-6 rounded-xl space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search articles or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-slate-800 bg-[#060a12] px-4 py-2.5 pl-10 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
              />
              <svg className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-cyan-600 border-cyan-500 text-white'
                      : 'bg-[#060a12] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FEATURED POST */}
        {selectedCategory === 'All' && !searchQuery && (
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-cyan-500 block">
              Featured
            </span>
            <Link 
              href={featuredPost.link}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0b1329] border border-slate-800/80 rounded-xl p-6 sm:p-8 hover:border-slate-700 transition-colors overflow-hidden"
            >
              <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[340px] bg-[#060a12] rounded-lg overflow-hidden border border-slate-800">
                <Image 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-md">
                      {featuredPost.category}
                    </span>
                    <span className="text-xs text-slate-500">{featuredPost.date}</span>
                    <span className="text-xs text-slate-600">{featuredPost.readTime}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight group-hover:text-cyan-300 transition-colors mb-4">
                    {featuredPost.title}
                  </h2>

                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="text-sm font-medium text-cyan-500 group-hover:text-cyan-400 transition-colors pt-4">
                  Read the full article
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* REGULAR BLOG GRID */}
        <div className="space-y-6">
          {selectedCategory === 'All' && !searchQuery && (
            <h2 className="text-xl font-bold text-white">More from the blog</h2>
          )}

          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {regularPosts.map((post) => (
                <Link 
                  key={post.id} 
                  href={post.link} 
                  className="group bg-[#0b1329] border border-slate-800/80 rounded-xl p-6 hover:border-slate-700 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full h-56 bg-[#060a12] rounded-lg mb-6 overflow-hidden border border-slate-800">
                      <Image 
                        src={post.image} 
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-md">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors mb-3">
                      {post.title}
                    </h3>

                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs font-medium text-slate-400 group-hover:text-white transition-colors">
                    Read article
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#0b1329] border border-slate-800/80 rounded-xl">
              <p className="text-slate-400 text-sm">
                No articles found matching your search.
              </p>
            </div>
          )}
        </div>

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
                The research and publications arm of GeoSignal Analytics.
              </p>

              <div className="pt-3 space-y-2">
                <span className="block text-xs font-semibold text-white">
                  Occasional research updates, no spam
                </span>
                <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
                  <input
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

            <div className="lg:col-span-7 grid grid-cols-3 gap-6 text-xs sm:text-sm">
              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">Links</h4>
                <ul className="space-y-2.5 text-slate-400">
                  <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                  <li><Link href="/institute/about" className="hover:text-white transition-colors">The Institute Approach</Link></li>
                  <li><Link href="/institute/publications" className="hover:text-white transition-colors">Publications</Link></li>
                  <li><Link href="/institute/training" className="hover:text-white transition-colors">Training</Link></li>
                  <li><Link href="/institute/software" className="hover:text-white transition-colors">Open Source</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">Pages</h4>
                <ul className="space-y-2.5 text-slate-400">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/institute" className="hover:text-white transition-colors">Overview</Link></li>
                  <li><Link href="/institute/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/institute/careers" className="hover:text-white transition-colors">Careers</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-white">Socials & Academic</h4>
                <ul className="space-y-2.5 text-slate-400">
                  <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
                  <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter / X</a></li>
                  <li><a href="https://www.researchgate.net" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ResearchGate</a></li>
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
                  width={110} 
                  height={30} 
                  className="h-7 w-auto object-contain"
                />
              </div>
              <p className="text-slate-500">
                © {new Date().getFullYear()} GeoSignal Institute — All Rights Reserved
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
