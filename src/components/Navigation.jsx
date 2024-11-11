import React from 'react';
import { ChevronRight, BookOpen, ListChecks } from 'lucide-react';

const Navigation = ({
  activeSection,
  setActiveSection,
  activePage,
  onPageChange,
  tableOfContents,
}) => {
  const sections = {
    course: {
      icon: BookOpen,
      title: 'Curso',
    },
    practice: {
      icon: ListChecks,
      title: 'Práctica',
    },
  };

  return (
    <div className="space-y-6">
      {/* Selector de sección */}
      <div className="flex gap-2 p-2 bg-white rounded-lg shadow-sm">
        {Object.entries(sections).map(([key, { icon: Icon, title }]) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md transition ${
              activeSection === key
                ? 'bg-slate-900 text-white'
                : 'hover:bg-slate-100'
            }`}
          >
            <Icon size={16} />
            <span className="text-sm font-medium">{title}</span>
          </button>
        ))}
      </div>

      {/* Lista de páginas */}
      <div className="space-y-1">
        {tableOfContents[activeSection]?.map((item) => (
          <button
            key={item.slug}
            onClick={() => onPageChange(item.slug)}
            className={`w-full text-left px-3 py-2 rounded-md transition group ${
              activePage === item.slug
                ? 'bg-slate-100 text-slate-900'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2">
              <ChevronRight
                size={16}
                className={`transition-transform ${
                  activePage === item.slug ? 'rotate-90' : ''
                }`}
              />
              <span className="text-sm font-medium">{item.title}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
