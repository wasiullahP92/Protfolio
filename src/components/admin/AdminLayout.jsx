import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderGit2,
  PlusCircle,
  Wrench,
  Briefcase,
  GraduationCap,
  BookOpen,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  ChevronRight,
  Bell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  // Poll or fetch unread messages count
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.getMessages();
        if (res.success && Array.isArray(res.data)) {
          const unread = res.data.filter((m) => !m.isRead).length;
          setUnreadCount(unread);
        }
      } catch {
        // Silently handle if offline
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out of the admin panel?')) {
      await logout();
      navigate('/admin/login');
    }
  };

  const navItems = [
    { name: 'Overview', path: '/admin', icon: LayoutDashboard, end: true },
    { name: 'Projects', path: '/admin/projects', icon: FolderGit2 },
    { name: 'Add New Project', path: '/admin/projects/new', icon: PlusCircle },
    { name: 'Skills Management', path: '/admin/skills', icon: Wrench },
    { name: 'Training & Courses', path: '/admin/training', icon: BookOpen },
    { name: 'Experience Management', path: '/admin/experience', icon: Briefcase },
    { name: 'Education Management', path: '/admin/education', icon: GraduationCap },
    {
      name: 'Messages',
      path: '/admin/messages',
      icon: MessageSquare,
      badge: unreadCount > 0 ? unreadCount : null,
    },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex flex-col lg:flex-row">
      
      {/* Mobile Top Header */}
      <header className="lg:hidden bg-dark-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-dark-850 border border-slate-800 text-slate-300 hover:text-white"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <span className="font-extrabold text-white text-lg tracking-tight">
            WASI<span className="text-accent-purple">.</span> ADMIN
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/messages"
            className="relative p-2 rounded-xl bg-dark-850 border border-slate-800 text-slate-300"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-electric text-[10px] font-bold text-black flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-accent-electric px-2.5 py-1.5 rounded-lg bg-dark-850 border border-slate-800 flex items-center gap-1"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed lg:sticky top-0 bottom-0 left-0 w-72 bg-dark-900 border-r border-slate-800/90 z-40 flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Sidebar Top Brand */}
          <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
            <Link to="/admin" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent-violet to-accent-electric flex items-center justify-center text-white font-extrabold text-lg shadow-glow-purple">
                W
              </div>
              <div>
                <h2 className="font-black text-white text-base tracking-tight leading-none">
                  WASI<span className="text-accent-purple">.</span>
                </h2>
                <p className="text-[11px] font-mono text-accent-electric font-semibold mt-1">
                  ADMIN CONTROL
                </p>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-210px)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.end}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 group ${
                      isActive
                        ? 'bg-gradient-to-r from-accent-violet to-accent-purple text-white shadow-glow-purple font-semibold'
                        : 'text-slate-400 hover:text-white hover:bg-dark-850'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-accent-electric text-black">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer User Details & Logout */}
        <div className="p-4 border-t border-slate-800/80 bg-dark-900/60 space-y-3">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-8 h-8 rounded-lg bg-accent-violet/20 border border-accent-violet/40 flex items-center justify-center text-accent-purple font-bold text-xs">
              {admin?.name ? admin.name.charAt(0) : 'W'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{admin?.name || 'Wasi Ullah'}</p>
              <p className="text-[11px] font-mono text-slate-400 truncate">{admin?.email || 'Admin'}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-medium text-slate-300 bg-dark-850 hover:bg-dark-800 border border-slate-800 transition"
              title="Open public portfolio in new tab"
            >
              <ExternalLink className="w-3.5 h-3.5 text-accent-electric" />
              <span>View Site</span>
            </a>

            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 transition"
              title="Sign out of admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-30 lg:hidden"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Top Bar */}
        <header className="hidden lg:flex items-center justify-between px-8 py-4 bg-dark-950/80 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="text-slate-500">Dashboard</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-white font-semibold">Management Console</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/admin/messages"
              className="relative p-2 rounded-xl bg-dark-850 hover:bg-dark-800 border border-slate-800 text-slate-300 transition"
              title="Inbound Messages"
            >
              <Bell className="w-4 h-4 text-accent-electric" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent-electric text-[10px] font-bold text-black flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Link>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-accent-violet/15 text-accent-purple border border-accent-violet/30 hover:bg-accent-violet hover:text-white transition shadow-sm"
            >
              <span>View Public Portfolio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl text-slate-400 hover:text-white bg-dark-850 hover:bg-dark-800 border border-slate-800 transition"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* View Outlet */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>

    </div>
  );
}
