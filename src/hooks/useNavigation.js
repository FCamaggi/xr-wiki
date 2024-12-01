// useNavigation.js
import { useState, useEffect } from 'react';

const useNavigation = () => {
    const [tableOfContents, setTableOfContents] = useState({
        classes: [],
        cases: [],
        tests: [],
        others: [],
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadTableOfContents = async () => {
            try {
                setLoading(true);
                // Cargar el archivo JSON generado por Vite
                const response = await fetch('/content/content-map.json');
                if (!response.ok) {
                    throw new Error('No se pudo cargar la tabla de contenidos');
                }
                const data = await response.json();
                setTableOfContents(data);
            } catch (err) {
                console.error('Error cargando la tabla de contenidos:', err);
                setError('Error cargando la estructura de contenido');
            } finally {
                setLoading(false);
            }
        };

        loadTableOfContents();
    }, []);

    return { tableOfContents, loading, error };
};

export default useNavigation;