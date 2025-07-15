
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, UserPlus, Building2, LogIn, UserCircle, Settings, LogOut } from "lucide-react";
import { ProtectHireLogo } from "./ProtectHireLogo";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <ProtectHireLogo className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              ProtectHire
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/search"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Find Guards
            </Link>
            <Link
              href="/register"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Guard Registration
            </Link>
             <Link
              href="/register-company"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              For Companies
            </Link>
          </nav>
        </div>
        
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="Toggle Menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link
              href="/"
              className="flex items-center space-x-2 px-6 pb-6 pt-4 border-b"
            >
              <ProtectHireLogo className="h-6 w-6 text-primary" />
              <span className="font-bold">ProtectHire</span>
            </Link>
            <div className="space-y-4 py-6">
              <Link
                href="/search"
                className="flex items-center px-6 py-2 text-foreground/80 hover:text-foreground"
              >
                <Search className="mr-2 h-4 w-4" />
                Find Guards
              </Link>
              <Link
                href="/register"
                className="flex items-center px-6 py-2 text-foreground/80 hover:text-foreground"
              >
                <UserPlus className="mr-2 h-4 w-4" />
                Guard Registration
              </Link>
              <Link
                href="/register-company"
                className="flex items-center px-6 py-2 text-foreground/80 hover:text-foreground"
              >
                <Building2 className="mr-2 h-4 w-4" />
                For Companies
              </Link>
            </div>
             {!user && (
                <div className="absolute bottom-0 left-0 w-full p-4 border-t">
                  <div className="flex gap-2">
                     <Button asChild variant="ghost" className="w-full">
                        <Link href="/login">Log In</Link>
                    </Button>
                    <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Link href="/register-client">Sign Up</Link>
                    </Button>
                  </div>
                </div>
            )}
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={user.imageUrl} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account">
                      <UserCircle className="mr-2 h-4 w-4"/>
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4"/>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4"/>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
                <div className="hidden md:flex items-center gap-2">
                    <Button asChild variant="ghost">
                        <Link href="/login">Log In</Link>
                    </Button>
                    <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Link href="/register-client">Sign Up</Link>
                    </Button>
                </div>
            )}
        </div>
      </div>
    </header>
  );
}
