import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';
import AppShell from '@/components/layout/AppShell';

export const metadata: Metadata = {
  title: 'SocioSolve — Societal Challenge Collaboration Platform',
  description: 'A digital platform to crowdsource societal challenges and facilitate collaborative problem solving through universities and industry partnerships.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-slate-50 text-slate-900">
        <AppProvider>
          <AppShell>
            {children}
          </AppShell>
        </AppProvider>
      </body>
    </html>
  );
}
