'use client';

import { ArrowUpRight, Check } from 'lucide-react';
import { aiServices, gamingServices, privacyServices, streamingServices, type Service } from '@/app/data/services';
import { HalftoneField, ModuleField, NetworkField, SignalField } from './art/Fields';
import { ServiceMark } from './ServiceMark';
import { useExperience } from './experience/useExperience';

function ServiceButton({ service, selected, onSelect }: {
  service: Service;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button type="button" className={`serviceLogo ${selected ? 'isSelected' : ''}`} onClick={onSelect} aria-pressed={selected} aria-label={`Elegir ${service.name}`}>
      <ServiceMark src={service.logo} />
      {selected && <span className="serviceSelectedMark"><Check aria-hidden="true" /><span className="srOnly">Seleccionado</span></span>}
    </button>
  );
}

/**
 * Four families, four internal grammars, one system.
 *
 * Gaming is a tall modular block, Streaming a horizontal signal band, IA a
 * network plane and Privacidad a quiet concentric field. The panels differ in
 * proportion and internal structure so the section never reads as four cards
 * with the title swapped.
 */
export function Services() {
  const { interest, setInterest } = useExperience();
  const streamingInterest = streamingServices.some((service) => service.name === interest) ? interest : 'Streaming';

  return (
    <section className="servicesSection" id="servicios" aria-labelledby="services-title">
      <div className="servicesHeading">
        <p className="eyebrow">Universos bajo consulta</p>
        <h2 id="services-title">
          Descubre primero.<br />
          <em>Cotiza después.</em>
        </h2>
        <p>
          Las familias de servicio se muestran para orientar tu búsqueda. No publicamos planes, duración, beneficios ni
          precios sin una fuente canónica vigente.
        </p>
      </div>

      <div className="serviceComposition">
        <article className="servicePanel panelGaming">
          <span className="panelGrammar" data-gm-depth="0.02" aria-hidden="true"><ModuleField /></span>
          <p className="panelLabel">Universo 01 · Oferta confirmada</p>
          <h3>Nintendo<br />digital</h3>
          <p className="panelLine">La oferta comercial visible se limita a Nintendo Switch y Nintendo Switch 2 digital.</p>
          <div className="panelMarks" aria-label="Plataforma de videojuegos ofrecida">
            {gamingServices.map((service) => (
              <ServiceButton service={service} selected={interest === 'Nintendo Switch digital'} onSelect={() => setInterest('Nintendo Switch digital')} key={service.name} />
            ))}
          </div>
          <a className="panelAction" href="#catalogo" onClick={() => setInterest('Nintendo Switch digital')}>Explorar catálogo <ArrowUpRight aria-hidden="true" /></a>
          <span className="panelFront" aria-hidden="true" />
        </article>

        <article className="servicePanel panelStreaming" id="streaming">
          <span className="panelGrammar" data-gm-depth="0.024" aria-hidden="true"><SignalField /></span>
          <div className="panelHead">
            <p className="panelLabel">Universo 02 · Membresías</p>
            <h3>Streaming &amp; música</h3>
            <p className="panelLine">Explora familias de entretenimiento y solicita una cotización vigente por el servicio que te interesa.</p>
          </div>
          <div className="panelMarks panelMarksWide" aria-label="Servicios de streaming y música consultables">
            {streamingServices.map((service) => (
              <ServiceButton service={service} selected={interest === service.name} onSelect={() => setInterest(service.name)} key={service.name} />
            ))}
          </div>
          <a className="panelAction" href="#cotizar" onClick={() => setInterest(streamingInterest)}>Consultar precio <ArrowUpRight aria-hidden="true" /></a>
        </article>

        <article className="servicePanel panelAi" id="ia">
          <span className="panelGrammar" data-gm-depth="0.018" aria-hidden="true"><NetworkField /></span>
          <div className="panelHead">
            <p className="panelLabel">Universo 03 · Inteligencia artificial</p>
            <h3>IA para crear y trabajar</h3>
            <p className="panelLine">ChatGPT y Claude forman la oferta actual de IA. Precio, modalidad y disponibilidad se consultan al momento.</p>
          </div>
          <div className="panelMarks" aria-label="Herramientas de IA consultables">
            {aiServices.map((service) => (
              <ServiceButton service={service} selected={interest === service.name} onSelect={() => setInterest(service.name)} key={service.name} />
            ))}
          </div>
          <a className="panelAction" href="#cotizar" onClick={() => setInterest(interest === 'Claude' ? 'Claude' : 'ChatGPT')}>Consultar precio <ArrowUpRight aria-hidden="true" /></a>
        </article>

        <article className="servicePanel panelPrivacy" id="privacidad">
          <span className="panelGrammar" data-gm-depth="0.016" aria-hidden="true"><HalftoneField /></span>
          <p className="panelLabel">Universo 04 · Servicios digitales</p>
          <h3>Privacidad digital</h3>
          <p className="panelLine">Proton VPN pertenece a una familia comercial propia. Precio, duración y disponibilidad se consultan al momento.</p>
          <div className="panelMarks" aria-label="Servicios de privacidad consultables">
            {privacyServices.map((service) => (
              <ServiceButton service={service} selected={interest === service.name} onSelect={() => setInterest(service.name)} key={service.name} />
            ))}
          </div>
          <a className="panelAction" href="#cotizar" onClick={() => setInterest('Proton VPN')}>Consultar precio <ArrowUpRight aria-hidden="true" /></a>
        </article>

        <aside className="serviceClose">
          <p className="panelLabel">Señal / lista</p>
          <strong>Una elección.<br /><em>Un mensaje.</em></strong>
          <p>Reúne juegos o elige un servicio. GameMaster confirma contigo precio y disponibilidad antes de cualquier pago.</p>
          <a href="#cotizar">Construir mi solicitud <ArrowUpRight aria-hidden="true" /></a>
        </aside>
      </div>

      <p className="serviceDisclaimer">
        Las marcas pertenecen a sus respectivos titulares y su presencia no implica afiliación, patrocinio ni disponibilidad
        garantizada.
      </p>
    </section>
  );
}
