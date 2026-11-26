export default function HubShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-trust-navy text-clean-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-12">{children}</div>
    </div>
  );
}
