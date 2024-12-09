import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Указываем порт для dev-сервера
  },
  build: {
    rollupOptions: {
      external: ["react-router-dom"], // Указываем react-router-dom как внешнюю зависимость
    },
  },
});
