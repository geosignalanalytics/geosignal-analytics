'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// (HeroWaveBackground reste identique...)

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    details: '',
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Remplacez '/api/contact' par votre endpoint d'envoi (Resend, Formspree, etc.)
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', details: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Erreur d’envoi :', error);
      setStatus('error');
    }
  };

  return (
    // ... Garder tout le début du code identique
    
    {/* COLONNE DROITE : Formulaire Pro */}
    <div className="lg:col-span-7 bg-[#0b1329]/90 border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="firstName" className="text-xs font-semibold uppercase tracking-wider text-slate-300">First Name</label>
            <input 
              type="text" 
              id="firstName" 
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="Innocent" 
              className="bg-[#050b14] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="lastName" className="text-xs font-semibold uppercase tracking-wider text-slate-300">Last Name</label>
            <input 
              type="text" 
              id="lastName" 
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Oboue" 
              className="bg-[#050b14] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-slate-300">Email Address</label>
            <input 
              type="email" 
              id="email" 
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="contact@example.com" 
              className="bg-[#050b14] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-slate-300">Phone Number</label>
            <input 
              type="tel" 
              id="phone" 
              value={formData.phone}
              onChange={handleChange}
              placeholder="+225 00 00 00 00" 
              className="bg-[#050b14] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="details" className="text-xs font-semibold uppercase tracking-wider text-slate-300">Project Details</label>
          <textarea 
            id="details" 
            rows={5}
            value={formData.details}
            onChange={handleChange}
            required
            placeholder="Describe your research, subsurface imaging, or exploration inquiry..." 
            className="bg-[#050b14] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-y"
          ></textarea>
        </div>

        {status === 'success' && (
          <p className="text-emerald-400 text-sm font-medium">Message sent successfully!</p>
        )}
        {status === 'error' && (
          <p className="text-rose-400 text-sm font-medium">Failed to send message. Please try again.</p>
        )}

        <button 
          type="submit" 
          disabled={status === 'loading'}
          className="mt-2 w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-4 px-6 shadow-lg shadow-cyan-500/20 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50"
        >
          <span>{status === 'loading' ? 'Sending...' : 'Submit Project Inquiry'}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 group-hover:translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>

      </form>
    </div>
  );
}