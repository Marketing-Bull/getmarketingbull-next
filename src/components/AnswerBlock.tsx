/**
 * A short, self-contained answer to the question a page exists to answer, placed
 * near the top. Two or three plain sentences that make sense quoted on their own:
 * this is the passage search snippets and AI answer engines lift. Keep every claim
 * in it backed by the page below; no figures that the page does not source.
 */
export default function AnswerBlock({
  question,
  answer,
  className = '',
}: {
  question: string;
  answer: string;
  className?: string;
}) {
  return (
    <aside aria-label="Short answer" className={`rounded-2xl border-l-4 border-red-600 ${className.includes('bg-') ? '' : 'bg-slate-50'} px-6 py-5 ${className}`}>
      <p className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">Short answer</p>
      <p className="font-semibold text-slate-900 mb-1">{question}</p>
      <p className="text-slate-700 leading-relaxed">{answer}</p>
    </aside>
  );
}
