import React, { useState, useEffect } from 'react';
import {
  Plus,
  Edit3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  BookOpen,
  Laptop,
  Award,
  Sparkles
} from 'lucide-react';
import { api } from '../../utils/api';

export default function TrainingManagement() {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTraining, setEditingTraining] = useState(null);
  const [formData, setFormData] = useState({
    institute: '',
    course: '',
    status: 'Currently Learning',
    currentFocus: 'React.js',
    startDate: '',
    endDate: 'Present',
    description: '',
    highlights: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchTrainings = async () => {
    setLoading(true);
    try {
      const res = await api.getTrainings();
      if (res.success && Array.isArray(res.data)) {
        setTrainings(res.data);
      }
    } catch {
      setNotification({ type: 'error', message: 'Failed to fetch training records from database' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainings();
  }, []);

  const handleOpenAdd = () => {
    setEditingTraining(null);
    setFormData({
      institute: 'Saylani IT Mass Training Program (Saylani IT)',
      course: 'Modern Web Development',
      status: 'Currently Learning',
      currentFocus: 'React.js',
      startDate: '2024',
      endDate: 'Present',
      description:
        'Professional training program in modern web development covering frontend foundations, advanced JavaScript, and interactive single-page application development with React.js.',
      highlights:
        'Modern Web Standards (HTML5 & CSS3), JavaScript (ES6+) Logic & DOM Manipulation, React.js Component Architecture & Hooks, Interactive Single-Page Applications (SPAs)',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingTraining(item);
    setFormData({
      institute: item.institute || '',
      course: item.course || '',
      status: item.status || 'Currently Learning',
      currentFocus: item.currentFocus || 'React.js',
      startDate: item.startDate || '',
      endDate: item.endDate || 'Present',
      description: item.description || '',
      highlights: Array.isArray(item.highlights)
        ? item.highlights.join(', ')
        : item.highlights || '',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.institute || !formData.course) {
      setNotification({ type: 'error', message: 'Please provide both institute and course title' });
      return;
    }

    setSubmitting(true);
    const payload = {
      ...formData,
      highlights: formData.highlights
        ? formData.highlights.split(',').map((h) => h.trim()).filter(Boolean)
        : [],
    };

    try {
      if (editingTraining) {
        const res = await api.updateTraining(editingTraining._id, payload);
        if (res.success) {
          setNotification({ type: 'success', message: 'Training record updated successfully!' });
        }
      } else {
        const res = await api.createTraining(payload);
        if (res.success) {
          setNotification({ type: 'success', message: 'New training record added to database!' });
        }
      }
      setIsModalOpen(false);
      fetchTrainings();
    } catch (err) {
      setNotification({ type: 'error', message: err.message || 'Operation failed' });
    } finally {
      setSubmitting(false);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleDelete = async (id, courseName) => {
    if (!window.confirm(`Are you sure you want to delete "${courseName}"?`)) return;

    try {
      const res = await api.deleteTraining(id);
      if (res.success) {
        setNotification({ type: 'success', message: 'Training record deleted.' });
        fetchTrainings();
      }
    } catch (err) {
      setNotification({ type: 'error', message: err.message || 'Failed to delete record' });
    } finally {
      setTimeout(() => setNotification(null), 4000);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-accent-electric" />
            <span>Professional Training & Courses</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your vocational IT training programs, active course certifications, and React.js learning focus.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-violet hover:bg-accent-purple text-white text-xs font-bold transition shadow-glow-purple self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Training</span>
        </button>
      </div>

      {/* Notification Banner */}
      {notification && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2.5 ${
            notification.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
              : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
          }`}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Training Records List */}
      {loading ? (
        <div className="text-center py-16 text-slate-500 text-xs font-mono">
          Loading training courses from database...
        </div>
      ) : trainings.length === 0 ? (
        <div className="glass-panel p-12 text-center rounded-2xl border border-slate-800 space-y-4">
          <Laptop className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No Training Courses Found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Click the button below to add your training details (such as Saylani IT Mass Training Program).
          </p>
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-violet text-white text-xs font-semibold"
          >
            <Plus className="w-4 h-4" />
            <span>Add Saylani IT Training</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainings.map((item) => (
            <div
              key={item._id}
              className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 relative group hover:border-accent-electric/50 transition"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {item.status || 'Currently Learning'}
                    </span>
                    <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-accent-violet/20 text-accent-purple border border-accent-violet/30 font-bold">
                      Focus: {item.currentFocus || 'React.js'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">{item.course}</h3>
                  <p className="text-xs font-semibold text-accent-purple mt-0.5">{item.institute}</p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-2 rounded-lg bg-dark-850 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-800 transition"
                    title="Edit Course"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id, item.course)}
                    className="p-2 rounded-lg bg-dark-850 hover:bg-rose-900/40 text-slate-400 hover:text-rose-400 border border-slate-800 transition"
                    title="Delete Course"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300/90 leading-relaxed">
                {item.description}
              </p>

              {item.highlights && item.highlights.length > 0 && (
                <div className="pt-3 border-t border-slate-800/80">
                  <p className="text-[10px] uppercase font-bold text-slate-500 mb-1.5">Syllabus Highlights:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.highlights.map((h, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-900 text-slate-300 border border-slate-800"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-dark-900 border border-slate-800 w-full max-w-xl rounded-2xl p-6 sm:p-7 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-accent-electric" />
                <span>{editingTraining ? 'Edit Training Course' : 'Add New Training Course'}</span>
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-dark-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Institute Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.institute}
                  onChange={(e) => setFormData({ ...formData, institute: e.target.value })}
                  placeholder="e.g. Saylani IT Mass Training Program (Saylani IT)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-800 text-white focus:outline-none focus:border-accent-purple"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Course Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  placeholder="e.g. Modern Web Development"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-800 text-white focus:outline-none focus:border-accent-purple"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Status
                  </label>
                  <input
                    type="text"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    placeholder="e.g. Currently Learning"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-800 text-white focus:outline-none focus:border-accent-purple"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Current Focus Technology
                  </label>
                  <input
                    type="text"
                    value={formData.currentFocus}
                    onChange={(e) => setFormData({ ...formData, currentFocus: e.target.value })}
                    placeholder="e.g. React.js"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-800 text-white focus:outline-none focus:border-accent-purple"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    Start Year
                  </label>
                  <input
                    type="text"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    placeholder="e.g. 2024"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-800 text-white focus:outline-none focus:border-accent-purple"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">
                    End Year / Present
                  </label>
                  <input
                    type="text"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    placeholder="e.g. Present"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-800 text-white focus:outline-none focus:border-accent-purple"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Course Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Overview of the curriculum, hands-on tasks, and development methods learned..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-800 text-white focus:outline-none focus:border-accent-purple"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Syllabus Highlights (Comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  placeholder="e.g. Modern Web Standards, JavaScript ES6+, React.js Hooks, SPAs"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-slate-800 text-white focus:outline-none focus:border-accent-purple"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-dark-850 hover:bg-slate-800 text-slate-300 font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2.5 rounded-xl bg-accent-violet hover:bg-accent-purple text-white font-bold transition shadow-glow-purple disabled:opacity-50"
                >
                  {submitting ? 'Saving...' : editingTraining ? 'Update Training' : 'Save Training'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
