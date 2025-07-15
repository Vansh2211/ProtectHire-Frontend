
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGuards } from '@/context/GuardsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useToast } from '@/hooks/use-toast';
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { useAuth } from '@/context/AuthContext';
import {
  ArrowLeft,
  Calendar as CalendarIcon,
  User,
  MapPin,
  Clock,
  CreditCard,
  AlertCircle,
  Send,
  Loader2,
} from 'lucide-react';
import Image from 'next/image';
import { ProtectHireLogo } from '@/components/ProtectHireLogo';

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { guards } = useGuards();
  const guardId = params.id as string;
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const guard = guards.find(g => g.id === guardId);

  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [address, setAddress] = useState('');
  const [instructions, setInstructions] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);


  const bookingCost = useMemo(() => {
    if (!guard || !dateRange?.from || !dateRange?.to) return 0;

    let totalHours = 0;
    const from = new Date(dateRange.from);
    const to = new Date(dateRange.to);

    // Calculate number of days
    const diffTime = Math.abs(to.getTime() - from.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // Calculate hours per day
    const start = new Date(`1970-01-01T${startTime}:00`);
    const end = new Date(`1970-01-01T${endTime}:00`);
    let hoursPerDay = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    if(hoursPerDay < 0) hoursPerDay = 24 + hoursPerDay;


    totalHours = diffDays * hoursPerDay;
    
    // Use daily rate if booking is for a full day (8 hours or more) and it's cheaper
    if (guard.dailyRate && hoursPerDay >= 8 && guard.dailyRate < (guard.hourlyRate || Infinity) * hoursPerDay) {
        return guard.dailyRate * diffDays;
    }
    
    // Otherwise use hourly rate
    if(guard.hourlyRate) {
        return totalHours * guard.hourlyRate;
    }

    // Fallback if no hourly rate
    return guard.dailyRate ? guard.dailyRate * diffDays : 0;

  }, [dateRange, startTime, endTime, guard]);

  if (isLoading || !user) {
    // Render a loading state or nothing while checking auth
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }

  if (!guard) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold">Guard Not Found</h1>
        <p className="text-muted-foreground">The profile you are looking for does not exist.</p>
        <Button onClick={() => router.push('/search')} className="mt-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Search
        </Button>
      </div>
    );
  }
  
  const handleRequestSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if(!dateRange?.from || !address) {
          toast({
              title: "Missing Information",
              description: "Please select a date and provide the service address.",
              variant: "destructive",
          })
          return;
      }

      setIsSubmitting(true);
      // Simulate API call to send request
      setTimeout(() => {
        setIsSubmitting(false);
        toast({
            title: "Booking Request Sent!",
            description: `Your request has been sent to ${guard.name}. You will be notified upon their approval.`
        });
        router.push('/search'); // Redirect to search or a confirmation page
      }, 2000);
  }

  return (
    <div className="bg-secondary">
      <div className="container mx-auto max-w-4xl py-8 px-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
        </Button>
        <h1 className="text-3xl font-bold mb-6">Request to Book Security Service</h1>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Booking Details</CardTitle>
                    <CardDescription>Fill in the details to send a booking request to the guard.</CardDescription>
                </CardHeader>
                <form onSubmit={handleRequestSubmit}>
                    <CardContent className="space-y-6">
                        {/* Date and Time */}
                        <div className="space-y-2">
                            <Label>Service Dates</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className="w-full justify-start text-left font-normal"
                                    >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {dateRange?.from ? (
                                        dateRange.to ? (
                                        <>
                                            {format(dateRange.from, "LLL dd, y")} -{" "}
                                            {format(dateRange.to, "LLL dd, y")}
                                        </>
                                        ) : (
                                        format(dateRange.from, "LLL dd, y")
                                        )
                                    ) : (
                                        <span>Pick a date range</span>
                                    )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                    mode="range"
                                    defaultMonth={new Date()}
                                    selected={dateRange}
                                    onSelect={setDateRange}
                                    numberOfMonths={2}
                                    disabled={{ before: new Date() }}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="start-time">Start Time</Label>
                                <Input id="start-time" type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="end-time">End Time</Label>
                                <Input id="end-time" type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
                            </div>
                        </div>
                        {/* Address */}
                        <div className="space-y-2">
                           <Label htmlFor="address">Service Address</Label>
                           <Input id="address" placeholder="e.g., 123 Main St, Mumbai, MH" value={address} onChange={e => setAddress(e.target.value)} required/>
                        </div>
                        {/* Instructions */}
                         <div className="space-y-2">
                           <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                           <Textarea id="instructions" placeholder="e.g., 'Guard should monitor the main entrance.' Add a message for the guard here." value={instructions} onChange={e => setInstructions(e.target.value)}/>
                        </div>
                        
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending Request...' : 'Send Booking Request'}
                            <Send className="ml-2 h-4 w-4"/>
                        </Button>
                    </CardFooter>
                </form>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6 lg:sticky lg:top-24 h-fit">
            <Card className="shadow-md">
                <CardHeader className="flex flex-row items-center gap-4">
                   <div className="relative h-16 w-16 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                       <ProtectHireLogo className="h-10 w-10 text-muted-foreground" />
                   </div>
                    <div>
                        <CardTitle className="text-xl">{guard.name}</CardTitle>
                        <p className="text-muted-foreground flex items-center text-sm mt-1"><MapPin className="w-4 h-4 mr-1"/> {guard.location}</p>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Separator/>
                    <h4 className="font-semibold">Estimated Cost</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex justify-between">
                            <span>Guard Rate</span>
                            <span className="font-medium text-foreground">
                                {guard.hourlyRate ? `₹${guard.hourlyRate}/hr` : `₹${guard.dailyRate}/day`}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>Selected Dates</span>
                            <span className="font-medium text-foreground text-right">
                                {dateRange?.from ? `${format(dateRange.from, 'MMM d')} - ${dateRange.to ? format(dateRange.to, 'MMM d') : ''}`: 'Not selected'}
                            </span>
                        </div>
                         <div className="flex justify-between">
                            <span>Service Hours</span>
                            <span className="font-medium text-foreground">{startTime} - {endTime}</span>
                        </div>
                    </div>
                    <Separator/>
                     <div className="flex justify-between items-center text-lg">
                        <span className="font-semibold">Estimated Total</span>
                        <span className="font-bold text-primary">₹{bookingCost.toLocaleString()}</span>
                    </div>
                </CardContent>
            </Card>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>This is a Booking Request</AlertTitle>
              <AlertDescription>
                The guard must approve your request before the booking is confirmed. Payment will be processed after confirmation.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </div>
    </div>
  );
}
