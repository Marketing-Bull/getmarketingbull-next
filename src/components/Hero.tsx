import Button from './Button';

interface HeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: { text: string; href: string };
  secondaryCTA?: { text: string; href: string; tel?: boolean };
}

export default function Hero({ eyebrow, title, subtitle, description, primaryCTA, secondaryCTA }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-slate-950 text-white overflow-hidden">
      {/* dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* subtle bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
      <div className="container-md relative py-28 text-center">
        {eyebrow && (
          <p className="inline-flex items-center gap-2 text-red-400 font-semibold text-xs uppercase tracking-[0.2em] mb-6 border border-red-500/20 bg-red-500/5 px-4 py-1.5 rounded-full">
            {eyebrow}
          </p>
        )}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6 max-w-4xl mx-auto">
          {title}
        </h1>
        {subtitle && <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed">{subtitle}</p>}
        {description && <p className="text-base text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed">{description}</p>}
        {(primaryCTA || secondaryCTA) && (
          <div className="flex flex-row flex-wrap gap-3 justify-center mt-10">
            {primaryCTA && <Button variant="primary" size="lg" href={primaryCTA.href}>{primaryCTA.text}</Button>}
            {secondaryCTA && <Button variant="secondary" size="lg" href={secondaryCTA.href} external={secondaryCTA.tel}>{secondaryCTA.text}</Button>}
          </div>
        )}
      </div>
    </section>
  );
}
