import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Public Portfolio Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Training from './components/Training';
import LearningJourney from './components/LearningJourney';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CVModal from './components/CVModal';

// Advanced Awwwards-Standard Animation Components
import CustomCursor from './components/animations/CustomCursor'; // 7. Custom Cursor
import Preloader from './components/animations/Preloader'; // 10. Website Preloader
import PageTransition from './components/animations/PageTransition'; // 15. Page Transition Animation
import InfiniteMarquee from './components/animations/InfiniteMarquee'; // 12. Infinite Marquee
import FullScreenTextSection from './components/animations/FullScreenTextSection'; // 2. Full Screen Text Animation
import HorizontalScrollSection from './components/animations/HorizontalScrollSection'; // 1. Horizontal Scroll Website
import ProductShowcase from './components/animations/ProductShowcase'; // 5. Product Showcase
import ScrollytellingSection from './components/animations/ScrollytellingSection'; // 9. Scrollytelling Website
import StackingCards from './components/animations/StackingCards'; // 11. Stacking Cards
import CardGallery3D from './components/animations/CardGallery3D'; // 13. 3D Card Gallery
import SvgMorph from './components/animations/SvgMorph'; // 8. SVG Morph Animation
import ParallaxLayer from './components/animations/ParallaxLayer'; // 4. 3D Parallax Scrolling

// Admin Pages & Protected Layout
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import DashboardOverview from './pages/admin/DashboardOverview';
import ProjectsManagement from './pages/admin/ProjectsManagement';
import AddProject from './pages/admin/AddProject';
import SkillsManagement from './pages/admin/SkillsManagement';
import TrainingManagement from './pages/admin/TrainingManagement';
import ExperienceManagement from './pages/admin/ExperienceManagement';
import EducationManagement from './pages/admin/EducationManagement';
import MessagesManagement from './pages/admin/MessagesManagement';
import AdminSettings from './pages/admin/AdminSettings';

function PublicPortfolio() {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 relative selection:bg-accent-violet selection:text-white overflow-x-hidden">
      {/* 10. Website Preloader with Progress Counter and Dual Curtain Reveal */}
      <Preloader onComplete={() => setPreloaderDone(true)} />

      {/* Top Navbar with 14. Fullscreen Menu Animation */}
      <Navbar onOpenCV={() => setIsCVOpen(true)} />

      {/* Main Content Sections with Integrated 15 Animations */}
      <main>
        {/* Hero Section with 6. Split Text, 3. Image Reveal, 8. SVG Morph, & 4. 3D Parallax */}
        <Hero onOpenCV={() => setIsCVOpen(true)} />

        {/* 12. Infinite Marquee (Continuous Ribbon) */}
        <InfiniteMarquee speed="35s" />

        {/* 2. Full Screen Text Animation Section */}
        <FullScreenTextSection />

        {/* About Section */}
        <About onOpenCV={() => setIsCVOpen(true)} />

        {/* Skills Section (3 Tiers: Current Skills, Learning, Future Goals) */}
        <Skills />

        {/* 11. Interactive Stacking Cards Section */}
        <StackingCards />

        {/* Education Section (NCS University System) */}
        <Education />

        {/* Professional Training Section (Saylani IT React.js focus) */}
        <Training />

        {/* 9. Scrollytelling Section (Interactive HUD Journey) */}
        <ScrollytellingSection />

        {/* Visual Learning Journey Timeline */}
        <LearningJourney />

        {/* Experience Section */}
        <Experience />

        {/* 5. Product Showcase (Interactive 3D Perspective Spotlight) */}
        <ProductShowcase />

        {/* 1. Horizontal Scroll Website / Projects Showcase */}
        <HorizontalScrollSection />

        {/* Filterable Projects Section */}
        <Projects />

        {/* 13. 3D Card Gallery (Perspective Rotational Carousel) */}
        <CardGallery3D />

        {/* Reverse Infinite Marquee Divider */}
        <InfiniteMarquee speed="45s" reverse={true} />

        {/* Contact Form Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer onOpenCV={() => setIsCVOpen(true)} />

      {/* Interactive Curriculum Vitae Preview / Download Modal */}
      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* 7. Precision Custom Cursor with Magnetic Lerp and Hover Tags */}
        <CustomCursor />

        {/* 15. Smooth Multi-Bar Page Transition Wipe */}
        <PageTransition />

        <Routes>
          {/* Public Portfolio Route */}
          <Route path="/" element={<PublicPortfolio />} />

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardOverview />} />
            <Route path="projects" element={<ProjectsManagement />} />
            <Route path="projects/new" element={<AddProject />} />
            <Route path="projects/edit/:id" element={<AddProject />} />
            <Route path="skills" element={<SkillsManagement />} />
            <Route path="training" element={<TrainingManagement />} />
            <Route path="experience" element={<ExperienceManagement />} />
            <Route path="education" element={<EducationManagement />} />
            <Route path="messages" element={<MessagesManagement />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          {/* Catch-all redirect to Public Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
