import Button from './Button';
import type { Offer } from '@/lib/constants';

interface Props {
  offer: Offer;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

/**
 * Primary CTA for an engagement. Pricing is quoted per firm rather than published,
 * so this always routes to the consultation form with the engagement pre-filled.
 */
export default function OfferCTA({ offer, size = 'lg', className = '', variant = 'primary' }: Props) {
  return (
    <Button href={`/free-consultation?product=${encodeURIComponent(offer.slug)}`} variant={variant} size={size} className={className}>
      {offer.ctaLabel}
    </Button>
  );
}
