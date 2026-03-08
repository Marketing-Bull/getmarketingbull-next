import Link from 'next/link';

interface CTASectionProps {
  title: string;
  description?: string;
  primaryCTA: {
    text: string;
    href: string;
  };
}

export default function CTASection({ title, description, primaryCTA }: CTASectionProps) {
  return (
    <section className="bg-gradient-to-r from-blue-900 to-blue-800 py-16 text-white">
      <div className="container-md text-center">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        {description && <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">{description}</p>}
        <Link
          href={primaryCTA.href}
          className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          {primaryCTA.text}
        </Link>
      </div>
    </section>
  );
}
