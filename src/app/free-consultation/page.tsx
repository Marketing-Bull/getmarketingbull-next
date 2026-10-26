import ConsultationPage, { consultationMetadata } from '@/components/ConsultationPage';
import { getOffer } from '@/lib/constants';

export const metadata = consultationMetadata;

export default async function FreeConsultationPage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const { product } = await searchParams;
  const offer = product ? getOffer(product) : undefined;
  return <ConsultationPage offer={offer} source={offer ? `consult:${offer.slug}` : 'consult'} />;
}
