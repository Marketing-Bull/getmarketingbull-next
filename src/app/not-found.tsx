import type { Metadata } from 'next';
import Link from 'next/link';
import Button from '@/components/Button';

// Next adds <meta name="robots" content="noindex"> to every 404 on its own; setting
// it here as well stops the layout's "index, follow" rendering alongside it.
export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden min-h-[70vh] flex items-center">
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="container-md relative py-24 max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-6">404</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-6">This page isn&apos;t here.</h1>
        <p className="text-lg text-slate-300 leading-relaxed mb-10">
          The link may be old, or the page may have moved when the site was rebuilt. Here is where most people are headed.
        </p>
        <div className="flex flex-row flex-wrap gap-3 justify-center">
          <Button variant="primary" size="md" href="/free-consultation">Start a conversation</Button>
          <Button variant="secondary" size="md" href="/engagements">See the engagements</Button>
        </div>
        <p className="mt-10 text-sm text-slate-500">
          <Link href="/blog" className="hover:text-slate-300">Read the blog →</Link>
          <span className="mx-3" aria-hidden="true">·</span>
          <Link href="/" className="hover:text-slate-300">Back to home</Link>
        </p>
      </div>
    </section>
  );
}
