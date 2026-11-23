import React, { useState, useEffect } from 'react';
import { MapPin, CheckCircle2, Building, Sparkles } from 'lucide-react';
import { experienceData as defaultExp } from '../data/portfolioData';
import { api } from '../utils/api';

export default function Experience() {
  const [experienceData, setExperienceData] = useState(defaultExp);

  useEffect(() => {
    const fetchLiveExperience = async () => {
      try {
        const res = await api.getExperience();
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          const normalized = res.data.map((item) => ({
            role: item.jobTitle,
            company: item.company,
            period: `${item.startDate} – ${item.endDate || 'Present'}`,
            type: 'Verified Milestone',
            location: 'Peshawar, Pakistan / Remote',
            description: item.description,
            achievements: item.achievements || [],
            skills: ['WordPress', 'Elementor', 'Web Development'],
          }));
          setExperienceData(normalized);
        }
      } catch {
        // Fallback
      }
    };

    fetchLiveExperience();
  }, []);
  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-dark-900/30">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 -right-32 w-88 h-88 bg-accent-violet/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-violet/10 border border-accent-violet/30 text-accent-purple text-xs font-semibold tracking-wider uppercase font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Career Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-electric">Experience</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            My professional journey in WordPress development, client delivery, and web engineering.
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto relative">
          
          {/* Vertical connecting line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-accent-purple via-accent-electric to-dark-800 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-12">
            {experienceData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`relative flex flex-col sm:flex-row items-center gap-8 ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Central Node */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-dark-950 border-2 border-accent-purple shadow-glow-purple flex items-center justify-center z-10 hidden sm:flex">
                    <div className="w-2.5 h-2.5 rounded-full bg-accent-electric" />
                  </div>

                  {/* Experience Card */}
                  <div className="w-full sm:w-[calc(50%-2rem)]">
                    <div className="glass-panel glass-panel-hover p-6 sm:p-7 rounded-2xl border border-slate-800 space-y-4 relative group">
                      
                      {/* Top Role & Period */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold font-mono bg-accent-violet/15 text-accent-purple border border-accent-violet/30">
                          {item.period}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {item.type}
                        </span>
                      </div>

                      {/* Role & Company */}
                      <div>
                        <h3 className="text-xl font-bold text-white group-hover:text-accent-electric transition">
                          {item.role}
                        </h3>
                        <p className="text-sm font-semibold text-slate-300 flex items-center gap-2 mt-1">
                          <Building className="w-4 h-4 text-accent-purple" />
                          <span>{item.company}</span>
                        </p>
                        <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1 font-mono">
                          <MapPin className="w-3.5 h-3.5 text-slate-500" />
                          <span>{item.location}</span>
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Achievements */}
                      <div className="space-y-2 pt-2 border-t border-slate-800/80">
                        <p className="text-xs font-bold uppercase tracking-wider text-accent-purple">
                          Key Contributions:
                        </p>
                        <ul className="space-y-1.5">
                          {item.achievements.map((ach, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                              <CheckCircle2 className="w-4 h-4 text-accent-electric shrink-0 mt-0.5" />
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-3">
                        {item.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-dark-850 text-slate-300 border border-slate-800"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                    </div>
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

