export default function BackgroundDecor() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Large radial gradient — top right */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-[0.07]"
        style={{
          background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
        }}
      />

      {/* Medium radial gradient — bottom left */}
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-[0.06]"
        style={{
          background: 'radial-gradient(circle, #1D4781 0%, transparent 70%)',
        }}
      />

      {/* Small accent glow — center left */}
      <div
        className="absolute top-1/2 -left-20 w-[300px] h-[300px] rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)',
        }}
      />

      {/* Dot grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'radial-gradient(circle, #FFFFFF 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Subtle horizontal lines accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-connection-blue/20 to-transparent"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-action-accent/10 to-transparent"
      />
    </div>
  );
}
