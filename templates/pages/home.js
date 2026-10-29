// Inicio — fase 3: hero con el logo animado y accesos rápidos (dirección visual a aprobar).
// Las demás secciones del inicio se construyen en la fase 4.
import { html } from '../html.js';
import { icon } from '../icons.js';
import { layout } from '../layout.js';
import { paths } from '../paths.js';
import { animatedLogo } from '../logo.js';
import { site } from '../../content/site.js';
import { examenes } from '../../content/examenes.js';

const conPreparacion = examenes.filter((e) => e.requierePreparacion).length;

function actionCard({ iconName, tone, title, text, href, label, external }) {
  const tones = {
    go: 'bg-go-600 text-white',
    brand: 'bg-brand-600 text-white',
    soft: 'bg-brand-100 text-brand-700',
  };
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

      <div class="relative mx-auto max-w-6xl px-5 pt-14 pb-16 text-center sm:px-6 sm:pt-20 lg:pb-24">
        <div class="mx-auto w-full max-w-3xl">${animatedLogo()}</div>

        <p class="eyebrow mt-10 justify-center" data-hero-item>Diagnóstico por imágenes · ${site.region}</p>
        <h1 id="hero-title" class="mx-auto mt-4 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-balance text-ink-900 sm:text-5xl lg:text-6xl" data-hero-item>
          ${site.tagline}
        </h1>
        <p class="mx-auto mt-5 max-w-2xl text-lg text-pretty text-ink-700 sm:text-xl" data-hero-item>${site.intro}</p>

        <div class="mx-auto mt-12 grid max-w-5xl gap-4 text-left sm:grid-cols-3">
          ${actionCard({
            iconName: 'calendar',
            tone: 'go',
            title: 'Agendar cita',
            text: 'Escríbanos por WhatsApp o llámenos según su aseguradora.',
            href: paths.home + 'citas/',
            label: 'Ver canales de citas',
          })}
          ${actionCard({
            iconName: 'download',
            tone: 'brand',
            title: 'Descargar resultados',
            text: 'Consulte sus resultados en el portal de pacientes.',
            href: site.results.portalUrl,
            label: 'Ir al portal',
            external: true,
          })}
          ${actionCard({
            iconName: 'clipboard',
            tone: 'soft',
            title: 'Prepárese para su examen',
            text: `Indicaciones de ayuno, documentos y cuidados para ${conPreparacion} exámenes.`,
            href: paths.home + 'preparacion/',
            label: 'Buscar mi examen',
          })}
        </div>

        <dl class="mx-auto mt-10 flex max-w-5xl flex-wrap justify-center gap-x-8 gap-y-3 text-[0.95rem] text-ink-700" data-hero-item>
          <div class="flex items-center gap-2">
            ${icon('clock', 'size-5 text-brand-600')}
            <dt class="sr-only">Horario</dt>
            <dd>${site.hours.map((h) => `${h.days}: ${h.time}`).join(' · ')}</dd>
          </div>
          <div class="flex items-center gap-2">
            ${icon('map-pin', 'size-5 text-brand-600')}
            <dt class="sr-only">Dirección</dt>
            <dd>
              <a href="${site.address.mapsUrl}" target="_blank" rel="noopener" class="underline-offset-4 hover:underline">
                ${site.address.street}, ${site.address.neighborhood}, ${site.address.city}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  `;
}

export function homePage() {
  return layout({
    title: site.name,
    description: site.description,
    path: paths.home,
    body: hero(),
  });
}
