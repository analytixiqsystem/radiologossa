# Auditoría del sitio actual — radiologosasociadosbcabja.com

Revisión: 2026-10-28 · 18 páginas + ~150 fichas de examen (`/examenes/...`).
Plataforma: WordPress + WooCommerce (los exámenes están cargados como "productos").

## 1. Datos de contacto contradictorios — **confirmar con la clínica**

| Dato | Valores encontrados | Dónde |
|---|---|---|
| Correo | `radiologossiaubca@gmail.com` | cabecera, Contacto |
| | `info@radiologosasociadosbcabja.com` | enlace del pie (el texto visible dice el gmail) |
| Teléfono principal | 320 837 3653 | cabecera; en Citas = "Sanitas y Particulares" |
| Fijo | (7) 622 1389 | pie (formato antiguo; hoy sería 607 622 1389) |
| WhatsApp | 302 249 7127 | botón flotante en todas las páginas; en Citas = "Resonancia magnética" |
| | 322 282 9148 | página Contacto |
| Citas Nueva EPS | 312 643 3706 | Citas |
| Citas Ecopetrol | 314 425 7145 | Citas |
| Dirección | Calle 48 # 24-38, Barrio El Recreo, Barrancabermeja | cabecera y pie (escrita de 3 formas distintas) |
| Horario | L–V 7:00 a. m.–6:00 p. m. (jornada continua) · Sáb 8:00–11:00 a. m. | Inicio |

## 2. Cifras inconsistentes — **confirmar antes de publicarlas**

- **Años de experiencia:** "más de 20 años" (pie), "22+" (contador del inicio), pero *Nosotros* dice que la empresa **fue creada en 2010** (≈16 años en 2026).
- **Médicos:** "7+ doctores expertos" pero solo aparecen **4** (sin especialidad ni registro).
- **"80k+ pacientes satisfechos"** y **"15+ clientes/aliados"**: sin fuente; no se listan los aliados.

## 3. Enlaces rotos o incorrectos

- **Instagram**: `http://https//www.instagram.com/radiologos.asociados.5` (URL mal formada) — en las 18 páginas.
- **Twitter, LinkedIn, WhatsApp, Facebook genéricos**: apuntan a la página principal de cada red, no a la clínica.
- **Histerosalpingografía en el pie** → `https://www.google.com`.
- **Logo** → `radiologosbcabja.com` (otro dominio).
- **WhatsApp flotante** `phone=3022497127` sin indicativo **57**: falla en muchos teléfonos. Los de la página Citas sí lo tienen.
- Menús **Servicios**, **De interés** y **Atención al usuario** apuntan a `#`.
- Correo del pie: el texto muestra un correo y el enlace abre otro.

## 4. Elementos que no corresponden a una clínica

- **Carrito de compras** ("Shopping cart · Subtotal $0.00 · View cart · Checkout") en todas las páginas, heredado de WooCommerce.
- Rutas `/product-category/...` visibles en los enlaces.
- Textos en inglés: "Latest News", "Comments are closed", "Shopping cart".
- Testimonio firmado como **"Identidad tienda"**.
- Crédito "Adaptado por: Brayan Garcia" en el pie.

## 5. Contenido pobre o difícil de usar

- Tarjetas de servicios del inicio: solo dicen **"Disponibles"**, sin nombre visible en varias.
- La información más útil (**preparación de cada examen**) está escondida en ~150 fichas sueltas, sin buscador ni filtro.
- Portal de resultados en `visualmedica.com:2053` (puerto no estándar) y el instructivo es un PDF en Google Drive.
- Política de datos solo como PDF descargable; PQRS sin explicar tiempos de respuesta ni canales alternos.
- Citas: 4 números distintos según aseguradora, presentados dos veces (WhatsApp y llamada) sin explicar cuál usar.
- Médicos sin especialidad, registro ni foto consistente.

## 6. Información clínica sensible — **validar con la dirección médica**

8 fichas de preparación indican **medicamentos con dosis y horarios** (laxantes como Travad oral/rectal, antibiótico azitromicina, analgésicos como Compofen o Buscapina compuesta):
Histerosalpingografía, Urografía excretora, Ultrasonografía de próstata transrectal, Radiografía de abdomen simple, Radiografía de colon por enema, Radiografía de columna lumbar y sacro coxis (niños de 9 a 14 años), Radiografía lumbar, dorsolumbar y sacro coxis (adultos), Tránsito intestinal con balines o marcadores.

Publicar dosis en una web abierta tiene riesgo: el paciente puede seguirlas sin fórmula ni valoración (alergias, embarazo, niños). Propuesta: publicar la preparación general (ayuno, dieta, acompañante, documentos) y para los medicamentos indicar **"le entregaremos el protocolo con la formulación al agendar su cita"**, salvo que la clínica decida lo contrario.

## 7. Ortografía y redacción

"Radiologos" (sin tilde, en el hero), "Histerosalpingografia", "Mamografia", "Resonancia magnetica", "Ultimas noticias", "Siguenos", "Contactanos", "De interes", "Sabados", "atencion", "Diagnosticas", "simplificacion", "rapido", "examenes", "bresultaros", "Ud." / "Su" con mayúscula innecesaria, "Mas información", "Leer mas", "Radiológos" (tilde mal ubicada), "mas" (por "más").

## 8. Lo que vale la pena conservar

- Lema **"Detectar a tiempo, es tiempo."**
- Historia, misión, visión y **política de calidad**.
- **Política de seguridad del paciente** y del SG-SST.
- Descripción de los 8 servicios y el **catálogo completo de exámenes con su preparación**.
- Canales de citas por aseguradora (Nueva EPS, Sanitas, Ecopetrol, particulares, resonancia).
- Portal de resultados + guía; enlace para **calificar en Google**; formulario **PQRS** (tipos de documento y de solicitud).
- Campaña de prevención del cáncer de mama (con fotos propias) y la guía de resultados.
- 2 testimonios de pacientes (uno con nombre "Andrea del Pilar").

## 9. Recomendaciones para el nuevo sitio

1. Un **único directorio de contacto** validado por la clínica, con WhatsApp en formato internacional (`57…`).
2. **Buscador de exámenes** con su preparación (ayuno, creatinina, acompañante, metales, embarazo) y botón "Agendar este examen".
3. Página de **Citas** que pregunte "¿Cuál es su aseguradora?" y muestre el canal correcto.
4. Página de **Resultados** con el instructivo integrado (no solo el PDF de Drive).
5. **Atención al usuario** completa: PQRS, derechos y deberes, seguridad del paciente, política de datos (Ley 1581), política de calidad.
6. Eliminar carrito, textos en inglés y enlaces genéricos; corregir ortografía.
7. Cifras solo si la clínica las confirma.
