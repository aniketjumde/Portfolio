"""
Renders public/og.png (1200x630) for the portfolio's dark-violet identity.

Pure Pillow + real Inter/JetBrains Mono files, because this sandbox has no SVG
rasteriser (no rsvg, no cairo) and no browser. Mirrors public/og.svg.

    python3 tools/render-og.py
"""

from __future__ import annotations

import math
import os
import pathlib

import numpy as np
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "og.png"
FONT_DIR = pathlib.Path(os.environ.get("OG_FONT_DIR", pathlib.Path.home() / ".fonts-cache"))

# Palette — identical to src/index.css
INK = (11, 11, 11)
INK_2 = (18, 18, 18)
WHITE = (255, 255, 255)
ASH = (183, 183, 190)
FOG = (140, 140, 149)
VIOLET = (168, 85, 247)
VIOLET_LIGHT = (192, 132, 252)


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_DIR / f"{name}.ttf"), size)


def star(cx: float, cy: float, outer: float, inner: float, points: int = 5):
    """Five-point star polygon, first point up."""
    verts = []
    for i in range(points * 2):
        r = outer if i % 2 == 0 else inner
        a = -math.pi / 2 + i * math.pi / points
        verts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    return verts


def radial_glow(w, h, colour, strength):
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    cx, cy = w / 2, h / 2
    d = np.sqrt(((xx - cx) / (w / 2)) ** 2 + ((yy - cy) / (h / 2)) ** 2)
    alpha = np.clip(1.0 - d, 0, 1) ** 2.1 * strength
    layer = np.zeros((h, w, 4), dtype=np.uint8)
    layer[..., 0], layer[..., 1], layer[..., 2] = colour
    layer[..., 3] = (alpha * 255).astype(np.uint8)
    return Image.fromarray(layer, "RGBA")


def build() -> Image.Image:
    # base field
    grad = np.zeros((H, W, 3), dtype=np.float32)
    for y in range(H):
        t = y / (H - 1)
        for i in range(3):
            grad[y, :, i] = INK[i] * (1 - t) + INK_2[i] * t
    img = Image.fromarray(grad.astype(np.uint8), "RGB").convert("RGBA")

    # violet blooms
    img.alpha_composite(radial_glow(760, 760, VIOLET, 0.30), (700, -300))
    img.alpha_composite(radial_glow(560, 560, VIOLET, 0.16), (-180, 320))

    # grid
    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    for x in range(0, W + 1, 56):
        gd.line([(x, 0), (x, H)], fill=(255, 255, 255, 11), width=1)
    for y in range(0, H + 1, 56):
        gd.line([(0, y), (W, y)], fill=(255, 255, 255, 11), width=1)
    img.alpha_composite(grid)

    # vignette
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    dx = (xx - W / 2) / (W / 2)
    dy = (yy - H / 2) / (H / 2)
    dist = np.sqrt(dx * dx + dy * dy) / math.sqrt(2)
    vig = np.zeros((H, H and W, 4), dtype=np.uint8)
    vig[..., 3] = (np.clip(dist - 0.52, 0, 1) ** 1.7 * 150).astype(np.uint8)
    img.alpha_composite(Image.fromarray(vig, "RGBA"))

    d = ImageDraw.Draw(img)

    # ── top bar ──
    d.rounded_rectangle([64, 58, 92, 86], radius=8, fill=VIOLET)
    d.text((78, 72), "AJ", font=font("InterTight-SemiBold", 15), fill=WHITE, anchor="mm")

    d.text((104, 72), "Aniket Jumde", font=font("InterTight-SemiBold", 17), fill=WHITE, anchor="lm")

    # availability, right aligned
    label = "OPEN TO WORK"
    small = font("JetBrainsMono-Medium", 12)
    lw = sum(small.getlength(c) for c in label) + 1.8 * (len(label) - 1)
    d.ellipse([W - 64 - lw - 20, 67, W - 64 - lw - 12, 75], fill=(52, 211, 153))
    x = W - 64 - lw
    for ch in label:
        d.text((x, 77), ch, font=small, fill=(52, 211, 153), anchor="ls")
        x += small.getlength(ch) + 1.8

    # ── main headline ──
    line1 = "Software Developer"
    line2 = "& Java Engineer"
    f1 = font("InterTight-SemiBold", 68)
    d.text((64, 216), line1, font=f1, fill=WHITE, anchor="ls")
    d.text((64, 296), line2, font=f1, fill=VIOLET_LIGHT, anchor="ls")

    # ── description ──
    body = font("InterTight-Regular", 23)
    d.text(
        (64, 366),
        "Full-stack Java systems with relational backends —",
        font=body,
        fill=ASH,
        anchor="ls",
    )
    d.text(
        (64, 400),
        "schema, servlets and interface built to agree.",
        font=body,
        fill=ASH,
        anchor="ls",
    )

    # ── metric strip ──
    top = 470
    d.line([(64, top), (1136, top)], fill=(255, 255, 255, 30), width=1)

    metrics = [("1+", "YEARS"), ("150+", "LEETCODE"), ("5★", "HACKERRANK"), ("8.22", "CGPA")]
    num_font = font("InterTight-SemiBold", 30)
    lbl_font = font("JetBrainsMono-Medium", 10)
    col_w = (1136 - 64) / 4

    for i, (num, lbl) in enumerate(metrics):
        cx = 64 + i * col_w
        if num == "5★":
            # The font subset has no star glyph, so draw the 5 and a star polygon.
            d.text((cx, 536), "5", font=num_font, fill=WHITE, anchor="ls")
            star_cx = cx + num_font.getlength("5") + 15
            d.polygon(star(star_cx, 525, 13, 5.4), fill=WHITE)
        else:
            d.text((cx, 536), num, font=num_font, fill=WHITE, anchor="ls")

        y = 560
        x = cx
        for ch in lbl:
            d.text((x, y), ch, font=lbl_font, fill=FOG, anchor="ls")
            x += lbl_font.getlength(ch) + 1.6

    # ── footer ──
    d.line([(64, 594), (1136, 594)], fill=(168, 85, 247, 90), width=1)
    url_font = font("JetBrainsMono-Medium", 12)
    url = "aniketjumdeportfolio.vercel.app"
    x = W - 64 - (sum(url_font.getlength(c) for c in url) + 1.3 * (len(url) - 1))
    for ch in url:
        d.text((x, 620), ch, font=url_font, fill=FOG, anchor="ls")
        x += url_font.getlength(ch) + 1.3

    return img.convert("RGB")


if __name__ == "__main__":
    card = build()
    card.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT} — {card.size[0]}x{card.size[1]}, {OUT.stat().st_size:,} bytes")
