import type { Metadata } from 'next';
import Image from 'next/image';
import { BarChart2, Eye, Zap, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'About Us | Marketing Bull',
  description: 'Marketing Bull is a South Florida growth agency specializing in intake optimization, AI automation, and performance marketing for law firms, medical practices, and home service businesses.',
  alternates: { canonical: 'https://getmarketingbull.com/about-us' },
};

const TEAM = [
  {
    name: 'Alexander M. Babenchuk',
    role: 'President & Managing Director',
    photo: '/mb-preview/alex.webp',
    bio: 'Alexander oversees client strategy, business development, and agency operations. He brings a decade of experience building growth systems for law firms and medical practices across the US.',
  },
  {
    name: 'Oleg M. Babenchuk',
    role: 'Chief Marketing Officer',
    photo: '/mb-preview/oleg.webp',
    bio: 'Oleg leads performance marketing and intake strategy. He has personally built intake and PPC systems for 30+ PI firms, driving measurable case volume improvements across every engagement.',
  },
];

const VALUES: { Icon: LucideIcon; title: string; desc: string }[] = [
  { Icon: BarChart2, title: 'Outcomes Over Optics', desc: "We measure success in signed retainers, booked patients, and completed jobs — not impressions, clicks, or vanity metrics. If it doesn't move revenue, it doesn't count." },
  { Icon: Eye, title: 'Radical Transparency', desc: 'You own all your accounts, all your data, all your assets. Full attribution reporting, clear pricing, and no black-box results. We show our work.' },
  { Icon: Zap, title: 'Speed Over Perfection', desc: 'We launch, test, and optimize in real time. A live campaign getting iterated on delivers more value than a "perfect" strategy sitting in a deck.' },
  { Icon: Users, title: 'Partnership, Not Vendor', desc: "We turn down clients we can't help. We refer out what we're not the best at. We treat your budget like it's our own." },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative py-28 bg-slate-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="container-md max-w-4xl text-center relative">
          <p className="inline-flex items-center gap-2 text-red-400 font-semibold text-xs uppercase tracking-[0.2em] mb-6 border border-red-500/20 bg-red-500/5 px-4 py-1.5 rounded-full">
            Who We Are
          </p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-6 leading-[1.05]">Built for Businesses Where Every Lead Matters</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
            Marketing Bull is a South Florida growth agency. We specialize in the industries where a missed call costs thousands — and we build the systems that make sure that doesn&apos;t happen.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="container-md max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-red-500 font-semibold text-xs uppercase tracking-[0.18em] mb-3">Our Story</p>
              <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-6">We Started by Fixing What Everyone Else Ignored</h2>
              <div className="space-y-4 text-slate-500 leading-relaxed">
                <p>Most marketing agencies stop at the ad click. They deliver a lead and write it off as a conversion. But we kept asking: what happens after the click? Where do those leads actually go?</p>
                <p>What we found was that the most expensive problem in law firm and medical marketing isn&apos;t bad ads — it&apos;s broken intake. Firms were spending thousands a month on leads that never got called back, never got booked, never got signed.</p>
                <p>So we built the infrastructure to fix that. We started with intake systems, layered in automation, and added performance marketing on top. The result was a complete growth stack that actually connects ad spend to signed clients.</p>
                <p>Today we work with 30+ law firms, medical practices, and service businesses — and we measure every engagement by one metric: revenue generated per dollar invested.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: '30+', l: 'Active Client Partners' },
                { n: '500+', l: 'Automations Deployed' },
                { n: '+25%', l: 'Avg Intake Lift' },
                { n: '$0', l: 'Vanity Metrics Reported' },
              ].map((st) => (
                <div key={st.l} className="text-center p-8 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-4xl font-black text-blue-600 mb-2 tracking-tight">{st.n}</div>
                  <div className="text-slate-600 font-semibold text-sm">{st.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-slate-50">
        <div className="container-md max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-red-500 font-semibold text-xs uppercase tracking-[0.18em] mb-3">The Team</p>
            <h2 className="text-4xl font-black tracking-tight text-slate-900">The People Behind the Results</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {TEAM.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="bg-slate-950 p-8 flex justify-center">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 rounded-full object-cover border-2 border-white/10 shadow-xl"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900">{member.name}</h3>
                  <p className="text-red-500 text-xs font-semibold uppercase tracking-wider mb-3">{member.role}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white">
        <div className="container-md max-w-5xl">
          <div className="text-center mb-16">
            <p className="text-red-500 font-semibold text-xs uppercase tracking-[0.18em] mb-3">How We Work</p>
            <h2 className="text-4xl font-black tracking-tight text-slate-900">What We Believe</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VALUES.map((v) => (
              <div key={v.title} className="group p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:border-red-100 hover:shadow-sm transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-0.5 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <v.Icon className="w-6 h-6 text-red-500 mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-bold text-slate-900 mb-3">{v.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to Work Together?"
        description="Book a free 30-minute growth audit and see exactly how we'd approach your specific market, practice area, and goals."
        primaryCTA={{ text: 'Get Your Free Growth Audit', href: '/free-consultation' }}
        secondaryCTA={{ text: 'Call 1-833-GET-BULL', href: 'tel:+18334382855' }}
      />
    </>
  );
}
