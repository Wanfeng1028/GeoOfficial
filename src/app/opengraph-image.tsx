import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'GeoWork — 地图、遥感、代码与研究，汇于一个工作台。';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          padding: '80px',
          backgroundColor: '#0d0f12',
          color: '#f4f5f6',
          fontSize: 72,
          fontWeight: 600,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
            <path d="M5 3.5 L19 20 L5 20 Z" fill="#2b8c6b" opacity="0.85" />
            <path d="M5 3.5 L19 3.5 L13 11.5 Z" fill="#2b8c6b" opacity="0.45" />
          </svg>
          GeoWork
        </div>
        <div style={{ fontSize: 28, color: '#9aa0a6', marginTop: '16px', fontWeight: 400 }}>
          地图、遥感、代码与研究，汇于一个工作台。
        </div>
      </div>
    ),
    { ...size },
  );
}
