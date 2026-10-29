// Documento base, cabecera, pie y botón flotante de citas, compartidos por todas las páginas.
import { html, raw, cx } from './html.js';
import { icon } from './icons.js';
import { paths, asset, withBase } from './paths.js';
import { site, whatsappUrl } from '../content/site.js';
import { services } from '../content/services.js';
import { confirmMark } from './components.js';

// `path` ya incluye la subcarpeta (/radiologossa/...), así que se resuelve contra el origen de site.url
export const absolute = (path) => new URL(path, site.url).href;

// Activa animaciones solo si el usuario no pidió movimiento reducido; si el JS no carga, el contenido nunca queda oculto.
const motionFlag = `(function(){var d=document.documentElement;d.classList.add('js');if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('motion');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('motion')},2500)}})();`;

const patientLinks = [
  { href: paths.pqrs, label: 'PQRS', text: 'Peticiones, quejas, reclamos y sugerencias' },
  { href: paths.safety, label: 'Seguridad del paciente', text: 'Nuestra política y compromisos' },
  { href: paths.privacy, label: 'Política de datos', text: 'Tratamiento de datos personales' },
  { href: site.reviewUrl, label: 'Califique nuestro servicio', text: 'Déjenos su opinión en Google', external: true },
];

/* ---------- Cabecera ---------- */

const navLink = 'inline-flex min-h-11 items-center gap-1 rounded-lg px-3 font-display text-[0.97rem] font-semibold text-ink-700 transition-colors hover:text-brand-700 aria-[current=page]:text-brand-700';

function dropdown({ id, label, current, links, wide }) {
  return html`
    <li class="relative" data-dropdown>
      <button type="button" class="${navLink} cursor-pointer" aria-expanded="false" aria-controls="menu-${id}" ${current ? raw('aria-current="page"') : ''} data-dropdown-trigger>
        ${label} ${icon('chevron-down', 'size-4 transition-transform duration-200 [[aria-expanded=true]>&]:rotate-180')}
      </button>
      <div id="menu-${id}" class="dropdown-panel absolute top-full left-1/2 -translate-x-1/2 pt-3 ${wide ? 'w-[36rem]' : 'w-80'}" hidden data-dropdown-panel>
        <ul class="${cx('grid gap-1 rounded-2xl border border-line bg-white p-2 shadow-[0_24px_50px_-24px_rgb(11_37_64/0.4)]', wide && 'grid-cols-2')}">
          ${links.map(
            (l) => html`
              <li>
                <a href="${l.href}" class="flex items-start gap-3 rounded-xl p-3 hover:bg-brand-50" ${l.external ? raw('target="_blank" rel="noopener"') : ''}>
                  ${l.icon ? html`<span class="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-100 text-brand-700">${icon(l.icon, 'size-5')}</span>` : ''}
                  <span>
                    <span class="flex items-center gap-1.5 font-display font-bold text-ink-900">${l.label} ${l.external ? icon('external-link', 'size-3.5 text-ink-500') : ''}</span>
                    ${l.text ? html`<span class="block text-sm leading-snug text-ink-500">${l.text}</span>` : ''}
                  </span>
                </a>
              </li>
            `,
          )}
        </ul>
      </div>
    </li>
  `;
}

function header(section) {
  const cur = (name) => (section === name ? raw('aria-current="page"') : '');
  const serviceLinks = [
    ...services.map((s) => ({ href: paths.service(s.slug), label: s.shortName || s.name, icon: s.icon })),
  ];
  const mobileLinks = [
    { href: paths.services, label: 'Servicios' },
    { href: paths.prep, label: 'Preparación de exámenes' },
    { href: paths.results, label: 'Resultados' },
    { href: paths.about, label: 'Nosotros' },
    { href: paths.patient, label: 'Atención al usuario' },
    { href: paths.news, label: 'Noticias' },
    { href: paths.contact, label: 'Contacto' },
  ];

  return html`
    <a href="#contenido" class="skip-link">Saltar al contenido</a>
    <header id="site-header" class="sticky top-0 z-50 border-b border-line/0 bg-white/90 backdrop-blur-xl transition-[border-color,box-shadow] duration-300 data-[scrolled=true]:border-line data-[scrolled=true]:shadow-[0_8px_30px_-20px_rgb(11_37_64/0.35)]" data-scrolled="false">
      <div class="mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <a href="${paths.home}" class="shrink-0 rounded-lg" aria-label="${site.name}, ir al inicio">
          <img src="${asset('brand/logo.webp')}" alt="" width="1619" height="497" class="h-11 w-auto sm:h-12" />
        </a>
        <nav aria-label="Principal" class="hidden xl:block">
          <ul class="flex items-center">
            ${dropdown({ id: 'servicios', label: 'Servicios', current: section === 'services', links: [...serviceLinks, { href: paths.services, label: 'Todos los servicios' }], wide: true })}
            <li><a href="${paths.prep}" class="${navLink}" ${cur('prep')}>Preparación</a></li>
            <li><a href="${paths.results}" class="${navLink}" ${cur('results')}>Resultados</a></li>
            <li><a href="${paths.about}" class="${navLink}" ${cur('about')}>Nosotros</a></li>
            ${dropdown({ id: 'atencion', label: 'Atención al usuario', current: section === 'patient', links: patientLinks })}
            <li><a href="${paths.contact}" class="${navLink}" ${cur('contact')}>Contacto</a></li>
          </ul>
        </nav>
        <div class="flex items-center gap-2">
          <a href="${paths.appointments}" class="btn btn-go hidden min-h-11 px-5 text-[0.95rem] sm:inline-flex">${icon('calendar', 'size-5')} Agendar cita</a>
          <button type="button" class="grid size-11 cursor-pointer place-items-center rounded-lg text-ink-900 hover:bg-brand-50 xl:hidden" aria-expanded="false" aria-controls="mobile-menu" aria-label="Abrir menú" data-mobile-toggle>
            ${icon('menu', 'size-6')}
          </button>
        </div>
      </div>
    </header>
    <div id="mobile-menu" class="fixed inset-x-0 top-[4.5rem] bottom-0 z-40 overflow-y-auto bg-white px-5 pb-10 xl:hidden" hidden data-mobile-menu>
      <nav aria-label="Principal móvil" class="mx-auto max-w-xl pt-2">
        <ul>
          ${mobileLinks.map(
            (l) => html`<li><a href="${l.href}" class="flex min-h-14 items-center justify-between border-b border-line font-display text-lg font-bold text-ink-900">${l.label} ${icon('chevron-right', 'size-5 text-ink-500')}</a></li>`,
          )}
        </ul>
        <a href="${paths.appointments}" class="btn btn-go mt-8 w-full">${icon('calendar', 'size-5')} Agendar cita</a>
        <a href="${site.results.portalUrl}" target="_blank" rel="noopener" class="btn btn-outline mt-3 w-full">${icon('download', 'size-5')} Descargar resultados</a>
      </nav>
    </div>
  `;
}

/* ---------- Botón flotante de citas por WhatsApp ---------- */

function whatsappFab() {
  return html`
    <div class="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6" data-fab>
      <div id="fab-panel" class="fab-panel absolute right-0 bottom-full mb-3 w-72 rounded-2xl border border-line bg-white p-3 shadow-[0_24px_50px_-20px_rgb(11_37_64/0.45)]" hidden data-fab-panel>
        <p class="px-2 pt-1 pb-2 font-display font-bold text-ink-900">Agendar por WhatsApp</p>
        <ul class="space-y-1">
          ${site.appointments.map(
            (a) => html`
              <li>
                <a href="${whatsappUrl(a.whatsapp, `Hola, quiero agendar una cita (${a.label}).`)}" target="_blank" rel="noopener" class="flex min-h-11 items-center justify-between gap-3 rounded-xl px-3 hover:bg-brand-50">
                  <span class="font-semibold text-ink-900">${a.label}</span>
                  <span class="text-sm whitespace-nowrap text-ink-500">${a.phone}</span>
                </a>
              </li>
            `,
          )}
        </ul>
      </div>
      <button type="button" class="fab-btn" aria-expanded="false" aria-controls="fab-panel" data-fab-toggle>
        ${icon('message', 'size-7')}
        <span class="sr-only">Agendar cita por WhatsApp</span>
      </button>
    </div>
  `;
}

/* ---------- Pie ---------- */

function footer() {
  const col = (title, links) => html`
    <div>
      <h2 class="font-display text-sm font-bold uppercase tracking-wider text-white/60">${title}</h2>
      <ul class="mt-4 space-y-1">
        ${links.map(
          (l) => html`<li><a href="${l.href}" class="inline-flex min-h-9 items-center gap-1.5 text-white/85 hover:text-white hover:underline" ${l.external ? raw('target="_blank" rel="noopener"') : ''}>${l.label}</a></li>`,
        )}
      </ul>
    </div>
  `;
  return html`
    <footer class="bg-brand-900 text-white">
      <div class="mx-auto max-w-6xl px-5 pt-16 pb-10 sm:px-6 lg:px-8">
        <div class="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <img src="${asset('brand/logo-dark.webp')}" alt="${site.name}" width="1619" height="497" loading="lazy" class="h-14 w-auto" />
            <p class="mt-5 max-w-sm text-white/80">${site.intro}</p>
            <ul class="mt-6 space-y-3 text-white/90">
              <li class="flex gap-3">${icon('map-pin', 'mt-1 size-5 shrink-0 text-brand-400')}
                <a href="${site.address.mapsUrl}" target="_blank" rel="noopener" class="hover:underline">${site.address.street}, ${site.address.neighborhood}, ${site.address.city}</a></li>
              <li class="flex gap-3">${icon('phone', 'mt-1 size-5 shrink-0 text-brand-400')}
                <span><a href="${site.contact.phone.href}" class="hover:underline">${site.contact.phone.value}</a> · <a href="${site.contact.landline.href}" class="hover:underline">${site.contact.landline.value}</a>${confirmMark(site.contact.landline)}</span></li>
              <li class="flex gap-3">${icon('mail', 'mt-1 size-5 shrink-0 text-brand-400')}
                <span><a href="mailto:${site.contact.email.value}" class="break-all hover:underline">${site.contact.email.value}</a>${confirmMark(site.contact.email)}</span></li>
              <li class="flex gap-3">${icon('clock', 'mt-1 size-5 shrink-0 text-brand-400')}
                <span>${site.hours.map((h) => `${h.days}: ${h.time}`).join(' · ')}</span></li>
            </ul>
          </div>
          <div class="grid grid-cols-2 gap-10 sm:grid-cols-3">
            ${col('Servicios', services.map((s) => ({ href: paths.service(s.slug), label: s.shortName || s.name })))}
            ${col('Pacientes', [
              { href: paths.appointments, label: 'Agendar cita' },
              { href: paths.prep, label: 'Preparación de exámenes' },
              { href: paths.results, label: 'Resultados' },
              { href: paths.pqrs, label: 'PQRS' },
              { href: paths.safety, label: 'Seguridad del paciente' },
              { href: paths.privacy, label: 'Política de datos' },
            ])}
            ${col('Clínica', [
              { href: paths.about, label: 'Nosotros' },
              { href: paths.news, label: 'Noticias' },
              { href: paths.contact, label: 'Contacto' },
              { href: site.social.facebook, label: 'Facebook', external: true },
              { href: site.social.instagram, label: 'Instagram', external: true },
            ])}
          </div>
        </div>
        <div class="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/65 md:flex-row md:items-center md:justify-between">
          <p>© <span data-year>${new Date().getFullYear()}</span> ${site.name}</p>
          <p>${site.tagline}</p>
        </div>
      </div>
    </footer>
  `;
}

export function layout({ title, description, path, section, jsonLd = [], noindex = false, body }) {
  const fullTitle = path === paths.home ? `${site.name} | Diagnóstico por imágenes en Barrancabermeja` : `${title} | ${site.shortName}`;
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
    ${jsonLd.map((data) => html`<script type="application/ld+json">${raw(JSON.stringify(data))}</script>`)}
  </head>
  <body class="bg-canvas font-sans text-ink-900 antialiased">
    ${header(section)}
    <main id="contenido" tabindex="-1">${body}</main>
    ${footer()}
    ${whatsappFab()}
  </body>
</html>
`.toString();
}

/** Datos estructurados de la clínica (SEO local). */
export const clinicJsonLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'MedicalClinic',
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: absolute(paths.home),
  logo: absolute(withBase('brand/icon-512.png')),
  image: absolute(withBase('brand/logo.png')),
  telephone: '+57 ' + site.contact.phone.value,
  address: {
    '@type': 'PostalAddress',
    streetAddress: `${site.address.street}, ${site.address.neighborhood}`,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    addressCountry: 'CO',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '11:00' },
  ],
  medicalSpecialty: 'Radiography',
  sameAs: [site.social.facebook, site.social.instagram],
});

export const breadcrumbJsonLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({ '@type': 'ListItem', position: i + 1, name: item.label, item: absolute(item.href) })),
});
