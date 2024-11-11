// TableOfContents.jsx - Actualizado
import React from 'react';
import { ChevronRight } from 'lucide-react';
import useTableOfContents from '../hooks/useTableOfContents';

// TableOfContents.jsx
const TableOfContents = ({ content, activeHeading }) => {
  const headings = useTableOfContents(content);

  // TableOfContents.jsx
  const renderHeading = (heading, depth = 0) => (
    <div key={heading.id}>
      <button
        onClick={() => {
          document
            .getElementById(heading.id)
            ?.scrollIntoView({ behavior: 'smooth' });
        }}
        className={`
        w-full text-left 
        flex items-center gap-2 
        py-1 px-3
        rounded-md
        transition-colors
        ${
          activeHeading === heading.id
            ? 'bg-slate-100 text-slate-900'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }
      `}
        style={{ paddingLeft: `${depth * 0.75 + 0.75}rem` }}
      >
        {/* Eliminada la flecha ChevronRight */}
        <span className="truncate">{heading.text}</span>
      </button>

      {heading.children.length > 0 && (
        <div className="mt-1">
          {heading.children.map((child) => renderHeading(child, depth + 1))}
        </div>
      )}
    </div>
  );

  if (!headings.length) return null;

  return (
    <div className="py-4">
      <h4 className="font-medium text-sm text-slate-900 mb-4 px-3">
        En esta página
      </h4>
      <nav className="space-y-1">
        {headings.map((heading) => renderHeading(heading))}
      </nav>
    </div>
  );
};

export default TableOfContents;
