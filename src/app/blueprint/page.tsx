import { Metadata } from 'next';
import BlueprintRoadmap from './BlueprintRoadmap';

export const metadata: Metadata = {
  title: 'Your Digital Blueprint',
  description:
    'The step-by-step roadmap to building a complete digital presence for your business. See exactly what you need at every stage — from domain registration to full automation.',
  robots: { index: false, follow: false },
};

export default function BlueprintPage() {
  return <BlueprintRoadmap />;
}
