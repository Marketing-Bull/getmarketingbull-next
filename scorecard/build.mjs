/**
 * Renders scorecard.html to the PI Intake Scorecard PDF served by the site.
 *
 *   node scorecard/build.mjs
 *
 * Writes ../public/pi-intake-scorecard.pdf (US Letter, no bleed: screen, email and
 * office printers) and one PNG preview per page into scorecard/previews/.
 * Refuses to write anything if the fonts fall back or any page's content overflows.
 * Playwright is build-only, as for the flyer: npm i --no-save playwright.
 */
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const DIR = dirname(fileURLToPath(import.meta.url));
const OUT = join(DIR, '..', 'public', 'pi-intake-scorecard.pdf');
const PREVIEWS = join(DIR, 'previews');

const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 816, height: 1056 } });
  await page.goto('file://' + join(DIR, 'scorecard.html'), { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  const fontsOk = await page.evaluate(() =>
    document.fonts.check('900 40px Archivo') && document.fonts.check('400 12px "IBM Plex Sans"'),
  );
  if (!fontsOk) throw new Error('Archivo / IBM Plex Sans did not load; refusing to render in a fallback face');

  // Every element inside a page's .body must sit inside that .body's box.
  const overflow = await page.evaluate(() => {
    const problems = [];
    document.querySelectorAll('.page').forEach((pg, i) => {
      const body = pg.querySelector('.body');
      const box = body.getBoundingClientRect();
      if (body.scrollHeight > body.clientHeight + 1) problems.push(`page ${i + 1}: content is ${body.scrollHeight - body.clientHeight}px taller than the page`);
      body.querySelectorAll('*').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        if (r.bottom > box.bottom + 1 || r.right > box.right + 1) {
          problems.push(`page ${i + 1}: <${el.tagName.toLowerCase()} class="${el.className}"> overflows by ${Math.round(Math.max(r.bottom - box.bottom, r.right - box.right))}px`);
        }
      });
    });
    return problems;
  });
  if (overflow.length) throw new Error('Overflow:\n' + [...new Set(overflow)].slice(0, 20).join('\n'));

  await page.pdf({ path: OUT, width: '8.5in', height: '11in', printBackground: true, preferCSSPageSize: true });

  await mkdir(PREVIEWS, { recursive: true });
  const pages = await page.$$('.page');
  for (const [i, el] of pages.entries()) {
    await el.screenshot({ path: join(PREVIEWS, `page-${String(i + 1).padStart(2, '0')}.png`) });
  }
  console.log(`wrote ${OUT} (${pages.length} pages) and ${pages.length} previews`);
} finally {
  await browser.close();
}
