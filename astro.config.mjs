import { defineConfig } from 'astro/config';
import { fileURLToPath, URL } from 'node:url';
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
  adapter: vercel(),
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});
