import type { Metadata } from 'next';
import { COMPANY } from '@/lib/constants';
import { LICENSE_MD } from './license';

export const metadata: Metadata = {
  title: 'Software License Agreement',
  description: 'License terms for custom software, plugins, and applications developed by Marketing Bull for clients.',
  alternates: { canonical: `${COMPANY.website}/software-license` },
};

/** Minimal renderer for the legal text: #, ##, **bold**, "- " bullets, paragraphs. */
function renderInline(text: string, key: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) =>
    p.startsWith('**') && p.endsWith('**') ? <strong key={`${key}-${i}`}>{p.slice(2, -2)}</strong> : <span key={`${key}-${i}`}>{p}</span>,
  );
}

function renderMarkdown(md: string) {
  const blocks = md.trim().split(/\n\s*\n/);
  return blocks.map((block, bi) => {
    const lines = block.split('\n');
    if (lines[0].startsWith('# ')) return <h1 key={bi} className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-6">{lines[0].slice(2)}</h1>;
    if (lines[0].startsWith('## ')) return <h2 key={bi} className="text-xl font-bold text-slate-900 mt-10 mb-3">{lines[0].slice(3)}</h2>;
    if (lines.every((l) => l.startsWith('- '))) {
      return (
        <ul key={bi} className="list-disc pl-6 space-y-1.5 text-slate-700 mb-4">
          {lines.map((l, li) => <li key={li}>{renderInline(l.slice(2), `${bi}-${li}`)}</li>)}
        </ul>
      );
    }
    return <p key={bi} className="text-slate-700 leading-relaxed mb-4">{renderInline(lines.join(' '), `${bi}`)}</p>;
  });
}

export default function SoftwareLicensePage() {
  return (
    <section className="py-20 bg-white">
      <div className="container-md max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400 mb-6">Legal</p>
        {renderMarkdown(LICENSE_MD)}
        <p className="mt-12 text-sm text-slate-500 border-t border-slate-200 pt-6">
          Questions about this agreement: <a href={`mailto:${COMPANY.email}`} className="font-semibold text-slate-900">{COMPANY.email}</a>
        </p>
      </div>
    </section>
  );
}
