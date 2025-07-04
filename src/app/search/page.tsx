'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { MapPin, Star, ShieldCheck, Search as SearchIcon, SlidersHorizontal } from 'lucide-react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { getCurrentLocation, type Location } from '@/services/geolocation'; 
import { useGuards, type Guard } from '@/context/GuardsContext';
import Link from 'next/link';


// Define types
interface Filters {
  location: string;
  maxRate: number;
  minRating: number;
  minExperience: number;
  skills: string[];
}

export default function SearchPage() {
  const { guards } = useGuards();
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
    getCurrentLocation()
      .then(location => {
        setUserLocation(location);
        console.log("User location:", location);
      })
      .catch(error => {
        console.error("Error getting location:", error);
      });

    // Simulate loading, data comes from context
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  // Apply filters whenever filters or guards from context change
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
                       <CardHeader className="p-0 h-48">
                          <Skeleton className="h-full w-full" />
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
                  <CardHeader className="p-0 relative h-48">
                    <Image
                      src={guard.image}
                      alt={`Profile of ${guard.name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
                    <Button asChild className="w-full bg-accent hover:bg-accent/90">
                      <Link href={`/guard/${guard.id}`}>
                        View Profile & Book
                      </Link>
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
