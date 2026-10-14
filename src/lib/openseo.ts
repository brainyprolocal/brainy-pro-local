import 'server-only';

/**
 * OpenSEO MCP client (streamable HTTP, JSON-RPC 2.0). SERVER ONLY.
 * Gotchas handled:
 *  1. Cloudflare 403 (1010) on generic UAs -> real User-Agent on every request.
 *  2. Parse result.structuredContent, never content[0].text prose.
 *  3. structuredContent.status === "processing" -> caller re-issues same call later.
 */
const ENDPOINT = 'https://app.openseo.so/mcp';
const UA = 'rank-map/1.0 (+https://brainyprolocal.com)';

let rpcId = 1;

function headers(session?: string): Record<string, string> {
  let key = process.env.OPENSEO_API_KEY?.trim() || '';
  if (!key) throw new Error('OPENSEO_API_KEY is not configured');
  // Strip surrounding quotes if present
  key = key.replace(/^["']|["']$/g, '').trim();
  // Strip leading 'Bearer ' if user included it in the env var
  if (key.toLowerCase().startsWith('bearer ')) {
    key = key.slice(7).trim();
  }
  const h: Record<string, string> = {
    Authorization: `Bearer ${key}`,
    'User-Agent': UA,
    'Content-Type': 'application/json',
    Accept: 'application/json, text/event-stream',
  };
  if (session) h['Mcp-Session-Id'] = session;
  return h;
}

/** Response may be plain JSON or an SSE stream; return the JSON-RPC message matching id. */
async function readRpc(res: Response, id?: number): Promise<any> {
  const text = await res.text();
  const ct = res.headers.get('content-type') || '';
  if (ct.includes('text/event-stream')) {
    const msgs = text
      .split(/\r?\n/)
      .filter((l) => l.startsWith('data:'))
      .map((l) => {
        try { return JSON.parse(l.slice(5).trim()); } catch { return null; }
      })
      .filter(Boolean);
    return msgs.find((m: any) => m.id === id) ?? msgs[msgs.length - 1] ?? null;
  }
  return text ? JSON.parse(text) : null;
}

async function post(body: unknown, session?: string): Promise<Response> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: headers(session),
    body: JSON.stringify(body),
    cache: 'no-store',
  });
  if (!res.ok && res.status !== 202) {
    const t = await res.text().catch(() => '');
    throw new Error(`OpenSEO HTTP ${res.status}: ${t.slice(0, 200)}`);
  }
  return res;
}

async function handshake(): Promise<string | undefined> {
  const id = rpcId++;
  const res = await post({
    jsonrpc: '2.0',
    id,
    method: 'initialize',
    params: {
      protocolVersion: '2025-03-26',
      capabilities: {},
      clientInfo: { name: 'brainypro-rank-map', version: '1.0.0' },
    },
  });
  const session = res.headers.get('mcp-session-id') || undefined;
  const msg = await readRpc(res, id);
  if (msg?.error) throw new Error(`OpenSEO initialize failed: ${msg.error.message}`);
  await post({ jsonrpc: '2.0', method: 'notifications/initialized' }, session);
  return session;
}

/** Reuse one initialized MCP session per server instance for a few minutes (fewer round trips). */
let sessionCache: { id: string | undefined; at: number } | null = null;
const SESSION_TTL_MS = 4 * 60 * 1000;

async function getSession(fresh = false): Promise<string | undefined> {
  if (!fresh && sessionCache && Date.now() - sessionCache.at < SESSION_TTL_MS) return sessionCache.id;
  const id = await handshake();
  sessionCache = { id, at: Date.now() };
  return id;
}

async function rawCall(name: string, args: Record<string, unknown>, session: string | undefined) {
  const id = rpcId++;
  const res = await post({ jsonrpc: '2.0', id, method: 'tools/call', params: { name, arguments: args } }, session);
  return readRpc(res, id);
}

/** Calls an MCP tool and returns its structuredContent object. */
export async function callTool<T = any>(name: string, args: Record<string, unknown>): Promise<T> {
  let msg: any;
  try {
    msg = await rawCall(name, args, await getSession());
    // A JSON-RPC session error (expired/unknown session) → re-handshake once.
    if (msg?.error && /session|initializ/i.test(String(msg.error.message))) {
      msg = await rawCall(name, args, await getSession(true));
    }
  } catch (e: any) {
    // HTTP 400/404 on a reused session usually means it expired server-side.
    if (/HTTP (400|404)/.test(String(e?.message))) msg = await rawCall(name, args, await getSession(true));
    else throw e;
  }
  if (msg?.error) throw new Error(`OpenSEO ${name}: ${msg.error.message}`);
  const result = msg?.result;
  if (result?.isError) {
    const prose = result?.content?.[0]?.text ?? 'tool error';
    throw new Error(`OpenSEO ${name}: ${String(prose).slice(0, 300)}`);
  }
  if (!result?.structuredContent) throw new Error(`OpenSEO ${name}: missing structuredContent`);
  return result.structuredContent as T;
}

/** Lists the MCP tools OpenSEO exposes (name, description, input schema). Diagnostics only. */
export async function listTools(): Promise<any[]> {
  const session = await getSession();
  const id = rpcId++;
  const res = await post({ jsonrpc: '2.0', id, method: 'tools/list', params: {} }, session);
  const msg = await readRpc(res, id);
  if (msg?.error) throw new Error(`OpenSEO tools/list: ${msg.error.message}`);
  return msg?.result?.tools ?? [];
}

// ---------- Typed helpers ----------

export interface Biz {
  cid: string;
  title: string;
  address?: string;
  latitude: number;
  longitude: number;
  category?: string;
  additionalCategories: string[];
  placeTopics: Record<string, number>;
  rating?: number;
  reviewCount?: number;
  phone?: string;
  website?: string;
  url?: string;
  isServiceArea?: boolean;
}

const pick = (o: any, ...keys: string[]) => {
  for (const k of keys) if (o?.[k] !== undefined && o?.[k] !== null) return o[k];
  return undefined;
};

/** Normalizes the varying business shapes (search result / profile) into Biz. */
export function normalizeBiz(o: any): Biz {
  const rating = pick(o, 'rating');
  const ratingVal = typeof rating === 'object' ? pick(rating, 'value', 'rating') : rating;
  const votes =
    pick(o, 'reviewCount', 'review_count', 'reviews_count', 'votes_count') ??
    (typeof rating === 'object' ? pick(rating, 'votes_count', 'count') : undefined);
  const topics = pick(o, 'place_topics', 'placeTopics') ?? {};
  const lat = Number(pick(o, 'latitude', 'lat'));
  const lon = Number(pick(o, 'longitude', 'lon', 'lng'));
  return {
    cid: String(pick(o, 'cid', 'CID') ?? ''),
    title: pick(o, 'title', 'name') ?? 'Unknown business',
    address: pick(o, 'address', 'formatted_address'),
    latitude: lat,
    longitude: lon,
    category: pick(o, 'category', 'primaryCategory'),
    additionalCategories: pick(o, 'additional_categories', 'additionalCategories') ?? [],
    placeTopics: Array.isArray(topics)
      ? Object.fromEntries(topics.map((t: any) => [t.name ?? t, t.weight ?? 1]))
      : topics,
    rating: ratingVal !== undefined ? Number(ratingVal) : undefined,
    reviewCount: votes !== undefined ? Number(votes) : undefined,
    phone: pick(o, 'phone'),
    website: pick(o, 'website', 'url'),
    url: pick(o, 'check_url', 'mapsUrl', 'googleMapsUrl'),
    isServiceArea: !Number.isFinite(lat) || lat === 0 || !pick(o, 'address', 'formatted_address'),
  };
}

const DEFAULT_PROJECT_ID = 'bb80d9a6-61f3-47e4-b118-88bddbd27710';

function getProjectId(): string {
  return process.env.OPENSEO_PROJECT_ID?.trim() || DEFAULT_PROJECT_ID;
}

export async function searchLocalBusinesses(
  query: string,
  near: { latitude: number; longitude: number; radiusKm: number },
): Promise<Biz[]> {
  const projectId = getProjectId();
  const sc: any = await callTool('search_local_businesses', { projectId, near, query });
  const list = pick(sc, 'businesses', 'results', 'items') ?? (Array.isArray(sc) ? sc : []);
  return (list as any[])
    .map(normalizeBiz)
    .filter((b) => Boolean(b.cid))
    .map((b) => {
      // If SAB has no physical coordinates, fall back to the search area coordinates
      if (!Number.isFinite(b.latitude) || b.latitude === 0) {
        return { ...b, latitude: near.latitude, longitude: near.longitude, isServiceArea: true };
      }
      return b;
    });
}

export async function getBusinessProfile(cid: string): Promise<Biz | null> {
  const projectId = getProjectId();
  const sc: any = await callTool('get_business_profile', { projectId, cid });
  const o = pick(sc, 'profile', 'business') ?? sc;
  const b = normalizeBiz(o);
  return b.cid || o ? { ...b, cid: b.cid || cid } : null;
}

/**
 * Live Google Business Profile lookup by exact name near a point. Finds listings that
 * search_local_businesses' index doesn't have (new or less-established profiles), and is cheaper.
 */
export async function getBusinessProfileByName(
  businessName: string,
  near: { latitude: number; longitude: number },
): Promise<Biz | null> {
  const projectId = getProjectId();
  let sc: any;
  try {
    sc = await callTool('get_business_profile', {
      projectId,
      businessName,
      near: { latitude: near.latitude, longitude: near.longitude, radiusKm: 60 },
    });
  } catch {
    return null; // "not found" comes back as a tool error
  }
  const o = pick(sc, 'profile', 'business') ?? sc;
  if (!o || typeof o !== 'object') return null;
  const b = normalizeBiz(o);
  if (!b.cid || b.title === 'Unknown business') return null;
  if (!Number.isFinite(b.latitude) || b.latitude === 0) {
    return { ...b, latitude: near.latitude, longitude: near.longitude, isServiceArea: true };
  }
  return b;
}

const normName = (s: string) =>
  s.toLowerCase().replace(/\b(llc|l\.l\.c|inc|co|corp|ltd)\b\.?/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

/**
 * Last resort: a live Google Maps search for the business name near a point (exactly what a person
 * would do). Only accepts a row whose title matches the name, so it never silently picks a stranger.
 */
export async function findViaMapsSearch(
  businessName: string,
  near: { latitude: number; longitude: number },
): Promise<Biz | null> {
  const projectId = getProjectId();
  let sc: any;
  try {
    sc = await callTool('get_local_serp_results', {
      projectId,
      keyword: businessName.slice(0, 120),
      near: { latitude: near.latitude, longitude: near.longitude, zoom: 10 },
      searchType: 'maps',
      device: 'desktop',
      depth: 20,
    });
  } catch {
    return null;
  }
  const rows: any[] = pick(sc, 'results', 'items', 'rows', 'businesses') ?? (Array.isArray(sc) ? sc : []);
  const want = normName(businessName);
  const match = rows.find((r) => {
    const t = normName(String(r?.title ?? r?.name ?? ''));
    return t && (t === want || t.includes(want) || want.includes(t));
  });
  if (!match) return null;
  const b = normalizeBiz(match);
  if (!b.cid) return null;
  if (!Number.isFinite(b.latitude) || b.latitude === 0) {
    return { ...b, latitude: near.latitude, longitude: near.longitude, isServiceArea: true };
  }
  return b;
}

export interface GridCell {
  row: number;
  col: number;
  latitude: number;
  longitude: number;
  rank: number | null;
  resultsCount?: number;
  topResult?: { title: string; cid: string } | null;
  results?: { title: string; cid: string; rank: number }[];
}
export interface GridResult {
  status: 'ready' | 'processing';
  summary?: {
    pointsSearched: number;
    pointsFound: number;
    averageRank: number | null;
    top3Count: number;
    top10Count: number;
  };
  grid: GridCell[];
  scannedAt?: string;
}

export async function getLocalRankGrid(args: {
  keyword: string;
  center: { latitude: number; longitude: number };
  cid: string;
  name?: string;
  gridSize: 3 | 5;
  spacingKm: number;
}): Promise<GridResult> {
  const projectId = getProjectId();
  const sc: any = await callTool('get_local_rank_grid', {
    projectId,
    keyword: args.keyword,
    center: args.center,
    // cid is the precise match; name is OpenSEO's documented fallback when the cid doesn't match a row.
    target: args.name ? { cid: args.cid, name: args.name.slice(0, 200) } : { cid: args.cid },
    gridSize: args.gridSize,
    spacingKm: args.spacingKm,
    device: 'mobile',
  });
  if (sc?.status === 'processing') return { status: 'processing', grid: [] };
  const grid: GridCell[] = (sc?.grid ?? []).map((c: any) => ({
    row: Number(c.row),
    col: Number(c.col),
    latitude: Number(c.latitude),
    longitude: Number(c.longitude),
    rank: typeof c.rank === 'number' && c.rank > 0 ? c.rank : null,
    resultsCount: c.resultsCount,
    topResult: c.topResult ? { title: c.topResult.title, cid: String(c.topResult.cid) } : null,
    results: Array.isArray(c.results ?? c.topResults ?? c.items)
      ? (c.results ?? c.topResults ?? c.items)
          .map((x: any, i: number) => ({
            title: x.title ?? x.name,
            cid: String(x.cid ?? ''),
            rank: Number(x.rank ?? x.position ?? i + 1),
          }))
          .filter((x: any) => x.cid)
      : undefined,
  }));
  return { status: 'ready', summary: sc?.summary, grid, scannedAt: new Date().toISOString() };
}
