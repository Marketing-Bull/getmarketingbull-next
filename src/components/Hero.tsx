import Link from 'next/link';

interface HeroProps {
  title: string;
  subtitle: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

export default function Hero({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
}: HeroProps) {
  return (
    <section className="hero flex items-center justify-center">
      <div className="container-md text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{title}</h1>
        <p className="text-xl md:text-2xl mb-6 text-blue-100">{subtitle}</p>
        {description && <p className="text-lg mb-8 text-blue-100 max-w-2xl mx-auto">{description}</p>}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          {primaryCTA && (
            <Link
              href={primaryCTA.href}
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              {primaryCTA.text}
            </Link>
          )}
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-colors"
            >
              {secondaryCTA.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
