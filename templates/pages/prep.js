import { html } from '../html.js';
import { icon } from '../icons.js';
import { layout, breadcrumbJsonLd } from '../layout.js';
import { paths } from '../paths.js';
import { pageHero, section, examItem, prepBody, prepLines, button, ctaBand } from '../components.js';
import { site } from '../../content/site.js';
import { services, serviceBySlug } from '../../content/services.js';
import { examenes } from '../../content/examenes.js';

const home = { href: paths.home, label: 'Inicio' };
const crumbsBase = [home, { href: paths.prep, label: 'Preparación de exámenes' }];
const withPrep = examenes.filter((e) => e.requierePreparacion);

export function prepIndexPage() {
  const filterServices = services.filter((s) => examenes.some((e) => e.servicios.includes(s.slug)));
  return layout({
    title: 'Preparación de exámenes',
    description: `Indicaciones de preparación para ${withPrep.length} exámenes de imágenes diagnósticas: ayuno, dieta, creatinina, acompañante y documentos.`,
    path: paths.prep,
    section: 'prep',
    jsonLd: [breadcrumbJsonLd(crumbsBase)],
    body: html`
      ${pageHero({
        crumbs: crumbsBase,
        eyebrow: 'Prepárese para su examen',
        title: 'Busque su examen y revise cómo prepararse',
        lead: `Tenemos indicaciones para ${withPrep.length} exámenes. Si su examen no requiere preparación, solo traiga su documento, la orden médica y los estudios previos.`,
      })}

      <section class="bg-white py-10 sm:py-14" aria-label="Buscador de exámenes">
        <div class="mx-auto max-w-4xl px-5 sm:px-6" data-prep-finder>
          <div class="rounded-3xl border border-line bg-canvas p-5 sm:p-6">
            <label for="buscar-examen" class="font-display font-bold text-ink-900">Nombre del examen</label>
            <div class="relative mt-2">
              ${icon('search', 'pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-500')}
              <input id="buscar-examen" type="search" placeholder="Ej.: abdomen total, cráneo, rodilla…" class="field-control pl-12" autocomplete="off" data-prep-search />
            </div>
            <fieldset class="mt-4">
              <legend class="sr-only">Filtrar por servicio</legend>
              <div class="flex flex-wrap gap-2">
                <button type="button" class="filter-btn" aria-pressed="true" data-prep-filter="todos">Todos</button>
                ${filterServices.map((s) => html`<button type="button" class="filter-btn" aria-pressed="false" data-prep-filter="${s.slug}">${s.shortName || s.name}</button>`)}
              </div>
            </fieldset>
            <label class="mt-4 flex min-h-11 cursor-pointer items-center gap-3 text-ink-700">
              <input type="checkbox" class="size-5 cursor-pointer accent-brand-600" data-prep-only />
              Mostrar solo exámenes con preparación
            </label>
          </div>

          <p class="mt-6 text-ink-500" aria-live="polite" data-prep-status>Mostrando ${examenes.length} exámenes</p>
          <div class="mt-3 space-y-2">
            ${[...withPrep, ...examenes.filter((e) => !e.requierePreparacion)].map((e) => examItem(e))}
          </div>
          <p class="mt-6 hidden rounded-2xl border border-line bg-canvas p-5 text-ink-700" data-prep-empty>
            No encontramos ese examen. Escríbanos por WhatsApp y le indicamos la preparación.
          </p>
        </div>
      </section>
      ${ctaBand()}
    `,
  });
}

export function examPage(exam) {
  const crumbs = [...crumbsBase, { href: paths.exam(exam.slug), label: exam.nombre }];
  const svc = exam.servicios.map((s) => serviceBySlug[s]).filter(Boolean);
  const { lines } = prepLines(exam);
  const summary = (lines.join(' ') || `${exam.nombre} en ${site.address.city}.`).slice(0, 155);

  return layout({
    title: exam.requierePreparacion ? `Preparación: ${exam.nombre}` : exam.nombre,
    description: summary,
    path: paths.exam(exam.slug),
    section: 'prep',
    jsonLd: [breadcrumbJsonLd(crumbs)],
    body: html`
      ${pageHero({
        crumbs,
        eyebrow: svc.map((s) => s.shortName || s.name).join(' · '),
        title: exam.nombre,
        lead: exam.requierePreparacion ? 'Este examen requiere preparación previa. Siga estas indicaciones antes de su cita.' : '',
      })}
      <section class="bg-white py-12 sm:py-16">
        <div class="mx-auto grid max-w-6xl gap-10 px-5 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-8">
          <article class="prose-prep" data-reveal>
            <h2 class="font-display text-2xl font-extrabold text-ink-900">${exam.requierePreparacion ? 'Preparación' : 'Descripción'}</h2>
            <div class="mt-4 text-lg text-ink-700">${prepBody(exam)}</div>
            <p class="mt-8 text-sm text-ink-500">
              Si tiene dudas sobre la preparación, consúltelas al agendar su cita. Siga siempre las indicaciones de su médico tratante.
            </p>
          </article>
          <aside class="h-fit space-y-4" data-reveal>
            <div class="rounded-3xl border border-line bg-canvas p-6">
              <h2 class="font-display text-lg font-bold text-ink-900">Agende este examen</h2>
              <p class="mt-2 text-ink-700">Escríbanos o llámenos según su aseguradora.</p>
              <div class="mt-5">${button({ href: paths.appointments, label: 'Ver canales de citas', variant: 'go', iconName: 'calendar', className: 'w-full' })}</div>
            </div>
            ${svc.map(
              (s) => html`
                <a href="${paths.service(s.slug)}" class="flex items-center gap-4 rounded-3xl border border-line bg-white p-5 hover:border-brand-200">
                  <span class="icon-tile !size-11">${icon(s.icon, 'size-5')}</span>
                  <span class="font-display font-bold text-ink-900">${s.name}</span>
                  ${icon('arrow-right', 'ml-auto size-5 text-brand-600')}
                </a>
              `,
            )}
          </aside>
        </div>
      </section>
    `,
  });
}
