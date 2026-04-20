import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Marketing Bull',
  description: 'Marketing Bull terms of service — the terms governing use of our website and services.',
  alternates: { canonical: 'https://getmarketingbull.com/terms-of-service' },
};

const SECTIONS = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing or using the Marketing Bull website or engaging our services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our services.`,
  },
  {
    title: '2. Services',
    body: `Marketing Bull provides marketing, intake optimization, AI automation, and performance advertising services to law firms, medical practices, and home service businesses. The specific scope of services for each engagement is defined in a separate Statement of Work or Service Agreement signed between Marketing Bull and the client.`,
  },
  {
    title: '3. No Guarantees',
    body: `Marketing results depend on many factors outside our control, including market conditions, competition, client responsiveness, and budget. While we are committed to delivering measurable results, we do not guarantee specific outcomes such as a defined number of leads, cases, or revenue amounts unless explicitly stated in a signed agreement.`,
  },
  {
    title: '4. Client Responsibilities',
    body: `Clients are responsible for providing accurate information, timely approvals, and access to necessary accounts and systems. Delays caused by the client may affect campaign performance and timelines. Clients retain ownership of all accounts, data, and creative assets produced for them under our engagement.`,
  },
  {
    title: '5. Payment Terms',
    body: `Payment terms are defined in each client's Service Agreement. Invoices are due upon receipt unless otherwise agreed. Marketing Bull reserves the right to pause services for accounts with overdue balances exceeding 15 days past the due date.`,
  },
  {
    title: '6. Intellectual Property',
    body: `Upon full payment, clients own all creative deliverables, ad copy, landing pages, and other work product created specifically for them. Marketing Bull retains ownership of proprietary frameworks, templates, processes, and tools used in the delivery of services.`,
  },
  {
    title: '7. Confidentiality',
    body: `Both parties agree to keep confidential any non-public business information shared during the engagement. This obligation survives termination of services. Marketing Bull will not disclose client-specific performance data, strategies, or business information to third parties without explicit written consent.`,
  },
  {
    title: '8. Limitation of Liability',
    body: `To the maximum extent permitted by law, Marketing Bull's total liability to any client for any claims arising from services shall not exceed the total fees paid by the client in the three months preceding the claim. We are not liable for indirect, incidental, consequential, or punitive damages.`,
  },
  {
    title: '9. Termination',
    body: `Either party may terminate services with 30 days written notice unless otherwise specified in the Service Agreement. Upon termination, Marketing Bull will provide the client with all account access and deliverables produced through the termination date. Fees owed through the termination date remain due.`,
  },
  {
    title: '10. Governing Law',
    body: `These Terms of Service are governed by the laws of the State of Florida. Any disputes arising from these terms or our services shall be resolved in the courts of Palm Beach County, Florida, and both parties consent to such jurisdiction.`,
  },
  {
    title: '11. Changes to Terms',
    body: `We may update these Terms of Service at any time. Material changes will be communicated to active clients. Continued use of our services after changes constitutes acceptance of the updated terms.`,
  },
  {
    title: '12. Contact',
    body: `Questions about these Terms of Service should be directed to: Marketing Bull, LLC · 319 Clematis Street, Suite 300, West Palm Beach, FL 33401 · hello@getmarketingbull.com`,
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="py-20 bg-slate-950 text-white">
        <div className="container-md max-w-3xl">
          <p className="text-red-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">Legal</p>
          <h1 className="text-4xl font-black tracking-tight mb-4">Terms of Service</h1>
          <p className="text-slate-400">Effective date: January 1, 2025 · Last updated: April 2026</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-md max-w-3xl">
          <p className="text-slate-600 leading-relaxed mb-12">
            These Terms of Service (&ldquo;Terms&rdquo;) govern your use of the Marketing Bull website and the services provided by Marketing Bull, LLC. Please read them carefully.
          </p>
          <div className="space-y-10">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h2 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h2>
                <p className="text-slate-600 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
