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

export default function EducationManagement() {
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState(null);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const fetchEducation = async () => {
    setLoading(true);
    try {
      const res = await api.getEducation();
      if (res.success && Array.isArray(res.data)) {
        setEducations(res.data);
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to fetch education records from database' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleOpenAdd = () => {
    setEditingEdu(null);
    setFormData({
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      description: '',
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (edu) => {
    setEditingEdu(edu);
    setFormData({
      institution: edu.institution,
      degree: edu.degree,
      startDate: edu.startDate || '',
      endDate: edu.endDate || '',
      description: edu.description,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this qualification?')) return;
    try {
      const res = await api.deleteEducation(id);
      if (res.success) {
        setEducations(educations.filter((e) => e._id !== id));
        setNotification({ type: 'success', message: 'Education entry removed' });
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to delete record' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.institution.trim() || !formData.degree.trim() || !formData.description.trim()) {
      return;
    }

    setSubmitting(true);
    try {
      if (editingEdu) {
        const res = await api.updateEducation(editingEdu._id, formData);
        if (res.success) {
          setEducations(educations.map((e) => (e._id === editingEdu._id ? res.data : e)));
          setNotification({ type: 'success', message: 'Education updated successfully' });
        }
      } else {
        const res = await api.createEducation(formData);
        if (res.success) {
          setEducations([...educations, res.data]);
          setNotification({ type: 'success', message: 'Education added successfully' });
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
          <h1 className="text-2xl font-black text-white tracking-tight">Education & Qualifications</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your academic credentials (DIT, Intermediate, Matriculation).
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-accent-violet to-accent-purple shadow-glow-purple hover:shadow-glow-combo transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Qualification</span>
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

      {/* Education Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {educations.map((edu) => (
          <div
            key={edu._id}
            className="glass-panel p-6 rounded-2xl border border-slate-800 flex flex-col justify-between group hover:border-slate-700 transition"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-dark-850 text-accent-electric border border-slate-800">
                  {edu.startDate && edu.endDate ? `${edu.startDate} – ${edu.endDate}` : 'Completed'}
                </span>

                <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition">
                  <button
                    onClick={() => handleOpenEdit(edu)}
                    className="p-1 text-slate-400 hover:text-white"
                    title="Edit Record"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-accent-purple" />
                  </button>
                  <button
                    onClick={() => handleDelete(edu._id)}
                    className="p-1 text-slate-400 hover:text-rose-400"
                    title="Delete Record"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-bold text-white mb-1 group-hover:text-accent-electric transition">
                {edu.degree}
              </h3>
              
              <p className="text-xs font-semibold text-accent-purple mb-3">
                {edu.institution}
              </p>

              <p className="text-xs text-slate-300 leading-relaxed">
                {edu.description}
              </p>
            </div>
          </div>
        ))}

        {educations.length === 0 && !loading && (
          <div className="col-span-2 glass-panel p-10 text-center rounded-2xl border border-slate-800 text-xs text-slate-400">
            No education records found. Click "Add Qualification" above.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-dark-900 border border-slate-800 p-6 sm:p-7 rounded-2xl max-w-md w-full space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">
                {editingEdu ? 'Edit Qualification' : 'Add Academic Qualification'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Degree / Diploma</label>
                <input
                  type="text"
                  value={formData.degree}
                  onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                  placeholder="e.g. Diploma in Information Technology (DIT)"
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-850 border border-slate-700 text-xs text-white focus:outline-none focus:border-accent-purple"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Institution / Academy</label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                  placeholder="e.g. Excel Learners Academy"
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-850 border border-slate-700 text-xs text-white focus:outline-none focus:border-accent-purple"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Start Year</label>
                  <input
                    type="text"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    placeholder="2023"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-850 border border-slate-700 text-xs text-white focus:outline-none focus:border-accent-purple"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">End Year</label>
                  <input
                    type="text"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    placeholder="2024"
                    className="w-full px-3.5 py-2 rounded-xl bg-dark-850 border border-slate-700 text-xs text-white focus:outline-none focus:border-accent-purple"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-300">Description / Focus Areas</label>
                <textarea
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Key curriculum subjects, database fundamentals, web principles..."
                  className="w-full px-3.5 py-2 rounded-xl bg-dark-850 border border-slate-700 text-xs text-white focus:outline-none focus:border-accent-purple resize-none"
                  required
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
                  {submitting ? 'Saving...' : 'Save Qualification'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
