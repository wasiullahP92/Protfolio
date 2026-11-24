import React, { useState, useRef } from 'react';
import { ExternalLink, Laptop, Tablet, Smartphone, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ProductShowcase() {
  const [device, setDevice] = useState('desktop'); // desktop | tablet | mobile
  const [activeHotspot, setActiveHotspot] = useState(null);
  const cardRef = useRef(null);

  const showcaseData = {
    title: 'NovaCraft Agency Platform',
    tagline: 'Flagship Showcase: Bespoke High-Performance Agency Portfolio',
    description:
      'Engineered with pixel-precision, custom GSAP micro-animations, dynamic MongoDB content delivery, and lightning-fast load times exceeding 99 on Google Core Web Vitals.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80',
    liveUrl: 'https://example.com/novacraft-demo',
    metrics: [
      { label: 'PageSpeed', value: '99/100' },
      { label: 'Load Time', value: '0.8s' },
      { label: 'SEO Rank', value: '100%' },
    ],
    hotspots: [
      { id: 1, x: '25%', y: '30%', title: 'GSAP 3 Motion', text: 'Staggered scroll triggers and clip-path image reveals' },
      { id: 2, x: '72%', y: '45%', title: 'Dynamic API Core', text: 'Node & MongoDB database dynamic content sync' },
      { id: 3, x: '45%', y: '80%', title: 'Responsive Layout', text: 'Fluid viewport adaptation across all handheld screens' },
    ],
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const deviceWidths = {
    desktop: 'max-w-4xl',
    tablet: 'max-w-xl',
    mobile: 'max-w-xs',
  };

  return (
    <section className="relative py-24 sm:py-32 bg-dark-950 overflow-hidden border-t border-slate-800/80">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-accent-violet/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-violet/10 border border-accent-purple/30 text-accent-electric text-xs font-mono tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent-electric" />
            Interactive 3D Product Showcase
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4">
            FLAGSHIP <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-electric">EXPERIENCE</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Interact with the 3D showcase canvas below. Switch between device viewports and hover over the interactive hotspots to inspect architectural highlights.
          </p>

          {/* Device Viewport Selector */}
          <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-dark-900 border border-slate-800 mt-6 shadow-inner">
            <button
              onClick={() => setDevice('desktop')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                device === 'desktop'
                  ? 'bg-accent-violet text-white shadow-glow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              Desktop
            </button>
            <button
              onClick={() => setDevice('tablet')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                device === 'tablet'
                  ? 'bg-accent-violet text-white shadow-glow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
              Tablet
            </button>
            <button
              onClick={() => setDevice('mobile')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                device === 'mobile'
                  ? 'bg-accent-violet text-white shadow-glow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              Mobile
            </button>
          </div>
        </div>

        {/* 3D Interactive Canvas Container */}
        <div className="flex justify-center transition-all duration-500 ease-out">
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`w-full ${deviceWidths[device]} transition-all duration-500 relative rounded-3xl p-4 sm:p-6 bg-gradient-to-b from-dark-900/90 to-dark-950/90 border border-slate-800/90 shadow-2xl backdrop-blur-xl group`}
            style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out, max-width 0.4s ease' }}
          >
            {/* Top Browser Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-4 px-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="px-4 py-1 rounded-full bg-dark-950 border border-slate-800 text-[11px] font-mono text-slate-400 truncate max-w-[200px] sm:max-w-xs">
                https://wasiullah.dev/showcase/novacraft
              </div>
              <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                SECURE
              </div>
            </div>

            {/* Showcase Image & Interactive Hotspots */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-800/80 bg-black aspect-[16/10] group-hover:border-accent-purple/40 transition-colors">
              <img
                src={showcaseData.image}
                alt={showcaseData.title}
                className="w-full h-full object-cover object-top filter brightness-95 group-hover:brightness-105 transition-all duration-500"
              />

              {/* Hotspot Pins */}
              {showcaseData.hotspots.map((spot) => (
                <div
                  key={spot.id}
                  style={{ top: spot.y, left: spot.x }}
                  className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2"
                >
                  <button
                    onClick={() => setActiveHotspot(activeHotspot === spot.id ? null : spot.id)}
                    className="relative w-7 h-7 rounded-full bg-accent-purple/90 border-2 border-white flex items-center justify-center text-white shadow-[0_0_15px_#a855f7] hover:scale-125 transition-transform"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-accent-electric animate-ping absolute inset-0 m-auto" />
                    <span className="text-[10px] font-bold font-mono">✦</span>
                  </button>

                  {/* Hotspot Tooltip */}
                  {activeHotspot === spot.id && (
                    <div className="absolute left-1/2 bottom-full mb-3 -translate-x-1/2 w-52 p-3 rounded-xl bg-dark-900/95 border border-accent-purple/50 shadow-2xl backdrop-blur-md text-left z-30 animate-in fade-in zoom-in-95 duration-200">
                      <div className="text-xs font-bold text-accent-electric mb-1">
                        {spot.title}
                      </div>
                      <p className="text-[11px] text-slate-300 leading-tight">
                        {spot.text}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Showcase Info & Key Metrics */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 px-2">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {showcaseData.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  {showcaseData.tagline}
                </p>
              </div>

              {/* Metrics Pills */}
              <div className="flex items-center gap-3">
                {showcaseData.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-dark-950 border border-slate-800 text-center"
                  >
                    <div className="text-xs font-bold font-mono text-accent-electric">
                      {m.value}
                    </div>
                    <div className="text-[9px] font-mono text-slate-400 uppercase">
                      {m.label}
                    </div>
                  </div>
                ))}

                <a
                  href={showcaseData.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-accent-purple to-accent-electric text-white text-xs font-bold font-mono inline-flex items-center gap-2 hover:opacity-90 transition-opacity shadow-glow-sm"
                >
                  <span>Launch</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
