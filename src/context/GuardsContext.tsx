
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';

const GUARDS_STORAGE_KEY = 'protecthire_guards';

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
  bio?: string;
  profilePictureUrl?: string;
}

// Mock data
const initialGuards: Guard[] = [
  {
    id: 'guard-1',
    name: 'Sanjay Verma',
    role: 'Security Guard',
    location: 'Mumbai, MH',
    hourlyRate: 450,
    dailyRate: 3500,
    rating: 4.8,
    experience: 5,
    skills: ['cpr', 'first_aid', 'crowd_control'],
    bio: 'Experienced security professional with over 5 years in corporate and event security.',
    profilePictureUrl: "https://placehold.co/300x200.png",
  },
  {
    id: 'guard-2',
    name: 'Amit Singh',
    role: 'Bouncer',
    location: 'Delhi, DL',
    hourlyRate: 600,
    dailyRate: 5000,
    rating: 4.9,
    experience: 8,
    skills: ['crowd_control', 'vip_protection'],
    bio: 'Highly skilled bouncer specializing in high-profile venues and events.',
    profilePictureUrl: "https://placehold.co/300x200.png",
  },
  {
    id: 'guard-3',
    name: 'Priya Sharma',
    role: 'Event Security',
    location: 'Bangalore, KA',
    hourlyRate: 500,
    dailyRate: 4000,
    rating: 4.7,
    experience: 4,
    skills: ['first_aid', 'crowd_control'],
    bio: 'Dedicated event security specialist, ensuring safe and orderly gatherings.',
     profilePictureUrl: "https://placehold.co/300x200.png",
  },
   {
    id: 'guard-4',
    name: 'Rajesh Kumar',
    role: 'Bodyguard',
    location: 'Mumbai, MH',
    dailyRate: 10000,
    rating: 5.0,
    experience: 12,
    skills: ['vip_protection', 'cpr'],
    bio: 'Discreet and highly trained personal protection officer for VIPs.',
     profilePictureUrl: "https://placehold.co/300x200.png",
  },
  {
    id: 'guard-5',
    name: 'Sunita Devi',
    role: 'Caretaker',
    location: 'Pune, MH',
    monthlyRate: 25000,
    rating: 4.6,
    experience: 6,
    skills: ['first_aid'],
    bio: 'Reliable and trustworthy caretaker for property and asset management.',
     profilePictureUrl: "https://placehold.co/300x200.png",
  },
];


// Define the context shape
interface GuardsContextType {
  guards: Guard[];
  isLoading: boolean;
  refetchGuards: () => void;
  addGuard: (guard: Guard) => void;
}

// Create the context
const GuardsContext = createContext<GuardsContextType | undefined>(undefined);

// Create the provider component
export const GuardsProvider = ({ children }: { children: ReactNode }) => {
  const [guards, setGuards] = useState<Guard[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchGuards = useCallback(() => {
    setIsLoading(true);
    if(typeof window !== 'undefined'){
        const storedGuards = localStorage.getItem(GUARDS_STORAGE_KEY);
        if (storedGuards) {
            setGuards(JSON.parse(storedGuards));
        } else {
            setGuards(initialGuards);
            localStorage.setItem(GUARDS_STORAGE_KEY, JSON.stringify(initialGuards));
        }
    }
    setIsLoading(false);
  }, []);

  const addGuard = (guard: Guard) => {
    const updatedGuards = [...guards, guard];
    setGuards(updatedGuards);
    if(typeof window !== 'undefined'){
      localStorage.setItem(GUARDS_STORAGE_KEY, JSON.stringify(updatedGuards));
    }
  };


  useEffect(() => {
    fetchGuards();
  }, [fetchGuards]);


  return (
    <GuardsContext.Provider value={{ guards, isLoading, refetchGuards: fetchGuards, addGuard }}>
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

