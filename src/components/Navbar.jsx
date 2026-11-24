import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { Menu, X, FileDown, ShieldCheck, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

export default function Navbar({ onOpenCV }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFullscreenMenuOpen, setIsFullscreenMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const fullscreenMenuRef = useRef(null);
  const menuLinksRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Active section observer
      const sections = ['home', 'about', 'skills', 'education', 'training', 'journey', 'experience', 'projects', 'contact'];
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
    { num: '01', name: 'Home', href: '#home', id: 'home' },
    { num: '02', name: 'About', href: '#about', id: 'about' },
    { num: '03', name: 'Skills', href: '#skills', id: 'skills' },
    { num: '04', name: 'Education', href: '#education', id: 'education' },
    { num: '05', name: 'Training', href: '#training', id: 'training' },
    { num: '06', name: 'Journey', href: '#journey', id: 'journey' },
    { num: '07', name: 'Experience', href: '#experience', id: 'experience' },
    { num: '08', name: 'Projects', href: '#projects', id: 'projects' },
    { num: '09', name: 'Contact', href: '#contact', id: 'contact' },
  ];

  // GSAP animation for fullscreen menu open/close
  useEffect(() => {
    const menuEl = fullscreenMenuRef.current;
    if (!menuEl) return;

    if (isFullscreenMenuOpen) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.set(menuEl, { display: 'flex', opacity: 0 })
        .to(menuEl, { opacity: 1, duration: 0.35, ease: 'power2.out' })
        .fromTo(
          menuEl.querySelectorAll('.fullscreen-link'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.04, ease: 'power3.out' },
          '-=0.1'
        )
        .fromTo(
          menuEl.querySelectorAll('.fullscreen-footer-item'),
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out' },
          '-=0.2'
        );
    } else {
      document.body.style.overflow = '';
      gsap.to(menuEl, {
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(menuEl, { display: 'none' });
        },
      });
    }
  }, [isFullscreenMenuOpen]);

  const handleNavClick = (href) => {
    setIsFullscreenMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
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
            data-cursor="WASI"
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
          <nav className="hidden lg:flex items-center gap-1 bg-dark-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
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
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
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

          {/* Actions: Fullscreen Menu Toggle & CV */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenCV}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-full text-white bg-slate-900 border border-slate-700/80 hover:border-accent-purple transition-all duration-300 shadow-sm hover:shadow-glow-purple overflow-hidden"
            >
              <FileDown className="w-3.5 h-3.5 text-accent-electric" />
              <span>Download CV</span>
            </button>

            {/* Cinematic Fullscreen Menu Trigger Button */}
            <button
              onClick={() => setIsFullscreenMenuOpen(true)}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-accent-violet/15 hover:bg-accent-violet/30 border border-accent-purple/40 text-white text-xs font-mono font-bold tracking-wider uppercase transition-all shadow-glow-sm"
              data-cursor="MENU"
            >
              <Menu className="w-4 h-4 text-accent-electric group-hover:rotate-90 transition-transform duration-300" />
              <span>Menu</span>
            </button>

            <Link
              to="/admin"
              className="p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-accent-electric transition"
              title="Private Admin Console"
            >
              <ShieldCheck className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Feature 14: Fullscreen Menu Animation Overlay */}
      <div
        ref={fullscreenMenuRef}
        style={{ display: 'none' }}
        className="fixed inset-0 z-50 bg-[#06070b]/98 backdrop-blur-3xl flex flex-col justify-between p-6 sm:p-12 overflow-y-auto"
      >
        {/* Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-purple/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent-electric/10 rounded-full blur-[150px] pointer-events-none" />

        {/* Top Bar inside Fullscreen Menu */}
        <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-6">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black text-white">WASI ULLAH<span className="text-accent-electric">.</span></span>
            <span className="text-xs font-mono text-slate-400 uppercase tracking-widest hidden sm:inline">
              // Creative Navigation
            </span>
          </div>

          <button
            onClick={() => setIsFullscreenMenuOpen(false)}
            aria-label="Close fullscreen menu"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-dark-900 border border-slate-700 text-white text-xs font-mono uppercase tracking-wider hover:border-red-500 hover:text-red-400 transition-all"
            data-cursor="CLOSE"
          >
            <span>Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Staggered Fullscreen Links */}
        <div
          ref={menuLinksRef}
          className="relative z-10 max-w-5xl mx-auto w-full py-10 grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className="fullscreen-link group flex items-center justify-between py-2.5 px-4 rounded-2xl hover:bg-accent-violet/10 border border-transparent hover:border-accent-purple/30 transition-all duration-300"
              data-cursor="GO"
            >
              <div className="flex items-center gap-4">
                <span className="text-xs sm:text-sm font-mono text-slate-500 group-hover:text-accent-electric transition-colors">
                  {link.num}
                </span>
                <span className="text-2xl sm:text-4xl font-black tracking-tight text-slate-200 group-hover:text-white group-hover:translate-x-2 transition-all">
                  {link.name}
                </span>
              </div>
              <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-accent-electric group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </a>
          ))}
        </div>

        {/* Bottom Footer Info inside Menu */}
        <div className="relative z-10 border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="fullscreen-footer-item flex items-center gap-4 text-xs font-mono text-slate-400">
            <span>Peshawar, Pakistan</span>
            <span>•</span>
            <a href="mailto:wasiwebsolution@gmail.com" className="text-accent-electric hover:underline">
              wasiwebsolution@gmail.com
            </a>
          </div>

          <div className="fullscreen-footer-item flex items-center gap-4">
            <button
              onClick={() => {
                setIsFullscreenMenuOpen(false);
                onOpenCV();
              }}
              className="px-4 py-2 rounded-xl bg-accent-violet/20 border border-accent-purple/40 text-xs font-mono text-white flex items-center gap-2 hover:bg-accent-violet/30 transition"
            >
              <FileDown className="w-3.5 h-3.5 text-accent-electric" />
              <span>Download CV</span>
            </button>

            <Link
              to="/admin"
              onClick={() => setIsFullscreenMenuOpen(false)}
              className="px-4 py-2 rounded-xl bg-dark-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 hover:border-slate-700 transition"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-accent-purple" />
              <span>Admin</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
