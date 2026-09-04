import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/Button';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Thank You',
  description: 'We received your request and will reply within one business day.',
  robots: { index: false, follow: true },
  alternates: { canonical: `${COMPANY.website}/thank-you` },
};

export default function ThankYouPage() {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden min-h-[70vh] flex items-center">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="container-md relative py-24 max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-6">Received</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">Thank you.</h1>
        <p className="text-lg text-slate-300 leading-relaxed mb-10">
          A person will reply within one business day. If it&apos;s urgent, call{' '}
          <a href={`tel:${COMPANY.phoneFormatted}`} className="font-semibold text-white underline decoration-red-500 underline-offset-4">{COMPANY.phone}</a>.
        </p>
        <div className="flex flex-row flex-wrap gap-3 justify-center">
          <Button variant="primary" size="md" href="/case-studies">Read the case studies</Button>
          <Button variant="secondary" size="md" href="/">Back to home</Button>
        </div>
        <p className="mt-10 text-sm text-slate-500">
          <Link href="/engagements" className="hover:text-slate-300">See how engagements are scoped →</Link>
        </p>
      </div>
    </section>
  );
}
