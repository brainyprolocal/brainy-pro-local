import type { Metadata } from 'next';
import PoweredByBadge from '@/components/businessandbrews/PoweredByBadge';
import HideSiteChrome from '@/components/businessandbrews/HideSiteChrome';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function BusinessAndBrewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-trust-navy text-clean-white min-h-screen relative">
      <HideSiteChrome />
      {children}
      <PoweredByBadge />
    </div>
  );
}
