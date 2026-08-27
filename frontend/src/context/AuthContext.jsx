import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  useEffect(() => {
    const savedUser = localStorage.getItem('thriftcampus_user');
    const savedToken = localStorage.getItem('thriftcampus_token');
    if (savedUser && savedToken) {
      try {
        setUser(JSON.parse(savedUser));
        setToken(savedToken);
      } catch {
        logout();
      }
    }
  }, []);

  const login = async (email, password) => {
    const data = await apiService.login(email, password);
    setUser(data);
    setToken(data.token);
    localStorage.setItem('thriftcampus_user', JSON.stringify(data));
    localStorage.setItem('thriftcampus_token', data.token);
    setIsAuthModalOpen(false);
    return data;
  };

  const register = async (name, email, password, role) => {
    const data = await apiService.register(name, email, password, role);
    setUser(data);
    setToken(data.token);
    localStorage.setItem('thriftcampus_user', JSON.stringify(data));
    localStorage.setItem('thriftcampus_token', data.token);
    setIsAuthModalOpen(false);
    return data;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('thriftcampus_user');
    localStorage.removeItem('thriftcampus_token');
  };

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuth = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAuthModalOpen,
        authMode,
        setAuthMode,
        login,
        register,
        logout,
        openAuth,
        closeAuth
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
