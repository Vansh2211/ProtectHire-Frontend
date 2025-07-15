
'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, User, Bell, Lock, Shield } from 'lucide-react';

export default function SettingsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Settings</CardTitle>
          <CardDescription>
            Manage your account settings, preferences, and notifications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <User className="w-5 h-5 mr-3 text-primary" />
              Profile
            </h3>
            <p className="text-muted-foreground pl-8">
              Update your personal information, profile picture, and bio.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Bell className="w-5 h-5 mr-3 text-primary" />
              Notifications
            </h3>
            <p className="text-muted-foreground pl-8">
              Control how you receive notifications for booking requests and messages.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Lock className="w-5 h-5 mr-3 text-primary" />
              Password & Security
            </h3>
            <p className="text-muted-foreground pl-8">
              Change your password and manage your account security settings.
            </p>
          </div>
           <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Shield className="w-5 h-5 mr-3 text-primary" />
              Privacy
            </h3>
            <p className="text-muted-foreground pl-8">
              Review and manage your privacy settings and data preferences.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
