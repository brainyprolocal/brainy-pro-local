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
import { geocode, inConus } from '@/lib/geocode';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const NOINDEX = { 'X-Robots-Tag': 'noindex, nofollow, noarchive', 'Cache-Control': 'no-store' };
const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: NOINDEX });

const r4 = (n: number) => Math.round(n * 1e4) / 1e4;
/** Rank assigned to "not in the pack" when averaging (BrightLocal ATRP convention). */
const NOT_FOUND = 21;
const GRID_SIZES = [3, 5];
const DEFAULT_SPACING: Record<number, number> = { 3: 2, 5: 5 };

type Pt = { latitude: number; longitude: number };

function compass(dLat: number, dLon: number): string {
  const ns = Math.abs(dLat) > 1e-4 ? (dLat > 0 ? 'N' : 'S') : '';
  const ew = Math.abs(dLon) > 1e-4 ? (dLon > 0 ? 'E' : 'W') : '';
  return ns + ew;
}
function km(a: Pt, b: Pt) {
  const R = 6371, rad = Math.PI / 180;
  const dLat = (b.latitude - a.latitude) * rad, dLon = (b.longitude - a.longitude) * rad;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(a.latitude * rad) * Math.cos(b.latitude * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(x));
}
const WORD: Record<string, string> = { N: 'north', S: 'south', E: 'east', W: 'west' };

/** Collapses a set of compass cells into "north/west", "south", "all around", ... */
function regionLabel(dirs: string[]): string {
  if (dirs.length && dirs.every((d) => d === '')) return 'at the center';
  const c: Record<string, number> = { N: 0, S: 0, E: 0, W: 0 };
  dirs.forEach((d) => d.split('').forEach((ch) => (c[ch] = (c[ch] || 0) + 1)));
  const keys = Object.entries(c).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).map(([k]) => k);
  if (keys.length >= 4) return 'all around';
  return keys.slice(0, 2).map((k) => WORD[k]).join('/') || 'at the center';
}

async function profile(cid: string) {
  return (await cached(`rm:prof:${cid}`, () => getBusinessProfile(cid), DAY, (v) => !!v)).value;
}

function buildStory(biz: Biz, cells: any[], m: any, comps: any[]): string {
  const total = cells.length;
  const store = cells.find((c) => c.isStore);
  const top3 = cells.filter((c) => c.rank && c.rank <= 3);
  const weak = cells.filter((c) => !c.rank || c.rank > 10);
  const name = biz.title;
  const parts: string[] = [];
  if (!cells.some((c) => c.rank)) {
    return `${name} doesn't show up in the Google Maps pack at any of the ${total} points we checked. Customers searching nearby are being handed to competitors — this is the biggest opportunity on the board.`;
  }
  if (store) {
    if (store.rank && store.rank <= 3) parts.push(`${name} owns the storefront — #${store.rank} right at its own address.`);
    else if (store.rank) parts.push(`Even at its own storefront, ${name} only ranks #${store.rank}.`);
    else parts.push(`${name} doesn't even appear in the pack at its own storefront.`);
  }
  if (top3.length === total) parts.push(`It holds a top-3 spot at every single point — the whole map is green.`);
  else if (top3.length >= total * 0.6) parts.push(`It's top-3 across most of the map (${top3.length} of ${total} points, ${m.solv}% share of local voice).`);
  else if (weak.length >= total * 0.5) {
    const where = regionLabel(weak.map((c) => c.dir).filter(Boolean));
    parts.push(`But visibility drops off fast — ${weak.length} of ${total} points are outside the top 10, mostly to the ${where}.${store?.rank && store.rank <= 3 ? ' It owns the storefront but not the county.' : ''}`);
  } else {
    parts.push(`Coverage is mixed: ${top3.length} top-3 points and ${m.top10Count} in the top 10 (${m.solv}% share of local voice).`);
  }
  const lead = comps.find((c) => c.wins > 0);
  if (lead) parts.push(`${lead.title} is the main rival, taking #1 at ${lead.wins} point${lead.wins > 1 ? 's' : ''} (${lead.region}).`);
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
  const gridSize: 3 | 5 = Number(body.grid) === 3 ? 3 : 5;
  const sp = Number(body.spacingKm);
  const spacingKm = Number.isFinite(sp) && sp >= 0.5 && sp <= 10 ? sp : DEFAULT_SPACING[gridSize];
  const keyword = body.keyword ? normalizeKeyword(String(body.keyword)) : '';
  const centerAddress = String(body.centerAddress || '').trim();

  if (!query && !cidIn) return json({ error: 'Enter a business name' }, 400);

  try {
    const cacheHits: string[] = [];
    let biz: Biz | null = null;
    let candidates: Biz[] = [];
    let searchedNear: string | undefined;

    // Check if query is a direct Google CID or Google Maps URL with cid
    const directCidMatch = query.match(/cid[=:](\d+)/i) || (query.match(/^\d{16,21}$/) ? [null, query] : null);
    const effectiveCid = cidIn || directCidMatch?.[1] || '';

    if (effectiveCid) {
      biz = await profile(effectiveCid);
      if (biz && (!Number.isFinite(biz.latitude) || biz.latitude === 0)) {
        // For SABs without coordinates, use location from body if available
        if (body.location) {
          const g = await geocode(String(body.location));
          if (g) {
            biz.latitude = g.latitude;
            biz.longitude = g.longitude;
            biz.isServiceArea = true;
          }
        }
      }
    } else {
      // "near" = a typed address/city/ZIP (geocoded) or explicit coordinates from a preset.
      let near: Pt | null = null;
      if (body.location) {
        const g = await geocode(String(body.location));
        if (!g) return json({ error: `Couldn't locate “${body.location}” in the continental US — try a fuller address, city + state, or ZIP.` }, 400);
        near = g;
        searchedNear = g.label;
      } else if (body.near && inConus(Number(body.near.latitude), Number(body.near.longitude))) {
        near = { latitude: Number(body.near.latitude), longitude: Number(body.near.longitude) };
      }
      if (!near) return json({ error: 'Enter an address, city, or ZIP to search near' }, 400);
      const n = { latitude: r4(near.latitude), longitude: r4(near.longitude), radiusKm: 50 };
      const k = `rm:search:${query.toLowerCase()}:${n.latitude},${n.longitude},${n.radiusKm}`;
      let s = await cached(k, () => searchLocalBusinesses(query, n), DAY, (v) => v.length > 0);
      if (s.hit) cacheHits.push('lookup');
      candidates = s.value.slice(0, 5);

      // Fallback for SABs: try wider radius and location-assisted query if no candidates found
      if (candidates.length === 0) {
        const cleanQuery = query.replace(/,?\s*(llc|inc|co|corp|ltd)\.?$/i, '').trim();
        const fallbackQuery = `${cleanQuery} ${searchedNear ? searchedNear.split(',')[0] : (body.location || '')}`.trim();
        const fallbackN = { latitude: n.latitude, longitude: n.longitude, radiusKm: 100 };
        const fallbackKey = `rm:search:${fallbackQuery.toLowerCase()}:${fallbackN.latitude},${fallbackN.longitude},100`;
        const fallbackS = await cached(fallbackKey, () => searchLocalBusinesses(fallbackQuery, fallbackN), DAY, (v) => v.length > 0);
        if (fallbackS.hit) cacheHits.push('lookup-fallback');
        candidates = fallbackS.value.slice(0, 5);
      }

      biz = candidates[0] ?? null;
    }

    if (!biz || !biz.cid || !Number.isFinite(biz.latitude) || biz.latitude === 0) {
      return json({ notFound: true, query, searchedNear });
    }

    const history = await getHistory(biz.cid);
    const chips = deriveChips(biz);
    const base = { biz, candidates, chips, history, gridSize, spacingKm, cacheBackend: kvBackend(), searchedNear };

    if (!keyword) return json({ ...base, status: 'resolved', cacheHits });

    // Grid center: the storefront by default, or any address (service-area / customer location).
    let centerPt: Pt = { latitude: biz.latitude, longitude: biz.longitude };
    let centerLabel = biz.isServiceArea ? 'Service Area Center' : 'Storefront';
    if (centerAddress) {
      const g = await geocode(centerAddress);
      if (!g) return json({ ...base, status: 'resolved', error: `Couldn't locate grid center “${centerAddress}”.` }, 400);
      centerPt = g;
      centerLabel = g.label;
    }
    const center = { latitude: r4(centerPt.latitude), longitude: r4(centerPt.longitude) };
    const gKey = `rm:grid:${biz.cid}:${keyword}:${center.latitude},${center.longitude}:${gridSize}:${spacingKm}`;
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
    const storePt = biz.isServiceArea ? null : { latitude: biz.latitude, longitude: biz.longitude };
    // Storefront = cell nearest the business pin, if the pin falls inside the grid (never for SABs —
    // their "location" is just the search-area fallback, not a real address).
    let storeIdx = -1, best = Infinity;
    if (storePt) {
      raw.forEach((c, i) => {
        const d = km(storePt, c);
        if (d < best) { best = d; storeIdx = i; }
      });
      if (best > spacingKm * 0.75) storeIdx = -1;
    }

    const cells = raw.map((c, i) => {
      const gr = lats.length === gridSize ? lats.indexOf(r4(c.latitude)) : c.row;
      const gc = lons.length === gridSize ? lons.indexOf(r4(c.longitude)) : c.col;
      const dir = compass(c.latitude - center.latitude, c.longitude - center.longitude);
      const isCenter = gr === mid && gc === mid;
      const isStore = i === storeIdx;
      return {
        ...c,
        gr,
        gc,
        dir,
        isCenter,
        isStore,
        label: isStore ? 'Storefront' : isCenter ? 'Center' : `${km(center, c).toFixed(1)} km ${dir}`,
      };
    });

    // --- BrightLocal-style metrics ---
    const total = cells.length;
    const found = cells.filter((c) => c.rank);
    const top3Count = cells.filter((c) => c.rank && c.rank <= 3).length;
    const top10Count = cells.filter((c) => c.rank && c.rank <= 10).length;
    const metrics = {
      pointsSearched: total,
      pointsFound: found.length,
      arp: found.length ? +(found.reduce((a, c) => a + c.rank!, 0) / found.length).toFixed(1) : null,
      atrp: total ? +(cells.reduce((a, c) => a + (c.rank ?? NOT_FOUND), 0) / total).toFixed(1) : null,
      solv: total ? Math.round((top3Count / total) * 100) : 0,
      top3Count,
      top10Count,
    };

    // --- Competitive field ---
    // Full per-point results (if OpenSEO returns them) give true avg rank/top-3 per competitor;
    // otherwise we fall back to #1 spots only.
    const hasFull = cells.some((c) => c.results?.length);
    const stats = new Map<string, { title: string; ranks: number[]; winDirs: string[] }>();
    const touch = (cid: string, title: string) => {
      const s = stats.get(cid) ?? { title, ranks: [], winDirs: [] };
      stats.set(cid, s);
      return s;
    };
    for (const c of cells) {
      if (hasFull) {
        for (const r of c.results ?? []) if (r.cid !== biz.cid) touch(r.cid, r.title).ranks.push(r.rank);
      }
      const t = c.topResult;
      if (t?.cid && t.cid !== biz.cid && c.rank !== 1) touch(t.cid, t.title).winDirs.push(c.dir);
    }
    const ranked = [...stats.entries()]
      .map(([cid, s]) => {
        const all = hasFull ? [...s.ranks, ...Array(Math.max(0, total - s.ranks.length)).fill(NOT_FOUND)] : [];
        return {
          cid,
          title: s.title,
          wins: s.winDirs.length,
          region: s.winDirs.length ? regionLabel(s.winDirs) : null,
          top3: hasFull ? s.ranks.filter((r) => r <= 3).length : null,
          atrp: hasFull ? +(all.reduce((a, r) => a + r, 0) / total).toFixed(1) : null,
          solv: hasFull ? Math.round((s.ranks.filter((r) => r <= 3).length / total) * 100) : null,
        };
      })
      .sort((a, b) => (hasFull ? (b.top3 ?? 0) - (a.top3 ?? 0) : 0) || b.wins - a.wins)
      .slice(0, 8);

    const competitors = await Promise.all(
      ranked.map(async (r) => {
        let p: Biz | null = null;
        try { p = await profile(r.cid); } catch { p = null; }
        return {
          ...r,
          title: p?.title || r.title,
          rating: p?.rating,
          reviewCount: p?.reviewCount,
          category: p?.category,
          additionalCategories: p?.additionalCategories ?? [],
          address: p?.address,
          phone: p?.phone,
          website: p?.website,
          url: p?.url,
          placeTopics: p?.placeTopics ?? {},
        };
      }),
    );
    const youTop = cells.filter((c) => c.rank === 1).map((c) => c.dir);

    // --- Category Gap Analysis ---
    const yourCategories = new Set([biz.category, ...(biz.additionalCategories || [])].filter(Boolean) as string[]);
    const compCatCounts = new Map<string, number>();
    for (const comp of competitors) {
      const cats = [comp.category, ...(comp.additionalCategories || [])].filter(Boolean) as string[];
      for (const cat of cats) {
        compCatCounts.set(cat, (compCatCounts.get(cat) || 0) + 1);
      }
    }
    const missingCategories = [...compCatCounts.entries()]
      .filter(([cat]) => !yourCategories.has(cat))
      .sort((a, b) => b[1] - a[1])
      .map(([category, count]) => ({ category, competitorCount: count }));

    return json({
      ...base,
      history: newHistory,
      keyword,
      status: 'ready',
      center: { ...center, label: centerLabel, isStorefront: !centerAddress },
      storefront: storePt,
      summary: metrics,
      cells,
      hasFullResults: hasFull,
      categoryAudit: {
        yourCategories: Array.from(yourCategories),
        missingCategories,
      },
      you: {
        wins: youTop.length,
        region: youTop.length ? regionLabel(youTop) : null,
        top3: top3Count,
        atrp: metrics.atrp,
        solv: metrics.solv,
      },
      competitors,
      story: buildStory(biz, cells, metrics, competitors),
      cacheHits,
    });
  } catch (e: any) {
    console.error('[rank-map]', e);
    return json({ error: e?.message?.replace(/Bearer\s+\S+/g, 'Bearer ***') || 'Lookup failed' }, 502);
  }
}
