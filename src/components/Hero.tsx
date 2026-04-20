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
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-[120px]" />
      </div>
      <div className="container-md relative py-24 text-center">
        {eyebrow && <p className="text-blue-300 font-medium mb-6 text-sm uppercase tracking-widest">{eyebrow}</p>}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 max-w-5xl mx-auto">{title}</h1>
        {subtitle && <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-4 leading-relaxed">{subtitle}</p>}
        {description && <p className="text-base text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">{description}</p>}
        {(primaryCTA || secondaryCTA) && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            {primaryCTA && <Button variant="primary" size="lg" href={primaryCTA.href}>{primaryCTA.text}</Button>}
            {secondaryCTA && <Button variant="secondary" size="lg" href={secondaryCTA.href} external={secondaryCTA.tel}>{secondaryCTA.text}</Button>}
          </div>
        )}
      </div>
    </section>
  );
}
