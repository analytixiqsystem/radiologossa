// Página de inicio provisional (fase 1): solo verifica que el stack compile y publique.
import { html } from '../html.js';
import { layout } from '../layout.js';
import { paths, asset } from '../paths.js';
import { site } from '../../content/site.js';

export function homePage() {
  return layout({
    title: site.name,
    description: site.description,
    path: paths.home,
    body: html`
      <section class="grid min-h-dvh place-items-center bg-white px-5 text-center">
        <div>
          <img src="${asset('brand/logo.png')}" alt="${site.name}" class="mx-auto w-full max-w-md" />
          <p class="mt-6 text-lg text-slate-600">${site.tagline}</p>
          <p class="mt-2 text-sm text-slate-500">Nuevo sitio en construcción.</p>
        </div>
      </section>
    `,
  });
}
