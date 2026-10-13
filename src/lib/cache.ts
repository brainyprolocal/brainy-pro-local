import 'server-only';

/**
 * Tiny KV cache over the Upstash Redis REST API (Vercel KV / Upstash free tier).
 * Reads KV_REST_API_URL/KV_REST_API_TOKEN (Vercel KV integration) or
 * UPSTASH_REDIS_REST_URL/UPSTASH_REDIS_REST_TOKEN. Falls back to an in-memory
 * Map (per serverless instance) if neither is configured.
 */
const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const DAY = 60 * 60 * 24;

const mem = new Map<string, { v: string; exp: number }>();

async function redis(cmd: (string | number)[]): Promise<any> {
  const res = await fetch(URL_!, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`KV ${res.status}`);
  return (await res.json()).result;
}

export function kvBackend(): 'redis' | 'memory' {
  return URL_ && TOKEN ? 'redis' : 'memory';
}

export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    if (kvBackend() === 'redis') {
      const r = await redis(['GET', key]);
      return r ? (JSON.parse(r) as T) : null;
    }
    const e = mem.get(key);
    if (!e || e.exp < Date.now()) return null;
    return JSON.parse(e.v) as T;
  } catch {
    return null;
  }
}

export async function cacheSet(key: string, value: unknown, ttlSec = DAY): Promise<void> {
  const v = JSON.stringify(value);
  try {
    if (kvBackend() === 'redis') {
      await redis(['SET', key, v, 'EX', ttlSec]);
      return;
    }
    mem.set(key, { v, exp: Date.now() + ttlSec * 1000 });
  } catch {
    /* cache failures are non-fatal */
  }
}

/** Get-or-compute helper. `shouldCache` lets callers skip caching (e.g. "processing"). */
export async function cached<T>(
  key: string,
  fn: () => Promise<T>,
  ttlSec = DAY,
  shouldCache: (v: T) => boolean = () => true,
): Promise<{ value: T; hit: boolean }> {
  const hit = await cacheGet<T>(key);
  if (hit !== null) return { value: hit, hit: true };
  const value = await fn();
  if (shouldCache(value)) await cacheSet(key, value, ttlSec);
  return { value, hit: false };
}
