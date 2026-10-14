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

/** Google's catch-all categories — never useful as keywords or category recommendations. */
const GENERIC = new Set(['service establishment', 'establishment', 'point of interest', 'store', 'business', 'local business', 'corporate office']);
export const isGenericCategory = (cat?: string) => !cat || GENERIC.has(clean(cat));

/** Words that mark a place_topic as review sentiment rather than a searchable service. */
const SENTIMENT = new Set([
  'staff', 'polite', 'friendly', 'professional', 'professionalism', 'courteous', 'kind', 'nice', 'helpful',
  'great', 'good', 'excellent', 'amazing', 'awesome', 'best', 'quality', 'job', 'work', 'team', 'crew', 'owner',
  'price', 'prices', 'pricing', 'cost', 'value', 'affordable', 'reasonable', 'quote', 'estimate',
  'time', 'timely', 'punctual', 'prompt', 'on', 'schedule', 'scheduling', 'flexible', 'communication',
  'responsive', 'recommend', 'experience', 'customer', 'attention', 'detail', 'details', 'honest', 'reliable',
]);

const isServiceTopic = (t: string) => {
  const words = clean(t).split(' ');
  return words.length <= 3 && !words.some((w) => SENTIMENT.has(w));
};

/** Tier 1: chips from primary category, additional categories, and weighted place_topics. */
export function deriveChips(b: Biz, max = 8): string[] {
  const out: string[] = [];
  const add = (s?: string) => {
    if (!s || isGenericCategory(s)) return;
    const k = categoryToKeyword(s);
    if (k && k.length > 2 && !out.includes(k)) out.push(k);
  };
  add(b.category);
  b.additionalCategories.forEach(add);
  Object.entries(b.placeTopics || {})
    .sort((a, z) => Number(z[1]) - Number(a[1]))
    .slice(0, 15)
    .forEach(([t]) => {
      // place_topics mix services ("deck cleaning") with review sentiment ("polite staff"); keep services only.
      if (isServiceTopic(t)) add(t);
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
