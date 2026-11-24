import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SvgMorph({ className = '' }) {
  const pathRef = useRef(null);

  // SVG morphing paths representing organic fluid states
  const pathA = "M210,130 C300,100 420,180 390,300 C360,420 250,450 150,390 C50,330 120,160 210,130 Z";
  const pathB = "M260,110 C380,140 430,270 360,380 C290,490 140,430 100,310 C60,190 140,80 260,110 Z";
  const pathC = "M190,90 C320,80 440,220 380,340 C320,460 200,430 120,350 C40,270 60,100 190,90 Z";

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(path, {
      attr: { d: pathB },
      duration: 6,
      ease: 'sine.inOut',
    })
    .to(path, {
      attr: { d: pathC },
      duration: 7,
      ease: 'sine.inOut',
    })
    .to(path, {
      attr: { d: pathA },
      duration: 6,
      ease: 'sine.inOut',
    });

    return () => tl.kill();
  }, []);

  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full filter blur-[50px] opacity-35"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="morphGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.7" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          d={pathA}
          fill="url(#morphGrad)"
        />
      </svg>
    </div>
  );
}
