import PropTypes from 'prop-types';

const PDFViewer = ({ url, title = 'PDF Document' }) => {
  // Verificar que la URL sea válida
  if (!url) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>Error: URL del PDF no válida</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-100 rounded-lg p-4">
      <div className="aspect-[4/3] w-full h-full relative">
        <object
          data={url}
          type="application/pdf"
          title={title}
          aria-label={title}
          className="absolute inset-0 w-full h-full"
        >
          <div className="flex flex-col items-center justify-center h-full bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-slate-600 mb-4">
              El visor de PDF no está disponible en tu navegador.
            </p>
            <a
              href={url}
              download
              className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
              aria-label={`Descargar ${title}`}
            >
              Descargar PDF
            </a>
          </div>
        </object>
      </div>
    </div>
  );
};

PDFViewer.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string,
};

export default PDFViewer;
