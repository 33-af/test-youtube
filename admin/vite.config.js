import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["react-router-dom", "axios"], // Объединяем зависимости в один массив
    },
  },
  server: {
    port: 5174, // Порт для локального сервера
  },
});
