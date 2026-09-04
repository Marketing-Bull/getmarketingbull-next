import type { Metadata } from 'next';
import { COMPANY } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Marketing Bull privacy policy — how we collect, use, and protect your information.',
  alternates: { canonical: `${COMPANY.website}/privacy-policy` },
};

const SECTIONS = [
  {
    title: '1. Information We Collect',
    body: `We collect information you provide directly to us, including your name, email address, phone number, company website, and any messages you send through our contact forms. We may also collect information automatically when you visit our website, such as your IP address, browser type, referring URLs, and pages visited, through standard web analytics tools.`,
  },
  {
    title: '2. How We Use Your Information',
    body: `We use the information we collect to: respond to your inquiries and provide the services you request; send you marketing communications (only with your consent); analyze and improve our website and services; comply with legal obligations; and prevent fraud or abuse. We do not sell your personal information to third parties.`,
  },
  {
    title: '3. SMS Communications',
    body: `If you opt in to SMS communications, you consent to receive text messages from Marketing Bull related to your inquiry or our services. Message and data rates may apply. You may opt out at any time by replying STOP to any message we send.`,
  },
  {
    title: '4. Cookies and Tracking',
    body: `Our website uses cookies and similar tracking technologies to enhance your experience, analyze site traffic, and support our marketing efforts. You can control cookie settings through your browser. By continuing to use our site, you consent to our use of cookies in accordance with this policy.`,
  },
  {
    title: '5. Third-Party Services',
    body: `We use third-party services including Google Analytics, GoHighLevel (CRM), and advertising platforms (Google Ads, Meta) that may collect data about your interactions with our site. These services have their own privacy policies, and we encourage you to review them. We are not responsible for the privacy practices of third parties.`,
  },
  {
    title: '6. Data Retention',
    body: `We retain personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements. When data is no longer needed, we securely delete or anonymize it.`,
  },
  {
    title: '7. Your Rights',
    body: `Depending on your location, you may have the right to access, correct, delete, or restrict processing of your personal information. To exercise these rights, contact us at hello@getmarketingbull.com. We will respond within 30 days.`,
  },
  {
    title: '8. Children\'s Privacy',
    body: `Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected such information, please contact us immediately.`,
  },
  {
    title: '9. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. We will notify you of material changes by posting the updated policy on this page with a revised effective date. Your continued use of our services after such changes constitutes acceptance of the updated policy.`,
  },
  {
    title: '10. Contact Us',
    body: `If you have questions about this Privacy Policy, please contact us at: Marketing Bull, LLC · 319 Clematis Street, Suite 300, West Palm Beach, FL 33401 · hello@getmarketingbull.com · 1-833-GET-BULL`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="py-20 bg-slate-950 text-white">
        <div className="container-md max-w-3xl">
          <p className="text-red-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">Legal</p>
          <h1 className="text-4xl font-black tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-slate-400">Effective date: January 1, 2025 · Last updated: April 2026</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-md max-w-3xl">
          <p className="text-slate-600 leading-relaxed mb-12">
            Marketing Bull, LLC (&ldquo;Marketing Bull,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage our services.
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
