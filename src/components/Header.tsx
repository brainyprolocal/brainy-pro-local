'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToPricing = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className="font-[family-name:var(--font-outfit)] text-2xl font-bold tracking-tight text-gradient transition-transform group-hover:scale-105">
              brAIny pro
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#pricing"
              onClick={scrollToPricing}
              className="font-medium text-trust-navy hover:text-action-accent transition-colors cursor-pointer"
            >
              Pricing
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#pricing"
              onClick={scrollToPricing}
              className="inline-flex items-center justify-center px-6 py-2.5 bg-action-accent text-clean-white font-semibold rounded-full shadow-lg hover:bg-connection-blue hover:scale-105 transition-all duration-300 hover:shadow-xl cursor-pointer"
            >
              View Platform Pricing
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-trust-navy focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass shadow-lg animate-slide-down border-t border-gray-100">
          <div className="flex flex-col px-4 py-6 space-y-4">
            <a
              href="#pricing"
              onClick={scrollToPricing}
              className="text-lg font-medium py-2 text-trust-navy hover:text-action-accent transition-colors"
            >
              Pricing
            </a>
            <a
              href="#pricing"
              onClick={scrollToPricing}
              className="inline-block mt-4 text-center px-6 py-3 bg-action-accent text-clean-white font-semibold rounded-full shadow-md"
            >
              View Platform Pricing
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
