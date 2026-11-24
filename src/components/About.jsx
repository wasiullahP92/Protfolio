import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { 
  UserCheck, 
  GraduationCap, 
  CheckCircle, 
  Globe, 
  Sparkles, 
  FileDown, 
  ArrowRight,
  Cpu
} from 'lucide-react';

export default function About({ onOpenCV }) {
  const cardsRef = useRef(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      cardsRef.current.children,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', delay: 0.1 }
    );
  }, []);
  const highlights = [
    {
      title: "Motivated & Hardworking",
      description: "Dedicated student and developer with an insatiable appetite for learning and delivering clean, reliable web solutions.",
      icon: UserCheck,
      color: "from-purple-500/20 to-purple-600/10",
      accent: "text-accent-purple",
    },
    {
      title: "Diploma in Information Technology",
      description: "Solid technical foundations in computing, databases, web design, and IT systems from Excel Learners Academy.",
      icon: GraduationCap,
      color: "from-cyan-500/20 to-cyan-600/10",
      accent: "text-accent-electric",
    },
    {
      title: "WordPress Development Experience",
      description: "Hands-on experience developing, customizing, and maintaining production-ready websites and online stores.",
      icon: Globe,
      color: "from-indigo-500/20 to-indigo-600/10",
      accent: "text-indigo-400",
    },
    {
      title: "Modern Tech Enthusiast",
      description: "Deeply interested in modern web technologies, advancing skills into semantic HTML, CSS, JavaScript, and React.",
      icon: Cpu,
      color: "from-pink-500/20 to-pink-600/10",
      accent: "text-pink-400",
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-dark-900/40">
      {/* Background accents */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-accent-violet/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-violet/10 border border-accent-violet/30 text-accent-purple text-xs font-semibold tracking-wider uppercase font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover My Story</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-electric">Me</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            A developer who bridges user-focused design and stable web architecture.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Personal Narrative & Philosophy */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="glass-panel p-8 rounded-2xl border border-slate-800 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-purple via-indigo-500 to-accent-electric" />
              
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>Who is Wasi Ullah?</span>
              </h3>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                <p>
                  I am a <strong className="text-white font-semibold">motivated and hardworking student</strong> with a <strong className="text-white font-semibold">Diploma in Information Technology</strong>, passionate about web development and the endless possibilities of modern digital technologies.
                </p>
                <p>
                  With real-world <strong className="text-white font-semibold">WordPress website development experience</strong>, I take pride in transforming client concepts into high-converting, responsive websites that load fast, look elegant, and are simple to manage.
                </p>
                <p>
                  Beyond WordPress, I actively invest time into honing frontend engineering skills including <span className="text-accent-electric">HTML5</span>, <span className="text-accent-electric">CSS3</span>, <span className="text-accent-electric">JavaScript</span>, and modern frameworks like <span className="text-accent-purple">React</span> to deliver modern web solutions.
                </p>
              </div>

              {/* Key Values List */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-850 border border-slate-800">
                  <CheckCircle className="w-4 h-4 text-accent-electric shrink-0" />
                  <span className="text-slate-200 font-medium">Clean, Maintainable Builds</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-850 border border-slate-800">
                  <CheckCircle className="w-4 h-4 text-accent-purple shrink-0" />
                  <span className="text-slate-200 font-medium">Pixel-Perfect Responsive UI</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-850 border border-slate-800">
                  <CheckCircle className="w-4 h-4 text-accent-purple shrink-0" />
                  <span className="text-slate-200 font-medium">Speed & SEO Focused</span>
                </div>
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-dark-850 border border-slate-800">
                  <CheckCircle className="w-4 h-4 text-accent-electric shrink-0" />
                  <span className="text-slate-200 font-medium">Proactive Client Care</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenCV}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent-violet hover:bg-accent-purple text-white text-xs sm:text-sm font-semibold shadow-glow-purple transition"
                >
                  <FileDown className="w-4 h-4" />
                  <span>Download Curriculum Vitae</span>
                </button>
                
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-dark-850 hover:bg-slate-800 text-slate-300 hover:text-white text-xs sm:text-sm font-medium border border-slate-700 transition"
                >
                  <span>Let's Discuss a Project</span>
                  <ArrowRight className="w-4 h-4 text-accent-electric" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 4 Strategic Highlight Cards */}
          <div ref={cardsRef} className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="glass-panel glass-panel-hover p-6 rounded-2xl border border-slate-800 flex flex-col justify-between group"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center ${item.accent} border border-slate-700/50 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-white mb-2 group-hover:text-accent-electric transition">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-purple" />
                    <span>Verified in CV</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}

