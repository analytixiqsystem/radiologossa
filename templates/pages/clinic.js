// Nosotros, Noticias y 404.
import { html } from '../html.js';
import { icon } from '../icons.js';
import { layout, breadcrumbJsonLd } from '../layout.js';
import { paths, asset } from '../paths.js';
import { pageHero, section, sectionHeader, doctorCard, ctaBand, button } from '../components.js';
import { site } from '../../content/site.js';
import { about, doctors, doctorsRole, news } from '../../content/clinic.js';

const home = { href: paths.home, label: 'Inicio' };
const formatDate = (d) => new Date(d + 'T12:00:00').toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });

export function aboutPage() {
  const crumbs = [home, { href: paths.about, label: 'Nosotros' }];
  const block = (iconName, title, text) => html`
    <div class="rounded-3xl border border-line bg-white p-7" data-reveal-item>
      <span class="icon-tile">${icon(iconName, 'size-6')}</span>
      <h2 class="mt-5 font-display text-xl font-bold text-ink-900">${title}</h2>
      <p class="mt-3 text-ink-700">${text}</p>
    </div>
  `;
  return layout({
    title: 'Nosotros',
    description: `${site.name}: imagenología diagnóstica en Barrancabermeja y el Magdalena Medio desde ${about.founded}.`,
    path: paths.about,
    section: 'about',
    jsonLd: [breadcrumbJsonLd(crumbs)],
    body: html`
      ${pageHero({
        crumbs,
        eyebrow: 'Nosotros',
        title: `Al servicio del Magdalena Medio desde ${about.founded}`,
        lead: about.history,
        aside: html`<img src="${asset('brand/icon.webp')}" alt="" class="mx-auto hidden w-64 lg:block" aria-hidden="true" />`,
      })}
      ${section({
        tone: 'canvas',
        body: html`
          <div class="grid gap-4 lg:grid-cols-3" data-reveal-group>
            ${block('target', 'Misión', about.mission)}
            ${block('compass', 'Visión', about.vision)}
            ${block('shield', 'Política de calidad', about.qualityPolicy)}
          </div>
        `,
      })}
      ${section({
        tone: 'white',
        label: 'equipo-title',
        body: html`
          ${sectionHeader({ id: 'equipo-title', eyebrow: 'Equipo médico', title: 'Nuestros médicos especialistas en imágenes diagnósticas' })}
          <div class="mt-10 grid gap-4 sm:grid-cols-2" data-reveal-group>${doctors.map((d) => doctorCard(d, doctorsRole))}</div>
        `,
      })}
      ${ctaBand()}
    `,
  });
}

export function newsIndexPage() {
  const crumbs = [home, { href: paths.news, label: 'Noticias' }];
  return layout({
    title: 'Noticias',
    description: 'Campañas, anuncios y novedades de Radiólogos Asociados Barrancabermeja.',
    path: paths.news,
    section: 'news',
    jsonLd: [breadcrumbJsonLd(crumbs)],
    body: html`
      ${pageHero({ crumbs, eyebrow: 'Noticias', title: 'Campañas y anuncios' })}
      ${section({
        tone: 'white',
        body: html`
          <div class="grid gap-6 md:grid-cols-2" data-reveal-group>
            ${news.map(
              (n) => html`
                <article class="card group !p-0 overflow-hidden" data-reveal-item>
                  <img src="${asset(n.image)}" alt="" loading="lazy" class="aspect-[16/9] w-full object-cover" />
                  <div class="p-6">
                    <p class="text-sm text-ink-500"><time datetime="${n.date}">${formatDate(n.date)}</time></p>
                    <h2 class="mt-1 font-display text-xl font-bold text-ink-900"><a href="${paths.post(n.slug)}" class="card-link">${n.title}</a></h2>
                    <p class="mt-2 text-ink-700">${n.excerpt}</p>
                  </div>
                </article>
              `,
            )}
          </div>
        `,
      })}
    `,
  });
}

export function postPage(post) {
  const crumbs = [home, { href: paths.news, label: 'Noticias' }, { href: paths.post(post.slug), label: post.title }];
  return layout({
    title: post.title,
    description: post.excerpt,
    path: paths.post(post.slug),
    section: 'news',
    jsonLd: [
      breadcrumbJsonLd(crumbs),
      { '@context': 'https://schema.org', '@type': 'NewsArticle', headline: post.title, datePublished: post.date, publisher: { '@type': 'Organization', name: site.name } },
    ],
    body: html`
      ${pageHero({ crumbs, eyebrow: formatDate(post.date), title: post.title })}
      <article class="bg-white py-12 sm:py-16">
        <div class="mx-auto max-w-3xl px-5 sm:px-6">
          <img src="${asset(post.image)}" alt="" class="w-full rounded-3xl" data-reveal />
          <div class="mt-8 space-y-5 text-lg text-ink-700" data-reveal>${post.body.map((p) => html`<p>${p}</p>`)}</div>
          ${post.gallery?.length
            ? html`
                <div class="mt-10 grid gap-4 sm:grid-cols-2" data-reveal>
                  ${post.gallery.map(
                    (g) => html`<figure><img src="${asset(g.src)}" alt="${g.alt}" loading="lazy" class="aspect-[4/3] w-full rounded-2xl object-cover" /><figcaption class="mt-2 text-sm text-ink-500">${g.alt}</figcaption></figure>`,
                  )}
                </div>
              `
            : ''}
          <div class="mt-10" data-reveal>${button({ href: paths.appointments, label: 'Agendar mamografía', variant: 'go', iconName: 'calendar' })}</div>
        </div>
      </article>
    `,
  });
}

export function notFoundPage() {
  return layout({
    title: 'Página no encontrada',
    description: 'La página que busca no existe o fue movida.',
    path: paths.home + '404.html',
    noindex: true,
    body: html`
      ${pageHero({
        eyebrow: 'Error 404',
        title: 'No encontramos esta página',
        lead: 'Puede que haya cambiado de dirección. Estos enlaces le pueden ayudar.',
        actions: [
          { href: paths.home, label: 'Ir al inicio', variant: 'primary' },
          { href: paths.appointments, label: 'Agendar cita', variant: 'go', iconName: 'calendar' },
          { href: paths.prep, label: 'Preparación de exámenes', variant: 'outline' },
        ],
      })}
    `,
  });
}
