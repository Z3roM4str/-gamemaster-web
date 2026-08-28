import { ArrowRight } from 'lucide-react';
import { catalog } from '@/app/data/catalog';
import { HalftoneField, ModuleField, NetworkField, SignalField } from './art/Fields';

/**
 * Universe index.
 *
 * Deliberately not four identical cards: an editorial index of four rows, each
 * carrying its own structural grammar (modular grid, signal bands, node
 * network, concentric halftone) inside the shared red/blue/black system.
 */

const universes = [
  {
    id: 'gaming',
    href: '#catalogo',
    index: '01',
    name: 'Gaming',
    meta: `Nintendo Switch / Switch 2 · ${catalog.length} títulos`,
    line: 'Biblioteca digital completa, con búsqueda, colecciones y ficha por título.',
    action: 'Entrar a la biblioteca',
  },
  {
    id: 'streaming',
    href: '#streaming',
    index: '02',
    name: 'Streaming',
    meta: 'Series, música y anime · Consultar precio',
    line: 'Familias de servicio para orientar tu búsqueda antes de cotizar.',
    action: 'Ver familias',
  },
  {
    id: 'ia',
    href: '#ia',
    index: '03',
    name: 'IA',
    meta: 'ChatGPT + Claude · Consultar precio',
    line: 'Herramientas de trabajo y creación, cotizadas directamente contigo.',
    action: 'Ver herramientas',
  },
  {
    id: 'privacidad',
    href: '#privacidad',
    index: '04',
    name: 'Privacidad',
    meta: 'Proton VPN · Consultar precio',
    line: 'Familia propia de servicios digitales, separada de streaming e IA.',
    action: 'Ver servicio',
  },
] as const;

const grammars = {
  gaming: <ModuleField className="universeGrammarArt" />,
  streaming: <SignalField className="universeGrammarArt" />,
  ia: <NetworkField className="universeGrammarArt" />,
  privacidad: <HalftoneField className="universeGrammarArt" />,
};

export function UniverseGateway() {
  return (
    <section className="universeSection" id="universos" aria-labelledby="universe-title">
      <div className="universeIntro">
        <p className="eyebrow">Índice de universos</p>
        <h2 id="universe-title">
          Cuatro mundos.<br />
          <em>Una sola entrada.</em>
        </h2>
        <p className="universeIntroLede">
          Gaming es una biblioteca Nintendo digital. Streaming, IA y privacidad son espacios de descubrimiento y cotización
          directa, sin planes ni precios supuestos.
        </p>
      </div>

      <ol className="universeIndex">
        {universes.map((universe) => (
          <li key={universe.id}>
            <a className="universeRow" data-universe={universe.id} href={universe.href}>
              <span className="universeGrammar" data-gm-depth="0.02" aria-hidden="true">
                {grammars[universe.id]}
              </span>
              <span className="universeNumber" aria-hidden="true">{universe.index}</span>
              <span className="universeName">{universe.name}</span>
              <span className="universeText">
                <em>{universe.meta}</em>
                <small>{universe.line}</small>
              </span>
              <span className="universeAction">
                {universe.action} <ArrowRight aria-hidden="true" />
              </span>
              <span className="universeEdge" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
