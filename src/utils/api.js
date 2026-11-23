const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Token helpers
export const getToken = () => localStorage.getItem('wasi_admin_token');
export const setToken = (token) => localStorage.setItem('wasi_admin_token', token);
export const removeToken = () => localStorage.removeItem('wasi_admin_token');

// Common fetch wrapper
async function request(endpoint, options = {}) {
  const headers = options.headers || {};
  const token = getToken();

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // If body is NOT FormData, default to application/json
  if (options.body && !(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(options.body);
  }

  const config = {
    ...options,
    headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export const api = {
  // Authentication
  login: (credentials) => request('/auth/login', { method: 'POST', body: credentials }),
  getMe: () => request('/auth/me'),
  logout: () => request('/auth/logout', { method: 'POST' }),
  updateProfile: (profileData) => request('/auth/profile', { method: 'PUT', body: profileData }),
  updatePassword: (passwords) => request('/auth/password', { method: 'PUT', body: passwords }),

  // Projects
  getProjects: (params = {}) => {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'All') query.append('category', params.category);
    if (params.featured !== undefined) query.append('featured', params.featured);
    if (params.search) query.append('search', params.search);
    const queryString = query.toString() ? `?${query.toString()}` : '';
    return request(`/projects${queryString}`);
  },
  getProjectById: (id) => request(`/projects/${id}`),
  createProject: (formData) => request('/projects', { method: 'POST', body: formData }),
  updateProject: (id, formData) => request(`/projects/${id}`, { method: 'PUT', body: formData }),
  deleteProject: (id) => request(`/projects/${id}`, { method: 'DELETE' }),

  // Skills
  getSkills: (category) => {
    const qs = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    return request(`/skills${qs}`);
  },
  createSkill: (data) => request('/skills', { method: 'POST', body: data }),
  updateSkill: (id, data) => request(`/skills/${id}`, { method: 'PUT', body: data }),
  deleteSkill: (id) => request(`/skills/${id}`, { method: 'DELETE' }),

  // Experience
  getExperience: () => request('/experience'),
  getExperienceById: (id) => request(`/experience/${id}`),
  createExperience: (data) => request('/experience', { method: 'POST', body: data }),
  updateExperience: (id, data) => request(`/experience/${id}`, { method: 'PUT', body: data }),
  deleteExperience: (id) => request(`/experience/${id}`, { method: 'DELETE' }),

  // Education
  getEducation: () => request('/education'),
  getEducationById: (id) => request(`/education/${id}`),
  createEducation: (data) => request('/education', { method: 'POST', body: data }),
  updateEducation: (id, data) => request(`/education/${id}`, { method: 'PUT', body: data }),
  deleteEducation: (id) => request(`/education/${id}`, { method: 'DELETE' }),

  // Messages (Contact Form & Admin)
  getMessages: () => request('/messages'),
  sendMessage: (messageData) => request('/messages', { method: 'POST', body: messageData }),
  markMessageRead: (id, isRead = true) => request(`/messages/${id}/read`, { method: 'PUT', body: { isRead } }),
  deleteMessage: (id) => request(`/messages/${id}`, { method: 'DELETE' }),

  // Health
  checkHealth: () => request('/health'),
};

export default api;
