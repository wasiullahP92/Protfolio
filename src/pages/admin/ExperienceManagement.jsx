import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  Building
} from 'lucide-react';
import { api } from '../../utils/api';

export default function ExperienceManagement() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    startDate: '',
    endDate: 'Present',
    description: '',
    achievementsText: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchExperience = async () => {
    setLoading(true);
    try {
      const res = await api.getExperience();
      if (res.success && Array.isArray(res.data)) {
        setExperiences(res.data);
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to fetch experience from database' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const handleOpenAdd = () => {
    setEditingExp(null);
    setFormData({
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: 'Present',
      description: '',
      achievementsText: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exp) => {
    setEditingExp(exp);
    setFormData({
      jobTitle: exp.jobTitle,
      company: exp.company,
      startDate: exp.startDate,
      endDate: exp.endDate,
      description: exp.description,
      achievementsText: Array.isArray(exp.achievements) ? exp.achievements.join('\n') : '',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this experience record?')) return;
    try {
      const res = await api.deleteExperience(id);
      if (res.success) {
        setExperiences(experiences.filter((e) => e._id !== id));
        setNotification({ type: 'success', message: 'Experience entry deleted' });
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to delete record' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.jobTitle.trim() || !formData.company.trim() || !formData.description.trim()) {
      return;
    }

    setSubmitting(true);
    const achievements = formData.achievementsText
      .split('\n')
      .map((a) => a.trim())
      .filter(Boolean);

    const payload = {
      jobTitle: formData.jobTitle,
      company: formData.company,
      startDate: formData.startDate,
      endDate: formData.endDate,
      description: formData.description,
      achievements,
    };

    try {
      if (editingExp) {
        const res = await api.updateExperience(editingExp._id, payload);
        if (res.success) {
          setExperiences(experiences.map((e) => (e._id === editingExp._id ? res.data : e)));
          setNotification({ type: 'success', message: 'Experience updated successfully' });
        }
      } else {
        const res = await api.createExperience(payload);
        if (res.success) {
          setExperiences([...experiences, res.data]);
          setNotification({ type: 'success', message: 'Experience added successfully' });
        }
      }
      setIsModalOpen(false);
    } catch (err) {
      setNotification({ type: 'error', message: err.message || 'Operation failed' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Work Experience</h1>
          <p className="text-xs text-slate-400 mt-1">
            Maintain your career timeline, internships, and client milestones.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-accent-violet to-accent-purple shadow-glow-purple hover:shadow-glow-combo transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Experience</span>
        </button>
      </div>

      {/* Notifications */}
      {notification && (
        <div
          className={`p-3.5 rounded-xl text-xs flex items-center gap-2.5 animate-fade-in ${
            notification.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
              : 'bg-rose-500/10 border border-rose-500/30 text-rose-300'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Experience Timeline Cards */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp._id}
            className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3 relative group"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-accent-electric transition">
                  {exp.jobTitle}
                </h3>
                <p className="text-xs font-semibold text-accent-purple flex items-center gap-1.5 mt-0.5">
                  <Building className="w-3.5 h-3.5" />
                  <span>{exp.company}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-dark-850 text-accent-electric border border-slate-800">
                  {exp.startDate} – {exp.endDate}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(exp)}
                    className="p-1.5 rounded-lg bg-dark-850 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800"
                    title="Edit Record"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-accent-purple" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30"
                    title="Delete Record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
              {exp.description}
            </p>

            {exp.achievements && exp.achievements.length > 0 && (
              <div className="pt-2 border-t border-slate-800/80">
                <p className="text-[11px] font-mono uppercase text-slate-500 mb-1.5">Key Contributions:</p>
                <ul className="space-y-1">
                  {exp.achievements.map((ach, i) => (
                    <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                      <span className="text-accent-electric">•</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        {experiences.length === 0 && !loading && (
          <div className="glass-panel p-10 text-center rounded-2xl border border-slate-800 text-xs text-slate-400">
            No work experience recorded. Click "Add Experience" to add your roles.
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-dark-900 border border-slate-800 p-6 sm:p-7 rounded-2xl max-w-lg w-full space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingExp ? 'Edit Experience' : 'Add Experience Record'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Job Title</label>
                  <input
                    type="text"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                    placeholder="e.g. WordPress Developer"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-850 border border-slate-700 text-xs text-white focus:outline-none focus:border-accent-purple"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Company / Organization</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. P92 IT Solution"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-850 border border-slate-700 text-xs text-white focus:outline-none focus:border-accent-purple"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Start Date</label>
                  <input
                    type="text"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    placeholder="e.g. October 2024"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-850 border border-slate-700 text-xs text-white focus:outline-none focus:border-accent-purple"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">End Date</label>
                  <input
                    type="text"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    placeholder="e.g. April 2025 or Present"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-850 border border-slate-700 text-xs text-white focus:outline-none focus:border-accent-purple"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Role Description</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary of responsibilities and day-to-day work..."
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-850 border border-slate-700 text-xs text-white focus:outline-none focus:border-accent-purple resize-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Key Contributions (one per line)</label>
                <textarea
                  rows="3"
                  value={formData.achievementsText}
                  onChange={(e) => setFormData({ ...formData, achievementsText: e.target.value })}
                  placeholder="Constructed custom Elementor layouts&#10;Fixed mobile responsiveness across viewports&#10;Automated backups"
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-850 border border-slate-700 text-xs text-white focus:outline-none focus:border-accent-purple font-mono resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-medium rounded-xl bg-dark-850 text-slate-300 hover:text-white border border-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 text-xs font-semibold rounded-xl bg-accent-violet hover:bg-accent-purple text-white shadow-glow-purple"
                >
                  {submitting ? 'Saving...' : 'Save Experience'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
