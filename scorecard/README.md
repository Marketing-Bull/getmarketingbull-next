# PI Intake Scorecard (lead magnet PDF)

The PDF handed out on `/pi-intake-scorecard` is authored as HTML/CSS and rendered with
Playwright, like the flyer in `../flyer`, so it uses the site's palette and the same
static Archivo and IBM Plex Sans cuts (`../flyer/fonts`).

| File | What it is |
| --- | --- |
| `scorecard.html` | The whole document, 11 US Letter pages. Opens standalone in a browser. |
| `build.mjs` | Renders `../public/pi-intake-scorecard.pdf` and a PNG per page into `previews/` (gitignored). Fails if the fonts fall back or any page overflows. |

```bash
npm i --no-save playwright   # build-only; deliberately not in package.json
node scorecard/build.mjs
```

Rebuild and commit the PDF whenever `scorecard.html` changes. The thank-you page links to
`/pi-intake-scorecard.pdf` (`SCORECARD_PDF_URL` in `src/app/pi-intake-scorecard/thanks/page.tsx`).

## Content rules

- The 19 questions, scoring key and self mystery-shop come from the Notion brief
  "Marketing Bull: Intake Audit front door + Mystery-shop ad kit (Sep 2026)". Keep the
  landing page's "What's inside" list in step with the document.
- Every statistic carries a footnoted source (page 2), and they match the ones the site
  already cites. Don't add an uncited figure.
- No dollar figure for any engagement: the Intake Gap Audit fee is "quoted in writing".
- Mystery-shop wording says "scored", never "recorded" (Florida all-party consent), and
  page 9 tells readers to take notes, not record.
- The proof on the back page is the WeSueThem.com testimonial from `TESTIMONIALS`.
  A Florida client result can replace it once one is approved for use.
