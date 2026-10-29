"""Extrae texto, enlaces e imágenes de páginas HTML descargadas (solo stdlib).
Uso: python -I extract_site.py <carpeta_html> <salida.md>
Separa el texto común a casi todas las páginas (cabecera/pie) del contenido propio de cada una."""
import sys, re, json
from html.parser import HTMLParser
from pathlib import Path
from collections import Counter

SKIP = {"script", "style", "noscript", "svg", "template", "iframe"}
BLOCK = {"p", "div", "section", "article", "header", "footer", "li", "ul", "ol", "h1", "h2", "h3", "h4", "h5", "h6",
         "br", "tr", "td", "th", "form", "label", "button", "nav", "main", "aside", "figure", "figcaption", "span"}


class Extract(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.skip = 0
        self.lines, self.cur = [], []
        self.links, self.images = [], []
        self.title = ""
        self.in_title = False
        self.heading = None

    def flush(self):
        t = re.sub(r"\s+", " ", "".join(self.cur)).strip()
        if t:
            self.lines.append(("## " if self.heading else "") + t if self.heading in ("h1", "h2") else t)
        self.cur = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in SKIP:
            self.skip += 1
            return
        if tag == "title":
            self.in_title = True
        if tag in BLOCK:
            self.flush()
        if tag in ("h1", "h2", "h3", "h4"):
            self.heading = tag
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])
        if tag == "img":
            src = a.get("data-src") or a.get("src") or ""
            if src and not src.startswith("data:"):
                self.images.append((src, a.get("alt", "")))

    def handle_endtag(self, tag):
        if tag in SKIP:
            self.skip = max(0, self.skip - 1)
            return
        if tag == "title":
            self.in_title = False
        if tag in BLOCK:
            self.flush()
        if tag in ("h1", "h2", "h3", "h4"):
            self.heading = None

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if not self.skip:
            self.cur.append(data)


def main():
    src, out = Path(sys.argv[1]), Path(sys.argv[2])
    pages = {}
    for f in sorted(src.glob("*.html")):
        p = Extract()
        p.feed(f.read_text(encoding="utf-8", errors="replace"))
        p.flush()
        # quita duplicados consecutivos
        lines = [l for i, l in enumerate(p.lines) if i == 0 or l != p.lines[i - 1]]
        pages[f.stem] = {"title": p.title.strip(), "lines": lines, "links": p.links, "images": p.images}

    n = len(pages)
    freq = Counter(l for pg in pages.values() for l in set(pg["lines"]))
    common = {l for l, c in freq.items() if c >= n * 0.7}

    with out.open("w", encoding="utf-8") as fh:
        fh.write(f"# Extracción del sitio actual ({n} páginas)\n\n")
        fh.write("## TEXTO COMÚN (cabecera / pie, aparece en ≥70% de las páginas)\n\n")
        seen = set()
        for l in pages.get("inicio", next(iter(pages.values())))["lines"]:
            if l in common and l not in seen:
                seen.add(l)
                fh.write(f"- {l}\n")
        for name, pg in pages.items():
            fh.write(f"\n\n# PÁGINA: {name}\nTítulo: {pg['title']}\n\n")
            for l in pg["lines"]:
                if l not in common:
                    fh.write(f"{l}\n")
            ext = sorted({h for h in pg["links"] if h.startswith("http") and "radiologosasociadosbcabja.com" not in h})
            if ext:
                fh.write("\nEnlaces externos: " + " | ".join(ext) + "\n")
            imgs = [f"{s.rsplit('/',1)[-1]} (alt: {a})" for s, a in pg["images"] if "wp-content/uploads" in s]
            if imgs:
                fh.write("Imágenes: " + " | ".join(dict.fromkeys(imgs)) + "\n")
        allinternal = sorted({h for pg in pages.values() for h in pg["links"] if "radiologosasociadosbcabja.com" in h or h.startswith("/")})
        fh.write("\n\n# ENLACES INTERNOS ENCONTRADOS\n" + "\n".join(allinternal) + "\n")
        allext = Counter(h for pg in pages.values() for h in pg["links"] if h.startswith("http") and "radiologosasociadosbcabja.com" not in h)
        fh.write("\n# ENLACES EXTERNOS (veces)\n" + "\n".join(f"{c}x {h}" for h, c in allext.most_common()) + "\n")
    print("ok", n, "páginas;", len(common), "líneas comunes")


if __name__ == "__main__":
    main()
