"""Logo de Radiólogos Asociados: quita marco/sombra, fondo transparente, variantes clara/oscura e icono."""
import sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw

src, out_dir = Path(sys.argv[1]), Path(sys.argv[2])
out_dir.mkdir(parents=True, exist_ok=True)
rgb = np.asarray(Image.open(src).convert("RGB")).astype(np.float32) / 255.0
h, w = rgb.shape[:2]

# 1) color-to-alpha contra blanco
alpha = np.clip(np.max(1.0 - rgb, axis=2), 0, 1)
safe = np.where(alpha > 1e-4, alpha, 1)[..., None]
color = np.clip((rgb - (1 - alpha[..., None])) / safe, 0, 1)

# 2) recorte al contenido "fuerte" (la sombra del marco es tenue y queda fuera)
strong = alpha > 0.35
ys, xs = np.where(strong)
pad = 12
x0, x1 = max(0, xs.min() - pad), min(w, xs.max() + 1 + pad)
y0, y1 = max(0, ys.min() - pad), min(h, ys.max() + 1 + pad)
rgb, alpha, color = rgb[y0:y1, x0:x1], alpha[y0:y1, x0:x1], color[y0:y1, x0:x1]
h, w = rgb.shape[:2]

# 3) el icono: blancos encerrados (brillos y trébol de radiación) deben quedar opacos.
#    Se detecta el límite icono/texto como la primera columna con texto negro.
dark_text = (rgb.max(axis=2) < 0.25)
cols = np.where(dark_text.any(axis=0))[0]
split = int(cols.min()) - 4
light = Image.fromarray(np.where(alpha < 0.3, 255, 0).astype(np.uint8), "L").copy()
for seed in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
    ImageDraw.floodfill(light, seed, 128)
enclosed = (np.asarray(light) != 128)
icon_zone = np.zeros_like(enclosed)
icon_zone[:, :split] = True
keep = enclosed & icon_zone
color[keep] = rgb[keep]
alpha[keep] = 1.0
alpha = np.where(alpha < 0.04, 0, alpha)

def to_img(c, a):
    return Image.fromarray((np.dstack([c, a]) * 255).round().astype(np.uint8), "RGBA")

full = to_img(color, alpha)
full.save(out_dir / "logo.png", optimize=True)
full.save(out_dir / "logo.webp", "WEBP", quality=92, method=6)

# 4) variante para fondo oscuro: el texto negro (gris sin saturación) pasa a blanco
sat = color.max(axis=2) - color.min(axis=2)
neutral_dark = (sat < 0.12) & (color.max(axis=2) < 0.5)
neutral_dark[:, :split] = False  # el icono no se toca
dark = color.copy()
dark[neutral_dark] = 1.0
to_img(dark, alpha).save(out_dir / "logo-dark.webp", "WEBP", quality=92, method=6)

# 5) icono solo
# el borde derecho del icono termina donde arranca la línea horizontal que lo une al texto
icon_right = split - 58
ia = alpha[:, :icon_right]
iy, ix = np.where(ia > 0.05)
icon = to_img(color, alpha).crop((max(0, ix.min() - 6), max(0, iy.min() - 6), min(icon_right, ix.max() + 7), iy.max() + 7))
icon.save(out_dir / "icon.png", optimize=True)
icon.save(out_dir / "icon.webp", "WEBP", quality=92, method=6)
s = max(icon.size)
sq = Image.new("RGBA", (s, s), (0, 0, 0, 0))
sq.paste(icon, ((s - icon.width) // 2, (s - icon.height) // 2))
for size, name in [(512, "icon-512.png"), (180, "apple-touch-icon.png"), (32, "favicon-32.png")]:
    sq.resize((size, size), Image.LANCZOS).save(out_dir / name, optimize=True)

# 6) color de marca: mediana de los azules saturados y opacos del icono
c = rgb[:, :split][(alpha[:, :split] > 0.95) & ((rgb[:, :split].max(axis=2) - rgb[:, :split].min(axis=2)) > 0.45)]
med = np.median(c, axis=0)
dark_blue = np.percentile(c, 20, axis=0)
hexc = lambda v: "#%02X%02X%02X" % tuple(int(round(x * 255)) for x in v)
print("tamaño", full.size, "split", split, "icono", icon.size)
print("azul de marca (mediana)", hexc(med), "| azul oscuro (p20)", hexc(dark_blue))
