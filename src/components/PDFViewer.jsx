import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCw } from 'lucide-react';

const PDFViewer = ({ url }) => {
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 2));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* Controles */}
      <div className="flex gap-2 p-2 bg-white rounded-lg shadow-sm">
        <button
          onClick={handleZoomOut}
          className="p-2 hover:bg-slate-100 rounded-md"
          aria-label="Reducir zoom"
        >
          <ZoomOut size={20} />
        </button>
        <button
          onClick={handleZoomIn}
          className="p-2 hover:bg-slate-100 rounded-md"
          aria-label="Aumentar zoom"
        >
          <ZoomIn size={20} />
        </button>
        <button
          onClick={handleRotate}
          className="p-2 hover:bg-slate-100 rounded-md"
          aria-label="Rotar PDF"
        >
          <RotateCw size={20} />
        </button>
      </div>

      {/* Contenedor del PDF */}
      <div className="w-full max-w-full overflow-x-auto">
        <div
          style={{
            transform: `scale(${scale}) rotate(${rotation}deg)`,
            transformOrigin: 'center center',
            transition: 'transform 0.3s ease',
          }}
          className="w-full min-h-[500px] bg-white rounded-lg shadow-sm p-4"
        >
          <iframe
            src={`${url}#toolbar=0`}
            className="w-full h-full border-0"
            style={{
              minHeight: isMobile ? '400px' : '600px',
              width: '100%',
            }}
            title="PDF Viewer"
          />
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
