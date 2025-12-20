import * as React from "react";
import { Hash } from "lucide-react";

interface AnchorLinkProps {
  id: string;
  children: React.ReactNode;
}

export function AnchorLink({ id, children }: AnchorLinkProps) {
  return (
    <a
      href={`#${id}`}
      id={id}
      className="group relative inline-block"
    >
      {children}
      <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Hash className="h-4 w-4 inline" />
      </span>
    </a>
  );
}