"""
Renders public/og.png (1200x630) for the dark-editorial portfolio identity.

Pure Pillow + real typefaces, because this sandbox has no SVG rasteriser
(no rsvg, no cairo) and no browser. Mirrors public/og.svg so the two stay in
sync: charcoal field, lime grid bloom, Anton poster name, mono meta rail.

    python3 tools/render-og.py
"""

from __future__ import annotations

import os
import pathlib

import numpy as np
from PIL import Image, ImageDraw, ImageFont

W, H = 1200, 630
ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "og.png"
FONT_DIR = pathlib.Path(os.environ.get("OG_FONT_DIR", pathlib.Path.home() / ".fonts-cache"))

# Palette — identical to src/index.css
CARBON = (11, 11, 10)
CARBON_2 = (18, 18, 14)
CHALK = (242, 242, 233)
ASH = (180, 180, 164)
FOG = (138, 138, 122)
LIME = (212, 255, 56)
BLUE = (91, 140, 255)


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONT_DIR / f"{name}.ttf"), size)


def tracked(draw: ImageDraw.ImageDraw, xy, text, fnt, fill, tracking=0.0, anchor_origin=True):
    """Draw text with manual letter-spacing (Pillow has none)."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill, anchor="ls" if anchor_origin else "la")
        x += fnt.getlength(ch) + tracking
    return x


def tracked_width(fnt, text, tracking=0.0):
    return sum(fnt.getlength(c) for c in text) + tracking * max(len(text) - 1, 0)


def star(cx: float, cy: float, outer: float, inner: float, points: int = 5):
    """Five-point star polygon, first point up."""
    import math

    verts = []
    for i in range(points * 2):
        r = outer if i % 2 == 0 else inner
        a = -math.pi / 2 + i * math.pi / points
        verts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
    return verts


def radial_glow(w, h, colour, strength):
    """Soft elliptical bloom as an RGBA overlay."""
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    cx, cy = w / 2, h / 2
    d = np.sqrt(((xx - cx) / (w / 2)) ** 2 + ((yy - cy) / (h / 2)) ** 2)
    alpha = np.clip(1.0 - d, 0, 1) ** 2 * strength
    layer = np.zeros((h, w, 4), dtype=np.uint8)
    layer[..., 0], layer[..., 1], layer[..., 2] = colour
    layer[..., 3] = (alpha * 255).astype(np.uint8)
    return Image.fromarray(layer, "RGBA")


def build() -> Image.Image:
    # ── base field: subtle diagonal warm-to-cool charcoal ──
    grad = np.zeros((H, W, 3), dtype=np.float32)
    for y in range(H):
        t = y / (H - 1)
        for i in range(3):
            base = CARBON[i] * (1 - t) + CARBON_2[i] * t
            grad[y, :, i] = base
    img = Image.fromarray(grad.astype(np.uint8), "RGB").convert("RGBA")

    # ── ambient blooms ──
    glow = radial_glow(760, 760, LIME, 0.16)
    img.alpha_composite(glow, (860, -230))
    glow2 = radial_glow(900, 900, BLUE, 0.10)
    img.alpha_composite(glow2, (620, -150))

    # ── 60px grid ──
    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(grid)
    for x in range(0, W + 1, 60):
        gd.line([(x, 0), (x, H)], fill=(255, 255, 255, 12), width=1)
    for y in range(0, H + 1, 60):
        gd.line([(0, y), (W, y)], fill=(255, 255, 255, 12), width=1)
    img.alpha_composite(grid)

    # ── soft vignette (smooth, no banding) ──
    yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
    dx = (xx - W / 2) / (W / 2)
    dy = (yy - H / 2) / (H / 2)
    dist = np.sqrt(dx * dx + dy * dy) / np.sqrt(2)
    vig = np.zeros((H, W, 4), dtype=np.uint8)
    vig[..., 3] = (np.clip(dist - 0.55, 0, 1) ** 1.6 * 130).astype(np.uint8)
    img.alpha_composite(Image.fromarray(vig, "RGBA"))

    d = ImageDraw.Draw(img)

    # ── top meta rule ──
    d.line([(64, 92), (1136, 92)], fill=(255, 255, 255, 36), width=1)
    mono = font("JetBrainsMono-Medium", 14)
    tracked(d, (64, 74), "PORTFOLIO — VOL. 03", mono, FOG, 3.1)
    right = "JAVA DEVELOPER / PROBLEM SOLVER"
    tracked(d, (1136 - tracked_width(mono, right, 3.1), 74), right, mono, FOG, 3.1)

    # ── availability ──
    d.ellipse([64, 118, 72, 126], fill=LIME)
    small = font("JetBrainsMono-Medium", 12)
    tracked(
        d,
        (82, 129),
        "OPEN TO INTERNSHIPS & FULL-TIME ROLES",
        small,
        LIME,
        2.4,
    )

    # ── poster name ──
    anton = font("Anton-Regular", 178)
    d.text((58, 348), "ANIKET", font=anton, fill=CHALK, anchor="ls")
    width_jumde = anton.getlength("JUMDE")
    d.text((58, 506), "JUMDE", font=anton, fill=CHALK, anchor="ls")
    d.text((58 + width_jumde + 4, 506), ".", font=anton, fill=LIME, anchor="ls")

    # ── descriptor ──
    body = font("InterTight-Regular", 25)
    d.text((64, 556), "Multi-role web applications with relational backends —", font=body, fill=ASH, anchor="ls")
    d.text((64, 592), "schema, servlets, and interface built to agree.", font=body, fill=ASH, anchor="ls")

    # ── metrics rail ──
    mrx = 892
    d.line([(mrx, 176), (mrx + 244, 176)], fill=LIME, width=2)
    numbers = font("Anton-Regular", 42)
    labels = font("JetBrainsMono-Medium", 10)
    rows = [("1+", "YEARS JAVA"), ("150+", "LEETCODE"), ("5", "HACKERRANK"), ("8.22", "CGPA B.TECH")]
    for i, (num, label) in enumerate(rows):
        y = 232 + i * 66
        d.text((mrx, y), num, font=numbers, fill=CHALK, anchor="ls")
        if num == "5":
            # Anton ships no star glyph, so draw one at cap-height.
            star_cx = mrx + numbers.getlength("5") + 16
            star_cy = y - 15
            d.polygon(star(star_cx, star_cy, 15, 6.2), fill=CHALK)
        tracked(d, (mrx + 132, y - 2), label, labels, FOG, 1.7)
    d.line([(mrx, 468), (mrx + 244, 468)], fill=(255, 255, 255, 31), width=1)

    # ── footer ──
    d.line([(64, 612), (1136, 612)], fill=(212, 255, 56, 90), width=1)
    url = font("JetBrainsMono-Medium", 13)
    tracked(
        d,
        (1136 - tracked_width(url, "aniketjumdeportfolio.vercel.app", 1.4), 600),
        "aniketjumdeportfolio.vercel.app",
        url,
        FOG,
        1.4,
    )

    return img.convert("RGB")


if __name__ == "__main__":
    card = build()
    card.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT} — {card.size[0]}x{card.size[1]}, {OUT.stat().st_size:,} bytes")
