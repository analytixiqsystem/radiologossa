# Design System — Radiólogos Asociados Barrancabermeja (MASTER)

Fuente de verdad visual. Base: ui-ux-pro-max (patrón *Trust & Authority + Conversion*, estilo *Minimalism*, tipografía *Medical Clean*), ajustado a la marca.

## Dirección

- **Clínico, cálido y claro.** Fondos blancos y azul muy claro; nada de fondos oscuros en el contenido principal.
- **El paciente viene a hacer algo:** agendar, descargar resultados o saber cómo prepararse. Esas tres acciones están siempre a un toque.
- **Legible para todas las edades:** texto base 17 px, contraste AA, objetivos táctiles ≥ 44 px, primero celular.
- **Movimiento con sentido:** el logo "se arma" una vez como una molécula; el resto del sitio usa revelados suaves. Todo respeta "reducir movimiento".

## Tokens (`site/src/main.css` → `@theme`)

| Rol | Token | Valor | Uso |
|---|---|---|---|
| Azul del logo | `brand-500` | `#0294DB` | Gráficos, iconos grandes, logo (no para texto) |
| Azul acción | `brand-600` / `700` | `#0A6FAD` / `#0B5A8C` | Botones, enlaces, texto destacado (AA) |
| Fondos de marca | `brand-50/100/200` | `#EEF8FE` `#D6EEFB` `#ADE0F7` | Secciones, chips, halos |
| Texto | `ink-900/700/500` | `#0B2540` `#2A4560` `#536A80` | Títulos, cuerpo, secundario |
| Agendar / WhatsApp | `go-600` / `700` | `#15803D` / `#166534` | Solo acciones de cita (AA con blanco) |
| Fondo | `canvas` | `#F5F9FC` | Fondo general |
| Bordes | `line` | `#DCE8F1` | Tarjetas, divisores |

ui-ux-pro-max sugería teal médico (`#0891B2`); se usa el **azul real del logo** para coherencia de marca, conservando el verde como acento solo para agendar.

## Tipografía

- **Figtree** (títulos, botones): amable y clara.
- **Noto Sans** (texto): máxima legibilidad, excelente soporte del español.
- El nombre de la clínica se muestra siempre con el **logo original** (no se recompone en otra fuente).

## Logo

- `brand/logo-original.png` → procesado en `site/public/brand/` (transparente, versión oscura, icono, favicons, wordmark).
- **Logo animado** (`templates/logo.js`): el icono está **redibujado en SVG** sobre las medidas del original para animar sus piezas; el texto es el del logo original. *Requiere aprobación de la clínica.*
- Secuencia: núcleo → el trébol gira y se detiene → enlaces → esferas → órbita punteada → arco → aparece el nombre (≈3 s). Reposo: un "electrón" recorre la órbita, las esferas flotan y un pulso de escaneo sale del núcleo; se pausa fuera de pantalla.

## Componentes y referencias de 21st.dev

| Idea | Referencia | Uso |
|---|---|---|
| Electrón en órbita | *Orbiting Circles* (Magic UI) | Reposo del logo animado |
| Haz de escaneo | efectos "scanner beam" | Fondo del hero (sutil, se pausa fuera de pantalla) |
| Tarjetas de acción | tarjetas con elevación al pasar el cursor | Agendar · Resultados · Preparación |
| Acordeón | *Single Open Accordion* | Preparación por examen, preguntas frecuentes |
| Pestañas con foco itinerante | *Tabs (roving focus)* | Citas por aseguradora |
| Reseñas | *Highlight Testimonial Section* | Testimonios (solo reales) |

Los componentes de 21st.dev son React: se reinterpretan en HTML + Tailwind + motion.

## Accesibilidad

Contraste AA, foco visible azul, enlace "Saltar al contenido", tarjetas clicables completas sin enlaces anidados, enlaces externos indicados con icono, `prefers-reduced-motion` respetado (el logo aparece completo y estático).
