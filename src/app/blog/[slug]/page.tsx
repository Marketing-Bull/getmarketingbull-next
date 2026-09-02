import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import CTASection from '@/components/CTASection';
import { POSTS, CATEGORY_COLORS } from '@/lib/blog';

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Marketing Bull`,
    description: post.excerpt,
    alternates: { canonical: `https://getmarketingbull.com/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.dateISO,
    author: { '@type': 'Organization', name: 'Marketing Bull' },
    publisher: {
      '@type': 'Organization',
      name: 'Marketing Bull',
      logo: { '@type': 'ImageObject', url: 'https://getmarketingbull.com/logo.png' },
    },
    url: `https://getmarketingbull.com/blog/${post.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      {/* Hero */}
      <section className="relative py-24 bg-slate-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="container-md max-w-3xl relative">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-8 transition-colors">
            ← Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-5">
            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${CATEGORY_COLORS[post.category] ?? 'bg-slate-100 text-slate-600'}`}>
              {post.category}
            </span>
            <span className="text-slate-500 text-xs">{post.readTime}</span>
            <span className="text-slate-500 text-xs">{post.date}</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] mb-6">{post.title}</h1>
          <p className="text-lg text-slate-400 leading-relaxed">{post.excerpt}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-white">
        <div className="container-md max-w-3xl">
          <div className="prose-custom space-y-6">
            {post.content.map((section, i) => {
              if (section.type === 'h2') {
                return <h2 key={i} className="text-2xl font-black tracking-tight text-slate-900 mt-12 mb-4 first:mt-0">{section.text}</h2>;
              }
              if (section.type === 'h3') {
                return <h3 key={i} className="text-lg font-bold text-slate-900 mt-8 mb-3">{section.text}</h3>;
              }
              if (section.type === 'p') {
                return <p key={i} className="text-slate-600 leading-relaxed">{section.text}</p>;
              }
              if (section.type === 'ul') {
                return (
                  <ul key={i} className="space-y-2 my-2">
                    {section.items?.map((item, j) => (
                      <li key={j} className="flex gap-2.5 text-slate-600">
                        <span className="text-red-500 flex-shrink-0 mt-1">·</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                );
              }
              if (section.type === 'ol') {
                return (
                  <ol key={i} className="space-y-3 my-2">
                    {section.items?.map((item, j) => (
                      <li key={j} className="flex gap-3 text-slate-600">
                        <span className="text-red-500 font-bold flex-shrink-0 w-5">{j + 1}.</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ol>
                );
              }
              if (section.type === 'stat-row') {
                return (
                  <div key={i} className="grid grid-cols-3 gap-4 my-10 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    {section.stats?.map((s, j) => (
                      <div key={j} className="text-center">
                        <div className="text-3xl font-black text-red-600 tracking-tight mb-1">{s.value}</div>
                        <div className="text-slate-500 text-xs leading-snug">{s.label}</div>
                      </div>
                    ))}
                  </div>
                );
              }
              if (section.type === 'callout') {
                return (
                  <div key={i} className="my-10 p-6 bg-red-50 border border-red-100 rounded-2xl">
                    <p className="text-slate-700 leading-relaxed">{section.text}</p>
                    <Link
                      href="/free-consultation"
                      className="inline-flex items-center gap-2 mt-4 bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
                    >
                      Get Your Free Audit →
                    </Link>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Author / share bar */}
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">Marketing Bull</p>
              <p className="text-xs text-slate-500">Growth systems for law firms and medical practices.</p>
            </div>
            <Link
              href="/free-consultation"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap"
            >
              Get a Free Audit →
            </Link>
          </div>
        </div>
      </section>

      {/* Related posts */}
      <section className="py-16 bg-slate-50 border-t border-slate-100">
        <div className="container-md max-w-5xl">
          <h2 className="text-xl font-black tracking-tight text-slate-900 mb-8">More from the Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {POSTS.filter((p) => p.slug !== slug).slice(0, 3).map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group block bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${CATEGORY_COLORS[related.category] ?? 'bg-slate-100 text-slate-600'}`}>
                  {related.category}
                </span>
                <h3 className="mt-3 text-sm font-bold text-slate-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-3">{related.title}</h3>
                <p className="text-xs text-slate-400 mt-3">{related.date}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Put These Ideas to Work?"
        description="Book a free audit and we'll apply these strategies directly to your business."
        primaryCTA={{ text: 'Get Your Free Growth Audit', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: 'tel:+18334382855' }}
      />
    </>
  );
}
