"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarItem } from "@/components/ui/SidebarItem";

interface NavigationItem {
  title: string;
  href?: string;
  items?: NavigationItem[];
}

interface SidebarProps {
  navigation: NavigationItem[];
  isOpen: boolean;
  onToggle: () => void;
  onClose?: () => void;
}

export function Sidebar({ navigation, isOpen, onToggle, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({});

  const toggleItem = (title: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  const renderNavigation = (items: NavigationItem[], depth = 0) => {
    return items.map((item, index) => {
      const isActiveItem = isActive(item.href);
      const hasChildren = item.items && item.items.length > 0;
      const isExpanded = expandedItems[item.title] ?? (hasChildren && depth === 0);

      return (
        <div key={index} className={depth === 0 ? "mb-4" : ""}>
          {item.href ? (
            <SidebarItem
              title={item.title}
              href={item.href}
              isActive={isActiveItem}
              depth={depth}
              onClick={onClose}
            />
          ) : (
            <div className="mb-1">
              <button
                onClick={() => toggleItem(item.title)}
                className="flex items-center w-full text-left rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent/50 transition-colors"
              >
                <span className="truncate flex-1">{item.title}</span>
                {hasChildren && (
                  <span className="ml-2">
                    {isExpanded ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </span>
                )}
              </button>

              {hasChildren && isExpanded && (
                <div className="ml-2 mt-1 space-y-1 border-l border-border/50 pl-2">
                  {renderNavigation(item.items!, depth + 1)}
                </div>
              )}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-all duration-300 ease-in-out bg-background border-r border-border md:translate-x-0 ${
          isOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
        } md:static md:translate-x-0 md:shadow-none`}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-primary to-blue-600 text-white shadow-md">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              AI Book
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto md:hidden hover:bg-accent/50"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            {renderNavigation(navigation)}
          </div>

          {/* Mobile close button */}
          <div className="p-4 border-t border-border md:hidden">
            <Button
              variant="outline"
              className="w-full hover:bg-accent/50"
              onClick={onClose}
            >
              Close Menu
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-40 md:hidden shadow-lg hover:bg-accent/50"
        onClick={onToggle}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
    </>
  );
}