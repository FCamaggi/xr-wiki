import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Navigation from './Navigation';
import TableOfContents from './TableOfContents';
import MarkdownContent from './MarkdownContent';
import useNavigation from '../hooks/useNavigation';
import useMarkdown from '../hooks/useMarkdown';

const DocumentationLayout = () => {
  const [activeSection, setActiveSection] = useState('classes');
  const [activePage, setActivePage] = useState(null);
  const [activeHeading, setActiveHeading] = useState(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { tableOfContents, loading: navLoading } = useNavigation();
  const [currentContent, setCurrentContent] = useState(null);

  // Nuevo efecto para limpiar el contenido cuando cambia la sección
  useEffect(() => {
    setActivePage(null);
    setCurrentContent(null);
    setActiveHeading(null);
  }, [activeSection]);

  useEffect(() => {
    if (!activePage) {
      setCurrentContent(null);
      return;
    }

    const loadContent = async () => {
      try {
        if (!activePage || activePage.isPdf) {
          setCurrentContent(null);
          return;
        }

        // Determinar la sección basada en el slug actual
        const section = activePage.slug.toLowerCase().startsWith('caso')
          ? 'cases'
          : activePage.slug.toLowerCase().startsWith('i') ||
            activePage.slug.toLowerCase().startsWith('examen')
          ? 'tests'
          : activePage.slug.toLowerCase().startsWith('otros')
          ? 'others'
          : 'classes';

        const response = await fetch(
          `/content/${section}/${activePage.slug}.md`
        );
        if (!response.ok) throw new Error('Error loading content');

        const text = await response.text();
        setCurrentContent(text);
      } catch (error) {
        console.error('Error loading content:', error);
        setCurrentContent(null);
      }
    };

    loadContent();
  }, [activePage]);

  // Manejar cambio de página
  const handlePageChange = (page) => {
    window.scrollTo({ top: 0 });
    setActivePage(page);
    setIsMobileNavOpen(false);
  };

  // Manejar cambio de sección
  const handleSectionChange = (newSection) => {
    setActiveSection(newSection);
    // No es necesario limpiar aquí ya que el efecto se encargará de eso
  };

  return (
    <div className="min-h-screen bg-white lg:grid lg:grid-cols-[280px_1fr_280px]">
      {/* ... Resto del código del componente ... */}
      <div
        className={`fixed inset-0 z-40 transform transition-transform duration-200 ease-in-out ${
          isMobileNavOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:relative lg:block bg-white border-r border-slate-200 lg:sticky lg:top-0 lg:h-screen`}
      >
        <div className="h-full overflow-y-auto p-6">
          <div className="mb-8 sticky top-0 bg-white z-10 pb-4">
            <h1 className="text-2xl font-bold text-slate-900">GOP Wiki</h1>
            <p className="text-sm text-slate-500 mt-1">
              Resumen y repositorio de GOP (PUC)
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Creado con{' '}
              <span role="img" aria-label="heart">
                ❤️
              </span>{' '}
              por Fabrizio Camaggi
            </p>
          </div>

          {navLoading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900" />
            </div>
          ) : (
            <Navigation
              activeSection={activeSection}
              setActiveSection={handleSectionChange}
              activePage={activePage}
              onPageChange={handlePageChange}
              tableOfContents={tableOfContents}
            />
          )}
        </div>
      </div>

      <main className="px-4 py-12 lg:px-8 lg:py-12">
        <div className="max-w-3xl mx-auto">
          <MarkdownContent content={currentContent} currentPage={activePage} />
        </div>
      </main>

      {!activePage?.isPdf && (
        <div className="hidden lg:block border-l border-slate-200">
          <div className="sticky top-0 h-screen overflow-y-auto p-6">
            {currentContent && (
              <TableOfContents
                content={currentContent}
                activeHeading={activeHeading}
              />
            )}
          </div>
        </div>
      )}

      {isMobileNavOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}
    </div>
  );
};

export default DocumentationLayout;
