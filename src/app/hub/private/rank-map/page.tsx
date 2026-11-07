import type { Metadata } from 'next';
import HideSiteChrome from '@/components/businessandbrews/HideSiteChrome';
import RankMapClient from './RankMapClient';

export const metadata: Metadata = {
  title: 'Rank Map (private)',
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};
export const dynamic = 'force-dynamic';

export default function RankMapPage() {
  return (
    <>
      <HideSiteChrome />
      <RankMapClient />
    </>
  );
}
