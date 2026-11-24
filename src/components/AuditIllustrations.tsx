/**
 * Pictures for /ai-website-audit, drawn in markup so they stay sharp, weigh nothing and need no
 * image host in the CSP. Each one shows the tool's own output with sample data and is labeled as
 * a sample. They are decorative next to copy that says the same thing, so they are aria-hidden.
 */

const SAMPLE_JOBS = [
  { name: 'Found on Google', score: 38 },
  { name: 'Found by AI', score: 20 },
  { name: 'Speed', score: 61 },
  { name: 'Security', score: 20 },
  { name: 'Turns visitors into calls', score: 84 },
];

function bar(score: number) {
  if (score >= 75) return 'bg-emerald-500';
  if (score >= 50) return 'bg-amber-500';
  return 'bg-red-600';
}

/** Hero: a sample report card, tilted, beside the headline. */
export function SampleReport({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-red-600/20 blur-3xl" />
      <div className="relative rotate-2 rounded-3xl bg-white p-6 text-slate-900 shadow-2xl">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sample report · yourfirm.com</p>
        <div className="mt-3 flex items-end gap-3">
          <p className="text-6xl font-black leading-none tracking-tight text-red-600">41</p>
          <p className="pb-1 text-xs font-semibold uppercase tracking-widest text-slate-500">out of 100<br />grade D</p>
        </div>
        <ul className="mt-5 space-y-2.5">
          {SAMPLE_JOBS.map((j) => (
            <li key={j.name}>
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>{j.name}</span>
                <span className="tabular-nums">{j.score}</span>
              </div>
              <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full rounded-full ${bar(j.score)}`} style={{ width: `${j.score}%` }} />
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-5 rounded-xl border border-red-300 bg-red-50 p-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-red-800">What Google received · 0 words</p>
          <p className="mt-1 font-mono text-xs text-red-900">&lt;div id=&quot;root&quot;&gt;&lt;/div&gt;</p>
        </div>
      </div>
      <div className="absolute -left-6 top-10 -rotate-6 rounded-full bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-lg">1 critical</div>
      <div className="absolute -bottom-4 right-6 rotate-3 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-bold text-white shadow-lg ring-1 ring-white/20">Built with Lovable</div>
    </div>
  );
}

/** How it works: one small picture per step. */
export function StepArt({ step }: { step: 0 | 1 | 2 }) {
  const frame = 'mb-6 flex h-36 items-center justify-center overflow-hidden rounded-xl bg-slate-950 p-5';
  if (step === 0) {
    return (
      <div className={frame} aria-hidden="true">
        <div className="flex w-full items-center gap-2">
          <div className="flex-1 truncate rounded-full bg-white px-4 py-2.5 text-sm text-slate-900">
            yourfirm.com<span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 bg-red-600 motion-safe:animate-pulse" />
          </div>
          <div className="rounded-full bg-red-600 px-4 py-2.5 text-sm font-bold text-white">Audit</div>
        </div>
      </div>
    );
  }
  if (step === 1) {
    return (
      <div className={frame} aria-hidden="true">
        <div className="flex w-full items-center gap-5">
          <svg viewBox="0 0 80 80" className="h-24 w-24 shrink-0 -rotate-90">
            <circle cx="40" cy="40" r="32" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="9" />
            <circle cx="40" cy="40" r="32" fill="none" stroke="#dc2626" strokeWidth="9" strokeLinecap="round" strokeDasharray={`${0.41 * 201} 201`} />
            <text x="40" y="40" transform="rotate(90 40 40)" textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="24" fontWeight="900">41</text>
          </svg>
          <div className="flex-1 space-y-2">
            {[38, 20, 61, 20, 84].map((s, i) => (
              <div key={i} className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className={`h-full rounded-full ${bar(s)}`} style={{ width: `${s}%` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={frame} aria-hidden="true">
      <div className="w-full rounded-lg border border-white/10 bg-slate-900 p-3 font-mono text-[11px] leading-relaxed text-slate-300">
        <p className="text-red-400"># Fix these in order</p>
        <p>1. Prerender every page so the HTML has text</p>
        <p>2. Replace the title &quot;Vite + React&quot;</p>
        <p className="truncate">3. Make the phone number a tap-to-call link</p>
        <p className="mt-2 inline-block rounded bg-white px-2 py-0.5 font-sans text-[10px] font-bold text-slate-900">Copy prompt</p>
      </div>
    </div>
  );
}

function Window({ label, children, tone }: { label: string; children: React.ReactNode; tone: 'ok' | 'bad' }) {
  return (
    <figure className="min-w-0">
      <figcaption className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">{label}</figcaption>
      <div className={`overflow-hidden rounded-2xl border bg-white shadow-lg ${tone === 'bad' ? 'border-red-300' : 'border-slate-200'}`}>
        <div className="flex items-center gap-1.5 bg-slate-100 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-2 flex-1 truncate rounded-full bg-white px-3 py-1 text-xs text-slate-500">yourfirm.com</span>
        </div>
        <div className="h-56 p-5">{children}</div>
      </div>
    </figure>
  );
}

/** What it checks: the same address as a visitor sees it and as a crawler receives it. */
export function VisitorVsCrawler() {
  return (
    <div className="mb-12 grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]" aria-hidden="true">
      <Window label="What a visitor sees" tone="ok">
        <div className="flex h-full flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="h-3 w-20 rounded bg-slate-900" />
            <div className="flex gap-2">
              <div className="h-2 w-8 rounded bg-slate-300" />
              <div className="h-2 w-8 rounded bg-slate-300" />
              <div className="h-5 w-14 rounded-full bg-red-600" />
            </div>
          </div>
          <div className="grid grid-cols-[1.4fr_1fr] items-center gap-4">
            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-slate-900" />
              <div className="h-4 w-4/5 rounded bg-slate-900" />
              <div className="h-2 w-full rounded bg-slate-300" />
              <div className="h-2 w-2/3 rounded bg-slate-300" />
              <div className="mt-1 h-6 w-24 rounded-full bg-red-600" />
            </div>
            <div className="h-24 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-8 rounded-lg bg-slate-100" />
            <div className="h-8 rounded-lg bg-slate-100" />
            <div className="h-8 rounded-lg bg-slate-100" />
          </div>
        </div>
      </Window>
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-slate-900 text-xs font-black text-white">VS</div>
      <Window label="What a crawler receives" tone="bad">
        <div className="flex h-full flex-col justify-between">
          <p className="font-mono text-sm text-red-900">
            &lt;div id=&quot;root&quot;&gt;&lt;/div&gt;
            <span className="ml-1 inline-block h-4 w-0.5 translate-y-0.5 bg-red-600 motion-safe:animate-pulse" />
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-7xl font-black leading-none tracking-tight text-red-600">0</span>
            <span className="text-xl font-black text-slate-900">words</span>
          </div>
        </div>
      </Window>
    </div>
  );
}
