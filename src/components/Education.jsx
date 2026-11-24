import React, { useState, useEffect } from 'react';
import { GraduationCap, Sparkles, MapPin, CheckCircle, BookOpen } from 'lucide-react';
import { educationData as defaultEdu } from '../data/portfolioData';
import { api } from '../utils/api';

export default function Education() {
  const [educationData, setEducationData] = useState(defaultEdu);

  useEffect(() => {
    const fetchLiveEducation = async () => {
      try {
        const res = await api.getEducation();
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          const normalized = res.data.map((item) => {
            const isCurrent =
              item.status === 'Currently Studying' ||
              (item.endDate && item.endDate.toLowerCase().includes('current')) ||
              item.institution.toLowerCase().includes('ncs');

            return {
              degree: item.degree,
              institution: item.institution,
              period: isCurrent ? 'Currently Studying' : item.endDate || 'Completed',
              status: isCurrent ? 'Currently Studying' : 'Completed',
              location: item.location || 'Peshawar, Pakistan',
              field: item.field || 'Computer Science & IT',
              description: item.description,
              highlights: isCurrent
                ? ['Computer Science Fundamentals', 'Academic Studies', 'Analytical Problem Solving']
                : ['Technical Education', 'Academic Foundations', 'Computing Principles'],
            };
          });
          setEducationData(normalized);
        }
      } catch {
        // Fallback to static data
      }
    };

    fetchLiveEducation();
  }, []);

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-36 w-88 h-88 bg-accent-electric/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-violet/10 border border-accent-violet/30 text-accent-purple text-xs font-semibold tracking-wider uppercase font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Academic Background</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-electric">Academic History</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Formal university studies, technical diploma qualifications, and foundational academic schooling.
          </p>
        </div>

        {/* Education Cards Grid: 4 items (2x2 on medium, 4 cols on large or 2 cols on tablet) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {educationData.map((item, index) => {
            const isCurrent = item.status === 'Currently Studying';

            return (
              <div
                key={index}
                className={`glass-panel glass-panel-hover p-6 sm:p-7 rounded-2xl border flex flex-col justify-between group relative overflow-hidden transition duration-300 ${
                  isCurrent
                    ? 'border-accent-purple/60 shadow-[0_0_30px_rgba(139,92,246,0.15)] bg-dark-850/80'
                    : 'border-slate-800'
                }`}
              >
                {/* Gradient border indicator on top */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1 transition ${
                    isCurrent
                      ? 'bg-gradient-to-r from-accent-purple to-accent-electric'
                      : 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 opacity-60 group-hover:opacity-100'
                  }`}
                />

                <div>
                  {/* Icon & Status */}
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center transition duration-300 group-hover:scale-110 ${
                        isCurrent
                          ? 'bg-accent-violet/20 border border-accent-violet/40 text-accent-purple shadow-glow-purple'
                          : 'bg-dark-800 border border-slate-700 text-slate-300'
                      }`}
                    >
                      <GraduationCap className="w-6 h-6" />
                    </div>

                    {isCurrent ? (
                      <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Currently Studying
                      </span>
                    ) : (
                      <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-dark-850 text-slate-400 border border-slate-800">
                        {item.period}
                      </span>
                    )}
                  </div>

                  {/* Degree/Program Title */}
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-accent-electric transition">
                    {item.degree}
                  </h3>
                  
                  {/* Institution Name */}
                  <p className="text-sm font-semibold text-accent-purple mb-1">
                    {item.institution}
                  </p>

                  {/* Location badge */}
                  <p className="text-[11px] text-slate-400 font-mono mb-3 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-accent-electric" />
                    <span>{item.location || 'Peshawar, Pakistan'}</span>
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Highlights */}
                {item.highlights && item.highlights.length > 0 && (
                  <div className="pt-4 border-t border-slate-800/80">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                      Academic Focus:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {item.highlights.map((hl, i) => (
                        <span
                          key={i}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-dark-900 text-slate-300 border border-slate-800/90"
                        >
                          {hl}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
