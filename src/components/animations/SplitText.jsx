import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SplitText({
  children,
  type = 'words', // 'words' | 'chars'
  className = '',
  delay = 0,
  stagger = 0.03,
  duration = 0.7,
  triggerOnScroll = true,
  as: Component = 'span',
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const targets = el.querySelectorAll('.split-item');
    if (!targets.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(targets, { opacity: 1, yPercent: 0, rotateX: 0 });
      return;
    }

    const animConfig = {
      yPercent: 0,
      opacity: 1,
      rotateX: 0,
      duration,
      stagger,
      delay,
      ease: 'power3.out',
    };

    if (triggerOnScroll) {
      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 92%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            targets,
            { yPercent: 60, opacity: 0, rotateX: 10 },
            animConfig
          );
        },
      });
      return () => st.kill();
    } else {
      const tween = gsap.fromTo(
        targets,
        { yPercent: 60, opacity: 0, rotateX: 10 },
        animConfig
      );
      return () => tween.kill();
    }
  }, [children, delay, duration, stagger, triggerOnScroll]);

  const text = typeof children === 'string' ? children : '';

  if (!text) {
    return <Component className={className}>{children}</Component>;
  }

  if (type === 'chars') {
    const words = text.split(' ');
    return (
      <Component ref={containerRef} className={`inline-block ${className}`}>
        {words.map((word, wIdx) => (
          <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
            {word.split('').map((char, cIdx) => (
              <span
                key={cIdx}
                className="inline-block overflow-hidden align-top"
                style={{ perspective: '600px' }}
              >
                <span
                  className="split-item inline-block transform"
                  style={{ transformOrigin: 'bottom center' }}
                >
                  {char}
                </span>
              </span>
            ))}
          </span>
        ))}
      </Component>
    );
  }

  // Type: words
  const words = text.split(' ');
  return (
    <Component ref={containerRef} className={`inline-block ${className}`}>
      {words.map((word, idx) => (
        <span
          key={idx}
          className="inline-block overflow-hidden align-top mr-[0.25em]"
          style={{ perspective: '600px' }}
        >
          <span
            className="split-item inline-block transform"
            style={{ transformOrigin: 'bottom center' }}
          >
            {word}
          </span>
        </span>
      ))}
    </Component>
  );
}
