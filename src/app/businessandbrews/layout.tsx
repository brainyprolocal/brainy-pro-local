import type { Metadata } from 'next';
import PoweredByBadge from '@/components/businessandbrews/PoweredByBadge';
import HideSiteChrome from '@/components/businessandbrews/HideSiteChrome';
import BackgroundDecor from '@/components/businessandbrews/BackgroundDecor';

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
      <BackgroundDecor />
      <div className="relative z-10">
        {children}
      </div>
      <PoweredByBadge />
    </div>
  );
}
