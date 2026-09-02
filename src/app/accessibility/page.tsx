import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessibility Statement | Marketing Bull',
  description: 'Marketing Bull is committed to making our website accessible to all users.',
  alternates: { canonical: 'https://getmarketingbull.com/accessibility' },
};

export default function AccessibilityPage() {
  return (
    <>
      <section className="py-20 bg-slate-950 text-white">
        <div className="container-md max-w-3xl">
          <p className="text-red-400 text-xs font-semibold uppercase tracking-[0.2em] mb-4">Legal</p>
          <h1 className="text-4xl font-black tracking-tight mb-4">Accessibility Statement</h1>
          <p className="text-slate-400">Last updated: April 2026</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-md max-w-3xl space-y-10 text-slate-600 leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Our Commitment</h2>
            <p>Marketing Bull is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply relevant accessibility standards to our website and digital communications.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Conformance Status</h2>
            <p>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA. These guidelines explain how to make web content more accessible to people with disabilities. We regularly review our site to identify and address accessibility barriers.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Technical Specifications</h2>
            <p>Our website relies on the following technologies for conformance: HTML, CSS, JavaScript (React/Next.js). We use semantic HTML elements, ARIA labels where appropriate, sufficient color contrast, keyboard-navigable interfaces, and descriptive alt text for images.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Known Limitations</h2>
            <p>While we strive for full accessibility, some third-party embedded content (such as maps or video players) may not fully meet WCAG 2.1 AA standards. We are working with our vendors to address these gaps.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-3">Feedback and Contact</h2>
            <p>We welcome your feedback on the accessibility of our website. If you experience any barriers or have suggestions, please contact us:</p>
            <ul className="mt-4 space-y-2 list-disc list-inside">
              <li>Email: <a href="mailto:hello@getmarketingbull.com" className="text-red-600 hover:underline">hello@getmarketingbull.com</a></li>
              <li>Phone: <a href="tel:+18334382855" className="text-red-600 hover:underline">1-833-GET-BULL</a></li>
              <li>Mail: 319 Clematis Street, Suite 300, West Palm Beach, FL 33401</li>
            </ul>
            <p className="mt-4">We aim to respond to accessibility feedback within 5 business days.</p>
          </div>
        </div>
      </section>
    </>
  );
}
