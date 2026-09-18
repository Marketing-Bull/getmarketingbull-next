# Marketing Bull — half-Letter flyer

Two-sided 5.5 × 8.5 in portrait flyer, authored as HTML/CSS and rendered to PDF
with Playwright so it reuses the site's own palette and type rather than a
separate design file.

## Files

| File | What it is |
| --- | --- |
| `flyer.html` | The whole flyer. Opens standalone in a browser (shows the bleed variant). |
| `build.mjs` | Renders both PDFs + both PNG previews, then post-flights the PDFs. |
| `check.mjs` | Print-safety gate: safe-area overflow, page fit, fonts actually loaded. |
| `qr.mjs` | Regenerates `qr.png`. |
| `fonts/build-static.py` | Cuts the static font weights from the variable originals. |
| `marketing-bull-flyer-print.pdf` | **Send this to the printer.** 5.75 × 8.75 in (trim + bleed). |
| `marketing-bull-flyer-digital.pdf` | 5.5 × 8.5 in exactly, no bleed. Email / screen. |
| `preview-front.png`, `preview-back.png` | 300 DPI previews at trim size. |

## Build

```bash
npm install                 # playwright is already a devDependency
npx playwright install chromium
node flyer/check.mjs        # fails if anything breaks the safe area
node flyer/build.mjs        # writes both PDFs and both previews
```

## Specs for the printer

- **Trim:** 5.5 in × 8.5 in, portrait, 2 sides.
- **Bleed:** 0.125 in on all four sides. The print PDF is 5.75 × 8.75 in with the
  trim centred — art runs to the page edge on every side.
- **Safe margin:** 0.25 in from trim. No text or critical content crosses it
  (`check.mjs` asserts this on every build).
- **Crop marks:** none, deliberately. At trim + 0.125 in bleed there is no slug
  room to place marks without printing them on the piece. Trim is the centred
  5.5 × 8.5 rectangle. If your workflow needs marks, impose them — do not scale
  the PDF.
- **Colour:** RGB. Everything is flat brand colour, no gradients, transparency or
  blend modes, so a straight RGB → CMYK conversion is safe. Expect the bull red
  (`#e11d2a`) to lose a little brilliance in CMYK; if the run justifies it, ask
  for a spot red or a rich-black build of `#0c0c0e`.
- **Ink coverage:** the front is a near-solid dark field. Specify a coated or dull
  stock; on uncoated the solid will look flatter and the 9 pt reversed copy will
  gain. 100 lb gloss text or heavier is the safe call.
- **Fonts:** Archivo and IBM Plex Sans, embedded as subsetted TrueType. No Type 3
  fonts, no substituted faces — `build.mjs` refuses to finish if either appears.
- **Type floor:** body copy is 8.4–9.4 pt; the smallest text on the piece (source
  attributions and field labels) is 5.6–6.5 pt and is used only for labels, never
  for anything a reader has to read at length.
- **Raster content:** only three placed images — the bull logo (783 × 506, ~250 DPI
  at its placed size) and the QR (1024 × 1024, ~1200 DPI). All other artwork,
  including every rule, panel and faceted corner, is vector.

## Notes on the two mechanical choices that are not obvious

**Static fonts, not the variable originals.** Chromium's PDF writer cannot embed a
variable-font instance as a TrueType subset; it silently falls back to Type 3
glyph procedures. Still vector, but it bloated the file ~40× and some preflight
profiles reject Type 3. `fonts/build-static.py` cuts only the weights in use.

**No grain/noise layer.** An `feTurbulence` background forces Chromium to flatten
the entire page to a ~150 DPI bitmap — every element beneath it gets resampled,
and the file went to 6.7 MB. At the opacity it would have been used, it bought
nothing a press would reproduce, so the pages stay fully vector.

## Content

Copy and proof points are drawn from the live site (`src/lib/constants.ts`,
`src/app/page.tsx`): the three engagements, the four-step engagement flow, the
two verticals, and real attributed outcomes and testimonials. If the site's
offers change, update this flyer with them.
