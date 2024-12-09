import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
  build: {
    rollupOptions: {
      external: ["react-router-dom"], // Укажите, что эта зависимость не должна бандлиться
    },
  },
  optimizeDeps: {
    include: ["react-router-dom"], // Добавьте зависимость в список оптимизации
  },
});
