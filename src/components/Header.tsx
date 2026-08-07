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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-white rounded-xl p-1 shadow-md flex items-center justify-center shrink-0 border border-gray-100 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
              <img src="/brand/logo-icon-blue.svg" alt="brainy pro logo icon" className="w-full h-full object-contain" />
            </div>
            <span className={`font-[family-name:var(--font-outfit)] text-2xl font-bold tracking-tight transition-transform group-hover:scale-105 ${
              isScrolled ? 'text-gradient' : 'text-white drop-shadow-md'
            }`}>
              brainy pro
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`font-semibold transition-colors ${
                isScrolled ? 'text-trust-navy hover:text-action-accent' : 'text-white/90 hover:text-white drop-shadow-md'
              }`}
            >
              Home
            </Link>
            <Link
              href="/pricing"
              className={`font-semibold transition-colors ${
                isScrolled ? 'text-trust-navy hover:text-action-accent' : 'text-white/90 hover:text-white drop-shadow-md'
              }`}
            >
              Pricing
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/pricing"
              className={`inline-flex items-center justify-center px-6 py-2.5 font-semibold rounded-full shadow-lg hover:scale-105 transition-all duration-300 hover:shadow-xl ${
                isScrolled
                  ? 'bg-action-accent text-clean-white hover:bg-connection-blue'
                  : 'bg-white text-trust-navy hover:bg-slate-100'
              }`}
            >
              View Platform Pricing
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 focus:outline-none transition-colors ${
              isScrolled ? 'text-trust-navy' : 'text-white drop-shadow-md'
            }`}
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
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium py-2 text-trust-navy hover:text-action-accent transition-colors"
            >
              Home
            </Link>
            <Link
              href="/pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium py-2 text-trust-navy hover:text-action-accent transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/pricing"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-block mt-4 text-center px-6 py-3 bg-action-accent text-clean-white font-semibold rounded-full shadow-md"
            >
              View Platform Pricing
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
