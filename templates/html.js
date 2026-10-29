// Motor mínimo de plantillas: `html` escapa los valores interpolados salvo que ya sean HTML seguro.

class SafeHtml {
  constructor(value) {
    this.value = value;
  }
  toString() {
    return this.value;
  }
}

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ESCAPES[c]);

/** Marca un string como HTML de confianza (sin escapar). */
export const raw = (value) => new SafeHtml(String(value));

function render(value) {
  if (value == null || value === false) return '';
  if (value instanceof SafeHtml) return value.value;
  if (Array.isArray(value)) return value.map(render).join('');
  return escape(value);
}

export function html(strings, ...values) {
  let out = strings[0];
  for (let i = 0; i < values.length; i++) out += render(values[i]) + strings[i + 1];
  return new SafeHtml(out);
}

/** Une clases condicionales: cx('a', cond && 'b') */
export const cx = (...classes) => classes.filter(Boolean).join(' ');
