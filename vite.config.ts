import {defineConfig} from 'vite';
import {resolve} from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        services: resolve(__dirname, 'services.html'),
        contact: resolve(__dirname, 'contact.html'),
        portfolio: resolve(__dirname, 'portfolio.html'),
        project: resolve(__dirname, 'project.html')
      }
    }
  },
  server: {
    hmr: process.env.DISABLE_HMR !== 'true',
  }
});
