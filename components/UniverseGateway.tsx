import { ArrowRight, BrainCircuit, Gamepad2, RadioTower, ShieldCheck } from 'lucide-react';
import { catalog } from '@/app/data/catalog';
import { ServiceMark } from './ServiceMark';

export function UniverseGateway() {
  return (
    <section className="universeSection sectionShell" aria-labelledby="universe-title">
      <div className="splitHeading">
        <div>
          <p className="eyebrow"><span /> ELIGE TU UNIVERSO</p>
          <h2 id="universe-title">Cuatro mundos.<br /><em>Una sola entrada.</em></h2>
        </div>
        <p>Gaming es una biblioteca Nintendo digital. Streaming, IA y privacidad son espacios de descubrimiento y cotización directa, sin planes ni precios supuestos.</p>
      </div>
      <div className="universeGrid">
        <a className="universeCard universeGaming" href="#catalogo">
          <span className="universeIcon"><Gamepad2 aria-hidden="true" /></span>
          <span className="universeCopy"><small>UNIVERSO 01</small><strong>Gaming</strong><em>Nintendo Switch / Switch 2 · {catalog.length} títulos</em></span>
          <ArrowRight className="universeArrow" aria-hidden="true" />
          <span className="universeGamingField" data-gm-depth="-0.052" aria-hidden="true"><i /><i /><i /></span>
        </a>
        <a className="universeCard universeStreaming" href="#streaming">
          <span className="universeBrandStack" aria-hidden="true">
            <ServiceMark src="/services/netflix.svg" />
            <ServiceMark src="/services/spotify.svg" />
            <ServiceMark src="/services/disney-plus.svg" />
          </span>
          <span className="universeCopy"><small>UNIVERSO 02</small><strong>Streaming</strong><em>Series, música y anime · Consultar precio</em></span>
          <ArrowRight className="universeArrow" aria-hidden="true" />
          <span className="universeSignalField" data-gm-depth="0.022" aria-hidden="true"><RadioTower /></span>
        </a>
        <a className="universeCard universeAi" href="#ia">
          <span className="universeIcon"><BrainCircuit aria-hidden="true" /></span>
          <span className="universeCopy"><small>UNIVERSO 03</small><strong>IA</strong><em>ChatGPT + Claude · Consultar precio</em></span>
          <ArrowRight className="universeArrow" aria-hidden="true" />
          <span className="universeNodeField" data-gm-depth="0.018" aria-hidden="true"><i /><i /><i /><i /><i /></span>
        </a>
        <a className="universeCard universePrivacy" href="#privacidad">
          <span className="universeIcon"><ShieldCheck aria-hidden="true" /></span>
          <span className="universeCopy"><small>UNIVERSO 04</small><strong>Privacidad</strong><em>Proton VPN · Consultar precio</em></span>
          <ArrowRight className="universeArrow" aria-hidden="true" />
          <span className="universePrivacyField" data-gm-depth="0.021" aria-hidden="true"><i /><i /><i /></span>
        </a>
      </div>
    </section>
  );
}
