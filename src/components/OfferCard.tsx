import Link from 'next/link';
import OfferCTA from './OfferCTA';
import type { Offer } from '@/lib/constants';

const ACCENT: Record<string, { ring: string; text: string; badge: string }> = {
  red: { ring: 'hover:border-red-300', text: 'text-red-600', badge: 'bg-red-50 text-red-700 border-red-100' },
  blue: { ring: 'hover:border-blue-300', text: 'text-blue-600', badge: 'bg-blue-50 text-blue-700 border-blue-100' },
  emerald: { ring: 'hover:border-emerald-300', text: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
};

export default function OfferCard({ offer, featured = false, compact = false }: { offer: Offer; featured?: boolean; compact?: boolean }) {
  const a = ACCENT[offer.accent] ?? ACCENT.red;
  return (
    <div className={`relative flex flex-col rounded-3xl border bg-white p-8 transition-all duration-200 ${a.ring} ${featured ? 'border-slate-900 shadow-2xl shadow-slate-900/10 lg:-translate-y-2' : 'border-slate-200 shadow-sm hover:shadow-lg'}`}>
      {featured && (
        <span className="absolute -top-3 left-8 rounded-full bg-slate-900 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white">
          Most popular
        </span>
      )}
      <span className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-widest ${a.badge}`}>
        {offer.step}
      </span>
      <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-900">{offer.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{offer.short}</p>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Delivery</p>
        <p className="mt-1 text-lg font-bold tracking-tight text-slate-900">{offer.timeline}</p>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">{offer.terms}</p>
      </div>

      {!compact && (
        <ul className="mt-6 space-y-2.5 text-sm text-slate-700">
          {offer.includes.slice(0, 5).map((item) => (
            <li key={item} className="flex gap-2.5">
              <span className={`mt-0.5 shrink-0 font-bold ${a.text}`}>✓</span>
              <span>{item}</span>
            </li>
          ))}
          {offer.includes.length > 5 && (
            <li className="pl-6 text-slate-500">+ {offer.includes.length - 5} more</li>
          )}
        </ul>
      )}

      <div className="mt-8 flex flex-col gap-3">
        <OfferCTA offer={offer} size="md" className="w-full" variant={featured ? 'primary' : 'ghost'} />
        <Link href={`/products/${offer.slug}`} className={`text-center text-sm font-semibold ${a.text} hover:underline`}>
          Everything that&apos;s included →
        </Link>
      </div>
    </div>
  );
}
