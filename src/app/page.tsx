
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, UserPlus, Building2, Handshake, ClipboardList, ShieldQuestion, Briefcase, HeartHandshake } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProtectHireLogo } from "@/components/ProtectHireLogo";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 py-20 text-primary-foreground md:py-32">
        <div className="container mx-auto flex flex-col items-center px-4 text-center">
          <ProtectHireLogo className="mb-4 h-16 w-16 text-accent" />
          <h1 className="mb-2 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            ProtectHire
          </h1>
          <p className="mb-4 text-xl font-medium text-slate-300">Your Safety, Our Priority</p>
          <p className="mb-8 max-w-3xl text-lg text-slate-200 md:text-xl">
            Your trusted platform for hiring professional security guards and for guards to find their next job.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/search">
                <Search className="mr-2 h-5 w-5" /> Find a Guard
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-accent text-accent bg-transparent hover:bg-accent hover:text-accent-foreground">
               <Link href="/register">
                <UserPlus className="mr-2 h-5 w-5" /> Join the Platform
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="w-full py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            How It Works
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <Card className="text-center shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <div className="mb-4 flex justify-center">
                  <ClipboardList className="h-12 w-12 text-primary" />
                </div>
                <CardTitle>1. Create a Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Security professionals and companies create detailed profiles to showcase skills or post jobs.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <div className="mb-4 flex justify-center">
                  <Search className="h-12 w-12 text-primary" />
                </div>
                <CardTitle>2. Search & Apply</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Clients find guards based on needs. Guards search and apply for jobs from top companies.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <div className="mb-4 flex justify-center">
                   <Handshake className="text-primary h-12 w-12"/>
                </div>
                <CardTitle>3. Hire & Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Connect directly, discuss details, and securely book guards or schedule interviews.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="container mx-auto grid gap-12 px-4 md:grid-cols-2 lg:grid-cols-3">
           <div className="flex items-start gap-4">
             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
             </div>
             <div>
                <h3 className="text-lg font-semibold">Verified Professionals</h3>
                <p className="text-muted-foreground">Profiles include experience, certifications, and ratings for trustworthy hires.</p>
             </div>
           </div>
           <div className="flex items-start gap-4">
             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
             </div>
             <div>
                <h3 className="text-lg font-semibold">Location-Based Search</h3>
                <p className="text-muted-foreground">Find guards or jobs available in your specific area quickly and efficiently.</p>
             </div>
           </div>
           <div className="flex items-start gap-4">
             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
             </div>
             <div>
                <h3 className="text-lg font-semibold">Easy Booking & Applying</h3>
                <p className="text-muted-foreground">Streamlined booking process with clear communication channels.</p>
             </div>
           </div>
           <div className="flex items-start gap-4">
             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/><path d="M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5l-4 4z"/></svg>
             </div>
             <div>
                <h3 className="text-lg font-semibold">Direct Communication</h3>
                <p className="text-muted-foreground">Chat directly with guards or companies to discuss requirements.</p>
             </div>
           </div>
           <div className="flex items-start gap-4">
             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l3-3.07"/></svg>
             </div>
             <div>
                <h3 className="text-lg font-semibold">Secure Payments</h3>
                <p className="text-muted-foreground">Handle payments securely through the platform (future feature).</p>
             </div>
           </div>
           <div className="flex items-start gap-4">
             <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0_0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10z"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/><path d="M18 19a2 2 0 0 0 2-2v-1.5"/><path d="m6 19-2-2"/></svg>
             </div>
             <div>
                <h3 className="text-lg font-semibold">Notifications</h3>
                <p className="text-muted-foreground">Stay updated with real-time push notifications for requests and confirmations.</p>
             </div>
           </div>
        </div>
      </section>

      {/* SheShield Section */}
      <section className="w-full bg-pink-500/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="mb-4 flex items-center gap-3">
                  <HeartHandshake className="h-8 w-8 text-pink-500" />
                  <h2 className="text-3xl font-bold tracking-tight md:text-4xl">SheShield</h2>
              </div>
              <p className="mb-2 text-xl font-semibold text-muted-foreground">Safety, by women, for women.</p>
              <p className="mb-6 text-lg text-muted-foreground">
                Introducing ‘SheShield’, a dedicated network of trained, verified female security professionals available on demand. Women can book a female guard as a companion or escort for travel, events, or any situation where they need additional safety.
              </p>
              <ul className="mb-8 space-y-3 text-muted-foreground">
                  <li className="flex items-start"><span className="mr-3 mt-1.5 h-2 w-2 rounded-full bg-pink-500"></span><span>Empowering women with safe companionship and peace of mind.</span></li>
                  <li className="flex items-start"><span className="mr-3 mt-1.5 h-2 w-2 rounded-full bg-pink-500"></span><span>Creating employment opportunities for skilled female security personnel.</span></li>
                  <li className="flex items-start"><span className="mr-3 mt-1.5 h-2 w-2 rounded-full bg-pink-500"></span><span>Filling a critical gap for culturally sensitive and discreet security needs.</span></li>
              </ul>
              <Button asChild size="lg" className="bg-pink-500 text-white hover:bg-pink-600">
                <Link href="/search?gender=female">
                  Find a Female Guard
                </Link>
              </Button>
            </div>
             <div className="order-1 md:order-2">
               <Image
                  src="https://picsum.photos/seed/woman-security/600/400"
                  alt="SheShield female security professional"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-xl"
                  data-ai-hint="professional woman"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Why ProtectHire Section */}
      <section className="w-full bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
           <h2 className="mb-12 text-center text-3xl font-bold tracking-tight md:text-4xl">
            Why ProtectHire is Essential
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <div className="rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
                <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                        <ShieldQuestion className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold">For Clients</h3>
                </div>
                <p className="mb-4 text-muted-foreground">
                    Finding reliable security shouldn't be a gamble. We connect you with vetted, experienced professionals, giving you peace of mind for your events, property, or business.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start"><span className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></span>Access to a wide pool of talent.</li>
                    <li className="flex items-start"><span className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></span>Transparent profiles with ratings and experience.</li>
                    <li className="flex items-start"><span className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></span>Simplified booking and communication.</li>
                </ul>
            </div>
             <div className="rounded-lg border bg-card p-8 text-card-foreground shadow-sm">
                <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-foreground">
                        <Briefcase className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-bold">For Guards & Companies</h3>
                </div>
                <p className="mb-4 text-muted-foreground">
                    Showcase your skills and find your next opportunity. We provide the platform to connect with top-tier clients and companies looking for your expertise.
                </p>
                 <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start"><span className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></span>Create a professional portfolio.</li>
                    <li className="flex items-start"><span className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></span>Apply for jobs that match your skills.</li>
                    <li className="flex items-start"><span className="mr-2 mt-1 h-2 w-2 rounded-full bg-primary"></span>Grow your career and reputation.</li>
                </ul>
            </div>
          </div>
           <div className="mt-12 text-center text-sm text-muted-foreground bg-secondary p-4 rounded-lg">
             <p className="font-semibold">Platform Disclaimer</p>
             <p>ProtectHire acts as a marketplace to connect clients with security professionals. All professionals undergo strict verification. However, ProtectHire is not responsible for any misconduct or criminal acts committed by individuals while on duty.</p>
           </div>
        </div>
      </section>

        {/* Call to Action Section */}
      <section className="w-full bg-gradient-to-r from-slate-900 to-slate-800 py-16 md:py-24 text-primary-foreground">
         <div className="container mx-auto flex flex-col items-center px-4 text-center">
             <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Ready to get started?</h2>
             <p className="mb-8 max-w-xl text-lg text-slate-300">
                Whether you need security or you are security, ProtectHire connects you.
             </p>
             <div className="flex flex-col gap-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                 <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                     <Link href="/search">
                         <Search className="mr-2 h-5 w-5" /> Find a Guard Now
                     </Link>
                 </Button>
                 <Button asChild size="lg" variant="outline" className="border-accent text-accent bg-transparent hover:bg-accent hover:text-accent-foreground">
                      <Link href="/register">
                         <UserPlus className="mr-2 h-5 w-5" /> Join the Platform
                     </Link>
                 </Button>
             </div>
         </div>
      </section>

    </div>
  );
}
