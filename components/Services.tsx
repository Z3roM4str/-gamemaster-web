'use client';

import { ArrowUpRight, BrainCircuit, Check, Gamepad2, ShieldCheck, Tv2 } from 'lucide-react';
import { aiServices, gamingServices, privacyServices, streamingServices, type Service } from '@/app/data/services';
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

export function Services() {
  const { interest, setInterest } = useExperience();
  const streamingInterest = streamingServices.some((service) => service.name === interest) ? interest : 'Streaming';

  return (
    <section className="servicesSection sectionShell" id="servicios" aria-labelledby="services-title">
      <div className="servicesAtmosphere" aria-hidden="true"><span data-gm-depth="0.028" /><i data-gm-depth="-0.055" /></div>
      <div className="splitHeading">
        <div>
          <p className="eyebrow"><span /> UNIVERSOS BAJO CONSULTA</p>
          <h2 id="services-title">Descubre primero.<br /><em>Cotiza después.</em></h2>
        </div>
        <p>Las familias de servicio se muestran para orientar tu búsqueda. No publicamos planes, duración, beneficios ni precios sin una fuente canónica vigente.</p>
      </div>

      <div className="serviceGrid">
        <article className="serviceCard serviceGaming">
          <span className="serviceScene serviceSceneGaming" aria-hidden="true"><i /><i /><i /></span>
          <div className="serviceCardIcon"><Gamepad2 aria-hidden="true" /></div>
          <div className="serviceCardCopy">
            <small>UNIVERSO 01 · OFERTA CONFIRMADA</small>
            <h3>Nintendo<br />digital</h3>
            <p>La oferta comercial visible se limita a Nintendo Switch y Nintendo Switch 2 digital.</p>
            <div className="serviceLogoGrid serviceLogoGridSingle" aria-label="Plataforma de videojuegos ofrecida">
              {gamingServices.map((service) => (
                <ServiceButton service={service} selected={interest === 'Nintendo Switch digital'} onSelect={() => setInterest('Nintendo Switch digital')} key={service.name} />
              ))}
            </div>
          </div>
          <a href="#catalogo" onClick={() => setInterest('Nintendo Switch digital')}>Explorar catálogo <ArrowUpRight aria-hidden="true" /></a>
        </article>

        <article className="serviceCard serviceStreaming" id="streaming">
          <span className="serviceScene serviceSceneStreaming" aria-hidden="true"><i /><i /><i /></span>
          <div className="serviceCardIcon"><Tv2 aria-hidden="true" /></div>
          <div className="serviceCardCopy">
            <small>UNIVERSO 02 · MEMBRESÍAS</small>
            <h3>Streaming<br />&amp; música</h3>
            <p>Explora familias de entretenimiento y solicita una cotización vigente por el servicio que te interesa.</p>
            <div className="serviceLogoGrid" aria-label="Servicios de streaming y música consultables">
              {streamingServices.map((service) => (
                <ServiceButton service={service} selected={interest === service.name} onSelect={() => setInterest(service.name)} key={service.name} />
              ))}
            </div>
          </div>
          <a href="#cotizar" onClick={() => setInterest(streamingInterest)}>Consultar precio <ArrowUpRight aria-hidden="true" /></a>
        </article>

        <article className="serviceCard serviceAi" id="ia">
          <span className="serviceScene serviceSceneAi" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          <div className="serviceCardIcon"><BrainCircuit aria-hidden="true" /></div>
          <div className="serviceCardCopy">
            <small>UNIVERSO 03 · INTELIGENCIA ARTIFICIAL</small>
            <h3>IA para<br />crear y trabajar</h3>
            <p>ChatGPT y Claude forman la oferta actual de IA. Precio, modalidad y disponibilidad se consultan al momento.</p>
            <div className="serviceLogoGrid serviceLogoGridCompact" aria-label="Herramientas de IA consultables">
              {aiServices.map((service) => (
                <ServiceButton service={service} selected={interest === service.name} onSelect={() => setInterest(service.name)} key={service.name} />
              ))}
            </div>
          </div>
          <a href="#cotizar" onClick={() => setInterest(interest === 'Claude' ? 'Claude' : 'ChatGPT')}>Consultar precio <ArrowUpRight aria-hidden="true" /></a>
        </article>

        <article className="serviceCard servicePrivacy" id="privacidad">
          <span className="serviceScene serviceScenePrivacy" aria-hidden="true"><i /><i /><i /></span>
          <div className="serviceCardIcon"><ShieldCheck aria-hidden="true" /></div>
          <div className="serviceCardCopy">
            <small>UNIVERSO 04 · SERVICIOS DIGITALES</small>
            <h3>Privacidad<br />digital</h3>
            <p>Proton VPN pertenece a una familia comercial propia. Precio, duración y disponibilidad se consultan al momento.</p>
            <div className="serviceLogoGrid serviceLogoGridSingle" aria-label="Servicios de privacidad consultables">
              {privacyServices.map((service) => (
                <ServiceButton service={service} selected={interest === service.name} onSelect={() => setInterest(service.name)} key={service.name} />
              ))}
            </div>
          </div>
          <a href="#cotizar" onClick={() => setInterest('Proton VPN')}>Consultar precio <ArrowUpRight aria-hidden="true" /></a>
        </article>

        <p className="serviceDisclaimer">Las marcas pertenecen a sus respectivos titulares y su presencia no implica afiliación, patrocinio ni disponibilidad garantizada.</p>
      </div>
      <div className="servicesOutro">
        <span>SEÑAL / LISTA</span>
        <strong>UNA ELECCIÓN.<br /><em>UN MENSAJE.</em></strong>
        <p>Reúne juegos o elige un servicio. GameMaster confirma contigo precio y disponibilidad antes de cualquier pago.</p>
        <a href="#cotizar">Construir mi solicitud <ArrowUpRight aria-hidden="true" /></a>
      </div>
    </section>
  );
}
