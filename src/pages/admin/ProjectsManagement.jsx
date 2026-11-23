import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Search,
  Trash2,
  Edit3,
  Star,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { api } from '../../utils/api';

export default function ProjectsManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [notification, setNotification] = useState(null);

  const navigate = useNavigate();

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.getProjects();
      if (res.success && Array.isArray(res.data)) {
        setProjects(res.data);
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to fetch projects from backend' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    setActionLoading(true);
    try {
      const res = await api.deleteProject(id);
      if (res.success) {
        setProjects(projects.filter((p) => p._id !== id));
        setNotification({ type: 'success', message: 'Project removed successfully' });
      }
    } catch (err) {
      setNotification({ type: 'error', message: err.message || 'Failed to delete project' });
    } finally {
      setActionLoading(false);
      setDeleteConfirmId(null);
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const handleToggleFeatured = async (project) => {
    try {
      const updatedFeatured = !project.featured;
      const res = await api.updateProject(project._id, { featured: updatedFeatured });
      if (res.success) {
        setProjects(
          projects.map((p) => (p._id === project._id ? { ...p, featured: updatedFeatured } : p))
        );
        setNotification({
          type: 'success',
          message: `Project ${updatedFeatured ? 'marked as featured' : 'unmarked from featured'}`,
        });
        setTimeout(() => setNotification(null), 3000);
      }
    } catch (err) {
      setNotification({ type: 'error', message: 'Failed to update featured status' });
    }
  };

  const categories = ['All', 'WordPress', 'E-Commerce', 'Web Design', 'Full Stack', 'Other'];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in">
      
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">Projects Management</h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage, publish, edit, and organize all projects featured on your portfolio website.
          </p>
        </div>

        <Link
          to="/admin/projects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-accent-violet to-accent-purple shadow-glow-purple hover:shadow-glow-combo transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </Link>
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

      {/* Filter and Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search projects by title, tech, or description..."
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl bg-dark-850 border border-slate-700/80 text-white placeholder-slate-500 focus:outline-none focus:border-accent-purple"
          />
        </div>

        {/* Category Pills Filter */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedCategory === cat
                  ? 'bg-accent-violet text-white shadow-glow-purple'
                  : 'bg-dark-850 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Projects Table */}
      <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead>
              <tr className="bg-dark-850/80 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px] tracking-wider">
                <th className="py-3.5 px-4">Project Image</th>
                <th className="py-3.5 px-4">Project Name & Slug</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Technologies</th>
                <th className="py-3.5 px-4">Date Created</th>
                <th className="py-3.5 px-4 text-center">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredProjects.map((project) => (
                <tr key={project._id} className="hover:bg-dark-850/50 transition">
                  
                  {/* Image Thumbnail */}
                  <td className="py-3 px-4">
                    <div className="w-14 h-10 rounded-lg overflow-hidden border border-slate-800 bg-dark-900 shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>

                  {/* Title & Slug */}
                  <td className="py-3 px-4 max-w-xs">
                    <p className="font-bold text-white text-sm truncate">{project.title}</p>
                    <p className="text-[11px] font-mono text-accent-electric truncate">{project.slug}</p>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-dark-850 text-slate-200 border border-slate-700/80">
                      {project.category}
                    </span>
                  </td>

                  {/* Tech stack */}
                  <td className="py-3 px-4 max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.slice(0, 3).map((t, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-dark-800 text-slate-300">
                          {t}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="text-[10px] text-slate-500">+{project.technologies.length - 3}</span>
                      )}
                    </div>
                  </td>

                  {/* Date Created */}
                  <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                    {new Date(project.createdAt).toLocaleDateString()}
                  </td>

                  {/* Featured Status Toggle */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleToggleFeatured(project)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold transition ${
                        project.featured
                          ? 'bg-amber-400/15 text-amber-300 border border-amber-400/40 shadow-sm'
                          : 'bg-dark-850 text-slate-500 border border-slate-800 hover:text-slate-300'
                      }`}
                      title="Click to toggle featured on portfolio homepage"
                    >
                      <Star className={`w-3 h-3 ${project.featured ? 'fill-amber-300' : ''}`} />
                      <span>{project.featured ? 'Featured' : 'Standard'}</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => navigate(`/admin/projects/edit/${project._id}`)}
                        className="p-1.5 rounded-lg bg-dark-850 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition"
                        title="Edit Project"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-accent-purple" />
                      </button>

                      <button
                        onClick={() => setDeleteConfirmId(project._id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}

              {filteredProjects.length === 0 && !loading && (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-slate-400 text-xs">
                    No matching projects found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-slate-800/80 bg-dark-850/50 flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Total projects in database: {projects.length}</span>
          <span>Showing {filteredProjects.length} filtered items</span>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-dark-900 border border-slate-800 p-6 rounded-2xl max-w-sm w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">Delete Project?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Are you sure you want to delete this project? This will remove the record from MongoDB and delete its uploaded images. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-dark-850 text-slate-300 hover:text-white border border-slate-800 transition"
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-500 text-white transition flex items-center gap-1.5"
                disabled={actionLoading}
              >
                {actionLoading ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
