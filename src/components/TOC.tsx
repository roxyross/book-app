import * as React from "react";

interface TOCItem {
  id: string;
  title: string;
  level: number;
  items?: TOCItem[];
}

interface TOCProps {
  toc: TOCItem[];
}

export function TOC({ toc }: TOCProps) {
  if (!toc || toc.length === 0) {
    return null;
  }

  const renderTOC = (items: TOCItem[], depth = 0) => {
    if (!items || items.length === 0) {
      return null;
    }

    return (
      <ul className={`${depth > 0 ? 'ml-4 mt-2' : ''}`}>
        {items.map((item) => (
          <li key={item.id} className="my-1">
            <a
              href={`#${item.id}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.title}
            </a>
            {item.items && renderTOC(item.items, depth + 1)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">On this page</h3>
      {renderTOC(toc)}
    </div>
  );
}