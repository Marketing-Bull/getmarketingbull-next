import { renderOg, OG_SIZE } from '@/lib/og';
import { CASE_STUDIES, getCaseStudy } from '@/lib/caseStudies';

export const alt = 'Marketing Bull case study';
export const size = OG_SIZE;
export const contentType = 'image/png';

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return renderOg({ title: 'Case study' });
  return renderOg({
    eyebrow: `Case study · ${c.industry} · ${c.location}`,
    title: c.client,
    subtitle: c.summary,
  });
}
