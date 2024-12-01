import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

const PDFViewer = ({ url }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const canvasRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);

  useEffect(() => {
    const loadPDF = async () => {
      try {
        setLoading(true);
        // Cargar PDF.js si aún no está disponible
        if (!window.pdfjsLib) {
          window.pdfjsLib = await import('pdfjs-dist/build/pdf');
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${window.pdfjsLib.version}/pdf.worker.min.js`;
        }

        const loadingTask = window.pdfjsLib.getDocument(url);
        const pdf = await loadingTask.promise;
        setPdfDoc(pdf);
        setNumPages(pdf.numPages);
        setError(null);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError('Error al cargar el PDF');
      } finally {
        setLoading(false);
      }
    };

    loadPDF();
  }, [url]);

  useEffect(() => {
    const renderPage = async () => {
      if (!pdfDoc || !canvasRef.current) return;

      try {
        const page = await pdfDoc.getPage(pageNumber);
        const viewport = page.getViewport({ scale, rotation });

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        await page.render(renderContext).promise;
      } catch (err) {
        console.error('Error rendering page:', err);
        setError('Error al renderizar la página');
      }
    };

    renderPage();
  }, [pdfDoc, pageNumber, scale, rotation]);

  const handlePrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () =>
    setPageNumber((prev) => Math.min(prev + 1, numPages || 1));
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>{error}</p>
        <p className="text-sm mt-2">Por favor, intenta recargar la página</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Controles */}
      <div className="flex flex-wrap gap-2 p-2 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-2 border-r pr-2">
          <button
            onClick={handlePrevPage}
            disabled={pageNumber <= 1}
            className="p-2 hover:bg-slate-100 rounded-md disabled:opacity-50"
            aria-label="Página anterior"
          >
            <ArrowLeft size={20} />
          </button>
          <span className="text-sm">
            {pageNumber} / {numPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={pageNumber >= numPages}
            className="p-2 hover:bg-slate-100 rounded-md disabled:opacity-50"
            aria-label="Página siguiente"
          >
            <ArrowRight size={20} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomOut}
            className="p-2 hover:bg-slate-100 rounded-md"
            aria-label="Reducir zoom"
          >
            <ZoomOut size={20} />
          </button>
          <span className="text-sm">{Math.round(scale * 100)}%</span>
          <button
            onClick={handleZoomIn}
            className="p-2 hover:bg-slate-100 rounded-md"
            aria-label="Aumentar zoom"
          >
            <ZoomIn size={20} />
          </button>
        </div>
        <button
          onClick={handleRotate}
          className="p-2 hover:bg-slate-100 rounded-md"
          aria-label="Rotar PDF"
        >
          <RotateCw size={20} />
        </button>
      </div>

      {/* Contenedor del PDF */}
      <div className="w-full max-w-full overflow-x-auto bg-slate-100 rounded-lg p-4">
        <div className="flex justify-center">
          <canvas ref={canvasRef} className="shadow-lg" />
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
