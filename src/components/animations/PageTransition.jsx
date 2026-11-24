import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';

export default function PageTransition() {
  const overlayRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    const panels = el.querySelectorAll('.transition-column');
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Drop in from top
      tl.set(el, { pointerEvents: 'auto' })
        .set(panels, { yPercent: -100 })
        .to(panels, {
          yPercent: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: 'power3.inOut',
        })
        .to(panels, {
          yPercent: 100,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power3.inOut',
        }, '+=0.05')
        .set(el, { pointerEvents: 'none' });
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
          className="transition-column flex-1 h-full bg-[#07080e] border-r border-accent-purple/10 transform -translate-y-full"
        />
      ))}
    </div>
  );
}
