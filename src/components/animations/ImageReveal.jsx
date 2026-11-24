import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ImageReveal({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  overlayColor = 'bg-accent-purple',
  aspectRatio = 'aspect-[16/10]',
}) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const curtainRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    const curtain = curtainRef.current;
    if (!container || !image || !curtain) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
          once: true,
        },
      });

      tl.fromTo(
        curtain,
        { scaleY: 1, transformOrigin: 'top' },
        { scaleY: 0, duration: 1.1, ease: 'expo.inOut' }
      )
      .fromTo(
        image,
        { scale: 1.25, filter: 'blur(8px)' },
        { scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
        '<0.2'
      );
    }, container);

    return () => ctx.revert();
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl group ${aspectRatio} ${containerClassName}`}
    >
      {/* Target Image */}
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105 ${className}`}
      />

      {/* Unveiling Curtain Overlay */}
      <div
        ref={curtainRef}
        className={`absolute inset-0 z-20 origin-top pointer-events-none bg-gradient-to-b from-[#11131f] via-dark-900 to-[#0c0d16]`}
      />

      {/* Cyber Shimmer Line */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-tr from-accent-purple/10 via-transparent to-accent-electric/15" />
    </div>
  );
}
