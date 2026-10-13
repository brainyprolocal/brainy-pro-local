import 'server-only';
import { cacheGet, cacheSet } from './cache';
import type { Biz } from './openseo';

const STOP = new Set(['service', 'services', 'company', 'contractor', 'business', 'shop', 'store']);

function clean(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9&' -]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Turns "Window cleaning service" -> "window cleaning". */
function categoryToKeyword(cat: string): string {
  const words = clean(cat).split(' ');
  while (words.length > 1 && STOP.has(words[words.length - 1])) words.pop();
  return words.join(' ');
}

/** Tier 1: chips from primary category, additional categories, and weighted place_topics. */
export function deriveChips(b: Biz, max = 8): string[] {
  const out: string[] = [];
  const add = (s?: string) => {
    if (!s) return;
    const k = categoryToKeyword(s);
    if (k && k.length > 2 && !out.includes(k)) out.push(k);
  };
  add(b.category);
  b.additionalCategories.forEach(add);
  Object.entries(b.placeTopics || {})
    .sort((a, z) => Number(z[1]) - Number(a[1]))
    .slice(0, 10)
    .forEach(([t]) => {
      // place_topics are often noisy ("great job"); keep service-like phrases only.
      if (t.split(' ').length <= 3) add(t);
    });
  return out.slice(0, max);
}

/** Tier 2: per-business keyword history (most recent first). */
const histKey = (cid: string) => `rm:hist:${cid}`;

export async function getHistory(cid: string): Promise<string[]> {
  return (await cacheGet<string[]>(histKey(cid))) ?? [];
}

export async function pushHistory(cid: string, keyword: string): Promise<string[]> {
  const k = clean(keyword);
  const next = [k, ...(await getHistory(cid)).filter((x) => x !== k)].slice(0, 20);
  await cacheSet(histKey(cid), next, 60 * 60 * 24 * 365);
  return next;
}

export { clean as normalizeKeyword };
