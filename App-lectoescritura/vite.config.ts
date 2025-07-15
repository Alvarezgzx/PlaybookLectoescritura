import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  // La base DEBE coincidir con la ruta donde vive la aplicación.
  base: '/asistente-ia/', 
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});