import React, { useState, useEffect } from 'react';
import { GraduationCap, Sparkles } from 'lucide-react';
import { educationData as defaultEdu } from '../data/portfolioData';
import { api } from '../utils/api';

export default function Education() {
  const [educationData, setEducationData] = useState(defaultEdu);

  useEffect(() => {
    const fetchLiveEducation = async () => {
      try {
        const res = await api.getEducation();
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          const normalized = res.data.map((item) => ({
            degree: item.degree,
            institution: item.institution,
            period: item.startDate && item.endDate ? `${item.startDate} – ${item.endDate}` : 'Completed',
            field: 'Information Technology & Computer Sciences',
            description: item.description,
            highlights: ['Technical Training', 'Academic Discipline', 'Core Computing'],
          }));
          setEducationData(normalized);
        }
      } catch {
        // Fallback
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
            Education & <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-electric">Qualifications</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Formal qualifications and academic milestones shaping my technical and analytical foundation.
          </p>
        </div>

        {/* Education Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {educationData.map((item, index) => (
            <div
              key={index}
              className="glass-panel glass-panel-hover p-6 sm:p-7 rounded-2xl border border-slate-800 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Gradient border indicator on top */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-purple via-indigo-500 to-accent-electric opacity-60 group-hover:opacity-100 transition" />

              <div>
                {/* Degree & Year */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-violet/15 border border-accent-violet/30 flex items-center justify-center text-accent-purple group-hover:scale-110 transition duration-300">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-dark-850 text-accent-electric border border-slate-800">
                    {item.period}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-accent-electric transition">
                  {item.degree}
                </h3>
                
                <p className="text-sm font-semibold text-accent-purple mb-2">
                  {item.institution}
                </p>

                <p className="text-xs text-slate-400 font-mono mb-4">
                  {item.field}
                </p>

                <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="pt-4 border-t border-slate-800/80">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Core Learnings:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.highlights.map((hl, i) => (
                    <span
                      key={i}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-dark-850 text-slate-300 border border-slate-800"
                    >
                      {hl}
                    </span>
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

