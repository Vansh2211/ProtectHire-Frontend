'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { MapPin, Star, ShieldCheck, Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { getCurrentLocation, type Location } from '@/services/geolocation'; // Assuming you have this service

// Mock data for guards - replace with actual API fetch
const mockGuards = [
  { id: '1', name: 'Aarav Sharma', location: 'Mumbai, MH', hourlyRate: 500, dailyRate: 3500, rating: 4.8, experience: 5, skills: ['cpr', 'first_aid'], image: 'https://picsum.photos/200/200?random=1', dataAiHint: "person portrait" },
  { id: '2', name: 'Priya Patel', location: 'Delhi, DL', hourlyRate: 450, monthlyRate: 90000, rating: 4.5, experience: 3, skills: ['crowd_control'], image: 'https://picsum.photos/200/200?random=2', dataAiHint: "security guard" },
  { id: '3', name: 'Vikram Singh', location: 'Bangalore, KA', dailyRate: 4000, monthlyRate: 100000, rating: 4.9, experience: 8, skills: ['cpr', 'first_aid', 'crowd_control'], image: 'https://picsum.photos/200/200?random=3', dataAiHint: "bouncer professional" },
  { id: '4', name: 'Ananya Gupta', location: 'Mumbai, MH', hourlyRate: 550, rating: 4.6, experience: 4, skills: ['first_aid'], image: 'https://picsum.photos/200/200?random=4', dataAiHint: "woman security" },
  { id: '5', name: 'Rohan Joshi', location: 'Pune, MH', hourlyRate: 480, dailyRate: 3800, rating: 4.7, experience: 6, skills: ['crowd_control', 'vip_protection'], image: 'https://picsum.photos/200/200?random=5', dataAiHint: "man security" },
];

// Define types
interface Guard {
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

interface Filters {
  location: string;
  maxRate: number;
  minRating: number;
  minExperience: number;
  skills: string[];
}

export default function SearchPage() {
  const [guards, setGuards] = useState<Guard[]>([]);
  const [filteredGuards, setFilteredGuards] = useState<Guard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    location: '',
    maxRate: 1000, // Default max hourly rate in INR
    minRating: 0,
    minExperience: 0,
    skills: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  useEffect(() => {
    // Fetch user's current location
    getCurrentLocation()
      .then(location => {
        setUserLocation(location);
        console.log("User location:", location);
      })
      .catch(error => {
        console.error("Error getting location:", error);
      });

    // Simulate fetching guards data
    const timer = setTimeout(() => {
      setGuards(mockGuards);
      setFilteredGuards(mockGuards); // Initially show all guards
      setIsLoading(false);
    }, 1500); // Simulate network delay

    return () => clearTimeout(timer);
  }, []);

  // Apply filters whenever filters or guards change
   useEffect(() => {
    if (!isLoading) {
      let result = guards;

      // Location Filter (simple string contains for now)
      if (filters.location.trim() !== '') {
        result = result.filter(guard =>
          guard.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }

      // Max Rate Filter (applies only to hourly rate)
      result = result.filter(guard => guard.hourlyRate === undefined || guard.hourlyRate <= filters.maxRate);

      // Min Rating Filter
      result = result.filter(guard => guard.rating >= filters.minRating);

       // Min Experience Filter
      result = result.filter(guard => guard.experience >= filters.minExperience);


      // Skills Filter
      if (filters.skills.length > 0) {
        result = result.filter(guard =>
          filters.skills.every(skill => guard.skills.includes(skill))
        );
      }

      setFilteredGuards(result);
    }
  }, [filters, guards, isLoading]);

  const handleFilterChange = (key: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

   const handleSkillChange = (skill: string, checked: boolean | string) => {
     const isChecked = typeof checked === 'boolean' ? checked : checked === 'indeterminate' ? false : true; // Handle CheckboxState
     setFilters(prev => ({
       ...prev,
       skills: isChecked
         ? [...prev.skills, skill]
         : prev.skills.filter(s => s !== skill),
     }));
   };

  const availableSkills = ['cpr', 'first_aid', 'crowd_control', 'vip_protection']; // Example skills

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Find Security Guards</h1>

      {/* Search Bar and Filter Toggle */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-grow relative">
           <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
           <Input
            type="text"
            placeholder="Search by location (e.g., Mumbai, MH)"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
           />
        </div>

        <Button onClick={() => setShowFilters(!showFilters)} variant="outline">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>


      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar (conditionally rendered) */}
        {showFilters && (
            <Card className="w-full lg:w-1/4 lg:sticky lg:top-20 h-fit shadow-md">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Max Hourly Rate Filter */}
                 <div>
                    <Label htmlFor="maxRate" className="mb-2 block">Max Hourly Rate: ₹{filters.maxRate}</Label>
                    <Slider
                        id="maxRate"
                        min={200}
                        max={2000}
                        step={50}
                        value={[filters.maxRate]}
                        onValueChange={(value) => handleFilterChange('maxRate', value[0])}
                        className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4" // Smaller thumb
                    />
                 </div>

                {/* Min Rating Filter */}
                 <div>
                    <Label htmlFor="minRating" className="mb-2 block">Minimum Rating: {filters.minRating.toFixed(1)} ★</Label>
                     <Slider
                        id="minRating"
                        min={0}
                        max={5}
                        step={0.1}
                        value={[filters.minRating]}
                        onValueChange={(value) => handleFilterChange('minRating', value[0])}
                        className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4" // Smaller thumb
                    />
                 </div>

                 {/* Min Experience Filter */}
                 <div>
                    <Label htmlFor="minExperience" className="mb-2 block">Minimum Experience: {filters.minExperience} years</Label>
                     <Slider
                        id="minExperience"
                        min={0}
                        max={20}
                        step={1}
                        value={[filters.minExperience]}
                        onValueChange={(value) => handleFilterChange('minExperience', value[0])}
                        className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4" // Smaller thumb
                    />
                 </div>

                  <Separator />

                {/* Skills Filter */}
                <div>
                  <Label className="mb-2 block font-medium">Required Skills</Label>
                  <div className="space-y-2">
                    {availableSkills.map(skill => (
                      <div key={skill} className="flex items-center space-x-2">
                        <Checkbox
                          id={`skill-${skill}`}
                          checked={filters.skills.includes(skill)}
                          onCheckedChange={(checked) => handleSkillChange(skill, checked)}
                        />
                        <Label htmlFor={`skill-${skill}`} className="text-sm font-normal capitalize">
                           {skill.replace('_', ' ')}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                 {/* TODO: Add Availability Filter (Date Picker) */}

              </CardContent>
              <CardFooter>
                  <Button onClick={() => setFilters({ location: '', maxRate: 1000, minRating: 0, minExperience: 0, skills: [] })} variant="outline" className="w-full">
                    Reset Filters
                  </Button>
              </CardFooter>
            </Card>
        )}

        {/* Guard Results */}
        <div className={`flex-grow ${showFilters ? 'lg:w-3/4' : 'w-full'}`}>
           {isLoading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                       <CardHeader className="p-0">
                          <Skeleton className="h-48 w-full" />
                       </CardHeader>
                       <CardContent className="p-4 space-y-2">
                          <Skeleton className="h-6 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                          <Skeleton className="h-4 w-1/3" />
                       </CardContent>
                        <CardFooter className="p-4">
                            <Skeleton className="h-10 w-full" />
                        </CardFooter>
                    </Card>
                ))}
             </div>
          ) : filteredGuards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGuards.map(guard => (
                <Card key={guard.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col">
                  <CardHeader className="p-0 relative">
                    <Image
                      src={guard.image}
                      alt={`Profile of ${guard.name}`}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                      data-ai-hint={guard.dataAiHint}
                    />
                     <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center">
                       <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                       {guard.rating.toFixed(1)}
                     </div>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                    <CardTitle className="text-xl mb-1">{guard.name}</CardTitle>
                    <CardDescription className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4 mr-1" /> {guard.location}
                    </CardDescription>
                     <div className="text-sm text-muted-foreground mb-3 space-y-1">
                       <p>Experience: {guard.experience} years</p>
                       <div>
                         <p className="font-medium text-foreground">Rates:</p>
                         {guard.hourlyRate && <p className="pl-2">₹{guard.hourlyRate}/hr</p>}
                         {guard.dailyRate && <p className="pl-2">₹{guard.dailyRate}/day</p>}
                         {guard.monthlyRate && <p className="pl-2">₹{guard.monthlyRate}/month</p>}
                         {!guard.hourlyRate && !guard.dailyRate && !guard.monthlyRate && <p className="pl-2">Contact for rates</p>}
                       </div>
                    </div>
                     <div className="flex flex-wrap gap-1">
                        {guard.skills.map(skill => (
                            <span key={skill} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full capitalize">
                                {skill.replace('_', ' ')}
                            </span>
                        ))}
                     </div>
                  </CardContent>
                  <CardFooter className="p-4 border-t">
                     {/* TODO: Link to Guard Profile/Booking page */}
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      View Profile & Book
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
               <ShieldCheck className="mx-auto h-12 w-12 mb-4" />
               <p className="text-lg font-semibold">No Guards Found</p>
               <p>Try adjusting your search filters or broadening your location.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
