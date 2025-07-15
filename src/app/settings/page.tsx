
'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  React.useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  const handleSaveChanges = (e: React.FormEvent, section: string) => {
    e.preventDefault();
    toast({
        title: "Settings Saved!",
        description: `Your ${section} settings have been updated.`,
    });
  };

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
        <CardContent>
            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Profile</CardTitle>
                            <CardDescription>
                                Update your personal information.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={(e) => handleSaveChanges(e, 'profile')} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input id="fullName" defaultValue={user.name} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input id="email" type="email" defaultValue={user.email} />
                                </div>
                                <Button type="submit">Save Changes</Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="security" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password & Security</CardTitle>
                            <CardDescription>
                                Change your password and manage your account security settings.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={(e) => handleSaveChanges(e, 'security')} className="space-y-6">
                                 <div className="space-y-2">
                                    <Label htmlFor="current-password">Current Password</Label>
                                    <Input id="current-password" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input id="new-password" type="password" />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                                    <Input id="confirm-password" type="password" />
                                </div>
                                <Button type="submit">Change Password</Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="notifications" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Notifications</CardTitle>
                            <CardDescription>
                                Control how you receive notifications from ProtectHire.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                           <form onSubmit={(e) => handleSaveChanges(e, 'notification')} className="space-y-6">
                                <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Receive emails for booking requests, confirmations, and messages.
                                        </p>
                                    </div>
                                    <Switch
                                        id="email-notifications"
                                        defaultChecked
                                    />
                                </div>
                                 <div className="flex items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="push-notifications" className="text-base">Push Notifications</Label>
                                        <p className="text-sm text-muted-foreground">
                                            Get push notifications for real-time updates on your mobile device.
                                        </p>
                                    </div>
                                    <Switch
                                        id="push-notifications"
                                        defaultChecked
                                    />
                                </div>
                                <Button type="submit">Save Preferences</Button>
                           </form>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
