import React, { useEffect, useRef } from 'react';
import { ArrowRight, Code, Send, Layout, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';
import gsap from 'gsap';
import { personalInfo } from '../data/portfolioData';

export default function Hero({ onOpenCV }) {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const badgeRef = useRef(null);
  const actionsRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    // Respect user reduced-motion preference
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Intro timeline using fromTo to avoid React 19 StrictMode double-mount 0-opacity trap
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { y: -20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 0.1, clearProps: 'transform' }
        );
      }

      if (titleRef.current && titleRef.current.children.length) {
        tl.fromTo(
          titleRef.current.children,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, clearProps: 'transform' },
          '-=0.3'
        );
      }

      if (actionsRef.current && actionsRef.current.children.length) {
        tl.fromTo(
          actionsRef.current.children,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, clearProps: 'transform' },
          '-=0.3'
        );
      }

      if (visualRef.current) {
        tl.fromTo(
          visualRef.current,
          { scale: 0.9, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, clearProps: 'transform' },
          '-=0.5'
        );
      }

      // Floating subtle animations for micro-cards
      gsap.to('.hero-float-1', {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.hero-float-2', {
        y: 12,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5,
      });
      gsap.to('.hero-float-3', {
        y: -8,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[92vh] pt-32 pb-20 flex items-center justify-center overflow-hidden"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-violet/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[450px] h-[450px] bg-accent-electric/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-7">
            {/* Status Pill */}
            <div ref={badgeRef} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-dark-850/80 border border-slate-700/80 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-300">
                {personalInfo.status}
              </span>
            </div>

            {/* Main Headings */}
            <div ref={titleRef} className="space-y-3">
              <p className="text-sm sm:text-base font-semibold uppercase tracking-widest text-accent-electric font-mono">
                Welcome to my universe
              </p>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                Hi, I'm <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-accent-purple drop-shadow-sm">
                  {personalInfo.name}
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-indigo-300 to-accent-electric pt-1">
                {personalInfo.role}
              </h2>
              <p className="text-base sm:text-lg text-slate-300/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed pt-2">
                {personalInfo.shortIntro}
              </p>
            </div>

            {/* Action Buttons */}
            <div ref={actionsRef} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-accent-violet to-accent-purple shadow-glow-purple hover:shadow-glow-combo transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>View My Projects</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-dark-850/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-accent-electric transition-all duration-300 transform hover:-translate-y-0.5 shadow-sm"
              >
                <Send className="w-4 h-4 text-accent-electric" />
                <span>Contact Me</span>
              </a>

              <button
                onClick={onOpenCV}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-xs sm:text-sm text-slate-400 hover:text-white transition duration-200"
              >
                <FileText className="w-4 h-4 text-accent-purple" />
                <span>View Resume</span>
              </button>
            </div>

            {/* Quick Tech Tags */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-slate-400">
              <span className="font-mono uppercase text-[11px] tracking-wider text-slate-500 mr-2">Specializing in:</span>
              <span className="px-3 py-1 rounded-lg bg-dark-850 border border-slate-800 text-slate-300">WordPress</span>
              <span className="px-3 py-1 rounded-lg bg-dark-850 border border-slate-800 text-slate-300">Elementor Pro</span>
              <span className="px-3 py-1 rounded-lg bg-dark-850 border border-slate-800 text-slate-300">WooCommerce</span>
              <span className="px-3 py-1 rounded-lg bg-dark-850 border border-slate-800 text-slate-300">Responsive UI/UX</span>
              <span className="px-3 py-1 rounded-lg bg-dark-850 border border-slate-800 text-slate-300">Web Maintenance</span>
            </div>
          </div>

          {/* Right Visual Profile Column */}
          <div ref={visualRef} className="lg:col-span-5 flex justify-center items-center relative">
            <div className="relative w-72 h-72 sm:w-88 sm:h-88 lg:w-96 lg:h-96">
              
              {/* Outer Glowing Gradient Halo Rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent-purple via-accent-violet to-accent-electric opacity-35 blur-2xl animate-pulse-slow" />
              <div className="absolute -inset-2 rounded-full border border-dashed border-accent-purple/30 animate-spin-slow pointer-events-none" />

              {/* Main Profile Avatar Card */}
              <div className="relative w-full h-full rounded-3xl bg-gradient-to-b from-dark-800 to-dark-900 border-2 border-slate-700/60 p-3 shadow-2xl flex items-center justify-center overflow-hidden group">
                
                {/* Background decorative art inside avatar box */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-violet/20 via-transparent to-accent-electric/15 opacity-60" />
                
                {/* Developer Avatar Placeholder */}
                <div className="relative w-full h-full rounded-2xl bg-dark-850 flex flex-col items-center justify-center p-6 text-center border border-slate-700/40 overflow-hidden">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-accent-violet to-accent-electric p-1 shadow-glow-combo mb-4">
                    <div className="w-full h-full rounded-full bg-dark-900 overflow-hidden flex items-center justify-center">
                      <img
                        src="/wasi-profile.jpg"
                        alt="Wasi Ullah"
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <span className="hidden text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-white via-purple-200 to-accent-electric">
                        WU
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight">Wasi Ullah</h3>
                  <p className="text-xs sm:text-sm text-accent-electric font-medium mt-0.5">WordPress Developer</p>
                  <p className="text-[11px] text-slate-400 mt-2 font-mono flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-accent-purple" />
                    PESHAWAR, PAKISTAN
                  </p>
                </div>
              </div>

              {/* Floating Badge 1: WordPress Specialist */}
              <div className="hero-float-1 absolute -top-4 -left-6 sm:-left-8 glass-panel px-3.5 py-2.5 rounded-xl border border-accent-purple/40 shadow-glow-purple flex items-center gap-2.5 z-20">
                <div className="w-8 h-8 rounded-lg bg-accent-violet/20 flex items-center justify-center text-accent-purple">
                  <Layout className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-mono">Expertise</p>
                  <p className="text-xs font-bold text-white">WordPress & Elementor</p>
                </div>
              </div>

              {/* Floating Badge 2: Responsive Design */}
              <div className="hero-float-2 absolute -bottom-5 -left-4 sm:-left-6 glass-panel px-3.5 py-2.5 rounded-xl border border-accent-electric/40 shadow-glow-cyan flex items-center gap-2.5 z-20">
                <div className="w-8 h-8 rounded-lg bg-accent-electric/20 flex items-center justify-center text-accent-electric">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-mono">Design Standard</p>
                  <p className="text-xs font-bold text-white">100% Mobile Responsive</p>
                </div>
              </div>

              {/* Floating Badge 3: Fast & Secure */}
              <div className="hero-float-3 absolute top-1/2 -right-6 sm:-right-8 -translate-y-1/2 glass-panel px-3.5 py-2.5 rounded-xl border border-slate-700/80 shadow-card-dark flex items-center gap-2.5 z-20">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-mono">Reliability</p>
                  <p className="text-xs font-bold text-white">Speed & SEO Ready</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Highlight Stats Bar */}
        <div className="mt-16 pt-10 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {personalInfo.stats.map((stat, index) => (
            <div key={index} className="p-4 rounded-xl bg-dark-900/50 border border-slate-800/80 hover:border-slate-700 transition">
              <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-200">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-accent-purple mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5 font-mono">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

