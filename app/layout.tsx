import type { Metadata } from 'next';
import { Bebas_Neue, Outfit } from 'next/font/google';
import './globals.css';

const display = Bebas_Neue({ variable: '--font-display', subsets: ['latin'], weight: '400' });
const body = Outfit({ variable: '--font-body', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Game Master | Juegos digitales para Nintendo Switch',
  description: 'Catálogo de juegos digitales para Nintendo Switch y Switch 2. Consulta precio y disponibilidad con atención personalizada.',
  metadataBase: new URL('https://game-master-digital-mx.mastr-z3ro.chatgpt.site'),
  icons: { icon: '/og.png' },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Game Master',
    title: 'Game Master | El juego que buscas',
    description: 'Nintendo Switch · Switch 2 · Cotización personalizada',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Game Master — El juego que buscas' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Game Master | El juego que buscas',
    description: 'Nintendo Switch · Switch 2 · Cotización personalizada',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body className={`${display.variable} ${body.variable}`}>{children}</body></html>;
}
