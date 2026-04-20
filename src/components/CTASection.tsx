import Button from './Button';

interface CTASectionProps {
  title: string;
  description?: string;
  primaryCTA: { text: string; href: string };
  secondaryCTA?: { text: string; href: string };
}

export default function CTASection({ title, description, primaryCTA, secondaryCTA }: CTASectionProps) {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-24 text-white">
      <div className="container-md text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
        {description && <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">{description}</p>}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="ghost" size="lg" href={primaryCTA.href}>{primaryCTA.text}</Button>
          {secondaryCTA && <Button variant="secondary" size="lg" href={secondaryCTA.href}>{secondaryCTA.text}</Button>}
        </div>
      </div>
    </section>
  );
}
