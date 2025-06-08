import tailwindcss from '@tailwindcss/vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    tailwindcss(),
    react()
  ],
  resolve: {
    alias: {
      '@ui': path.resolve(__dirname, './src/ui'),
    },
  },
})
