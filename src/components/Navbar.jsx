import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, FileDown, ShieldCheck } from 'lucide-react';

export default function Navbar({ onOpenCV }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active section observer
      const sections = ['home', 'about', 'skills', 'experience', 'education', 'projects', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Education', href: '#education', id: 'education' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-dark-950/85 backdrop-blur-xl border-b border-slate-800/80 shadow-card-dark py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          className="group flex items-center gap-2 text-2xl font-black tracking-tight text-white select-none"
        >
          <span className="relative">
            WASI
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-electric text-3xl leading-none">
              .
            </span>
          </span>
          <span className="hidden sm:inline-block text-[10px] tracking-widest uppercase font-mono px-2 py-0.5 rounded-full bg-accent-violet/10 border border-accent-violet/30 text-accent-purple group-hover:border-accent-purple transition">
            DEV
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-dark-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs lg:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-accent-violet to-accent-purple text-white shadow-glow-purple font-semibold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Header Action: Download CV & Admin */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={onOpenCV}
            className="group relative inline-flex items-center gap-2 px-4 py-2 text-xs lg:text-sm font-semibold rounded-full text-white bg-slate-900 border border-slate-700/80 hover:border-accent-purple transition-all duration-300 shadow-sm hover:shadow-glow-purple overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-accent-violet/20 to-accent-electric/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <FileDown className="w-4 h-4 text-accent-electric group-hover:-translate-y-0.5 transition-transform duration-200" />
            <span className="relative">Download CV</span>
          </button>

          <Link
            to="/admin"
            className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-accent-electric transition"
            title="Private Admin Console"
          >
            <ShieldCheck className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenCV}
            className="p-2 rounded-lg bg-dark-850 border border-slate-800 text-accent-electric hover:text-white transition"
            title="Download CV"
          >
            <FileDown className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-dark-850 border border-slate-800 text-slate-200 hover:text-white hover:bg-dark-800 transition focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-accent-purple" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Responsive Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-dark-950/95 backdrop-blur-2xl border-b border-slate-800/80 shadow-2xl px-6 py-6 animate-fade-in">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-accent-violet/15 text-accent-purple border border-accent-violet/30'
                      : 'text-slate-300 hover:bg-slate-850 hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-accent-purple shadow-glow-purple" />}
                </a>
              );
            })}

            <div className="pt-4 mt-2 border-t border-slate-800/80 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCV();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-accent-violet to-accent-purple shadow-glow-purple"
              >
                <FileDown className="w-4 h-4" />
                <span>View & Download CV</span>
              </button>

              <Link
                to="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-mono rounded-xl text-slate-300 bg-dark-850 border border-slate-800"
              >
                <ShieldCheck className="w-4 h-4 text-accent-electric" />
                <span>Admin Dashboard Login</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

