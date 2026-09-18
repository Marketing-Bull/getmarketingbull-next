# Marketing Bull — half-Letter flyer

Two-sided 8.5 × 5.5 in **landscape** flyer, authored as HTML/CSS and rendered to
PDF with Playwright so it reuses the site's own palette and type rather than a
separate design file.

It is deliberately near-poster: 20 words on the front, 66 on the back. Anything
that did not earn its place has been cut rather than set smaller.

## Files

| File | What it is |
| --- | --- |
| `flyer.html` | The whole flyer. Opens standalone in a browser (shows the bleed variant). |
| `build.mjs` | Renders both PDFs + both PNG previews, then post-flights the PDFs. |
| `check.mjs` | Print-safety gate: safe-area overflow, page fit, fonts actually loaded. |
| `qr.mjs` | Regenerates `qr.png`. |
| `fonts/build-static.py` | Cuts the static font weights from the variable originals. |
| `marketing-bull-flyer-print.pdf` | **Send this to the printer.** 8.75 × 5.75 in (trim + bleed). |
| `marketing-bull-flyer-digital.pdf` | 8.5 × 5.5 in exactly, no bleed. Email / screen. |
| `preview-front.png`, `preview-back.png` | 300 DPI previews at trim size (2550 × 1650). |

## Build

```bash
npm install                 # playwright is already a devDependency
npx playwright install chromium
node flyer/check.mjs        # fails if anything breaks the safe area
node flyer/build.mjs        # writes both PDFs and both previews
```

## Specs for the printer

- **Trim:** 8.5 in × 5.5 in, landscape, 2 sides.
- **Bleed:** 0.125 in on all four sides. The print PDF is 8.75 × 5.75 in with the
  trim centred — art runs to the page edge on every side.
- **Safe margin:** 0.25 in from trim. No text or critical content crosses it
  (`check.mjs` asserts this on every build).
- **Crop marks:** none, deliberately. At trim + 0.125 in bleed there is no slug
  room to place marks without printing them on the piece. Trim is the centred
  8.5 × 5.5 rectangle. If your workflow needs marks, impose them — do not scale
  the PDF.
- **Colour:** RGB. Everything is flat brand colour, no gradients, transparency or
  blend modes, so a straight RGB → CMYK conversion is safe. Expect the bull red
  (`#e11d2a`) to lose a little brilliance in CMYK; if the run justifies it, ask
  for a spot red or a rich-black build of `#0c0c0e`.
- **Ink coverage:** the front is a near-solid dark field and the back carries a
  full-width ink band at the foot. Specify a coated or dull stock; on uncoated the
  solids will look flatter. 100 lb gloss text or heavier is the safe call.
- **Fonts:** Archivo and IBM Plex Sans, embedded as subsetted TrueType. No Type 3
  fonts, no substituted faces — `build.mjs` refuses to finish if either appears.
- **Type floor:** body copy is 10–12.6 pt; the smallest text on the piece (the
  step tags and the proof attribution) is 7 pt and is used only for labels, never
  for anything a reader has to read at length.
- **Raster content:** only the bull logo (783 × 506 — ~184 DPI at its largest
  placed size, 4.25 in on the front) and the QR (1024 × 1024, ~1400 DPI at 0.72 in).
  All other artwork, including every rule and band, is vector.

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

Copy and proof points come from the live site (`src/lib/constants.ts`). The back
carries the four engagements in `OFFERS` order, each as a name, its `step` tag,
and one line:

| # | Offer | Step |
| --- | --- | --- |
| 01 | Website in 14 Days | Get found |
| 02 | Intake Gap Audit | Get signed |
| 03 | AI Content & Search Engine | Get called |
| 04 | Lead Generation | Get in front |

Lead Generation was added to the site in PR #9 and is carried here with its own
`step` wording, "Get in front", not a paraphrase. "AI Content & Search Engine" is
set as "AI Content & Search" so the four titles hold one line each in the 2 × 2
grid; the name on the site is unchanged.

Things that are load-bearing and easy to get wrong:

- The phone is **1-833-GET-BULL = 1-833-438-2855**.
- The free thing is the **consultation**. The Intake Gap Audit is paid (credited
  toward other work), so it must never be described as free.
- There is no Home Services vertical, no founding year, and no stat that is not
  attributable to a named client on the site.

If the site's offers change, update this flyer with them. Resist adding: the
piece works because of what is not on it. The word budgets are 25 on the front
and 75 on the back — every addition should displace something.
