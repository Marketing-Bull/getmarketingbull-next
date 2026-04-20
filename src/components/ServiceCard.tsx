import Link from 'next/link';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export default function ServiceCard({ icon, title, description, href }: ServiceCardProps) {
  return (
    <Link href={href} className="block bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full group">
      <div className="text-4xl mb-5">{icon}</div>
      <h3 className="text-xl font-bold mb-3 text-slate-900 group-hover:text-blue-600 transition">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
      <div className="mt-6">
        <span className="text-blue-600 font-medium text-sm group-hover:text-blue-500">Learn More →</span>
      </div>
    </Link>
  );
}
