import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
  title: string;
  href?: string;
  isActive?: boolean;
  depth?: number;
  children?: React.ReactNode;
  onClick?: () => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  title,
  href,
  isActive,
  depth = 0,
  children,
  onClick,
}) => {
  const pathname = usePathname();
  const computedIsActive = href ? (pathname === href || pathname.startsWith(href + "/")) : isActive;
  const paddingLeft = depth > 0 ? `pl-${Math.min(8 + depth * 2, 16)}` : "pl-3";

  if (!href) {
    // If no href is provided, return nothing since this component is only for links
    return null;
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center w-full text-left rounded-lg py-2 text-sm transition-all duration-200 hover:bg-accent/50 hover:translate-x-1 hover:translate-y-[-1px] active:translate-y-0",
        paddingLeft,
        computedIsActive
          ? "bg-primary/10 text-primary font-medium border-l-2 border-primary pl-2"
          : "text-muted-foreground hover:text-accent-foreground"
      )}
    >
      <span className="truncate">{title}</span>
      {children}
    </Link>
  );
};

SidebarItem.displayName = "SidebarItem";