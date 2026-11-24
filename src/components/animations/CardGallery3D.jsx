import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ExternalLink } from 'lucide-react';

export default function CardGallery3D({ items }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultCards = [
    {
      title: 'NovaCraft Digital Agency',
      category: 'Web Design & GSAP',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
      description: 'Creative agency portfolio featuring dark aesthetics and custom micro-interactions.',
      liveUrl: 'https://example.com/novacraft-demo',
    },
    {
      title: 'ApexWear Urban Store',
      category: 'WooCommerce E-Commerce',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
      description: 'High-converting fashion storefront with AJAX cart drawer and currency switcher.',
      liveUrl: 'https://example.com/apexwear-demo',
    },
    {
      title: 'LuxeStay Villas & Resort',
      category: 'Hospitality Web Portal',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
      description: 'Luxury hospitality website with room availability showcases and booking inquiries.',
      liveUrl: 'https://example.com/luxestay-demo',
    },
    {
      title: 'ApexCare Medical Clinic',
      category: 'Healthcare & Appointments',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
      description: 'Clean healthcare website with doctor directory and step-by-step appointment scheduling.',
      liveUrl: 'https://example.com/apexcare-demo',
    },
    {
      title: 'UrbanBite Gourmet Bistro',
      category: 'Culinary Menu & Reservations',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      description: 'Atmospheric culinary website with interactive digital menus and online table reservation.',
      liveUrl: 'https://example.com/urbanbite-demo',
    },
  ];

  const cards = items || defaultCards;

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <section className="relative py-24 sm:py-32 bg-dark-950 overflow-hidden border-t border-slate-800/80">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-electric/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-violet/10 border border-accent-purple/30 text-accent-electric text-xs font-mono tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-accent-electric" />
            Interactive 3D Carousel Gallery
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-3">
            3D PERSPECTIVE <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-electric">GALLERY</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Click next or select cards to cycle through projects in dynamic 3D rotational perspective space.
          </p>
        </div>

        {/* 3D Gallery Stage */}
        <div className="relative h-[480px] sm:h-[540px] flex items-center justify-center" style={{ perspective: '1200px' }}>
          {cards.map((card, idx) => {
            const offset = (idx - currentIndex + cards.length) % cards.length;
            // Calculate distance relative to center (-2, -1, 0, 1, 2)
            let relativePos = offset;
            if (relativePos > cards.length / 2) {
              relativePos -= cards.length;
            }

            const isCenter = relativePos === 0;
            const isVisible = Math.abs(relativePos) <= 2;

            if (!isVisible) return null;

            const rotateY = relativePos * -25;
            const translateX = relativePos * 260;
            const translateZ = -Math.abs(relativePos) * 160;
            const scale = 1 - Math.abs(relativePos) * 0.12;
            const opacity = 1 - Math.abs(relativePos) * 0.35;
            const zIndex = 20 - Math.abs(relativePos);

            return (
              <div
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                style={{
                  transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                  opacity,
                  zIndex,
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className={`absolute w-72 sm:w-80 cursor-pointer rounded-3xl bg-dark-900 border ${
                  isCenter ? 'border-accent-purple/70 shadow-[0_0_35px_rgba(124,58,237,0.3)]' : 'border-slate-800'
                } p-5 backdrop-blur-xl group`}
                data-cursor={isCenter ? 'EXPLORE' : 'SELECT'}
              >
                {/* Card Image */}
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] mb-4 border border-slate-800">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 px-2.5 py-0.5 rounded-full bg-dark-950/80 backdrop-blur-sm border border-slate-700 text-[10px] font-mono text-accent-electric">
                    {card.category}
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-accent-electric transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                  {card.description}
                </p>

                {isCenter && (
                  <a
                    href={card.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="w-full py-2 rounded-xl bg-accent-violet/20 hover:bg-accent-violet/40 border border-accent-purple/40 text-white text-xs font-mono font-medium flex items-center justify-center gap-2 transition-all"
                  >
                    <span>View Project</span>
                    <ExternalLink className="w-3.5 h-3.5 text-accent-electric" />
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* Gallery Navigation Controls */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prevCard}
            aria-label="Previous Project"
            className="w-12 h-12 rounded-full bg-dark-900 border border-slate-800 hover:border-accent-purple text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg"
          >
            <ChevronLeft className="w-5 h-5 text-accent-electric" />
          </button>

          <div className="flex items-center gap-2">
            {cards.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === idx
                    ? 'w-8 bg-gradient-to-r from-accent-purple to-accent-electric'
                    : 'w-2 bg-slate-800 hover:bg-slate-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextCard}
            aria-label="Next Project"
            className="w-12 h-12 rounded-full bg-dark-900 border border-slate-800 hover:border-accent-purple text-white flex items-center justify-center transition-all hover:scale-110 shadow-lg"
          >
            <ChevronRight className="w-5 h-5 text-accent-electric" />
          </button>
        </div>
      </div>
    </section>
  );
}
