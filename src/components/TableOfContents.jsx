import PropTypes from 'prop-types';
import useTableOfContents from '../hooks/useTableOfContents';

const getHeadingStyles = (level) => {
  switch (level) {
    case 1:
      return 'text-lg font-bold text-slate-900 dark:text-white';
    case 2:
      return 'text-base font-semibold text-slate-800 dark:text-gray-100';
    case 3:
      return 'text-sm font-medium text-slate-700 dark:text-gray-200';
    case 4:
      return 'text-xs font-medium text-slate-600 dark:text-gray-300';
    case 5:
      return 'text-xs font-medium text-slate-600 dark:text-gray-400';
    case 6:
      return 'text-xs font-normal text-slate-500 dark:text-gray-500';
    default:
      return 'text-xs font-normal text-slate-500 dark:text-gray-500';
  }
};

const TableOfContents = ({ content, activeHeading }) => {
  const headings = useTableOfContents(content);

  const scrollToHeading = (id) => {
    const element = document.getElementById(id);
    if (element) {
      // Obtener el header fijo y su altura
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;

      // Calcular la posición considerando el header y un padding adicional
      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.pageYOffset;
      const offset = headerHeight + 24; // 24px de padding adicional

      // Scroll suave a la posición del elemento
      window.scrollTo({
        top: absoluteTop - offset,
        behavior: 'smooth',
      });

      // Actualizar la URL sin recargar la página
      window.history.pushState({}, '', `#${id}`);
    }
  };

  const renderHeading = (heading, depth = 0) => (
    <div key={heading.id}>
      <button
        onClick={(e) => {
          e.preventDefault();
          scrollToHeading(heading.id);
        }}
        className={`
          w-full text-left
          flex items-center gap-2
          py-1 px-3
          rounded-md
          transition-colors
          ${getHeadingStyles(heading.level)}
          ${
            activeHeading === heading.id
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium'
              : 'hover:bg-slate-50 dark:hover:bg-gray-800/50 hover:text-blue-600 dark:hover:text-blue-400'
          }
        `}
        style={{ paddingLeft: `${depth * 0.75 + 0.75}rem` }}
      >
        <span className="truncate">{heading.text}</span>
      </button>

      {heading.children.length > 0 && (
        <div className="mt-1 border-l-2 border-slate-200 dark:border-gray-700">
          {heading.children.map((child) => renderHeading(child, depth + 1))}
        </div>
      )}
    </div>
  );

  if (!headings.length) return null;

  return (
    <div className="py-4 h-full px-2">
      <h4 className="font-semibold text-sm text-slate-900 dark:text-white mb-4 px-3 uppercase tracking-wide">
        En esta página
      </h4>
      <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-12rem)] scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {headings.map((heading) => renderHeading(heading))}
      </nav>
    </div>
  );
};

TableOfContents.propTypes = {
  content: PropTypes.string,
  activeHeading: PropTypes.string,
};

export default TableOfContents;
