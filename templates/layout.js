// Documento base compartido por todas las páginas.
import { html, raw } from './html.js';
import { site } from '../content/site.js';
import { paths, asset, withBase } from './paths.js';

// `path` ya incluye la subcarpeta (/radiologossa/...), así que se resuelve contra el origen de site.url
export const absolute = (path) => new URL(path, site.url).href;

// Activa animaciones solo si el usuario no pidió movimiento reducido; si el JS no carga, el contenido nunca queda oculto.
const motionFlag = `(function(){var d=document.documentElement;d.classList.add('js');if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('motion')},2500)}})();`;

export function layout({ title, description, path, noindex = false, body }) {
  const fullTitle = path === paths.home ? `${site.name} | ${site.tagline}` : `${title} | ${site.shortName}`;
  const url = absolute(path);
  return html`<!doctype html>
<html lang="${site.lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${fullTitle}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${url}" />
    ${noindex ? raw('<meta name="robots" content="noindex" />') : ''}
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="es_CO" />
    <meta property="og:site_name" content="${site.name}" />
    <meta property="og:title" content="${fullTitle}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${absolute(withBase('brand/logo.png'))}" />
    <link rel="icon" type="image/png" sizes="32x32" href="${asset('brand/favicon-32.png')}" />
    <link rel="apple-touch-icon" href="${asset('brand/apple-touch-icon.png')}" />
    <meta name="theme-color" content="#0294db" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Figtree:wght@500;600;700;800&family=Noto+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap"
    />
    <script>${raw(motionFlag)}</script>
    <link rel="stylesheet" href="/src/main.css" />
    <script type="module" src="/src/main.js"></script>
  </head>
  <body class="bg-canvas font-sans text-ink-900 antialiased">
    <a href="#contenido" class="skip-link">Saltar al contenido</a>
    <main id="contenido" tabindex="-1">${body}</main>
  </body>
</html>
`.toString();
}
