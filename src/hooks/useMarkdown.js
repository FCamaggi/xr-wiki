import { useState, useEffect } from 'react';

const useMarkdown = (slug) => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMarkdown = async () => {
            if (!slug) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const section = slug.includes('pregunta') ? 'practice' : 'course';
                const url = `/content/${section}/${slug}.md`;
                console.log('Intentando cargar:', url);
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('No se pudo cargar el contenido');
                }

                const text = await response.text();
                console.log('Contenido cargado:', text.substring(0, 200)); // Debug
                setContent(text);
                setError(null);
            } catch (err) {
                setError(err.message);
                console.error('Error cargando markdown:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMarkdown();
    }, [slug]);

    return { content, loading, error };
};

export default useMarkdown;