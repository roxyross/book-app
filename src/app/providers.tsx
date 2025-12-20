'use client';

import { ThemeProvider } from 'next-themes';
import * as React from 'react';

interface SidebarProviderProps {
  children: React.ReactNode;
}

const SidebarContext = React.createContext<{
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}>({
  sidebarOpen: false,
  toggleSidebar: () => {},
  closeSidebar: () => {},
});

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <SidebarContext.Provider value={{ sidebarOpen, toggleSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
}

export const useSidebar = () => React.useContext(SidebarContext);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme={false} // Disable automatic color-scheme application to prevent hydration issues
    >
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </ThemeProvider>
  );
}

