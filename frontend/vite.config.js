import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // ⚠️ IMPORTANTE: Cambia '/To-Do_Personal/' por el nombre exacto de tu repositorio en GitHub
  base: '/To-Do_Personal/',
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: 'dist',
  },
});