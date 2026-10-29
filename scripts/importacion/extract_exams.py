"""Convierte las fichas /examenes/<slug>/ del sitio actual en un catálogo JSON (texto literal de la clínica).
Uso: python -I extract_exams.py <carpeta_html_examenes> <salida.json>"""
import sys, json, re
from pathlib import Path
from collections import Counter

sys.path.insert(0, str(Path(__file__).parent))
from extract_site import Extract  # noqa: E402  (reutiliza el parser; su bloque principal no corre al importar)

SERVICE_BY_CATEGORY = {
    "examenes-radiografia-convencional": "radiografia-convencional",
    "radiografia-y-convencional-recomendaciones": "radiografia-convencional",
    "ecografia-y-doppler-recomendaciones": "ecografia-y-doppler",
    "examenes-doppler-ecografia": "ecografia-y-doppler",
    "examenes-ecografia-doppler": "ecografia-y-doppler",
    "examenes-mamografia": "mamografia",
    "examenes-tac": "tomografia-axial-computada-tac",
    "recomendaciones-tac": "tomografia-axial-computada-tac",
    "examen-resonancia-magnetica": "resonancia-magnetica",
    "examenes-histerosalpingografia": "histerosalpingografia",
    "examenes-urografia-excretora": "urografia-excretora",
}

src, out = Path(sys.argv[1]), Path(sys.argv[2])
raw = {}
for f in sorted(src.glob("*.html")):
    # prefijo \\?\ para nombres que superan el límite de 260 caracteres de Windows
    html = Path("\\\\?\\" + str(f.resolve())).read_text(encoding="utf-8", errors="replace")
    p = Extract()
    p.feed(html)
    p.flush()
    cats = sorted(set(re.findall(r'/product-category/([a-z0-9-]+)/', html)))
    # categoría propia del producto (WooCommerce la marca en las clases del <body>/<div> del producto)
    own = re.findall(r'product_cat-([a-z0-9-]+)', html)
    raw[f.stem] = {"lines": p.lines, "title": p.title, "cats": sorted(set(own)) or cats}

freq = Counter(l for r in raw.values() for l in set(r["lines"]))
common = {l for l, c in freq.items() if c >= len(raw) * 0.5}

catalog = []
for slug, r in raw.items():
    name = re.sub(r"\s*-\s*Radiólogos Barrancabermeja\s*$", "", r["title"]).strip()
    lines = [l for l in r["lines"] if l not in common]
    # quita repeticiones del nombre y etiquetas de categoría
    body = []
    for l in lines:
        t = l.removeprefix("## ").strip()
        if t.lower().rstrip(":") == name.lower() or t.startswith("Recomendaciones ") or t in body:
            continue
        if re.fullmatch(r"(Ecografia y Doppler|Doppler y ecografía|TAC|Ultrasonografía|Ecografía-Doppler)", t):
            continue
        body.append(t)
    services = sorted({SERVICE_BY_CATEGORY[c] for c in r["cats"] if c in SERVICE_BY_CATEGORY})
    prep = any("recomendaciones" in c for c in r["cats"]) or any(re.search(r"preparaci[oó]n|ayun|requisitos|recomendaciones", t, re.I) for t in body)
    catalog.append({"slug": slug, "nombre": name, "servicios": services, "categorias": r["cats"],
                    "requierePreparacion": prep, "texto": body})

out.write_text(json.dumps(catalog, ensure_ascii=False, indent=2), encoding="utf-8")
print(len(catalog), "exámenes;", sum(c["requierePreparacion"] for c in catalog), "con preparación;",
      sum(not c["servicios"] for c in catalog), "sin servicio asignado")
