import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Code, Send, Layout, ShieldCheck, CheckCircle2, FileText, Download, Sparkles, BookOpen } from 'lucide-react';
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

  useEffect(() => {
    // Attempt to load live profile metadata if updated via Admin Dashboard
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
        // Fallback to static default
      }
    };
    loadProfile();
  }, []);

  useEffect(() => {
    // Respect user reduced-motion preference
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
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
                {profile.status}
              </span>
            </div>

            {/* Main Headings */}
            <div ref={titleRef} className="space-y-4">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-widest text-accent-electric font-mono">
                <Sparkles className="w-4 h-4 text-accent-electric" />
                <span>WordPress Developer & CS Student</span>
              </div>
              
              {/* Requested Primary Heading */}
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

              {/* Requested Subtitle */}
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

          {/* Right Visual / Profile Card */}
          <div ref={visualRef} className="lg:col-span-5 flex justify-center items-center relative">
            
            {/* Ambient Backlight Circle */}
            <div className="absolute w-72 h-72 sm:w-88 sm:h-88 rounded-full bg-gradient-to-tr from-accent-violet/30 via-indigo-600/20 to-accent-electric/30 blur-[90px] pointer-events-none animate-pulse-glow" />

            {/* Main Interactive Card Container */}
            <div className="relative w-full max-w-[370px] sm:max-w-[410px] aspect-[4/5] rounded-3xl p-1 bg-gradient-to-b from-slate-700/50 via-slate-800/20 to-accent-violet/30 shadow-2xl backdrop-blur-xl">
              
              <div className="relative w-full h-full rounded-[22px] bg-dark-900/90 border border-slate-800 flex flex-col items-center justify-between p-7 text-center overflow-hidden">
                
                {/* Background decorative art inside avatar box */}
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-violet/20 via-transparent to-accent-electric/15 opacity-60" />
                
                {/* Developer Avatar Placeholder */}
                <div className="relative w-full flex flex-col items-center mt-2">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-accent-violet to-accent-electric p-1 shadow-glow-combo mb-4">
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

                  <h3 className="text-xl font-bold text-white tracking-tight">{profile.name}</h3>
                  <p className="text-xs sm:text-sm text-accent-electric font-medium mt-0.5">WordPress Developer & Designer</p>
                  <p className="text-[11px] text-slate-400 mt-2 font-mono flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-accent-purple" />
                    <span>{profile.location.toUpperCase()}</span>
                  </p>
                </div>

                {/* Micro Details in Card */}
                <div className="w-full space-y-2 pt-4 border-t border-slate-800/80 relative z-10">
                  <div className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-dark-850/60 border border-slate-800/60">
                    <span className="text-slate-400 font-mono">Academic:</span>
                    <span className="text-white font-medium">NCS University System</span>
                  </div>
                  <div className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-dark-850/60 border border-slate-800/60">
                    <span className="text-slate-400 font-mono">Training:</span>
                    <span className="text-accent-electric font-medium">Saylani IT (React.js)</span>
                  </div>
                </div>

              </div>

              {/* Floating Badge 1 - Top Left */}
              <div className="hero-float-1 absolute -top-5 -left-4 sm:-left-6 px-4 py-2.5 rounded-xl glass-panel border border-slate-700/80 shadow-glow-purple flex items-center gap-2.5 z-20">
                <div className="w-8 h-8 rounded-lg bg-accent-violet/20 flex items-center justify-center text-accent-purple">
                  <Layout className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-mono uppercase">Expertise</p>
                  <p className="text-xs font-bold text-white">WordPress & Elementor</p>
                </div>
              </div>

              {/* Floating Badge 2 - Middle Right */}
              <div className="hero-float-2 absolute top-1/2 -right-4 sm:-right-8 -translate-y-1/2 px-4 py-2.5 rounded-xl glass-panel border border-slate-700/80 shadow-glow-cyan flex items-center gap-2.5 z-20">
                <div className="w-8 h-8 rounded-lg bg-accent-electric/20 flex items-center justify-center text-accent-electric">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-mono uppercase">Saylani IT Focus</p>
                  <p className="text-xs font-bold text-accent-electric">Learning React.js</p>
                </div>
              </div>

              {/* Floating Badge 3 - Bottom Left */}
              <div className="hero-float-3 absolute -bottom-5 left-4 px-4 py-2 rounded-xl glass-panel border border-slate-700/80 shadow-lg flex items-center gap-2.5 z-20">
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 font-mono uppercase">Academic Status</p>
                  <p className="text-xs font-bold text-white">CS Student @ NCS</p>
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
              className="glass-panel p-5 rounded-xl border border-slate-800/80 text-center hover:border-accent-purple/40 transition duration-300"
            >
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-accent-electric mt-1">
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
