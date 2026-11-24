import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FullScreenTextSection() {
  const containerRef = useRef(null);
  const textLine1Ref = useRef(null);
  const textLine2Ref = useRef(null);
  const textLine3Ref = useRef(null);
  const highlightRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1.2,
        },
      });

      tl.fromTo(
        textLine1Ref.current,
        { xPercent: -25, opacity: 0.2 },
        { xPercent: 5, opacity: 1, ease: 'none' }
      )
      .fromTo(
        textLine2Ref.current,
        { xPercent: 25, opacity: 0.2 },
        { xPercent: -5, opacity: 1, ease: 'none' },
        0
      )
      .fromTo(
        textLine3Ref.current,
        { scale: 0.85, opacity: 0.3 },
        { scale: 1.05, opacity: 1, ease: 'none' },
        0
      )
      .fromTo(
        highlightRef.current,
        { backgroundSize: '0% 100%' },
        { backgroundSize: '100% 100%', ease: 'power2.out' },
        0.2
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-28 sm:py-40 bg-dark-950 overflow-hidden border-y border-slate-800/60 select-none"
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.12)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center overflow-hidden">
        {/* Kinetic Row 1 */}
        <div
          ref={textLine1Ref}
          className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-slate-400/40 whitespace-nowrap will-change-transform"
        >
          CRAFTING DIGITAL
        </div>

        {/* Kinetic Row 2 */}
        <div
          ref={textLine2Ref}
          className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter whitespace-nowrap will-change-transform my-1 sm:my-3"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-sky-300 to-accent-electric drop-shadow-[0_0_35px_rgba(56,189,248,0.3)]">
            EXPERIENCES
          </span>{' '}
          <span className="text-slate-200">THAT SCALE</span>
        </div>

        {/* Kinetic Row 3 */}
        <div
          ref={textLine3Ref}
          className="text-xl sm:text-3xl md:text-4xl font-mono text-slate-400 font-medium tracking-widest uppercase mt-4 max-w-4xl will-change-transform"
        >
          From high-performance{' '}
          <span className="text-white font-bold px-2 py-0.5 rounded bg-accent-violet/20 border border-accent-purple/40">
            WordPress Solutions
          </span>{' '}
          to modern interactive{' '}
          <span className="text-accent-electric font-bold px-2 py-0.5 rounded bg-accent-electric/10 border border-accent-electric/30">
            React.js Web Applications
          </span>
        </div>
      </div>
    </section>
  );
}
