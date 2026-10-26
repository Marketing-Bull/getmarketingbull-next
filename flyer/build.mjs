/**
 * Renders flyer.html to print-ready PDFs and 300 DPI PNG previews.
 *
 *   node flyer/build.mjs
 *
 * Outputs (all into flyer/), for each variant in VARIANTS:
 *   half-Letter (flyer.html, 2-sided, 8.5x5.5 landscape)
 *     marketing-bull-flyer-print.pdf / -digital.pdf, preview-front.png / preview-back.png
 *   Letter (flyer-letter.html, 1-sided, 8.5x11 portrait)
 *     marketing-bull-flyer-letter-print.pdf / -digital.pdf, preview-letter.png
 *   Print PDFs carry 0.125in bleed per side; digital PDFs are exact trim.
 *
 * The page size lives in flyer.html between the @PAGE_SIZE_START / _END markers so
 * the file still opens standalone in a browser. For the no-bleed variant we swap
 * that block and write a derived file next to the original, so the relative paths
 * to fonts/, qr.png and ../public/logo.png keep resolving.
 */
import { chromium } from 'playwright';
import { readFile, writeFile, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const DIR = dirname(fileURLToPath(import.meta.url));
export const VARIANTS = [
  {
    src: 'flyer.html', trim: { w: 8.5, h: 5.5 },
    print: 'marketing-bull-flyer-print.pdf', digital: 'marketing-bull-flyer-digital.pdf',
    previews: ['preview-front.png', 'preview-back.png'],
  },
  {
    src: 'flyer-letter.html', trim: { w: 8.5, h: 11 },
    print: 'marketing-bull-flyer-letter-print.pdf', digital: 'marketing-bull-flyer-letter-digital.pdf',
    previews: ['preview-letter.png'],
  },
];
const BLEED = 0.125;                  // inches, per side
const DPI = 300;

const START = '/* @PAGE_SIZE_START */';
const END = '/* @PAGE_SIZE_END */';

/** Swap the @page block for a given bleed amount and write a derived file. */
async function derive(html, TRIM, bleedIn, name) {
  const w = (TRIM.w + 2 * bleedIn).toFixed(3);
  const h = (TRIM.h + 2 * bleedIn).toFixed(3);
  const block = `${START}\n@page { size: ${w}in ${h}in; margin: 0; }\n:root { --bleed: ${bleedIn}in; }\n${END}`;
  const a = html.indexOf(START);
  const b = html.indexOf(END);
  if (a === -1 || b === -1) throw new Error('page-size markers not found');
  const out = html.slice(0, a) + block + html.slice(b + END.length);
  const path = join(DIR, name);
  await writeFile(path, out, 'utf8');
  return path;
}

/** Wait for webfonts so nothing renders in a fallback face. */
async function open(browser, path) {
  const page = await browser.newPage();
  await page.goto('file://' + path, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  // Both faces must be genuinely loaded, not substituted.
  const ok = await page.evaluate(() =>
    document.fonts.check('900 49px Archivo') && document.fonts.check('400 13px "IBM Plex Sans"')
  );
  if (!ok) throw new Error('Archivo / IBM Plex Sans did not load — refusing to render in a fallback face');
  return page;
}

const browser = await chromium.launch();
const results = [];
const temps = [];

try {
  for (const V of VARIANTS) {
    const TRIM = V.trim;
    const html = await readFile(join(DIR, V.src), 'utf8');
    const stem = V.src.replace(/\.html$/, '');
    const bleedPath = await derive(html, TRIM, BLEED, `.render-${stem}-bleed.html`);
    const trimPath = await derive(html, TRIM, 0, `.render-${stem}-trim.html`);
    temps.push(bleedPath, trimPath);

    // 1. Print PDF, with bleed
    {
      const page = await open(browser, bleedPath);
      const out = join(DIR, V.print);
      await page.pdf({ path: out, printBackground: true, preferCSSPageSize: true });
      results.push(out);
      await page.close();
    }
    // 2. Digital PDF, exact trim
    {
      const page = await open(browser, trimPath);
      const out = join(DIR, V.digital);
      await page.pdf({ path: out, printBackground: true, preferCSSPageSize: true });
      results.push(out);
      await page.close();
    }
    // 3. 300 DPI PNG previews, trim size
    {
      const page = await browser.newPage({
        viewport: { width: Math.round(TRIM.w * 96), height: Math.round(TRIM.h * 96) },
        deviceScaleFactor: DPI / 96,
      });
      await page.goto('file://' + trimPath, { waitUntil: 'load' });
      await page.evaluate(() => document.fonts.ready);
      // Screenshots take the screen cascade, so force the print-only colour keep.
      await page.emulateMedia({ media: 'print' });
      const pages = await page.locator('.page').all();
      if (pages.length !== V.previews.length) throw new Error(`${V.src}: ${pages.length} pages, expected ${V.previews.length}`);
      for (let i = 0; i < pages.length; i++) {
        const out = join(DIR, V.previews[i]);
        await pages[i].screenshot({ path: out });
        results.push(out);
      }
      await page.close();
    }
  }
} finally {
  await browser.close();
  for (const t of temps) await unlink(t).catch(() => {});
}

for (const r of results) console.log('wrote', r);

// ── Post-flight on the PDFs ────────────────────────────────────────────────
// Chromium will quietly substitute a system face for any glyph missing from the
// subsets, and will fall back to Type 3 glyph procedures for variable fonts.
// Both are invisible on screen and obvious on press, so assert against them.
const EXPECTED = /^(Archivo|IBMPlexSans)/;
for (const pdf of results.filter((r) => r.endsWith('.pdf'))) {
  const buf = await readFile(pdf);
  const names = [...new Set([...buf.toString('latin1').matchAll(/\/BaseFont\s*\/([#A-Za-z0-9+\-]+)/g)]
    .map((m) => m[1].replace(/^[A-Z]{6}\+/, '')))];
  const type3 = (buf.toString('latin1').match(/\/Subtype\s*\/Type3/g) || []).length;
  const stray = names.filter((n) => !EXPECTED.test(n));
  const label = pdf.split('/').pop();
  console.log(`  ${label}: ${(buf.length / 1024).toFixed(0)} KB, fonts [${names.join(', ')}], Type3 ${type3}`);
  if (stray.length) throw new Error(`${label}: unexpected substituted font(s): ${stray.join(', ')}`);
  if (type3) throw new Error(`${label}: ${type3} Type 3 font(s) — use static font instances`);
}
console.log('post-flight OK: real Archivo + IBM Plex Sans, embedded as TrueType subsets');
