import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Configurar el servidor para manejar las rutas correctamente
    historyApiFallback: true
  }
});