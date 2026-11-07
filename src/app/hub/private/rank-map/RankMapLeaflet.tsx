'use client';

import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';

type Cell = { latitude: number; longitude: number; rank: number | null; label: string; isStore: boolean; isCenter: boolean; topResult?: { title: string } | null };

const color = (r: number | null) => (!r ? '#3a4260' : r <= 3 ? '#22c58b' : r <= 10 ? '#f0a623' : '#e5484d');
const esc = (s: string) => s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!);

/** Esri dark-gray basemap (free, no key) with rank bubbles at each grid point. */
export default function RankMapLeaflet({ cells, storefront }: { cells: Cell[]; storefront: { latitude: number; longitude: number } | null }) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let map: any;
    let cancelled = false;
    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled || !el.current) return;
      map = L.map(el.current, { zoomControl: true, attributionControl: true, scrollWheelZoom: false });
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri, DeLorme, NAVTEQ',
        maxZoom: 16,
      }).addTo(map);
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 16,
      }).addTo(map);

      const bounds = L.latLngBounds([]);
      for (const c of cells) {
        const fg = c.rank && c.rank > 10 ? '#fff' : c.rank ? '#06140f' : '#9aa5c6';
        const html = `<div style="width:34px;height:34px;border-radius:50%;background:${color(c.rank)};color:${fg};display:flex;align-items:center;justify-content:center;font:700 14px system-ui;box-shadow:0 0 14px ${color(c.rank)}99;border:2px solid rgba(255,255,255,.25)">${c.rank ?? '–'}</div>`;
        L.marker([c.latitude, c.longitude], {
          icon: L.divIcon({ html, className: '', iconSize: [34, 34], iconAnchor: [17, 17] }),
        })
          .bindTooltip(`${esc(c.label)}<br/>${c.rank ? `Rank #${c.rank}` : 'Not in pack'}${c.topResult ? `<br/>#1: ${esc(c.topResult.title || '')}` : ''}`)
          .addTo(map);
        bounds.extend([c.latitude, c.longitude]);
      }
      if (storefront) {
        const star = `<div style="color:#ffcf5c;font-size:22px;text-shadow:0 0 8px #000">★</div>`;
        L.marker([storefront.latitude, storefront.longitude], {
          icon: L.divIcon({ html: star, className: '', iconSize: [22, 22], iconAnchor: [11, 30] }),
          zIndexOffset: 1000,
        })
          .bindTooltip('Storefront (Google pin)')
          .addTo(map);
      }
      map.fitBounds(bounds.pad(0.12));
    })();
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [cells, storefront]);

  return <div ref={el} style={{ height: 520, borderRadius: 14, overflow: 'hidden', marginTop: 14, background: '#0c1020' }} />;
}
