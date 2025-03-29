import { readdirSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function normalizeFileName(fileName) {
    return fileName
        .normalize('NFD') // Descomponer caracteres acentuados
        .replace(/[\u0300-\u036f]/g, '') // Eliminar diacríticos
        .replace(/[^a-zA-Z0-9-_.]/g, '-') // Reemplazar caracteres especiales con guiones
        .replace(/-+/g, '-') // Reemplazar múltiples guiones con uno solo
        .toLowerCase(); // Convertir a minúsculas
}

function getContentFiles(dir) {
    const contentPath = resolve(__dirname, '../public/content', dir);
    try {
        return readdirSync(contentPath)
            .filter(file => file.endsWith('.md') || file.endsWith('.pdf'))
            .map(file => {
                const extension = file.endsWith('.pdf') ? '.pdf' : '.md';
                const baseName = file.slice(0, -extension.length);
                const normalizedName = normalizeFileName(baseName);

                let fileInfo = {
                    originalName: file,
                    slug: normalizedName,
                    title: baseName.replace(/-/g, ' '),
                    order: 0,
                    isPdf: file.endsWith('.pdf')
                };

                // Procesar anuncios (formato: YYYY-MM-DD-titulo.md)
                if (dir === 'anuncios') {
                    const dateMatch = baseName.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);
                    if (dateMatch) {
                        const [, year, month, day, title] = dateMatch;
                        return {
                            ...fileInfo,
                            title: title.replace(/-/g, ' '),
                            date: `${year}-${month}-${day}`,
                            order: -new Date(`${year}-${month}-${day}`).getTime() // Orden inverso por fecha
                        };
                    }
                }

                // Procesar clases, casos y evaluaciones
                const match = baseName.match(/^(clase|caso|evaluacion)-(\d+)-(.+)$/i);
                if (match) {
                    return {
                        ...fileInfo,
                        title: `${match[1].charAt(0).toUpperCase() + match[1].slice(1)} ${match[2]}: ${match[3].replace(/-/g, ' ')}`,
                        order: parseInt(match[2])
                    };
                }

                // Procesar contenido de la sección "otros"
                if (dir === 'otros' && baseName.toLowerCase().startsWith('otros -')) {
                    return {
                        ...fileInfo,
                        title: baseName.replace(/^otros -\s*/i, '').replace(/-/g, ' ')
                    };
                }

                return fileInfo;
            })
            .sort((a, b) => a.order - b.order);
    } catch (error) {
        console.error(`Error reading directory ${dir}:`, error);
        return [];
    }
}

// Asegurarse de que los directorios existen
const contentDirPath = resolve(__dirname, '../public/content');
const directories = [
    'ayudantias',
    'casos',
    'clases',
    'documentos',
    'evaluaciones',
    'guias',
    'otros',
    'anuncios'
];

// Crear directorios si no existen
directories.forEach(dir => {
    const dirPath = resolve(contentDirPath, dir);
    if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true });
    }
});

// Generar el mapa de contenido
const contentMap = directories.reduce((acc, dir) => {
    acc[dir] = getContentFiles(dir);
    return acc;
}, {});

// Escribir el archivo JSON
writeFileSync(
    join(contentDirPath, 'content-map.json'),
    JSON.stringify(contentMap, null, 2)
);

console.log('Content map generated successfully!');