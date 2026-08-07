'use client';

import { useState, useEffect } from 'react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-40 w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:scale-110 hover:shadow-xl transition-all duration-300 group ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <img
        src="/brand/logo-icon-blue.svg"
        alt="Scroll to top"
        className="w-7 h-7 group-hover:scale-110 transition-transform"
      />
    </button>
  );
}
