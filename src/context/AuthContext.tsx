
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// This is our in-memory "user database". In a real app, this would be a database.
const USER_DB_KEY = 'protecthire_users';

// Define the User type
interface User {
  id: string;
  name: string;
  email: string;
  userType: 'client' | 'guard' | 'company';
  imageUrl?: string;
  password?: string; // Note: Storing passwords in localStorage is INSECURE. This is for simulation only.
}

// Define the context shape
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  registerClient: (name: string, email: string, password: string) => void;
  registerGuard: (name: string, email: string, password: string, imageUrl: string) => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to get users from localStorage
const getUsersFromStorage = (): User[] => {
  if (typeof window === 'undefined') return [];
  const users = localStorage.getItem(USER_DB_KEY);
  return users ? JSON.parse(users) : [];
};

// Helper function to save users to localStorage
const saveUsersToStorage = (users: User[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_DB_KEY, JSON.stringify(users));
};


// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // On initial load, check if a user session exists
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const storedUser = localStorage.getItem('protecthire_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Initialize the user database if it doesn't exist
    const allUsers = getUsersFromStorage();
    if (allUsers.length === 0) {
        // Add some mock users to start with
        const initialUsers: User[] = [
            { id: 'client123', name: 'John Doe', email: 'client123@example.com', userType: 'client', password: 'password', imageUrl: 'https://placehold.co/100x100.png' },
            { id: 'guard456', name: 'Aarav Sharma', email: 'guard456@example.com', userType: 'guard', password: 'password', imageUrl: 'https://placehold.co/100x100.png' },
        ];
        saveUsersToStorage(initialUsers);
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const allUsers = getUsersFromStorage();
    const foundUser = allUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      localStorage.setItem('protecthire_user', JSON.stringify(foundUser));
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('protecthire_user');
    setUser(null);
    router.push('/login');
  };

  const registerClient = (name: string, email: string, password: string) => {
    const allUsers = getUsersFromStorage();
    const newUser: User = {
      id: `client_${new Date().getTime()}`,
      name,
      email,
      userType: 'client',
      password,
      imageUrl: 'https://placehold.co/100x100.png',
    }
    const updatedUsers = [...allUsers, newUser];
    saveUsersToStorage(updatedUsers);
    
    localStorage.setItem('protecthire_user', JSON.stringify(newUser));
    setUser(newUser);
  }

  const registerGuard = (name: string, email: string, password: string, imageUrl: string) => {
    const allUsers = getUsersFromStorage();
    const newUser: User = {
      id: `guard_${new Date().getTime()}`,
      name,
      email,
      userType: 'guard',
      password,
      imageUrl: imageUrl,
    }
    const updatedUsers = [...allUsers, newUser];
    saveUsersToStorage(updatedUsers);
    
    localStorage.setItem('protecthire_user', JSON.stringify(newUser));
    setUser(newUser);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, registerClient, registerGuard }}>
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
