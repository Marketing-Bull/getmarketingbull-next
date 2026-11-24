import { ImageResponse } from 'next/og';
import { OG_SIZE, loadInter, loadLogo } from '@/lib/og';

export const alt =
  'A browser window for yourfirm.com showing the one line of code a crawler receives from a typical AI-built site, marked 0 words. Free AI Website Audit from Marketing Bull.';
export const size = OG_SIZE;
export const contentType = 'image/png';

/**
 * The share card for /ai-website-audit (og:image and twitter:image). It shows the audit's own
 * finding instead of the sitewide headline card: the near-empty page a crawler gets from a
 * JavaScript-drawn site. The window is an illustration of that typical case, not a client's site.
 */
export default async function Image() {
  const [logo, fonts] = await Promise.all([loadLogo(), loadInter()]);
  const family = fonts.length ? 'Inter' : 'sans-serif';

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#020617', color: '#fff', fontFamily: family, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1.5px, transparent 1.5px)', backgroundSize: '28px 28px' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 10, background: '#dc2626' }} />

        {/* left: the question */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 590, padding: '56px 0 52px 72px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {logo && <img src={logo} width={56} height={36} style={{ objectFit: 'contain' }} alt="" />}
            <div style={{ display: 'flex', fontSize: 27, fontWeight: 800, letterSpacing: -0.5 }}>
              <span>Marketing</span>
              <span style={{ color: '#ef4444', marginLeft: 9 }}>Bull</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 19, fontWeight: 800, letterSpacing: 5, textTransform: 'uppercase', color: '#f87171', marginBottom: 22 }}>Free AI website audit</div>
            <div style={{ display: 'flex', flexDirection: 'column', fontSize: 62, fontWeight: 800, lineHeight: 1.03, letterSpacing: -2.2 }}>
              <span>Your AI built</span>
              <span>a website.</span>
              <span style={{ color: '#ef4444' }}>Google got this.</span>
            </div>
            <div style={{ marginTop: 24, fontSize: 25, fontWeight: 500, color: '#cbd5e1', lineHeight: 1.35 }}>
              See what crawlers read on yours, and get the prompt that fixes it.
            </div>
          </div>

          <div style={{ display: 'flex', fontSize: 21, fontWeight: 500, color: '#64748b' }}>getmarketingbull.com/ai-website-audit</div>
        </div>

        {/* right: what the crawler received */}
        <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', padding: '0 56px 0 28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: 452, borderRadius: 22, background: '#fff', boxShadow: '0 30px 80px rgba(0,0,0,0.55)', transform: 'rotate(2deg)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, height: 58, padding: '0 20px', background: '#e2e8f0' }}>
              <div style={{ width: 13, height: 13, borderRadius: 9999, background: '#f87171' }} />
              <div style={{ width: 13, height: 13, borderRadius: 9999, background: '#fbbf24' }} />
              <div style={{ width: 13, height: 13, borderRadius: 9999, background: '#34d399' }} />
              <div style={{ display: 'flex', flex: 1, marginLeft: 12, height: 34, alignItems: 'center', padding: '0 16px', borderRadius: 9999, background: '#fff', fontSize: 18, fontWeight: 500, color: '#475569' }}>
                yourfirm.com
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: '30px 30px 26px', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: 16, fontWeight: 800, letterSpacing: 3, textTransform: 'uppercase', color: '#64748b' }}>What a crawler received</div>
                <div style={{ display: 'flex', alignItems: 'center', marginTop: 16, padding: '18px 20px', borderRadius: 14, border: '2px solid #fca5a5', background: '#fef2f2', fontSize: 25, fontWeight: 500, color: '#7f1d1d' }}>
                  <span>{'<div id="root"></div>'}</span>
                  <div style={{ width: 3, height: 30, marginLeft: 6, background: '#dc2626' }} />
                </div>
                <div style={{ marginTop: 12, fontSize: 17, fontWeight: 500, color: '#64748b' }}>Typical page from an AI builder, before JavaScript runs</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                <span style={{ fontSize: 132, fontWeight: 800, lineHeight: 0.9, letterSpacing: -6, color: '#dc2626' }}>0</span>
                <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1, color: '#0f172a' }}>words</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}
