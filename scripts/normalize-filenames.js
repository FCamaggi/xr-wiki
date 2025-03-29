import { readdirSync, renameSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function normalizeFileName(fileName) {
    // Separar el nombre base y la extensión
    const ext = fileName.includes('.') ? fileName.slice(fileName.lastIndexOf('.')) : '';
    const baseName = fileName.slice(0, fileName.length - ext.length);

    // Normalizar el nombre base
    const normalized = baseName
        .normalize('NFD') // Descomponer caracteres acentuados
        .replace(/[\u0300-\u036f]/g, '') // Eliminar diacríticos
        .replace(/[^a-zA-Z0-9-_.]/g, '-') // Reemplazar caracteres especiales con guiones
        .replace(/-+/g, '-') // Reemplazar múltiples guiones con uno solo
        .toLowerCase(); // Convertir a minúsculas

    return normalized + ext;
}

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

// Procesar cada directorio
directories.forEach(dir => {
    const contentPath = resolve(__dirname, '../public/content', dir);
    try {
        const files = readdirSync(contentPath);
        files.forEach(file => {
            if (file.endsWith('.md') || file.endsWith('.pdf')) {
                const normalizedName = normalizeFileName(file);
                if (normalizedName !== file) {
                    const oldPath = join(contentPath, file);
                    const newPath = join(contentPath, normalizedName);
                    console.log(`Renombrando: ${file} -> ${normalizedName}`);
                    renameSync(oldPath, newPath);
                }
            }
        });
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.error(`Error procesando directorio ${dir}:`, error);
        }
    }
});

console.log('Nombres de archivos normalizados exitosamente!');