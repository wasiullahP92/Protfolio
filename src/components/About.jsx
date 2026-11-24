import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { 
  UserCheck, 
  GraduationCap, 
  CheckCircle, 
  Globe, 
  Sparkles, 
  FileDown, 
  ArrowRight,
  Cpu,
  BookOpen,
  Code
} from 'lucide-react';
import { api } from '../utils/api';
import { personalInfo as defaultInfo } from '../data/portfolioData';

export default function About({ onOpenCV }) {
  const [profile, setProfile] = useState(defaultInfo);
  const cardsRef = useRef(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await api.getPublicProfile();
        if (res.success && res.profile && res.profile.shortIntro) {
          setProfile((prev) => ({
            ...prev,
            shortIntro: res.profile.shortIntro,
            role: res.profile.professionalTitle || prev.role,
          }));
        }
      } catch {
        // Use default
      }
    };
    loadProfile();
  }, []);

  useEffect(() => {
    if (!cardsRef.current) return;
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      cardsRef.current.children,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.1 }
    );
  }, []);

  const highlights = [
    {
      title: "Computer Science Student",
      institution: "NCS University System",
      description: "Currently studying Computer Science in Peshawar, Pakistan. Strengthening analytical thinking and software design foundations.",
      icon: GraduationCap,
      color: "from-purple-500/20 to-purple-600/10",
      accent: "text-accent-purple",
      badge: "Currently Studying",
    },
    {
      title: "WordPress Developer",
      institution: "Web Design & Maintenance",
      description: "Proven experience building and maintaining custom WordPress websites, WooCommerce stores, and Elementor Pro layouts.",
      icon: Globe,
      color: "from-cyan-500/20 to-cyan-600/10",
      accent: "text-accent-electric",
      badge: "Core Experience",
    },
    {
      title: "Professional IT Training",
      institution: "Saylani IT Mass Training",
      description: "Currently learning Modern Web Development with an intensive focus on JavaScript (ES6+) and React.js application design.",
      icon: BookOpen,
      color: "from-indigo-500/20 to-indigo-600/10",
      accent: "text-indigo-400",
      badge: "Active Focus: React.js",
    },
    {
      title: "Diploma in IT (DIT)",
      institution: "Excel Learners Academy",
      description: "Completed Diploma in Information Technology, acquiring solid technical fundamentals in databases, web design, and IT systems.",
      icon: Cpu,
      color: "from-pink-500/20 to-pink-600/10",
      accent: "text-pink-400",
      badge: "Completed Qualification",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-dark-900/40">
      {/* Background accents */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-accent-violet/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-violet/10 border border-accent-violet/30 text-accent-purple text-xs font-semibold tracking-wider uppercase font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover My Story</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-electric">Me</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            WordPress Developer, Computer Science student, and aspiring Full-Stack engineer.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Personal Narrative & Philosophy */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-purple via-indigo-500 to-accent-electric" />
              
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span>Who is Wasi Ullah?</span>
                </h3>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-accent-violet/20 border border-accent-violet/40 text-accent-purple">
                  Peshawar, Pakistan
                </span>
              </div>

              {/* Exact Requested Professional Introduction */}
              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p className="text-white/95 font-medium border-l-2 border-accent-electric pl-4 py-1 bg-slate-900/40 rounded-r-lg">
                  "Hi, I'm Wasi Ullah, a passionate web developer and Computer Science student. I specialize in WordPress website design and development. I am continuously improving my development skills and exploring modern web technologies. Currently, I am learning React.js to build dynamic, interactive, and modern web applications."
                </p>
                <p>
                  As an undergraduate student at <strong className="text-white font-semibold">NCS University System</strong>, I merge academic Computer Science concepts with practical web engineering. Through active training at <strong className="text-white font-semibold">Saylani IT Mass Training Program</strong>, I am taking my frontend knowledge to the next level with modern JavaScript (ES6+) and React.js.
                </p>
              </div>

              {/* Key Values List */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-850 border border-slate-800">
                  <CheckCircle className="w-4 h-4 text-accent-electric shrink-0" />
                  <span className="text-slate-200 font-medium">Custom WordPress & Elementor</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-850 border border-slate-800">
                  <CheckCircle className="w-4 h-4 text-accent-purple shrink-0" />
                  <span className="text-slate-200 font-medium">Modern React.js in Progress</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-850 border border-slate-800">
                  <CheckCircle className="w-4 h-4 text-accent-purple shrink-0" />
                  <span className="text-slate-200 font-medium">CS Student @ NCS University</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-850 border border-slate-800">
                  <CheckCircle className="w-4 h-4 text-accent-electric shrink-0" />
                  <span className="text-slate-200 font-medium">Saylani IT Web Trainee</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenCV}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent-violet hover:bg-accent-purple text-white text-xs sm:text-sm font-semibold shadow-glow-purple transition"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Curriculum Vitae</span>
                </button>
                
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-dark-850 hover:bg-slate-800 text-slate-300 hover:text-white text-xs sm:text-sm font-medium border border-slate-700 transition"
                >
                  <span>Let's Discuss a Project</span>
                  <ArrowRight className="w-4 h-4 text-accent-electric" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Strategic Highlight Cards */}
          <div ref={cardsRef} className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`glass-panel p-6 rounded-2xl border border-slate-800/80 hover:border-slate-700 bg-gradient-to-br ${item.color} flex flex-col justify-between group transition duration-300 transform hover:-translate-y-1`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-dark-850 border border-slate-700 flex items-center justify-center text-white group-hover:scale-110 transition duration-300">
                        <Icon className={`w-6 h-6 ${item.accent}`} />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-dark-900/90 text-slate-300 border border-slate-800">
                        {item.badge}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-1 group-hover:text-accent-electric transition">
                      {item.title}
                    </h4>
                    <p className="text-xs font-semibold text-slate-400 mb-2 font-mono">
                      {item.institution}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-electric" />
                    <span>Verified Milestone</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
