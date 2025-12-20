import * as React from "react";
import { Sidebar } from "@/components/Sidebar";
import { useSidebar } from "@/app/providers";
import { navigation } from "@/lib/navigation";

interface DocLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  toc?: { id: string; title: string; level: number }[];
}

export function DocLayout({ children, showSidebar = true, toc }: DocLayoutProps) {
  const { sidebarOpen, toggleSidebar, closeSidebar } = useSidebar();

  return (
    <div className="flex min-h-screen">
      {showSidebar && (
        <Sidebar
          navigation={navigation}
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
          onClose={closeSidebar}
        />
      )}

      <div className="flex-1">
        <div className="container py-8">
          <div className="flex gap-8">
            <div className={showSidebar ? "md:pl-64 flex-1" : "flex-1"}>
              {children}
            </div>

            {/* Table of Contents Sidebar */}
            {toc && toc.length > 0 && (
              <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-24 bg-background p-4 rounded-lg border border-border">
                  <h3 className="font-semibold mb-4 text-foreground">On this page</h3>
                  <ul className="space-y-2">
                    {toc.map((item) => (
                      <li key={item.id} className="ml-2">
                        <a
                          href={`#${item.id}`}
                          className={`block py-2 text-sm rounded-md px-2 transition-colors ${
                            item.level > 2 ? "ml-4" : ""
                          } hover:bg-accent hover:text-foreground`}
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}