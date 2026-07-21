'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Local Guides', href: '/guides' },
    { name: 'For Pros', href: '/for-pros' },
  ];

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
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-medium transition-colors ${
                    isActive
                      ? 'text-action-accent'
                      : 'text-trust-navy hover:text-connection-blue'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/for-pros"
              className="inline-flex items-center justify-center px-6 py-2.5 bg-action-accent text-clean-white font-semibold rounded-full shadow-lg hover:bg-connection-blue hover:scale-105 transition-all duration-300 hover:shadow-xl"
            >
              Are You a Pro? Join the Network
            </Link>
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
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-lg font-medium py-2 ${
                  pathname === link.href ? 'text-action-accent' : 'text-trust-navy'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/for-pros"
              className="inline-block mt-4 text-center px-6 py-3 bg-action-accent text-clean-white font-semibold rounded-full shadow-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Are You a Pro? Join the Network
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
