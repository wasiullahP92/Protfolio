import React, { useState, useEffect } from 'react';
import {
  Key,
  User,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  BookOpen,
  MapPin,
  Target
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

export default function AdminSettings() {
  const { admin, updateAdminProfile } = useAuth();

  // Profile Form States
  const [name, setName] = useState(admin?.name || 'Wasi Ullah');
  const [email, setEmail] = useState(admin?.email || 'wasiwebsolution@gmail.com');
  const [professionalTitle, setProfessionalTitle] = useState(
    admin?.professionalTitle || 'WordPress Developer | Web Designer | Full Stack Developer in Progress'
  );
  const [location, setLocation] = useState(admin?.location || 'Peshawar, Pakistan');
  const [shortIntro, setShortIntro] = useState(
    admin?.shortIntro ||
      "Hi, I'm Wasi Ullah, a passionate web developer and Computer Science student. I specialize in WordPress website design and development. I am continuously improving my development skills and exploring modern web technologies. Currently, I am learning React.js to build dynamic, interactive, and modern web applications."
  );
  const [currentLearningTech, setCurrentLearningTech] = useState(
    admin?.currentLearningTech || 'React.js'
  );
  const [futureGoals, setFutureGoals] = useState(
    Array.isArray(admin?.futureGoals)
      ? admin.futureGoals.join(', ')
      : 'Advanced React.js, Node.js, Express.js, MongoDB, Full-Stack Development'
  );

  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState(null);

  // Sync when admin object updates
  useEffect(() => {
    if (admin) {
      if (admin.name) setName(admin.name);
      if (admin.email) setEmail(admin.email);
      if (admin.professionalTitle) setProfessionalTitle(admin.professionalTitle);
      if (admin.location) setLocation(admin.location);
      if (admin.shortIntro) setShortIntro(admin.shortIntro);
      if (admin.currentLearningTech) setCurrentLearningTech(admin.currentLearningTech);
      if (admin.futureGoals) {
        setFutureGoals(
          Array.isArray(admin.futureGoals) ? admin.futureGoals.join(', ') : admin.futureGoals
        );
      }
    }
  }, [admin]);

  // Password Form States
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passLoading, setPassLoading] = useState(false);
  const [passMsg, setPassMsg] = useState(null);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileMsg(null);
    setProfileLoading(true);

    try {
      const payload = {
        name,
        email,
        professionalTitle,
        location,
        shortIntro,
        currentLearningTech,
        futureGoals: futureGoals.split(',').map((g) => g.trim()).filter(Boolean),
      };

      const res = await api.updateProfile(payload);
      if (res.success && res.admin) {
        updateAdminProfile(res.admin);
        setProfileMsg({ type: 'success', text: 'Portfolio profile & learning goals saved to MongoDB!' });
      }
    } catch (err) {
      setProfileMsg({ type: 'error', text: err.message || 'Failed to update profile' });
    } finally {
      setProfileLoading(false);
      setTimeout(() => setProfileMsg(null), 4000);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPassMsg(null);

    if (newPassword !== confirmPassword) {
      setPassMsg({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (newPassword.length < 6) {
      setPassMsg({ type: 'error', text: 'New password must be at least 6 characters' });
      return;
    }

    setPassLoading(true);

    try {
      const res = await api.updatePassword({ currentPassword, newPassword });
      if (res.success) {
        setPassMsg({ type: 'success', text: 'Admin password updated successfully!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (err) {
      setPassMsg({ type: 'error', text: err.message || 'Failed to change password' });
    } finally {
      setPassLoading(false);
      setTimeout(() => setPassMsg(null), 4000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-fade-in pb-16">
      
      {/* Top Header */}
      <div className="pb-6 border-b border-slate-800">
        <h1 className="text-2xl font-black text-white tracking-tight">System & Profile Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your public developer introduction, active learning technology, future goals, and administrator credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Full Portfolio Profile & Learning Settings (Span 7) */}
        <div className="lg:col-span-7 glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800 space-y-5">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
            <User className="w-5 h-5 text-accent-purple" />
            <h3 className="text-sm font-bold text-white">Portfolio Profile & Introduction</h3>
          </div>

          {profileMsg && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                profileMsg.type === 'success'
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                  : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
              }`}
            >
              {profileMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{profileMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-800 text-white focus:outline-none focus:border-accent-purple"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Admin Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-800 text-white focus:outline-none focus:border-accent-purple"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Professional Title</label>
              <input
                type="text"
                required
                value={professionalTitle}
                onChange={(e) => setProfessionalTitle(e.target.value)}
                placeholder="WordPress Developer | Web Designer | Full Stack Developer in Progress"
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-800 text-white focus:outline-none focus:border-accent-purple"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Peshawar, Pakistan"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-800 text-white focus:outline-none focus:border-accent-purple"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Current Learning Technology
                </label>
                <input
                  type="text"
                  value={currentLearningTech}
                  onChange={(e) => setCurrentLearningTech(e.target.value)}
                  placeholder="e.g. React.js"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-800 text-white focus:outline-none focus:border-accent-purple"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Professional Introduction
              </label>
              <textarea
                rows={4}
                required
                value={shortIntro}
                onChange={(e) => setShortIntro(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-800 text-white focus:outline-none focus:border-accent-purple"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">
                Future Learning Goals (Comma-separated)
              </label>
              <input
                type="text"
                value={futureGoals}
                onChange={(e) => setFutureGoals(e.target.value)}
                placeholder="Advanced React.js, Node.js, Express.js, MongoDB, Full-Stack Development"
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-800 text-white focus:outline-none focus:border-accent-purple"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={profileLoading}
                className="w-full py-2.5 rounded-xl bg-accent-violet hover:bg-accent-purple text-white font-bold transition shadow-glow-purple disabled:opacity-50"
              >
                {profileLoading ? 'Saving to Database...' : 'Save Profile Changes'}
              </button>
            </div>
          </form>
        </div>

        {/* Right Column: Password & Account Security (Span 5) */}
        <div className="lg:col-span-5 glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800 space-y-5 self-start">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
            <Key className="w-5 h-5 text-accent-electric" />
            <h3 className="text-sm font-bold text-white">Security & Password</h3>
          </div>

          {passMsg && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                passMsg.type === 'success'
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                  : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
              }`}
            >
              {passMsg.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 shrink-0" />
              )}
              <span>{passMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Current Password</label>
              <input
                type="password"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-800 text-white focus:outline-none focus:border-accent-electric"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">New Password (Min. 6 chars)</label>
              <input
                type="password"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-800 text-white focus:outline-none focus:border-accent-electric"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-800 text-white focus:outline-none focus:border-accent-electric"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={passLoading}
                className="w-full py-2.5 rounded-xl bg-dark-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-accent-electric font-semibold transition disabled:opacity-50"
              >
                {passLoading ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
