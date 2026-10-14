import { NextRequest, NextResponse } from 'next/server';
import { listTools, callTool } from '@/lib/openseo';
import { geocode } from '@/lib/geocode';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const H = { 'X-Robots-Tag': 'noindex, nofollow, noarchive', 'Cache-Control': 'no-store' };

/**
 * Private diagnostics (behind Basic Auth via middleware).
 *   GET /api/rank-map/debug                         → every OpenSEO tool + its input schema
 *   GET /api/rank-map/debug?q=Name&near=City,ST     → raw search_local_businesses output (uses a small credit)
 */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q');
  const near = req.nextUrl.searchParams.get('near') || 'Columbia, MD';
  try {
    if (!q) {
      const tools = await listTools();
      return NextResponse.json(
        tools.map((t: any) => ({ name: t.name, description: t.description, input: t.inputSchema?.properties })),
        { headers: H },
      );
    }
    const g = await geocode(near);
    if (!g) return NextResponse.json({ error: `Couldn't geocode ${near}` }, { status: 400, headers: H });
    const projectId = process.env.OPENSEO_PROJECT_ID?.trim() || 'bb80d9a6-61f3-47e4-b118-88bddbd27710';
    if (req.nextUrl.searchParams.get('mode') === 'profile') {
      const raw = await callTool('get_business_profile', {
        projectId,
        businessName: q,
        near: { latitude: g.latitude, longitude: g.longitude, radiusKm: 60 },
      });
      return NextResponse.json({ near: g, raw }, { headers: H });
    }
    const raw = await callTool('search_local_businesses', {
      projectId,
      query: q,
      near: { latitude: g.latitude, longitude: g.longitude, radiusKm: 50 },
    });
    return NextResponse.json({ near: g, raw }, { headers: H });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message }, { status: 502, headers: H });
  }
}
