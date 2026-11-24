import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Eye, Sparkles, ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { projectsData as fallbackProjects } from '../data/portfolioData';
import { api } from '../utils/api';
import ProjectModal from './ProjectModal';

// Helper to format image paths (handles local multer uploads)
export const resolveImageUrl = (img) => {
  if (!img) return '';
  if (img.startsWith('/uploads/')) {
    const backendUrl = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';
    return `${backendUrl}${img}`;
  }
  return img;
};

export default function Projects() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch live projects from backend MongoDB
  useEffect(() => {
    const fetchLiveProjects = async () => {
      try {
        const res = await api.getProjects();
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          // Normalize backend projects
          const normalized = res.data.map((p) => ({
            id: p._id,
            title: p.title,
            category: p.category,
            tagline: p.shortDescription,
            description: p.fullDescription || p.shortDescription,
            image: resolveImageUrl(p.image),
            technologies: p.technologies || [],
            features: [
              'Custom responsive component architecture',
              'Performance and SEO Core Web Vitals optimization',
              'Cross-browser and mobile device compatibility',
            ],
            liveUrl: p.liveUrl || 'https://example.com',
            githubUrl: p.githubUrl || 'https://github.com',
            featured: p.featured,
            stats: { speed: '96 / 100', loadTime: '1.2s', responsive: '100%' },
          }));
          setProjects(normalized);
        }
      } catch {
        // Fallback to static portfolioData seamlessly if backend is offline
      }
    };

    fetchLiveProjects();
  }, []);

  const categories = ['All', 'WordPress', 'E-Commerce', 'Web Design'];
  const gridRef = useRef(null);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase());

  // Lightweight GSAP animation on category or projects change
  useEffect(() => {
    if (!gridRef.current) return;
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      gridRef.current.children,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
    );
  }, [activeCategory, projects.length]);

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-dark-900/30">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-accent-electric/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-accent-violet/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-violet/10 border border-accent-violet/30 text-accent-purple text-xs font-semibold tracking-wider uppercase font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-electric">Projects</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Real-world websites designed and developed with precision, performance optimization, and conversion-focused layouts.
          </p>

          {/* Category Filter Pills */}
          <div className="pt-4 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-accent-violet to-accent-purple text-white shadow-glow-purple font-bold'
                    : 'bg-dark-850 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Project Cards Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-panel glass-panel-hover rounded-2xl border border-slate-800/90 overflow-hidden flex flex-col justify-between group transition-all duration-300 transform hover:-translate-y-1.5"
            >
              <div>
                {/* Project Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-dark-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-60" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold bg-dark-950/80 backdrop-blur-md text-accent-electric border border-accent-electric/30">
                      {project.category}
                    </span>
                  </div>

                  {/* Quick View Hover Button */}
                  <button
                    onClick={() => handleOpenModal(project)}
                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-accent-violet/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-glow-purple transform scale-75 group-hover:scale-100"
                    title="Quick preview details"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-accent-electric transition">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Technologies Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-md bg-dark-850 text-slate-300 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Live Website, GitHub, and Details */}
              <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {/* Live Website Button */}
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-accent-violet hover:bg-accent-purple shadow-glow-purple transition"
                  >
                    <span>Live Website</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>

                  {/* GitHub Button */}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white bg-dark-850 hover:bg-slate-800 border border-slate-700/80 transition"
                    title="View GitHub repository"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                </div>

                {/* Details Button */}
                <button
                  onClick={() => handleOpenModal(project)}
                  className="text-xs font-mono text-slate-400 hover:text-accent-electric transition px-2 py-1"
                >
                  Details →
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Deep-dive Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
