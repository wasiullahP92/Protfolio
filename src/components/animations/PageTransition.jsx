import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLocation } from 'react-router-dom';

export default function PageTransition() {
  const overlayRef = useRef(null);
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    // Only trigger when path ACTUALLY changes to a different route
    if (prevPath.current === location.pathname) {
      return;
    }
    prevPath.current = location.pathname;

    setIsTransitioning(true);

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 900);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // If not transitioning between pages, do NOT render any overlay elements
  if (!isTransitioning) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9990] pointer-events-none flex flex-row overflow-hidden"
    >
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="transition-column flex-1 h-full bg-[#06070b] border-r border-accent-purple/10 animate-pulse"
        />
      ))}
    </div>
  );
}
