import Link from 'next/link';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export default function ServiceCard({ icon, title, description, href }: ServiceCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] border border-gray-100 cursor-pointer h-full flex flex-col">
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
        <p className="text-gray-600 flex-grow">{description}</p>
        <div className="mt-4 text-primary font-semibold hover:text-primary-dark">
          Learn More →
        </div>
      </div>
    </Link>
  );
}
