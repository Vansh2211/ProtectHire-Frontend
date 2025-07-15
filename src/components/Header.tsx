
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, UserPlus, Building2, LogIn, Settings, LogOut, Briefcase } from "lucide-react";
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

export default function Header() {
  const { user, logout } = useAuth();
  const userType = user?.userType;

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
             {userType !== 'guard' && (
                <Link
                href="/search"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                Find Guards
                </Link>
             )}
            {userType !== 'guard' && userType !== 'company' && (
                 <Link
                    href="/register-guard"
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                    Guard Registration
                </Link>
            )}
             {userType !== 'company' && (
                <Link
                href="/register-company"
                className="transition-colors hover:text-foreground/80 text-foreground/60"
                >
                For Companies
                </Link>
             )}
              {userType === 'guard' && (
                 <Link
                    href="/job-board"
                    className="transition-colors hover:text-foreground/80 text-foreground/60"
                    >
                    Job Board
                </Link>
              )}
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
              {userType !== 'guard' && (
                <Link
                  href="/search"
                  className="flex items-center px-6 py-2 text-foreground/80 hover:text-foreground"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Find Guards
                </Link>
              )}
              {userType !== 'guard' && userType !== 'company' && (
                <Link
                  href="/register-guard"
                  className="flex items-center px-6 py-2 text-foreground/80 hover:text-foreground"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Guard Registration
                </Link>
              )}
              {userType !== 'company' && (
                <Link
                  href="/register-company"
                  className="flex items-center px-6 py-2 text-foreground/80 hover:text-foreground"
                >
                  <Building2 className="mr-2 h-4 w-4" />
                  For Companies
                </Link>
              )}
              {userType === 'guard' && (
                <Link
                  href="/job-board"
                  className="flex items-center px-6 py-2 text-foreground/80 hover:text-foreground"
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  Job Board
                </Link>
              )}
            </div>
            {!user && (
              <div className="absolute bottom-0 left-0 w-full p-4 border-t">
                <div className="flex gap-2">
                  <Button asChild variant="ghost" className="w-full">
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                    <Link href="/register">Sign Up</Link>
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
                   <Button variant="outline" size="icon" className="relative h-9 w-9 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="currentColor"
                      className="text-foreground"
                    >
                      <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q62 0 126 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80q17 0 28.5-11.5T520-680q0-17-11.5-28.5T480-720q-17 0-28.5 11.5T440-680q0 17 11.5 28.5T480-640Zm0 400Z" />
                    </svg>
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
                      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor" className="mr-2 h-4 w-4"><path d="M200-246q54-53 125.5-83.5T480-360q83 0 154.5 30.5T760-246v-514H200v514Zm280-194q58 0 99-41t41-99q0-58-41-99t-99-41q-58 0-99 41t-41 99q0 58 41 99t99 41ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm69-80h422q-44-39-99.5-59.5T480-280q-56 0-112.5 20.5T269-200Zm211-320q-25 0-42.5-17.5T420-580q0-25 17.5-42.5T480-640q25 0 42.5 17.5T540-580q0 25-17.5 42.5T480-520Zm0 17Z"/></svg>
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
                        <Link href="/register">Sign Up</Link>
                    </Button>
                </div>
            )}
        </div>
      </div>
    </header>
  );
}
