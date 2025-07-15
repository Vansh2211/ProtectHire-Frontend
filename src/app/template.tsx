// src/app/template.tsx
'use client'

import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
      <AuthProvider>
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
        </div>
      </AuthProvider>
  );
}
