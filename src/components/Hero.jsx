import React, { useEffect, useRef, useState } from 'react';
import { 
  ArrowRight, 
  Code, 
  Send, 
  Layout, 
  ShieldCheck, 
  CheckCircle2, 
  FileText, 
  Download, 
  Sparkles, 
  BookOpen,
  GraduationCap,
  Star,
  MapPin,
  Globe,
  Boxes
} from 'lucide-react';
import gsap from 'gsap';
import { personalInfo as defaultInfo } from '../data/portfolioData';
import { api } from '../utils/api';

export default function Hero({ onOpenCV }) {
  const [profile, setProfile] = useState(defaultInfo);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const badgeRef = useRef(null);
  const actionsRef = useRef(null);
  const visualRef = useRef(null);
  const cardContainerRef = useRef(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.getPublicProfile();
        if (res.success && res.profile) {
          setProfile((prev) => ({
            ...prev,
            name: res.profile.name || prev.name,
            role: res.profile.professionalTitle || prev.role,
            shortIntro: res.profile.shortIntro || prev.shortIntro,
            location: res.profile.location || prev.location,
            currentLearningTech: res.profile.currentLearningTech || prev.currentLearningTech,
          }));
        }
      } catch {
        // Fallback to default
      }
    };
    loadProfile();
  }, []);

  // GSAP Entrance & Floating Animation
  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (badgeRef.current) {
        tl.fromTo(
          badgeRef.current,
          { y: -25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 0.1, clearProps: 'transform' }
        );
      }

      if (titleRef.current && titleRef.current.children.length) {
        tl.fromTo(
          titleRef.current.children,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.12, clearProps: 'transform' },
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
          { scale: 0.92, opacity: 0, y: 30 },
          { scale: 1, opacity: 1, y: 0, duration: 0.9, clearProps: 'transform' },
          '-=0.5'
        );
      }

      // Stagger entrance for floating badges
      tl.fromTo(
        '.hero-float-badge',
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'back.out(1.7)' },
        '-=0.4'
      );

      // Continuous organic float animations
      gsap.to('.hero-float-1', {
        y: -12,
        rotation: 1,
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
      gsap.to('.hero-float-2', {
        y: 14,
        rotation: -1.2,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.4,
      });
      gsap.to('.hero-float-3', {
        y: -10,
        rotation: 0.8,
        duration: 2.9,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.8,
      });
      gsap.to('.hero-float-4', {
        y: 11,
        rotation: -1,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.1,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Interactive 3D Mouse Parallax Effect
  const handleMouseMove = (e) => {
    if (!cardContainerRef.current) return;
    const rect = cardContainerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to('.hero-3d-card', {
      rotationY: x * 0.04,
      rotationX: -y * 0.04,
      transformPerspective: 1000,
      ease: 'power1.out',
      duration: 0.4,
    });

    gsap.to('.hero-float-1', { x: x * 0.05, y: -12 + y * 0.05, duration: 0.5 });
    gsap.to('.hero-float-2', { x: x * -0.06, y: 14 + y * -0.06, duration: 0.5 });
    gsap.to('.hero-float-3', { x: x * 0.04, y: -10 + y * 0.04, duration: 0.5 });
    gsap.to('.hero-float-4', { x: x * -0.04, y: 11 + y * -0.04, duration: 0.5 });
  };

  const handleMouseLeave = () => {
    gsap.to('.hero-3d-card', {
      rotationY: 0,
      rotationX: 0,
      ease: 'power2.out',
      duration: 0.7,
    });
    gsap.to('.hero-float-1', { x: 0, y: -12, duration: 0.7 });
    gsap.to('.hero-float-2', { x: 0, y: 14, duration: 0.7 });
    gsap.to('.hero-float-3', { x: 0, y: -10, duration: 0.7 });
    gsap.to('.hero-float-4', { x: 0, y: 11, duration: 0.7 });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-[94vh] pt-32 pb-20 flex items-center justify-center overflow-hidden"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-violet/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-[500px] h-[500px] bg-accent-electric/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-full bg-grid-pattern opacity-60 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column (Span 7) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-7">
            {/* Status Pill */}
            <div ref={badgeRef} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-dark-850/80 border border-slate-700/80 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-medium text-slate-300">
                {profile.status}
              </span>
            </div>

            {/* Main Headings */}
            <div ref={titleRef} className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-widest text-accent-electric font-mono">
                <Sparkles className="w-4 h-4 text-accent-electric" />
                <span>WordPress Developer & CS Student</span>
              </div>
              
              {/* Primary Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                Building Modern Websites & <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-indigo-300 to-accent-electric drop-shadow-sm">
                  Exploring New Technologies.
                </span>
              </h1>

              {/* Professional Title Subhead */}
              <div className="text-sm sm:text-base font-semibold text-accent-electric/90 flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 font-mono">
                <span>WordPress Developer</span>
                <span className="text-slate-600">•</span>
                <span>Web Designer</span>
                <span className="text-slate-600">•</span>
                <span className="text-accent-purple">Full-Stack Developer in Progress</span>
              </div>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed pt-1">
                I'm Wasi Ullah, a WordPress Developer and Computer Science student currently expanding my skills in React.js and modern web development.
              </p>
            </div>

            {/* Action Buttons */}
            <div ref={actionsRef} className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-accent-violet to-accent-purple shadow-glow-purple hover:shadow-glow-combo transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <span>Explore My Projects</span>
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-sm text-slate-200 bg-dark-800/80 hover:bg-slate-700/80 border border-slate-700 hover:border-accent-purple transition-all duration-300 shadow-sm"
              >
                <Download className="w-4 h-4 text-accent-purple" />
                <span>Download CV</span>
              </button>
            </div>

            {/* Quick Tech Tags */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs text-slate-400">
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500 mr-1">Specializing in:</span>
              <span className="px-2.5 py-1 rounded-md bg-dark-850 border border-slate-800 text-slate-300 font-mono">WordPress</span>
              <span className="px-2.5 py-1 rounded-md bg-dark-850 border border-slate-800 text-slate-300 font-mono">Elementor</span>
              <span className="px-2.5 py-1 rounded-md bg-dark-850 border border-slate-800 text-slate-300 font-mono">React.js (Learning)</span>
              <span className="px-2.5 py-1 rounded-md bg-dark-850 border border-slate-800 text-slate-300 font-mono">NCS University</span>
            </div>

          </div>

          {/* Right Column: Remodified Grand Portrait Showcase with 3D Tilt (Span 5) */}
          <div
            ref={visualRef}
            className="lg:col-span-5 flex justify-center items-center relative py-6"
          >
            {/* Ambient Multi-Layer Backlight Halos */}
            <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-accent-violet/30 via-indigo-600/20 to-accent-electric/30 blur-[110px] pointer-events-none animate-pulse-glow" />
            <div className="absolute w-60 h-60 rounded-full bg-accent-electric/20 blur-[80px] pointer-events-none" />

            {/* 3D Tilt Interactive Wrapper */}
            <div
              ref={cardContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[3/4] cursor-pointer"
            >
              {/* Main Grand Portrait Card */}
              <div className="hero-3d-card w-full h-full rounded-[28px] p-1.5 bg-gradient-to-b from-accent-purple/40 via-slate-800/40 to-accent-electric/30 shadow-[0_20px_60px_-15px_rgba(139,92,246,0.3)] backdrop-blur-xl relative transition-shadow duration-500 hover:shadow-[0_25px_70px_-10px_rgba(6,182,212,0.35)]">
                
                <div className="w-full h-full rounded-[24px] bg-dark-900 relative overflow-hidden border border-slate-700/60 flex flex-col justify-between">
                  
                  {/* The Full High-Res Portrait Image */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden bg-dark-950">
                    <img
                      src="/wasi-profile.jpg"
                      alt="Wasi Ullah"
                      className="w-full h-full object-cover object-[center_12%] scale-105 transition-transform duration-700 hover:scale-110"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden absolute inset-0 bg-dark-900 flex items-center justify-center">
                      <span className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-white via-purple-200 to-accent-electric">
                        WU
                      </span>
                    </div>

                    {/* Subtle Lighting Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-transparent opacity-90 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-accent-violet/10 via-transparent to-accent-electric/10 pointer-events-none" />
                  </div>

                  {/* Top Header Badge Inside Card */}
                  <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-950/80 backdrop-blur-md border border-slate-700/80 shadow-lg">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-mono font-semibold text-emerald-300">
                        Available for Projects
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-dark-950/80 backdrop-blur-md border border-slate-700 flex items-center justify-center text-accent-electric shadow-md">
                      <Code className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Information Glass Overlay Inside Card */}
                  <div className="relative z-10 p-5 sm:p-6 bg-dark-950/85 backdrop-blur-md border-t border-slate-800/80 rounded-b-[24px]">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                        {profile.name}
                      </h3>
                      <div className="flex items-center gap-1 text-amber-400 text-xs font-mono font-bold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>Verified</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm font-semibold text-accent-electric font-mono">
                      WordPress Developer & Web Designer
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-300 font-mono">
                      <span className="flex items-center gap-1 text-slate-400">
                        <MapPin className="w-3 h-3 text-accent-purple" />
                        <span>{profile.location}</span>
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="text-slate-300">NCS University</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* ========================================================
                  4 FLOATING GLASS BADGES ORBITING THE PORTRAIT
              ======================================================== */}

              {/* Floating Badge 1 - Top Left */}
              <div className="hero-float-badge hero-float-1 absolute -top-4 -left-6 sm:-left-8 px-4 py-2.5 rounded-2xl glass-panel border border-slate-700/80 shadow-[0_10px_25px_rgba(139,92,246,0.3)] flex items-center gap-3 z-20 backdrop-blur-xl">
                <div className="w-9 h-9 rounded-xl bg-accent-violet/25 border border-accent-violet/40 flex items-center justify-center text-accent-purple shadow-sm">
                  <Layout className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Expertise</p>
                  <p className="text-xs font-bold text-white">WordPress & Elementor</p>
                </div>
              </div>

              {/* Floating Badge 2 - Top Right */}
              <div className="hero-float-badge hero-float-2 absolute top-12 -right-6 sm:-right-8 px-4 py-2.5 rounded-2xl glass-panel border border-accent-electric/40 shadow-[0_10px_25px_rgba(6,182,212,0.3)] flex items-center gap-3 z-20 backdrop-blur-xl">
                <div className="w-9 h-9 rounded-xl bg-accent-electric/20 border border-accent-electric/40 flex items-center justify-center text-accent-electric shadow-sm">
                  <Boxes className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Saylani IT</p>
                  <p className="text-xs font-bold text-accent-electric">Learning React.js</p>
                </div>
              </div>

              {/* Floating Badge 3 - Bottom Left */}
              <div className="hero-float-badge hero-float-3 absolute bottom-24 -left-6 sm:-left-8 px-4 py-2.5 rounded-2xl glass-panel border border-slate-700/80 shadow-xl flex items-center gap-3 z-20 backdrop-blur-xl">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-sm">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Undergrad</p>
                  <p className="text-xs font-bold text-white">CS @ NCS University</p>
                </div>
              </div>

              {/* Floating Badge 4 - Bottom Right */}
              <div className="hero-float-badge hero-float-4 absolute -bottom-5 right-2 sm:right-4 px-4 py-2.5 rounded-2xl glass-panel border border-amber-500/30 shadow-[0_10px_25px_rgba(245,158,11,0.2)] flex items-center gap-3 z-20 backdrop-blur-xl">
                <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-sm">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Performance</p>
                  <p className="text-xs font-bold text-white">100% Satisfaction</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Hero Stats Strip */}
        <div className="mt-16 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {defaultInfo.stats.map((stat, index) => (
            <div
              key={index}
              className="glass-panel p-5 rounded-xl border border-slate-800/80 text-center hover:border-accent-purple/40 transition duration-300 group"
            >
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-accent-electric transition">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-accent-purple mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {stat.description}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
