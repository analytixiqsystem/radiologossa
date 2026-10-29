# Pendientes para la clínica

Datos que el sitio nuevo necesita confirmar antes de publicarse como sitio oficial. Todo se cambia en `content/`.

## Aprobaciones

1. **Logo animado.** El icono del inicio está redibujado en SVG para animarlo (el texto es el del logo original). Aprobar o pedir ajustes.
2. **Medicamentos en las preparaciones.** 8 exámenes indican medicamentos con dosis (Travad, azitromicina, Compofen/Buscapina, amoxicilina). Hoy el sitio **los oculta** y muestra: *"Le entregaremos el protocolo con la formulación al agendar su cita"*. Para publicarlos, la dirección médica debe autorizarlo → `content/site.js` · `publishMedication: true`.
3. **Vigencia de las preparaciones.** Se copiaron literalmente del sitio actual (`content/examenes.js`). Revisar que sigan vigentes. Dos exámenes no tienen texto: *Ultrasonografía de vías urinarias (riñones, vejiga y próstata transabdominal)* y *Ultrasonografía diagnóstica de glándulas salivales*.

## Datos de contacto (marcados con * en el sitio)

4. **Correo oficial:** ¿`radiologossiaubca@gmail.com` o `info@radiologosasociadosbcabja.com`?
5. **WhatsApp general:** ¿302 249 7127 (hoy es también la línea de resonancia) o 322 282 9148?
6. **Teléfono fijo:** se publicó como (607) 622 1389 (formato vigente del antiguo (7) 6221389).
7. **Instagram:** confirmar la dirección exacta (el enlace del sitio actual está roto).

## Contenido

8. **Médicos:** especialidad y registro de cada uno. ¿Son 4 o hay más? (el sitio actual dice "7+"). Las fotos se tomaron del sitio actual (la del Dr. Julio se llamaba `doctor-alvaro-1.png`; se verificó por su posición en la tarjeta): confirmar que estén correctas o enviar fotos nuevas.
9. **Cifras:** el sitio nuevo **no** publica "22+ años", "80k+ pacientes", "7+ doctores" ni "15+ aliados" hasta confirmarlas. Sí publica "desde 2010" (dato de *Nosotros*).
10. **Testimonio 1:** en el sitio actual aparece firmado "Identidad tienda"; se muestra como "Paciente". Confirmar autor o reemplazar.
11. **Derechos y deberes de los pacientes:** falta el documento (aparece como pendiente en *Atención al usuario*).
12. **Plazo de respuesta de las PQRS:** falta definirlo (aparece como pendiente).

## Técnicos

13. **Formularios (contacto y PQRS):** conectar un servicio de envío (Formspree, Power Automate, correo…) en `content/site.js` · `forms`. El de PQRS incluye anexo, así que el servicio debe aceptar archivos. Mientras tanto validan los datos y remiten al correo/WhatsApp.
14. **Dominio definitivo** y redirecciones desde las direcciones del WordPress actual (`/radiografia-convencional/` → `/servicios/radiografia-convencional/`, `/examenes/<x>/` → `/preparacion/<x>/`, etc.).
