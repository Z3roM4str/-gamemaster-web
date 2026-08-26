import Image from 'next/image';
import { ArrowRight, Gamepad2, MessageCircle } from 'lucide-react';
import { catalog } from '@/app/data/catalog';
import { GENERAL_CONTACT_URL } from '@/lib/contact';
import { ProductPreviewTrigger } from './ProductPreviewTrigger';

const heroGame = catalog.find((game) => game.id === 'mario-kart-world') ?? catalog[0];
const heroCompanion = catalog.find((game) => game.id === 'donkey-kong-bananza') ?? catalog[1];

export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="heroCopy">
        <div className="heroLabel">
          <span>GM / ARCHIVO 01</span>
          <p>NINTENDO DIGITAL · MÉXICO</p>
        </div>
        <h1 id="hero-title">
          Todo lo que<br />
          quieres <span>jugar.</span>
          <em>En una sola señal.</em>
        </h1>
        <p className="heroLede">
          Descubre {catalog.length} títulos para Nintendo Switch y Switch 2. Streaming e IA viven aquí como universos de consulta, siempre con precio y disponibilidad confirmados al momento.
        </p>
        <div className="heroActions">
          <a className="buttonPrimary" href="#catalogo"><Gamepad2 aria-hidden="true" /> Explorar biblioteca <ArrowRight aria-hidden="true" /></a>
          <a className="buttonSecondary" href={GENERAL_CONTACT_URL} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> Hablar por WhatsApp</a>
        </div>
        <dl className="heroProof" aria-label="Resumen de GameMaster">
          <div><dt>{catalog.length}</dt><dd>títulos fuente</dd></div>
          <div><dt>02</dt><dd>generaciones Switch</dd></div>
          <div><dt>1:1</dt><dd>atención directa</dd></div>
        </dl>
      </div>

      <div className="heroArt" aria-label="Selección editorial de juegos Nintendo Switch">
        <div className="heroRearGrid" aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
        <div className="heroArtIndex" aria-hidden="true">
          <span>ARCHIVO / GM—{new Date().getFullYear()}</span>
          <span>PLANO B · BIBLIOTECA</span>
        </div>
        <ProductPreviewTrigger slug={heroGame.slug} label={`Abrir vista rápida de ${heroGame.title}`} className="heroCoverMain">
          <Image src={heroGame.image} alt={`Portada de ${heroGame.title}`} fill sizes="(max-width: 760px) 63vw, 360px" priority />
          <span className="heroCoverCaption"><small>SELECCIÓN / 01</small><strong>{heroGame.title}</strong></span>
        </ProductPreviewTrigger>
        <ProductPreviewTrigger slug={heroCompanion.slug} label={`Abrir vista rápida de ${heroCompanion.title}`} className="heroCoverCompanion">
          <Image src={heroCompanion.image} alt={`Portada de ${heroCompanion.title}`} fill sizes="(max-width: 760px) 31vw, 190px" priority />
          <span aria-hidden="true">02</span>
        </ProductPreviewTrigger>
        <div className="heroFrontPlane" aria-hidden="true">
          <small>PLANO FOCAL</small>
          <strong>PLAY</strong>
          <span>SWITCH / SWITCH 2</span>
        </div>
        <div className="heroCatalogPlate" aria-hidden="true">
          <strong>{catalog.length}</strong>
          <span>TÍTULOS<br />EN ARCHIVO</span>
        </div>
      </div>
    </section>
  );
}
