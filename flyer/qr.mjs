/**
 * Regenerates flyer/qr.png — the QR on the back of the flyer.
 *
 *   npm i --no-save qrcode && node flyer/qr.mjs
 *
 * `qrcode` is intentionally not in package.json: it is only needed to re-cut this
 * one asset, and the rendered PNG is committed. 2048px at error-correction level Q
 * so the code still scans if the ink spreads or the card gets scuffed.
 */
import QR from 'qrcode';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

/** What the QR encodes. Change it here, re-run, and re-run build.mjs. */
const URL =
  'https://getmarketingbull.com/?utm_source=brochure&utm_medium=print&utm_campaign=brochure';

const OUT = join(dirname(fileURLToPath(import.meta.url)), 'qr.png');

await QR.toFile(OUT, URL, {
  type: 'png',
  errorCorrectionLevel: 'Q',
  margin: 1,
  width: 2048,
  color: { dark: '#0c0c0eff', light: '#ffffffff' },
});
console.log('wrote', OUT);
