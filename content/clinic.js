// Contenido institucional del sitio actual (Nosotros, Inicio, Seguridad del paciente, Noticias).
// Texto literal de la clínica; solo se corrigió ortografía. Lo no confirmado queda como pendiente.

export const about = {
  history:
    'Radiólogos Asociados Barrancabermeja S.A.S. fue creada en 2010, iniciando con dos médicos radiólogos comprometidos y los servicios básicos de Radiología y Ecografía. A la fecha, somos una institución médica comprometida con la atención integral del paciente, cuyo propósito es prestar un servicio en Imagenología Diagnóstica y Consulta Especializada a la población de Barrancabermeja y a nivel regional en el Magdalena Medio.',
  founded: 2010,
  mission:
    'Somos una organización médica cuyo propósito es prestar un servicio en Imagenología Diagnóstica y Consulta Especializada a la población de Barrancabermeja y a nivel regional en el Magdalena Medio, brindando un servicio de alta calidad, confiable, seguro, oportuno y eficaz a sus usuarios, procurando conseguir y mantener un estado de salud óptimo con lo cual se logra una mejor calidad de vida.',
  vision:
    'Ser reconocidos a nivel regional en el Magdalena Medio como una empresa médica líder en Imagenología Diagnóstica y Consulta Especializada, brindando la máxima satisfacción a nuestros usuarios y sus familiares, mediante un equipo humano talentoso, idóneo y competitivo, apoyados en la mejor tecnología disponible y en pleno cumplimiento de nuestra responsabilidad social.',
  qualityPolicy:
    'Garantizar la satisfacción de las expectativas y requerimientos de nuestros clientes y de la organización a través del suministro de productos y servicios de excelente calidad en el campo de imágenes diagnósticas, contando con el respaldo y garantía de proveedores cuidadosamente seleccionados, utilizando tecnología de punta con personal altamente calificado y motivado que promueve los valores, generando un excelente clima organizacional, orientado hacia el mejoramiento continuo e innovación de nuestros procesos, generando confianza a la comunidad y a los entes de control.',
  integral:
    'Radiólogos Asociados Barrancabermeja S.A.S., integrada por un equipo idóneo de médicos especializados, se ocupa y centra su atención en crecer cada vez más en todos los campos, para poder brindarle excelencia en imágenes diagnósticas y, a través de ellas, satisfacer sus necesidades en el campo de la salud.',
};

// "¿Por qué elegirnos?" del inicio actual
export const reasons = [
  { icon: 'users', title: 'Médicos especializados en imágenes diagnósticas', text: 'Encontrará a su servicio radiólogos altamente capacitados y confiables.' },
  { icon: 'scan', title: 'Tecnología de punta', text: 'Ponemos a su servicio equipos de última generación para obtener las mejores imágenes que apoyarán su diagnóstico.' },
  { icon: 'clock', title: 'Atentos a sus necesidades', text: 'Contamos con un equipo de profesionales con años de experiencia que se compromete genuinamente con su salud.' },
  { icon: 'clipboard', title: 'Diagnóstico individualizado', text: 'Cada paciente es único; por eso su diagnóstico es estudiado e individualizado.' },
  { icon: 'heart', title: 'Enfoque centrado en usted', text: 'Su salud y bienestar son nuestras prioridades: nos tomamos el tiempo para escuchar sus inquietudes y resolver sus dudas.' },
];

// Especialidad, registro y foto pendientes de confirmar (la foto del sitio actual no coincide en un caso)
export const doctors = [
  { name: 'Álvaro Pio Rodado Galindo' },
  { name: 'Julio David Evan Knepper' },
  { name: 'Carlos Augusto Rendón Ruíz' },
  { name: 'German Ardila Durán' },
];
export const doctorsRole = 'Especialista en imágenes diagnósticas';

// Reseñas publicadas en el sitio actual
export const testimonials = [
  {
    quote:
      'El servicio de Radiólogos es excelente y el personal muy competente; la dificultad de lo que hacen requiere tiempo y son únicos en Barrancabermeja. Gracias por prestar el mejor servicio de resonancia. Y referente a los tiempos, muy cumplidos en la entrega de los resultados.',
    author: 'Paciente',
  },
  {
    quote:
      'Excelente lugar en Barrancabermeja para atención en cuanto a mamografía, ecografía y Doppler, urografía, densitometría ósea, tomografía axial computarizada, entre otros, con gran calidad en el servicio y excelentes profesionales que garantizan resultados confiables.',
    author: 'Andrea del Pilar',
  },
];

export const patientSafety = {
  intro:
    'Radiólogos Asociados Barrancabermeja S.A.S. y su alta gerencia se comprometen con la seguridad del paciente durante la prestación de sus servicios de imagenología diagnóstica, promoviendo la implementación de las siguientes estrategias:',
  strategies: [
    'Instituir una cultura de seguridad del paciente: justa, educativa y no punitiva, pero sin tolerar la irresponsabilidad.',
    'Reducir la incidencia de incidentes y eventos adversos.',
    'Fomentar un entorno seguro de la atención.',
    'Educar, capacitar, entrenar y motivar al personal para la seguridad del paciente.',
  ],
  sst: {
    paragraphs: [
      'La política en materia de higiene, seguridad, salud ocupacional y medio ambiente es esencial para demostrar el compromiso de la empresa en este aspecto.',
      'La política de prevención de la empresa expresa las creencias, expectativas y metas de la organización en cuanto a la mejora continua de las condiciones de trabajo, el control de riesgos y la prevención de la contaminación del medio ambiente.',
      'Estamos comprometidos con la salud y seguridad de los trabajadores y el medio ambiente, estimando necesario que:',
    ],
    commitments: [
      'Llevemos a cabo nuestras operaciones de forma apropiada en cuanto a la seguridad, salud laboral, control de daños y prevención de la contaminación, cumpliendo con la legislación vigente.',
      'La alta gerencia ejerza el liderazgo necesario para lograr los objetivos, y todos los trabajadores realicen una labor responsable y segura que cumpla las normas y procedimientos establecidos.',
      'Se identifiquen, evalúen y controlen los riesgos para la salud y los aspectos ambientales que puedan ocasionar lesiones, enfermedades laborales o contaminación al medio ambiente.',
      'La gerencia apoye con los medios y recursos necesarios para la implementación de las acciones requeridas.',
    ],
  },
};

export const news = [
  {
    slug: 'campana-prevencion-cancer-de-mama',
    title: 'Campaña de prevención del cáncer de mama',
    date: '2024-10-18',
    image: 'noticias/campana-cancer-portada.webp',
    excerpt:
      'Radiólogos Asociados Barrancabermeja incentiva la campaña de prevención en contra del cáncer de mama, con tarifas especiales en mamografía durante el mes.',
    body: [
      'Radiólogos Asociados Barrancabermeja S.A.S., a la vanguardia y líder en imágenes diagnósticas en el Magdalena Medio, incentiva la campaña de prevención en contra del cáncer de mama.',
      'Radiólogos Asociados Barrancabermeja S.A.S. apoya a las diversas entidades de salud de la ciudad de Barrancabermeja, socializando e ilustrando entre sus pacientes la importancia del autoexamen de seno como el primer paso primordial para la detección del cáncer de mama, al igual que el agendamiento de los estudios de rigor, como son la mamografía y la ecografía mamaria.',
      'Durante el mes de la campaña la clínica ofreció tarifas especiales en mamografía.',
    ],
    gallery: [
      { src: 'noticias/campana-cancer-1.webp', alt: 'Empleada de Radiólogos Asociados sosteniendo un afiche de la campaña de prevención del cáncer de mama.' },
      { src: 'noticias/campana-cancer-2.webp', alt: 'Empleadas de Radiólogos Asociados sonriendo con una usuaria durante la campaña de concienciación sobre el cáncer de mama.' },
      { src: 'noticias/campana-cancer-3.webp', alt: 'Empleada de Radiólogos Asociados entregando un volante a usuarias sentadas en sillas.' },
      { src: 'noticias/campana-cancer-4.webp', alt: 'Empleada de Radiólogos Asociados conversando con usuarias mientras entrega volantes.' },
    ],
  },
];
