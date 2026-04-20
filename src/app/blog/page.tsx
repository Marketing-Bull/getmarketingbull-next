import type { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Blog | Marketing Bull',
  description: 'Insights on intake optimization, AI automation, and performance marketing for law firms, medical practices, and home service businesses.',
  alternates: { canonical: 'https://getmarketingbull.com/blog' },
};

const POSTS = [
  {
    slug: '#',
    category: 'Intake Optimization',
    title: 'Why 78% of PI Clients Hire the First Firm That Answers — And What To Do About It',
    excerpt: 'Speed-to-lead is the single most important factor in converting a PI prospect into a signed client. Here\'s the data, and here\'s how to fix your intake.',
    date: 'April 2026',
    readTime: '6 min read',
  },
  {
    slug: '#',
    category: 'AI Automation',
    title: 'How GHL Voice Agents Are Replacing $60K/Year Intake Staff at Law Firms',
    excerpt: 'A breakdown of how we deploy AI receptionist systems that answer, qualify, and book 24/7 — without adding headcount.',
    date: 'March 2026',
    readTime: '8 min read',
  },
  {
    slug: '#',
    category: 'Medical Marketing',
    title: 'The Patient Recall System That Reactivated 60% of Lapsed Patients for a Florida Dental Practice',
    excerpt: 'Your existing patient database is worth more than any ad campaign. Here\'s the exact automation sequence we used.',
    date: 'March 2026',
    readTime: '5 min read',
  },
  {
    slug: '#',
    category: 'Performance Marketing',
    title: 'Google Local Services Ads vs. Google Search: Which Is Right for Your Home Services Business?',
    excerpt: 'We manage both for dozens of contractors. Here\'s the honest breakdown of when to use each, and why most businesses need both.',
    date: 'February 2026',
    readTime: '7 min read',
  },
  {
    slug: '#',
    category: 'Intake Optimization',
    title: 'The 5-Minute Rule: How Response Time Affects Your Case Acquisition Rate',
    excerpt: 'After analyzing intake data across 30+ PI firms, the pattern is clear: firms that respond in under 5 minutes close at 3x the rate of those that don\'t.',
    date: 'February 2026',
    readTime: '5 min read',
  },
  {
    slug: '#',
    category: 'Case Study',
    title: 'From 30% to 85% Intake Conversion: How One South Florida PI Firm Fixed Its Funnel',
    excerpt: 'A full walkthrough of the intake audit, the systems we built, and the results six months later.',
    date: 'January 2026',
    readTime: '10 min read',
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  'Intake Optimization': 'bg-blue-50 text-blue-700',
  'AI Automation': 'bg-purple-50 text-purple-700',
  'Medical Marketing': 'bg-green-50 text-green-700',
  'Performance Marketing': 'bg-orange-50 text-orange-700',
  'Case Study': 'bg-red-50 text-red-700',
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
              <Link key={post.title} href={post.slug} className="group block bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="bg-slate-50 h-44 flex items-center justify-center border-b border-slate-100">
                  <span className="text-slate-300 text-sm">Coming Soon</span>
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
        description="Book a free audit and we'll apply these strategies directly to your business."
        primaryCTA={{ text: 'Get Your Free Growth Audit', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: 'tel:+18334382855' }}
      />
    </>
  );
}
