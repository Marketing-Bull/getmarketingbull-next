import Button from './Button';
import { CHECKOUT_LINKS, type Offer } from '@/lib/constants';

interface Props {
  offer: Offer;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

/**
 * Renders a "Buy" button that goes straight to Stripe when a payment link exists,
 * and to the consultation form (pre-filled with the product) when it doesn't.
 */
export default function CheckoutButton({ offer, size = 'lg', className = '', variant = 'primary' }: Props) {
  const link = CHECKOUT_LINKS[offer.slug];
  if (link) {
    return (
      <Button href={link} external variant={variant} size={size} className={className}>
        {offer.ctaLabel} — {offer.priceLabel}{offer.billing === 'monthly' ? '/mo' : ''}
      </Button>
    );
  }
  return (
    <Button href={`/free-consultation?product=${encodeURIComponent(offer.slug)}`} variant={variant} size={size} className={className}>
      {offer.ctaLabel} — {offer.priceLabel}{offer.billing === 'monthly' ? '/mo' : ''}
    </Button>
  );
}
