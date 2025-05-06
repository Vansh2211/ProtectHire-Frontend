import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck, Search, UserPlus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-primary to-blue-800 py-20 text-primary-foreground md:py-32">
        <div className="container mx-auto flex flex-col items-center px-4 text-center">
          <ShieldCheck className="mb-4 h-16 w-16" />
          <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            SecureHire
          </h1>
          <p className="mb-8 max-w-2xl text-lg text-blue-100 md:text-xl">
            Your trusted platform for finding and hiring professional security
            guards and bouncers. Fast, reliable, and secure.
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Button asChild size="lg" variant="secondary" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/search">
                <Search className="mr-2 h-5 w-5" /> Find a Guard
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-accent text-accent-foreground bg-primary hover:bg-accent hover:text-accent-foreground hover:border-transparent">
               <Link href="/register">
                <UserPlus className="mr-2 h-5 w-5" /> Register as Guard
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="text-center shadow-md">
              <CardHeader>
                <div className="mb-4 flex justify-center">
                  <UserPlus className="h-12 w-12 text-primary" />
                </div>
                <CardTitle>1. Guards Register</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Security professionals create detailed profiles showcasing
                  their experience and skills.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-md">
              <CardHeader>
                <div className="mb-4 flex justify-center">
                  <Search className="h-12 w-12 text-primary" />
                </div>
                <CardTitle>2. Clients Search</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Clients easily search for guards based on location,
                  availability, and specific needs.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-md">
              <CardHeader>
                <div className="mb-4 flex justify-center">
                   <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary h-12 w-12"><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/><path d="M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5l-4 4z"/></svg>
                </div>
                <CardTitle>3. Book & Communicate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect directly, discuss details, and securely book the
                  right guard for your needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Key Features
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start space-x-4">
              <ShieldCheck className="mt-1 h-6 w-6 flex-shrink-0 text-accent" />
              <div>
                <h3 className="mb-1 text-lg font-semibold">Verified Guards</h3>
                <p className="text-muted-foreground">
                  Profiles include experience, certifications, and ratings for
                  trustworthy hires.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 h-6 w-6 flex-shrink-0 text-accent"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <div>
                <h3 className="mb-1 text-lg font-semibold">Location Based Search</h3>
                <p className="text-muted-foreground">
                  Find guards available in your specific area quickly and
                  efficiently.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 h-6 w-6 flex-shrink-0 text-accent"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
              <div>
                <h3 className="mb-1 text-lg font-semibold">Easy Booking</h3>
                <p className="text-muted-foreground">
                  Streamlined booking process with clear communication
                  channels.
                </p>
              </div>
            </div>
             <div className="flex items-start space-x-4">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 h-6 w-6 flex-shrink-0 text-accent"><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/><path d="M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5l-4 4z"/></svg>
              <div>
                <h3 className="mb-1 text-lg font-semibold">Direct Communication</h3>
                <p className="text-muted-foreground">
                  Chat directly with guards to discuss requirements before confirming.
                </p>
              </div>
            </div>
             <div className="flex items-start space-x-4">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 h-6 w-6 flex-shrink-0 text-accent"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l3-3.07"/></svg>
              <div>
                <h3 className="mb-1 text-lg font-semibold">Secure Payments</h3>
                <p className="text-muted-foreground">
                  Handle payments securely through the platform (future feature).
                </p>
              </div>
            </div>
             <div className="flex items-start space-x-4">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1 h-6 w-6 flex-shrink-0 text-accent"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10z"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="M18 19a2 2 0 0 0 2-2v-1.5"/><path d="m6 19-2-2"/></svg>
              <div>
                <h3 className="mb-1 text-lg font-semibold">Notifications</h3>
                <p className="text-muted-foreground">
                  Stay updated with real-time push notifications for requests and confirmations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Call to Action Section */}
      <section className="w-full py-16 md:py-24">
         <div className="container mx-auto flex flex-col items-center px-4 text-center">
             <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Ready to get started?</h2>
             <p className="mb-8 max-w-xl text-lg text-muted-foreground">
                Whether you need security or you are security, SecureHire connects you.
             </p>
             <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                 <Button asChild size="lg" className="bg-accent hover:bg-accent/90">
                     <Link href="/search">
                         <Search className="mr-2 h-5 w-5" /> Find a Guard Now
                     </Link>
                 </Button>
                 <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      <Link href="/register">
                         <UserPlus className="mr-2 h-5 w-5" /> Join as a Guard
                     </Link>
                 </Button>
             </div>
         </div>
      </section>

    </div>
  );
}
