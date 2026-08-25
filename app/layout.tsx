import type { Metadata } from 'next';
import { Bebas_Neue, Outfit } from 'next/font/google';
import './globals.css';

const display = Bebas_Neue({ variable: '--font-display', subsets: ['latin'], weight: '400' });
const body = Outfit({ variable: '--font-body', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Game Master | Gaming, streaming e IA',
  description: 'Explora videojuegos, streaming y ChatGPT en un catálogo digital premium con atención directa y cotización personalizada.',
  metadataBase: new URL('https://game-master-digital-mx.mastr-z3ro.chatgpt.site'),
  icons: { icon: '/brand/game-master-emblem-v3.png' },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Game Master',
    title: 'Game Master | Gaming, streaming e IA',
    description: 'Tu universo digital en una sola señal.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Game Master — ChatGPT, streaming y videojuegos' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Game Master | Gaming, streaming e IA',
    description: 'Tu universo digital en una sola señal.',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-MX"><body className={`${display.variable} ${body.variable}`}>{children}</body></html>;
}
