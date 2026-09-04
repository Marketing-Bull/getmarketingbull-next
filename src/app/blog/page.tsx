import type { Metadata } from 'next';
import { COMPANY } from '@/lib/constants';
import Link from 'next/link';
import CTASection from '@/components/CTASection';
import { POSTS, CATEGORY_COLORS } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on intake optimization, AI automation, and performance marketing for law firms and medical practices.',
  alternates: { canonical: `${COMPANY.website}/blog` },
};

export default function BlogPage() {
  return (
    <>
      <section className="relative py-28 bg-slate-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="container-md max-w-4xl text-center relative">
          <p className="inline-flex items-center gap-2 text-red-400 font-semibold text-xs uppercase tracking-[0.2em] mb-6 border border-red-500/20 bg-red-500/5 px-4 py-1.5 rounded-full">
            Resources
          </p>
          <h1 className="text-5xl font-black tracking-tight mb-6">Insights &amp; Playbooks</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Practical guides on intake optimization, AI automation, and performance marketing — written by practitioners, not content mills.
          </p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container-md max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {POSTS.map((post) => (
              <Link key={post.title} href={`/blog/${post.slug}`} className="group block bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="bg-slate-50 h-44 flex items-center justify-center border-b border-slate-100">
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${CATEGORY_COLORS[post.category] ?? 'bg-slate-100 text-slate-600'}`}>{post.category}</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category] ?? 'bg-slate-100 text-slate-600'}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400">{post.readTime}</span>
                  </div>
                  <h2 className="text-base font-bold text-slate-900 mb-2 leading-snug group-hover:text-red-600 transition-colors">{post.title}</h2>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                  <p className="text-xs text-slate-400 mt-4">{post.date}</p>
                </div>
              </Link>
            ))}
          </div>
          <p className="text-center text-slate-400 text-sm mt-16">More articles coming soon. <Link href="/free-consultation" className="text-red-500 hover:underline">Get in touch</Link> if you have a topic request.</p>
        </div>
      </section>

      <CTASection
        title="Ready to Put These Ideas to Work?"
        description="Twenty minutes about your firm or practice. We'll tell you where we'd look first."
        primaryCTA={{ text: 'Start a conversation', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: 'tel:+18334382855' }}
      />
    </>
  );
}
