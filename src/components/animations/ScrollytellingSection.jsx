import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Terminal, Code2, Sparkles, BookOpen, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollytellingSection() {
  const containerRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const chapters = [
    {
      id: '01',
      badge: 'Chapter 01: The Foundation',
      title: 'WordPress Craftsmanship & Visual Design',
      desc: 'Mastered WordPress CMS architecture, custom Elementor designing, speed optimization, and responsive layouts that empower real client businesses to thrive online.',
      skills: ['WordPress', 'Elementor Pro', 'Custom CSS', 'Speed Caching', 'SEO Schema'],
      code: `// WordPress Custom Post Architecture
register_post_type('portfolio_showcase', [
  'public' => true,
  'supports' => ['title', 'thumbnail', 'excerpt'],
  'has_archive' => true,
  'menu_icon' => 'dashicons-portfolio'
]);`,
      metric: '50+ Websites Designed & Optimized',
    },
    {
      id: '02',
      badge: 'Chapter 02: Modern Frontend',
      title: 'JavaScript ES6+ & Saylani IT React Training',
      desc: 'Currently advancing into modern web development at Saylani IT Mass Training Program. Focusing intensely on JavaScript ES6+, React.js state management, component lifecycles, and modular architectures.',
      skills: ['React.js', 'JavaScript ES6+', 'Tailwind CSS', 'Vite', 'Component Lifecycles'],
      code: `// Saylani IT React Focus
import { useState, useEffect } from 'react';

export function ModernWebDev() {
  const [focus] = useState('React.js Ecosystem');
  return <div className="interactive-hud">{focus}</div>;
}`,
      metric: 'Continuous Daily Coding & Real Projects',
    },
    {
      id: '03',
      badge: 'Chapter 03: Full-Stack Expansion',
      title: 'Node.js, Express & MongoDB Data Systems',
      desc: 'Bridging frontend and backend engineering. Architecting RESTful APIs, Mongoose data models, JWT authentication, and automated data persistence to create end-to-end full stack web platforms.',
      skills: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT Auth'],
      code: `// Backend API Route Controller
app.post('/api/projects', authMiddleware, async (req, res) => {
  const newProject = await Project.create(req.body);
  res.status(201).json({ success: true, data: newProject });
});`,
      metric: 'Secure REST APIs & Dynamic MongoDB DB',
    },
    {
      id: '04',
      badge: 'Chapter 04: Future Vision',
      title: 'Creative Engineering & Full-Stack Mastery',
      desc: 'Combining Awwwards-standard animations (GSAP, 3D WebGL, modern UI micro-interactions) with rock-solid server-side performance to deliver memorable digital products.',
      skills: ['GSAP 3', 'Creative Motion', 'System Architecture', 'Micro-Interactions'],
      code: `// Awwwards-Grade Motion Engineering
gsap.timeline({ scrollTrigger: { scrub: 1 } })
  .fromTo('.element', { y: 100, opacity: 0 }, { y: 0, opacity: 1 });`,
      metric: 'Pushing Boundaries of the Modern Web',
    },
  ];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll('.story-card');
    cards.forEach((card, idx) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 60%',
        end: 'bottom 60%',
        onEnter: () => setActiveStep(idx),
        onEnterBack: () => setActiveStep(idx),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger && container.contains(st.vars.trigger)) {
          st.kill();
        }
      });
    };
  }, []);

  const currentChapter = chapters[activeStep];

  return (
    <section
      ref={containerRef}
      className="relative py-24 sm:py-32 bg-[#05060a] border-t border-slate-800/80 overflow-hidden"
    >
      {/* Background Section Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-accent-violet/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-violet/10 border border-accent-purple/30 text-accent-electric text-xs font-mono tracking-widest uppercase mb-4">
            <BookOpen className="w-3.5 h-3.5 text-accent-electric" />
            Interactive Scrollytelling
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
            MY DEVELOPMENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-electric">ODYSSEY</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Scroll down to watch my technological evolution unfold step-by-step with real-time HUD terminal tracking.
          </p>
        </div>

        {/* 2-Column Scrollytelling Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Pinned Interactive HUD (Desktop) */}
          <div className="hidden lg:block lg:col-span-5 sticky top-28 space-y-6">
            <div className="p-6 rounded-3xl bg-dark-900/90 border border-slate-800 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-accent-electric" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    JOURNEY_CONSOLE.exe
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-accent-violet/20 text-accent-purple border border-accent-purple/30">
                  Step {activeStep + 1} of {chapters.length}
                </span>
              </div>

              {/* Progress Steps Timeline */}
              <div className="space-y-4 mb-6">
                {chapters.map((ch, idx) => (
                  <div
                    key={ch.id}
                    onClick={() => {
                      const el = document.getElementById(`story-card-${idx}`);
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`cursor-pointer p-3 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                      activeStep === idx
                        ? 'bg-accent-violet/15 border-accent-purple/60 shadow-glow-sm'
                        : 'bg-dark-950/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                          activeStep === idx
                            ? 'bg-accent-electric text-dark-950'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {ch.id}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          activeStep === idx ? 'text-white' : 'text-slate-400'
                        }`}
                      >
                        {ch.title}
                      </span>
                    </div>
                    {activeStep === idx && (
                      <Sparkles className="w-3.5 h-3.5 text-accent-electric animate-spin" />
                    )}
                  </div>
                ))}
              </div>

              {/* Live Interactive Code Terminal */}
              <div className="rounded-2xl bg-black/90 border border-slate-800 p-4 font-mono text-xs overflow-hidden">
                <div className="flex items-center justify-between text-[10px] text-slate-500 mb-2 pb-1 border-b border-slate-800/60">
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <Code2 className="w-3 h-3 text-accent-purple" />
                    {currentChapter.badge}
                  </span>
                  <span className="text-emerald-400">ACTIVE COMPILER</span>
                </div>
                <pre className="text-slate-300 text-[11px] leading-relaxed overflow-x-auto whitespace-pre font-mono">
                  {currentChapter.code}
                </pre>
              </div>

              {/* Metric Card */}
              <div className="mt-4 p-3 rounded-xl bg-accent-violet/10 border border-accent-violet/30 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">Milestone</span>
                <span className="text-xs font-bold font-mono text-accent-electric">
                  {currentChapter.metric}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Scrolling Narrative Chapters */}
          <div className="lg:col-span-7 space-y-16 sm:space-y-24">
            {chapters.map((ch, idx) => (
              <div
                key={ch.id}
                id={`story-card-${idx}`}
                className={`story-card p-8 sm:p-10 rounded-3xl bg-dark-900/80 border transition-all duration-500 shadow-xl backdrop-blur-xl ${
                  activeStep === idx
                    ? 'border-accent-purple/60 shadow-[0_0_35px_rgba(124,58,237,0.15)]'
                    : 'border-slate-800/80 opacity-80'
                }`}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-violet/15 border border-accent-violet/30 text-accent-purple text-xs font-mono tracking-widest uppercase mb-4">
                  {ch.badge}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                  {ch.title}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  {ch.desc}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {ch.skills.map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 rounded-lg text-xs font-mono bg-dark-950 border border-slate-800 text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Mobile Code Preview */}
                <div className="block lg:hidden rounded-xl bg-black/80 border border-slate-800 p-3 font-mono text-xs overflow-x-auto text-slate-300">
                  <pre>{ch.code}</pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
