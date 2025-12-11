// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@components': '/src/components',
        '@ui': '/src/components/ui',
        '@shared': '/src/components/shared',
        '@layout': '/src/components/layout',
        '@pages': '/src/components/pages',
        '@styles': '/src/styles',
        '@utils': '/src/utils',
        '@lib': '/src/lib',
        '@assets': '/src/assets',
      }
    }
  }
});
