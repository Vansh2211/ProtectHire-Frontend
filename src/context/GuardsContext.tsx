'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the Guard type
export interface Guard {
  id: string;
  name: string;
  location: string;
  hourlyRate?: number;
  dailyRate?: number;
  monthlyRate?: number;
  rating: number;
  experience: number;
  skills: string[];
  image: string;
  dataAiHint: string;
}

// This is the data structure from the registration form
export interface NewGuardData {
  fullName: string;
  experienceYears: number;
  location: string;
  certifications?: string;
  hourlyRate?: number;
  dailyRate?: number;
  monthlyRate?: number;
}


// Mock data for initial guards
const mockGuards: Guard[] = [
  { id: '1', name: 'Aarav Sharma', location: 'Mumbai, MH', hourlyRate: 500, dailyRate: 3500, rating: 4.8, experience: 5, skills: ['cpr', 'first_aid'], image: 'https://placehold.co/300x200.png', dataAiHint: "person portrait" },
  { id: '2', name: 'Priya Patel', location: 'Delhi, DL', hourlyRate: 450, monthlyRate: 90000, rating: 4.5, experience: 3, skills: ['crowd_control'], image: 'https://placehold.co/300x200.png', dataAiHint: "security guard" },
  { id: '3', name: 'Vikram Singh', location: 'Bangalore, KA', dailyRate: 4000, monthlyRate: 100000, rating: 4.9, experience: 8, skills: ['cpr', 'first_aid', 'crowd_control'], image: 'https://placehold.co/300x200.png', dataAiHint: "bouncer professional" },
  { id: '4', name: 'Ananya Gupta', location: 'Mumbai, MH', hourlyRate: 550, rating: 4.6, experience: 4, skills: ['first_aid'], image: 'https://placehold.co/300x200.png', dataAiHint: "woman security" },
  { id: '5', name: 'Rohan Joshi', location: 'Pune, MH', hourlyRate: 480, dailyRate: 3800, rating: 4.7, experience: 6, skills: ['crowd_control', 'vip_protection'], image: 'https://placehold.co/300x200.png', dataAiHint: "man security" },
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
  const [guards, setGuards] = useState<Guard[]>(mockGuards);

  const addGuard = (guardData: NewGuardData) => {
    const newGuard: Guard = {
      id: new Date().getTime().toString(), // Simple unique ID
      name: guardData.fullName,
      location: guardData.location,
      hourlyRate: guardData.hourlyRate,
      dailyRate: guardData.dailyRate,
      monthlyRate: guardData.monthlyRate,
      rating: +(4.0 + Math.random()).toFixed(1), // Random rating between 4.0 and 5.0
      experience: guardData.experienceYears,
      skills: guardData.certifications ? guardData.certifications.split(',').map(s => s.trim().toLowerCase().replace(/\s+/g, '_')) : [],
      image: `https://placehold.co/300x200.png`,
      dataAiHint: "person security",
    };
    setGuards(prevGuards => [...prevGuards, newGuard]);
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
