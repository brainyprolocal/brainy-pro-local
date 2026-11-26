import { ImageResponse } from 'next/og';

export const alt = 'brainy pro — The Operational Platform for Maryland Home Service Pros';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0F172A 0%, #1D4781 55%, #2563EB 100%)',
          color: '#FFFFFF',
          padding: '64px 80px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 24px',
            borderRadius: '9999px',
            background: 'rgba(255, 255, 255, 0.12)',
            border: '1px solid rgba(255, 255, 255, 0.22)',
            fontSize: 22,
            letterSpacing: '0.04em',
            marginBottom: 32,
          }}
        >
          Maryland Home Service Network &amp; Operations
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: 24,
          }}
        >
          brainy pro
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 500,
            color: 'rgba(255, 255, 255, 0.88)',
            maxWidth: 880,
            lineHeight: 1.35,
          }}
        >
          Build trust. Buy back time. Keep your clients for life.
        </div>
      </div>
    ),
    { ...size }
  );
}
