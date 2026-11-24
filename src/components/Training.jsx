import React, { useState, useEffect } from 'react';
import { BookOpen, Sparkles, Code2, CheckCircle2, Laptop, Calendar, Award } from 'lucide-react';
import { trainingData as defaultTrainings } from '../data/portfolioData';
import { api } from '../utils/api';

export default function Training() {
  const [trainings, setTrainings] = useState(defaultTrainings);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const res = await api.getTrainings();
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setTrainings(res.data);
        }
      } catch {
        // Fallback to static
      }
    };
    fetchTrainings();
  }, []);

  return (
    <section id="training" className="py-24 relative overflow-hidden bg-dark-900/30">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-accent-electric/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-accent-violet/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-electric/10 border border-accent-electric/30 text-accent-electric text-xs font-semibold tracking-wider uppercase font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Technical Skill Building</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Professional Training & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-electric to-accent-purple">Learning</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Rigorous technical training programs shaping practical engineering standards and modern frontend expertise.
          </p>
        </div>

        {/* Training Cards Container */}
        <div className="max-w-4xl mx-auto space-y-8">
          {trainings.map((item, index) => (
            <div
              key={index}
              className="glass-panel p-8 sm:p-10 rounded-3xl border border-accent-electric/30 shadow-[0_0_40px_rgba(6,182,212,0.12)] relative overflow-hidden group transition duration-300"
            >
              {/* Top ambient highlight gradient */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent-electric via-indigo-500 to-accent-purple" />

              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 pb-6 border-b border-slate-800">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-accent-electric/20 to-accent-violet/20 border border-accent-electric/40 flex items-center justify-center text-accent-electric shrink-0 shadow-glow-cyan group-hover:scale-105 transition duration-300">
                    <Laptop className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        {item.status || 'Currently Learning'}
                      </span>
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-accent-violet/20 text-accent-purple border border-accent-violet/40 font-bold">
                        Focus: {item.currentFocus || 'React.js'}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-white tracking-tight group-hover:text-accent-electric transition">
                      {item.course}
                    </h3>
                    
                    <p className="text-base font-semibold text-slate-300 mt-1 flex items-center gap-2">
                      <Award className="w-4 h-4 text-accent-electric" />
                      <span>{item.institute}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-dark-900/80 px-4 py-2 rounded-xl border border-slate-800 shrink-0 self-start">
                  <Calendar className="w-4 h-4 text-accent-purple" />
                  <span>{item.startDate && item.endDate ? `${item.startDate} – ${item.endDate}` : '2024 – Present'}</span>
                </div>
              </div>

              {/* Description */}
              <div className="py-6">
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {item.description ||
                    'Professional training program in modern web development covering frontend foundations, advanced JavaScript, and interactive single-page application development with React.js.'}
                </p>
              </div>

              {/* Core Syllabus / Key Highlights */}
              <div className="pt-6 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-accent-electric font-mono mb-4 flex items-center gap-2">
                  <Code2 className="w-4 h-4" />
                  <span>Current Training Focus & Core Competencies:</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(item.highlights || [
                    'Modern Web Standards (HTML5 & CSS3)',
                    'JavaScript (ES6+) Logic & DOM Manipulation',
                    'React.js Component Architecture & Hooks',
                    'Interactive Single-Page Applications (SPAs)',
                  ]).map((hl, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl bg-dark-900/60 border border-slate-800/80"
                    >
                      <CheckCircle2 className="w-4 h-4 text-accent-purple shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-200 font-medium">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
