
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useGuards } from './GuardsContext';

const AUTH_TOKEN_KEY = 'authToken';
const USER_DATA_KEY = 'protecthire_user';
const ALL_USERS_KEY = 'protecthire_all_users';

// Define the User type
interface User {
  id: string;
  name: string;
  email: string;
  userType: 'client' | 'guard' | 'company';
  imageUrl?: string;
  password?: string; // Only for mock purposes
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
  const guardsContext = useGuards();


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

  const handleAuthSuccess = (user: User) => {
    const { password, ...userToStore } = user; // Exclude password from stored user object
    const mockToken = `mock-token-for-${user.id}`;
    localStorage.setItem(AUTH_TOKEN_KEY, mockToken);
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userToStore));
    setToken(mockToken);
    setUser(userToStore);
    router.push('/');
  };

  const login = async (email: string, password: string) => {
    const allUsers: User[] = JSON.parse(localStorage.getItem(ALL_USERS_KEY) || '[]');
    const foundUser = allUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      handleAuthSuccess(foundUser);
    } else {
      throw new Error('Invalid email or password.');
    }
  };

  const registerClient = async (name: string, email: string, password: string) => {
    const allUsers: User[] = JSON.parse(localStorage.getItem(ALL_USERS_KEY) || '[]');
    if (allUsers.some(u => u.email === email)) {
        throw new Error('An account with this email already exists.');
    }
    
    const newUser: User = {
        id: `client-${Date.now()}`,
        name,
        email,
        password,
        userType: 'client'
    };
    
    allUsers.push(newUser);
    localStorage.setItem(ALL_USERS_KEY, JSON.stringify(allUsers));
    handleAuthSuccess(newUser);
  };

  const registerGuard = async (formData: FormData) => {
      const allUsers: User[] = JSON.parse(localStorage.getItem(ALL_USERS_KEY) || '[]');
      const email = formData.get('email') as string;

      if (allUsers.some(u => u.email === email)) {
        throw new Error('An account with this email already exists.');
      }
      
      const newGuardUser: User = {
          id: `guard-${Date.now()}`,
          name: formData.get('fullName') as string,
          email: email,
          password: formData.get('password') as string,
          userType: 'guard'
      };
      
      allUsers.push(newGuardUser);
      localStorage.setItem(ALL_USERS_KEY, JSON.stringify(allUsers));

      // Also add to the guards list in GuardsContext
      const skillsValue = formData.get('skills') as string;
      const newGuardProfile = {
        id: newGuardUser.id,
        name: newGuardUser.name,
        role: formData.get('role') as string,
        experience: Number(formData.get('experience')),
        location: formData.get('location') as string,
        hourlyRate: formData.get('hourlyRate') ? Number(formData.get('hourlyRate')) : undefined,
        dailyRate: formData.get('dailyRate') ? Number(formData.get('dailyRate')) : undefined,
        monthlyRate: formData.get('monthlyRate') ? Number(formData.get('monthlyRate')) : undefined,
        bio: formData.get('bio') as string || undefined,
        skills: skillsValue ? skillsValue.split(',').map(s => s.trim()) : [],
        rating: Math.random() * (5 - 4) + 4, // Random rating between 4.0 and 5.0
        profilePictureUrl: "https://placehold.co/300x200.png"
      };

      guardsContext.addGuard(newGuardProfile);
      handleAuthSuccess(newGuardUser);
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
