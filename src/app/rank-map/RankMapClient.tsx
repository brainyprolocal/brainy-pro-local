'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import s from './rankmap.module.css';

const RankMapLeaflet = dynamic(() => import('./RankMapLeaflet'), { ssr: false });

/** Quick picks (MD + Northern VA). Any US address, city, or ZIP can be typed instead. */
const QUICK = [
  'Columbia, MD', 'Baltimore, MD', 'Rockville, MD', 'Bethesda, MD', 'Annapolis, MD', 'Frederick, MD',
  'Salisbury, MD', 'Hagerstown, MD', 'Washington, DC', 'Arlington, VA', 'Fairfax, VA', 'Ashburn, VA', 'Manassas, VA',
];
const SPACINGS = [0.5, 1, 2, 3, 5, 8];
const DEFAULT_SPACING: Record<number, number> = { 3: 2, 5: 5, 7: 3 };

type Data = any;

function getDisplayArea(biz: any, searchedNear?: string): string {
  if (biz?.address) {
    const parts = biz.address.split(',').map((p: string) => p.trim()).filter(Boolean);
    if (/^(usa|us|united states)$/i.test(parts[parts.length - 1] || '')) parts.pop();
    if (parts.length >= 2) {
      const city = parts[parts.length - 2];
      const state = parts[parts.length - 1].split(' ')[0];
      return `${city}, ${state}`;
    }
  }
  if (searchedNear) return searchedNear.split(',')[0].trim();
  return 'your target service area';
}

function Stars({ v }: { v?: number }) {
  if (v === undefined || !Number.isFinite(v)) return <span className={s.muted}>No rating</span>;
  const full = Math.round(v);
  return (
    <span>
      <span className={s.stars}>{'★'.repeat(full)}{'☆'.repeat(Math.max(0, 5 - full))}</span>{' '}
      <span className={s.muted}>{v.toFixed(1)}</span>
    </span>
  );
}

const tone = (r: number | null) => (!r ? s.n : r <= 3 ? s.g : r <= 10 ? s.a : s.r);

export default function RankMapClient() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('Columbia, MD');
  const [grid, setGrid] = useState<number>(5);
  const [spacing, setSpacing] = useState<number>(5);
  const [centerAddress, setCenterAddress] = useState('');
  const [freeKw, setFreeKw] = useState('');
  const [view, setView] = useState<'map' | 'grid'>('map');
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState<{ q: string; near?: string } | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const retry = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seq = useRef(0);
  const MAX_POLLS = 10; // ~10 minutes of "processing" before we give up

  useEffect(() => () => { if (retry.current) clearTimeout(retry.current); }, []);

  async function call(payload: any, msg: string, attempt = 0) {
    if (retry.current) clearTimeout(retry.current);
    const mine = ++seq.current; // only the latest request may update the screen
    setLoading(msg);
    setError(null);
    setNotFound(null);
    try {
      const res = await fetch('/api/rank-map/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      let j: any;
      try {
        j = JSON.parse(text);
      } catch {
        if (mine !== seq.current) return;
        throw new Error(
          res.status === 504 || /timed? ?out|FUNCTION_INVOCATION_TIMEOUT|An error occurred/i.test(text)
            ? 'That lookup took too long. Please try again — anything already found is saved, so the retry is faster.'
            : `Something went wrong on the server (${res.status}). Please try again.`,
        );
      }
      if (mine !== seq.current) return;
      if (!res.ok) throw new Error(j.error || `Request failed (${res.status})`);
      if (j.notFound) {
        setNotFound({ q: j.query, near: j.searchedNear });
        setData(null);
        setLoading(null);
        return;
      }
      setData(j);
      if (j.status === 'processing') {
        if (attempt >= MAX_POLLS) {
          setLoading(null);
          setError('Google is taking unusually long to scan this grid. Try the same keyword again in a few minutes — it will not cost extra credits.');
          return;
        }
        const pts = (payload.grid || 5) ** 2;
        setLoading(`Google is being scanned at ${pts} points… checking back in ~60s (no extra credits).`);
        retry.current = setTimeout(() => call(payload, 'Collecting grid results…', attempt + 1), (j.retryAfterSec || 60) * 1000);
        return;
      }
      setLoading(null);
    } catch (e: any) {
      if (mine !== seq.current) return;
      setError(e.message);
      setLoading(null);
    }
  }

  function resolve(e?: React.FormEvent) {
    e?.preventDefault();
    if (!query.trim()) return;
    if (!location.trim()) return setError('Enter an address, city, or ZIP to search near.');
    setData(null);
    call({ business: query.trim(), location: location.trim() }, 'Finding that business on Google…');
  }

  function runKeyword(kw: string, fresh = false) {
    if (!data?.biz || !kw.trim()) return;
    call(
      { business: data.biz.title, cid: data.biz.cid, location: location.trim(), keyword: kw.trim(), grid, spacingKm: spacing, centerAddress: centerAddress.trim(), fresh },
      fresh ? `Running a fresh scan of “${kw.trim()}”…` : `Mapping “${kw.trim()}” across ${grid * grid} points…`,
    );
  }

  function pickGrid(n: number) {
    setGrid(n);
    setSpacing(DEFAULT_SPACING[n]);
  }

  const biz = data?.biz;
  const ready = data?.status === 'ready';
  const size: number = data?.gridSize || grid;
  const sorted = ready ? [...data.cells].sort((a: any, b: any) => a.gr - b.gr || a.gc - b.gc) : [];
  const history: string[] = data?.history || [];
  const chips: string[] = (data?.chips || []).filter((c: string) => !history.includes(c));
  const m = data?.summary;
  const settingsChanged =
    ready && (data.gridSize !== grid || data.spacingKm !== spacing || (data.center?.isStorefront ? '' : 'x') !== (centerAddress.trim() ? 'x' : ''));

  return (
    <div className={s.root}>
      <div className={s.wrap}>
        <header className={`${s.top} ${s.noPrint}`}>
          <div className={s.brandGroup}>
            <Link href="/" className={s.logoLink} title="brainy pro local home">
              <div className={s.logoBox}>
                <img src="/brand/logo-icon-blue.svg" alt="brainy pro logo icon" className={s.logoImg} />
              </div>
              <span className={s.brandText}>brainy pro</span>
            </Link>
            <span className={s.brandDivider}>/</span>
            <span className={s.toolTag}>Local Rank Map</span>
          </div>

          <div className={s.topRight}>
            <Link href="/" className={s.siteLink}>
              <span>Main Website</span>
              <span style={{ fontSize: 11 }}>↗</span>
            </Link>
            {data?.cacheBackend && (
              <div className={s.privateBadge} title={data.cacheBackend === 'redis'
                ? 'Scans are saved for 24h — repeat views are free.'
                : 'No Upstash/KV connected — repeat views may cost credits and keyword history may reset.'}>
                <span className={s.beacon} style={data.cacheBackend === 'redis' ? undefined : { background: '#f0a623', boxShadow: '0 0 8px #f0a623' }} />
                <span>Cache {data.cacheBackend === 'redis' ? 'on' : 'off'}</span>
              </div>
            )}
            <div className={s.privateBadge}>
              <span className={s.beacon} />
              <span>Agency Internal</span>
            </div>
          </div>
        </header>

        {/* Print-only cover line */}
        <div className={s.printOnly}>
          <div className={s.printCover}>
            <img src="/brand/logo-full-blue.svg" alt="brainy pro" className={s.printLogo} />
            <div className={s.printMeta}>
              <div>Local Visibility Report{biz?.title ? <> · Prepared for <b>{biz.title}</b></> : null}</div>
              <div>Prepared by BrainyPro · {new Date(data?.scannedAt || Date.now()).toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' })}</div>
            </div>
          </div>
        </div>

        <div className={s.heroSection}>
          <div className={`${s.eyebrow} ${s.noPrint}`}>
            <span className={s.radarDot} />
            <span>Local SEO Intelligence & Visibility Map</span>
          </div>

          <h1 className={s.h1}>
            Where does <span className={s.h1Highlight}>{biz?.title || 'your business'}</span> actually show up?
          </h1>
          <p className={s.sub}>
            {ready
              ? <>Google Maps 3-Pack rankings for “<strong style={{ color: '#fff' }}>{data.keyword}</strong>” · mobile · {size}×{size} grid @ {data.spacingKm} km · centered on {data.center.label}</>
              : 'Street-by-street Google Maps pack rankings around the storefront.'}
          </p>
        </div>

        <div className={`${s.card} ${s.noPrint}`}>
          <form className={s.search} onSubmit={resolve}>
            <input className={s.input} value={query} onChange={(e) => setQuery(e.target.value)}
              placeholder='Business name — or paste its Google Maps link' />
            <input className={s.input} style={{ maxWidth: 300 }} list="rm-quick" value={location}
              onChange={(e) => setLocation(e.target.value)} placeholder="Near: address, city, or ZIP" />
            <datalist id="rm-quick">{QUICK.map((q) => <option key={q} value={q} />)}</datalist>
            <button className={s.btn} disabled={!!loading && !data}>Find business</button>
          </form>

          {biz && (
            <>
              <div className={s.bizline}>
                <span className={s.bizname}>{biz.title}</span>
                <Stars v={biz.rating} />
                {biz.reviewCount !== undefined && <span className={s.muted}>{biz.reviewCount} reviews</span>}
                {biz.category && <span className={s.cat}>{biz.category}</span>}
                {biz.isServiceArea && <span className={s.cat} style={{ borderColor: '#7aa8ff', color: '#7aa8ff' }}>Service Area Business</span>}
                {biz.address ? <span className={s.muted}>{biz.address}</span> : <span className={s.muted}>Address hidden (SAB)</span>}
              </div>
              {data.candidates?.length > 1 && !data.keyword && (
                <div className={s.row}>
                  <span className={s.label}>Not it?</span>
                  {data.candidates.slice(1).map((c: any) => (
                    <button key={c.cid} className={s.chip}
                      onClick={() => call({ business: c.title, cid: c.cid, location: location.trim() }, 'Loading profile…')}>
                      {c.title}
                    </button>
                  ))}
                </div>
              )}

              <div className={s.row}>
                <span className={s.label}>Scan</span>
                <div className={s.toggle}>
                  {[3, 5].map((n) => (
                    <button key={n} type="button" className={grid === n ? s.on : ''} onClick={() => pickGrid(n)}>{n}×{n}</button>
                  ))}
                </div>
                <select className={s.select} style={{ padding: '7px 10px' }} value={spacing} onChange={(e) => setSpacing(Number(e.target.value))}>
                  {SPACINGS.map((k) => <option key={k} value={k}>{k} km apart</option>)}
                </select>
                <span className={s.muted}>covers ~{((grid - 1) * spacing).toFixed(1)} km across · {grid * grid} points</span>
                <input className={s.input} style={{ maxWidth: 320, padding: '8px 12px', fontSize: 13 }} value={centerAddress}
                  onChange={(e) => setCenterAddress(e.target.value)} placeholder="Center on address (optional — default: storefront)" />
                {settingsChanged && <button className={s.ghost} onClick={() => runKeyword(data.keyword)}>Re-run scan ↻</button>}
              </div>

              {history.length > 0 && (
                <div className={s.row}>
                  <span className={s.label}>Used before</span>
                  {history.map((k) => (
                    <button key={k} className={`${s.chip} ${s.hist} ${data.keyword === k ? s.chipOn : ''}`} onClick={() => runKeyword(k)}>↺ {k}</button>
                  ))}
                </div>
              )}
              <div className={s.row}>
                <span className={s.label}>Keywords</span>
                {chips.map((k) => (
                  <button key={k} className={`${s.chip} ${data.keyword === k ? s.chipOn : ''}`} onClick={() => runKeyword(k)}>{k}</button>
                ))}
                {!chips.length && !history.length && <span className={s.muted}>No categories found — type a keyword.</span>}
              </div>
              <form className={s.row} onSubmit={(e) => { e.preventDefault(); runKeyword(freeKw); }}>
                <input className={s.input} style={{ maxWidth: 380 }} value={freeKw} onChange={(e) => setFreeKw(e.target.value)}
                  placeholder='Or any keyword — "deck cleaning", "power washing bethesda"' />
                <button className={s.ghost} disabled={!freeKw.trim()}>Map it</button>
              </form>
            </>
          )}
        </div>

        {notFound && (
          <div className={s.notice}>
            We couldn&apos;t find that business on Google — try the exact name, or confirm it has a Google Business Profile.
            <div style={{ marginTop: 8 }}>
              <b>Sure it&apos;s listed?</b> Open the business on Google Maps, tap <b>Share → Copy link</b>, and paste that link into the business box. That finds the exact listing every time.
            </div>
            <div className={s.muted} style={{ marginTop: 6 }}>Searched “{notFound.q}”{notFound.near ? ` near ${notFound.near}` : ''}.</div>
          </div>
        )}
        {error && <div className={`${s.notice} ${s.err}`}>{error}</div>}
        {loading && <div className={`${s.notice} ${s.noPrint}`}><div className={s.loader}><div className={s.spin} />{loading}</div></div>}

        {ready && (
          <>
            <div className={s.stats}>
              {[
                { v: m.arp ?? '—', l: 'Avg rank (ARP)', t: 'Average position where the business appears' },
                { v: m.atrp ?? '—', l: 'Avg total rank (ATRP)', t: 'Average over all points; not-in-pack counts as 21' },
                { v: `${m.solv}%`, l: 'Share of local voice', t: 'Share of points where the business is top 3', c: '#7cf0c5' },
                { v: `${m.pointsFound}/${m.pointsSearched}`, l: 'Points ranked' },
                { v: m.top3Count, l: 'Top-3 spots', c: '#7cf0c5' },
                { v: m.top10Count, l: 'Top-10 spots', c: '#ffd27a' },
              ].map((x) => (
                <div key={x.l} className={`${s.card} ${s.stat}`} title={x.t}>
                  <div className={s.statv} style={x.c ? { color: x.c } : undefined}>{x.v}</div>
                  <div className={s.statl}>{x.l}</div>
                </div>
              ))}
            </div>

            <div className={s.main}>
              <div className={`${s.card} ${s.gridcard}`}>
                <div className={s.row} style={{ marginTop: 0, justifyContent: 'space-between' }}>
                  <div className={s.storyk} style={{ margin: 0 }}>
                    “{data.keyword}” · {size}×{size} @ {data.spacingKm} km
                    {data.scannedAt && <span className={s.muted}> · scanned {new Date(data.scannedAt).toLocaleString([], { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}</span>}
                    {data.cacheHits?.includes('grid') && <span className={`${s.muted} ${s.noPrint}`}> · cached (no credits)</span>}
                    {data.cacheHits?.includes('grid') && (
                      <button type="button" className={`${s.linkBtn} ${s.noPrint}`} onClick={() => runKeyword(data.keyword, true)}
                        title="Run a brand-new scan now (uses credits)">↻ Rescan now</button>
                    )}
                  </div>
                  <div className={`${s.toggle} ${s.noPrint}`}>
                    <button type="button" className={view === 'map' ? s.on : ''} onClick={() => setView('map')}>Map</button>
                    <button type="button" className={view === 'grid' ? s.on : ''} onClick={() => setView('grid')}>Grid</button>
                  </div>
                </div>

                {view === 'map' ? (
                  <RankMapLeaflet cells={data.cells} storefront={data.storefront} />
                ) : (
                  <div style={{ position: 'relative' }}>
                    <div className={s.compass}><span style={{ top: 3, color: '#fff' }}>N</span><span style={{ right: 5 }}>E</span><span style={{ bottom: 3 }}>S</span><span style={{ left: 5 }}>W</span></div>
                    <div className={s.grid} style={{ gridTemplateColumns: `repeat(${size}, 1fr)`, maxWidth: 560 }}>
                      {sorted.map((c: any) => (
                        <div key={`${c.gr}-${c.gc}`} className={s.cell} title={c.topResult ? `#1 here: ${c.topResult.title}` : undefined}>
                          <div className={`${s.bubble} ${tone(c.rank)}`}>
                            {c.rank ?? '–'}
                            {c.isStore && <span className={s.star}>★</span>}
                          </div>
                          <div className={s.town}>{c.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className={s.legend}>
                  <span><i className={`${s.dot} ${s.g}`} />Top 3</span>
                  <span><i className={`${s.dot} ${s.a}`} />4–10</span>
                  <span><i className={`${s.dot} ${s.r}`} />11+</span>
                  <span><i className={`${s.dot} ${s.n}`} />Not ranked</span>
                  {data.storefront && <span><span style={{ color: '#ffcf5c' }}>★</span> Storefront</span>}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div className={s.card}>
                  <div className={s.storyk}>The story</div>
                  <p className={s.story} style={{ margin: 0 }}>{data.story}</p>
                  <div className={`${s.row} ${s.noPrint}`}>
                    <button className={s.ghost} onClick={() => window.print()}>⤓ Client report (PDF)</button>
                  </div>
                </div>

                <div className={s.card}>
                  <div className={s.storyk}>Competitive field</div>
                  <div className={s.comps}>
                    <div className={`${s.comp} ${s.you}`}>
                      <div>
                        <div><b>You</b> · {biz.title}</div>
                        <div className={s.muted}><Stars v={biz.rating} /> {biz.reviewCount !== undefined && `· ${biz.reviewCount} reviews`}</div>
                      </div>
                      <span className={s.badge}>{data.you.wins ? `★ #1 ${data.you.region} (${data.you.wins})` : 'No #1 spots'}</span>
                    </div>
                    {data.competitors.filter((c: any) => c.wins > 0).map((c: any) => (
                      <button key={c.cid} className={s.comp} onClick={() => setProfile(c)}>
                        <div>
                          <div><b>{c.title}</b></div>
                          <div className={s.muted}><Stars v={c.rating} /> {c.reviewCount !== undefined && `· ${c.reviewCount} reviews`}</div>
                          <div className={s.cats}>
                            {[c.category, ...(c.additionalCategories || [])].filter(Boolean).slice(0, 3).map((k: string) => <span key={k} className={s.cat}>{k}</span>)}
                          </div>
                        </div>
                        <span className={s.badge}>★ #1 {c.region} ({c.wins})</span>
                      </button>
                    ))}
                    {!data.competitors.some((c: any) => c.wins > 0) && <div className={s.muted}>Nobody else holds #1 anywhere on this grid.</div>}
                  </div>
                </div>
              </div>
            </div>

            <div className={s.card} style={{ marginTop: 18 }}>
              <div className={s.storyk}>Competitor share across the grid</div>
              <table className={s.table}>
                <thead>
                  <tr>
                    <th>Business</th>
                    <th>Rating</th>
                    <th>Reviews</th>
                    <th>#1 spots</th>
                    {data.hasFullResults && <><th>Top-3 spots</th><th>SoLV</th><th>ATRP</th></>}
                  </tr>
                </thead>
                <tbody>
                  <tr className={s.youRow}>
                    <td><b>{biz.title}</b> <span className={s.muted}>(you)</span></td>
                    <td>{biz.rating?.toFixed(1) ?? '—'}</td>
                    <td>{biz.reviewCount ?? '—'}</td>
                    <td>{data.you.wins}</td>
                    {data.hasFullResults && <><td>{data.you.top3}</td><td>{data.you.solv}%</td><td>{data.you.atrp}</td></>}
                  </tr>
                  {data.competitors.map((c: any) => (
                    <tr key={c.cid} onClick={() => setProfile(c)} style={{ cursor: 'pointer' }}>
                      <td>{c.title}</td>
                      <td>{c.rating?.toFixed(1) ?? '—'}</td>
                      <td>{c.reviewCount ?? '—'}</td>
                      <td>{c.wins}</td>
                      {data.hasFullResults && <><td>{c.top3}</td><td>{c.solv}%</td><td>{c.atrp}</td></>}
                    </tr>
                  ))}
                </tbody>
              </table>
              {!data.hasFullResults && (
                <div className={s.muted} style={{ marginTop: 8 }}>Competitor share is measured by #1 positions held across the scan grid.</div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18, marginTop: 18 }}>
              {/* Category Gap Card */}
              <div className={s.card}>
                <div className={s.storyk}>Google Category Gap Analysis</div>
                <div style={{ fontSize: 13, color: '#9aa5c6', marginBottom: 12 }}>
                  Secondary categories are the #1 quick-win ranking signal on Google Maps. Here is how your profile compares to top competitors:
                </div>

                <div style={{ marginBottom: 14 }}>
                  <div className={s.label} style={{ marginBottom: 6 }}>Your Current Categories</div>
                  <div className={s.cats}>
                    {data.categoryAudit?.yourCategories?.map((c: string) => (
                      <span key={c} className={s.cat} style={{ borderColor: '#7cf0c5', color: '#7cf0c5' }}>✓ {c}</span>
                    ))}
                  </div>
                </div>

                <div>
                  <div className={s.label} style={{ marginBottom: 6 }}>Categories Used by Competitors (Opportunities)</div>
                  {data.categoryAudit?.missingCategories?.length ? (
                    <div className={s.cats}>
                      {data.categoryAudit.missingCategories.map((item: any) => (
                        <span key={item.category} className={s.cat} style={{ borderColor: '#ffd27a', color: '#ffd27a' }}>
                          + {item.category} <span style={{ opacity: 0.7, fontSize: 10 }}>({item.competitorCount} rivals)</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className={s.muted}>You cover all categories used by top rivals in this scan!</div>
                  )}
                </div>
              </div>

              {/* Review Topics & Customer Sentiment Card */}
              <div className={s.card}>
                <div className={s.storyk}>Review Topics & Customer Signals</div>
                <div style={{ fontSize: 13, color: '#9aa5c6', marginBottom: 12 }}>
                  Keywords frequently cited by Google algorithms from customer reviews:
                </div>

                {biz.placeTopics && Object.keys(biz.placeTopics).length > 0 ? (
                  <div>
                    <div className={s.label} style={{ marginBottom: 6 }}>Your Top Review Mentions</div>
                    <div className={s.cats}>
                      {Object.entries(biz.placeTopics)
                        .sort((a: any, b: any) => Number(b[1]) - Number(a[1]))
                        .slice(0, 10)
                        .map(([topic, weight]) => (
                          <span key={topic} className={s.cat} style={{ background: 'rgba(91,124,255,0.1)', borderColor: '#5b7cff', color: '#cfd6ea' }}>
                            {topic} <span style={{ color: '#7cf0c5', fontWeight: 600 }}>({String(weight)})</span>
                          </span>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div className={s.muted}>No prominent place topics extracted from current reviews.</div>
                )}

                {data.competitors?.[0]?.placeTopics && Object.keys(data.competitors[0].placeTopics).length > 0 && (
                  <div style={{ marginTop: 14 }}>
                    <div className={s.label} style={{ marginBottom: 6 }}>Top Rival Review Mentions ({data.competitors[0].title})</div>
                    <div className={s.cats}>
                      {Object.entries(data.competitors[0].placeTopics)
                        .sort((a: any, b: any) => Number(b[1]) - Number(a[1]))
                        .slice(0, 8)
                        .map(([topic, weight]) => (
                          <span key={topic} className={s.cat} style={{ background: 'rgba(255,255,255,0.03)' }}>
                            {topic} <span style={{ opacity: 0.6, fontSize: 10 }}>({String(weight)})</span>
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Local Link & Authority Roadmap Card */}
            <div className={s.card} style={{ marginTop: 18 }}>
              <div className={s.storyk}>Local Link & Authority Roadmap</div>
              <div style={{ fontSize: 13, color: '#9aa5c6', marginBottom: 14 }}>
                Google uses local link signals to determine prominence across neighboring grid zones. High-impact authority targets tailored for {getDisplayArea(biz, data.searchedNear)}:
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2240', borderRadius: 12, padding: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <b style={{ color: '#fff', fontSize: 14 }}>Chamber of Commerce & Rotary</b>
                    <span className={s.cat} style={{ borderColor: '#7cf0c5', color: '#7cf0c5' }}>High Geo-Trust</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#8f9abb', lineHeight: 1.5 }}>
                    Target membership listing in the {getDisplayArea(biz, data.searchedNear).split(',')[0]} Chamber of Commerce or County Trade Board. Establishes official municipal entity verification.
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2240', borderRadius: 12, padding: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <b style={{ color: '#fff', fontSize: 14 }}>Youth Sports & Community 5Ks</b>
                    <span className={s.cat} style={{ borderColor: '#5b7cff', color: '#7aa8ff' }}>Local .org Links</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#8f9abb', lineHeight: 1.5 }}>
                    Sponsor local youth soccer/baseball leagues or high school booster clubs. Delivers rare, hyper-local .org/.edu community links competitors can&apos;t automate.
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2240', borderRadius: 12, padding: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <b style={{ color: '#fff', fontSize: 14 }}>Equipment / Supplier Locators</b>
                    <span className={s.cat} style={{ borderColor: '#ffd27a', color: '#ffd27a' }}>Industry Authority</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#8f9abb', lineHeight: 1.5 }}>
                    Obtain authorized contractor / certified applicator listings on equipment manufacturer dealer locators. Boosts industry category relevance in Google&apos;s knowledge graph.
                  </div>
                </div>

                <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid #1a2240', borderRadius: 12, padding: 14 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <b style={{ color: '#fff', fontSize: 14 }}>Regional Trade & BNI Chapters</b>
                    <span className={s.cat} style={{ borderColor: '#cfd6ea', color: '#cfd6ea' }}>NAP Anchor</span>
                  </div>
                  <div style={{ fontSize: 12, color: '#8f9abb', lineHeight: 1.5 }}>
                    Regional Better Business Bureau (BBB) profile, Home Service Guilds, and local business networking chapters to solidify local citation consistency.
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 14, padding: '10px 14px', borderRadius: 10, background: 'rgba(124,240,197,0.05)', border: '1px solid rgba(124,240,197,0.15)', fontSize: 12, color: '#7cf0c5' }}>
                💡 <b>Strategy:</b> Securing 2–3 hyper-local links from organizations physically based in your red and yellow grid zones is the single most effective way to expand your top-3 ranking radius outward.
              </div>
            </div>

            {/* Print-only closing section */}
            <div className={`${s.printOnly} ${s.card}`} style={{ marginTop: 18 }}>
              <div className={s.storyk}>Next steps with BrainyPro</div>
              <p className={s.story} style={{ margin: '0 0 8px' }}>
                Want to turn the amber and red zones on this map green? We&apos;ll walk you through a prioritized plan —
                categories, reviews, and local links — built around the gaps in this report.
              </p>
              <p style={{ margin: 0, fontSize: 14 }}>
                <b>hello@brainyprolocal.com</b> · brainyprolocal.com
              </p>
            </div>
          </>
        )}
      </div>

      {profile && (
        <div className={s.modalBg} onClick={() => setProfile(null)}>
          <div className={`${s.card} ${s.modal}`} onClick={(e) => e.stopPropagation()}>
            <div className={s.storyk}>Competitor profile</div>
            <div className={s.bizname}>{profile.title}</div>
            <div style={{ margin: '8px 0' }}><Stars v={profile.rating} /> {profile.reviewCount !== undefined && <span className={s.muted}>· {profile.reviewCount} reviews</span>}</div>
            <div className={s.cats}>{[profile.category, ...(profile.additionalCategories || [])].filter(Boolean).map((k: string) => <span key={k} className={s.cat}>{k}</span>)}</div>
            {profile.address && <p className={s.muted}>{profile.address}</p>}
            {profile.phone && <p className={s.muted}>{profile.phone}</p>}
            <p className={s.muted}>
              {profile.wins ? `Holds #1 at ${profile.wins} point${profile.wins > 1 ? 's' : ''} — ${profile.region}.` : 'No #1 spots on this grid.'}
              {profile.top3 != null && ` Top 3 at ${profile.top3} points (ATRP ${profile.atrp}).`}
            </p>
            {profile.placeTopics && Object.keys(profile.placeTopics).length > 0 && (
              <div style={{ margin: '10px 0' }}>
                <div className={s.label} style={{ marginBottom: 4 }}>Top Review Mentions</div>
                <div className={s.cats}>
                  {Object.entries(profile.placeTopics).slice(0, 8).map(([topic, weight]) => (
                    <span key={topic} className={s.cat}>{topic} ({String(weight)})</span>
                  ))}
                </div>
              </div>
            )}
            <div className={s.row}>
              {profile.website && <a className={s.ghost} href={profile.website} target="_blank" rel="noreferrer noopener">Website ↗</a>}
              <a className={s.ghost} href={profile.url || `https://maps.google.com/?cid=${profile.cid}`} target="_blank" rel="noreferrer noopener">Google Maps ↗</a>
              <button className={s.ghost} onClick={() => setProfile(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
