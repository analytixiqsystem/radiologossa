import { html } from '../html.js';
import { icon } from '../icons.js';
import { layout, clinicJsonLd } from '../layout.js';
import { paths, asset } from '../paths.js';
import { animatedLogo } from '../logo.js';
import { section, sectionHeader, serviceCard, textLink, button, hoursList, mapEmbed, doctorCard, ctaBand } from '../components.js';
import { site } from '../../content/site.js';
import { services } from '../../content/services.js';
import { examenes } from '../../content/examenes.js';
import { about, reasons, doctors, doctorsRole, testimonials, news } from '../../content/clinic.js';

const conPreparacion = examenes.filter((e) => e.requierePreparacion);
const countFor = (slug) => examenes.filter((e) => e.servicios.includes(slug)).length;

function actionCard({ iconName, tone, title, text, href, label, external }) {
  const tones = { go: 'bg-go-600 text-white', brand: 'bg-brand-600 text-white', soft: 'bg-brand-100 text-brand-700' };
  return html`
    <article class="action-card group" data-hero-item>
      <span class="grid size-12 place-items-center rounded-2xl ${tones[tone]}">${icon(iconName, 'size-6')}</span>
      <h2 class="mt-3 font-display text-xl font-bold text-ink-900">
        <a href="${href}" ${external ? html`target="_blank" rel="noopener"` : ''}>${title}</a>
      </h2>
      <p class="text-[0.98rem] leading-snug text-ink-500">${text}</p>
      <span class="mt-auto inline-flex items-center gap-1.5 pt-3 font-display text-[0.95rem] font-bold text-brand-600" aria-hidden="true">
        ${label} ${icon(external ? 'external-link' : 'arrow-right', 'size-4 transition-transform duration-200 group-hover:translate-x-1')}
      </span>
    </article>
  `;
}

function hero() {
  return html`
    <section class="relative isolate overflow-hidden bg-gradient-to-b from-white via-brand-50 to-canvas" aria-labelledby="hero-title">
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div class="scan-grid absolute inset-0"></div>
        <div class="absolute -top-40 left-1/2 size-[46rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl"></div>
        <div class="scan-beam" data-scan-beam></div>
      </div>
      <div class="relative mx-auto max-w-6xl px-5 pt-10 pb-16 text-center sm:px-6 sm:pt-14 lg:pb-20">
        <div class="mx-auto w-full max-w-3xl">${animatedLogo()}</div>
        <p class="eyebrow mt-10 justify-center" data-hero-item>Diagnóstico por imágenes<span class="hidden sm:inline">&nbsp;· ${site.region}</span></p>
        <h1 id="hero-title" class="mx-auto mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-balance text-ink-900 sm:text-5xl lg:text-6xl" data-hero-item>
          ${site.tagline}
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-lg text-pretty text-ink-700 sm:text-xl" data-hero-item>${site.intro}</p>
        <div class="mx-auto mt-12 grid max-w-5xl gap-4 text-left sm:grid-cols-3">
          ${actionCard({ iconName: 'calendar', tone: 'go', title: 'Agendar cita', text: 'Escríbanos por WhatsApp o llámenos según su aseguradora.', href: paths.appointments, label: 'Ver canales de citas' })}
          ${actionCard({ iconName: 'download', tone: 'brand', title: 'Descargar resultados', text: 'Consulte sus resultados en el portal de pacientes.', href: paths.results, label: 'Cómo consultarlos' })}
          ${actionCard({ iconName: 'clipboard', tone: 'soft', title: 'Prepárese para su examen', text: `Indicaciones de ayuno, documentos y cuidados para ${conPreparacion.length} exámenes.`, href: paths.prep, label: 'Buscar mi examen' })}
        </div>
      </div>
    </section>
  `;
}

function servicesBlock() {
  return section({
    id: 'servicios',
    tone: 'white',
    label: 'servicios-title',
    body: html`
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        ${sectionHeader({ id: 'servicios-title', eyebrow: 'Nuestros servicios', title: 'Su diagnóstico integral a través de imágenes', lead: about.integral })}
        <div class="shrink-0" data-reveal>${textLink({ href: paths.services, label: 'Ver todos los servicios' })}</div>
      </div>
      <div class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>
        ${services.map((s) => serviceCard(s, countFor(s.slug)))}
      </div>
    `,
  });
}

function prepBlock() {
  const popular = [
    'ultrasonografia-de-abdomen-total',
    'tomografia-axial-computada-de-craneo-con-contraste',
    'resonancia-magnetica-de-cerebro',
    'urografia-excretora',
    'estudios-de-vias-digestivas-altas-adultos',
  ]
    .map((slug) => examenes.find((e) => e.slug === slug))
    .filter(Boolean);
  return section({
    id: 'preparacion',
    tone: 'soft',
    label: 'prep-title',
    body: html`
      <div class="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
        ${sectionHeader({
          id: 'prep-title',
          eyebrow: 'Prepárese para su examen',
          title: 'Llegue preparado y evite reprogramar su cita',
          lead: 'Muchos exámenes requieren ayuno, dieta previa, examen de creatinina o acompañante. Busque el suyo y revise las indicaciones.',
        })}
        <div class="rounded-3xl border border-line bg-white p-6 sm:p-8" data-reveal>
          <form action="${paths.prep}" method="get" role="search" class="flex flex-col gap-3 sm:flex-row">
            <label for="buscar-home" class="sr-only">Nombre del examen</label>
            <input id="buscar-home" name="q" type="search" placeholder="Ej.: abdomen total, cráneo, resonancia…" class="field-control flex-1" autocomplete="off" />
            <button type="submit" class="btn btn-primary">${icon('search', 'size-5')} Buscar</button>
          </form>
          <p class="mt-5 text-sm font-semibold text-ink-500">Consultados con frecuencia</p>
          <ul class="mt-2 flex flex-wrap gap-2">
            ${popular.map((e) => html`<li><a href="${paths.exam(e.slug)}" class="chip-link">${e.nombre}</a></li>`)}
          </ul>
        </div>
      </div>
    `,
  });
}

function reasonsBlock() {
  return section({
    id: 'por-que',
    tone: 'white',
    label: 'porque-title',
    body: html`
      <div class="grid gap-12 lg:grid-cols-[0.9fr_1.4fr]">
        <div>
          ${sectionHeader({
            id: 'porque-title',
            eyebrow: '¿Por qué elegirnos?',
            title: `Imágenes diagnósticas en ${site.address.city} desde ${about.founded}`,
            lead: 'Iniciamos con dos médicos radiólogos y los servicios de Radiología y Ecografía; hoy acompañamos a pacientes de todo el Magdalena Medio.',
          })}
          <div class="mt-8" data-reveal>${button({ href: paths.about, label: 'Conozca la clínica', variant: 'outline', iconName: 'arrow-right' })}</div>
        </div>
        <ol class="grid gap-4 sm:grid-cols-2" data-reveal-group>
          ${reasons.map(
            (r, i) => html`
              <li class="${i === reasons.length - 1 ? 'sm:col-span-2' : ''} flex gap-4 rounded-3xl border border-line bg-canvas p-6" data-reveal-item>
                <span class="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-brand-600 ring-1 ring-line">${icon(r.icon, 'size-6')}</span>
                <span>
                  <span class="block font-display text-lg font-bold text-ink-900">${r.title}</span>
                  <span class="mt-1 block text-ink-700">${r.text}</span>
                </span>
              </li>
            `,
          )}
        </ol>
      </div>
    `,
  });
}

function doctorsBlock() {
  return section({
    id: 'medicos',
    tone: 'canvas',
    label: 'medicos-title',
    body: html`
      ${sectionHeader({ id: 'medicos-title', eyebrow: 'Equipo médico', title: 'Nuestros médicos especialistas en imágenes diagnósticas' })}
      <div class="mt-10 grid gap-4 sm:grid-cols-2" data-reveal-group>${doctors.map((d) => doctorCard(d, doctorsRole))}</div>
    `,
  });
}

function resultsBlock() {
  return html`
    <section class="bg-white py-16 sm:py-20" aria-labelledby="resultados-title">
      <div class="mx-auto max-w-6xl px-5 sm:px-6 lg:px-8">
        <div class="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-600 to-brand-700 p-8 text-white sm:p-12 lg:grid-cols-[1.4fr_1fr]" data-reveal>
          <div>
            <p class="font-display text-sm font-bold uppercase tracking-wider text-brand-100">Resultados en línea</p>
            <h2 id="resultados-title" class="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Descargue sus resultados desde casa</h2>
            <p class="mt-3 text-lg text-white/90">Acceda al portal de pacientes con los datos que le entregamos en la clínica. Si es su primera vez, revise el instructivo.</p>
          </div>
          <div class="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <a href="${site.results.portalUrl}" target="_blank" rel="noopener" class="btn bg-white text-brand-700 hover:bg-brand-50">${icon('download', 'size-5')} Ir al portal de resultados<span class="sr-only">(abre en una pestaña nueva)</span></a>
            <a href="${paths.results}" class="btn border-2 border-white/60 text-white hover:bg-white/10">${icon('book', 'size-5')} Ver instructivo</a>
          </div>
        </div>
      </div>
    </section>
  `;
}

function testimonialsBlock() {
  return section({
    id: 'opiniones',
    tone: 'white',
    label: 'opiniones-title',
    className: '!pt-0',
    body: html`
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        ${sectionHeader({ id: 'opiniones-title', eyebrow: 'Opiniones', title: 'Lo que dicen nuestros pacientes' })}
        <div class="shrink-0" data-reveal>${button({ href: site.reviewUrl, label: 'Calificar en Google', variant: 'outline', iconName: 'star', external: true })}</div>
      </div>
      <div class="mt-10 grid gap-4 lg:grid-cols-2" data-reveal-group>
        ${testimonials.map(
          (t) => html`
            <figure class="relative rounded-3xl border border-line bg-canvas p-7 sm:p-8" data-reveal-item>
              ${icon('quote', 'absolute top-6 right-6 size-10 text-brand-200')}
              <blockquote class="pr-10 text-lg leading-relaxed text-ink-700">“${t.quote}”</blockquote>
              <figcaption class="mt-5 font-display font-bold text-ink-900">${t.author}</figcaption>
            </figure>
          `,
        )}
      </div>
    `,
  });
}

function visitBlock() {
  return section({
    id: 'visitenos',
    tone: 'canvas',
    label: 'visita-title',
    body: html`
      <div class="grid gap-8 lg:grid-cols-[1fr_1.3fr]">
        <div data-reveal>
          ${sectionHeader({ id: 'visita-title', eyebrow: 'Visítenos', title: 'Horario y ubicación' })}
          <div class="mt-8 rounded-3xl border border-line bg-white p-6">
            <h3 class="flex items-center gap-2 font-display font-bold text-ink-900">${icon('clock', 'size-5 text-brand-600')} Horario de atención</h3>
            ${hoursList({ className: 'mt-4' })}
          </div>
          <div class="mt-4 rounded-3xl border border-line bg-white p-6">
            <h3 class="flex items-center gap-2 font-display font-bold text-ink-900">${icon('map-pin', 'size-5 text-brand-600')} Dirección</h3>
            <p class="mt-3 text-ink-700">${site.address.street}, ${site.address.neighborhood}<br />${site.address.city}, ${site.address.region}</p>
            <p class="mt-3 text-ink-700">
              Teléfono: <a href="${site.contact.phone.href}" class="font-semibold text-brand-700 hover:underline">${site.contact.phone.value}</a>
            </p>
            <div class="mt-2">${textLink({ href: site.address.mapsUrl, label: 'Cómo llegar', external: true })}</div>
          </div>
        </div>
        <div data-reveal>${mapEmbed({ className: 'h-full min-h-80' })}</div>
      </div>
    `,
  });
}

function newsBlock() {
  return section({
    id: 'noticias',
    tone: 'white',
    label: 'noticias-title',
    body: html`
      <div class="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        ${sectionHeader({ id: 'noticias-title', eyebrow: 'Noticias', title: 'Campañas y anuncios' })}
        <div class="shrink-0" data-reveal>${textLink({ href: paths.news, label: 'Ver todas las noticias' })}</div>
      </div>
      <div class="mt-10 grid gap-6 md:grid-cols-2" data-reveal-group>
        ${news.map(
          (n) => html`
            <article class="card group !p-0 overflow-hidden" data-reveal-item>
              <img src="${asset(n.image)}" alt="" loading="lazy" class="aspect-[16/9] w-full object-cover" />
              <div class="p-6">
                <p class="text-sm text-ink-500">${new Date(n.date + 'T12:00:00').toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <h3 class="mt-1 font-display text-xl font-bold text-ink-900"><a href="${paths.post(n.slug)}" class="card-link">${n.title}</a></h3>
                <p class="mt-2 text-ink-700">${n.excerpt}</p>
              </div>
            </article>
          `,
        )}
      </div>
    `,
  });
}

export function homePage() {
  return layout({
    title: site.name,
    description: site.description,
    path: paths.home,
    section: 'home',
    jsonLd: [clinicJsonLd()],
    body: html`
      ${hero()} ${servicesBlock()} ${prepBlock()} ${reasonsBlock()} ${doctorsBlock()} ${resultsBlock()} ${testimonialsBlock()}
      ${visitBlock()} ${newsBlock()} ${ctaBand()}
    `,
  });
}
