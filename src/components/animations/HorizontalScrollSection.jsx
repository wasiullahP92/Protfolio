import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ArrowRight, Sparkles } from 'lucide-react';
import ImageReveal from './ImageReveal';

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScrollSection({ projects = [] }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const showcaseProjects = projects.length > 0 ? projects.slice(0, 4) : [
    {
      title: 'NovaCraft Digital Agency',
      category: 'Web Design & WordPress',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      description: 'Modern Dark-Themed Creative Portfolio Site with custom GSAP interactions, sleek micro-animations, and dynamic filterable grids.',
      technologies: ['WordPress', 'Elementor', 'GSAP', 'CSS Grid', 'RankMath'],
      liveUrl: 'https://example.com/novacraft-demo',
    },
    {
      title: 'ApexWear Urban Apparel',
      category: 'E-Commerce / WooCommerce',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
      description: 'High-converting fashion webshop with variation swatches, dynamic cart drawer, multi-currency support, and optimized checkout flow.',
      technologies: ['WooCommerce', 'WordPress', 'Stripe', 'Ajax Cart', 'Cache Optimization'],
      liveUrl: 'https://example.com/apexwear-demo',
    },
    {
      title: 'LuxeStay Boutique Villas',
      category: 'Hospitality Web Portal',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
      description: 'High-end booking web portal crafted for a luxury resort. Features custom room showcases, booking calendar, and responsive inquiry forms.',
      technologies: ['WordPress', 'Elementor Pro', 'Booking Engine', 'SEO Schema', 'Responsive'],
      liveUrl: 'https://example.com/luxestay-demo',
    },
    {
      title: 'TechPulse Insights & Journal',
      category: 'Modern Publishing Platform',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
      description: 'Custom content publishing theme built for tech news, syntax code highlighting, dynamic reading-time calculator, and newsletter capture.',
      technologies: ['WordPress', 'Custom Post Types', 'Newsletter API', 'Speed Cache', 'RankMath'],
      liveUrl: 'https://example.com/techpulse-demo',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    // Only enable horizontal pinning on desktop / wide screens
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const totalWidth = track.scrollWidth;
      const windowWidth = window.innerWidth;
      const scrollAmount = totalWidth - windowWidth + 120;

      const st = gsap.to(track, {
        x: () => -scrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollAmount}`,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        if (st.scrollTrigger) st.scrollTrigger.kill();
        st.kill();
      };
    });

    return () => mm.revert();
  }, [showcaseProjects.length]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#07080e] overflow-hidden py-16 lg:py-0 lg:h-screen flex flex-col justify-center border-t border-slate-800/80"
    >
      {/* Background Section Ambient Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent-violet/10 filter blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent-electric/10 filter blur-[120px] pointer-events-none" />

      {/* Top Section Intro Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8 lg:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-violet/10 border border-accent-purple/30 text-accent-electric text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-accent-electric" />
            Horizontal Showcase
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            FEATURED <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-electric">WORKS</span>
          </h2>
        </div>
        <p className="text-sm text-slate-400 font-mono flex items-center gap-2">
          <span>Scroll down to slide horizontally</span>
          <ArrowRight className="w-4 h-4 text-accent-electric animate-pulse hidden sm:inline" />
        </p>
      </div>

      {/* Horizontal Sliding Track */}
      <div
        ref={trackRef}
        className="flex flex-col lg:flex-row gap-8 px-4 sm:px-6 lg:px-12 w-full lg:w-max will-change-transform items-stretch"
      >
        {showcaseProjects.map((p, idx) => (
          <div
            key={idx}
            className="w-full lg:w-[620px] shrink-0 rounded-3xl bg-dark-900/90 border border-slate-800/90 p-6 sm:p-8 flex flex-col justify-between group hover:border-accent-purple/50 transition-all duration-300 shadow-xl"
            data-cursor="VIEW"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-4xl font-black font-mono text-slate-700 group-hover:text-accent-electric transition-colors">
                  0{idx + 1}
                </span>
                <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-accent-violet/15 border border-accent-violet/30 text-accent-purple">
                  {p.category}
                </span>
              </div>

              {/* Reveal Image Container */}
              <div className="mb-6 rounded-2xl overflow-hidden border border-slate-800 group-hover:border-accent-purple/30 transition-colors">
                <ImageReveal
                  src={p.image}
                  alt={p.title}
                  aspectRatio="aspect-[16/9]"
                  className="group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-accent-electric transition-colors">
                {p.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {p.description}
              </p>
            </div>

            <div>
              {/* Tech Badges */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {(p.technologies || []).map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-dark-950 border border-slate-800 text-slate-400"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Live Link Button */}
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-accent-violet/10 hover:bg-accent-violet/25 border border-accent-purple/30 text-white font-semibold text-sm transition-all group-hover:border-accent-electric"
              >
                <span>Explore Live Website</span>
                <ExternalLink className="w-4 h-4 text-accent-electric" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
