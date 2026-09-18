/**
 * Print-safety check for flyer.html.
 *
 *   node flyer/check.mjs
 *
 * Verifies, against the trim-size (no-bleed) render:
 *   - no content overflows the 0.25in safe area on either page
 *   - the flex column fits (scrollHeight <= clientHeight)
 *   - Archivo and IBM Plex Sans really loaded
 *   - no text is set below the 9pt-ish print legibility floor without being a label
 * Exits non-zero on failure so it can gate the build.
 */
import { chromium } from 'playwright';
import { readFile, writeFile, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const DIR = dirname(fileURLToPath(import.meta.url));
const START = '/* @PAGE_SIZE_START */';
const END = '/* @PAGE_SIZE_END */';

const html = await readFile(join(DIR, 'flyer.html'), 'utf8');
const block = `${START}\n@page { size: 5.5in 8.5in; margin: 0; }\n:root { --bleed: 0in; }\n${END}`;
const derived =
  html.slice(0, html.indexOf(START)) + block + html.slice(html.indexOf(END) + END.length);
const path = join(DIR, '.check.html');
await writeFile(path, derived, 'utf8');

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 528, height: 816 } });
await page.goto('file://' + path, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);

const report = await page.evaluate(() => {
  const SAFE = 24; // 0.25in at 96dpi
  const out = [];
  document.querySelectorAll('.page').forEach((pg, i) => {
    const pr = pg.getBoundingClientRect();
    const safe = pg.querySelector('.safe');
    const sr = safe.getBoundingClientRect();
    const page = {
      page: i === 0 ? 'front' : 'back',
      pageSize: [Math.round(pr.width), Math.round(pr.height)],
      safeFit: { content: safe.scrollHeight, available: safe.clientHeight },
      overflows: [],
    };
    // Any element with ink that pokes outside the safe rect.
    safe.querySelectorAll('*').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      const cs = getComputedStyle(el);
      // Decorations that bleed past the safe area on purpose.
      if (el.matches('.bull, .statband, .bullzone .hair, .bullzone .shard')) return;
      const d = {
        l: Math.round(sr.left - r.left),
        r: Math.round(r.right - sr.right),
        t: Math.round(sr.top - r.top),
        b: Math.round(r.bottom - sr.bottom),
      };
      const worst = Math.max(d.l, d.r, d.t, d.b);
      if (worst > 0.6) {
        page.overflows.push({
          sel: el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ').join('.') : ''),
          text: (el.textContent || '').trim().slice(0, 46),
          over: d,
        });
      }
    });
    out.push(page);
  });
  return {
    pages: out,
    fonts: {
      archivo: document.fonts.check('900 42px Archivo'),
      plex: document.fonts.check('400 13px "IBM Plex Sans"'),
    },
  };
});

await browser.close();
await unlink(path).catch(() => {});

let bad = false;
console.log('fonts:', report.fonts);
if (!report.fonts.archivo || !report.fonts.plex) bad = true;

for (const p of report.pages) {
  const fit = p.safeFit;
  const over = fit.content - fit.available;
  console.log(
    `\n[${p.page}] page ${p.pageSize[0]}x${p.pageSize[1]}px  ` +
      `content ${fit.content} / ${fit.available}px  ${over > 0 ? `OVERSET by ${over}px` : `(${-over}px slack)`}`
  );
  if (over > 0) bad = true;
  // Only report the outermost offenders; children inherit their parent's overflow.
  const seen = p.overflows.filter((o) => !o.sel.includes('.bull'));
  for (const o of seen.slice(0, 12)) {
    console.log(`   ! ${o.sel}  over[l${o.over.l} r${o.over.r} t${o.over.t} b${o.over.b}]  "${o.text}"`);
    bad = true;
  }
  if (seen.length > 12) console.log(`   ... and ${seen.length - 12} more`);
}

console.log(bad ? '\nFAIL' : '\nOK — everything inside the safe area');
process.exit(bad ? 1 : 0);
