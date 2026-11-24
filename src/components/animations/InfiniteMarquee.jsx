import React from 'react';

export default function InfiniteMarquee({
  items,
  speed = '40s',
  reverse = false,
  className = '',
}) {
  const defaultItems = [
    'WORDPRESS DEVELOPMENT',
    'REACT.JS ECOSYSTEM',
    'GSAP 3 INTERACTIVE ANIMATIONS',
    'TAILWIND CSS ARCHITECTURE',
    'ELEMENTOR PRO',
    'RESPONSIVE UI/UX DESIGN',
    'FULL-STACK MERN IN PROGRESS',
    'CORE WEB VITALS 99+',
    'RESTFUL APIS & MONGODB',
    'CUSTOM JAVASCRIPT SOLUTIONS',
  ];

  const list = items || defaultItems;

  return (
    <div className={`relative overflow-hidden py-4 select-none group ${className}`}>
      {/* Edge gradient fades for seamless blend */}
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-dark-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-dark-950 to-transparent z-10 pointer-events-none" />

      <div
        className="flex gap-8 whitespace-nowrap will-change-transform group-hover:[animation-play-state:paused]"
        style={{
          animation: `marqueeScroll ${speed} linear infinite ${reverse ? 'reverse' : 'normal'}`,
        }}
      >
        {/* Render twice for continuous loop */}
        {[...list, ...list].map((item, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-6 px-4 py-1 text-sm sm:text-base font-mono tracking-widest uppercase text-slate-300 font-semibold"
          >
            <span className="text-accent-electric drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]">
              ✦
            </span>
            <span className="hover:text-white transition-colors duration-200">
              {item}
            </span>
            <span className="text-accent-purple drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] text-xs">
              ❖
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
