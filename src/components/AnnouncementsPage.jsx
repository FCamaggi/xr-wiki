import { useState, useEffect } from 'react';
import { Calendar, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MarkdownContent from './MarkdownContent';
import { ThemeToggle } from './ThemeToggle';

const NavigationHeader = () => (
  <nav className="bg-white dark:bg-gray-900 border-b border-slate-200 dark:border-gray-700 py-4 sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="p-2 text-slate-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            title="Ir a inicio"
          >
            <Home size={20} />
          </Link>
          <div className="flex items-center space-x-6 overflow-x-auto">
            {[
              { path: 'ayudantias', label: 'Ayudantías' },
              { path: 'casos', label: 'Casos' },
              { path: 'clases', label: 'Clases' },
              { path: 'documentos', label: 'Documentos' },
              { path: 'evaluaciones', label: 'Evaluaciones' },
              { path: 'guias', label: 'Guías' },
              { path: 'otros', label: 'Otros' },
            ].map(({ path, label }) => (
              <Link
                key={path}
                to={`/${path}`}
                className="text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white whitespace-nowrap transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  </nav>
);

const AnnouncementBlock = ({ title, date, content }) => (
  <article className="bg-white dark:bg-gray-800 rounded-lg border border-slate-200 dark:border-gray-700 mb-8 overflow-hidden">
    <header className="border-b border-slate-200 dark:border-gray-700 bg-slate-50 dark:bg-gray-900 p-6">
      <div className="flex items-center gap-2 text-slate-600 dark:text-gray-400 mb-2">
        <Calendar size={16} />
        <time dateTime={date} className="text-sm">
          {new Date(date).toLocaleDateString('es-CL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
        {title}
      </h2>
    </header>
    <div className="p-6 dark:text-gray-300">
      <div className="prose dark:prose-invert prose-slate max-w-none">
        <MarkdownContent content={content} />
      </div>
    </div>
  </article>
);

AnnouncementBlock.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [contents, setContents] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const response = await fetch('/content/content-map.json');
        if (!response.ok) throw new Error('Error cargando anuncios');

        const data = await response.json();
        const anuncios = data.anuncios || [];

        // Ordenar anuncios por fecha (más recientes primero)
        const sortedAnnouncements = anuncios.sort((a, b) => {
          const dateA = new Date(a.date || 0);
          const dateB = new Date(b.date || 0);
          return dateB - dateA;
        });

        setAnnouncements(sortedAnnouncements);

        // Cargar el contenido de cada anuncio
        const contentsMap = {};
        await Promise.all(
          sortedAnnouncements.map(async (announcement) => {
            try {
              const contentResponse = await fetch(
                `/content/anuncios/${announcement.slug}.md`
              );
              if (!contentResponse.ok)
                throw new Error('Error cargando contenido');
              const content = await contentResponse.text();
              contentsMap[announcement.slug] = content;
            } catch (error) {
              console.error(
                `Error loading content for ${announcement.slug}:`,
                error
              );
              contentsMap[announcement.slug] = 'Error cargando el contenido';
            }
          })
        );

        setContents(contentsMap);
      } catch (error) {
        console.error('Error cargando anuncios:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        <NavigationHeader />
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-white" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <NavigationHeader />
      <div className="max-w-4xl mx-auto px-4 py-8 relative">
        <ThemeToggle />
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Anuncios
          </h1>
          <p className="text-slate-600 dark:text-gray-400">
            Últimos anuncios y actualizaciones del curso
          </p>
        </div>

        {announcements.length === 0 ? (
          <div className="text-center py-12 text-slate-600 dark:text-gray-400">
            No hay anuncios disponibles
          </div>
        ) : (
          <div className="space-y-8">
            {announcements.map((announcement) => (
              <AnnouncementBlock
                key={announcement.slug}
                title={announcement.title}
                date={announcement.date}
                content={contents[announcement.slug] || 'Cargando...'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnouncementsPage;
