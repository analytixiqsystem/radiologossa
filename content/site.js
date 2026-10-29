// Contenido corporativo de Radiólogos Asociados Barrancabermeja S.A.S.
// Fuente: sitio actual https://radiologosasociadosbcabja.com/ (ver docs/inventario-contenido.md).
// Los valores `null` se muestran en el sitio como placeholders visibles: confírmelos con la clínica.

export const site = {
  name: 'Radiólogos Asociados Barrancabermeja S.A.S.',
  shortName: 'Radiólogos Asociados',
  tagline: 'Detectar a tiempo, es tiempo.',
  // Subcarpeta de GitHub Pages: https://analytixiqsystem.github.io/radiologossa/ (debe coincidir con el repositorio).
  basePath: process.env.BASE_PATH || '/radiologossa/',
  url: process.env.SITE_URL || 'https://analytixiqsystem.github.io/radiologossa/',
  lang: 'es',
  description:
    'Centro de diagnóstico por imágenes en Barrancabermeja: radiografía, ecografía y Doppler, mamografía, densitometría, tomografía y resonancia magnética.',
};
