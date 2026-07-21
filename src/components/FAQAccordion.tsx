'use client';

import { useState } from 'react';

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <button
              onClick={() => toggleItem(index)}
              className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors duration-150 ease-in-out focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="font-montserrat font-semibold text-trust-navy text-lg">{item.question}</span>
              <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                <svg className="w-5 h-5 text-action-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  ) : (
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  )}
                </svg>
              </span>
            </button>
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-5 pt-0 text-gray-600 font-inter">
                {item.answer}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
