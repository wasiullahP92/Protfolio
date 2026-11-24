import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, getToken, setToken, removeToken } from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [token, setTokenState] = useState(getToken());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setError(null);
    try {
      const data = await api.login({ email, password });
      if (data && data.token) {
        setToken(data.token);
        setTokenState(data.token);
        setAdmin(data.admin);
        return { success: true, admin: data.admin };
      }
      return { success: false, error: data?.message || 'Login failed' };
    } catch (err) {
      const errorMsg = err.message || 'Invalid credentials';
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch {
      // Ignore network errors on logout
    } finally {
      removeToken();
      setTokenState(null);
      setAdmin(null);
    }
  };

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = getToken();
      if (!storedToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.getMe();
        if (response && response.admin) {
          setAdmin(response.admin);
        } else {
          logout();
        }
      } catch (err) {
        console.warn('Session verification failed, logging out:', err.message);
        logout();
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const updateAdminProfile = (updatedAdmin) => {
    setAdmin(updatedAdmin);
  };

  const value = {
    admin,
    token,
    loading,
    error,
    isAuthenticated: Boolean(token && admin),
    login,
    logout,
    updateAdminProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
