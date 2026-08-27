export default function EventBackground({ variant = 'blue' }: { variant?: 'blue' | 'amber' | 'emerald' }) {
  const colors = {
    blue: {
      primary: '#2563EB',
      secondary: '#3B82F6',
      tertiary: '#6366F1',
      accent: '#818CF8',
      wash: 'rgba(37, 99, 235, 0.06)',
    },
    amber: {
      primary: '#D97706',
      secondary: '#F59E0B',
      tertiary: '#FBBF24',
      accent: '#EF4444',
      wash: 'rgba(217, 119, 6, 0.06)',
    },
    emerald: {
      primary: '#059669',
      secondary: '#10B981',
      tertiary: '#34D399',
      accent: '#06B6D4',
      wash: 'rgba(5, 150, 105, 0.06)',
    },
  };

  const c = colors[variant];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Full-page color wash — sets the overall tint */}
      <div
        className="absolute inset-0"
        style={{ background: c.wash }}
      />

      {/* Large primary blob — top right */}
      <div
        className="absolute -top-20 -right-20 w-[700px] h-[700px] rounded-full opacity-[0.30] animate-[drift-1_12s_ease-in-out_infinite]"
        style={{
          background: `radial-gradient(circle, ${c.primary} 0%, transparent 70%)`,
        }}
      />

      {/* Secondary blob — bottom left */}
      <div
        className="absolute -bottom-16 -left-16 w-[600px] h-[600px] rounded-full opacity-[0.25] animate-[drift-2_15s_ease-in-out_infinite]"
        style={{
          background: `radial-gradient(circle, ${c.secondary} 0%, transparent 70%)`,
        }}
      />

      {/* Tertiary blob — center right, drifting */}
      <div
        className="absolute top-1/3 -right-10 w-[500px] h-[500px] rounded-full opacity-[0.20] animate-[drift-3_18s_ease-in-out_infinite]"
        style={{
          background: `radial-gradient(circle, ${c.tertiary} 0%, transparent 70%)`,
        }}
      />

      {/* Accent blob — lower center-left */}
      <div
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full opacity-[0.15] animate-[drift-1_20s_ease-in-out_infinite_reverse]"
        style={{
          background: `radial-gradient(circle, ${c.accent} 0%, transparent 70%)`,
        }}
      />

      {/* Extra accent — top left for depth */}
      <div
        className="absolute -top-10 -left-10 w-[450px] h-[450px] rounded-full opacity-[0.18] animate-[drift-2_14s_ease-in-out_infinite_reverse]"
        style={{
          background: `radial-gradient(circle, ${c.accent} 0%, transparent 70%)`,
        }}
      />

      {/* Subtle noise / grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* Variant-tinted dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, ${c.primary} 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Top edge line — variant colored */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${c.primary}55, transparent)`,
        }}
      />

      {/* Bottom edge line — accent colored */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${c.accent}33, transparent)`,
        }}
      />

      {/* Drift keyframes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes drift-1 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(15px, -20px); }
          50% { transform: translate(-10px, -35px); }
          75% { transform: translate(20px, -15px); }
        }
        @keyframes drift-2 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-20px, 15px); }
          50% { transform: translate(15px, 25px); }
          75% { transform: translate(-10px, 10px); }
        }
        @keyframes drift-3 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(-25px, -15px); }
          66% { transform: translate(10px, 20px); }
        }
      `}} />
    </div>
  );
}
