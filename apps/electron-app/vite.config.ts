import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const { default: tailwindcss } = await import('@tailwindcss/vite');

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '@features': resolve(__dirname, './src/features'),
        '@components': resolve(__dirname, './src/components'),
        '@utils': resolve(__dirname, './src/utils'),
      },
    },
    base: './',
    server: {
      port: 3000,
    },
    build: {
      outDir: 'dist/renderer',
      emptyOutDir: true,
    },
  };
});
