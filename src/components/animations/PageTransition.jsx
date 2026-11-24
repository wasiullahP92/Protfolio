import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';

export default function PageTransition() {
  const overlayRef = useRef(null);
  const location = useLocation();
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Skip animation on initial page load so the screen is NEVER blocked
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const el = overlayRef.current;
    if (!el) return;

    const panels = el.querySelectorAll('.transition-column');
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Only wipe during route navigation
      tl.set(panels, { yPercent: -100 })
        .to(panels, {
          yPercent: 0,
          duration: 0.35,
          stagger: 0.04,
          ease: 'power3.inOut',
        })
        .to(panels, {
          yPercent: 100,
          duration: 0.4,
          stagger: 0.04,
          ease: 'power3.inOut',
        }, '+=0.05');
    }, overlayRef);

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9990] pointer-events-none flex flex-row overflow-hidden"
    >
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="transition-column flex-1 h-full bg-[#06070b] border-r border-accent-purple/10 transform -translate-y-full"
        />
      ))}
    </div>
  );
}
