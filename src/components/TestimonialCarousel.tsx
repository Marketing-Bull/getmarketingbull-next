'use client';

import { useState, useEffect } from 'react';

interface Testimonial { name: string; company?: string; title?: string; quote: string; rating: number; }

export default function TestimonialCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);
  // The user's choice via the Pause/Play button (or implied by using prev/next/dots).
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  // Temporary pauses while the pointer is over the carousel or focus is inside it.
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const rotating = isAutoPlay && !hovered && !focused;

  // No autoplay for people who asked the OS for reduced motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setIsAutoPlay(false);
  }, []);

  useEffect(() => {
    if (!rotating) return;
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, [rotating, testimonials.length]);

  const goToSlide = (index: number) => { setCurrent(index); setIsAutoPlay(false); };
  const testimony = testimonials[current];

  return (
    <section className="py-24 bg-slate-50" aria-roledescription="carousel" aria-label="Client testimonials">
      <div className="container-md">
        <h2 className="text-4xl font-bold text-center mb-16 text-slate-900">What clients say</h2>
        <div
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false); }}
        >
          {/* Announce slide changes only when they aren't happening on a timer. */}
          <div aria-live={rotating ? 'off' : 'polite'}>
            <div
              role="group"
              aria-roledescription="slide"
              aria-label={`${current + 1} of ${testimonials.length}`}
              className="bg-white p-12 rounded-2xl shadow-xl border border-slate-200 mb-8 relative"
            >
              <div className="absolute -top-4 left-8 w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center" aria-hidden="true">
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
                  <div className="flex gap-1" role="img" aria-label={`Rated ${testimony.rating} out of 5`}>
                    {Array.from({ length: testimony.rating }).map((_, i) => <span key={i} className="text-2xl" aria-hidden="true">⭐</span>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setIsAutoPlay((p) => !p)}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-400 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition"
            >
              <span aria-hidden="true">{isAutoPlay ? '❚❚' : '▶'}</span>
              {isAutoPlay ? 'Pause' : 'Play'}
            </button>
            <button type="button" onClick={() => { setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length); setIsAutoPlay(false); }} className="p-2 hover:bg-gray-200 rounded-full transition" aria-label="Previous testimonial">←</button>
            <div className="flex gap-1">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  className="group flex h-6 w-6 items-center justify-center rounded-full"
                  aria-label={`Testimonial ${index + 1}`}
                  aria-current={index === current ? 'true' : undefined}
                >
                  <span className={`block w-3 h-3 rounded-full transition ${index === current ? 'bg-red-600' : 'bg-gray-300 group-hover:bg-gray-400'}`} />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => { setCurrent((p) => (p + 1) % testimonials.length); setIsAutoPlay(false); }} className="p-2 hover:bg-gray-200 rounded-full transition" aria-label="Next testimonial">→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
