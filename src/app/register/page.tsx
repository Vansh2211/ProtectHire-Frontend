'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

// Preprocessing for optional number fields to handle empty strings
const emptyStringToUndefined = z.preprocess((val) => {
    if (typeof val === 'string' && val === '') return undefined;
    return val;
}, z.coerce.number().optional());

// Define Zod schema for validation
const formSchema = z.object({
  fullName: z.string().min(2, {
    message: 'Full name must be at least 2 characters.',
  }),
  email: z.string().email({ message: 'Invalid email address.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }).regex(/^\+?[0-9\s-]+$/, {message: "Invalid phone number format."}),
  experienceYears: z.coerce.number().min(0, { message: 'Experience must be a positive number.' }),
  hourlyRate: emptyStringToUndefined,
  dailyRate: emptyStringToUndefined,
  monthlyRate: emptyStringToUndefined,
  bio: z.string().max(500, { message: 'Bio must not exceed 500 characters.' }).optional(),
  certifications: z.string().optional(),
  location: z.string().min(2, { message: 'Location is required.' }),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions.',
  }),
}).refine(data => data.hourlyRate != null || data.dailyRate != null || data.monthlyRate != null, {
    message: "Please provide at least one rate (hourly, daily, or monthly).",
    path: ["hourlyRate"], // Attach error to the first rate field for display
});

type FormData = z.infer<typeof formSchema>;

export default function RegisterPage() {
  const { toast } = useToast();
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      experienceYears: 0,
      bio: '',
      certifications: '',
      location: '',
      agreeTerms: false,
    },
  });

  function onSubmit(values: FormData) {
    // TODO: Implement actual registration logic (e.g., API call)
    console.log(values);
    toast({
      title: 'Registration Submitted!',
      description: 'Your profile is being created. We will notify you upon approval.',
      variant: 'default',
    });
    // Optionally reset form or redirect
    // form.reset();
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card className="shadow-lg">
        <CardHeader className="text-center">
           <div className="mb-4 flex justify-center">
              <UserPlus className="h-12 w-12 text-primary" />
           </div>
          <CardTitle className="text-3xl font-bold">Register as a Guard</CardTitle>
          <CardDescription>
            Join GetSecure and start getting booked for security jobs. Fill out your profile below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+91 98765 43210" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

               <FormField
                control={form.control}
                name="experienceYears"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" placeholder="e.g., 5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <FormLabel>Rates (₹)</FormLabel>
                <FormDescription>
                    Provide at least one rate. All fields are optional.
                </FormDescription>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-2">
                    <FormField
                        control={form.control}
                        name="hourlyRate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-normal text-muted-foreground">Hourly</FormLabel>
                                <FormControl>
                                    <Input type="number" min="0" placeholder="e.g., 500" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="dailyRate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-normal text-muted-foreground">Daily</FormLabel>
                                <FormControl>
                                    <Input type="number" min="0" placeholder="e.g., 4000" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="monthlyRate"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-normal text-muted-foreground">Monthly</FormLabel>
                                <FormControl>
                                    <Input type="number" min="0" placeholder="e.g., 80000" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                 <FormMessage>
                    {form.formState.errors.hourlyRate?.message}
                </FormMessage>
              </div>


               <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Service Area / City</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Mumbai, MH" {...field} />
                    </FormControl>
                     <FormDescription>
                        The main location where you are available for work.
                     </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell clients about yourself, your skills, and experience (max 500 characters)"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

               <FormField
                control={form.control}
                name="certifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certifications (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., PSARA License, CPR Certified" {...field} />
                    </FormControl>
                     <FormDescription>
                        List any relevant certifications or licenses you hold.
                     </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* TODO: Add fields for availability, skills, profile picture */}

              <FormField
                control={form.control}
                name="agreeTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Agree to terms and conditions
                      </FormLabel>
                      <FormDescription>
                        You agree to our{' '}
                        <Link href="/terms" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                          Privacy Policy
                        </Link>
                        .
                      </FormDescription>
                       <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-accent hover:bg-accent/90" size="lg">
                <ShieldCheck className="mr-2 h-5 w-5" />
                Register Profile
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
