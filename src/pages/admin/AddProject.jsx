import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
  CheckCircle2,
  AlertCircle,
  X,
  Star
} from 'lucide-react';
import { api } from '../../utils/api';

export default function AddProject() {
  const { id } = useParams(); // If present, edit mode!
  const isEditMode = Boolean(id);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [notification, setNotification] = useState(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [category, setCategory] = useState('WordPress');
  const [liveUrl, setLiveUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [featured, setFeatured] = useState(false);

  // Technologies
  const [technologies, setTechnologies] = useState(['WordPress', 'Elementor Pro', 'Responsive Design']);
  const [techInput, setTechInput] = useState('');

  // Image handling: File OR URL
  const [imageTab, setImageTab] = useState('url'); // 'url' or 'file'
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Auto-slug generator from title if slug not manually customized
  const handleTitleChange = (val) => {
    setTitle(val);
    if (!isEditMode) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
      setSlug(generatedSlug);
    }
  };

  // If edit mode, load existing project data
  useEffect(() => {
    if (!isEditMode) return;

    const fetchProject = async () => {
      setFetching(true);
      try {
        const res = await api.getProjectById(id);
        if (res.success && res.data) {
          const p = res.data;
          setTitle(p.title || '');
          setSlug(p.slug || '');
          setShortDescription(p.shortDescription || '');
          setFullDescription(p.fullDescription || '');
          setCategory(p.category || 'WordPress');
          setLiveUrl(p.liveUrl || '');
          setGithubUrl(p.githubUrl || '');
          setFeatured(Boolean(p.featured));
          setTechnologies(p.technologies || []);
          setImageUrl(p.image || '');
          setImagePreview(p.image || '');
        }
      } catch (err) {
        setNotification({ type: 'error', message: 'Failed to load project details for editing.' });
      } finally {
        setFetching(false);
      }
    };

    fetchProject();
  }, [id, isEditMode]);

  // Handle image file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Add technology badge
  const handleAddTech = () => {
    const trimmed = techInput.trim();
    if (trimmed && !technologies.includes(trimmed)) {
      setTechnologies([...technologies, trimmed]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (techToRemove) => {
    setTechnologies(technologies.filter((t) => t !== techToRemove));
  };

  const handleSubmit = async (isPublishFeatured = false) => {
    setNotification(null);

    // Validation
    if (!title.trim() || !shortDescription.trim() || !fullDescription.trim()) {
      setNotification({ type: 'error', message: 'Please complete all required fields.' });
      return;
    }

    if (imageTab === 'url' && !imageUrl.trim() && !imagePreview) {
      setNotification({ type: 'error', message: 'Please provide a valid project image URL or upload a file.' });
      return;
    }

    if (imageTab === 'file' && !imageFile && !imagePreview) {
      setNotification({ type: 'error', message: 'Please select an image file to upload.' });
      return;
    }

    setLoading(true);

    try {
      const willBeFeatured = isPublishFeatured ? true : featured;

      // If a file is uploaded, use FormData
      if (imageFile) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('slug', slug);
        formData.append('shortDescription', shortDescription);
        formData.append('fullDescription', fullDescription);
        formData.append('category', category);
        formData.append('liveUrl', liveUrl);
        formData.append('githubUrl', githubUrl);
        formData.append('featured', willBeFeatured);
        formData.append('technologies', JSON.stringify(technologies));
        formData.append('image', imageFile);

        if (isEditMode) {
          await api.updateProject(id, formData);
        } else {
          await api.createProject(formData);
        }
      } else {
        // Plain JSON object
        const payload = {
          title,
          slug,
          shortDescription,
          fullDescription,
          category,
          liveUrl,
          githubUrl,
          featured: willBeFeatured,
          technologies,
          image: imageUrl || imagePreview,
        };

        if (isEditMode) {
          await api.updateProject(id, payload);
        } else {
          await api.createProject(payload);
        }
      }

      setNotification({
        type: 'success',
        message: `Project ${isEditMode ? 'updated' : 'created and published'} successfully!`,
      });

      setTimeout(() => {
        navigate('/admin/projects');
      }, 1200);
    } catch (err) {
      setNotification({
        type: 'error',
        message: err.message || 'Operation failed. Please verify fields and backend connectivity.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="py-20 flex flex-col items-center justify-center">
        <div className="w-10 h-10 border-2 border-accent-purple/30 border-t-accent-purple rounded-full animate-spin mb-3" />
        <p className="text-xs font-mono text-slate-400">Fetching project data from MongoDB...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-fade-in pb-16">
      
      {/* Top Breadcrumb & Title */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/projects"
            className="p-2 rounded-xl bg-dark-850 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              {isEditMode ? 'Edit Project' : 'Add New Project'}
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {isEditMode ? 'Modify project metadata and imagery' : 'Create and publish a new project directly to your portfolio'}
            </p>
          </div>
        </div>

        <Link to="/admin/projects" className="text-xs text-slate-400 hover:text-white font-mono">
          Cancel & Exit
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

      {/* Main Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Column (Main Details) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-800 space-y-5">
            
            {/* Title & Slug */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Project Title <span className="text-accent-purple">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. LuxeStay Boutique Villas"
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-slate-700/80 text-xs text-white focus:outline-none focus:border-accent-purple"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">
                  Project Slug <span className="text-slate-500 font-mono">(auto-generated)</span>
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="luxestay-boutique-villas"
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-slate-700/80 text-xs font-mono text-accent-electric focus:outline-none focus:border-accent-purple"
                />
              </div>
            </div>

            {/* Short Description */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-slate-300">
                  Short Description <span className="text-accent-purple">*</span>
                </label>
                <span className="text-[11px] font-mono text-slate-500">
                  {shortDescription.length}/300 chars
                </span>
              </div>
              <textarea
                rows="2"
                maxLength="300"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="A high-end, responsive WordPress website crafted for a luxury boutique resort..."
                className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-slate-700/80 text-xs text-white focus:outline-none focus:border-accent-purple resize-none"
                required
              />
            </div>

            {/* Full Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">
                Full Detailed Description <span className="text-accent-purple">*</span>
              </label>
              <textarea
                rows="5"
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                placeholder="Comprehensive breakdown of project challenges, solutions, page architecture, and results..."
                className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-slate-700/80 text-xs text-white focus:outline-none focus:border-accent-purple resize-none"
                required
              />
            </div>

            {/* Technologies Tag Manager */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Technologies Used</label>
              
              <div className="flex gap-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTech())}
                  placeholder="Type tech name and click Add (e.g. WooCommerce)"
                  className="flex-1 px-4 py-2 rounded-xl bg-dark-850 border border-slate-700/80 text-xs text-white focus:outline-none focus:border-accent-purple"
                />
                <button
                  type="button"
                  onClick={handleAddTech}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-accent-violet hover:bg-accent-purple text-white transition"
                >
                  Add
                </button>
              </div>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono bg-dark-850 text-slate-200 border border-slate-700"
                  >
                    <span>{tech}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="text-slate-400 hover:text-rose-400"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Live Website & GitHub URLs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Live Website URL</label>
                <input
                  type="url"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  placeholder="https://clientdomain.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-slate-700/80 text-xs text-white focus:outline-none focus:border-accent-purple"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">GitHub Repository URL</label>
                <input
                  type="url"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  placeholder="https://github.com/wasiullah/project"
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-slate-700/80 text-xs text-white focus:outline-none focus:border-accent-purple"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Right Sidebar Column (Media & Settings) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Category & Status Box */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Settings & Taxonomy</h3>

            {/* Category Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-dark-850 border border-slate-700/80 text-xs text-white focus:outline-none focus:border-accent-purple"
              >
                <option value="WordPress">WordPress</option>
                <option value="E-Commerce">E-Commerce</option>
                <option value="Web Design">Web Design</option>
                <option value="Full Stack">Full Stack</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Featured Toggle */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-white">Featured Project</p>
                <p className="text-[11px] text-slate-400">Spotlight on homepage</p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-dark-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-violet"></div>
              </label>
            </div>
          </div>

          {/* Project Image Box */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Project Image</h3>
              <div className="flex gap-1 text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() => setImageTab('url')}
                  className={`px-2 py-0.5 rounded ${imageTab === 'url' ? 'bg-accent-violet text-white' : 'text-slate-400'}`}
                >
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => setImageTab('file')}
                  className={`px-2 py-0.5 rounded ${imageTab === 'file' ? 'bg-accent-violet text-white' : 'text-slate-400'}`}
                >
                  Upload
                </button>
              </div>
            </div>

            {/* Input by Tab */}
            {imageTab === 'url' ? (
              <div className="space-y-1.5">
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value);
                    setImagePreview(e.target.value);
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-slate-700/80 text-xs text-white focus:outline-none focus:border-accent-purple"
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700/80 hover:border-accent-purple rounded-xl p-4 cursor-pointer bg-dark-850/50 transition">
                  <Upload className="w-6 h-6 text-accent-electric mb-2" />
                  <span className="text-xs text-slate-300 font-medium">Click to choose image file</span>
                  <span className="text-[10px] text-slate-500 font-mono mt-1">PNG, JPG, WEBP up to 5MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            {/* Live Image Preview */}
            {imagePreview && (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-800 bg-dark-900 mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Action Buttons Box */}
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSubmit(false)}
              className="w-full py-3 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition flex items-center justify-center gap-2"
            >
              {loading ? 'Saving...' : isEditMode ? 'Save Changes' : 'Save Project'}
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => handleSubmit(true)}
              className="w-full py-3 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-accent-violet to-accent-purple shadow-glow-purple hover:shadow-glow-combo transition flex items-center justify-center gap-2"
            >
              <Star className="w-3.5 h-3.5 fill-white" />
              <span>{isEditMode ? 'Save & Mark Featured' : 'Publish as Featured'}</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/admin/projects')}
              className="w-full py-2.5 rounded-xl text-xs text-slate-400 hover:text-white transition"
            >
              Cancel
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
