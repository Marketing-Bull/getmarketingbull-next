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
    <section className="py-16 bg-gray-50">
      <div className="container-md">
        <h2 className="text-4xl font-bold text-center mb-12">What Our Clients Say</h2>

        <div className="max-w-2xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-white p-8 rounded-lg shadow-lg border-l-4 border-primary mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{testimony.name}</h3>
                {testimony.company && (
                  <p className="text-primary font-semibold">{testimony.company}</p>
                )}
                {testimony.title && <p className="text-gray-600">{testimony.title}</p>}
              </div>
              <div className="flex gap-1">
                {Array.from({ length: testimony.rating }).map((_, i) => (
                  <span key={i} className="text-xl">
                    ⭐
                  </span>
                ))}
              </div>
            </div>
            <p className="text-lg text-gray-700 italic">"{testimony.quote}"</p>
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
