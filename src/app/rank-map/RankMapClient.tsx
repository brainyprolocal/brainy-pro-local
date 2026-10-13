'use client';

import { useEffect, useRef, useState } from 'react';
import s from './rankmap.module.css';

const MARKETS = [
  { label: 'Columbia, MD', latitude: 39.2037, longitude: -76.861 },
  { label: 'Baltimore, MD', latitude: 39.2904, longitude: -76.6122 },
  { label: 'Rockville, MD', latitude: 39.084, longitude: -77.1528 },
  { label: 'Annapolis, MD', latitude: 38.9784, longitude: -76.4922 },
  { label: 'Frederick, MD', latitude: 39.4143, longitude: -77.4105 },
  { label: 'Salisbury, MD', latitude: 38.3607, longitude: -75.5994 },
  { label: 'Hagerstown, MD', latitude: 39.6418, longitude: -77.72 },
  { label: 'Washington, DC', latitude: 38.9072, longitude: -77.0369 },
  { label: 'Arlington, VA', latitude: 38.8816, longitude: -77.091 },
  { label: 'Fairfax, VA', latitude: 38.8462, longitude: -77.3064 },
  { label: 'Loudoun / Ashburn, VA', latitude: 39.0438, longitude: -77.4874 },
  { label: 'Manassas, VA', latitude: 38.7509, longitude: -77.4753 },
];

/** Continental US bounding box â€” custom coordinates anywhere inside are accepted. */
const inConus = (lat: number, lng: number) => lat >= 24.4 && lat <= 49.5 && lng >= -125 && lng <= -66.9;

type Data = any;

function Stars({ v }: { v?: number }) {
  if (v === undefined || !Number.isFinite(v)) return <span className={s.muted}>No rating</span>;
  const full = Math.round(v);
  return (
    <span>
      <span className={s.stars}>{'â˜…'.repeat(full)}{'â˜†'.repeat(Math.max(0, 5 - full))}</span>{' '}
      <span className={s.muted}>{v.toFixed(1)}</span>
    </span>
  );
}

const tone = (r: number | null) => (!r ? s.n : r <= 3 ? s.g : r <= 10 ? s.a : s.r);

export default function RankMapClient() {
  const [query, setQuery] = useState('');
  const [market, setMarket] = useState(0);
  const [custom, setCustom] = useState('');
  const [grid, setGrid] = useState<3 | 5>(5);
  const [freeKw, setFreeKw] = useState('');
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState<string | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [videoStub, setVideoStub] = useState(false);
  const retry = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (retry.current) clearTimeout(retry.current); }, []);

  function near() {
    if (market === -1) {
      const [a, b] = custom.split(',').map((x) => parseFloat(x.trim()));
      return { latitude: a, longitude: b, radiusKm: 50 };
    }
    const m = MARKETS[market];
    return { latitude: m.latitude, longitude: m.longitude, radiusKm: 50 };
  }

  async function call(payload: any, msg: string) {
    if (retry.current) clearTimeout(retry.current);
    setLoading(msg);
    setError(null);
    setNotFound(null);
    try {
      const res = await fetch('/api/rank-map/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const j = await res.json();
      if (!res.ok) throw new Error(j.error || `Request failed (${res.status})`);
      if (j.notFound) {
        setNotFound(j.query);
        setData(null);
        setLoading(null);
        return;
      }
      setData(j);
      if (j.status === 'processing') {
        setLoading(`Google is being scanned at ${payload.grid === 3 ? 9 : 25} pointsâ€¦ checking back in ~60s (no extra credits).`);
        retry.current = setTimeout(() => call(payload, 'Collecting grid resultsâ€¦'), (j.retryAfterSec || 60) * 1000);
        return;
      }
      setLoading(null);
    } catch (e: any) {
      setError(e.message);
      setLoading(null);
    }
  }

  function resolve(e?: React.FormEvent) {
    e?.preventDefault();
    if (!query.trim()) return;
    const n = near();
    if (!inConus(n.latitude, n.longitude)) {
      setError('Enter coordinates inside the continental US as "lat, lng" â€” e.g. 39.20, -76.86 (copy from Google Maps).');
      return;
    }
    setData(null);
    call({ business: query.trim(), near: near(), grid }, 'Finding that business on Googleâ€¦');
  }

  function runKeyword(kw: string, size = grid) {
    if (!data?.biz || !kw.trim()) return;
    call({ business: data.biz.title, cid: data.biz.cid, keyword: kw.trim(), grid: size }, `Mapping â€œ${kw.trim()}â€ across the areaâ€¦`);
  }

  function switchGrid(n: 3 | 5) {
    setGrid(n);
    if (data?.keyword) runKeyword(data.keyword, n);
  }

  const biz = data?.biz;
  const ready = data?.status === 'ready';
  const size: number = data?.gridSize || grid;
  const sorted = ready ? [...data.cells].sort((a: any, b: any) => a.gr - b.gr || a.gc - b.gc) : [];
  const history: string[] = data?.history || [];
  const chips: string[] = (data?.chips || []).filter((c: string) => !history.includes(c));

  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <div className={s.top}>
          <div className={s.brand}><b>brainy pro</b> Â· Local Rank Map</div>
          <div className={s.private}>Private Â· internal only</div>
        </div>

        <h1 className={s.h1}>Where does <em>{biz?.title || 'your business'}</em> actually show up?</h1>
        <p className={s.sub}>Street-by-street Google Maps pack rankings around the storefront.</p>

        <div className={s.card}>
          <form className={s.search} onSubmit={resolve}>
            <input className={s.input} value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder='Any local business â€” e.g. "Fish Window Cleaning"' />
            <select className={s.select} value={market} onChange={(e) => setMarket(Number(e.target.value))}>
              {MARKETS.map((m, i) => <option key={m.label} value={i}>Near {m.label}</option>)}
              <option value={-1}>Custom lat,lngâ€¦</option>
            </select>
            {market === -1 && (
              <input className={s.input} style={{ maxWidth: 200, minWidth: 160 }} value={custom}
                onChange={(e) => setCustom(e.target.value)} placeholder="39.20, -76.86" />
            )}
            <button className={s.btn} disabled={!!loading && !data}>Find business</button>
          </form>

          {biz && (
            <>
              <div className={s.bizline}>
                <span className={s.bizname}>{biz.title}</span>
                <Stars v={biz.rating} />
                {biz.reviewCount !== undefined && <span className={s.muted}>{biz.reviewCount} reviews</span>}
                {biz.category && <span className={s.cat}>{biz.category}</span>}
                {biz.address && <span className={s.muted}>{biz.address}</span>}
              </div>
              {data.candidates?.length > 1 && !data.keyword && (
                <div className={s.row}>
                  <span className={s.label}>Not it?</span>
                  {data.candidates.slice(1).map((c: any) => (
                    <button key={c.cid} className={s.chip}
                      onClick={() => call({ business: c.title, cid: c.cid, grid }, 'Loading profileâ€¦')}>
                      {c.title}
                    </button>
                  ))}
                </div>
              )}
              {history.length > 0 && (
                <div className={s.row}>
                  <span className={s.label}>Used before</span>
                  {history.map((k) => (
                    <button key={k} className={`${s.chip} ${s.hist} ${data.keyword === k ? s.chipOn : ''}`} onClick={() => runKeyword(k)}>â†º {k}</button>
                  ))}
                </div>
              )}
              <div className={s.row}>
                <span className={s.label}>Keywords</span>
                {chips.map((k) => (
                  <button key={k} className={`${s.chip} ${data.keyword === k ? s.chipOn : ''}`} onClick={() => runKeyword(k)}>{k}</button>
                ))}
                {!chips.length && !history.length && <span className={s.muted}>No categories found â€” type a keyword.</span>}
              </div>
              <form className={s.row} onSubmit={(e) => { e.preventDefault(); runKeyword(freeKw); }}>
                <input className={s.input} style={{ maxWidth: 360 }} value={freeKw} onChange={(e) => setFreeKw(e.target.value)}
                  placeholder='Or any keyword â€” "deck cleaning", "power washing bethesda"' />
                <button className={s.ghost} disabled={!freeKw.trim()}>Map it</button>
                <div className={s.toggle} style={{ marginLeft: 'auto' }}>
                  <button type="button" className={grid === 5 ? s.on : ''} onClick={() => switchGrid(5)}>5Ã—5 Â· 5 km</button>
                  <button type="button" className={grid === 3 ? s.on : ''} onClick={() => switchGrid(3)}>3Ã—3 Â· 2 km</button>
                </div>
              </form>
            </>
          )}
        </div>

        {notFound !== null && (
          <div className={s.notice}>
            We couldn&apos;t find that business on Google â€” try the exact name, or confirm it has a Google Business Profile.
            <div className={s.muted} style={{ marginTop: 6 }}>Searched â€œ{notFound}â€ near {market === -1 ? custom : MARKETS[market].label}.</div>
          </div>
        )}
        {error && <div className={`${s.notice} ${s.err}`}>{error}</div>}
        {loading && <div className={s.notice}><div className={s.loader}><div className={s.spin} />{loading}</div></div>}

        {ready && (
          <>
            <div className={s.stats}>
              <div className={`${s.card} ${s.stat}`}>
                <div className={s.statv}>{data.summary.averageRank != null ? Number(data.summary.averageRank).toFixed(1) : 'â€”'}</div>
                <div className={s.statl}>Avg rank</div>
              </div>
              <div className={`${s.card} ${s.stat}`}>
                <div className={s.statv}>{data.summary.pointsFound}/{data.summary.pointsSearched}</div>
                <div className={s.statl}>Points ranked</div>
              </div>
              <div className={`${s.card} ${s.stat}`}>
                <div className={s.statv} style={{ color: '#7cf0c5' }}>{data.summary.top3Count}</div>
                <div className={s.statl}>Top-3 spots</div>
              </div>
              <div className={`${s.card} ${s.stat}`}>
                <div className={s.statv} style={{ color: '#ffd27a' }}>{data.summary.top10Count}</div>
                <div className={s.statl}>Top-10 spots</div>
              </div>
            </div>

            <div className={s.main}>
              <div className={`${s.card} ${s.gridcard}`}>
                <div className={s.storyk}>â€œ{data.keyword}â€ Â· mobile Â· {size}Ã—{size} @ {data.spacingKm} km
                  {data.cacheHits?.includes('grid') && <span className={s.muted}> Â· cached</span>}
                </div>
                <div className={s.compass}><span style={{ top: 3, color: '#fff' }}>N</span><span style={{ right: 5 }}>E</span><span style={{ bottom: 3 }}>S</span><span style={{ left: 5 }}>W</span></div>
                <div className={s.grid} style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                  {sorted.map((c: any) => (
                    <div key={`${c.gr}-${c.gc}`} className={s.cell}
                      title={c.topResult ? `#1 here: ${c.topResult.title}` : undefined}>
                      <div className={`${s.bubble} ${tone(c.rank)}`}>
                        {c.rank ?? 'â€“'}
                        {c.isCenter && <span className={s.star}>â˜…</span>}
                      </div>
                      <div className={s.town}>{c.label}</div>
                    </div>
                  ))}
                </div>
                <div className={s.legend}>
                  <span><i className={`${s.dot} ${s.g}`} />Top 3</span>
                  <span><i className={`${s.dot} ${s.a}`} />4â€“10</span>
                  <span><i className={`${s.dot} ${s.r}`} />11+</span>
                  <span><i className={`${s.dot} ${s.n}`} />Not ranked</span>
                  <span><span style={{ color: '#ffcf5c' }}>â˜…</span> Storefront</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div className={s.card}>
                  <div className={s.storyk}>The story</div>
                  <p className={s.story} style={{ margin: 0 }}>{data.story}</p>
                  <button className={s.ghost} style={{ marginTop: 14 }} onClick={() => setVideoStub(true)}>â— Save a client walkthrough video</button>
                </div>

                <div className={s.card}>
                  <div className={s.storyk}>Competitive field</div>
                  <div className={s.comps}>
                    <div className={`${s.comp} ${s.you}`}>
                      <div>
                        <div><b>You</b> Â· {biz.title}</div>
                        <div className={s.muted}><Stars v={biz.rating} /> {biz.reviewCount !== undefined && `Â· ${biz.reviewCount} reviews`}</div>
                      </div>
                      <span className={s.badge}>{data.you.wins ? `â˜… #1 ${data.you.region} (${data.you.wins})` : 'No #1 spots'}</span>
                    </div>
                    {data.competitors.map((c: any) => (
                      <button key={c.cid} className={s.comp} onClick={() => setProfile(c)}>
                        <div>
                          <div><b>{c.title}</b></div>
                          <div className={s.muted}><Stars v={c.rating} /> {c.reviewCount !== undefined && `Â· ${c.reviewCount} reviews`}</div>
                          <div className={s.cats}>
                            {[c.category, ...(c.additionalCategories || [])].filter(Boolean).slice(0, 3).map((k: string) => <span key={k} className={s.cat}>{k}</span>)}
                          </div>
                        </div>
                        <span className={s.badge}>â˜… #1 {c.region} ({c.wins})</span>
                      </button>
                    ))}
                    {!data.competitors.length && <div className={s.muted}>Nobody else holds #1 anywhere on this grid.</div>}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {profile && (
        <div className={s.modalBg} onClick={() => setProfile(null)}>
          <div className={`${s.card} ${s.modal}`} onClick={(e) => e.stopPropagation()}>
            <div className={s.storyk}>Competitor profile</div>
            <div className={s.bizname}>{profile.title}</div>
            <div style={{ margin: '8px 0' }}><Stars v={profile.rating} /> {profile.reviewCount !== undefined && <span className={s.muted}>Â· {profile.reviewCount} reviews</span>}</div>
            <div className={s.cats}>{[profile.category, ...(profile.additionalCategories || [])].filter(Boolean).map((k: string) => <span key={k} className={s.cat}>{k}</span>)}</div>
            {profile.address && <p className={s.muted}>{profile.address}</p>}
            {profile.phone && <p className={s.muted}>{profile.phone}</p>}
            <p className={s.muted}>Holds #1 at {profile.wins} point{profile.wins > 1 ? 's' : ''} â€” {profile.region}.</p>
            <div className={s.row}>
              {profile.website && <a className={s.ghost} href={profile.website} target="_blank" rel="noreferrer noopener">Website â†—</a>}
              <a className={s.ghost} href={profile.url || `https://maps.google.com/?cid=${profile.cid}`} target="_blank" rel="noreferrer noopener">Google Maps â†—</a>
              <button className={s.ghost} onClick={() => setProfile(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {videoStub && (
        <div className={s.modalBg} onClick={() => setVideoStub(false)}>
          <div className={`${s.card} ${s.modal}`} onClick={(e) => e.stopPropagation()}>
            <div className={s.storyk}>Client walkthrough video</div>
            <p className={s.story}>Recording is coming in a later version. For now, screen-record this page while you walk the client through the story.</p>
            <button className={s.ghost} onClick={() => setVideoStub(false)}>Got it</button>
          </div>
        </div>
      )}
    </div>
  );
}
