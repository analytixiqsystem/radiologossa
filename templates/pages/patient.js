// Páginas de servicio al paciente: Citas, Resultados, Atención al usuario (PQRS, seguridad, datos) y Contacto.
import { html, raw } from '../html.js';
import { icon } from '../icons.js';
import { layout, breadcrumbJsonLd } from '../layout.js';
import { paths, withBase } from '../paths.js';
import { pageHero, section, sectionHeader, appointmentTabs, button, textLink, hoursList, mapEmbed, confirmMark, placeholder, ctaBand } from '../components.js';
import { site, whatsappUrl } from '../../content/site.js';
import { patientSafety } from '../../content/clinic.js';

const home = { href: paths.home, label: 'Inicio' };

/* ---------- Formularios ---------- */

function field({ id, label, type = 'text', required, autocomplete, hint, as = 'input', options = [], full }) {
  const describedBy = [hint && `${id}-hint`, `${id}-error`].filter(Boolean).join(' ');
  const attrs = raw(
    `id="${id}" name="${id}" ${required ? 'required aria-required="true"' : ''} ${autocomplete ? `autocomplete="${autocomplete}"` : ''} aria-describedby="${describedBy}"`,
  );
  let control;
  if (as === 'textarea') control = html`<textarea ${attrs} rows="5" class="field-control resize-y"></textarea>`;
  else if (as === 'select')
    control = html`
      <div class="relative">
        <select ${attrs} class="field-control cursor-pointer appearance-none pr-11">
          <option value="">Seleccione una opción</option>
          ${options.map((o) => html`<option value="${o}">${o}</option>`)}
        </select>
        ${icon('chevron-down', 'pointer-events-none absolute top-1/2 right-4 size-5 -translate-y-1/2 text-ink-500')}
      </div>`;
  else control = html`<input type="${type}" ${attrs} class="field-control" />`;
  return html`
    <div class="${full ? 'sm:col-span-2' : ''}" data-field>
      <label for="${id}" class="block font-semibold text-ink-900">
        ${label} ${required ? html`<span class="text-red-700" aria-hidden="true">*</span>` : html`<span class="font-normal text-ink-500">(opcional)</span>`}
      </label>
      ${hint ? html`<p id="${id}-hint" class="mt-1 text-sm text-ink-500">${hint}</p>` : ''}
      <div class="mt-2">${control}</div>
      <p id="${id}-error" class="field-error mt-2 hidden items-center gap-1.5 text-sm font-semibold text-red-700">${icon('alert-circle', 'size-4 shrink-0')} <span></span></p>
    </div>
  `;
}

const consent = () => html`
  <div class="sm:col-span-2" data-field>
    <label class="flex cursor-pointer items-start gap-3 text-ink-700">
      <input type="checkbox" id="consentimiento" name="consentimiento" required aria-required="true" aria-describedby="consentimiento-error" class="mt-1 size-5 shrink-0 cursor-pointer accent-brand-600" />
      <span>He leído y acepto la <a href="${paths.privacy}" class="font-semibold text-brand-700 underline underline-offset-2">política de tratamiento de datos personales</a>. <span class="text-red-700" aria-hidden="true">*</span></span>
    </label>
    <p id="consentimiento-error" class="field-error mt-2 hidden items-center gap-1.5 text-sm font-semibold text-red-700">${icon('alert-circle', 'size-4 shrink-0')} <span></span></p>
  </div>
`;

function form({ name, endpoint, fields, submitLabel }) {
  return html`
    <div class="mt-2 hidden rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800" role="alert" tabindex="-1" data-form-summary></div>
    <form class="mt-6 grid gap-6 sm:grid-cols-2" novalidate data-form="${name}" data-endpoint="${endpoint}">
      ${fields} ${consent()}
      <div class="sm:col-span-2">
        <button type="submit" class="btn btn-primary w-full sm:w-auto" data-submit>${icon('arrow-right', 'size-5')} <span data-submit-label>${submitLabel}</span></button>
      </div>
    </form>
    <div class="mt-6 hidden rounded-2xl border p-5" role="status" tabindex="-1" data-form-result></div>
  `;
}

/* ---------- Citas ---------- */

export function appointmentsPage() {
  const crumbs = [home, { href: paths.appointments, label: 'Citas' }];
  return layout({
    title: 'Agendar cita',
    description: `Agende su cita de imágenes diagnósticas en ${site.address.city} por WhatsApp o teléfono: Nueva EPS, Sanitas, Ecopetrol, particulares y resonancia magnética.`,
    path: paths.appointments,
    section: 'appointments',
    jsonLd: [breadcrumbJsonLd(crumbs)],
    body: html`
      ${pageHero({
        crumbs,
        eyebrow: 'Citas',
        title: 'Agende su cita',
        lead: 'Cada aseguradora tiene su propia línea de atención. Seleccione la suya y escríbanos por WhatsApp o llámenos.',
      })}
      ${section({
        tone: 'white',
        label: 'aseguradora-title',
        body: html`
          <div class="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div data-reveal>
              <h2 id="aseguradora-title" class="font-display text-2xl font-extrabold text-ink-900">¿Cuál es su aseguradora?</h2>
              <div class="mt-5">${appointmentTabs()}</div>
            </div>
            <aside class="h-fit space-y-4" data-reveal>
              <div class="rounded-3xl border border-line bg-canvas p-6">
                <h2 class="font-display text-lg font-bold text-ink-900">Para su cita traiga</h2>
                <ul class="mt-4 space-y-3 text-ink-700">
                  <li class="flex gap-3">${icon('check-circle', 'mt-0.5 size-5 shrink-0 text-go-600')} Documento de identidad.</li>
                  <li class="flex gap-3">${icon('check-circle', 'mt-0.5 size-5 shrink-0 text-go-600')} Orden médica.</li>
                  <li class="flex gap-3">${icon('check-circle', 'mt-0.5 size-5 shrink-0 text-go-600')} Estudios previos relacionados (radiografía, ecografía, tomografía o resonancia).</li>
                </ul>
                <div class="mt-4">${textLink({ href: paths.prep, label: '¿Mi examen requiere preparación?' })}</div>
              </div>
              <div class="rounded-3xl border border-line bg-white p-6">
                <h2 class="font-display text-lg font-bold text-ink-900">Horario de atención</h2>
                ${hoursList({ className: 'mt-4' })}
              </div>
            </aside>
          </div>
        `,
      })}
    `,
  });
}

/* ---------- Resultados ---------- */

export function resultsPage() {
  const crumbs = [home, { href: paths.results, label: 'Resultados' }];
  return layout({
    title: 'Resultados',
    description: 'Consulte y descargue los resultados de sus exámenes de imágenes diagnósticas en el portal de pacientes.',
    path: paths.results,
    section: 'results',
    jsonLd: [breadcrumbJsonLd(crumbs)],
    body: html`
      ${pageHero({
        crumbs,
        eyebrow: 'Resultados',
        title: 'Descargue sus resultados en línea',
        lead: 'Consulte los resultados de sus exámenes desde el portal de pacientes, de forma rápida y segura.',
        actions: [
          { href: site.results.portalUrl, label: 'Ir al portal de resultados', variant: 'primary', iconName: 'download', external: true },
          { href: site.results.guideUrl, label: 'Ver instructivo (PDF)', variant: 'outline', iconName: 'book', external: true },
        ],
      })}
      ${section({
        tone: 'white',
        label: 'ayuda-title',
        body: html`
          <div class="grid gap-6 md:grid-cols-3" data-reveal-group>
            <div class="rounded-3xl border border-line bg-canvas p-6" data-reveal-item>
              <span class="icon-tile">${icon('book', 'size-6')}</span>
              <h2 id="ayuda-title" class="mt-4 font-display text-lg font-bold text-ink-900">Primera vez en el portal</h2>
              <p class="mt-2 text-ink-700">Revise el instructivo paso a paso para consultar y descargar sus resultados.</p>
              <div class="mt-3">${textLink({ href: site.results.guideUrl, label: 'Abrir instructivo', external: true })}</div>
            </div>
            <div class="rounded-3xl border border-line bg-canvas p-6" data-reveal-item>
              <span class="icon-tile">${icon('shield', 'size-6')}</span>
              <h2 class="mt-4 font-display text-lg font-bold text-ink-900">Acceso rápido y seguro</h2>
              <p class="mt-2 text-ink-700">El portal funciona en la plataforma visualmedica.com; por eso su dirección es distinta a la de este sitio.</p>
            </div>
            <div class="rounded-3xl border border-line bg-canvas p-6" data-reveal-item>
              <span class="icon-tile">${icon('message', 'size-6')}</span>
              <h2 class="mt-4 font-display text-lg font-bold text-ink-900">¿No puede ingresar?</h2>
              <p class="mt-2 text-ink-700">Comuníquese con nosotros y le ayudamos a acceder a sus resultados.</p>
              <div class="mt-3">${textLink({ href: paths.contact, label: 'Contactarnos' })}</div>
            </div>
          </div>
        `,
      })}
    `,
  });
}

/* ---------- Atención al usuario ---------- */

const patientCrumbs = [home, { href: paths.patient, label: 'Atención al usuario' }];

export function patientIndexPage() {
  const cards = [
    { href: paths.pqrs, icon: 'file', title: 'PQRS', text: 'Radique peticiones, quejas, reclamos o sugerencias sobre nuestro servicio.' },
    { href: paths.safety, icon: 'shield', title: 'Seguridad del paciente', text: 'Nuestra política de seguridad del paciente y del sistema de gestión de seguridad y salud en el trabajo.' },
    { href: paths.privacy, icon: 'file', title: 'Política de datos personales', text: 'Cómo tratamos y protegemos su información personal.' },
    { href: site.reviewUrl, icon: 'star', title: 'Califique nuestro servicio', text: 'Ayúdenos a mejorar dejando su comentario y calificación en Google.', external: true },
  ];
  return layout({
    title: 'Atención al usuario',
    description: 'PQRS, seguridad del paciente, política de tratamiento de datos y calificación del servicio.',
    path: paths.patient,
    section: 'patient',
    jsonLd: [breadcrumbJsonLd(patientCrumbs)],
    body: html`
      ${pageHero({ crumbs: patientCrumbs, eyebrow: 'Atención al usuario', title: 'Estamos para escucharle', lead: 'Sus comentarios nos ayudan a mejorar. Encuentre aquí nuestros canales y políticas.' })}
      ${section({
        tone: 'white',
        body: html`
          <div class="grid gap-4 sm:grid-cols-2" data-reveal-group>
            ${cards.map(
              (c) => html`
                <article class="card group" data-reveal-item>
                  <span class="icon-tile">${icon(c.icon, 'size-6')}</span>
                  <h2 class="mt-5 font-display text-xl font-bold text-ink-900">
                    <a href="${c.href}" class="card-link" ${c.external ? raw('target="_blank" rel="noopener"') : ''}>${c.title}</a>
                  </h2>
                  <p class="mt-2 text-ink-700">${c.text}</p>
                </article>
              `,
            )}
          </div>
          <div class="mt-10 rounded-3xl border border-dashed border-line bg-canvas p-6" data-reveal>
            <h2 class="font-display text-lg font-bold text-ink-900">Derechos y deberes de los pacientes</h2>
            <p class="mt-2 text-ink-700">${placeholder('documento de derechos y deberes de los pacientes de la clínica')}</p>
          </div>
        `,
      })}
    `,
  });
}

export function pqrsPage() {
  const crumbs = [...patientCrumbs, { href: paths.pqrs, label: 'PQRS' }];
  const fields = html`
    ${field({ id: 'nombre', label: 'Nombre completo', required: true, autocomplete: 'name' })}
    ${field({ id: 'tipo_documento', label: 'Tipo de documento', as: 'select', options: site.pqrs.documentTypes, required: true })}
    ${field({ id: 'documento', label: 'Número de documento', required: true, autocomplete: 'off' })}
    ${field({ id: 'email', label: 'Correo electrónico', type: 'email', required: true, autocomplete: 'email' })}
    ${field({ id: 'telefono', label: 'Teléfono', type: 'tel', autocomplete: 'tel' })}
    ${field({ id: 'tipo_solicitud', label: 'Tipo de solicitud', as: 'select', options: site.pqrs.requestTypes, required: true })}
    ${field({ id: 'mensaje', label: 'Describa su solicitud', as: 'textarea', required: true, full: true, hint: 'Incluya la fecha de atención y el servicio, si aplica. Mínimo 20 caracteres.' })}
    ${field({ id: 'anexo', label: 'Anexo', type: 'file', full: true, hint: 'Documento o imagen de soporte, si lo tiene.' })}
  `;
  return layout({
    title: 'PQRS',
    description: 'Radique peticiones, quejas, reclamos y sugerencias a Radiólogos Asociados Barrancabermeja.',
    path: paths.pqrs,
    section: 'patient',
    jsonLd: [breadcrumbJsonLd(crumbs)],
    body: html`
      ${pageHero({ crumbs, eyebrow: 'Atención al usuario', title: 'Peticiones, quejas, reclamos y sugerencias', lead: 'Complete el formulario y le responderemos al correo que nos indique.' })}
      ${section({
        tone: 'white',
        label: 'pqrs-form',
        body: html`
          <div class="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div class="rounded-3xl border border-line bg-white p-6 sm:p-8" data-reveal>
              <h2 id="pqrs-form" class="font-display text-2xl font-extrabold text-ink-900">Radicar PQRS</h2>
              <p class="mt-1 text-ink-500">Los campos marcados con <span class="text-red-700">*</span> son obligatorios.</p>
              ${form({ name: 'pqrs', endpoint: site.forms.pqrsEndpoint, fields, submitLabel: 'Enviar PQRS' })}
            </div>
            <aside class="h-fit space-y-4" data-reveal>
              <div class="rounded-3xl border border-line bg-canvas p-6">
                <h2 class="font-display text-lg font-bold text-ink-900">Otros canales</h2>
                <ul class="mt-4 space-y-3 text-ink-700">
                  <li class="flex gap-3">${icon('mail', 'mt-1 size-5 shrink-0 text-brand-600')}<a href="mailto:${site.contact.email.value}" class="break-all hover:underline">${site.contact.email.value}</a>${confirmMark(site.contact.email)}</li>
                  <li class="flex gap-3">${icon('phone', 'mt-1 size-5 shrink-0 text-brand-600')}<a href="${site.contact.phone.href}" class="hover:underline">${site.contact.phone.value}</a></li>
                  <li class="flex gap-3">${icon('map-pin', 'mt-1 size-5 shrink-0 text-brand-600')}<span>Personalmente en ${site.address.street}, ${site.address.neighborhood}</span></li>
                </ul>
              </div>
              <div class="rounded-3xl border border-dashed border-line bg-white p-6">
                <h2 class="font-display text-lg font-bold text-ink-900">Tiempo de respuesta</h2>
                <p class="mt-2 text-ink-700">${placeholder('plazo de respuesta de las PQRS definido por la clínica')}</p>
              </div>
            </aside>
          </div>
        `,
      })}
    `,
  });
}

export function safetyPage() {
  const crumbs = [...patientCrumbs, { href: paths.safety, label: 'Seguridad del paciente' }];
  const list = (items) => html`<ul class="mt-5 space-y-3">${items.map((t) => html`<li class="flex gap-3 text-lg text-ink-700">${icon('check-circle', 'mt-1 size-5 shrink-0 text-go-600')} ${t}</li>`)}</ul>`;
  return layout({
    title: 'Seguridad del paciente',
    description: 'Política de seguridad del paciente y del sistema de gestión de seguridad y salud en el trabajo de Radiólogos Asociados Barrancabermeja.',
    path: paths.safety,
    section: 'patient',
    jsonLd: [breadcrumbJsonLd(crumbs)],
    body: html`
      ${pageHero({ crumbs, eyebrow: 'Atención al usuario', title: 'Seguridad del paciente' })}
      ${section({
        tone: 'white',
        body: html`
          <div class="mx-auto max-w-3xl space-y-14">
            <div data-reveal>
              <h2 class="font-display text-2xl font-extrabold text-ink-900">Política de seguridad del paciente</h2>
              <p class="mt-4 text-lg text-ink-700">${patientSafety.intro}</p>
              ${list(patientSafety.strategies)}
            </div>
            <div data-reveal>
              <h2 class="font-display text-2xl font-extrabold text-ink-900">Sistema de gestión de la seguridad y salud en el trabajo</h2>
              <div class="mt-4 space-y-4 text-lg text-ink-700">${patientSafety.sst.paragraphs.map((p) => html`<p>${p}</p>`)}</div>
              ${list(patientSafety.sst.commitments)}
            </div>
          </div>
        `,
      })}
    `,
  });
}

export function privacyPage() {
  const crumbs = [...patientCrumbs, { href: paths.privacy, label: 'Política de datos' }];
  const pdf = withBase(site.privacyPolicyPdf);
  return layout({
    title: 'Política de tratamiento de datos personales',
    description: 'Política de tratamiento de datos personales de Radiólogos Asociados Barrancabermeja S.A.S.',
    path: paths.privacy,
    section: 'patient',
    jsonLd: [breadcrumbJsonLd(crumbs)],
    body: html`
      ${pageHero({
        crumbs,
        eyebrow: 'Atención al usuario',
        title: 'Política de tratamiento de datos personales',
        lead: `En ${site.name} garantizamos el manejo responsable, seguro y transparente de sus datos personales.`,
        actions: [
          { href: pdf, label: 'Ver la política (PDF)', variant: 'primary', iconName: 'file', external: true },
        ],
      })}
      ${section({
        tone: 'white',
        body: html`
          <div class="mx-auto max-w-3xl rounded-3xl border border-line bg-canvas p-6 sm:p-8" data-reveal>
            <h2 class="font-display text-xl font-bold text-ink-900">Consulte el documento completo</h2>
            <p class="mt-2 text-ink-700">La política completa describe las finalidades del tratamiento, los derechos de los titulares y los canales para ejercerlos.</p>
            <div class="mt-5 flex flex-wrap gap-3">
              ${button({ href: pdf, label: 'Abrir PDF', variant: 'primary', iconName: 'file', external: true })}
            </div>
          </div>
        `,
      })}
    `,
  });
}

/* ---------- Contacto ---------- */

export function contactPage() {
  const crumbs = [home, { href: paths.contact, label: 'Contacto' }];
  const fields = html`
    ${field({ id: 'nombre', label: 'Nombre completo', required: true, autocomplete: 'name' })}
    ${field({ id: 'telefono', label: 'Teléfono', type: 'tel', required: true, autocomplete: 'tel' })}
    ${field({ id: 'email', label: 'Correo electrónico', type: 'email', autocomplete: 'email', full: true })}
    ${field({ id: 'mensaje', label: 'Mensaje', as: 'textarea', required: true, full: true, hint: 'Mínimo 20 caracteres.' })}
  `;
  const line = (iconName, label, value, href, item) => html`
    <li class="flex gap-4">
      <span class="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-100 text-brand-700">${icon(iconName, 'size-5')}</span>
      <span>
        <span class="block text-sm font-semibold text-ink-500">${label}</span>
        ${href ? html`<a href="${href}" class="font-semibold break-all text-ink-900 hover:text-brand-700 hover:underline">${value}</a>` : html`<span class="font-semibold text-ink-900">${value}</span>`}${confirmMark(item)}
      </span>
    </li>
  `;
  return layout({
    title: 'Contacto',
    description: `Contacte a ${site.name}: ${site.address.street}, ${site.address.neighborhood}, ${site.address.city}. Teléfono ${site.contact.phone.value}.`,
    path: paths.contact,
    section: 'contact',
    jsonLd: [breadcrumbJsonLd(crumbs)],
    body: html`
      ${pageHero({ crumbs, eyebrow: 'Contacto', title: 'Hablemos', lead: 'Escríbanos, llámenos o visítenos. Para agendar, use la línea de su aseguradora.' })}
      ${section({
        tone: 'white',
        body: html`
          <div class="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
            <div class="space-y-6" data-reveal>
              <ul class="space-y-5 rounded-3xl border border-line bg-canvas p-6">
                ${line('map-pin', 'Dirección', `${site.address.street}, ${site.address.neighborhood}, ${site.address.city}`, site.address.mapsUrl)}
                ${line('phone', 'Teléfono', site.contact.phone.value, site.contact.phone.href)}
                ${line('phone', 'Teléfono fijo', site.contact.landline.value, site.contact.landline.href, site.contact.landline)}
                ${line('message', 'WhatsApp', site.contact.whatsapp.value, whatsappUrl(site.contact.whatsapp.number, 'Hola, tengo una consulta.'), site.contact.whatsapp)}
                ${line('mail', 'Correo', site.contact.email.value, `mailto:${site.contact.email.value}`, site.contact.email)}
              </ul>
              <div class="rounded-3xl border border-line bg-white p-6">
                <h2 class="font-display text-lg font-bold text-ink-900">Horario de atención</h2>
                ${hoursList({ className: 'mt-4' })}
              </div>
            </div>
            <div class="rounded-3xl border border-line bg-white p-6 sm:p-8" data-reveal>
              <h2 class="font-display text-2xl font-extrabold text-ink-900">Envíenos un mensaje</h2>
              <p class="mt-1 text-ink-500">Para agendar citas use <a href="${paths.appointments}" class="font-semibold text-brand-700 underline">la línea de su aseguradora</a>.</p>
              ${form({ name: 'contacto', endpoint: site.forms.contactEndpoint, fields, submitLabel: 'Enviar mensaje' })}
            </div>
          </div>
          <div class="mt-10" data-reveal>${mapEmbed({ className: 'h-96' })}</div>
        `,
      })}
    `,
  });
}
