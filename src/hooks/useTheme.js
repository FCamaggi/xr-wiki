import { useState, useEffect } from 'react';

export function useTheme() {
    // Recuperar tema guardado o usar preferencia del sistema
    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        // Aplicar clase al elemento html
        const root = window.document.documentElement;
        root.classList.remove('dark', 'light');
        root.classList.add(theme);

        // Guardar preferencia
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return { theme, toggleTheme };
}