import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://peacefulcatt.github.io',
  base: '/react_portfolio',
  integrations: [react()],
  vite: {
    css: {
      transformer: 'postcss',
    },
  },
});
