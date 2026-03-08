'use client';

import { useState, useEffect } from 'react';

interface Testimonial {
  name: string;
  company?: string;
  title?: string;
  quote: string;
  rating: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay, testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrent(index);
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
  };

  const goToPrev = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlay(false);
  };

  const testimony = testimonials[current];

  return (
    <section className="py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16 text-slate-900">Real Results, Real Growth</h2>

        <div className="max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-white p-12 rounded-2xl shadow-xl border border-slate-200 mb-12 relative">
            {/* Large decorative quote mark */}
            <div className="absolute -top-4 left-8 w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-3xl text-white font-bold">"</span>
            </div>
            
            <div className="pt-8">
              <p className="text-2xl text-slate-700 leading-relaxed mb-8 font-medium">
                "{testimony.quote}"
              </p>
              
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{testimony.name}</h3>
                  {testimony.company && (
                    <p className="text-blue-600 font-semibold text-lg">{testimony.company}</p>
                  )}
                  {testimony.title && <p className="text-slate-600">{testimony.title}</p>}
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: testimony.rating }).map((_, i) => (
                    <span key={i} className="text-2xl">
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={goToPrev}
              className="p-2 hover:bg-gray-200 rounded-full transition"
              aria-label="Previous testimonial"
            >
              ←
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    index === current ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goToNext}
              className="p-2 hover:bg-gray-200 rounded-full transition"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
