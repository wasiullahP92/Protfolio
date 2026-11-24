import React from 'react';
import { Layers, CheckCircle2, ArrowRight } from 'lucide-react';

export default function StackingCards() {
  const cards = [
    {
      id: '01',
      title: 'Bespoke WordPress Architect',
      subtitle: 'Modern Theme & Plugin Development',
      desc: 'Crafting responsive, secure, and blazing-fast WordPress solutions with custom Elementor widgets, ACF metadata, dynamic post architectures, and e-commerce WooCommerce integration.',
      features: ['Custom Elementor Pro Architecture', 'WooCommerce Stores & Payment Flow', 'Speed 99+ Core Web Vitals', 'Bespoke Plugin Hooks & Filters'],
      badge: 'Core Specialty',
      gradient: 'from-purple-900/40 via-dark-900 to-dark-950',
      border: 'border-accent-purple/40',
    },
    {
      id: '02',
      title: 'Modern React.js Engineering',
      subtitle: 'Component Lifecycles & State Flow',
      desc: 'Advancing modern web development through rigorous study and hands-on training at Saylani IT. Building responsive single-page applications with clean hooks, reusable design patterns, and Tailwind CSS.',
      features: ['React 19 Component Systems', 'Tailwind CSS Modern Styling', 'Vite High-Speed Tooling', 'Context API & State Management'],
      badge: 'Current Training at Saylani IT',
      gradient: 'from-sky-900/40 via-dark-900 to-dark-950',
      border: 'border-accent-electric/40',
    },
    {
      id: '03',
      title: 'Full-Stack MERN Evolution',
      subtitle: 'Node, Express, MongoDB & RESTful APIs',
      desc: 'Expanding into full-stack backend development. Building secure Node.js APIs, Mongoose data models, JWT authentication, and administrative content management panels.',
      features: ['RESTful Express APIs', 'MongoDB Database Architecture', 'JWT Authentication & Security', 'Admin CMS Dashboard Integration'],
      badge: 'Future Learning Goal',
      gradient: 'from-violet-900/40 via-dark-900 to-dark-950',
      border: 'border-accent-violet/40',
    },
    {
      id: '04',
      title: 'Awwwards-Grade Motion & UX',
      subtitle: 'GSAP 3, Parallax & Interactive Web',
      desc: 'Elevating websites beyond static documents into immersive digital experiences with GSAP timelines, ScrollTrigger, 3D card tilt, custom cursors, and kinetic typography.',
      features: ['GSAP 3 ScrollTrigger Pinning', 'Interactive 3D Card Depth', 'Custom Cursor & Smooth Lerp', 'Responsive Mobile Interactions'],
      badge: 'Creative Edge',
      gradient: 'from-fuchsia-900/40 via-dark-900 to-dark-950',
      border: 'border-pink-500/40',
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-dark-950 border-t border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-violet/10 border border-accent-purple/30 text-accent-electric text-xs font-mono tracking-widest uppercase mb-4">
            <Layers className="w-3.5 h-3.5 text-accent-electric" />
            Interactive Stacking Cards
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
            TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-electric">PILLARS</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Scroll down to watch each technical pillar stack seamlessly with dynamic depth layers.
          </p>
        </div>

        {/* Stacking Cards Container */}
        <div className="relative space-y-8">
          {cards.map((card, idx) => (
            <div
              key={card.id}
              style={{
                top: `${80 + idx * 24}px`,
              }}
              className={`sticky rounded-3xl bg-gradient-to-b ${card.gradient} border ${card.border} p-8 sm:p-10 shadow-2xl backdrop-blur-xl transition-all duration-300 group`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-950/80 border border-slate-800 text-accent-electric text-xs font-mono tracking-wider mb-2">
                    {card.badge}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {card.title}
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    {card.subtitle}
                  </p>
                </div>

                <span className="text-4xl sm:text-5xl font-mono font-black text-slate-700/60 group-hover:text-accent-electric transition-colors">
                  {card.id}
                </span>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {card.desc}
              </p>

              {/* Feature Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {card.features.map((f, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-dark-950/60 border border-slate-800/60 text-xs font-medium text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-accent-electric shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
