import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-24 text-center bg-gradient-to-br from-trust-navy via-connection-blue to-action-accent text-clean-white relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-action-accent/20 rounded-full blur-3xl pointer-events-none animate-float"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-xl mx-auto">
        {/* Brand logo icon */}
        <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl p-4 mx-auto mb-8 border border-white/20">
          <img
            src="/brand/logo-icon-blue.svg"
            alt="brainy pro"
            className="w-full h-full object-contain opacity-90"
          />
        </div>

        {/* 404 text */}
        <h1 className="text-8xl sm:text-9xl font-outfit font-bold mb-4 drop-shadow-lg tracking-tight">
          404
        </h1>

        {/* Brand text logo */}
        <img
          src="/brand/Brainy Pro Text White.svg"
          alt="brainy pro"
          className="h-8 sm:h-10 mx-auto mb-6"
        />

        <p className="text-lg sm:text-xl text-white/80 mb-10 font-inter font-light leading-relaxed">
          This page doesn&apos;t exist — but your next great system does. Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-bold text-connection-blue bg-clean-white rounded-full shadow-xl hover:bg-slate-100 hover:scale-105 transition-all duration-300 gap-3 font-montserrat"
          >
            <img src="/brand/logo-icon-blue.svg" alt="" className="w-5 h-5" />
            Back to Home
          </Link>
          <Link
            href="/pricing"
            className="inline-flex items-center justify-center px-8 py-3.5 text-lg font-semibold text-white bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 gap-2 font-montserrat"
          >
            View Pricing
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
