import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, ShieldCheck, Search, UserPlus, Building2 } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">
              GetSecure
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
              <ShieldCheck className="h-6 w-6 text-primary" />
              <span className="font-bold">GetSecure</span>
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
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {/* Optional: Add Login/Signup or User Avatar here */}
        </div>
      </div>
    </header>
  );
}
