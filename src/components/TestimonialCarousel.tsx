'use client';

import { useState, useEffect } from 'react';

interface Testimonial { name: string; company?: string; title?: string; quote: string; rating: number; }

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, [isAutoPlay, testimonials.length]);

  const goToSlide = (index: number) => { setCurrent(index); setIsAutoPlay(false); };
  const testimony = testimonials[current];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container-md">
        <h2 className="text-4xl font-bold text-center mb-16 text-slate-900">What clients say</h2>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-12 rounded-2xl shadow-xl border border-slate-200 mb-8 relative">
            <div className="absolute -top-4 left-8 w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center">
              <span className="text-3xl text-white font-bold">"</span>
            </div>
            <div className="pt-8">
              <p className="text-2xl text-slate-700 leading-relaxed mb-8 font-medium">"{testimony.quote}"</p>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{testimony.name}</h3>
                  {testimony.company && <p className="text-red-600 font-semibold">{testimony.company}</p>}
                  {testimony.title && <p className="text-slate-600">{testimony.title}</p>}
                </div>
                <div className="flex gap-1">{Array.from({ length: testimony.rating }).map((_, i) => <span key={i} className="text-2xl">⭐</span>)}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button onClick={() => { setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length); setIsAutoPlay(false); }} className="p-2 hover:bg-gray-200 rounded-full transition" aria-label="Previous">←</button>
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full transition ${index === current ? 'bg-primary' : 'bg-gray-300'}`} aria-label={`Testimonial ${index + 1}`} />
              ))}
            </div>
            <button onClick={() => { setCurrent((p) => (p + 1) % testimonials.length); setIsAutoPlay(false); }} className="p-2 hover:bg-gray-200 rounded-full transition" aria-label="Next">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
