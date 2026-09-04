import { renderOg, OG_SIZE } from '@/lib/og';
import { OFFERS, getOffer } from '@/lib/constants';

export const alt = 'Marketing Bull engagement';
export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return OFFERS.map((o) => ({ slug: o.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const o = getOffer(slug);
  if (!o) return renderOg({ title: 'Marketing Bull' });
  return renderOg({
    eyebrow: `${o.step} · Fixed scope`,
    title: o.name,
    subtitle: o.short,
    stat: { value: o.timeline, label: 'delivery' },
  });
}
