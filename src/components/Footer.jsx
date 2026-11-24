import React from 'react';
import { ArrowUp, Heart, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';

const currentYear = 2026;

export default function Footer({ onOpenCV }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-dark-950 border-t border-slate-800/80 pt-16 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-accent-violet/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <a href="#home" className="inline-flex items-center gap-2 text-2xl font-black text-white">
              <span>
                WASI
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-electric text-3xl">
                  .
                </span>
              </span>
            </a>
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Professional WordPress Developer & Web Designer dedicated to delivering fast, modern, and high-impact digital experiences.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com/wasiullahP92"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-dark-850 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition"
                aria-label="GitHub"
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/wasi-ullah-693810333/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-dark-850 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-dark-850 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className="w-9 h-9 rounded-xl bg-dark-850 hover:bg-slate-800 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-pink-400 transition"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-4">
              Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-slate-400 hover:text-accent-electric transition py-1"
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={onOpenCV}
                className="text-left text-accent-purple hover:text-white transition py-1 font-medium"
              >
                Download CV
              </button>
            </div>
          </div>

          {/* Contact Direct */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono mb-4">
              Get in Touch
            </h4>
            <p className="text-xs text-slate-400">Direct Inquiries & Project Briefs:</p>
            <a
              href={`mailto:${personalInfo.email}`}
              className="text-sm font-semibold text-accent-electric hover:underline block break-all"
            >
              {personalInfo.email}
            </a>
            <p className="text-xs text-slate-500 pt-2 font-mono">
              {personalInfo.location} • Remote Worldwide
            </p>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>
            © {currentYear} <span className="text-slate-300 font-semibold">{personalInfo.name}</span>. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-400">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for the modern web
            </span>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-white border border-slate-800 transition"
              aria-label="Back to top"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 text-accent-purple" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
