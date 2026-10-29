// Los 8 servicios del sitio actual. Descripciones literales de la clínica (solo se corrigió ortografía).
// Los exámenes de cada servicio salen de content/examenes.js (campo `servicios`).

export const services = [
  {
    slug: 'radiografia-convencional',
    name: 'Radiografía convencional',
    icon: 'bone',
    short: 'Imágenes con rayos X para estudiar huesos, tórax, abdomen y otras estructuras.',
    description: [
      'Técnica de diagnóstico que, utilizando rayos X, permite tomar imágenes de las estructuras internas del cuerpo para estudiar posibles lesiones.',
      'El término radiología digital se utiliza para denominar a la radiología que obtiene imágenes directamente en formato digital, sin haber pasado previamente por una placa de película radiológica.',
    ],
  },
  {
    slug: 'ecografia-y-doppler',
    name: 'Ecografía y Doppler',
    icon: 'waves',
    short: 'Ultrasonido para órganos y tejidos, y Doppler para evaluar el flujo sanguíneo.',
    description: [
      'La ecografía es un método de diagnóstico por imagen que utiliza ondas de sonido de alta frecuencia para visualizar los órganos y tejidos internos del cuerpo. Es no invasiva y se emplea para evaluar el estado de órganos como el hígado, los riñones y el feto durante el embarazo, entre otros.',
      'La ecografía Doppler combina la ultrasonografía con la evaluación del flujo sanguíneo. Utiliza ondas de sonido para crear imágenes de los órganos y tejidos, y mide la cantidad, velocidad y consistencia del flujo de sangre en arterias y venas.',
    ],
  },
  {
    slug: 'mamografia',
    name: 'Mamografía',
    icon: 'ribbon',
    short: 'Rayos X de baja dosis para la detección temprana del cáncer de mama.',
    description: [
      'La mamografía es un tipo específico de toma de imágenes de los senos que utiliza rayos X de baja dosis para detectar en forma temprana el cáncer (antes de que la mujer presente síntomas), cuando es más tratable.',
    ],
  },
  {
    slug: 'densitometria-osea',
    name: 'Densitometría ósea',
    icon: 'gauge',
    short: 'Mide la densidad mineral de los huesos para diagnosticar osteoporosis.',
    description: [
      'La densitometría ósea es una prueba para determinar la densidad mineral ósea. Sirve para medir la densidad de calcio existente en los huesos, por lo que suele utilizarse para el diagnóstico de la osteoporosis o para valorar el riesgo de fracturas.',
    ],
    note: 'Para realizarse una densitometría ósea es necesario solicitar una cita previa.',
  },
  {
    slug: 'tomografia-axial-computada-tac',
    name: 'Tomografía axial computada (TAC)',
    shortName: 'Tomografía (TAC)',
    icon: 'scan',
    short: 'Imágenes detalladas de huesos, tejidos blandos y vasos sanguíneos.',
    description: [
      'La tomografía axial computarizada o TAC permite obtener imágenes detalladas del interior del organismo, huesos, tejidos blandos y vasos sanguíneos, y detectar así desde un tumor hasta una patología ósea.',
    ],
  },
  {
    slug: 'resonancia-magnetica',
    name: 'Resonancia magnética',
    icon: 'magnet',
    short: 'Imágenes del cuerpo con imanes y ondas de radio, sin radiación.',
    description: [
      'La resonancia magnética es un examen imagenológico que utiliza imanes y ondas de radio potentes para crear imágenes del cuerpo. No se emplea radiación (rayos X).',
    ],
  },
  {
    slug: 'urografia-excretora',
    name: 'Urografía excretora',
    icon: 'droplet',
    short: 'Evaluación de riñones, uréteres y vejiga.',
    description: [
      'La urografía excretora, también conocida como pielograma intravenoso, es un examen que se usa para evaluar los riñones, los uréteres y la vejiga.',
    ],
  },
  {
    slug: 'histerosalpingografia',
    name: 'Histerosalpingografía',
    icon: 'venus',
    short: 'Radiografía del útero y las trompas de Falopio.',
    description: [
      'Tipo de radiografía para examinar el útero y las trompas de Falopio de una mujer. Se utiliza para detectar anormalidades dentro del útero y para determinar la presencia y gravedad de masas tumorales, adherencias y fibromas uterinos.',
      'Así se puede determinar si hay problemas para quedar en embarazo e investigar abortos espontáneos.',
    ],
  },
];

export const serviceBySlug = Object.fromEntries(services.map((s) => [s.slug, s]));
