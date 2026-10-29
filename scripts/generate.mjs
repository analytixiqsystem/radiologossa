// Genera las páginas HTML estáticas en /site a partir de /content y /templates.
// Se ejecuta automáticamente desde vite.config.js (dev y build); también: `npm run generate`.
import { mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { site } from '../content/site.js';
import { paths, stripBase, withBase } from '../templates/paths.js';
import { homePage } from '../templates/pages/home.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const manifestFile = join(root, '.generated.json');

const pages = [{ path: paths.home, render: homePage, priority: '1.0' }];

// Las rutas públicas incluyen la subcarpeta (/radiologossa/...); en disco se escriben desde la raíz de /site
const fileFor = (page) => page.file || join(stripBase(page.path), 'index.html');

// Elimina las páginas generadas en la ejecución anterior (por si se renombró un slug)
if (existsSync(manifestFile)) {
  for (const file of JSON.parse(readFileSync(manifestFile, 'utf8'))) rmSync(join(root, file), { force: true });
}

const written = [];
for (const page of pages) {
  const file = fileFor(page);
  const target = join(root, file);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, page.render());
  written.push(file.replaceAll('\\', '/'));
}
writeFileSync(manifestFile, JSON.stringify(written, null, 2));

// SEO: sitemap y robots
const today = new Date().toISOString().slice(0, 10);
const urls = pages
  .filter((p) => p.sitemap !== false)
  .map((p) => `  <url><loc>${new URL(p.path, site.url).href}</loc><lastmod>${today}</lastmod><priority>${p.priority}</priority></url>`)
  .join('\n');
const publicDir = join(root, 'public');
mkdirSync(publicDir, { recursive: true });
writeFileSync(
  join(publicDir, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
writeFileSync(
  join(publicDir, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${new URL(withBase('sitemap.xml'), site.url).href}\n`,
);

console.log(`[generate] ${written.length} páginas generadas en /site`);
