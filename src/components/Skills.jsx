import React, { useState, useEffect } from 'react';
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
  Sparkles,
  Target,
  Compass,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { skillsData as defaultSkills } from '../data/portfolioData';
import { api } from '../utils/api';

// Icon mapping helper
const iconMap = {
  Globe,
  Layout,
  ShieldCheck,
  Layers,
  TrendingUp,
  FileText,
  Code2,
  Palette,
  Cpu,
  Boxes,
  Sparkles,
  Target,
};

export default function Skills() {
  const [filter, setFilter] = useState('all');
  const [skillsData, setSkillsData] = useState(defaultSkills);

  useEffect(() => {
    const fetchLiveSkills = async () => {
      try {
        const res = await api.getSkills();
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          const current = [];
          const learning = [];
          const futureGoals = [];

          res.data.forEach((s) => {
            const cat = (s.category || '').toLowerCase();
            if (cat.includes('future') || cat.includes('goal')) {
              futureGoals.push({
                name: s.name,
                category: 'Future Learning Goals',
                icon: s.icon || 'Sparkles',
                description: s.description || `Upcoming technology: ${s.name}`,
                status: 'Upcoming Goal',
              });
            } else if (cat.includes('learning') || cat.includes('expand')) {
              learning.push({
                name: s.name,
                category: 'Learning',
                progress: s.level || 75,
                icon: s.icon || 'Code2',
                description: s.description || `Actively studying ${s.name} modern concepts`,
                tag: 'Learning in Progress',
              });
            } else {
              current.push({
                name: s.name,
                category: 'Current Skills',
                level: s.level || 90,
                icon: s.icon || 'Globe',
                highlight: s.description || `Proven experience in ${s.name}`,
                status: 'Core Competency',
              });
            }
          });

          setSkillsData({
            current: current.length > 0 ? current : defaultSkills.current,
            learning: learning.length > 0 ? learning : defaultSkills.learning,
            futureGoals: futureGoals.length > 0 ? futureGoals : defaultSkills.futureGoals,
          });
        }
      } catch {
        // Fallback to default
      }
    };

    fetchLiveSkills();
  }, []);

  const totalCount =
    (skillsData.current?.length || 0) +
    (skillsData.learning?.length || 0) +
    (skillsData.futureGoals?.length || 0);

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
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-indigo-300 to-accent-electric">Technical Journey</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            A structured breakdown of my established competencies, active technical learning, and upcoming full-stack development goals.
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
              All Categories ({totalCount})
            </button>
            <button
              onClick={() => setFilter('current')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                filter === 'current'
                  ? 'bg-accent-violet text-white shadow-glow-purple'
                  : 'bg-dark-850 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Current Skills ({skillsData.current?.length || 0})
            </button>
            <button
              onClick={() => setFilter('learning')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                filter === 'learning'
                  ? 'bg-accent-violet text-white shadow-glow-purple'
                  : 'bg-dark-850 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Learning ({skillsData.learning?.length || 0})
            </button>
            <button
              onClick={() => setFilter('future')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                filter === 'future'
                  ? 'bg-accent-violet text-white shadow-glow-purple'
                  : 'bg-dark-850 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Future Goals ({skillsData.futureGoals?.length || 0})
            </button>
          </div>
        </div>

        {/* =========================================================================
            CATEGORY 1: CURRENT SKILLS
        ========================================================================= */}
        {(filter === 'all' || filter === 'current') && (
          <div className="mb-16">
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Current Skills
                </h3>
                <span className="text-xs font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  Established Experience
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {skillsData.current?.length || 0} Technologies
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {skillsData.current?.map((skill, index) => {
                const Icon = iconMap[skill.icon] || Globe;
                return (
                  <div
                    key={index}
                    className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800/80 hover:border-accent-purple/50 group transition duration-300 relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent-violet/15 border border-accent-violet/30 flex items-center justify-center text-accent-purple group-hover:scale-110 transition duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {skill.status || 'Active'}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-accent-electric transition">
                      {skill.name}
                    </h4>

                    <p className="text-xs text-slate-300/90 leading-relaxed mb-4">
                      {skill.highlight}
                    </p>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-slate-400">Proficiency</span>
                        <span className="text-accent-electric font-semibold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-dark-900 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-accent-purple to-accent-electric rounded-full transition-all duration-1000"
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

        {/* =========================================================================
            CATEGORY 2: TECHNOLOGIES CURRENTLY LEARNING
        ========================================================================= */}
        {(filter === 'all' || filter === 'learning') && (
          <div className="mb-16">
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-accent-electric shadow-glow-cyan" />
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Technologies Learning
                </h3>
                <span className="text-xs font-mono text-accent-electric px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
                  Actively Expanding Stack
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {skillsData.learning?.length || 0} Technologies
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {skillsData.learning?.map((item, index) => {
                const Icon = iconMap[item.icon] || Code2;
                return (
                  <div
                    key={index}
                    className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800/80 hover:border-accent-electric/40 group transition duration-300 relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-accent-electric/15 border border-accent-electric/30 flex items-center justify-center text-accent-electric group-hover:scale-110 transition duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-dark-850 text-accent-electric border border-slate-800">
                        {item.tag || 'In Progress'}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-accent-electric transition">
                      {item.name}
                    </h4>

                    <p className="text-xs text-slate-300/90 leading-relaxed mb-4">
                      {item.description}
                    </p>

                    {/* Progress Indicator */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                      <div className="flex justify-between text-[11px] font-mono">
                        <span className="text-slate-400">Learning Progress</span>
                        <span className="text-accent-electric font-semibold">{item.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-dark-900 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all duration-1000"
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

        {/* =========================================================================
            CATEGORY 3: FUTURE LEARNING GOALS
        ========================================================================= */}
        {(filter === 'all' || filter === 'future') && (
          <div>
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_12px_rgba(236,72,153,0.8)]" />
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Future Learning Goals
                </h3>
                <span className="text-xs font-mono text-pink-400 px-2 py-0.5 rounded bg-pink-500/10 border border-pink-500/20">
                  Upcoming Roadmap
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {skillsData.futureGoals?.length || 0} Target Milestones
              </span>
            </div>

            <div className="p-4 rounded-xl bg-pink-500/5 border border-pink-500/20 mb-6 flex items-start gap-3">
              <Compass className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-pink-300 font-semibold">Clear Distinction:</strong> The technologies below represent my structured learning roadmap toward becoming a full-stack developer. They are upcoming educational goals and are <span className="underline decoration-pink-400 underline-offset-2">not</span> presented as client-ready commercial experience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {skillsData.futureGoals?.map((goal, index) => {
                const Icon = iconMap[goal.icon] || Sparkles;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-2xl border border-dashed border-slate-700/80 hover:border-pink-500/60 bg-dark-900/60 hover:bg-dark-850/80 group transition duration-300 relative"
                  >
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 group-hover:scale-110 transition duration-300">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-pink-500/10 text-pink-300 border border-pink-500/20 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Upcoming</span>
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-pink-300 transition">
                      {goal.name}
                    </h4>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {goal.description}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2 text-[11px] text-pink-400/90 font-mono">
                      <Target className="w-3.5 h-3.5" />
                      <span>Roadmap Target</span>
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
