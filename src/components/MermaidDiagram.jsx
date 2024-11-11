import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

const MermaidDiagram = ({ content }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({
      startOnLoad: true,
      theme: 'default',
      securityLevel: 'loose',
      themeVariables: {
        fontFamily: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
        fontSize: '14px'
      }
    });
    
    const renderDiagram = async () => {
      if (containerRef.current) {
        try {
          containerRef.current.innerHTML = '';
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          const { svg } = await mermaid.render(id, content);
          containerRef.current.innerHTML = svg;
        } catch (error) {
          console.error('Error rendering mermaid diagram:', error);
          containerRef.current.innerHTML = `<div class="text-red-500 p-4 rounded-lg border border-red-200">
            Error rendering diagram
          </div>`;
        }
      }
    };

    renderDiagram();
  }, [content]);

  return (
    <div ref={containerRef} className="my-6 p-4 bg-white rounded-lg border border-slate-200 shadow-sm overflow-x-auto">
      {/* Diagram will be rendered here */}
    </div>
  );
};

export default MermaidDiagram;