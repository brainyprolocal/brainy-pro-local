import 'server-only';

/**
 * Resolves a pasted Google Maps link to the listing's CID (and pin coordinates when present).
 * Works with full links (google.com/maps/place/...), "?cid=" links, and short share links
 * (maps.app.goo.gl/..., goo.gl/maps/..., g.co/kgs/...), which are followed server-side.
 */
export interface MapsLinkInfo {
  cid?: string;
  latitude?: number;
  longitude?: number;
}

const BROWSER_UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

export const looksLikeMapsLink = (q: string) =>
  /(google\.[a-z.]+\/maps|maps\.google\.|maps\.app\.goo\.gl|goo\.gl\/maps|g\.co\/kgs)/i.test(q);

function parse(url: string): MapsLinkInfo {
  let u = url;
  try { u = decodeURIComponent(url); } catch { /* keep raw */ }
  const dec = u.match(/[?&](?:cid|ludocid)=(\d+)/i);
  // Place-ID pair "0x<feature>:0x<cid>" — the second half is the CID in hex.
  const hex = u.match(/0x[0-9a-f]+:0x([0-9a-f]+)/i);
  let cid = dec?.[1];
  if (!cid && hex) {
    try { cid = BigInt('0x' + hex[1]).toString(); } catch { /* ignore */ }
  }
  // Prefer the exact pin (!3d lat !4d lng) over the viewport center (@lat,lng).
  const pin = u.match(/!3d(-?\d+\.\d+)!4d(-?\d+\.\d+)/) || u.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  return {
    cid,
    latitude: pin ? Number(pin[1]) : undefined,
    longitude: pin ? Number(pin[2]) : undefined,
  };
}

export async function resolveMapsLink(input: string): Promise<MapsLinkInfo> {
  const m = input.match(/https?:\/\/\S+/i) || input.match(/\S*(?:maps\.app\.goo\.gl|goo\.gl\/maps|google\.[a-z.]+\/maps)\S*/i);
  if (!m) return {};
  let url = m[0].startsWith('http') ? m[0] : `https://${m[0]}`;

  let info = parse(url);
  if (info.cid) return info;

  // Short/share links: follow redirects to the full place URL.
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': BROWSER_UA, 'Accept-Language': 'en-US,en;q=0.9' },
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    });
    url = res.url || url;
    info = parse(url);
    if (!info.cid) {
      // Some redirects land on an HTML page that embeds the canonical place URL.
      const html = await res.text();
      const embedded =
        html.match(/https:\/\/www\.google\.com\/maps\/place\/[^"'\s\\]+/)?.[0] ||
        html.match(/[?&]cid=\d+/)?.[0] ||
        html.match(/0x[0-9a-f]+:0x[0-9a-f]+/i)?.[0];
      if (embedded) {
        const extra = parse(embedded);
        info = { ...info, ...Object.fromEntries(Object.entries(extra).filter(([, v]) => v !== undefined)) };
      }
    }
  } catch {
    /* network/timeout — fall through with whatever we parsed */
  }
  return info;
}
