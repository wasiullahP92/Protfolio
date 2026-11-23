import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CVModal from './components/CVModal';

export default function App() {
  const [isCVOpen, setIsCVOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 relative selection:bg-accent-violet selection:text-white">
      {/* Top Navbar */}
      <Navbar onOpenCV={() => setIsCVOpen(true)} />

      {/* Main Content Sections */}
      <main>
        <Hero onOpenCV={() => setIsCVOpen(true)} />
        <About onOpenCV={() => setIsCVOpen(true)} />
        <Skills />
        <Experience />
        <Education />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenCV={() => setIsCVOpen(true)} />

      {/* Interactive Curriculum Vitae Preview / Download Modal */}
      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </div>
  );
}
