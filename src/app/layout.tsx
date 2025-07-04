import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header"; // Import Header
import { GuardsProvider } from "@/context/GuardsContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "GetSecure",
  description: "Hire security guards and bouncers, or find security jobs on demand.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <GuardsProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header /> {/* Add Header */}
            <main className="flex-1">{children}</main>
            {/* Optional: Add a Footer component here */}
          </div>
          <Toaster />
        </GuardsProvider>
      </body>
    </html>
  );
}
