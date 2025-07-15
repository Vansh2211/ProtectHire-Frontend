
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import apiFetch from '@/lib/api';

const AUTH_TOKEN_KEY = 'authToken';
const USER_DATA_KEY = 'protecthire_user';

// Define the User type - This should match the user object returned by your backend
interface User {
  id: string;
  name: string;
  email: string;
  userType: 'client' | 'guard' | 'company';
  imageUrl?: string;
}

// Define the context shape
interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  registerClient: (name: string, email: string, password: string) => Promise<void>;
  registerGuard: (formData: FormData) => Promise<void>;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const loadUserFromStorage = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedToken = localStorage.getItem(AUTH_TOKEN_KEY);
        const storedUser = localStorage.getItem(USER_DATA_KEY);
        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to parse user data from storage:", error);
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_DATA_KEY);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    loadUserFromStorage();
  }, [loadUserFromStorage]);

  const handleAuthSuccess = (data: { token: string; user: User }) => {
    localStorage.setItem(AUTH_TOKEN_KEY, data.token);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    router.push('/');
  };

  const login = async (email: string, password: string) => {
    const response = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    handleAuthSuccess(response);
  };

  const registerClient = async (name: string, email: string, password: string) => {
     const response = await apiFetch('/api/auth/register/client', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });
    handleAuthSuccess(response);
  };

  const registerGuard = async (formData: FormData) => {
      // For multipart/form-data, we don't set Content-Type header
      // The browser will set it automatically with the correct boundary
      const response = await fetch('http://localhost:8080/api/auth/register/guard', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred.' }));
        throw new Error(errorData.message || `API Error: ${response.statusText}`);
      }

      const data = await response.json();
      handleAuthSuccess(data);
  }

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_DATA_KEY);
    setUser(null);
    setToken(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, registerClient, registerGuard }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

// Create a custom hook for using the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
