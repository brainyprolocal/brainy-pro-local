import Link from 'next/link';

export default function PoweredByBadge() {
  return (
    <Link
      href="/"
      className="flex items-center justify-center gap-2.5 py-6 transition-opacity hover:opacity-80"
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
