import type { Metadata } from 'next';
import VisualPrototype from './VisualPrototype';

export const metadata: Metadata = {
  title: 'Prototipo visual — GameMaster',
  robots: { index: false, follow: false },
};

export default function VisualPrototypePage() {
  return <VisualPrototype />;
}
