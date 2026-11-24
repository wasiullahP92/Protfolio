import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const textRef = useRef(null);
  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    // Check if user has already seen preloader in this session (optional, but keep it snappy or always show)
    const ctx = gsap.context(() => {
      const counterObj = { value: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          if (onComplete) onComplete();
        },
      });

      // Animate percentage 0 -> 100
      tl.to(counterObj, {
        value: 100,
        duration: 1.6,
        ease: 'power3.inOut',
        onUpdate: () => {
          setPercent(Math.floor(counterObj.value));
        },
      })
      .to(lineRef.current, {
        scaleX: 1,
        duration: 1.6,
        ease: 'power3.inOut',
      }, 0)
      .to([textRef.current, counterRef.current, lineRef.current], {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in',
      })
      // Staggered curtain slide exit
      .to(curtainLeftRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: 'expo.inOut',
      }, '+=0.05')
      .to(curtainRightRef.current, {
        yPercent: 100,
        duration: 0.9,
        ease: 'expo.inOut',
      }, '<')
      .set(containerRef.current, { display: 'none' });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-auto select-none overflow-hidden"
    >
      {/* Dual Curtain Split Wipe */}
      <div
        ref={curtainLeftRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#05060a] border-b border-accent-purple/20 z-10"
      />
      <div
        ref={curtainRightRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#05060a] border-t border-accent-electric/20 z-10"
      />

      {/* Center Branding & Progress */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6">
        <div ref={textRef} className="flex flex-col items-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-violet/10 border border-accent-purple/30 text-accent-electric text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-accent-electric animate-ping" />
            Initializing Experience
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mt-1">
            WASI ULLAH<span className="text-accent-electric">.</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 font-mono tracking-widest uppercase">
            WordPress & Modern Web Engineer
          </p>
        </div>

        {/* Counter Number */}
        <div
          ref={counterRef}
          className="text-6xl sm:text-8xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-sky-300 to-accent-electric my-2"
        >
          {String(percent).padStart(2, '0')}
          <span className="text-2xl sm:text-4xl text-accent-purple font-normal">%</span>
        </div>

        {/* Progress Neon Bar */}
        <div className="w-56 sm:w-80 h-1 bg-slate-800 rounded-full overflow-hidden mt-4 relative">
          <div
            ref={lineRef}
            className="h-full w-full bg-gradient-to-r from-accent-violet via-accent-purple to-accent-electric origin-left transform scale-x-0 rounded-full shadow-[0_0_12px_#38bdf8]"
          />
        </div>
      </div>
    </div>
  );
}
