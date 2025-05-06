import { useMemo } from 'react';
import { ChevronRight, Download } from 'lucide-react';
import { AiOutlineFilePdf, AiOutlineFileMarkdown } from 'react-icons/ai';
import { convertMarkdownToPDF, downloadPDF } from '../utils/pdfUtils';
import PropTypes from 'prop-types';

const Navigation = ({
  activeSection,
  setActiveSection,
  activePage,
  onPageChange,
  tableOfContents,
}) => {
  const sections = [
    { id: 'ayudantias', label: 'Ayudantías' },
    { id: 'casos', label: 'Casos de estudio' },
    { id: 'clases', label: 'Clases' },
    { id: 'documentos', label: 'Documentos' },
    { id: 'evaluaciones', label: 'Evaluaciones' },
    { id: 'guias', label: 'Guías' },
    { id: 'otros', label: 'Otros' },
  ];

  const currentSectionItems = useMemo(() => {
    const items = tableOfContents[activeSection] || [];
    return items.map((item) => ({
      ...item,
      key: item.id || `${activeSection}-${item.slug}`,
    }));
  }, [activeSection, tableOfContents]);

  const handleDownload = async (item) => {
    try {
      if (item.isPdf) {
        const pdfUrl = `/content/${activeSection}/${item.slug}.pdf`;
        await downloadPDF(pdfUrl, `${item.title}.pdf`);
      } else {
        const response = await fetch(
          `/content/${activeSection}/${item.slug}.md`
        );
        const markdown = await response.text();
        await convertMarkdownToPDF(markdown, item.title);
      }
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Selector de sección */}
      <div className="relative">
        <select
          value={activeSection}
          onChange={(e) => setActiveSection(e.target.value)}
          className="w-full px-4 py-2.5 text-base rounded-lg bg-slate-100 dark:bg-gray-800 border border-slate-200 dark:border-gray-700
                      appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600
                      text-slate-900 dark:text-white font-medium hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors"
        >
          {sections.map((section) => (
            <option key={section.id} value={section.id}>
              {section.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-600 dark:text-gray-300">
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

      {/* Lista de páginas */}
      <div className="space-y-0.5">
        {currentSectionItems.map((item) => (
          <div key={item.key} className="flex items-center gap-2">
            <button
              onClick={() => onPageChange(item)}
              className={`
                flex-1 text-left px-4 py-2.5 rounded-lg
                transition-all duration-200 ease-in-out
                group flex items-center gap-3
               ${
                 activePage?.slug === item.slug
                   ? 'bg-blue-50 dark:bg-gray-800/90 text-blue-700 dark:text-blue-400 font-medium ring-1 ring-blue-500/20 dark:ring-blue-500/30'
                   : 'text-slate-700 dark:text-gray-300 hover:bg-slate-50 dark:hover:bg-gray-800/70 hover:text-blue-600 dark:hover:text-blue-400'
               }
              `}
            >
              {item.children?.length > 0 && (
                <ChevronRight
                  size={16}
                  className={`
                    transition-transform duration-200
                    ${activePage?.slug === item.slug ? 'rotate-90' : ''}
                    text-slate-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400
                  `}
                />
              )}
              <span className="text-sm flex items-center gap-2">
                {item.isPdf ? (
                  <AiOutlineFilePdf className="text-red-600 dark:text-red-400 text-lg" />
                ) : (
                  <AiOutlineFileMarkdown className="text-blue-600 dark:text-blue-400 text-lg" />
                )}
                {item.title}
              </span>
            </button>

            <button
              onClick={() => handleDownload(item)}
              className="p-2 text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800/70 rounded-lg transition-colors"
              title="Descargar PDF"
            >
              <Download size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

Navigation.propTypes = {
  activeSection: PropTypes.string.isRequired,
  setActiveSection: PropTypes.func.isRequired,
  activePage: PropTypes.shape({
    slug: PropTypes.string,
    isPdf: PropTypes.bool,
    title: PropTypes.string,
  }),
  onPageChange: PropTypes.func.isRequired,
  tableOfContents: PropTypes.object.isRequired,
};

export default Navigation;
