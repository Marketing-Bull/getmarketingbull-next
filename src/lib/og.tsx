import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const OG_SIZE = { width: 1200, height: 630 };

async function loadLogo(): Promise<string | null> {
  try {
    const buf = await readFile(join(process.cwd(), 'public', 'logo.png'));
    return `data:image/png;base64,${buf.toString('base64')}`;
  } catch {
    return null;
  }
}

type OgFont = { name: string; data: ArrayBuffer; weight: 500 | 800; style: 'normal' };

async function loadInter(): Promise<OgFont[]> {
  try {
    // No browser User-Agent → Google Fonts serves TrueType, which Satori requires (no woff2).
    const css = await fetch('https://fonts.googleapis.com/css2?family=Inter:wght@500;800&display=swap').then((r) => r.text());
    const blocks = css.split('@font-face').slice(1);
    const fonts: OgFont[] = [];
    for (const b of blocks) {
      const weight = Number(b.match(/font-weight:\s*(\d+)/)?.[1]);
      const url = b.match(/url\((https:[^)]+)\)/)?.[1];
      if (!url || (weight !== 500 && weight !== 800)) continue;
      const data = await fetch(url).then((r) => r.arrayBuffer());
      fonts.push({ name: 'Inter', data, weight, style: 'normal' });
    }
    return fonts;
  } catch {
    return [];
  }
}

interface OgProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Right-side accent stat, e.g. "14 business days" or "0 → 20" */
  stat?: { value: string; label: string };
}

/** Brand-consistent Open Graph card: slate-950, dot grid, red accent, bull mark, Inter Black. */
export async function renderOg({ eyebrow = 'Growth consultancy · Law firms & medical practices', title, subtitle, stat }: OgProps) {
  const [logo, fonts] = await Promise.all([loadLogo(), loadInter()]);
  const family = fonts.length ? 'Inter' : 'sans-serif';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background: '#020617',
          color: '#fff',
          fontFamily: family,
          position: 'relative',
        }}
      >
        {/* dot grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1.5px, transparent 1.5px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* red glow */}
        <div
          style={{
            position: 'absolute',
            top: -220,
            right: -180,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: 'rgba(220,38,38,0.16)',
            filter: 'blur(80px)',
          }}
        />
        {/* red rule */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 10, background: '#dc2626' }} />

        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          {logo && <img src={logo} width={62} height={40} style={{ objectFit: 'contain' }} alt="" />}
          <div style={{ display: 'flex', fontSize: 30, fontWeight: 800, letterSpacing: -0.5 }}>
            <span>Marketing</span>
            <span style={{ color: '#ef4444', marginLeft: 10 }}>Bull</span>
          </div>
        </div>

        {/* body */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: stat ? 720 : 1000 }}>
            <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: 5, textTransform: 'uppercase', color: '#94a3b8', marginBottom: 26 }}>{eyebrow}</div>
            <div style={{ fontSize: title.length > 60 ? 58 : 68, fontWeight: 800, lineHeight: 1.04, letterSpacing: -2 }}>{title}</div>
            {subtitle && <div style={{ marginTop: 26, fontSize: 26, fontWeight: 500, color: '#cbd5e1', lineHeight: 1.35 }}>{subtitle}</div>}
          </div>
          {stat && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '28px 32px',
                border: '2px solid rgba(255,255,255,0.12)',
                borderRadius: 28,
                background: 'rgba(15,23,42,0.7)',
                minWidth: 260,
              }}
            >
              <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -2, lineHeight: 1 }}>{stat.value}</div>
              <div style={{ marginTop: 12, fontSize: 20, fontWeight: 500, color: '#94a3b8' }}>{stat.label}</div>
            </div>
          )}
        </div>

        {/* footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, fontWeight: 500, color: '#64748b' }}>
          <span>getmarketingbull.com</span>
          <span>West Palm Beach, FL · 1-833-GET-BULL</span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
