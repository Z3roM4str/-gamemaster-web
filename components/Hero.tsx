import Image from 'next/image';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { catalog } from '@/app/data/catalog';
import { GENERAL_CONTACT_URL } from '@/lib/contact';
import { TerrainField } from './art/Fields';
import { ProductPreviewTrigger } from './ProductPreviewTrigger';

const heroGame = catalog.find((game) => game.id === 'mario-kart-world') ?? catalog[0];
const heroCompanion = catalog.find((game) => game.id === 'donkey-kong-bananza') ?? catalog[1];
const heroSignal = catalog.find((game) => game.id === 'metroid-prime-4') ?? catalog[2];

/**
 * Hero — the strongest chromostereoscopic moment of the page.
 *
 * Occlusion chain, back to front: blue structural mass -> black aperture cut
 * into it -> full-colour covers standing in the aperture -> a single red blade
 * in front of everything. Four materially different objects, never one shape
 * repeated in two colours.
 */
export function Hero() {
  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="heroWorld" aria-hidden="true">
        <div className="heroWorldMass" data-gm-depth="0.028">
          <TerrainField className="heroWorldTerrain" />
          <span className="heroWorldRule" />
          <span className="heroWorldTag">GM · CAMPO ESTRUCTURAL / 1600</span>
        </div>
        <div className="heroAperture" />
      </div>

      <div className="heroCopy">
        <p className="heroKicker">
          <span>GM / SEÑAL 01</span>
          <em>Biblioteca digital · México</em>
        </p>
        <h1 id="hero-title">
          Todo lo que<br />
          quieres <span className="heroWordFront">jugar.</span>
        </h1>
        <p className="heroSubline">En una sola señal.</p>
        <p className="heroLede">
          {catalog.length} títulos digitales para Nintendo Switch y Switch&nbsp;2. Streaming, IA y privacidad viven aquí como
          universos de consulta, con precio y disponibilidad confirmados al momento.
        </p>
        <div className="heroActions">
          <a className="buttonPrimary" href="#catalogo">
            Explorar la biblioteca <ArrowRight aria-hidden="true" />
          </a>
          <a className="buttonGhost" href={GENERAL_CONTACT_URL} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" /> Hablar por WhatsApp
          </a>
        </div>
        <dl className="heroLedger" aria-label="Resumen de GameMaster">
          <div>
            <dt>{catalog.length}</dt>
            <dd>títulos en archivo</dd>
          </div>
          <div>
            <dt>02</dt>
            <dd>generaciones Switch</dd>
          </div>
          <div>
            <dt>1:1</dt>
            <dd>atención directa</dd>
          </div>
        </dl>
      </div>

      <div className="heroStack" aria-label="Selección editorial de juegos Nintendo Switch">
        <ProductPreviewTrigger slug={heroGame.slug} label={`Abrir vista rápida de ${heroGame.title}`} className="heroCoverLead">
          <Image src={heroGame.image} alt={`Portada de ${heroGame.title}`} fill sizes="(max-width: 860px) 66vw, 372px" priority />
          <span className="heroCoverCaption">
            <small>Selección 01</small>
            <strong>{heroGame.title}</strong>
          </span>
        </ProductPreviewTrigger>
        <ProductPreviewTrigger slug={heroCompanion.slug} label={`Abrir vista rápida de ${heroCompanion.title}`} className="heroCoverSecond">
          <Image src={heroCompanion.image} alt={`Portada de ${heroCompanion.title}`} fill sizes="(max-width: 860px) 34vw, 208px" priority />
          <span aria-hidden="true">02</span>
        </ProductPreviewTrigger>
        <ProductPreviewTrigger slug={heroSignal.slug} label={`Abrir vista rápida de ${heroSignal.title}`} className="heroCoverThird">
          <Image src={heroSignal.image} alt={`Portada de ${heroSignal.title}`} fill sizes="(max-width: 860px) 28vw, 168px" />
          <span aria-hidden="true">03</span>
        </ProductPreviewTrigger>
      </div>

      <div className="heroBlade" data-gm-depth="-0.11" aria-hidden="true" />
      <div className="heroPlate" data-gm-depth="-0.06" aria-hidden="true">
        <small>Señal abierta</small>
        <strong>{catalog.length}</strong>
        <span>títulos listos para consultar</span>
      </div>

      <div className="heroStation" aria-hidden="true">
        <span className="heroStationStep isFront">01 Descubrir</span>
        <span className="heroStationStep">02 Seleccionar</span>
        <span className="heroStationStep">03 Cotizar</span>
        <span className="heroStationRule" />
      </div>
    </section>
  );
}
