'use client';

import { useState } from 'react';

interface FAQItem { question: string; answer: string; }

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-md max-w-3xl">
        <h2 className="text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full px-6 py-4 flex items-center justify-between bg-white hover:bg-gray-50 transition" aria-expanded={openIndex === index}>
                <h3 className="text-lg font-semibold text-gray-900 text-left">{item.question}</h3>
                <span className={`flex-shrink-0 transform transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>▼</span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
