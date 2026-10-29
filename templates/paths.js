// Rutas públicas del sitio (todas con barra final: cada página es /ruta/index.html).
// Todas incluyen la subcarpeta de publicación (site.basePath), p. ej. /radiologossa/servicios/.
import { site } from '../content/site.js';

const base = site.basePath.endsWith('/') ? site.basePath : `${site.basePath}/`;

/** Antepone la subcarpeta de publicación a una ruta interna ('servicios/' → '/radiologossa/servicios/'). */
export const withBase = (route = '') => base + route.replace(/^\//, '');

/** Convierte una ruta pública en la ruta relativa a la raíz del sitio generado ('/radiologossa/servicios/' → 'servicios/'). */
export const stripBase = (path) => (path.startsWith(base) ? path.slice(base.length) : path.replace(/^\//, ''));

/**
 * Archivo de /site/public referenciado en atributos que Vite procesa (img src, link href).
 * Vite antepone la subcarpeta por su cuenta, en dev y en build; anteponerla aquí la duplicaría.
 * Para URLs absolutas (og:image, JSON-LD), enlaces <a> a archivos y <image> de SVG use withBase().
 */
export const asset = (file) => `/${file.replace(/^\//, '')}`;

export const paths = {
  home: withBase(),
  services: withBase('servicios/'),
  service: (slug) => withBase(`servicios/${slug}/`),
  prep: withBase('preparacion/'),
  exam: (slug) => withBase(`preparacion/${slug}/`),
  appointments: withBase('citas/'),
  results: withBase('resultados/'),
  about: withBase('nosotros/'),
  patient: withBase('atencion-al-usuario/'),
  pqrs: withBase('atencion-al-usuario/pqrs/'),
  safety: withBase('atencion-al-usuario/seguridad-del-paciente/'),
  privacy: withBase('atencion-al-usuario/politica-de-datos/'),
  news: withBase('noticias/'),
  post: (slug) => withBase(`noticias/${slug}/`),
  contact: withBase('contacto/'),
};
