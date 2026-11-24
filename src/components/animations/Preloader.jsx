import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  // Check if preloader was already shown in this session
  const [isFinished, setIsFinished] = useState(() => {
    try {
      return sessionStorage.getItem('wasi_preloader_done') === 'true';
    } catch {
      return false;
    }
  });

  const [percent, setPercent] = useState(0);
  const containerRef = useRef(null);
  const counterRef = useRef(null);
  const textRef = useRef(null);
  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (isFinished) {
      if (onComplete) onComplete();
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Safety fallback: Guarantee the preloader dismisses within 2 seconds no matter what
    const safetyTimer = setTimeout(() => {
      try {
        sessionStorage.setItem('wasi_preloader_done', 'true');
      } catch {}
      setIsFinished(true);
      if (onComplete) onComplete();
    }, 2000);

    const counterObj = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        clearTimeout(safetyTimer);
        try {
          sessionStorage.setItem('wasi_preloader_done', 'true');
        } catch {}
        setIsFinished(true);
        if (onComplete) onComplete();
      },
    });

    // Snappy, energetic 1.1s loading sequence
    tl.to(counterObj, {
      value: 100,
      duration: 0.9,
      ease: 'power2.out',
      onUpdate: () => {
        setPercent(Math.floor(counterObj.value));
      },
    })
    .to(
      lineRef.current,
      { scaleX: 1, duration: 0.9, ease: 'power2.out' },
      0
    )
    .to([textRef.current, counterRef.current, lineRef.current], {
      opacity: 0,
      scale: 0.95,
      duration: 0.25,
      ease: 'power2.in',
    })
    .to(curtainLeftRef.current, {
      yPercent: -100,
      duration: 0.45,
      ease: 'power3.inOut',
    })
    .to(curtainRightRef.current, {
      yPercent: 100,
      duration: 0.45,
      ease: 'power3.inOut',
    }, '<');

    return () => {
      clearTimeout(safetyTimer);
      tl.kill();
    };
  }, [isFinished, onComplete]);

  // Once finished, remove entirely from DOM so it can NEVER block the screen
  if (isFinished) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex items-center justify-center select-none overflow-hidden bg-transparent"
    >
      {/* Dual Curtain Split Wipe */}
      <div
        ref={curtainLeftRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-[#06070b] border-b border-accent-purple/20 z-10 will-change-transform"
      />
      <div
        ref={curtainRightRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#06070b] border-t border-accent-electric/20 z-10 will-change-transform"
      />

      {/* Center Branding & Progress */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6">
        <div ref={textRef} className="flex flex-col items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-violet/10 border border-accent-purple/30 text-accent-electric text-xs font-mono tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-accent-electric animate-ping" />
            Loading Experience
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mt-1">
            WASI ULLAH<span className="text-accent-electric">.</span>
          </h1>
        </div>

        {/* Counter Number */}
        <div
          ref={counterRef}
          className="text-5xl sm:text-7xl font-black font-mono tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-sky-300 to-accent-electric my-1"
        >
          {String(percent).padStart(2, '0')}
          <span className="text-xl sm:text-3xl text-accent-purple font-normal">%</span>
        </div>

        {/* Progress Neon Bar */}
        <div className="w-48 sm:w-64 h-1 bg-slate-800 rounded-full overflow-hidden mt-3 relative">
          <div
            ref={lineRef}
            className="h-full w-full bg-gradient-to-r from-accent-violet via-accent-purple to-accent-electric origin-left transform scale-x-0 rounded-full shadow-[0_0_12px_#38bdf8]"
          />
        </div>
      </div>
    </div>
  );
}
