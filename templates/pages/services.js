import { html } from '../html.js';
import { icon } from '../icons.js';
import { layout, breadcrumbJsonLd, absolute } from '../layout.js';
import { paths } from '../paths.js';
import { pageHero, section, sectionHeader, serviceCard, examItem, ctaBand, button } from '../components.js';
import { site } from '../../content/site.js';
import { services } from '../../content/services.js';
import { examenes } from '../../content/examenes.js';

const home = { href: paths.home, label: 'Inicio' };
const crumbsBase = [home, { href: paths.services, label: 'Servicios' }];
const examsOf = (slug) => examenes.filter((e) => e.servicios.includes(slug));

export function servicesIndexPage() {
  return layout({
    title: 'Servicios',
    description: `Servicios de diagnóstico por imágenes en ${site.address.city}: ${services.map((s) => s.name).join(', ')}.`,
    path: paths.services,
    section: 'services',
    jsonLd: [breadcrumbJsonLd(crumbsBase)],
    body: html`
      ${pageHero({
        crumbs: crumbsBase,
        eyebrow: 'Servicios',
        title: 'Imágenes diagnósticas para cada necesidad',
        lead: 'Radiografía, ecografía y Doppler, mamografía, densitometría, tomografía, resonancia, urografía e histerosalpingografía.',
        actions: [{ href: paths.appointments, label: 'Agendar cita', variant: 'go', iconName: 'calendar' }],
      })}
      ${section({
        tone: 'white',
        body: html`<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>${services.map((s) => serviceCard(s, examsOf(s.slug).length))}</div>`,
      })}
      ${ctaBand()}
    `,
  });
}

export function servicePage(service) {
  const crumbs = [...crumbsBase, { href: paths.service(service.slug), label: service.shortName || service.name }];
  const exams = examsOf(service.slug);
  const withPrep = exams.filter((e) => e.requierePreparacion);
  const others = services.filter((s) => s.slug !== service.slug);

  return layout({
    title: service.name,
    description: `${service.name} en ${site.address.city}. ${service.description[0]}`.slice(0, 300),
    path: paths.service(service.slug),
    section: 'services',
    jsonLd: [
      breadcrumbJsonLd(crumbs),
      {
        '@context': 'https://schema.org',
        '@type': 'MedicalProcedure',
        name: service.name,
        description: service.description.join(' '),
        procedureType: 'Diagnostic',
        url: absolute(paths.service(service.slug)),
      },
    ],
    body: html`
      ${pageHero({
        crumbs,
        eyebrow: 'Servicio',
        title: service.name,
        lead: service.short,
        actions: [
          { href: paths.appointments, label: 'Agendar cita', variant: 'go', iconName: 'calendar' },
          ...(exams.length ? [{ href: '#examenes', label: 'Ver exámenes', variant: 'outline' }] : []),
        ],
        aside: html`
          <div class="hidden justify-end lg:flex" aria-hidden="true">
            <span class="grid size-44 place-items-center rounded-[2.5rem] bg-white text-brand-500 shadow-[0_30px_60px_-30px_rgb(2_148_219/0.6)] ring-1 ring-line">
              ${icon(service.icon, 'size-20 stroke-[1.4]')}
            </span>
          </div>
        `,
      })}

      ${section({
        tone: 'white',
        label: 'que-es-title',
        body: html`
          <div class="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div data-reveal>
              <h2 id="que-es-title" class="font-display text-2xl font-extrabold text-ink-900 sm:text-3xl">¿En qué consiste?</h2>
              <div class="mt-4 space-y-4 text-lg text-ink-700">${service.description.map((p) => html`<p>${p}</p>`)}</div>
              ${service.note ? html`<p class="notice mt-6">${icon('info', 'size-5 shrink-0 text-brand-600')} <span>${service.note}</span></p>` : ''}
            </div>
            <aside class="h-fit rounded-3xl border border-line bg-canvas p-6" data-reveal>
              <h2 class="font-display text-lg font-bold text-ink-900">Antes de su cita</h2>
              <ul class="mt-4 space-y-3 text-ink-700">
                <li class="flex gap-3">${icon('check-circle', 'mt-0.5 size-5 shrink-0 text-go-600')} Agende con anticipación por WhatsApp o teléfono.</li>
                <li class="flex gap-3">${icon('check-circle', 'mt-0.5 size-5 shrink-0 text-go-600')} Revise si su examen requiere preparación.</li>
                <li class="flex gap-3">${icon('check-circle', 'mt-0.5 size-5 shrink-0 text-go-600')} Lleve su documento, la orden médica y estudios previos.</li>
              </ul>
              <div class="mt-6">${button({ href: paths.appointments, label: 'Ver canales de citas', variant: 'primary', iconName: 'calendar', className: 'w-full' })}</div>
            </aside>
          </div>
        `,
      })}

      ${exams.length
        ? section({
            id: 'examenes',
            tone: 'canvas',
            label: 'examenes-title',
            body: html`
              ${sectionHeader({
                id: 'examenes-title',
                eyebrow: `${exams.length} ${exams.length === 1 ? 'examen' : 'exámenes'}`,
                title: `Exámenes de ${(service.shortName || service.name).toLowerCase()}`,
                lead: withPrep.length
                  ? `${withPrep.length} ${withPrep.length === 1 ? 'requiere' : 'requieren'} preparación previa. Despliegue cada examen para ver las indicaciones.`
                  : 'Despliegue cada examen para ver su descripción.',
              })}
              <div class="mt-8 space-y-2" data-reveal>
                ${[...withPrep, ...exams.filter((e) => !e.requierePreparacion)].map((e) => examItem(e))}
              </div>
            `,
          })
        : ''}

      ${section({
        tone: 'white',
        label: 'otros-title',
        body: html`
          ${sectionHeader({ id: 'otros-title', eyebrow: 'Otros servicios', title: 'También le podemos ayudar con' })}
          <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" data-reveal-group>${others.slice(0, 4).map((s) => serviceCard(s, examsOf(s.slug).length))}</div>
        `,
      })}
      ${ctaBand()}
    `,
  });
}
