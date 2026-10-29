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

if (motionOn) {
  root.classList.add('motion-ready');
  $$('[data-logo-anim]').forEach(playLogo);
  $$('[data-scan-beam]').forEach(playScanBeam);
  animate($$('[data-hero-item]'), { opacity: [0, 1], y: [18, 0] }, { duration: 0.8, delay: stagger(0.09, { startDelay: 1.6 }), ease });
  $$('[data-reveal]').forEach((el) => {
    inView(el, () => animate(el, { opacity: [0, 1], y: [24, 0] }, { duration: 0.8, ease }), { amount: 0.15 });
  });
}
