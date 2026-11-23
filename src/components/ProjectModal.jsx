import React from 'react';
import { X, ExternalLink, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function ProjectModal({ project, isOpen, onClose }) {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-3xl bg-dark-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-dark-850/80 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-accent-violet/20 text-accent-purple border border-accent-violet/40">
              {project.category}
            </span>
            <span className="text-xs text-slate-400">• Detailed Project Showcase</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Main Visual Image */}
          <div className="relative rounded-xl overflow-hidden border border-slate-800 aspect-video max-h-72 w-full">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4">
              <h2 className="text-2xl font-extrabold text-white">{project.title}</h2>
              <p className="text-xs sm:text-sm text-accent-electric">{project.tagline}</p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          {project.stats && (
            <div className="grid grid-cols-3 gap-3 p-3 rounded-xl bg-dark-850 border border-slate-800 text-center text-xs">
              <div>
                <p className="text-slate-400 font-mono text-[11px]">Speed Score</p>
                <p className="font-bold text-accent-purple text-sm mt-0.5">{project.stats.speed || '95+'}</p>
              </div>
              <div>
                <p className="text-slate-400 font-mono text-[11px]">Responsive</p>
                <p className="font-bold text-accent-electric text-sm mt-0.5">{project.stats.responsive || '100%'}</p>
              </div>
              <div>
                <p className="text-slate-400 font-mono text-[11px]">Impact</p>
                <p className="font-bold text-emerald-400 text-sm mt-0.5">
                  {project.stats.loadTime || project.stats.conversionRate || project.stats.leads || 'Optimized'}
                </p>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-accent-purple mb-2">Project Overview</h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Deliverables & Features */}
          {project.features && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-accent-purple mb-3">Key Features & Solutions</h4>
              <ul className="space-y-2">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-accent-electric shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Used */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Technologies & Tooling</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-dark-850 text-slate-200 border border-slate-700/80"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-dark-850/90 flex flex-wrap justify-between items-center gap-3">
          <div className="flex items-center gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-accent-violet hover:bg-accent-purple shadow-glow-purple transition"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Launch Live Site</span>
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-dark-800 hover:bg-slate-700 border border-slate-700 transition"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>View Code / Repo</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-slate-200 px-3 py-1.5"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
