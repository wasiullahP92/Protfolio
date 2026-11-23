import React from 'react';
import { X, Printer, Mail, MapPin, Briefcase, GraduationCap, Award, CheckCircle2 } from 'lucide-react';
import { personalInfo, experienceData, educationData, skillsData } from '../data/portfolioData';

export default function CVModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-dark-900 border border-slate-700/60 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-dark-850/80 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent-violet/20 border border-accent-violet/40 flex items-center justify-center text-accent-purple font-bold">
              W
            </div>
            <div>
              <h3 className="font-semibold text-slate-100 text-lg">Curriculum Vitae</h3>
              <p className="text-xs text-slate-400">Wasi Ullah – WordPress Developer & Web Designer</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              title="Print CV or save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-accent-electric" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 text-slate-200 print:text-black print:bg-white print:p-0">
          {/* Top CV Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800 print:border-slate-300">
            <div>
              <h1 className="text-3xl font-extrabold text-white print:text-black tracking-tight">{personalInfo.name}</h1>
              <p className="text-accent-electric print:text-purple-700 font-medium text-lg mt-1">{personalInfo.role}</p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-400 print:text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-accent-purple print:text-slate-600" />
                  {personalInfo.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-accent-purple print:text-slate-600" />
                  {personalInfo.location}
                </span>
              </div>
            </div>

            <div className="px-4 py-2 rounded-xl bg-accent-violet/10 border border-accent-violet/30 text-xs text-accent-purple font-medium">
              ✨ Status: {personalInfo.status}
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-accent-purple mb-3 flex items-center gap-2">
              <Award className="w-4 h-4" /> Professional Profile
            </h4>
            <p className="text-slate-300 print:text-slate-800 leading-relaxed text-sm bg-dark-850 p-4 rounded-xl border border-slate-800/80 print:bg-transparent print:border-none print:p-0">
              {personalInfo.fullBio}
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-accent-purple mb-4 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Experience
            </h4>
            <div className="space-y-4">
              {experienceData.map((exp, index) => (
                <div key={index} className="p-4 rounded-xl bg-dark-850/60 border border-slate-800 print:bg-transparent print:border-b print:border-slate-300">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1 mb-2">
                    <h5 className="font-semibold text-white print:text-black text-base">{exp.role}</h5>
                    <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-accent-electric font-medium print:bg-transparent print:text-slate-600">
                      {exp.period}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mb-2 font-medium">{exp.company} • {exp.location}</p>
                  <p className="text-xs text-slate-300 mb-3">{exp.description}</p>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {exp.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-purple shrink-0 mt-0.5" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-accent-purple mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Education
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {educationData.map((edu, index) => (
                <div key={index} className="p-4 rounded-xl bg-dark-850/60 border border-slate-800">
                  <p className="text-xs text-accent-electric font-mono mb-1">{edu.period}</p>
                  <h5 className="font-semibold text-white text-sm">{edu.degree}</h5>
                  <p className="text-xs text-slate-400 mt-1">{edu.institution}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Skills & Current Learning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-dark-850/60 border border-slate-800">
              <h5 className="text-xs font-bold uppercase tracking-wider text-accent-electric mb-3">Core Expertise</h5>
              <div className="flex flex-wrap gap-2">
                {skillsData.core.map((skill, i) => (
                  <span key={i} className="px-2.5 py-1 text-xs rounded-lg bg-dark-800 text-slate-200 border border-slate-700">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-dark-850/60 border border-slate-800">
              <h5 className="text-xs font-bold uppercase tracking-wider text-accent-purple mb-3">Expanding Stack (Learning)</h5>
              <div className="flex flex-wrap gap-2">
                {skillsData.learning.map((skill, i) => (
                  <span key={i} className="px-2.5 py-1 text-xs rounded-lg bg-accent-violet/10 text-accent-purple border border-accent-violet/30">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-dark-850/90 flex justify-between items-center">
          <p className="text-xs text-slate-400">Direct Contact: <a href="mailto:wasiwebsolution@gmail.com" className="text-accent-electric hover:underline">{personalInfo.email}</a></p>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium rounded-lg bg-accent-violet hover:bg-accent-purple text-white transition shadow-glow-purple"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}

