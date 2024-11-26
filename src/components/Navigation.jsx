import React from 'react';
import { ChevronRight } from 'lucide-react';

const Navigation = ({
  activeSection,
  setActiveSection,
  activePage,
  onPageChange,
  tableOfContents,
}) => {
  // Definir las secciones disponibles
  const sections = [
    { id: 'classes', label: 'Clases' },
    { id: 'cases', label: 'Casos de estudio' },
    { id: 'tests', label: 'Pruebas' },
  ];

  return (
    <div className="space-y-6">
      {/* Selector de sección mejorado */}
      <div className="relative">
        <select
          value={activeSection}
          onChange={(e) => setActiveSection(e.target.value)}
          className="w-full px-4 py-2.5 text-base rounded-lg bg-slate-100 border-none
                     appearance-none cursor-pointer focus:ring-2 focus:ring-slate-400
                     text-slate-900 font-medium hover:bg-slate-200 transition-colors"
        >
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
          <svg
            className="h-4 w-4"
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Lista de páginas con diseño mejorado */}
      <div className="space-y-0.5">
        {tableOfContents[activeSection]?.map((item) => (
          <button
            key={item.slug}
            onClick={() => onPageChange(item)}
            className={`
              w-full text-left px-4 py-2.5 rounded-lg
              transition-all duration-200 ease-in-out
              group flex items-center gap-3
              ${
                activePage?.slug === item.slug
                  ? 'bg-slate-100 text-slate-900 font-medium'
                  : 'text-slate-600 hover:bg-slate-50'
              }
            `}
          >
            <ChevronRight
              size={16}
              className={`
                transition-transform duration-200
                ${activePage?.slug === item.slug ? 'rotate-90' : ''}
                text-slate-400 group-hover:text-slate-600
              `}
            />
            <span className="text-sm">{item.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
