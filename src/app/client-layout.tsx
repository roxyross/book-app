"use client";

import { Navbar } from "./components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import { useSidebar } from "./providers";
import { navigation } from "@/lib/navigation";
import { ReactNode } from "react";
import { Footer } from "@/components/ui/Footer";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { sidebarOpen, toggleSidebar, closeSidebar } = useSidebar();

  return (
    <>
      <Sidebar
        navigation={navigation}
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        onClose={closeSidebar}
      />
      <div className="md:pl-64 flex flex-col min-h-screen transition-all duration-300">
        <Navbar />
        <main className="flex-1 bg-background transition-all duration-300">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}