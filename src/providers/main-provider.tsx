'use client'

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster as Sonner } from "@/components/ui/sonner";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const queryClient = new QueryClient();

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex flex-col min-h-screen">
          <Sonner position="top-center" />
          <Header />
          {children}
          <Footer />
        </div>
      </TooltipProvider>
      <ProgressBar
        height="4px"
        color="#FF6A38"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </QueryClientProvider>
  );
};

export default MainProvider