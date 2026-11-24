import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Smooth lerp tracking
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Instant pinpoint dot
      gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.08,
        ease: 'power2.out',
      });
    };

    // Follower ticker with smooth lerping
    const ticker = gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - 0.2, gsap.ticker.deltaRatio());
      followerX += (mouseX - followerX) * dt;
      followerY += (mouseY - followerY) * dt;

      gsap.set(follower, {
        x: followerX,
        y: followerY,
      });
    });

    // Detect interactive elements across the DOM
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor], input, textarea, [role="button"]');
      if (target) {
        setIsHovered(true);
        const text = target.getAttribute('data-cursor');
        setCursorText(text || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      gsap.ticker.remove(ticker);
    };
  }, [isVisible]);

  if (isTouch) return null;

  return (
    <div className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Precision Core Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-accent-electric shadow-[0_0_10px_#38bdf8] pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
      />

      {/* Trailing Fluid Follower Ring / Pill */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 -ml-6 -mt-6 flex items-center justify-center rounded-full pointer-events-none transition-all duration-200 ease-out transform -translate-x-1/2 -translate-y-1/2 ${
          cursorText
            ? 'w-20 h-20 bg-accent-purple/90 backdrop-blur-md border border-white/40 shadow-[0_0_25px_rgba(168,85,247,0.6)] scale-100'
            : isHovered
            ? 'w-14 h-14 bg-accent-violet/20 border-2 border-accent-electric shadow-[0_0_20px_rgba(56,189,248,0.4)] scale-110'
            : 'w-10 h-10 border border-slate-400/40 bg-white/5 scale-100'
        }`}
      >
        {cursorText && (
          <span className="text-[11px] font-mono font-bold tracking-wider text-white uppercase animate-pulse select-none px-1 text-center leading-tight">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
