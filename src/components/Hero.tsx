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

        <div className="flex flex-col sm:flex-row gap-6 justify-center mt-10">
          {primaryCTA && (
            <Link
              href={primaryCTA.href}
              className="bg-white text-slate-900 px-12 py-5 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              {primaryCTA.text}
            </Link>
          )}
          {secondaryCTA && (
            <Link
              href={secondaryCTA.href}
              className="border-2 border-white text-white px-12 py-5 rounded-xl font-bold text-lg hover:bg-white hover:text-slate-900 transition-all duration-300 backdrop-blur-sm"
            >
              {secondaryCTA.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
