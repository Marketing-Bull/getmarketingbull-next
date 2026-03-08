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
      <div className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:scale-105 border border-gray-100 hover:border-blue-200 cursor-pointer h-full flex flex-col group relative overflow-hidden">
        {/* Subtle gradient border effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
        
        <div className="relative z-10">
          <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
          <h3 className="text-2xl font-bold mb-4 text-slate-900 group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
          <p className="text-slate-600 flex-grow text-lg leading-relaxed mb-6">{description}</p>
          <div className="flex items-center text-blue-600 font-bold group-hover:text-blue-500 transition-colors duration-300">
            <span className="mr-2">Learn More</span>
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
