#!/usr/bin/env python3
"""Gera capas do blog (1200x630) e carrosséis do Instagram (1080x1350).

Uso:
  python3 tools/blog/compose.py spec.json

spec.json:
{
  "slug": "meta-iwsdk-ia-cria-vr",
  "hero": "caminho/para/imagem-3d.png",      # arte 3D (opcional)
  "kicker": "REPOSITÓRIO DA SEMANA",          # selo acima do título
  "title": "A Meta ensinou a IA a criar VR",  # título da capa (curto)
  "highlight": "criar VR",                    # trecho do título em destaque (opcional)
  "repo": "github.com/meta-quest/immersive-web-sdk",
  "slides": [                                  # slides internos do carrossel
    {"title": "O que é", "body": "Texto curto..."},
    {"title": "...", "bullets": ["item", "item"]},
    {"title": "...", "code": "npm create @iwsdk"}
  ],
  "cta": "Link do artigo completo na bio"
}

Saídas:
  img/artigos/<slug>.jpg                 (capa do blog / og:image)
  social/<slug>/01.jpg ... NN.jpg        (carrossel 4:5)
"""
import json
import sys
import textwrap
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[2]
FONTS = Path(__file__).resolve().parent / "fonts"

YELLOW = (255, 217, 0)
INK = (12, 12, 14)
PAPER = (236, 236, 238)
DARK = (11, 11, 13)
MUTED = (150, 150, 162)
HANDLE = "@natanaelddd"


def font(weight: str, size: int) -> ImageFont.FreeTypeFont:
    name = {"black": "Inter-Black.otf", "bold": "Inter-Bold.otf", "semi": "Inter-SemiBold.otf",
            "medium": "Inter-Medium.otf", "mono": "DejaVuSansMono.ttf"}[weight]
    return ImageFont.truetype(str(FONTS / name), size)


def wrap(draw, text, fnt, max_w):
    words, lines, cur = text.split(), [], ""
    for w in words:
        test = f"{cur} {w}".strip()
        if draw.textlength(test, font=fnt) <= max_w:
            cur = test
        else:
            if cur:
                lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines


def fit_title(draw, text, weight, max_w, max_lines, start, minimum):
    size = start
    while size > minimum:
        f = font(weight, size)
        lines = wrap(draw, text, f, max_w)
        if len(lines) <= max_lines:
            return f, lines
        size -= 4
    f = font(weight, minimum)
    return f, wrap(draw, text, f, max_w)


def draw_title(draw, xy, lines, fnt, color, highlight=None, hl_color=YELLOW, line_gap=1.08, center=False, width=None):
    x, y = xy
    hl_words = set((highlight or "").lower().split())
    lh = int(fnt.size * line_gap)
    for line in lines:
        lw = draw.textlength(line, font=fnt)
        cx = x + (width - lw) / 2 if center and width else x
        for i, word in enumerate(line.split(" ")):
            token = word if i == 0 else " " + word
            clean = word.lower().strip(".,:;!?\"'")
            col = hl_color if clean in hl_words else color
            draw.text((cx, y), token, font=fnt, fill=col)
            cx += draw.textlength(token, font=fnt)
        y += lh
    return y


def pill(draw, xy, text, fnt, fg, bg, pad=(22, 10)):
    x, y = xy
    w = draw.textlength(text, font=fnt)
    h = fnt.size
    draw.rounded_rectangle((x, y, x + w + pad[0] * 2, y + h + pad[1] * 2 + 4), radius=999, fill=bg)
    draw.text((x + pad[0], y + pad[1]), text, font=fnt, fill=fg)
    return x + w + pad[0] * 2


def load_hero(path, size):
    img = Image.open(path).convert("RGB")
    return ImageOps.fit(img, size, method=Image.LANCZOS, centering=(0.5, 0.62))


def footer(draw, W, H, dark=True, page=None, total=None):
    col = MUTED if dark else (90, 90, 100)
    f = font("semi", 26)
    draw.text((64, H - 70), HANDLE, font=f, fill=col)
    if page and total:
        t = f"{page}/{total}"
        draw.text((W - 64 - draw.textlength(t, font=f), H - 70), t, font=f, fill=col)


# ---------------- Instagram ----------------
def slide_cover(spec, total):
    W, H = 1080, 1350
    bg = PAPER
    if spec.get("hero"):
        hero = load_hero(ROOT / spec["hero"], (W, H))
        # cor do fundo da arte (faixa do topo) para emendar sem costura
        top = hero.crop((0, 0, W, 20)).resize((1, 1), Image.LANCZOS).getpixel((0, 0))
        bg = tuple(top)
        shift = 70  # empurra a arte para baixo, abrindo espaço para o título
        im = Image.new("RGB", (W, H), bg)
        im.paste(hero.crop((0, 0, W, H - shift)), (0, shift))
    else:
        im = Image.new("RGB", (W, H), PAPER)
    # véu no topo para o texto respirar
    veil = Image.new("L", (W, H), 0)
    vd = ImageDraw.Draw(veil)
    for yy in range(0, 600):
        vd.line([(0, yy), (W, yy)], fill=int(255 * (1 - yy / 600) ** 1.6))
    im = Image.composite(Image.new("RGB", (W, H), bg), im, veil)
    d = ImageDraw.Draw(im)
    kicker = font("bold", 26)
    pill(d, (64, 70), spec.get("kicker", "REPOSITÓRIO DO DIA").upper(), kicker, INK, YELLOW)
    f, lines = fit_title(d, spec["title"], "black", W - 128, 3, 94, 60)
    draw_title(d, (64, 150), lines, f, INK, spec.get("highlight"), hl_color=(0, 0, 0))
    # sublinhado amarelo no destaque: desenhado como faixa atrás do texto já é complexo; usamos selo
    if spec.get("repo"):
        rf = font("mono", 26)
        txt = spec["repo"]
        tw = d.textlength(txt, font=rf)
        x, y = 64, H - 150
        d.rounded_rectangle((x, y, x + tw + 44, y + 58), radius=14, fill=(12, 12, 14))
        d.text((x + 22, y + 14), txt, font=rf, fill=(255, 255, 255))
    f2 = font("semi", 26)
    swipe = "arrasta →"
    d.text((W - 64 - d.textlength(swipe, font=f2), H - 136), swipe, font=f2, fill=INK)
    return im


def _content_block(d, s, W, y):
    """Desenha o bloco de conteúdo a partir de y e devolve o y final."""
    d.rectangle((64, y, 64 + 72, y + 10), fill=YELLOW)
    y += 44
    tf, tlines = fit_title(d, s["title"], "black", W - 128, 3, 88, 56)
    y = draw_title(d, (64, y), tlines, tf, (255, 255, 255), s.get("highlight"))
    y += 36
    if s.get("body"):
        bf = font("medium", 46)
        for para in s["body"].split("\n"):
            for line in wrap(d, para, bf, W - 128):
                d.text((64, y), line, font=bf, fill=(214, 214, 222))
                y += 64
            y += 26
    if s.get("bullets"):
        bf = font("medium", 44)
        for b in s["bullets"]:
            lines = wrap(d, b, bf, W - 128 - 52)
            d.rounded_rectangle((64, y + 16, 64 + 24, y + 40), radius=6, fill=YELLOW)
            for line in lines:
                d.text((64 + 52, y), line, font=bf, fill=(224, 224, 230))
                y += 60
            y += 22
    if s.get("code"):
        cf = font("mono", 34)
        lines = s["code"].split("\n")
        box_h = 52 * len(lines) + 60
        d.rounded_rectangle((64, y, W - 64, y + box_h), radius=18, fill=(24, 24, 30), outline=(50, 50, 60), width=2)
        cy = y + 30
        for line in lines:
            d.text((96, cy), line, font=cf, fill=YELLOW if line.startswith("$") else (230, 230, 236))
            cy += 52
        y += box_h + 34
    if s.get("note"):
        nf = font("medium", 34)
        for line in wrap(d, s["note"], nf, W - 128):
            d.text((64, y), line, font=nf, fill=MUTED)
            y += 50
    return y


def slide_content(s, idx, total):
    W, H = 1080, 1350
    # 1ª passada: mede a altura do bloco
    probe = Image.new("RGB", (W, H * 2), DARK)
    h = _content_block(ImageDraw.Draw(probe), s, W, 0)
    top, bottom = 110, H - 120
    y0 = max(top, top + ((bottom - top) - h) // 2 - 30)
    im = Image.new("RGB", (W, H), DARK)
    d = ImageDraw.Draw(im)
    _content_block(d, s, W, y0)
    footer(d, W, H, True, idx, total)
    return im


def slide_cta(spec, total):
    W, H = 1080, 1350
    im = Image.new("RGB", (W, H), YELLOW)
    d = ImageDraw.Draw(im)
    f, lines = fit_title(d, spec.get("cta_title", "Salva pra testar depois"), "black", W - 128, 3, 104, 70)
    y = draw_title(d, (64, 300), lines, f, INK)
    bf = font("semi", 42)
    y += 40
    for item in spec.get("cta_items", [
        "Artigo completo, com passo a passo, no link da bio",
        "Manda pra quem trabalha com VR ou Unreal",
        "Segue para um repositório novo por dia",
    ]):
        for i, line in enumerate(wrap(d, item, bf, W - 128 - 60)):
            if i == 0:
                d.text((64, y), "→", font=bf, fill=INK)
            d.text((64 + 60, y), line, font=bf, fill=INK)
            y += 60
        y += 24
    hf = font("black", 56)
    d.text((64, H - 190), HANDLE, font=hf, fill=INK)
    sf = font("semi", 28)
    d.text((64, H - 110), "Realidade Virtual · Unreal Engine · IA", font=sf, fill=(60, 50, 0))
    return im


# ---------------- Blog cover ----------------
def blog_cover(spec):
    W, H = 1200, 630
    im = Image.new("RGB", (W, H), DARK)
    if spec.get("hero"):
        hero = load_hero(ROOT / spec["hero"], (520, H))
        im.paste(hero, (W - 520, 0))
    d = ImageDraw.Draw(im)
    pill(d, (56, 56), spec.get("kicker", "REPOSITÓRIO DO DIA").upper(), font("bold", 20), INK, YELLOW, pad=(18, 8))
    f, lines = fit_title(d, spec.get("blog_title", spec["title"]), "black", 580, 4, 60, 38)
    draw_title(d, (56, 130), lines, f, (255, 255, 255), spec.get("highlight"))
    if spec.get("repo"):
        d.text((56, H - 120), spec["repo"], font=font("mono", 22), fill=YELLOW)
    d.text((56, H - 76), "natanael.com.br", font=font("semi", 22), fill=MUTED)
    return im


def main():
    spec = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
    slug = spec["slug"]
    out_blog = ROOT / "img" / "artigos"
    out_blog.mkdir(parents=True, exist_ok=True)
    blog_cover(spec).save(out_blog / f"{slug}.jpg", quality=88, optimize=True, progressive=True)

    slides = spec.get("slides", [])
    total = len(slides) + 2
    out = ROOT / "social" / slug
    out.mkdir(parents=True, exist_ok=True)
    for old in out.glob("*.jpg"):
        old.unlink()
    imgs = [slide_cover(spec, total)] + [slide_content(s, i + 2, total) for i, s in enumerate(slides)] + [slide_cta(spec, total)]
    for i, im in enumerate(imgs, 1):
        im.save(out / f"{i:02d}.jpg", quality=92, optimize=True)
    print(f"capa: img/artigos/{slug}.jpg | carrossel: social/{slug}/ ({len(imgs)} slides)")


if __name__ == "__main__":
    main()
