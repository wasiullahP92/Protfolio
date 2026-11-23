import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FolderGit2,
  Sparkles,
  Wrench,
  Briefcase,
  MessageSquare,
  ArrowRight,
  Plus,
  Star,
  AlertCircle
} from 'lucide-react';
import { api } from '../../utils/api';

export default function DashboardOverview() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experience, setExperience] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [projRes, skillRes, expRes, msgRes] = await Promise.allSettled([
          api.getProjects(),
          api.getSkills(),
          api.getExperience(),
          api.getMessages(),
        ]);

        if (projRes.status === 'fulfilled' && projRes.value?.data) {
          setProjects(projRes.value.data);
        }
        if (skillRes.status === 'fulfilled' && skillRes.value?.data) {
          setSkills(skillRes.value.data);
        }
        if (expRes.status === 'fulfilled' && expRes.value?.data) {
          setExperience(expRes.value.data);
        }
        if (msgRes.status === 'fulfilled' && msgRes.value?.data) {
          setMessages(msgRes.value.data);
        }
      } catch (err) {
        setError('Could not load some dashboard metrics from backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const totalProjects = projects.length;
  const featuredProjects = projects.filter((p) => p.featured).length;
  const totalSkills = skills.length;
  const totalExperience = experience.length;
  const unreadMessages = messages.filter((m) => !m.isRead).length;

  // Category counts for quick chart
  const categoriesCount = projects.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-accent-purple/30 border-t-accent-purple rounded-full animate-spin mb-3" />
        <p className="text-xs font-mono text-slate-400">Loading portfolio dashboard metrics...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      
      {/* Top Welcome Banner */}
      <div className="relative overflow-hidden p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-slate-800 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent-violet/15 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-violet/15 border border-accent-violet/30 text-accent-purple text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time MongoDB Synchronization</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome Back, Wasi Ullah!
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
              Here is an overview of your web development projects, technical skills inventory, career milestones, and client inquiries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/admin/projects/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-accent-violet to-accent-purple shadow-glow-purple hover:shadow-glow-combo transition"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </Link>
            <Link
              to="/admin/messages"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs text-slate-300 bg-dark-850 hover:bg-slate-800 border border-slate-700/80 transition"
            >
              <MessageSquare className="w-4 h-4 text-accent-electric" />
              <span>Inquiries ({unreadMessages} unread)</span>
            </Link>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Projects */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 relative overflow-hidden group hover:border-accent-purple/50 transition">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold">Total Projects</span>
            <div className="w-10 h-10 rounded-xl bg-accent-violet/15 text-accent-purple flex items-center justify-center">
              <FolderGit2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">{totalProjects}</div>
          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1 font-mono">
            <span className="text-emerald-400 font-bold">{featuredProjects}</span> featured on homepage
          </p>
        </div>

        {/* Card 2: Featured Projects */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 relative overflow-hidden group hover:border-accent-electric/50 transition">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold">Featured Projects</span>
            <div className="w-10 h-10 rounded-xl bg-accent-electric/15 text-accent-electric flex items-center justify-center">
              <Star className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">{featuredProjects}</div>
          <p className="text-xs text-slate-400 mt-2 font-mono">
            Highlight cards in curated showcase
          </p>
        </div>

        {/* Card 3: Total Skills */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 relative overflow-hidden group hover:border-indigo-500/50 transition">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold">Total Skills</span>
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">{totalSkills}</div>
          <p className="text-xs text-slate-400 mt-2 font-mono">
            Across Core & Expanding Stacks
          </p>
        </div>

        {/* Card 4: Experience Milestones */}
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 relative overflow-hidden group hover:border-emerald-500/50 transition">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase text-slate-400 font-semibold">Work Experience</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="text-3xl font-black text-white tracking-tight">{totalExperience}</div>
          <p className="text-xs text-slate-400 mt-2 font-mono">
            P92 IT Solution & Client Roles
          </p>
        </div>

      </div>

      {/* Grid: Charts & Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Recent Projects Table */}
        <div className="lg:col-span-7 glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-white">Recent Projects</h3>
                <p className="text-xs text-slate-400">Latest portfolio work saved in database</p>
              </div>
              <Link
                to="/admin/projects"
                className="text-xs font-semibold text-accent-electric hover:underline flex items-center gap-1 font-mono"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-500 uppercase font-mono text-[10px]">
                    <th className="pb-3">Project</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Featured</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {projects.slice(0, 5).map((project) => (
                    <tr key={project._id} className="hover:bg-dark-850/50 transition">
                      <td className="py-3 flex items-center gap-3">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-8 h-8 rounded-lg object-cover bg-dark-900 border border-slate-800"
                        />
                        <div className="font-semibold text-white max-w-[150px] truncate">
                          {project.title}
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-0.5 rounded bg-dark-850 text-slate-300 font-mono border border-slate-800">
                          {project.category}
                        </span>
                      </td>
                      <td className="py-3">
                        {project.featured ? (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent-purple/20 text-accent-purple border border-accent-purple/40 font-mono">
                            Featured
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500 font-mono">Standard</span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        <Link
                          to={`/admin/projects/edit/${project._id}`}
                          className="text-xs text-accent-purple hover:text-white font-medium mr-2"
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {projects.length === 0 && (
                    <tr>
                      <td colSpan="4" className="text-center py-6 text-slate-500">
                        No projects found. Click "Add New Project" to get started!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
            <span>Showing top {Math.min(5, projects.length)} of {totalProjects} projects</span>
            <Link to="/admin/projects/new" className="text-accent-electric hover:underline">
              + New Project
            </Link>
          </div>
        </div>

        {/* Right Column: Visual Category Distribution & Latest Inquiries */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Category Distribution Chart / Breakdown */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <h3 className="text-base font-bold text-white mb-1">Project Portfolio Breakdown</h3>
            <p className="text-xs text-slate-400 mb-4">Distribution by project taxonomy</p>

            <div className="space-y-3">
              {Object.entries(categoriesCount).map(([cat, count]) => {
                const percentage = totalProjects > 0 ? Math.round((count / totalProjects) * 100) : 0;
                return (
                  <div key={cat} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-300">{cat}</span>
                      <span className="text-accent-electric font-semibold">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-dark-850 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-accent-violet to-accent-electric rounded-full transition-all duration-700"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
              {Object.keys(categoriesCount).length === 0 && (
                <p className="text-xs text-slate-500">No category data available.</p>
              )}
            </div>
          </div>

          {/* Latest Messages Quick Widget */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white">Latest Messages</h3>
              <Link to="/admin/messages" className="text-xs font-mono text-accent-electric hover:underline">
                Inbox →
              </Link>
            </div>

            <div className="space-y-3">
              {messages.slice(0, 3).map((msg) => (
                <div
                  key={msg._id}
                  className={`p-3 rounded-xl border transition ${
                    msg.isRead
                      ? 'bg-dark-850/60 border-slate-800/80 text-slate-400'
                      : 'bg-accent-violet/10 border-accent-violet/30 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-xs font-bold text-white truncate">{msg.name}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-accent-electric truncate">{msg.subject}</p>
                  <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{msg.message}</p>
                </div>
              ))}
              {messages.length === 0 && (
                <p className="text-xs text-slate-500">No client messages received yet.</p>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
