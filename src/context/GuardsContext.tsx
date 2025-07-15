
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// This is our in-memory "guard database". In a real app, this would be a real database.
const GUARD_DB_KEY = 'protecthire_guards';

// Define the Guard type
export interface Guard {
  id: string;
  name: string;
  role: string;
  location: string;
  hourlyRate?: number;
  dailyRate?: number;
  monthlyRate?: number;
  rating: number;
  experience: number;
  skills: string[];
  image: string;
  dataAiHint: string;
  bio?: string;
}

// This is the data structure from the registration form
export interface NewGuardData {
  fullName: string;
  role: string;
  experienceYears: number;
  location: string;
  certifications?: string;
  hourlyRate?: number;
  dailyRate?: number;
  monthlyRate?: number;
  bio?: string;
  profilePictureUrl: string;
}

// Mock data for initial guards if storage is empty
const getInitialGuards = (): Guard[] => [
  { id: '1', name: 'Aarav Sharma', role: 'Security Guard', location: 'Mumbai, MH', hourlyRate: 500, dailyRate: 3500, rating: 4.8, experience: 5, skills: ['cpr', 'first_aid'], image: 'https://placehold.co/300x200.png', dataAiHint: "person portrait", bio: "Ex-military professional with over 5 years of experience in corporate and event security. Adept at threat assessment and crisis management." },
  { id: '2', name: 'Priya Patel', role: 'Event Security', location: 'Delhi, DL', hourlyRate: 450, monthlyRate: 90000, rating: 4.5, experience: 3, skills: ['crowd_control'], image: 'https://placehold.co/300x200.png', dataAiHint: "security guard", bio: "Skilled in managing large crowds for events and public gatherings. Quick to de-escalate conflicts and ensure a safe environment." },
  { id: '3', name: 'Vikram Singh', role: 'Bodyguard', location: 'Bangalore, KA', dailyRate: 4000, monthlyRate: 100000, rating: 4.9, experience: 8, skills: ['cpr', 'first_aid', 'crowd_control', 'vip_protection'], image: 'https://placehold.co/300x200.png', dataAiHint: "bouncer professional", bio: "8 years of comprehensive security experience, including VIP protection for high-profile clients. Certified in advanced first aid and defensive driving." },
  { id: '4', name: 'Ananya Gupta', role: 'Security Guard', location: 'Mumbai, MH', hourlyRate: 550, rating: 4.6, experience: 4, skills: ['first_aid'], image: 'https://placehold.co/300x200.png', dataAiHint: "woman security", bio: "Vigilant and professional with experience in retail and residential security. Excellent communication skills and a customer-friendly approach." },
  { id: '5', name: 'Rohan Joshi', role: 'Bouncer', location: 'Pune, MH', hourlyRate: 480, dailyRate: 3800, rating: 4.7, experience: 6, skills: ['crowd_control', 'vip_protection'], image: 'https://placehold.co/300x200.png', dataAiHint: "man security", bio: "Specializes in executive protection and surveillance. Discreet, reliable, and highly trained to handle high-pressure situations." },
];

// Define the context shape
interface GuardsContextType {
  guards: Guard[];
  addGuard: (guardData: NewGuardData) => void;
}

// Create the context
const GuardsContext = createContext<GuardsContextType | undefined>(undefined);

// Create the provider component
export const GuardsProvider = ({ children }: { children: ReactNode }) => {
  const [guards, setGuards] = useState<Guard[]>([]);

  // On initial load, check if guards exist in localStorage. If not, use initial data.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const storedGuards = localStorage.getItem(GUARD_DB_KEY);
        if (storedGuards) {
          setGuards(JSON.parse(storedGuards));
        } else {
          const initialGuards = getInitialGuards();
          setGuards(initialGuards);
          localStorage.setItem(GUARD_DB_KEY, JSON.stringify(initialGuards));
        }
      } catch (error) {
        console.error("Failed to access localStorage or parse guards data:", error);
        // Fallback to initial data if storage is corrupted
        const initialGuards = getInitialGuards();
        setGuards(initialGuards);
      }
    }
  }, []);

  // Function to save guards to both state and localStorage
  const saveGuards = (newGuards: Guard[]) => {
    setGuards(newGuards);
    if (typeof window !== 'undefined') {
      localStorage.setItem(GUARD_DB_KEY, JSON.stringify(newGuards));
    }
  };

  const addGuard = (guardData: NewGuardData) => {
    const newGuard: Guard = {
      id: new Date().getTime().toString(), // Simple unique ID
      name: guardData.fullName,
      role: guardData.role,
      location: guardData.location,
      hourlyRate: guardData.hourlyRate,
      dailyRate: guardData.dailyRate,
      monthlyRate: guardData.monthlyRate,
      rating: +(4.0 + Math.random()).toFixed(1), // Random rating between 4.0 and 5.0
      experience: guardData.experienceYears,
      skills: guardData.certifications ? guardData.certifications.split(',').map(s => s.trim().toLowerCase().replace(/\s+/g, '_')) : [],
      image: guardData.profilePictureUrl,
      dataAiHint: "person security",
      bio: guardData.bio,
    };
    saveGuards([newGuard, ...guards]);
  };

  return (
    <GuardsContext.Provider value={{ guards, addGuard }}>
      {children}
    </GuardsContext.Provider>
  );
};

// Create a custom hook for using the context
export const useGuards = () => {
  const context = useContext(GuardsContext);
  if (context === undefined) {
    throw new Error('useGuards must be used within a GuardsProvider');
  }
  return context;
};
