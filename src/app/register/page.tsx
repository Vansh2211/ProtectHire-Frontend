
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Building, UserPlus, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterHubPage() {
    const router = useRouter();

    return (
        <div className="container mx-auto max-w-2xl py-12 px-4">
            <Card className="shadow-lg">
                <CardHeader className="text-center">
                    <div className="mb-4 flex justify-center">
                        <UserPlus className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-bold">Join ProtectHire</CardTitle>
                    <CardDescription>
                        Choose the account type that best suits your needs.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        <Link href="/register-client" passHref>
                            <div className="group rounded-lg border p-6 transition-all hover:border-primary hover:shadow-md cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground">
                                        <User className="h-6 w-6" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-semibold">I want to hire security</h3>
                                        <p className="text-sm text-muted-foreground">Create a client account to find and book top security professionals.</p>
                                    </div>
                                    <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>

                        <Link href="/register-guard" passHref>
                           <div className="group rounded-lg border p-6 transition-all hover:border-primary hover:shadow-md cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground">
                                        <UserPlus className="h-6 w-6" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-semibold">I am a security professional</h3>
                                        <p className="text-sm text-muted-foreground">Register as a guard or bouncer to showcase your skills and get hired.</p>
                                    </div>
                                     <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                        
                        <Link href="/register-company" passHref>
                             <div className="group rounded-lg border p-6 transition-all hover:border-primary hover:shadow-md cursor-pointer">
                                <div className="flex items-center gap-4">
                                     <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground group-hover:bg-primary group-hover:text-primary-foreground">
                                        <Building className="h-6 w-6" />
                                    </div>
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-semibold">I represent a company</h3>
                                        <p className="text-sm text-muted-foreground">Post job listings and find qualified security personnel for your organization.</p>
                                    </div>
                                     <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="mt-6 text-center text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-primary hover:underline">
                            Log in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
