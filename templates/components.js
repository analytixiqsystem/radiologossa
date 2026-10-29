// Componentes de presentación reutilizables. Solo reciben datos; el contenido vive en /content.
import { html, raw, cx } from './html.js';
import { icon } from './icons.js';
import { paths, asset } from './paths.js';
import { site, whatsappUrl } from '../content/site.js';
import { serviceBySlug } from '../content/services.js';

/* ---------- Primitivas ---------- */

/** Dato pendiente de confirmar por la clínica: visible a propósito para no inventar información. */
export const placeholder = (label) =>
  html`<span class="placeholder" title="Dato pendiente de confirmar">[Pendiente: ${label}]</span>`;

/** Valor de contacto que la clínica aún debe confirmar (se muestra con una marca discreta). */
export const confirmMark = (item) => (item?.confirmar ? html`<span class="confirm-mark" title="Dato por confirmar con la clínica">*</span>` : '');

export const container = (body, className = '') =>
  html`<div class="${cx('mx-auto max-w-6xl px-5 sm:px-6 lg:px-8', className)}">${body}</div>`;

const tones = { white: 'bg-white', canvas: 'bg-canvas', soft: 'bg-brand-50' };

export function section({ id, tone = 'white', label, className = '', body }) {
  return html`
    <section
      ${id ? raw(`id="${id}"`) : ''}
      ${label ? raw(`aria-labelledby="${label}"`) : ''}
      class="${cx('relative scroll-mt-24 py-16 sm:py-24', tones[tone], className)}"
    >
      ${container(body)}
    </section>
  `;
}

export function sectionHeader({ id, eyebrow, title, lead, align = 'left', className = '' }) {
  return html`
    <div class="${cx('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}" data-reveal>
      ${eyebrow ? html`<p class="eyebrow ${align === 'center' ? 'justify-center' : ''}">${eyebrow}</p>` : ''}
      <h2 ${id ? raw(`id="${id}"`) : ''} class="mt-3 font-display text-3xl font-extrabold tracking-tight text-balance text-ink-900 sm:text-4xl">${title}</h2>
      ${lead ? html`<p class="mt-4 text-lg text-pretty text-ink-700">${lead}</p>` : ''}
    </div>
  `;
}

export function button({ href, label, variant = 'primary', iconName, external = false, className = '' }) {
  return html`
    <a
      href="${href}"
      class="${cx('btn group/btn', `btn-${variant}`, className)}"
      ${external ? raw('target="_blank" rel="noopener"') : ''}
    >
      ${iconName ? icon(iconName, 'size-5') : ''}
      <span>${label}</span>
      ${external ? html`<span class="sr-only">(abre en una pestaña nueva)</span>` : ''}
    </a>
  `;
}

export const textLink = ({ href, label, external = false }) => html`
  <a
    href="${href}"
    class="group/link inline-flex min-h-11 items-center gap-1.5 font-display font-bold text-brand-600 hover:text-brand-700"
    ${external ? raw('target="_blank" rel="noopener"') : ''}
  >
    ${label} ${icon(external ? 'external-link' : 'arrow-right', 'size-4 transition-transform duration-200 group-hover/link:translate-x-1')}
    ${external ? html`<span class="sr-only">(abre en una pestaña nueva)</span>` : ''}
  </a>
`;

/* ---------- Cabecera de páginas internas ---------- */

export function breadcrumbs(items) {
  return html`
    <nav aria-label="Ruta de navegación" class="mb-6">
      <ol class="flex flex-wrap items-center gap-1.5 text-sm text-ink-500">
        ${items.map((item, i) =>
          i === items.length - 1
            ? html`<li><span aria-current="page" class="font-semibold text-ink-700">${item.label}</span></li>`
            : html`<li class="flex items-center gap-1.5"><a href="${item.href}" class="hover:text-brand-700 hover:underline">${item.label}</a>${icon('chevron-right', 'size-3.5')}</li>`,
        )}
      </ol>
    </nav>
  `;
}

export function pageHero({ crumbs, eyebrow, title, lead, actions = [], aside }) {
  return html`
    <section class="relative isolate overflow-hidden bg-gradient-to-b from-white to-brand-50">
      <div class="scan-grid pointer-events-none absolute inset-0" aria-hidden="true"></div>
      ${container(
        html`
          <div class="${cx('grid items-center gap-10 py-12 sm:py-16', aside && 'lg:grid-cols-[1.5fr_1fr]')}">
            <div>
              ${crumbs ? breadcrumbs(crumbs) : ''}
              ${eyebrow ? html`<p class="eyebrow" data-hero-item>${eyebrow}</p>` : ''}
              <h1 class="mt-3 font-display text-4xl font-extrabold tracking-tight text-balance text-ink-900 sm:text-5xl" data-hero-item>${title}</h1>
              ${lead ? html`<p class="mt-4 max-w-2xl text-lg text-pretty text-ink-700 sm:text-xl" data-hero-item>${lead}</p>` : ''}
              ${actions.length ? html`<div class="mt-8 flex flex-wrap gap-3" data-hero-item>${actions.map(button)}</div>` : ''}
            </div>
            ${aside ? html`<div data-hero-item>${aside}</div>` : ''}
          </div>
        `,
        'relative',
      )}
    </section>
  `;
}

/* ---------- Servicios ---------- */

export function serviceCard(service, examCount) {
  return html`
    <article class="card group" data-reveal-item>
      <span class="icon-tile">${icon(service.icon, 'size-6')}</span>
      <h3 class="mt-5 font-display text-xl font-bold text-ink-900">
        <a href="${paths.service(service.slug)}" class="card-link">${service.shortName || service.name}</a>
      </h3>
      <p class="mt-2 text-ink-700">${service.short}</p>
      <p class="mt-auto flex items-center justify-between gap-3 pt-5 text-sm">
        <span class="font-semibold text-ink-500">${examCount ? `${examCount} ${examCount === 1 ? 'examen' : 'exámenes'}` : 'Con cita previa'}</span>
        <span class="inline-flex items-center gap-1 font-display font-bold text-brand-600" aria-hidden="true">
          Ver servicio ${icon('arrow-right', 'size-4 transition-transform duration-200 group-hover:translate-x-1')}
        </span>
      </p>
    </article>
  `;
}

/* ---------- Preparación de exámenes ---------- */

const MEDICATION = /travad|azitromicina|compofen|buscapina|pastilla|tableta|\bmg\b|frasco|laxante|enema/i;

/** Líneas de preparación listas para publicar (aplica la regla de medicamentos de site.publishMedication). */
export function prepLines(exam) {
  if (site.publishMedication) return { lines: exam.texto, medication: false };
  const lines = exam.texto.filter((t) => !MEDICATION.test(t));
  return { lines, medication: lines.length !== exam.texto.length };
}

const isHeading = (t) => /:\s*$/.test(t) && t.length < 90;

export function prepBody(exam) {
  const { lines, medication } = prepLines(exam);
  if (!lines.length && !medication) {
    return html`<p class="text-ink-500">${placeholder('descripción o preparación de este examen')}</p>`;
  }
  const items = [];
  let list = [];
  const flush = () => {
    if (list.length) items.push(html`<ul class="prep-list">${list.map((l) => html`<li>${l}</li>`)}</ul>`);
    list = [];
  };
  for (const line of lines) {
    if (isHeading(line)) {
      flush();
      items.push(html`<p class="mt-3 font-semibold text-ink-900 first:mt-0">${line}</p>`);
    } else list.push(line);
  }
  flush();
  if (medication) {
    items.push(html`
      <p class="notice mt-4">${icon('info', 'size-5 shrink-0 text-brand-600')} <span>${site.medicationNotice}</span></p>
    `);
  }
  return items;
}

export function examItem(exam, { open = false } = {}) {
  const services = exam.servicios.map((s) => serviceBySlug[s]?.shortName || serviceBySlug[s]?.name).filter(Boolean);
  return html`
    <details
      class="exam-item group"
      data-exam
      data-services="${exam.servicios.join(' ')}"
      data-prep="${exam.requierePreparacion ? '1' : '0'}"
      data-search="${`${exam.nombre} ${services.join(' ')}`.toLowerCase()}"
      ${open ? raw('open') : ''}
    >
      <summary>
        <span class="min-w-0">
          <span class="block font-display font-bold text-ink-900">${exam.nombre}</span>
          <span class="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-ink-500">
            ${services.join(' · ')}
            ${exam.requierePreparacion ? html`<span class="badge-prep">Requiere preparación</span>` : ''}
          </span>
        </span>
        ${icon('chevron-down', 'size-5 shrink-0 text-ink-500 transition-transform duration-200 group-open:rotate-180')}
      </summary>
      <div class="exam-body">
        ${prepBody(exam)}
        <a href="${paths.exam(exam.slug)}" class="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:underline">
          Ver ficha del examen ${icon('arrow-right', 'size-4')}
        </a>
      </div>
    </details>
  `;
}

/* ---------- Citas por aseguradora (pestañas ARIA) ---------- */

export function appointmentTabs({ idPrefix = 'citas' } = {}) {
  return html`
    <div class="appointment-tabs" data-tabs>
      <div role="tablist" aria-label="Seleccione su aseguradora" class="grid grid-cols-2 gap-2 sm:grid-cols-4">
        ${site.appointments.map(
          (a, i) => html`
            <button
              type="button"
              role="tab"
              id="${idPrefix}-tab-${a.id}"
              aria-controls="${idPrefix}-panel-${a.id}"
              aria-selected="${i === 0 ? 'true' : 'false'}"
              tabindex="${i === 0 ? '0' : '-1'}"
              class="tab-btn"
              data-tab
            >
              ${a.label}
            </button>
          `,
        )}
      </div>
      ${site.appointments.map(
        (a, i) => html`
          <div
            role="tabpanel"
            id="${idPrefix}-panel-${a.id}"
            aria-labelledby="${idPrefix}-tab-${a.id}"
            class="mt-4 rounded-3xl border border-line bg-white p-6 sm:p-8"
            ${i === 0 ? '' : raw('hidden')}
            data-panel
          >
            <p class="font-display text-sm font-bold uppercase tracking-wider text-ink-500">Citas · ${a.label}</p>
            <p class="mt-1 font-display text-3xl font-extrabold text-ink-900">${a.phone}</p>
            <div class="mt-6 flex flex-wrap gap-3">
              ${button({ href: whatsappUrl(a.whatsapp, `Hola, quiero agendar una cita (${a.label}).`), label: 'Escribir por WhatsApp', variant: 'go', iconName: 'message', external: true })}
              ${button({ href: `tel:+${a.whatsapp}`, label: 'Llamar', variant: 'outline', iconName: 'phone' })}
            </div>
          </div>
        `,
      )}
    </div>
  `;
}

/* ---------- Bloques varios ---------- */

export function hoursList({ className = '' } = {}) {
  return html`
    <ul class="${cx('space-y-2', className)}">
      ${site.hours.map(
        (h) => html`
          <li class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
            <span class="font-semibold text-ink-900">${h.days}</span>
            <span class="text-ink-700">${h.time}${h.note ? html` <span class="text-sm text-ink-500">(${h.note})</span>` : ''}</span>
          </li>
        `,
      )}
    </ul>
  `;
}

export function mapEmbed({ className = '' } = {}) {
  const q = encodeURIComponent(`${site.address.street}, ${site.address.city}, ${site.address.region}, Colombia`);
  return html`
    <div class="${cx('overflow-hidden rounded-3xl border border-line bg-brand-50', className)}">
      <iframe
        title="Mapa: ${site.address.street}, ${site.address.neighborhood}, ${site.address.city}"
        src="https://www.google.com/maps?q=${q}&output=embed"
        class="block h-full min-h-72 w-full"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  `;
}

export function doctorCard(doctor, role) {
  const initials = doctor.name
    .split(' ')
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
  return html`
    <article class="flex items-center gap-4 rounded-3xl border border-line bg-white p-5" data-reveal-item>
      <span class="grid size-16 shrink-0 place-items-center rounded-2xl bg-brand-100 font-display text-xl font-extrabold text-brand-700" aria-hidden="true">${initials}</span>
      <span>
        <span class="block font-display text-lg font-bold text-ink-900">${doctor.name}</span>
        <span class="text-ink-500">${doctor.role || role}</span>
      </span>
    </article>
  `;
}

export function ctaBand({ title = '¿Listo para agendar su examen?', lead = 'Escríbanos por WhatsApp o llámenos según su aseguradora. Le indicamos la preparación al agendar.' } = {}) {
  return html`
    <section class="relative isolate overflow-hidden bg-brand-600 py-16 text-white sm:py-20" aria-labelledby="cta-title">
      <div class="pointer-events-none absolute -top-24 -right-20 size-96 rounded-full bg-brand-400/40 blur-3xl" aria-hidden="true"></div>
      <img src="${asset('brand/icon.webp')}" alt="" class="pointer-events-none absolute -bottom-16 -left-10 w-72 opacity-15" aria-hidden="true" />
      ${container(
        html`
          <div class="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between" data-reveal>
            <div class="max-w-2xl">
              <h2 id="cta-title" class="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">${title}</h2>
              <p class="mt-3 text-lg text-white/90">${lead}</p>
            </div>
            <div class="flex flex-wrap gap-3">
              <a href="${paths.appointments}" class="btn bg-white text-brand-700 hover:bg-brand-50">${icon('calendar', 'size-5')} Agendar cita</a>
              <a href="${paths.prep}" class="btn border-2 border-white/60 text-white hover:bg-white/10">${icon('clipboard', 'size-5')} Ver preparación</a>
            </div>
          </div>
        `,
        'relative',
      )}
    </section>
  `;
}
