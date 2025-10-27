import './globals.css';
import { ReactNode } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Topbar } from '@/components/Topbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const metadata = {
  title: 'GrA × Genius – Sovereign AI',
  description: 'Saudi sovereign AI platform – PDPL / CCC-2-2024'
};

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="theme-dark min-h-screen bg-slate-950">
        <QueryClientProvider client={queryClient}>
          <div className="grid grid-cols-[260px_1fr]">
            <Sidebar />
            <div className="min-h-screen">
              <Topbar />
              <main className="container-slim py-6">{children}</main>
            </div>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
