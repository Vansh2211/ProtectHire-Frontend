
'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Shield, Briefcase, Mail, LogOut, Edit, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function AccountPage() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    // If loading is finished and there's still no user, redirect to login.
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    // Render a loading state or nothing while checking auth
    return (
        <div className="flex justify-center items-center h-screen">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
    );
  }
  
  const getRoleInfo = () => {
      switch(user.userType) {
          case 'client':
              return { icon: <User className="w-5 h-5 text-primary" />, role: "Client" };
          case 'guard':
              return { icon: <Shield className="w-5 h-5 text-primary" />, role: "Guard" };
          case 'company':
              return { icon: <Briefcase className="w-5 h-5 text-primary" />, role: "Company" };
      }
  }
  
  const { icon, role } = getRoleInfo();

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card className="shadow-lg">
        <CardHeader className="text-center items-center">
          <div className="h-24 w-24 mb-4 rounded-full border flex items-center justify-center bg-muted">
            <svg xmlns="http://www.w3.org/2000/svg" height="64px" viewBox="0 -960 960 960" width="64px" fill="currentColor" className="text-muted-foreground">
                <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q62 0 126 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80q17 0 28.5-11.5T520-680q0-17-11.5-28.5T480-720q-17 0-28.5 11.5T440-680q0 17 11.5 28.5T480-640Zm0 400Z" />
            </svg>
          </div>
          <CardTitle className="text-3xl font-bold">{user.name}</CardTitle>
          <CardDescription className="flex items-center gap-2">
            {icon}
            <span className="text-lg">{role} Account</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 rounded-lg border p-4">
             <h3 className="font-semibold text-lg">Account Details</h3>
             <div className="flex items-center">
                 <Mail className="w-5 h-5 mr-3 text-muted-foreground"/>
                 <span className="text-muted-foreground">Email:</span>
                 <span className="ml-2 font-medium">{user.email}</span>
             </div>
             {/* Add more user details here as needed */}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
             <Button variant="outline" className="w-full" asChild>
                <Link href="/settings">
                    <Edit className="mr-2 h-4 w-4"/>
                    Edit Profile
                </Link>
             </Button>
             <Button onClick={logout} variant="destructive" className="w-full">
               <LogOut className="mr-2 h-4 w-4"/>
               Log Out
             </Button>
          </div>
          
          {user.userType === 'client' && (
              <div className="text-center pt-4">
                  <p className="text-muted-foreground">Looking for work as a security professional?</p>
                  <Button variant="link" asChild>
                      <Link href="/register-guard">Register as a Guard</Link>
                  </Button>
              </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
