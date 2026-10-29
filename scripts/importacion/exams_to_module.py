"""Convierte examenes.json en content/examenes.js para el sitio. Uso: python -I exams_to_module.py <in.json> <out.js>"""
import sys, json, re
from pathlib import Path

data = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
for x in data:
    x["texto"] = [t for t in x["texto"] if not re.search(r"\s-\s*Radi[oó]logos Barrancabermeja\s*$", t)]
    del x["categorias"]
data.sort(key=lambda x: (x["servicios"][0], x["nombre"].lower()))

header = (
    "// Catálogo de exámenes del sitio actual (149 fichas /examenes/...), con su descripción o preparación.\n"
    "// Texto literal de la clínica, extraído el 2026-10-28. La preparación es información médica:\n"
    "// la clínica debe validarla antes de publicar (ver docs/auditoria-sitio-actual.md).\n"
    "// Generado con scripts de extracción; edítelo a mano si la clínica actualiza una preparación.\n\n"
)
body = "export const examenes = " + json.dumps(data, ensure_ascii=False, indent=2) + ";\n"
Path(sys.argv[2]).write_text(header + body, encoding="utf-8")
print(len(data), "exámenes escritos")
