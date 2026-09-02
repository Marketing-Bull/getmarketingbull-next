import type { Metadata } from 'next';
import Link from 'next/link';
import CTASection from '@/components/CTASection';

export const metadata: Metadata = {
  title: 'Careers | Marketing Bull',
  description: 'Join Marketing Bull — a South Florida growth agency building intake systems, AI automation, and performance marketing for law firms and medical practices.',
  alternates: { canonical: 'https://getmarketingbull.com/careers' },
};

interface JobPosting {
  id: string;
  title: string;
  type: 'Full-Time' | 'Part-Time' | 'Contract';
  location: string;
  remote: boolean;
  department: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  salary?: { min: number; max: number; currency: string };
  datePosted: string;
}

const JOBS: JobPosting[] = [
  {
    id: 'paid-media-strategist',
    title: 'Paid Media Strategist',
    type: 'Full-Time',
    location: 'West Palm Beach, FL',
    remote: true,
    department: 'Performance Marketing',
    description: 'We\'re looking for a data-driven paid media strategist to manage and grow Google Ads and Meta campaigns for our law firm and medical practice clients. You\'ll own campaign performance from strategy through optimization, with full attribution visibility.',
    responsibilities: [
      'Manage Google Search, Display, and Meta ad campaigns across 10–15 client accounts',
      'Build and test conversion-optimized landing pages in collaboration with our design team',
      'Conduct keyword research, audience targeting, and competitive analysis',
      'Deliver weekly performance reports with clear attribution to signed clients or booked patients',
      'Own A/B testing roadmaps and continuously improve CPL and ROAS',
    ],
    requirements: [
      '3+ years managing Google Ads and Meta Ads accounts, preferably in legal or healthcare verticals',
      'Strong analytical skills — you live in Google Analytics, Data Studio, and spreadsheets',
      'Experience with conversion tracking, call tracking, and multi-touch attribution',
      'Excellent written communication for reporting and client-facing updates',
      'Google Ads and Meta Blueprint certifications preferred',
    ],
    salary: { min: 65000, max: 90000, currency: 'USD' },
    datePosted: '2026-04-01',
  },
  {
    id: 'intake-systems-specialist',
    title: 'Intake Systems Specialist',
    type: 'Full-Time',
    location: 'West Palm Beach, FL',
    remote: true,
    department: 'Automation & CRM',
    description: 'We\'re hiring an Intake Systems Specialist to build, configure, and optimize GoHighLevel (GHL) CRM pipelines, voice agents, and automation workflows for our law firm and medical practice clients. This is a technical operations role at the intersection of marketing and automation.',
    responsibilities: [
      'Build and configure GHL pipelines, automations, and AI voice agent workflows',
      'Integrate CRMs with third-party tools including Twilio, Zapier, and practice management software',
      'Conduct intake audits to identify lead leakage and conversion bottlenecks',
      'Train client staff on CRM usage and intake best practices',
      'Monitor system performance and proactively identify issues',
    ],
    requirements: [
      '2+ years working with GoHighLevel or similar CRM platforms (HubSpot, Salesforce)',
      'Experience building automation workflows and integrating APIs',
      'Strong understanding of lead lifecycle and intake conversion funnels',
      'Comfort working across multiple client accounts simultaneously',
      'Experience in legal or healthcare environments is a strong plus',
    ],
    salary: { min: 55000, max: 75000, currency: 'USD' },
    datePosted: '2026-04-01',
  },
  {
    id: 'account-manager',
    title: 'Client Account Manager',
    type: 'Full-Time',
    location: 'West Palm Beach, FL',
    remote: false,
    department: 'Client Success',
    description: 'We\'re looking for a proactive Account Manager to own client relationships and ensure every engagement delivers measurable results. You\'ll be the connective tissue between our strategy, execution, and reporting teams and our clients.',
    responsibilities: [
      'Own day-to-day communication for a portfolio of 8–12 law firm and medical practice clients',
      'Lead monthly performance reviews and present results clearly and confidently',
      'Coordinate deliverables across internal teams (paid media, intake systems, SEO)',
      'Identify upsell and expansion opportunities within existing client base',
      'Manage project timelines and ensure on-time delivery across all workstreams',
    ],
    requirements: [
      '2+ years in an account management or client-facing role at a marketing agency',
      'Strong communication and presentation skills — you\'re confident in the room',
      'Ability to translate performance data into business outcomes clients understand',
      'Organized, detail-oriented, and comfortable managing multiple moving parts',
      'Experience with legal or healthcare clients is a plus',
    ],
    salary: { min: 50000, max: 70000, currency: 'USD' },
    datePosted: '2026-04-01',
  },
];

const jobSchemas = JOBS.map((job) => ({
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: job.title,
  description: job.description,
  datePosted: job.datePosted,
  employmentType: job.type === 'Full-Time' ? 'FULL_TIME' : job.type === 'Part-Time' ? 'PART_TIME' : 'CONTRACTOR',
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '319 Clematis Street, Suite 300',
      addressLocality: 'West Palm Beach',
      addressRegion: 'FL',
      postalCode: '33401',
      addressCountry: 'US',
    },
  },
  jobLocationType: job.remote ? 'TELECOMMUTE' : undefined,
  hiringOrganization: {
    '@type': 'Organization',
    name: 'Marketing Bull',
    sameAs: 'https://getmarketingbull.com',
    logo: 'https://getmarketingbull.com/logo.png',
  },
  baseSalary: job.salary
    ? {
        '@type': 'MonetaryAmount',
        currency: job.salary.currency,
        value: {
          '@type': 'QuantitativeValue',
          minValue: job.salary.min,
          maxValue: job.salary.max,
          unitText: 'YEAR',
        },
      }
    : undefined,
  occupationalCategory: job.department,
}));

const TYPE_COLORS: Record<string, string> = {
  'Full-Time': 'bg-green-50 text-green-700',
  'Part-Time': 'bg-blue-50 text-blue-700',
  'Contract': 'bg-orange-50 text-orange-700',
};

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchemas) }}
      />

      <section className="relative py-28 bg-slate-950 text-white overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="container-md max-w-4xl text-center relative">
          <p className="inline-flex items-center gap-2 text-red-400 font-semibold text-xs uppercase tracking-[0.2em] mb-6 border border-red-500/20 bg-red-500/5 px-4 py-1.5 rounded-full">
            We&apos;re Hiring
          </p>
          <h1 className="text-5xl font-black tracking-tight mb-6">Build the Future of Growth Systems</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            We&apos;re a small, high-output team working on hard problems — intake optimization, AI automation, and performance marketing for the industries where speed wins cases.
          </p>
        </div>
      </section>

      {/* Culture section */}
      <section className="py-20 bg-white">
        <div className="container-md max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <p className="text-red-500 font-semibold text-xs uppercase tracking-[0.18em] mb-3">Why Marketing Bull</p>
              <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-6">Operators, Not Order-Takers</h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                We don&apos;t run campaigns and send reports. We build systems that connect ad spend to signed clients and filled schedules. Everyone on the team owns outcomes, not just deliverables.
              </p>
              <p className="text-slate-500 leading-relaxed">
                We&apos;re a small team by design. You&apos;ll have real ownership, direct client impact, and no bureaucracy between you and your work.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🏠', title: 'Remote-Friendly', desc: 'Most roles are fully remote or hybrid.' },
                { icon: '📈', title: 'Real Ownership', desc: 'You own outcomes, not just tasks.' },
                { icon: '⚡', title: 'Fast Iteration', desc: 'We ship, test, and improve — no committees.' },
                { icon: '🎯', title: 'Outcome-Driven', desc: 'Performance tied to client results, not hours.' },
              ].map((v) => (
                <div key={v.title} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-2xl mb-2">{v.icon}</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{v.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Job listings */}
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-10">Open Positions</h2>
            <div className="space-y-6">
              {JOBS.map((job) => (
                <div key={job.id} className="group border border-slate-200 rounded-2xl p-8 hover:border-red-200 hover:shadow-md transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TYPE_COLORS[job.type]}`}>{job.type}</span>
                        <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">{job.department}</span>
                        {job.remote && <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full">Remote OK</span>}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{job.title}</h3>
                      <p className="text-slate-500 text-sm mb-4">{job.location}</p>
                      <p className="text-slate-600 text-sm leading-relaxed mb-5">{job.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Responsibilities</p>
                          <ul className="space-y-1.5">
                            {job.responsibilities.map((r) => (
                              <li key={r} className="flex gap-2 text-sm text-slate-600">
                                <span className="text-red-500 mt-0.5 flex-shrink-0">·</span>
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Requirements</p>
                          <ul className="space-y-1.5">
                            {job.requirements.map((r) => (
                              <li key={r} className="flex gap-2 text-sm text-slate-600">
                                <span className="text-red-500 mt-0.5 flex-shrink-0">·</span>
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {job.salary && (
                        <p className="mt-5 text-sm font-semibold text-slate-700">
                          Compensation: ${job.salary.min.toLocaleString()} – ${job.salary.max.toLocaleString()} / year
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <Link
                      href={`mailto:hello@getmarketingbull.com?subject=Application: ${job.title}`}
                      className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5"
                    >
                      Apply for This Role →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 p-8 bg-slate-50 rounded-2xl border border-slate-100 text-center">
            <p className="text-slate-600 text-sm mb-3">Don&apos;t see a role that fits? We&apos;re always interested in talented people.</p>
            <Link
              href="mailto:hello@getmarketingbull.com?subject=General Application"
              className="text-red-600 font-semibold text-sm hover:underline"
            >
              Send us your resume →
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Built for People Who Want to Win"
        description="We work hard, move fast, and measure everything. If that sounds like your kind of place, let's talk."
        primaryCTA={{ text: 'View Open Roles Above', href: '#' }}
        secondaryCTA={{ text: 'Email Us Directly', href: 'mailto:hello@getmarketingbull.com' }}
      />
    </>
  );
}
