import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, Outfit } from 'next/font/google';
import { getSiteUrl } from '@/lib/site';
import './globals.css';

const display = Bebas_Neue({ variable: '--font-display', subsets: ['latin'], weight: '400' });
const body = Outfit({ variable: '--font-body', subsets: ['latin'] });

const siteUrl = getSiteUrl();
const socialImage = siteUrl ? new URL('/og.png', siteUrl).toString() : undefined;

export const metadata: Metadata = {
  title: {
    default: 'GameMaster | Nintendo, streaming e IA',
    template: '%s | GameMaster',
  },
  description: 'Explora 134 juegos digitales para Nintendo Switch y Switch 2, además de universos de streaming e IA bajo consulta directa.',
  metadataBase: siteUrl,
  alternates: siteUrl ? { canonical: siteUrl } : undefined,
  icons: {
    icon: '/brand/game-master-emblem-v4.png',
    shortcut: '/brand/game-master-emblem-v4.png',
    apple: '/brand/game-master-emblem-v4.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'GameMaster',
    title: 'GameMaster | Nintendo, streaming e IA',
    description: 'Tu universo digital, en una sola señal.',
    url: siteUrl,
    images: socialImage ? [{ url: socialImage, width: 1200, height: 630, alt: 'GameMaster — Gaming Nintendo, streaming e IA' }] : [],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GameMaster | Nintendo, streaming e IA',
    description: 'Tu universo digital, en una sola señal.',
    images: socialImage ? [socialImage] : [],
  },
};

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#050505',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es-MX"><body className={`${display.variable} ${body.variable}`}>{children}</body></html>;
}
