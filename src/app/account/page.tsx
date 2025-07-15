
'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Shield, Briefcase, Mail, LogOut, Edit } from 'lucide-react';

export default function AccountPage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    // If no user, redirect to login page. This is a simple guard.
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    // Render nothing or a loading spinner while redirecting
    return null;
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
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={user.imageUrl} alt={user.name} />
            <AvatarFallback className="text-3xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
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
             <Button variant="outline" className="w-full">
                <Edit className="mr-2 h-4 w-4"/>
                Edit Profile
             </Button>
             <Button onClick={logout} variant="destructive" className="w-full">
               <LogOut className="mr-2 h-4 w-4"/>
               Log Out
             </Button>
          </div>
          
          {user.userType === 'client' && (
              <div className="text-center pt-4">
                  <p className="text-muted-foreground">Looking for work as a security professional?</p>
                  <Button variant="link" onClick={() => router.push('/register')}>
                      Register as a Guard
                  </Button>
              </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
