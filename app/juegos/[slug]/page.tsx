import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, MessageCircle, UserRound, UsersRound, Wifi } from 'lucide-react';
import { catalog, getGameBySlug, getRelatedGames } from '@/app/data/catalog';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { SiteArt } from '@/components/SiteArt';
import { gameQuoteMessage, toWhatsApp } from '@/lib/contact';
import { getSiteUrl } from '@/lib/site';

type GamePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return catalog.map((game) => ({ slug: game.slug }));
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) return { title: 'Juego no encontrado' };

  const siteUrl = getSiteUrl();
  const title = `${game.title} | GameMaster`;
  const description = `Consulta precio y disponibilidad de ${game.title} para ${game.platform}. Ficha de catálogo GameMaster.`;
  const socialImage = siteUrl ? new URL(game.image, siteUrl).toString() : undefined;

  return {
    title: game.title,
    description,
    alternates: siteUrl ? { canonical: new URL(`/juegos/${game.slug}`, siteUrl).toString() } : undefined,
    openGraph: {
      type: 'website',
      title,
      description,
      url: siteUrl ? new URL(`/juegos/${game.slug}`, siteUrl).toString() : undefined,
      images: socialImage ? [{ url: socialImage, alt: `Portada de ${game.title}` }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: socialImage ? [socialImage] : [],
    },
  };
}

export default async function GamePage({ params }: GamePageProps) {
  const { slug } = await params;
  const game = getGameBySlug(slug);
  if (!game) notFound();

  const relatedGames = getRelatedGames(game, 8);
  const quoteUrl = toWhatsApp(gameQuoteMessage(game.title, game.platform));
  const metadataTags = [...game.genres, ...game.worlds, ...game.features];

  return (
    <>
      <SiteArt />
      <Header homePath="/" />
      <main className="gameDetailPage" id="inicio">
        <section className="gameDetailHero sectionShell" aria-labelledby="game-title">
          <div className="gameDetailArt">
            <div className="gameDetailRearField" aria-hidden="true"><span /><span /><span /><span /></div>
            <div className="gameDetailCover">
              <Image src={game.image} alt={`Portada de ${game.title}`} fill sizes="(max-width: 760px) 82vw, 430px" priority />
            </div>
            <div className="gameDetailFrontPlane" aria-hidden="true"><span>GM</span><strong>{game.platform === 'Nintendo Switch 2' ? '02' : '01'}</strong></div>
          </div>

          <div className="gameDetailCopy">
            <Link className="backLink" href="/#catalogo"><ArrowLeft aria-hidden="true" /> Volver al catálogo</Link>
            <p className="gameDetailKicker">{game.platform} · Categoría fuente: {game.sourceCategory}</p>
            <h1 id="game-title">{game.title}</h1>
            {metadataTags.length > 0 && <div className="gameDetailTags">{metadataTags.map((tag) => <span key={tag}>{tag}</span>)}</div>}
            <p className="gameDetailDescription">Título digital registrado en el catálogo de GameMaster para {game.platform}. La ficha usa únicamente metadatos disponibles; precio, modalidad y disponibilidad se verifican contigo.</p>
            <dl className="gameDetailStatus">
              <div><dt>PRECIO</dt><dd>Consultar precio</dd></div>
              <div><dt>ESTADO</dt><dd>Consultar disponibilidad</dd></div>
            </dl>
            <a className="gameDetailWhatsapp" href={quoteUrl} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> Cotizar este juego <ArrowUpRight aria-hidden="true" /></a>
            <small>GameMaster es un negocio independiente. La portada pertenece a su respectivo titular y se muestra como referencia.</small>
          </div>
        </section>

        <section className="detailModes" aria-labelledby="detail-modes-title">
          <div className="sectionShell">
            <div className="detailModesHeading">
              <p className="eyebrow">Modalidades de acceso</p>
              <h2 id="detail-modes-title">Principal o Secundaria</h2>
              <p>La opción aplicable se confirma antes de comprar.</p>
            </div>
            <div className="detailModeGrid">
              <article><UserRound aria-hidden="true" /><span>01</span><h3>Cuenta Principal</h3><p>Permite jugar con cualquier perfil de la consola y puede abrirse sin conexión a internet.</p><Check aria-hidden="true" /></article>
              <article><UsersRound aria-hidden="true" /><span>02</span><h3>Cuenta Secundaria</h3><p>Se usa desde el perfil proporcionado y necesita una conexión breve para verificar al abrir.</p><Wifi aria-hidden="true" /></article>
            </div>
          </div>
        </section>

        <section className="relatedSection sectionShell" aria-labelledby="related-title">
          <div className="relatedHeading"><div><p className="eyebrow">Sigue explorando</p><h2 id="related-title">Juegos relacionados</h2></div><Link href="/#catalogo">Ver catálogo completo <ArrowRight aria-hidden="true" /></Link></div>
          <div className="relatedRail" tabIndex={0} aria-label="Juegos relacionados. Desplázate horizontalmente para ver más.">
            {relatedGames.map((related) => (
              <Link className="relatedCard" href={`/juegos/${related.slug}`} key={related.id}>
                <span><Image src={related.image} alt={`Portada de ${related.title}`} fill sizes="(max-width: 720px) 64vw, 210px" /></span>
                <small>{related.platform === 'Nintendo Switch 2' ? 'SWITCH 2' : 'SWITCH'} · {related.sourceCategory}</small>
                <strong>{related.title}</strong>
                <em>Consultar precio <ArrowRight aria-hidden="true" /></em>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
