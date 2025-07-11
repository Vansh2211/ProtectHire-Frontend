
'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGuards } from '@/context/GuardsContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { ArrowLeft, MapPin, Star, Briefcase, DollarSign, Calendar, MessageSquare } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function GuardProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { guards } = useGuards();
  const guardId = params.id as string;

  const guard = guards.find(g => g.id === guardId);

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

  return (
    <div className="bg-secondary">
        <div className="container mx-auto max-w-4xl py-8 px-4">
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Results
            </Button>
            <Card className="overflow-hidden shadow-lg">
                <CardHeader className="p-0">
                     <div className="relative h-64 w-full">
                        <Image
                            src={guard.image}
                            alt={`Profile of ${guard.name}`}
                            fill
                            sizes="(max-width: 1024px) 100vw, 1024px"
                            className="object-cover bg-muted"
                            data-ai-hint={guard.dataAiHint}
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                         <div className="absolute bottom-0 left-0 p-6">
                            <h1 className="text-4xl font-bold text-white">{guard.name}</h1>
                            <div className="flex items-center text-lg text-gray-200 mt-1">
                                <MapPin className="w-5 h-5 mr-2" />
                                {guard.location}
                            </div>
                         </div>
                     </div>
                </CardHeader>
                <CardContent className="p-6 grid md:grid-cols-3 gap-6">
                    {/* Left Column for Details */}
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">About Me</h3>
                            <p className="text-muted-foreground">
                                {guard.bio || 'No bio provided. A seasoned security professional with a commitment to safety and excellence.'}
                            </p>
                        </div>
                         <Separator />
                        <div>
                            <h3 className="text-xl font-semibold mb-3">Skills & Certifications</h3>
                            {guard.skills && guard.skills.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                    {guard.skills.map(skill => (
                                        <Badge key={skill} variant="secondary" className="capitalize text-sm">
                                            {skill.replace(/_/g, ' ')}
                                        </Badge>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">No specific skills listed.</p>
                            )}
                        </div>
                    </div>
                    {/* Right Column for Stats and Booking */}
                    <div className="space-y-4 md:border-l md:pl-6">
                         <div className="flex items-center text-lg">
                            <Star className="w-6 h-6 mr-3 text-yellow-400 fill-yellow-400" />
                            <div>
                                <p className="font-bold">{guard.rating.toFixed(1)} <span className="text-sm font-normal text-muted-foreground">/ 5.0</span></p>
                                <p className="text-xs text-muted-foreground">Rating</p>
                            </div>
                        </div>
                        <div className="flex items-center text-lg">
                            <Briefcase className="w-6 h-6 mr-3 text-primary" />
                             <div>
                                <p className="font-bold">{guard.experience} years</p>
                                <p className="text-xs text-muted-foreground">Experience</p>
                            </div>
                        </div>
                         <Separator />
                         <div>
                            <h4 className="font-semibold mb-2 text-primary flex items-center"><DollarSign className="w-5 h-5 mr-2"/> Rates</h4>
                            <div className="space-y-1 text-muted-foreground">
                                {guard.hourlyRate && <p><strong>Hourly:</strong> ₹{guard.hourlyRate}</p>}
                                {guard.dailyRate && <p><strong>Daily:</strong> ₹{guard.dailyRate}</p>}
                                {guard.monthlyRate && <p><strong>Monthly:</strong> ₹{guard.monthlyRate}</p>}
                                {!guard.hourlyRate && !guard.dailyRate && !guard.monthlyRate && <p>Contact for rates</p>}
                            </div>
                         </div>
                        <Separator />
                         <div className="pt-2 space-y-2">
                            <Button size="lg" className="w-full bg-accent hover:bg-accent/90" asChild>
                                <Link href={`/book/${guard.id}`}>
                                    <Calendar className="mr-2 h-5 w-5" /> Book Now
                                </Link>
                            </Button>
                             <Button size="lg" className="w-full" variant="outline">
                                <MessageSquare className="mr-2 h-5 w-5" /> Message
                            </Button>
                         </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}

    