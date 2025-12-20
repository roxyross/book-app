"use client";

import * as React from "react";
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

interface SearchBarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchBar({ open, onOpenChange }: SearchBarProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [open]);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  // In a real implementation, this would be populated with actual search results
  const searchResults = [
    { id: 1, title: "Introduction to AI", href: "/chapters/1/1" },
    { id: 2, title: "Machine Learning Fundamentals", href: "/chapters/1/2" },
    { id: 3, title: "Neural Network Architecture", href: "/chapters/2/1" },
    { id: 4, title: "Deep Learning Applications", href: "/chapters/2/2" },
    { id: 5, title: "Foundations of NLP", href: "/chapters/3/1" },
    { id: 6, title: "Modern NLP Models", href: "/chapters/3/2" },
    { id: 7, title: "AI Ethics", href: "/chapters/5/1" },
    { id: 8, title: "Future of AI", href: "/chapters/5/2" },
  ];

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        ref={inputRef}
        placeholder="Search documentation..."
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Pages">
          {searchResults.map((result) => (
            <CommandItem
              key={result.id}
              onSelect={() => {
                window.location.href = result.href;
                onOpenChange(false);
              }}
            >
              {result.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}