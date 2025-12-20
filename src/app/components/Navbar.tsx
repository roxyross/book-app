"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Search, Menu } from "lucide-react";
// import { useSession } from "better-auth/react";
import { authClient } from "@/lib/auth-client";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchBar } from "@/components/SearchBar";
import { useSidebar } from "@/app/providers";
import { useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = authClient.useSession();
  const { toggleSidebar } = useSidebar();
  const [searchOpen, setSearchOpen] = useState(false);

  // Don't show sidebar toggle on auth pages
  const hideSidebarToggle = pathname.startsWith('/login') || pathname.startsWith('/register');

  return (
    <>
      <nav className="border-b bg-background/90 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {!hideSidebarToggle && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden mr-2 hover:bg-accent/50"
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
            )}
            <Link href="/" className="text-xl font-bold flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent font-bold">
                AI Book Platform
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link
              href="/"
              className={`transition-all duration-200 hover:text-primary ${pathname === '/' ? 'font-semibold text-primary border-b-2 border-primary pb-1' : 'text-foreground/70 hover:text-foreground'}`}
            >
              Home
            </Link>
            <Link
              href="/chapters"
              className={`transition-all duration-200 hover:text-primary ${pathname?.startsWith('/chapters') ? 'font-semibold text-primary border-b-2 border-primary pb-1' : 'text-foreground/70 hover:text-foreground'}`}
            >
              Chapters
            </Link>
            <Link
              href="/chat"
              className={`transition-all duration-200 hover:text-primary ${pathname?.startsWith('/chat') ? 'font-semibold text-primary border-b-2 border-primary pb-1' : 'text-foreground/70 hover:text-foreground'}`}
            >
              AI Chat
            </Link>
            <Link
              href="/docs/preface-agent-native"
              className={`transition-all duration-200 hover:text-primary ${pathname?.startsWith('/docs') ? 'font-semibold text-primary border-b-2 border-primary pb-1' : 'text-foreground/70 hover:text-foreground'}`}
            >
              Documentation
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearchOpen(true)}
              className="hidden md:flex items-center gap-2 h-9 rounded-lg px-3 hover:bg-accent/50"
            >
              <Search className="h-4 w-4" />
              <span className="text-sm text-muted-foreground">Search...</span>
              <kbd className="ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSearchOpen(true)}
              className="md:hidden hover:bg-accent/50"
            >
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>

            <ThemeToggle />

            <div className="hidden md:flex items-center gap-2">
              {session ? (
                <div className="flex items-center gap-2">
                  <Button asChild variant="ghost" size="sm" className="text-sm hover:bg-accent/50">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <Button asChild variant="outline" size="sm" className="text-sm hover:bg-accent/50">
                    <Link href="/api/auth/signout">Logout</Link>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button asChild variant="ghost" size="sm" className="text-sm hover:bg-accent/50">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild size="sm" className="text-sm bg-gradient-to-r from-primary to-blue-600 text-white hover:from-primary/90 hover:to-blue-600/90">
                    <Link href="/register">Sign up</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile menu button for auth */}
            <div className="md:hidden">
              {session ? (
                <Button asChild variant="ghost" size="sm" className="hover:bg-accent/50">
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
              ) : (
                <Button asChild variant="ghost" size="sm" className="hover:bg-accent/50">
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <SearchBar open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  );
}