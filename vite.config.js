import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve, sep } from 'node:path';
import { site } from './content/site.js';

const root = resolve(import.meta.dirname, 'site');
const watched = ['content', 'templates'].map((dir) => resolve(import.meta.dirname, dir) + sep);

// Se ejecuta en un proceso aparte para que cada regeneración lea los módulos de contenido actualizados.
function generate() {
  execFileSync(process.execPath, [resolve(import.meta.dirname, 'scripts/generate.mjs')], { stdio: 'inherit' });
}

/** Genera las páginas antes de arrancar y las regenera al editar contenido o plantillas. */
function staticPages() {
  return {
    name: 'static-pages',
    config() {
      generate();
      const pages = JSON.parse(readFileSync(resolve(root, '.generated.json'), 'utf8'));
      return {
        build: {
          rollupOptions: {
            input: Object.fromEntries(pages.map((file) => [file.replace(/\/?index\.html$|\.html$/, '') || 'home', resolve(root, file)])),
          },
        },
      };
    },
    configureServer(server) {
      server.watcher.add(watched);
      server.watcher.on('change', (file) => {
        if (!watched.some((dir) => file.startsWith(dir))) return;
        try {
          generate();
          server.ws.send({ type: 'full-reload' });
        } catch (error) {
          server.config.logger.error(`[generate] ${error.message}`);
        }
      });
    },
  };
}

export default defineConfig({
  root,
  // Subcarpeta de GitHub Pages (/radiologossa/); el servidor local usa la misma para que dev y producción coincidan
  base: site.basePath,
  appType: 'mpa',
  plugins: [staticPages(), tailwindcss()],
  build: {
    outDir: resolve(import.meta.dirname, 'dist'),
    emptyOutDir: true,
  },
});
