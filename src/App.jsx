import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Public Portfolio Components
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

// Admin Pages & Protected Layout
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import DashboardOverview from './pages/admin/DashboardOverview';
import ProjectsManagement from './pages/admin/ProjectsManagement';
import AddProject from './pages/admin/AddProject';
import SkillsManagement from './pages/admin/SkillsManagement';
import ExperienceManagement from './pages/admin/ExperienceManagement';
import EducationManagement from './pages/admin/EducationManagement';
import MessagesManagement from './pages/admin/MessagesManagement';
import AdminSettings from './pages/admin/AdminSettings';

function PublicPortfolio() {
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

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
