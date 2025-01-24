// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readdirSync } from 'fs';
import { resolve, join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function getContentFiles(dir) {
  const contentPath = resolve(__dirname, 'public/content', dir);
  try {
    return readdirSync(contentPath)
      .filter(file => file.endsWith('.md') || file.endsWith('.pdf'))
      .map(file => {
        const slug = file.replace(/\.(md|pdf)$/, '');
        const match = slug.match(/^(clase|caso)-(\d+)-(.+)$/);

        if (match) {
          return {
            slug,
            title: `${match[1].charAt(0).toUpperCase() + match[1].slice(1)} ${match[2]}: ${match[3].replace(/-/g, ' ')}`,
            order: parseInt(match[2]),
            isPdf: file.endsWith('.pdf')
          };
        }

        // Procesar títulos de la sección "others"
        if (dir === 'others' && slug.toLowerCase().startsWith('otros -')) {
          return {
            slug,
            title: slug.replace(/^otros -\s*/i, '').replace(/-/g, ' '),
            order: 0,
            isPdf: file.endsWith('.pdf')
          };
        }

        return {
          slug,
          title: slug.replace(/-/g, ' '),
          order: 0,
          isPdf: file.endsWith('.pdf')
        };
      })
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
    return [];
  }
}

// Generar el contenido inicial
const contentMap = {
  classes: getContentFiles('classes'),
  cases: getContentFiles('cases'),
  tests: getContentFiles('tests'),
  others: getContentFiles('others')
};

// Escribir el contenido a un archivo JSON
import { writeFileSync } from 'fs';
writeFileSync(
  'public/content/content-map.json',
  JSON.stringify(contentMap, null, 2)
);

export default defineConfig({
  plugins: [react()]
});