# Radiólogos Asociados Barrancabermeja — sitio web

Nuevo sitio de **Radiólogos Asociados Barrancabermeja S.A.S.** (*Detectar a tiempo, es tiempo.*): HTML estático generado con plantillas JS, Tailwind CSS 4, [motion](https://motion.dev) y Vite.

## Uso

```bash
npm install
npm run dev       # servidor local → http://localhost:5173/radiologossa/
npm run build     # sitio listo en /dist (171 páginas)
npm run preview   # sirve /dist localmente
```

## Publicación

GitHub Pages: `https://analytixiqsystem.github.io/radiologossa/`. El flujo `.github/workflows/deploy.yml` compila y publica en cada `push` a `main`.
La subcarpeta (`basePath` en `content/site.js`) debe coincidir con el nombre del repositorio. Con dominio propio: `BASE_PATH=/` y `SITE_URL=https://dominio/`.

## Estructura

```
content/        Contenido (datos, sin HTML)
  site.js         contacto, horarios, citas por aseguradora, resultados, formularios, regla de medicamentos
  services.js     8 servicios
  examenes.js     149 exámenes con su preparación (texto literal del sitio anterior)
  clinic.js       nosotros, razones, médicos, testimonios, seguridad del paciente, noticias
templates/      Presentación (layout, componentes, logo animado, páginas)
scripts/        generate.mjs (genera /site) · importacion/ (migración desde WordPress, uso único)
site/src/       main.css (tokens Tailwind) · main.js (interacción y animaciones)
site/public/    logo, fotos de la campaña, PDF de política de datos
docs/           inventario, auditoría del sitio anterior y pendientes de la clínica
design-system/  MASTER.md (decisiones de diseño)
```

Las páginas de `/site` se **generan**: para cambiar textos edite `/content`; para el diseño, `/templates` o `site/src`.

**Pendientes de la clínica:** ver [docs/pendientes-clinica.md](docs/pendientes-clinica.md).
