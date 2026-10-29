// Contenido corporativo de Radiólogos Asociados Barrancabermeja S.A.S.
// Fuente: sitio actual https://radiologosasociadosbcabja.com/ (ver docs/inventario-contenido.md).
// Lo marcado `confirmar: true` o `null` aparece en el sitio como pendiente: confírmelo con la clínica
// (hay datos contradictorios en el sitio actual, ver docs/auditoria-sitio-actual.md).

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
  intro:
    'Somos una institución de imagenología diagnóstica al servicio de Barrancabermeja y el Magdalena Medio, con médicos radiólogos especialistas y atención humanizada.',
  region: 'Barrancabermeja y el Magdalena Medio',

  address: {
    street: 'Calle 48 # 24-38',
    neighborhood: 'Barrio El Recreo',
    city: 'Barrancabermeja',
    region: 'Santander',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Calle+48+%2324-38+Barrio+El+Recreo+Barrancabermeja',
  },

  hours: [
    { days: 'Lunes a viernes', time: '7:00 a. m. – 6:00 p. m.', note: 'Jornada continua' },
    { days: 'Sábados', time: '8:00 a. m. – 11:00 a. m.' },
  ],

  // Canales de citas por aseguradora (página Citas del sitio actual)
  appointments: [
    { id: 'nueva-eps', label: 'Nueva EPS', phone: '312 643 3706', whatsapp: '573126433706' },
    { id: 'sanitas-particulares', label: 'Sanitas y particulares', phone: '320 837 3653', whatsapp: '573208373653' },
    { id: 'ecopetrol', label: 'Ecopetrol', phone: '314 425 7145', whatsapp: '573144257145' },
    { id: 'resonancia', label: 'Resonancia magnética', phone: '302 249 7127', whatsapp: '573022497127' },
  ],

  contact: {
    // El sitio actual muestra dos correos y dos WhatsApp distintos: confirmar cuál es el oficial
    email: { value: 'radiologossiaubca@gmail.com', confirmar: true },
    phone: { value: '320 837 3653', href: 'tel:+573208373653' },
    landline: { value: '(607) 622 1389', href: 'tel:+576076221389', confirmar: true },
    whatsapp: { value: '302 249 7127', number: '573022497127', confirmar: true },
  },

  results: {
    portalUrl: 'https://radiologosasociados-bcabja.visualmedica.com:2053/PATIENTPORTAL/',
    guideUrl: 'https://drive.google.com/file/d/1m4vPfVhYf-YY7zCThRikymDe4-jFtbPJ/view?usp=sharing',
  },
  reviewUrl: 'https://g.page/r/CQMQ0TkkYKtfEBM/review',
  social: {
    facebook: 'https://www.facebook.com/radiologos.asociados.5/',
    instagram: 'https://www.instagram.com/radiologos.asociados.5/',
  },
};

export const whatsappUrl = (number, text = 'Hola, quiero agendar una cita.') =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
