
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Define the User type
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
  login: (userType: 'client' | 'guard') => void;
  logout: () => void;
  registerClient: (name: string, email: string) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock User Data
const mockClient: User = {
  id: 'client123',
  name: 'John Doe',
  email: 'john.doe@example.com',
  userType: 'client',
  imageUrl: 'https://placehold.co/100x100.png',
};

const mockGuard: User = {
  id: 'guard456',
  name: 'Aarav Sharma',
  email: 'aarav.sharma@example.com',
  userType: 'guard',
  imageUrl: 'https://placehold.co/100x100.png',
}

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is "logged in" from a previous session (using localStorage for simulation)
    const storedUser = localStorage.getItem('protecthire_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  
  useEffect(() => {
    // If user state changes to a logged-in user, redirect to account page
    // This handles the redirect after the state is confirmed.
    if (user) {
        // Only redirect if we are on a public page like login or register
        const currentPath = window.location.pathname;
        if (['/login', '/register'].includes(currentPath)) {
            router.push('/account');
        }
    }
  }, [user, router]);


  const login = (userType: 'client' | 'guard') => {
    const userToLogin = userType === 'client' ? mockClient : mockGuard;
    localStorage.setItem('protecthire_user', JSON.stringify(userToLogin));
    setUser(userToLogin);
    // The useEffect hook above will handle the redirect.
  };

  const logout = () => {
    localStorage.removeItem('protecthire_user');
    setUser(null);
    router.push('/login');
  };

  const registerClient = (name: string, email: string) => {
    const newClient: User = {
      id: `client_${new Date().getTime()}`,
      name,
      email,
      userType: 'client',
      imageUrl: 'https://placehold.co/100x100.png',
    }
    localStorage.setItem('protecthire_user', JSON.stringify(newClient));
    setUser(newClient);
    // The useEffect hook will handle the redirect.
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, registerClient }}>
      {children}
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
