import 'server-only';
import { cached } from './cache';

/**
 * Free US geocoding, no API keys:
 *  1. US Census Geocoder — best for full street addresses.
 *  2. OpenStreetMap Nominatim — fallback for cities, ZIPs, landmarks.
 * Results cached 30 days. Only continental-US results are accepted.
 */
const UA = 'rank-map/1.0 (+https://brainyprolocal.com)';

export interface GeoPoint {
  latitude: number;
  longitude: number;
  label: string;
  source: 'census' | 'osm';
}

export const inConus = (lat: number, lng: number) =>
  lat >= 24.4 && lat <= 49.5 && lng >= -125 && lng <= -66.9;

async function census(q: string): Promise<GeoPoint | null> {
  const u = new URL('https://geocoding.geo.census.gov/geocoder/locations/onelineaddress');
  u.searchParams.set('address', q);
  u.searchParams.set('benchmark', 'Public_AR_Current');
  u.searchParams.set('format', 'json');
  const res = await fetch(u, { headers: { 'User-Agent': UA }, cache: 'no-store', signal: AbortSignal.timeout(8000) });
  if (!res.ok) return null;
  const m = (await res.json())?.result?.addressMatches?.[0];
  if (!m) return null;
  return { latitude: m.coordinates.y, longitude: m.coordinates.x, label: m.matchedAddress, source: 'census' };
}

async function osm(q: string): Promise<GeoPoint | null> {
  const u = new URL('https://nominatim.openstreetmap.org/search');
  u.searchParams.set('q', q);
  u.searchParams.set('format', 'json');
  u.searchParams.set('limit', '1');
  u.searchParams.set('countrycodes', 'us');
  const res = await fetch(u, { headers: { 'User-Agent': UA }, cache: 'no-store', signal: AbortSignal.timeout(8000) });
  if (!res.ok) return null;
  const m = (await res.json())?.[0];
  if (!m) return null;
  return { latitude: Number(m.lat), longitude: Number(m.lon), label: m.display_name, source: 'osm' };
}

/** Accepts an address, city, ZIP — or a raw "lat, lng" pair. */
export async function geocode(input: string): Promise<GeoPoint | null> {
  const q = input.trim();
  if (!q) return null;
  const coord = q.match(/^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/);
  if (coord) {
    const lat = Number(coord[1]), lng = Number(coord[2]);
    return inConus(lat, lng) ? { latitude: lat, longitude: lng, label: q, source: 'osm' } : null;
  }
  const { value } = await cached<GeoPoint | null>(
    `rm:geo:${q.toLowerCase()}`,
    async () => {
      let p: GeoPoint | null = null;
      try { p = await census(q); } catch { p = null; }
      if (!p) { try { p = await osm(q); } catch { p = null; } }
      return p && inConus(p.latitude, p.longitude) ? p : null;
    },
    60 * 60 * 24 * 30,
    (v) => !!v,
  );
  return value;
}
