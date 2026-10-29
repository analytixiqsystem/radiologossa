// Logo animable de Radiólogos Asociados.
// El icono está redibujado en SVG a partir de brand/logo-original.png (medidas tomadas sobre el original)
// para poder animar sus piezas; el texto se usa tal cual del logo original (wordmark.webp).
// Todo está en el sistema de coordenadas del logo recortado: 1619 × 497 px.
import { raw } from './html.js';
import { withBase } from './paths.js';

const ICON = { x: 6, y: 6 }; // desplazamiento del icono dentro del logo
const CORE = { cx: 202, cy: 228, r: 114 };

const f = (n) => Math.round(n * 10) / 10;
const polar = (cx, cy, r, deg) => {
  const a = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};

/** Arco SVG (ángulos en grados, sentido horario, 0° = derecha). */
function arc(cx, cy, r, a0, a1) {
  const [x0, y0] = polar(cx, cy, r, a0);
  const [x1, y1] = polar(cx, cy, r, a1);
  const large = (a1 - a0 + 360) % 360 > 180 ? 1 : 0;
  return `M${f(x0)} ${f(y0)}A${r} ${r} 0 ${large} 1 ${f(x1)} ${f(y1)}`;
}

/** Sector anular (aspa del símbolo de radiación). */
function blade(cx, cy, r0, r1, a0, a1) {
  const [ax, ay] = polar(cx, cy, r1, a0);
  const [bx, by] = polar(cx, cy, r1, a1);
  const [cx2, cy2] = polar(cx, cy, r0, a1);
  const [dx, dy] = polar(cx, cy, r0, a0);
  return `M${f(ax)} ${f(ay)}A${r1} ${r1} 0 0 1 ${f(bx)} ${f(by)}L${f(cx2)} ${f(cy2)}A${r0} ${r0} 0 0 0 ${f(dx)} ${f(dy)}Z`;
}

// Esferas satélite: centro, radio y arco decorativo ("swoosh") que las acompaña
const satellites = [
  { cx: 70, cy: 57, r: 52, swoosh: [68, 80, 156] },
  { cx: 348, cy: 150, r: 41, swoosh: [52, 41, 124] },
  { cx: 215, cy: 425, r: 41, swoosh: [55, 65, 197] },
  { cx: 42, cy: 382, r: 17 },
  { cx: 207, cy: 30, r: 9 },
  { cx: 239, cy: 52, r: 16 },
];

// Enlaces (palitos de la molécula): de la esfera hacia el núcleo
const bonds = [
  { d: 'M98 92L142 150', w: 14 },
  { d: 'M318 164L298 176', w: 14 },
  { d: 'M209 392L206 338', w: 16 },
  { d: 'M54 370L124 306', w: 5 },
  { d: 'M236 68L223 114', w: 4 },
];

function orbitDots() {
  // Órbita punteada alrededor del núcleo, con un hueco a la derecha (donde va la esfera derecha)
  const dots = [];
  for (let a = 8; a <= 300; a += 8) {
    const [x, y] = polar(CORE.cx + 2, CORE.cy + 2, 131, a);
    dots.push(`<circle class="lg-orbit-dot" cx="${f(x)}" cy="${f(y)}" r="3.4"/>`);
  }
  return dots.join('');
}

function cometDashes() {
  // Arco de trazos que crece hacia la línea que une el icono con el texto
  const P0 = [268, 378], P1 = [374, 352], P2 = [394, 236];
  const at = (t) => [0, 1].map((i) => (1 - t) ** 2 * P0[i] + 2 * (1 - t) * t * P1[i] + t ** 2 * P2[i]);
  const out = [];
  const n = 14;
  for (let i = 0; i < n; i++) {
    const t0 = i / n;
    const t1 = t0 + 0.035;
    const [x0, y0] = at(t0);
    const [x1, y1] = at(t1);
    out.push(`<line class="lg-comet" x1="${f(x0)}" y1="${f(y0)}" x2="${f(x1)}" y2="${f(y1)}" stroke-width="${f(4 + i * 0.55)}"/>`);
  }
  // tramo final que empalma con la línea horizontal del texto
  out.push(`<path class="lg-comet" d="M394 236L398 236" stroke-width="5"/>`);
  return out.join('');
}

function sphere({ cx, cy, r }, i) {
  const hl = r > 20
    ? `<ellipse cx="${f(cx - r * 0.38)}" cy="${f(cy - r * 0.42)}" rx="${f(r * 0.42)}" ry="${f(r * 0.24)}" transform="rotate(-35 ${f(cx - r * 0.38)} ${f(cy - r * 0.42)})" fill="url(#lg-shine)"/>`
    : '';
  return `<g class="lg-sat" data-logo-sat="${i}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#lg-ball)"/>${hl}</g>`;
}

/**
 * Logo completo animable (icono SVG + texto original).
 * @param {{ title?: string, dark?: boolean, className?: string }} options
 */
export function animatedLogo({ title = 'Radiólogos Asociados Barrancabermeja S.A.S.', dark = false, className = '' } = {}) {
  const trefoil = [180, 300, 60]
    .map((a) => `<path d="${blade(CORE.cx, CORE.cy, 29, 88, a, a + 60)}"/>`)
    .join('');

  return raw(`
<svg class="logo-anim ${className}" viewBox="0 0 1619 497" role="img" aria-labelledby="logo-anim-title" data-logo-anim data-core="${CORE.cx} ${CORE.cy}" data-orbit-center="${CORE.cx + 2} ${CORE.cy + 2}">
  <title id="logo-anim-title">${title}</title>
  <defs>
    <radialGradient id="lg-ball" cx="35%" cy="30%" r="75%">
      <stop offset="0" stop-color="#7fd6f8"/>
      <stop offset=".45" stop-color="#0aa3e6"/>
      <stop offset="1" stop-color="#026aa8"/>
    </radialGradient>
    <radialGradient id="lg-core" cx="38%" cy="32%" r="78%">
      <stop offset="0" stop-color="#3dbcf2"/>
      <stop offset=".55" stop-color="#0294db"/>
      <stop offset="1" stop-color="#015d97"/>
    </radialGradient>
    <linearGradient id="lg-shine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".95"/>
      <stop offset="1" stop-color="#fff" stop-opacity=".15"/>
    </linearGradient>
    <linearGradient id="lg-gloss" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".35"/>
      <stop offset="1" stop-color="#fff" stop-opacity="0"/>
    </linearGradient>
  </defs>

  <g transform="translate(${ICON.x} ${ICON.y})" fill="none" stroke-linecap="round">
    <circle class="lg-pulse" cx="${CORE.cx}" cy="${CORE.cy}" r="${CORE.r}" stroke="#0294db" stroke-width="3" data-logo-pulse/>

    <g class="lg-orbit" fill="#0294db" data-logo-orbit>${orbitDots()}</g>
    <g class="lg-electron" data-logo-electron>
      <circle cx="${CORE.cx + 2 + 131}" cy="${CORE.cy + 2}" r="6" fill="#0294db"/>
      <circle cx="${CORE.cx + 2 + 131}" cy="${CORE.cy + 2}" r="11" fill="#0294db" opacity=".25"/>
    </g>

    <g stroke="#0294db">${bonds.map((b) => `<path class="lg-bond" d="${b.d}" stroke-width="${b.w}" pathLength="1"/>`).join('')}</g>
    <g stroke="#0294db" stroke-width="3.5">
      ${satellites.filter((s) => s.swoosh).map((s, i) => `<path class="lg-swoosh" d="${arc(s.cx, s.cy, s.swoosh[0], s.swoosh[1], s.swoosh[2])}" pathLength="1" data-logo-swoosh="${i}"/>`).join('')}
    </g>
    <g stroke="#0294db" stroke-linecap="round" data-logo-comet>${cometDashes()}</g>

    <g class="lg-core" data-logo-core>
      <circle cx="${CORE.cx}" cy="${CORE.cy}" r="${CORE.r}" fill="url(#lg-core)"/>
      <circle cx="${CORE.cx}" cy="${CORE.cy}" r="${CORE.r - 5}" stroke="#7fd6f8" stroke-opacity=".55" stroke-width="4"/>
      <path d="M${CORE.cx - 92} ${CORE.cy - 8}A92 92 0 0 1 ${CORE.cx + 70} ${CORE.cy - 62}A110 100 0 0 0 ${CORE.cx - 92} ${CORE.cy - 8}Z" fill="url(#lg-gloss)"/>
      <g class="lg-trefoil" fill="#fff" data-logo-trefoil>${trefoil}</g>
      <circle cx="${CORE.cx}" cy="${CORE.cy}" r="17" stroke="#fff" stroke-width="8"/>
      <circle cx="${CORE.cx}" cy="${CORE.cy}" r="10" fill="#015d97"/>
    </g>

    ${satellites.map(sphere).join('')}
  </g>

  <!-- Vite no reescribe el href de <image> dentro de un SVG: la subcarpeta se antepone aquí -->
  <image class="lg-wordmark" href="${withBase(dark ? 'brand/wordmark-dark.webp' : 'brand/wordmark.webp')}" x="404" y="0" width="1215" height="497" data-logo-wordmark/>
</svg>`);
}
