import { useState, useEffect } from 'react';

// useTableOfContents.js
const useTableOfContents = (content) => {
    const [headings, setHeadings] = useState([]);

    useEffect(() => {
        const extractHeadings = () => {
            if (!content) return [];

            const lines = content.split('\n');
            const headingsData = [];
            let inCodeBlock = false;
            let previousHeadings = {};

            lines.forEach((line, index) => {
                // Detectar bloques de código
                if (line.trim().startsWith('```')) {
                    inCodeBlock = !inCodeBlock;
                    return;
                }

                // Ignorar líneas dentro de bloques de código
                if (inCodeBlock) return;

                // Expresión regular mejorada para headings
                const match = line.trim().match(/^(#{1,6})\s+(.+)$/);
                if (match) {
                    const level = match[1].length;
                    const text = match[2].trim();

                    const heading = {
                        id: text
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/(^-|-$)/g, ''),
                        level,
                        text,
                        children: []
                    };

                    // Encontrar el padre apropiado
                    let parentLevel = level - 1;
                    while (parentLevel > 0) {
                        const parent = previousHeadings[parentLevel];
                        if (parent) {
                            parent.children.push(heading);
                            break;
                        }
                        parentLevel--;
                    }

                    // Si no encontramos padre, añadir a la raíz
                    if (parentLevel === 0) {
                        headingsData.push(heading);
                    }

                    // Actualizar el tracking de headings
                    previousHeadings[level] = heading;

                    // Limpiar niveles posteriores
                    for (let i = level + 1; i <= 6; i++) {
                        delete previousHeadings[i];
                    }

                    console.log('Added heading:', {
                        text,
                        level,
                        parent: parentLevel > 0 ? previousHeadings[parentLevel].text : 'root'
                    });
                }
            });

            console.log('Final structure:', JSON.stringify(headingsData, null, 2));
            return headingsData;
        };

        const newHeadings = extractHeadings();
        setHeadings(newHeadings);
    }, [content]);

    return headings;
};

export default useTableOfContents;