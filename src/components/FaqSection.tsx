import { faqSchema } from '@/lib/schema';

/**
 * Visible FAQ plus its FAQPage JSON-LD, rendered together so the markup can never
 * drift from what the page shows. Same look as the FAQ in VerticalPage.
 */
export default function FaqSection({
  faqs,
  title = 'Questions',
  className = 'py-20 bg-white',
}: {
  faqs: { q: string; a: string }[];
  title?: string;
  className?: string;
}) {
  return (
    <section className={className}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(faqs)) }} />
      <div className="container-md max-w-3xl">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-8 text-center">{title}</h2>
        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer items-center justify-between gap-4 text-left text-lg font-semibold text-slate-900 list-none">
                {f.q}
                <span className="shrink-0 text-slate-400 transition group-open:rotate-45 text-2xl leading-none" aria-hidden="true">+</span>
              </summary>
              <p className="mt-3 text-slate-600 leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
