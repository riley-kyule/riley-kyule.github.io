#!/usr/bin/env python3
"""Build the site's still image assets from the source photos in assets/.

The hero video pipeline from the brief is intentionally not used; the hero is the
transparent full-body cutout. This script produces:

  public/portrait-full.webp   full-body cutout for the hero (transparent WebP)
  public/portrait-full-360.webp  smaller variant for phones
  public/portrait-bust.webp   480x600 head-to-shirt crop for the ID card
  public/og.jpg               1200x630 social preview

Requires: Pillow, fontTools and brotli (`pip install pillow fonttools brotli`).
Usage:    python3 scripts/build-hero-assets.py
"""
from io import BytesIO
from pathlib import Path

from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets"
PUB = ROOT / "public"
PAPER = (244, 242, 238)
INK = (13, 13, 13)
MUTE = (95, 93, 88)


def woff2_font(name: str, size: int, wght: int | None = None) -> ImageFont.FreeTypeFont:
    """Load a self-hosted .woff2 from src/fonts as a Pillow font."""
    f = TTFont(ROOT / "src" / "fonts" / name)
    f.flavor = None
    buf = BytesIO()
    f.save(buf)
    buf.seek(0)
    font = ImageFont.truetype(buf, size)
    if wght is not None:
        try:
            font.set_variation_by_axes([wght])
        except OSError:
            pass
    return font


def bust() -> None:
    im = Image.open(SRC / "riley-headshot.webp").convert("RGB")
    w, h = im.size
    target = 480 / 600
    cw = min(w, round(h * target))
    ch = round(cw / target)
    left = (w - cw) // 2
    im.crop((left, 0, left + cw, ch)).resize((480, 600), Image.LANCZOS).save(PUB / "portrait-bust.webp", quality=86, method=6)


def full() -> Image.Image:
    im = Image.open(SRC / "riley-cutout.webp").convert("RGBA")
    cut = im.crop(im.getchannel("A").getbbox())
    cut.save(PUB / "portrait-full.webp", quality=88, method=6)
    small = cut.resize((360, round(cut.height * 360 / cut.width)), Image.LANCZOS)
    small.save(PUB / "portrait-full-360.webp", quality=84, method=6)
    return im


def og(cut: Image.Image) -> None:
    canvas = Image.new("RGB", (1200, 630), PAPER)
    d = ImageDraw.Draw(canvas)
    ghost = woff2_font("InterTight-Variable.woff2", 300, 800)
    d.text((620, 330), "RILEY", font=ghost, fill=(232, 229, 223), anchor="mm")
    person = cut.crop(cut.getchannel("A").getbbox())
    scale = 600 / person.height
    person = person.resize((round(person.width * scale), 600), Image.LANCZOS)
    canvas.paste(person, (1200 - person.width - 110, 30), person)
    mono = woff2_font("JetBrainsMono-Variable.woff2", 22, 500)
    title = woff2_font("InterTight-Variable.woff2", 84, 800)
    serif = ImageFont.truetype(BytesIO(_ttf("InstrumentSerif-Italic.woff2")), 52)
    d.text((72, 190), "RILEY KYULE  —  NAIROBI", font=mono, fill=MUTE)
    d.text((66, 240), "Full Stack &", font=title, fill=INK)
    d.text((66, 330), "DevOps Engineer.", font=title, fill=INK)
    d.text((72, 440), "who ships it and keeps it running.", font=serif, fill=MUTE)
    canvas.save(PUB / "og.jpg", quality=86, optimize=True)


def _ttf(name: str) -> bytes:
    f = TTFont(ROOT / "src" / "fonts" / name)
    f.flavor = None
    buf = BytesIO()
    f.save(buf)
    return buf.getvalue()


if __name__ == "__main__":
    PUB.mkdir(exist_ok=True)
    bust()
    og(full())
    for p in ("portrait-full.webp", "portrait-full-360.webp", "portrait-bust.webp", "og.jpg"):
        print(p, (PUB / p).stat().st_size // 1024, "KB")
