import React, { useState } from 'react';
import {
  Key,
  User,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

export default function AdminSettings() {
  const { admin, updateAdminProfile } = useAuth();

  // Profile Form
  const [name, setName] = useState(admin?.name || 'Wasi Ullah');
  const [email, setEmail] = useState(admin?.email || 'wasiwebsolution@gmail.com');
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState(null);

  // Password Form
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
      const res = await api.updateProfile({ name, email });
      if (res.success && res.admin) {
        updateAdminProfile(res.admin);
        setProfileMsg({ type: 'success', text: 'Admin profile updated successfully!' });
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
        <h1 className="text-2xl font-black text-white tracking-tight">System Settings</h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage administrator profile credentials, security passwords, and backend status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Box: Admin Profile */}
        <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
            <User className="w-5 h-5 text-accent-purple" />
            <h3 className="text-sm font-bold text-white">Administrator Profile</h3>
          </div>

          {profileMsg && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                profileMsg.type === 'success'
                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
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

          <form onSubmit={handleUpdateProfile} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-700 text-xs text-white focus:outline-none focus:border-accent-purple"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-700 text-xs text-white focus:outline-none focus:border-accent-purple"
                required
              />
            </div>

            <button
              type="submit"
              disabled={profileLoading}
              className="w-full py-2.5 rounded-xl font-semibold text-xs text-white bg-accent-violet hover:bg-accent-purple shadow-glow-purple transition"
            >
              {profileLoading ? 'Saving...' : 'Save Profile Changes'}
            </button>
          </form>
        </div>

        {/* Right Box: Change Password */}
        <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
            <Key className="w-5 h-5 text-accent-electric" />
            <h3 className="text-sm font-bold text-white">Security & Password</h3>
          </div>

          {passMsg && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                passMsg.type === 'success'
                  ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                  : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
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

          <form onSubmit={handleUpdatePassword} className="space-y-3.5">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-700 text-xs text-white focus:outline-none focus:border-accent-purple"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-700 text-xs text-white focus:outline-none focus:border-accent-purple"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-300">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat new password"
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-700 text-xs text-white focus:outline-none focus:border-accent-purple"
                required
              />
            </div>

            <button
              type="submit"
              disabled={passLoading}
              className="w-full py-2.5 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition"
            >
              {passLoading ? 'Updating...' : 'Change Password'}
            </button>
          </form>
        </div>

      </div>

      {/* Backend & Environment Health Status */}
      <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
          System Information
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-dark-850 border border-slate-800">
            <span className="text-slate-500 block text-[11px]">Backend API</span>
            <span className="text-accent-electric font-semibold">http://localhost:5000/api</span>
          </div>

          <div className="p-3 rounded-xl bg-dark-850 border border-slate-800">
            <span className="text-slate-500 block text-[11px]">Database Provider</span>
            <span className="text-accent-purple font-semibold">MongoDB & Mongoose</span>
          </div>

          <div className="p-3 rounded-xl bg-dark-850 border border-slate-800">
            <span className="text-slate-500 block text-[11px]">Session Protection</span>
            <span className="text-emerald-400 font-semibold">JWT Bearer (30 Days)</span>
          </div>
        </div>
      </div>

    </div>
  );
}
