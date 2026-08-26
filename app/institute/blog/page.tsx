'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef, useMemo } from 'react';

// ==================== TYPES & DATA ====================
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

// ==================== MAIN PAGE COMPONENT ====================
export default function BlogPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Gestion des clics extérieurs et des touches clavier pour le menu
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

  // Filtrage combiné par recherche et catégorie
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
    <div className="min-h-screen bg-[#070b12] text-slate-200 font-sans antialiased selection:bg-cyan-500/30 selection:text-cyan-200 relative flex flex-col">
      
      {/* Background Subtle Tech Grid */}
      <div 
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1f29370f_1px,transparent_1px),linear-gradient(to_bottom,#1f29370f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" 
      />

      {/* 1. NAVIGATION BAR */}
      <nav className="sticky top-0 z-50 border-b border-slate-800/60 bg-[#070b12]/80 px-6 py-4 backdrop-blur-xl md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex items-center rounded-lg bg-white/95 px-3 py-1.5 shadow-sm ring-1 ring-white/20 transition-all group-hover:bg-white group-hover:shadow-md">
              <Image 
                src="/images/logo-institute.jpeg" 
                alt="GeoSignal Institute Logo" 
                width={140} 
                height={40} 
                className="h-7 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <ul className="flex items-center gap-8 text-sm font-medium text-slate-300">
            <li>
              <Link href="/" className="transition-colors hover:text-cyan-400">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="transition-colors hover:text-cyan-400">
                About
              </Link>
            </li>

            {/* INSTITUTION DROPDOWN MENU */}
            <li className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="flex items-center gap-1.5 font-semibold text-white transition-colors hover:text-cyan-400 focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
                aria-haspopup="true"
              >
                GeoSignal Institute 
                <svg 
                  className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-400'}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-800 bg-[#0c121e]/95 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200 z-50">
                  {DROPDOWN_LINKS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block rounded-xl px-4 py-2.5 text-xs sm:text-sm transition-all hover:bg-slate-800/60 hover:text-cyan-300 hover:translate-x-1 ${
                        item.href === '/institute/blog' ? 'bg-slate-800/80 text-cyan-400 font-semibold' : 'text-slate-300'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>

            <li>
              <Link href="/services" className="transition-colors hover:text-cyan-400">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="transition-colors hover:text-cyan-400">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </nav>

{/* HERO SECTION - BLOG & TECHNICAL INSIGHTS */}
<section className="relative overflow-hidden border-b border-slate-800/80 bg-[#040711] px-6 py-32 text-center md:px-12 md:py-40">
  
  {/* 1. Halo lumineux en arrière-plan (Glow Gradient Cyan / Sky) */}
  <div 
    className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-cyan-500/15 via-sky-500/15 to-transparent blur-[120px]" 
  />

    {/* Effet d'onde géophysique en arrière-plan */}
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/10 animate-ping [animation-duration:4s]" />
          <div className="absolute h-[300px] w-[300px] md:h-[600px] md:w-[600px] rounded-full border border-cyan-500/5 animate-ping [animation-duration:6s] delay-1000" />
        </div>
        
  {/* 2. Représentation vectorielle : Onde sinusoïdale & Signal sismique */}
  <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-40">
    <svg 
      className="h-full w-full" 
      viewBox="0 0 1400 500" 
      preserveAspectRatio="none" 
      fill="none"
    >
      {/* Onde sinusoïdale fluide */}
      <path 
        d="M -100,280 C 300,360 500,160 900,280 C 1200,370 1400,210 1600,260" 
        stroke="url(#gradient-wave-1)" 
        strokeWidth="1.5" 
        opacity="0.8"
      />

      {/* Seconde couche d'onde parallèle */}
      <path 
        d="M -100,310 C 320,390 520,190 920,310 C 1220,400 1420,240 1600,290" 
        stroke="url(#gradient-wave-2)" 
        strokeWidth="1" 
        opacity="0.3"
      />

      {/* Sismogramme (Signal à pics - Cyan) */}
      <path 
        d="M 80,295 L 200,295 L 215,220 L 230,370 L 245,160 L 260,410 L 275,210 L 290,340 L 305,270 L 320,310 L 335,295 L 580,295" 
        stroke="#06b6d4" 
        strokeWidth="1.5" 
        opacity="0.6" 
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Axe vertical discret */}
      <line x1="260" y1="100" x2="260" y2="420" stroke="#38bdf8" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.25" />

      {/* Dégradés pour les tracés SVG */}
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

  {/* 3. Contenu principal */}
  <div className="relative z-10 mx-auto max-w-4xl">
    {/* Badge Cyan */}
    <span className="mb-8 inline-block rounded-full border border-cyan-500/30 bg-cyan-950/40 px-4 py-1.5 text-xs font-semibold tracking-wide text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)] backdrop-blur-md">
      Blog &amp; Technical Insights
    </span>

    {/* Titre avec Dégradé Cyan -> Sky -> Indigo */}
    <h1 className="mb-6 text-4xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-5xl md:text-6xl">
      Advancing{' '}
      <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
        Earth Intelligence
      </span>
    </h1>

    <p className="mx-auto max-w-2xl text-base font-normal leading-relaxed text-slate-400 sm:text-lg md:text-xl">
      Cutting-edge research, data-driven workflows, and AI strategies shaping the future of computational geophysics and signal processing.
    </p>
  </div>
</section>

      {/* 3. MAIN CONTENT CONTAINER */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-12 flex-1 w-full space-y-12">
        
        {/* BARRE DE RECHERCHE ET FILTRES */}
        <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl shadow-xl backdrop-blur-md space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Recherche */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search articles or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-800 bg-[#070b12] px-4 py-2.5 pl-10 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
              />
              <svg className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Catégories */}
            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20'
                      : 'bg-[#070b12] border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
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
          <div className="relative space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 block">
              ★ Featured Article
            </span>
            <Link 
              href={featuredPost.link}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 sm:p-8 hover:border-cyan-500/40 hover:bg-slate-900/60 transition-all duration-300 shadow-xl overflow-hidden"
            >
              <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[340px] bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
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
                    <span className="text-xs text-slate-400">{featuredPost.date}</span>
                    <span className="text-xs text-slate-500">• {featuredPost.readTime}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight group-hover:text-cyan-300 transition-colors mb-4">
                    {featuredPost.title}
                  </h2>

                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div className="inline-flex items-center text-sm font-semibold text-cyan-400 group-hover:text-cyan-300 pt-4">
                  Read Full Featured Article <span className="ml-2 transition-transform group-hover:translate-x-1.5">→</span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* REGULAR BLOG GRID */}
        <div className="space-y-6">
          {selectedCategory === 'All' && !searchQuery && (
            <h2 className="text-xl font-semibold text-white">Recent Publications &amp; Insights</h2>
          )}

          {regularPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {regularPosts.map((post) => (
                <Link 
                  key={post.id} 
                  href={post.link} 
                  className="group bg-slate-900/30 border border-slate-800/80 rounded-2xl p-6 hover:border-cyan-500/40 hover:bg-slate-900/60 transition-all duration-300 shadow-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="relative w-full h-56 bg-slate-900 rounded-xl mb-6 overflow-hidden border border-slate-800">
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
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white leading-snug group-hover:text-cyan-300 transition-colors mb-3">
                      {post.title}
                    </h3>

                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-white transition-colors">
                    <span>Read Article</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-900/20 border border-slate-800 rounded-2xl">
              <p className="text-slate-400 text-sm">
                No articles found matching your search criteria.
              </p>
            </div>
          )}
        </div>

      </main>

      {/* 4. FOOTER */}
      <footer className="relative z-10 w-full border-t border-slate-800/80 bg-[#04070d] px-6 py-14 text-slate-400 text-sm md:px-12 mt-auto">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 pb-12 lg:grid-cols-12">
            
            {/* BRAND & NEWSLETTER */}
            <div className="lg:col-span-5 space-y-4 pr-0 lg:pr-8">
              <h3 className="text-base font-semibold text-white tracking-wide">
                GeoSignal Institute
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                Bridging Earth Sciences and Artificial Intelligence through academic rigor and scientific excellence.
              </p>

              <div className="pt-3 space-y-2">
                <span className="block text-xs font-medium text-slate-300">
                  Join our newsletter
                </span>
                <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
                  <input
                    type="email"
                    placeholder="name@email.com"
                    className="w-full rounded-lg border border-slate-800 bg-slate-900/60 px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-lg bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-medium text-white border border-slate-700 transition-colors cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* NAVIGATION LINKS */}
            <div className="lg:col-span-7 grid grid-cols-3 gap-6 text-xs sm:text-sm">
              <div>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Links
                </h4>
                <ul className="space-y-2 text-slate-400 text-xs">
                  <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                  <li><Link href="/institute/about" className="hover:text-white transition-colors">The Institute Approach</Link></li>
                  <li><Link href="/institute/publications" className="hover:text-white transition-colors">Publications</Link></li>
                  <li><Link href="/institute/training" className="hover:text-white transition-colors">Training</Link></li>
                  <li><Link href="/institute/software" className="hover:text-white transition-colors">Open Source</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Pages
                </h4>
                <ul className="space-y-2 text-slate-400 text-xs">
                  <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                  <li><Link href="/institute" className="hover:text-white transition-colors">Overview</Link></li>
                  <li><Link href="/institute/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                  <li><Link href="/institute/careers" className="hover:text-white transition-colors">Careers</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Socials & Academic
                </h4>
                <ul className="space-y-2 text-slate-400 text-xs">
                  <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a></li>
                  <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a></li>
                  <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter / X</a></li>
                  <li><a href="https://www.researchgate.net" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ResearchGate</a></li>
                  <li><a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Google Scholar</a></li>
                </ul>
              </div>
            </div>

          </div>

          {/* BOTTOM BAR */}
          <div className="border-t border-slate-800/80 pt-6">
            <div className="flex flex-col items-center justify-between gap-4 text-xs text-slate-500 md:flex-row">
              <div className="flex items-center">
                <div className="rounded-md bg-white/90 px-2.5 py-1">
                  <Image 
                    src="/images/logo-institute.jpeg" 
                    alt="GeoSignal Institute Logo" 
                    width={110} 
                    height={30} 
                    className="h-6 w-auto object-contain"
                  />
                </div>
              </div>

              <div className="text-center md:text-left text-slate-400">
                Developed and designed by Dr. Innocent Oboué, PhD
              </div>

              <div className="text-center md:text-right text-slate-500">
                © {new Date().getFullYear()} GeoSignal Institute — All Rights Reserved
              </div>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}