import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 rounded-full border-2 border-accent-purple/30 border-t-accent-purple animate-spin mb-4" />
        <p className="text-xs font-mono text-slate-400">Verifying secure admin session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login preserving destination state
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}

