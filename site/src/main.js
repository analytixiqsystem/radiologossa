import { animate, inView, stagger } from 'motion';

const root = document.documentElement;
const motionOn = root.classList.contains('motion');
const ease = [0.16, 1, 0.3, 1];
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

/* ============================================================
   Logo animado: entrada (una vez) + reposo (mientras está en pantalla)
   ============================================================ */
function playLogo(svg) {
  const [cx, cy] = svg.dataset.core.split(' ').map(Number);
  const [ox, oy] = svg.dataset.orbitCenter.split(' ').map(Number);
  const q = (s) => $$(s, svg);
  const core = svg.querySelector('[data-logo-core]');
  const trefoil = svg.querySelector('[data-logo-trefoil]');
  const sats = q('[data-logo-sat]');
  const bonds = q('.lg-bond');
  const swooshes = q('.lg-swoosh');
  const dots = q('.lg-orbit-dot');
  const comet = q('.lg-comet');
  const wordmark = svg.querySelector('[data-logo-wordmark]');
  const pulse = svg.querySelector('[data-logo-pulse]');
  const electron = svg.querySelector('[data-logo-electron]');

  // 1. Núcleo
  animate(core, { opacity: [0, 1], scale: [0.55, 1] }, { type: 'spring', stiffness: 160, damping: 16, delay: 0.1 });
  // 2. El símbolo de radiación gira y se detiene (giro alrededor del centro real del núcleo)
  animate(-140, 0, {
    duration: 1.4,
    delay: 0.25,
    ease,
    onUpdate: (a) => trefoil.setAttribute('transform', `rotate(${a} ${cx} ${cy})`),
  });
  // 3. Enlaces que se dibujan hacia afuera y 4. esferas que aparecen al final de cada enlace
  animate(bonds, { strokeDashoffset: [1, 0] }, { duration: 0.5, delay: stagger(0.08, { startDelay: 0.55 }), ease: 'easeOut' });
  animate(sats, { opacity: [0, 1], scale: [0, 1] }, { type: 'spring', stiffness: 260, damping: 14, delay: stagger(0.08, { startDelay: 0.85 }) });
  animate(swooshes, { strokeDashoffset: [1, 0] }, { duration: 0.6, delay: stagger(0.1, { startDelay: 1.15 }), ease: 'easeOut' });
  // 5. La órbita punteada se completa alrededor del núcleo
  animate(dots, { opacity: [0, 1], scale: [0, 1] }, { duration: 0.25, delay: stagger(0.022, { startDelay: 1.0 }) });
  // 6. El arco crece hacia el texto y 7. aparece el nombre, como si la línea lo escribiera
  animate(comet, { opacity: [0, 1] }, { duration: 0.15, delay: stagger(0.035, { startDelay: 1.75 }) });
  animate(wordmark, { opacity: [0, 1], clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)'] }, { duration: 0.9, delay: 2.2, ease });

  // Reposo: electrón en la órbita, esferas flotando y pulso de "escaneo" desde el núcleo
  const loops = [];
  setTimeout(() => {
    electron.style.opacity = '1';
    loops.push(
      animate(0, 360, {
        duration: 9,
        repeat: Infinity,
        ease: 'linear',
        onUpdate: (a) => electron.setAttribute('transform', `rotate(${a} ${ox} ${oy})`),
      }),
    );
    sats.forEach((sat, i) => {
      loops.push(animate(sat, { y: [0, i % 2 ? 5 : -5, 0] }, { duration: 3.2 + i * 0.45, repeat: Infinity, ease: 'easeInOut' }));
    });
    loops.push(
      animate(pulse, { opacity: [0.45, 0], scale: [1, 1.55] }, { duration: 2.6, repeat: Infinity, repeatDelay: 1.8, ease: 'easeOut' }),
    );
    // Pausa las animaciones en bucle cuando el logo sale de pantalla
    inView(svg, () => {
      loops.forEach((l) => l.play());
      return () => loops.forEach((l) => l.pause());
    });
  }, 3200);
}

/* ---------- Haz de escaneo del hero (inspirado en efectos "scanner beam") ---------- */
function playScanBeam(beam) {
  const hero = beam.closest('section');
  const run = animate(
    beam,
    { y: ['-140px', `${hero.offsetHeight}px`], opacity: [0, 1, 1, 0] },
    { duration: 6, repeat: Infinity, repeatDelay: 2.5, ease: 'easeInOut', delay: 3 },
  );
  inView(hero, () => {
    run.play();
    return () => run.pause();
  });
}

/* ============================================================
   Interacción
   ============================================================ */

/* ---------- Cabecera ---------- */
const header = document.getElementById('site-header');
const syncHeader = () => header?.setAttribute('data-scrolled', String(window.scrollY > 8));
syncHeader();
window.addEventListener('scroll', syncHeader, { passive: true });

/* ---------- Desplegables (escritorio) y botón flotante ---------- */
function disclosure(container, trigger, panel, { hover = false } = {}) {
  let timer;
  const set = (open) => {
    clearTimeout(timer);
    panel.hidden = !open;
    trigger.setAttribute('aria-expanded', String(open));
  };
  const api = { container, close: () => set(false), open: () => (closeAll(api), set(true)) };
  trigger.addEventListener('click', () => (panel.hidden ? api.open() : api.close()));
  if (hover && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    container.addEventListener('pointerenter', () => ((timer = setTimeout(api.open, 80))));
    container.addEventListener('pointerleave', () => (clearTimeout(timer), (timer = setTimeout(api.close, 160))));
  }
  container.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) {
      api.close();
      trigger.focus();
    }
  });
  container.addEventListener('focusout', (e) => !container.contains(e.relatedTarget) && api.close());
  return api;
}
const disclosures = [
  ...$$('[data-dropdown]').map((d) => disclosure(d, d.querySelector('[data-dropdown-trigger]'), d.querySelector('[data-dropdown-panel]'), { hover: true })),
  ...$$('[data-fab]').map((d) => disclosure(d, d.querySelector('[data-fab-toggle]'), d.querySelector('[data-fab-panel]'))),
];
function closeAll(except) {
  disclosures.forEach((d) => d !== except && d.close());
}
document.addEventListener('click', (e) => disclosures.forEach((d) => !d.container.contains(e.target) && d.close()));

/* ---------- Menú móvil ---------- */
const mobileToggle = document.querySelector('[data-mobile-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const ICON_MENU = mobileToggle?.innerHTML;
const ICON_CLOSE =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" class="size-6" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
function setMenu(open) {
  if (!mobileMenu) return;
  mobileMenu.hidden = !open;
  mobileToggle.setAttribute('aria-expanded', String(open));
  mobileToggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  mobileToggle.innerHTML = open ? ICON_CLOSE : ICON_MENU;
  root.style.overflow = open ? 'hidden' : '';
  if (open && motionOn) animate($$('li, .btn', mobileMenu), { opacity: [0, 1], y: [10, 0] }, { duration: 0.35, delay: stagger(0.03), ease });
}
mobileToggle?.addEventListener('click', () => setMenu(mobileMenu.hidden));
document.addEventListener('keydown', (e) => e.key === 'Escape' && mobileMenu && !mobileMenu.hidden && (setMenu(false), mobileToggle.focus()));
window.matchMedia('(min-width: 1280px)').addEventListener('change', (e) => e.matches && setMenu(false));

/* ---------- Pestañas (citas por aseguradora) ---------- */
$$('[data-tabs]').forEach((widget) => {
  const tabs = $$('[data-tab]', widget);
  const panels = $$('[data-panel]', widget);
  const select = (i, focus) => {
    tabs.forEach((t, j) => {
      t.setAttribute('aria-selected', String(i === j));
      t.tabIndex = i === j ? 0 : -1;
      panels[j].hidden = i !== j;
    });
    if (focus) tabs[i].focus();
    if (motionOn) animate(panels[i], { opacity: [0, 1], y: [8, 0] }, { duration: 0.35, ease });
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(i));
    tab.addEventListener('keydown', (e) => {
      const last = tabs.length - 1;
      const next = { ArrowRight: i === last ? 0 : i + 1, ArrowDown: i === last ? 0 : i + 1, ArrowLeft: i === 0 ? last : i - 1, ArrowUp: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
      if (next === undefined) return;
      e.preventDefault();
      select(next, true);
    });
  });
});

/* ---------- Buscador de preparación ---------- */
$$('[data-prep-finder]').forEach((finder) => {
  const input = finder.querySelector('[data-prep-search]');
  const buttons = $$('[data-prep-filter]', finder);
  const onlyPrep = finder.querySelector('[data-prep-only]');
  const items = $$('[data-exam]', finder);
  const status = finder.querySelector('[data-prep-status]');
  const empty = finder.querySelector('[data-prep-empty]');
  const normalize = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const haystacks = items.map((el) => normalize(el.dataset.search));
  let service = 'todos';

  const apply = () => {
    const words = normalize(input.value).split(/\s+/).filter(Boolean);
    let shown = 0;
    items.forEach((el, i) => {
      const ok =
        (service === 'todos' || el.dataset.services.split(' ').includes(service)) &&
        (!onlyPrep.checked || el.dataset.prep === '1') &&
        words.every((w) => haystacks[i].includes(w));
      el.hidden = !ok;
      if (ok) shown++;
    });
    status.textContent = `Mostrando ${shown} ${shown === 1 ? 'examen' : 'exámenes'}`;
    empty.classList.toggle('hidden', shown > 0);
  };

  buttons.forEach((b) =>
    b.addEventListener('click', () => {
      service = b.dataset.prepFilter;
      buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
      apply();
    }),
  );
  input.addEventListener('input', apply);
  onlyPrep.addEventListener('change', apply);
  const q = new URLSearchParams(location.search).get('q');
  if (q) {
    input.value = q;
    apply();
  }
});

/* ---------- Formularios (contacto y PQRS) ---------- */
const MESSAGES = {
  valueMissing: 'Este campo es obligatorio.',
  typeMismatch: 'Revise el formato, por ejemplo: nombre@correo.com',
  tooShort: 'Escriba un poco más.',
};
$$('[data-form]').forEach((form) => {
  const wrap = form.parentElement;
  const summary = wrap.querySelector('[data-form-summary]');
  const result = wrap.querySelector('[data-form-result]');
  const submit = form.querySelector('[data-submit]');
  const label = form.querySelector('[data-submit-label]');
  const controls = $$('input, select, textarea', form).filter((c) => c.type !== 'file');

  const messageFor = (c) => {
    if (c.type === 'checkbox') return c.checked ? '' : 'Debe aceptar la política de tratamiento de datos.';
    const v = c.value.trim();
    if (c.required && !v) return MESSAGES.valueMissing;
    if (c.type === 'email' && v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return MESSAGES.typeMismatch;
    if (c.tagName === 'TEXTAREA' && c.required && v.length < 20) return `Cuéntenos un poco más (mínimo 20 caracteres; lleva ${v.length}).`;
    return '';
  };
  const validate = (c) => {
    const msg = messageFor(c);
    const err = document.getElementById(`${c.id}-error`);
    c.setAttribute('aria-invalid', String(Boolean(msg)));
    if (err) {
      err.querySelector('span').textContent = msg;
      err.classList.toggle('is-visible', Boolean(msg));
    }
    return msg;
  };
  controls.forEach((c) => {
    c.addEventListener('blur', () => ((c.dataset.touched = '1'), validate(c)));
    c.addEventListener(c.type === 'checkbox' || c.tagName === 'SELECT' ? 'change' : 'input', () => c.dataset.touched && validate(c));
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errors = controls.map((c) => ({ c, msg: validate(c) })).filter((x) => x.msg);
    if (errors.length) {
      summary.innerHTML = `<p class="font-semibold">Revise ${errors.length === 1 ? 'el campo marcado' : `los ${errors.length} campos marcados`}:</p><ul class="mt-2 list-disc space-y-1 pl-5">${errors
        .map(({ c, msg }) => `<li><a class="underline" href="#${c.id}">${(form.querySelector(`label[for="${c.id}"]`)?.textContent || 'Autorización').replace('*', '').replace('(opcional)', '').trim()}: ${msg}</a></li>`)
        .join('')}</ul>`;
      summary.classList.remove('hidden');
      summary.focus();
      return;
    }
    summary.classList.add('hidden');
    const show = (ok, text) => {
      result.className = `mt-6 rounded-2xl border p-5 ${ok ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-red-200 bg-red-50 text-red-800'}`;
      result.textContent = text;
      result.focus();
    };
    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      show(true, 'Gracias. Este formulario aún no está conectado a un servicio de envío; mientras tanto, escríbanos al correo o por WhatsApp que aparecen en esta página.');
      return;
    }
    submit.disabled = true;
    const original = label.textContent;
    label.textContent = 'Enviando…';
    try {
      const res = await fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      show(true, 'Gracias. Recibimos su mensaje y le responderemos pronto.');
    } catch {
      show(false, 'No pudimos enviar su mensaje. Inténtelo de nuevo o escríbanos por WhatsApp.');
    } finally {
      submit.disabled = false;
      label.textContent = original;
    }
  });
});

/* ============================================================
   Animaciones
   ============================================================ */
if (motionOn) {
  root.classList.add('motion-ready');
  const hasLogo = $$('[data-logo-anim]').length > 0;
  $$('[data-logo-anim]').forEach(playLogo);
  $$('[data-scan-beam]').forEach(playScanBeam);
  animate($$('[data-hero-item]'), { opacity: [0, 1], y: [18, 0] }, { duration: 0.8, delay: stagger(0.09, { startDelay: hasLogo ? 1.6 : 0.05 }), ease });
  $$('[data-reveal]').forEach((el) => {
    inView(el, () => animate(el, { opacity: [0, 1], y: [24, 0] }, { duration: 0.8, ease }), { amount: 0.1 });
  });
  $$('[data-reveal-group]').forEach((group) => {
    const items = $$('[data-reveal-item]', group).filter((i) => i.closest('[data-reveal-group]') === group);
    inView(group, () => animate(items, { opacity: [0, 1], y: [20, 0] }, { duration: 0.7, delay: stagger(0.06), ease }), { amount: 0.1 });
  });
}
