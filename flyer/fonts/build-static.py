#!/usr/bin/env python3
"""
Produce static weight instances of the two variable webfonts.

Why: Chromium's PDF backend cannot serialise a *variable* font instance as an
embedded TrueType subset, so it falls back to Type 3 fonts — every glyph becomes
an inline PDF drawing procedure. That still prints (it is vector), but it bloats
the file and some print preflight profiles reject Type 3. Static instances get
embedded properly as subsetted TrueType (/FontFile2).

Run from the repo root:  python3 flyer/fonts/build-static.py
Requires: fonttools, brotli   (pip install fonttools brotli)
"""
import pathlib
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

HERE = pathlib.Path(__file__).parent

JOBS = [
    ('Archivo-latin-var.woff2', 'Archivo', [600, 800, 900]),
    ('IBMPlexSans-latin-var.woff2', 'IBMPlexSans', [400, 500, 600, 700]),
]

for src, stem, weights in JOBS:
    for w in weights:
        f = TTFont(HERE / src)
        instancer.instantiateVariableFont(f, {'wght': w}, inplace=True, updateFontNames=False)
        # Skia keys off the OS/2 weight class when embedding, so make it explicit.
        f['OS/2'].usWeightClass = w
        f.flavor = 'woff2'
        out = HERE / f'{stem}-{w}.woff2'
        f.save(out)
        print(f'wrote {out.name}  ({out.stat().st_size // 1024} KB)')
