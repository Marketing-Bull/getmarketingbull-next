import Button from './Button';

interface CTASectionProps {
  title: string;
  description?: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
}

export default function CTASection({ title, description, primaryCTA, secondaryCTA }: CTASectionProps) {
  return (
    <section className="relative bg-slate-950 py-24 text-white overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-blue-950/20 pointer-events-none" />
      <div className="container-md relative text-center">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">{title}</h2>
        {description && <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">{description}</p>}
        <div className="flex flex-row flex-wrap gap-3 justify-center">
          <Button variant="primary" size="lg" href={primaryCTA.href}>{primaryCTA.text}</Button>
          {secondaryCTA && <Button variant="secondary" size="lg" href={secondaryCTA.href}>{secondaryCTA.text}</Button>}
        </div>
      </div>
    </section>
  );
}
