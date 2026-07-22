import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://cmorales.me',
  // Old multi-page routes now live on the single-page home.
  redirects: {
    '/about': '/',
    '/projects': '/#projects',
  },
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [sitemap()]
});
