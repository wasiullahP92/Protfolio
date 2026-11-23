import React, { useState } from 'react';
import { 
  Globe, 
  Layout, 
  ShieldCheck, 
  FileText, 
  TrendingUp, 
  Layers, 
  Code2, 
  Palette, 
  Cpu, 
  Boxes, 
  Sparkles
} from 'lucide-react';
import { skillsData } from '../data/portfolioData';

// Icon mapping helper
const iconMap = {
  Globe: Globe,
  Layout: Layout,
  ShieldCheck: ShieldCheck,
  Layers: Layers,
  TrendingUp: TrendingUp,
  FileText: FileText,
  Code2: Code2,
  Palette: Palette,
  Cpu: Cpu,
  Boxes: Boxes,
};

export default function Skills() {
  const [filter, setFilter] = useState('all');

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-accent-purple/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-electric/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-violet/10 border border-accent-violet/30 text-accent-purple text-xs font-semibold tracking-wider uppercase font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Technical Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-indigo-300 to-accent-electric">Expertise</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            A comprehensive overview of my core competencies in WordPress development, web design, and actively expanding technical skills.
          </p>

          {/* Filter Pills */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                filter === 'all'
                  ? 'bg-accent-violet text-white shadow-glow-purple'
                  : 'bg-dark-850 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Skills ({skillsData.core.length + skillsData.learning.length})
            </button>
            <button
              onClick={() => setFilter('core')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                filter === 'core'
                  ? 'bg-accent-violet text-white shadow-glow-purple'
                  : 'bg-dark-850 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Core Expertise ({skillsData.core.length})
            </button>
            <button
              onClick={() => setFilter('learning')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                filter === 'learning'
                  ? 'bg-accent-violet text-white shadow-glow-purple'
                  : 'bg-dark-850 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Currently Learning ({skillsData.learning.length})
            </button>
          </div>
        </div>

        {/* Section 1: Core Professional Skills */}
        {(filter === 'all' || filter === 'core') && (
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-electric shadow-glow-cyan" />
              <h3 className="text-xl font-bold text-white tracking-tight">
                Core Professional Competencies
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent-electric/10 text-accent-electric border border-accent-electric/30 font-mono">
                Production Ready
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillsData.core.map((skill, index) => {
                const IconComponent = iconMap[skill.icon] || Globe;
                return (
                  <div
                    key={index}
                    className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Top Row: Icon & Status Tag */}
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-accent-violet/15 border border-accent-violet/30 flex items-center justify-center text-accent-purple group-hover:scale-110 group-hover:bg-accent-violet group-hover:text-white transition duration-300">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-dark-800 text-slate-300 border border-slate-700/60">
                          {skill.category}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h4 className="text-lg font-bold text-white mb-2 group-hover:text-accent-electric transition">
                        {skill.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {skill.highlight}
                      </p>
                    </div>

                    {/* Progress Bar & Proficiency */}
                    <div className="mt-6 pt-4 border-t border-slate-800/80">
                      <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                        <span className="text-slate-400 font-mono">{skill.status}</span>
                        <span className="text-accent-purple font-mono font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-dark-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent-violet to-accent-electric transition-all duration-1000"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Section 2: Skills Currently Learning / Expanding Stack */}
        {(filter === 'all' || filter === 'learning') && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-accent-purple shadow-glow-purple" />
              <h3 className="text-xl font-bold text-white tracking-tight">
                Currently Learning & Expanding Stack
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-accent-violet/15 text-accent-purple border border-accent-violet/30 font-mono">
                HTML, CSS & JavaScript
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {skillsData.learning.map((item, index) => {
                const IconComponent = iconMap[item.icon] || Code2;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-2xl bg-dark-900/80 border border-slate-800/90 hover:border-accent-purple/50 transition-all duration-300 relative overflow-hidden group"
                  >
                    {/* Glowing highlight indicator */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent-violet/10 rounded-full blur-xl pointer-events-none group-hover:bg-accent-violet/20 transition" />

                    <div className="w-11 h-11 rounded-xl bg-accent-violet/10 border border-accent-violet/25 flex items-center justify-center text-accent-purple mb-4 group-hover:scale-105 transition">
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-accent-violet/15 text-accent-purple mb-2">
                      {item.tag}
                    </div>

                    <h4 className="text-base font-bold text-white mb-1.5">{item.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed mb-4">{item.description}</p>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center text-[11px] font-mono text-slate-400">
                        <span>Learning Curve</span>
                        <span className="text-accent-electric">{item.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-dark-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-accent-purple to-accent-electric"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

