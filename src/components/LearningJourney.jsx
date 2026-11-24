import React, { useEffect, useRef } from 'react';
import { 
  Globe, 
  Layout, 
  Cpu, 
  Boxes, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Target,
  Compass
} from 'lucide-react';
import gsap from 'gsap';
import { learningJourneyData } from '../data/portfolioData';

const iconMap = {
  Globe,
  Layout,
  Cpu,
  Boxes,
  Sparkles,
};

export default function LearningJourney() {
  const containerRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const items = containerRef.current.querySelectorAll('.journey-item');
    if (!items.length) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        clearProps: 'transform',
      }
    );
  }, []);

  return (
    <section id="journey" className="py-24 relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-accent-violet/15 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-88 h-88 bg-accent-electric/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-violet/10 border border-accent-violet/30 text-accent-purple text-xs font-semibold tracking-wider uppercase font-mono">
            <Compass className="w-3.5 h-3.5" />
            <span>Evolution & Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            My Development <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-indigo-300 to-accent-electric">Journey</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From practical WordPress client websites to modern JavaScript engineering, active React.js training, and future full-stack aspirations.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto">
          
          {/* Central Connecting Line (Visible on desktop) */}
          <div className="hidden md:block absolute top-6 bottom-6 left-1/2 -translate-x-1/2 w-0.5 bg-gradient-to-b from-accent-purple via-accent-electric to-pink-500 opacity-40 pointer-events-none" />

          <div className="space-y-12 md:space-y-16">
            {learningJourneyData.map((step, index) => {
              const Icon = iconMap[step.icon] || Sparkles;
              const isEven = index % 2 === 0;
              const isCurrent = step.status.includes('In Progress') || step.status.includes('Active');
              const isFuture = step.status.includes('Upcoming');

              return (
                <div
                  key={index}
                  className={`journey-item relative flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Content Card (Half width on desktop) */}
                  <div className="w-full md:w-1/2">
                    <div
                      className={`glass-panel p-6 sm:p-8 rounded-3xl border transition duration-300 relative overflow-hidden group hover:-translate-y-1 ${
                        isCurrent
                          ? 'border-accent-electric/60 shadow-[0_0_35px_rgba(6,182,212,0.15)] bg-dark-850/90'
                          : isFuture
                          ? 'border-dashed border-pink-500/50 bg-dark-900/60'
                          : 'border-slate-800 hover:border-accent-purple/50'
                      }`}
                    >
                      {/* Gradient Accent Bar */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color}`}
                      />

                      <div className="flex items-center justify-between gap-4 mb-4">
                        <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-dark-850 text-slate-300 border border-slate-700">
                          STAGE 0{step.step}
                        </span>

                        <span
                          className={`text-xs font-mono font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5 ${
                            isCurrent
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                              : isFuture
                              ? 'bg-pink-500/10 text-pink-300 border border-pink-500/30'
                              : 'bg-accent-violet/10 text-accent-purple border border-accent-violet/30'
                          }`}
                        >
                          {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
                          {step.status}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-accent-electric transition">
                        {step.title}
                      </h3>
                      <p className="text-xs font-semibold text-accent-purple font-mono mb-3">
                        {step.subtitle}
                      </p>

                      <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                        {step.description}
                      </p>

                      <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-500">{step.tag}</span>
                        {isCurrent ? (
                          <span className="text-accent-electric font-semibold flex items-center gap-1">
                            <span>Active Focus</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        ) : isFuture ? (
                          <span className="text-pink-400 font-semibold flex items-center gap-1">
                            <Target className="w-3.5 h-3.5" />
                            <span>Roadmap Target</span>
                          </span>
                        ) : (
                          <span className="text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Established</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Center Node Circle */}
                  <div className="relative z-10 shrink-0 w-14 h-14 rounded-2xl bg-dark-900 border-2 border-slate-700 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition duration-300">
                    <div
                      className={`w-full h-full rounded-2xl flex items-center justify-center bg-gradient-to-br ${step.color} opacity-20 absolute inset-0`}
                    />
                    <Icon
                      className={`w-6 h-6 relative z-10 ${
                        isCurrent
                          ? 'text-accent-electric'
                          : isFuture
                          ? 'text-pink-400'
                          : 'text-accent-purple'
                      }`}
                    />
                  </div>

                  {/* Empty counterpart spacer for alternating layout */}
                  <div className="hidden md:block w-1/2" />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

