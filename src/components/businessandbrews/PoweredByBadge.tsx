import Link from 'next/link';

export default function PoweredByBadge() {
  return (
    <Link
      href="/"
      className="fixed top-5 right-6 z-50 flex items-center gap-2.5 transition-opacity hover:opacity-80"
      aria-label="Powered by brainy pro"
    >
      <span className="text-sm font-medium text-white/70 tracking-wide">
        Powered by
      </span>
      <img
        src="/brand/logo-full-white.svg"
        alt="brainy pro"
        className="w-[120px] h-auto object-contain"
      />
    </Link>
  );
}
