import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["react-router-dom"], // Указываем react-router-dom как внешнюю зависимость
    },
  },
  server: {
    port: 5173, // Порт для локального сервера
  },
});
