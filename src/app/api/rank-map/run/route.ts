import { NextRequest, NextResponse } from 'next/server';
import {
  searchLocalBusinesses,
  getBusinessProfile,
  getLocalRankGrid,
  type Biz,
  type GridResult,
} from '@/lib/openseo';
import { cached, kvBackend, DAY } from '@/lib/cache';
import { deriveChips, getHistory, pushHistory, normalizeKeyword } from '@/lib/keywords';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const NOINDEX = { 'X-Robots-Tag': 'noindex, nofollow, noarchive', 'Cache-Control': 'no-store' };
const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: NOINDEX });

const r4 = (n: number) => Math.round(n * 1e4) / 1e4;

function compass(dLat: number, dLon: number): string {
  const ns = Math.abs(dLat) > 1e-4 ? (dLat > 0 ? 'N' : 'S') : '';
  const ew = Math.abs(dLon) > 1e-4 ? (dLon > 0 ? 'E' : 'W') : '';
  return ns + ew;
}
function kmBetween(a: { latitude: number; longitude: number }, b: { latitude: number; longitude: number }) {
  const R = 6371, rad = Math.PI / 180;
  const dLat = (b.latitude - a.latitude) * rad, dLon = (b.longitude - a.longitude) * rad;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(a.latitude * rad) * Math.cos(b.latitude * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}
const WORD: Record<string, string> = { N: 'north', S: 'south', E: 'east', W: 'west' };

/** Collapses a set of compass cells into "north/west", "south", "all around", ... */
function regionLabel(dirs: string[]): string {
  const c: Record<string, number> = { N: 0, S: 0, E: 0, W: 0 };
  dirs.forEach((d) => d.split('').forEach((ch) => (c[ch] = (c[ch] || 0) + 1)));
  if (dirs.length && dirs.every((d) => d === '')) return 'at the storefront';
  const keys = Object.entries(c).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).map(([k]) => k);
  if (keys.length >= 4) return 'all around';
  return keys.slice(0, 2).map((k) => WORD[k]).join('/');
}

async function profile(cid: string) {
  return (await cached(`rm:prof:${cid}`, () => getBusinessProfile(cid), DAY, (v) => !!v)).value;
}

function buildStory(biz: Biz, cells: any[], summary: any, comps: any[]): string {
  const ranked = cells.filter((c) => c.rank);
  const total = cells.length;
  const center = cells.find((c) => c.isCenter);
  const top3 = cells.filter((c) => c.rank && c.rank <= 3);
  const weak = cells.filter((c) => !c.rank || c.rank > 10);
  const name = biz.title;
  const parts: string[] = [];
  if (!ranked.length) {
    return `${name} doesn't show up in the Google Maps pack at any of the ${total} points we checked. Right now, customers searching nearby are being handed to competitors — this is the biggest opportunity on the board.`;
  }
  if (center?.rank && center.rank <= 3) parts.push(`${name} owns the storefront — #${center.rank} right at its own address.`);
  else if (center?.rank) parts.push(`Even at its own storefront, ${name} only ranks #${center.rank}.`);
  else parts.push(`${name} doesn't even appear in the pack at its own storefront.`);

  if (top3.length === total) parts.push(`It holds a top-3 spot at every single point — the whole map is green.`);
  else if (top3.length >= total * 0.6) parts.push(`It's top-3 across most of the map (${top3.length} of ${total} points).`);
  else if (weak.length >= total * 0.5) {
    const where = regionLabel(weak.map((c) => c.dir).filter(Boolean));
    parts.push(`But the visibility drops off fast — ${weak.length} of ${total} points are outside the top 10, mostly to the ${where}. It owns the storefront but not the county.`);
  } else {
    parts.push(`Coverage is mixed: ${top3.length} top-3 points, ${summary?.top10Count ?? ranked.length} in the top 10.`);
  }
  if (comps.length) {
    const lead = comps[0];
    parts.push(`${lead.title} is the main rival, taking #1 at ${lead.wins} point${lead.wins > 1 ? 's' : ''} (${lead.region}).`);
  }
  return parts.join(' ');
}

export async function POST(req: NextRequest) {
  let body: any;
  try {
    body = await req.json();
  } catch {
    return json({ error: 'Invalid JSON' }, 400);
  }
  const query = String(body.business || '').trim();
  const cidIn = body.cid ? String(body.cid) : '';
  const near = body.near;
  const gridSize: 3 | 5 = body.grid === 3 ? 3 : 5;
  const spacingKm = gridSize === 5 ? 5 : 2;
  const keyword = body.keyword ? normalizeKeyword(String(body.keyword)) : '';

  if (!query && !cidIn) return json({ error: 'Enter a business name' }, 400);

  try {
    const cacheHits: string[] = [];
    let biz: Biz | null = null;
    let candidates: Biz[] = [];

    if (cidIn) {
      biz = await profile(cidIn);
    } else {
      if (!near || !Number.isFinite(near.latitude) || !Number.isFinite(near.longitude)) {
        return json({ error: 'Pick a market to search near' }, 400);
      }
      const n = { latitude: r4(near.latitude), longitude: r4(near.longitude), radiusKm: Number(near.radiusKm) || 50 };
      const k = `rm:search:${query.toLowerCase()}:${n.latitude},${n.longitude},${n.radiusKm}`;
      const s = await cached(k, () => searchLocalBusinesses(query, n), DAY, (v) => v.length > 0);
      if (s.hit) cacheHits.push('lookup');
      candidates = s.value.slice(0, 5);
      biz = candidates[0] ?? null;
    }

    if (!biz || !biz.cid || !Number.isFinite(biz.latitude)) {
      return json({ notFound: true, query });
    }

    const history = await getHistory(biz.cid);
    const chips = deriveChips(biz);
    const base = { biz, candidates, chips, history, gridSize, spacingKm, cacheBackend: kvBackend() };

    if (!keyword) return json({ ...base, status: 'resolved', cacheHits });

    const center = { latitude: r4(biz.latitude), longitude: r4(biz.longitude) };
    const gKey = `rm:grid:${biz.cid}:${keyword}:${center.latitude},${center.longitude}:${gridSize}`;
    const g = await cached<GridResult>(
      gKey,
      () => getLocalRankGrid({ keyword, center, cid: biz!.cid, gridSize, spacingKm }),
      DAY,
      (v) => v.status === 'ready',
    );
    if (g.hit) cacheHits.push('grid');
    if (g.value.status === 'processing') {
      return json({ ...base, keyword, status: 'processing', retryAfterSec: 60, cacheHits });
    }

    const newHistory = await pushHistory(biz.cid, keyword);

    // Re-index cells geographically: north at top, west at left.
    const raw = g.value.grid;
    const lats = [...new Set(raw.map((c) => r4(c.latitude)))].sort((a, b) => b - a);
    const lons = [...new Set(raw.map((c) => r4(c.longitude)))].sort((a, b) => a - b);
    const mid = Math.floor(gridSize / 2);
    const cells = raw.map((c) => {
      const gr = lats.length === gridSize ? lats.indexOf(r4(c.latitude)) : c.row;
      const gc = lons.length === gridSize ? lons.indexOf(r4(c.longitude)) : c.col;
      const dir = compass(c.latitude - center.latitude, c.longitude - center.longitude);
      const km = kmBetween(center, c);
      const isCenter = gr === mid && gc === mid;
      return {
        ...c,
        gr,
        gc,
        dir,
        isCenter,
        label: isCenter ? 'Storefront' : `${km.toFixed(1)} km ${dir}`,
        youAreTop: c.topResult?.cid === biz!.cid || c.rank === 1,
      };
    });

    // Competitors: who holds #1 where this business doesn't.
    const wins = new Map<string, { title: string; dirs: string[] }>();
    for (const c of cells) {
      const t = c.topResult;
      if (!t?.cid || t.cid === biz.cid || c.rank === 1) continue;
      const w = wins.get(t.cid) ?? { title: t.title, dirs: [] };
      w.dirs.push(c.dir);
      wins.set(t.cid, w);
    }
    const compList = [...wins.entries()].sort((a, b) => b[1].dirs.length - a[1].dirs.length).slice(0, 6);
    const competitors = await Promise.all(
      compList.map(async ([cid, w]) => {
        let p: Biz | null = null;
        try {
          p = await profile(cid);
        } catch {
          p = null;
        }
        return {
          cid,
          title: p?.title || w.title,
          wins: w.dirs.length,
          region: regionLabel(w.dirs),
          rating: p?.rating,
          reviewCount: p?.reviewCount,
          category: p?.category,
          additionalCategories: p?.additionalCategories ?? [],
          address: p?.address,
          phone: p?.phone,
          website: p?.website,
          url: p?.url,
        };
      }),
    );
    const youTop = cells.filter((c) => c.rank === 1).map((c) => c.dir);

    const summary = g.value.summary ?? {
      pointsSearched: cells.length,
      pointsFound: cells.filter((c) => c.rank).length,
      averageRank: null,
      top3Count: cells.filter((c) => c.rank && c.rank <= 3).length,
      top10Count: cells.filter((c) => c.rank && c.rank <= 10).length,
    };

    return json({
      ...base,
      history: newHistory,
      keyword,
      status: 'ready',
      summary,
      cells,
      you: { wins: youTop.length, region: youTop.length ? regionLabel(youTop) : null },
      competitors,
      story: buildStory(biz, cells, summary, competitors),
      cacheHits,
    });
  } catch (e: any) {
    console.error('[rank-map]', e);
    return json({ error: e?.message?.replace(/Bearer\s+\S+/g, 'Bearer ***') || 'Lookup failed' }, 502);
  }
}
