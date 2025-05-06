import PropTypes from 'prop-types';
import useTableOfContents from '../hooks/useTableOfContents';

const getHeadingStyles = (level) => {
  switch (level) {
    case 1:
      return 'text-lg font-bold';
    case 2:
      return 'text-base font-bold';
    case 3:
      return 'text-sm font-normal';
    case 4:
      return 'text-xs italic';
    case 5:
      return 'text-xs italic';
    default:
      return 'text-xs italic text-slate-500';
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
              ? 'bg-slate-100 text-slate-900'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }
        `}
        style={{ paddingLeft: `${depth * 0.75 + 0.75}rem` }}
      >
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
    <div className="py-4 h-full">
      <h4 className="font-medium text-sm text-slate-900 mb-4 px-3">
        En esta página
      </h4>
      <nav className="space-y-1">
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
