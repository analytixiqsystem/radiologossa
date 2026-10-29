# Scripts de importación (Python 3, solo librería estándar + Pillow/numpy para el logo)

Se usaron una sola vez para migrar el contenido del sitio WordPress actual. No forman parte del build.

1. Descargar el HTML de las páginas y de las fichas `/examenes/<slug>/` a una carpeta aparte.
2. `python -I extract_site.py <carpeta_html> salida.md` → texto de cada página (docs/extraccion-sitio-actual.md).
3. `python -I extract_exams.py <carpeta_html_examenes> examenes.json` → catálogo de exámenes.
4. `python -I exams_to_module.py examenes.json ../../content/examenes.js` → módulo usado por el sitio.
5. `python -I procesar_logo.py ../../brand/logo-original.png ../../site/public/brand` → logo transparente, versión para fondo oscuro, icono y favicons.
