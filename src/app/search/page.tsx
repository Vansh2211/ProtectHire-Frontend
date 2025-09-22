
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Star, ShieldCheck, Search as SearchIcon, SlidersHorizontal, Briefcase, RadioGroup } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useGuards, type Guard } from '@/context/GuardsContext';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { ProtectHireLogo } from '@/components/ProtectHireLogo';
import { RadioGroupItem } from '@/components/ui/radio-group';


// Define types
interface Filters {
  location: string;
  role: string;
  maxRate: number;
  minRating: number;
  minExperience: number;
  skills: string[];
  gender: 'any' | 'male' | 'female';
}

const availableRoles = ["All Roles", "Security Guard", "Bouncer", "Event Security", "Bodyguard", "Caretaker"];
const availableSkills = ['cpr', 'first_aid', 'crowd_control', 'vip_protection']; // Example skills

export default function SearchPage() {
  const { guards, isLoading } = useGuards();
  const searchParams = useSearchParams();
  const [filteredGuards, setFilteredGuards] = useState<Guard[]>([]);
  const [filters, setFilters] = useState<Filters>({
    location: '',
    role: 'All Roles',
    maxRate: 2000, // Default max hourly rate in INR
    minRating: 0,
    minExperience: 0,
    skills: [],
    gender: 'any',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const genderQueryParam = searchParams.get('gender');
    if (genderQueryParam === 'female' || genderQueryParam === 'male') {
      handleFilterChange('gender', genderQueryParam);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

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
      
      // Role filter
      if (filters.role !== 'All Roles') {
        result = result.filter(guard => guard.role === filters.role);
      }

      // Max Rate Filter (applies only to hourly rate)
      result = result.filter(guard => guard.hourlyRate === undefined || guard.hourlyRate <= filters.maxRate);

      // Min Rating Filter
      result = result.filter(guard => guard.rating >= filters.minRating);

       // Min Experience Filter
      result = result.filter(guard => guard.experience >= filters.minExperience);

      // Gender Filter
      if (filters.gender !== 'any') {
        result = result.filter(guard => guard.gender === filters.gender);
      }

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
  
  const handleRoleChange = (value: string) => {
      handleFilterChange('role', value);
  }

   const handleSkillChange = (skill: string, checked: boolean | string) => {
     const isChecked = typeof checked === 'boolean' ? checked : checked === 'indeterminate' ? false : true; // Handle CheckboxState
     setFilters(prev => ({
       ...prev,
       skills: isChecked
         ? [...prev.skills, skill]
         : prev.skills.filter(s => s !== skill),
     }));
   };

  const resetFilters = () => {
    setFilters({
      location: '',
      role: 'All Roles',
      maxRate: 2000,
      minRating: 0,
      minExperience: 0,
      skills: [],
      gender: 'any',
    })
  }


  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Find Security Professionals</h1>

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

        <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="lg:hidden">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>


      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar (conditionally rendered) */}
        <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <Card className="w-full lg:w-72 lg:sticky lg:top-24 h-fit shadow-md">
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                 {/* Role Filter */}
                <div>
                  <Label htmlFor="role-filter" className="mb-2 block">Role</Label>
                  <Select value={filters.role} onValueChange={handleRoleChange}>
                    <SelectTrigger id="role-filter" className="w-full">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableRoles.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                 {/* Gender Filter */}
                 <div>
                    <Label className="mb-2 block">Gender</Label>
                    <RadioGroup
                        value={filters.gender}
                        onValueChange={(value) => handleFilterChange('gender', value)}
                        className="flex space-x-4"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="any" id="gender-any" />
                            <Label htmlFor="gender-any">Any</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="female" id="gender-female" />
                            <Label htmlFor="gender-female">Female</Label>
                        </div>
                         <div className="flex items-center space-x-2">
                            <RadioGroupItem value="male" id="gender-male" />
                            <Label htmlFor="gender-male">Male</Label>
                        </div>
                    </RadioGroup>
                 </div>

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

              </CardContent>
              <CardFooter>
                  <Button onClick={resetFilters} variant="outline" className="w-full">
                    Reset Filters
                  </Button>
              </CardFooter>
            </Card>
        </div>

        {/* Guard Results */}
        <div className="flex-grow">
           {isLoading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                    <Card key={i} className="overflow-hidden">
                       <Skeleton className="h-48 w-full" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredGuards.map(guard => (
                <Card key={guard.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col">
                  <CardHeader className="p-0 relative h-48 bg-muted">
                    <div className="flex h-full items-center justify-center">
                        <ProtectHireLogo className="h-24 w-24 text-muted-foreground" />
                    </div>
                     <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center">
                       <Star className="w-3 h-3 mr-1 fill-yellow-400 text-yellow-400" />
                       {guard.rating.toFixed(1)}
                     </div>
                      <Badge variant="default" className="absolute top-2 left-2 bg-accent text-accent-foreground">{guard.role}</Badge>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                    <CardTitle className="text-xl mb-1">{guard.name}</CardTitle>
                    <CardDescription className="flex items-center text-sm text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4 mr-1" /> {guard.location}
                    </CardDescription>
                     <div className="text-sm text-muted-foreground mb-3 space-y-1">
                       <p className="flex items-center"><Briefcase className="w-4 h-4 mr-2" /> {guard.experience} years experience</p>
                       <div>
                         {guard.hourlyRate && <p className="pl-2">₹{guard.hourlyRate}/hr</p>}
                       </div>
                    </div>
                     <div className="flex flex-wrap gap-1 h-12 overflow-hidden">
                        {guard.skills.slice(0, 3).map(skill => (
                            <span key={skill} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full capitalize">
                                {skill.replace('_', ' ')}
                            </span>
                        ))}
                         {guard.skills.length > 3 && <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">...</span>}
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
            <div className="text-center py-16 text-muted-foreground col-span-full">
               <ShieldCheck className="mx-auto h-12 w-12 mb-4" />
               <p className="text-lg font-semibold">No Professionals Found</p>
               <p>Try adjusting your search filters or broadening your location.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
