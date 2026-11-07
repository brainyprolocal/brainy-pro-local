import HideSiteChrome from '@/components/businessandbrews/HideSiteChrome';

export default function HubShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-trust-navy text-clean-white min-h-screen">
      <HideSiteChrome />
      <div className="max-w-3xl mx-auto px-6 py-12">{children}</div>
    </div>
  );
}
