import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X
} from 'lucide-react';
import { api } from '../../utils/api';

const iconOptions = [
  'Globe',
  'Layout',
  'ShieldCheck',
  'TrendingUp',
  'FileText',
  'Code2',
  'Palette',
  'Cpu',
  'Boxes',
];

export default function SkillsManagement() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Core Competency',
    level: 85,
    icon: 'Globe',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await api.getSkills();
      if (res.success && Array.isArray(res.data)) {
        setSkills(res.data);
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to fetch skills from database' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleOpenAdd = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'Core Competency',
      level: 85,
      icon: 'Globe',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      icon: skill.icon || 'Globe',
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this skill?')) return;
    try {
      const res = await api.deleteSkill(id);
      if (res.success) {
        setSkills(skills.filter((s) => s._id !== id));
        setNotification({ type: 'success', message: 'Skill deleted successfully' });
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to delete skill' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    setSubmitting(true);
    try {
      if (editingSkill) {
        const res = await api.updateSkill(editingSkill._id, formData);
        if (res.success) {
          setSkills(skills.map((s) => (s._id === editingSkill._id ? res.data : s)));
          setNotification({ type: 'success', message: 'Skill updated successfully' });
        }
      } else {
        const res = await api.createSkill(formData);
        if (res.success) {
          setSkills([...skills, res.data]);
          setNotification({ type: 'success', message: 'New skill added successfully' });
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
    <div className="space-y-6 max-w-6xl mx-auto animate-fade-in pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Skills & Tech Stack</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your core proficiencies and expanding technical competencies.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-accent-violet to-accent-purple shadow-glow-purple hover:shadow-glow-combo transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Skill</span>
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

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="glass-panel p-5 rounded-2xl border border-slate-800 flex flex-col justify-between group hover:border-slate-700 transition"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-dark-850 text-accent-electric border border-slate-800">
                  {skill.category}
                </span>
                <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition">
                  <button
                    onClick={() => handleOpenEdit(skill)}
                    className="p-1 text-slate-400 hover:text-white"
                    title="Edit Skill"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-accent-purple" />
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id)}
                    className="p-1 text-slate-400 hover:text-rose-400"
                    title="Delete Skill"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="text-base font-bold text-white mb-2">{skill.name}</h4>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <div className="flex justify-between items-center text-xs mb-1 font-mono">
                <span className="text-slate-400">Proficiency</span>
                <span className="text-accent-purple font-bold">{skill.level}%</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-dark-850 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-accent-violet to-accent-electric"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {skills.length === 0 && !loading && (
        <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800">
          <p className="text-xs text-slate-400">No skills currently in database. Click "Add New Skill" above.</p>
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-dark-900 border border-slate-800 p-6 sm:p-7 rounded-2xl max-w-md w-full space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Skill Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. WooCommerce Customization"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-700 text-xs text-white focus:outline-none focus:border-accent-purple"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-700 text-xs text-white focus:outline-none focus:border-accent-purple"
                >
                  <option value="Core Competency">Core Competency</option>
                  <option value="Expanding Stack">Expanding Stack</option>
                  <option value="CMS & Development">CMS & Development</option>
                  <option value="UI / UX & Layout">UI / UX & Layout</option>
                  <option value="Operations & Care">Operations & Care</option>
                  <option value="Productivity">Productivity</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-slate-300">Proficiency Level</span>
                  <span className="font-mono text-accent-electric">{formData.level}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={formData.level}
                  onChange={(e) => setFormData({ ...formData, level: Number(e.target.value) })}
                  className="w-full accent-accent-purple"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Icon Identifier</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-700 text-xs text-white focus:outline-none focus:border-accent-purple"
                >
                  {iconOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
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
                  {submitting ? 'Saving...' : 'Save Skill'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
