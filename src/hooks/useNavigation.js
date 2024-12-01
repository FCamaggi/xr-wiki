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
                const response = await fetch('/content/content-map.json');
                if (!response.ok) {
                    throw new Error('No se pudo cargar la tabla de contenidos');
                }
                const data = await response.json();

                // Asegurarse de que cada ítem tenga un ID único
                const processedData = Object.keys(data).reduce((acc, section) => {
                    acc[section] = data[section].map((item, index) => ({
                        ...item,
                        id: `${section}-${item.slug}-${index}` // Agregar un identificador único
                    }));
                    return acc;
                }, {});

                setTableOfContents(processedData);
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