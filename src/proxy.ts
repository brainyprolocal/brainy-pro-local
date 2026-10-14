import { NextRequest, NextResponse } from 'next/server';

/**
 * Private rank-map tool: HTTP Basic Auth + noindex on /rank-map and /api/rank-map.
 * Fails closed (401) if credentials are not configured. Public site is untouched.
 */
export const config = {
  matcher: ['/rank-map', '/rank-map/:path*', '/api/rank-map/:path*'],
};

function unauthorized() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="BrainyPro Rank Map", charset="UTF-8"',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
      'Cache-Control': 'no-store',
    },
  });
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let r = 0;
  for (let i = 0; i < a.length; i++) r |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return r === 0;
}

export function proxy(req: NextRequest) {
  const user = process.env.RANKMAP_USER;
  const pass = process.env.RANKMAP_PASS;
  if (!user || !pass) return unauthorized();

  const auth = req.headers.get('authorization') || '';
  if (!auth.startsWith('Basic ')) return unauthorized();
  let decoded = '';
  try {
    decoded = atob(auth.slice(6));
  } catch {
    return unauthorized();
  }
  const i = decoded.indexOf(':');
  if (i < 0 || !safeEqual(decoded.slice(0, i), user) || !safeEqual(decoded.slice(i + 1), pass)) {
    return unauthorized();
  }

  const res = NextResponse.next();
  res.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  res.headers.set('Cache-Control', 'private, no-store');
  return res;
}
