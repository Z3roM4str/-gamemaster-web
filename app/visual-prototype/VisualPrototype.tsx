'use client';

import { useRef } from 'react';
import { useScrollDepth } from './useScrollDepth';
import './visual-prototype.css';

/* ---------- Motivos SVG procedurales (línea, sin relleno cromático doble) ---------- */

function TopographicField() {
  return (
    <svg viewBox="0 0 800 800" fill="none" preserveAspectRatio="xMidYMid slice">
      {Array.from({ length: 9 }).map((_, i) => {
        const r = 60 + i * 42;
        const skew = i % 2 === 0 ? 1 : -1;
        return (
          <path
            key={i}
            d={`M ${400 - r} ${400} C ${400 - r} ${400 - r * 0.6 * skew}, ${400 + r} ${400 - r * 0.4 * skew}, ${400 + r} ${400}`}
            stroke="#3550ff"
            strokeWidth={i === 4 ? 2 : 1}
            opacity={0.15 + (i % 3) * 0.08}
          />
        );
      })}
      {Array.from({ length: 6 }).map((_, i) => (
        <line
          key={`c-${i}`}
          x1={80 + i * 120}
          y1={0}
          x2={80 + i * 120}
          y2={800}
          stroke="#1c3bff"
          strokeWidth={0.5}
          opacity={0.12}
        />
      ))}
      {Array.from({ length: 5 }).map((_, i) => (
        <circle key={`n-${i}`} cx={220 + i * 90} cy={140 + (i % 3) * 210} r={3} fill="#5c74ff" opacity={0.6} />
      ))}
    </svg>
  );
}

function CircuitGlyph() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#5c74ff" strokeWidth="1.5">
      <path d="M8 32h12M44 32h12M32 8v12M32 44v12" />
      <rect x="20" y="20" width="24" height="24" />
      <circle cx="8" cy="32" r="2.5" fill="#5c74ff" stroke="none" />
      <circle cx="56" cy="32" r="2.5" fill="#5c74ff" stroke="none" />
      <circle cx="32" cy="8" r="2.5" fill="#5c74ff" stroke="none" />
      <circle cx="32" cy="56" r="2.5" fill="#5c74ff" stroke="none" />
    </svg>
  );
}

function SignalBands() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#5c74ff" strokeWidth="1.5">
      <path d="M4 40c8-16 16 16 24 0s16 16 24 0" />
      <rect x="4" y="10" width="56" height="8" rx="1" />
      <rect x="4" y="10" width="18" height="8" rx="1" fill="#5c74ff" stroke="none" />
    </svg>
  );
}

function NodeNetwork() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#5c74ff" strokeWidth="1.2">
      <line x1="10" y1="12" x2="32" y2="32" />
      <line x1="54" y1="14" x2="32" y2="32" />
      <line x1="32" y1="32" x2="16" y2="52" />
      <line x1="32" y1="32" x2="50" y2="50" />
      <circle cx="10" cy="12" r="3.5" />
      <circle cx="54" cy="14" r="3.5" />
      <circle cx="32" cy="32" r="4.5" fill="#5c74ff" stroke="none" />
      <circle cx="16" cy="52" r="3.5" />
      <circle cx="50" cy="50" r="3.5" />
    </svg>
  );
}

function ShieldMark() {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="#ff1e1e" strokeWidth="1.6">
      <path d="M32 6 54 14v18c0 14-9 22-22 26C19 54 10 46 10 32V14z" />
      <path d="M23 32l6 6 12-14" />
    </svg>
  );
}

const RAIL_ITEMS = [
  { title: 'Mario Odyssey', a: '#241014', b: '#0a0a0d', featured: true },
  { title: 'The Legend of Zelda', a: '#0e1024', b: '#0a0a0d' },
  { title: 'Pokémon', a: '#161024', b: '#0a0a0d' },
  { title: 'Hades', a: '#210f10', b: '#0a0a0d' },
  { title: 'Metroid', a: '#101a24', b: '#0a0a0d' },
  { title: 'Consultar catálogo completo', a: '#141414', b: '#0a0a0d' },
];

const RAIL_ITEMS_2 = [
  { title: 'Hades', a: '#210f10', b: '#0a0a0d' },
  { title: 'Metroid', a: '#101a24', b: '#0a0a0d' },
  { title: 'The Legend of Zelda', a: '#0e1024', b: '#0a0a0d' },
  { title: 'Mario Odyssey', a: '#241014', b: '#0a0a0d', featured: true },
  { title: 'Pokémon', a: '#161024', b: '#0a0a0d' },
];

export default function VisualPrototype() {
  const rootRef = useRef<HTMLDivElement>(null);
  useScrollDepth(rootRef);

  return (
    <div className="vp" ref={rootRef}>
      <header className="vp-header">
        <div className="vp-logo">
          Game<span>Master</span>
        </div>
        <div className="vp-header-right">
          <nav className="vp-nav">
            <a href="#universos">Gaming</a>
            <a href="#universos">Streaming</a>
            <a href="#universos">IA</a>
            <a href="#catalogo" className="vp-nav-cta">Explorar</a>
          </nav>
          <span className="vp-badge">Prototipo visual — experimento aislado</span>
        </div>
      </header>

      <section className="vp-hero">
        <div className="vp-hero-blue" aria-hidden="true">
          <TopographicField />
        </div>
        <div className="vp-hero-red" aria-hidden="true" />

        <div className="vp-hero-content">
          <p className="vp-eyebrow">Gaming · Streaming · IA</p>
          <h1 className="vp-hero-title vp-display">
            Game
            <span className="accent">Master</span>
            <span className="vp-hero-title-bar" aria-hidden="true" />
          </h1>
          <p className="vp-hero-copy">
            Catálogo digital de juegos Nintendo, streaming y servicios de IA bajo una sola
            arquitectura visual. Sin relleno: lo que ves es la señal, lo demás se consulta directo.
          </p>
          <div className="vp-cta-row">
            <a className="vp-btn vp-btn-primary" href="#catalogo">Explorar catálogo</a>
            <a className="vp-btn vp-btn-secondary" href="#servicios">Consultar por WhatsApp</a>
          </div>
        </div>

        <span className="vp-scroll-cue">Scroll para ver profundidad ↓</span>
      </section>

      <section className="vp-universos" id="universos">
        <div className="vp-universo">
          <CircuitGlyph />
          <div>
            <h3 className="vp-display">Gaming</h3>
            <p>Nintendo Switch y Switch 2. Descubrimiento por franquicia, género y colección.</p>
          </div>
        </div>
        <div className="vp-universo">
          <SignalBands />
          <div>
            <h3 className="vp-display">Streaming</h3>
            <p>Familias de servicio bajo consulta directa, sin afiliación oficial implícita.</p>
          </div>
        </div>
        <div className="vp-universo">
          <NodeNetwork />
          <div>
            <h3 className="vp-display">IA</h3>
            <p>Herramientas y suscripciones de IA agrupadas por caso de uso.</p>
          </div>
        </div>
        <div className="vp-universo accent-red">
          <ShieldMark />
          <div>
            <h3 className="vp-display">Privacidad</h3>
            <p>Buenas prácticas y servicios asociados, siempre bajo consulta.</p>
          </div>
        </div>
      </section>

      <section className="vp-transition" aria-hidden="false">
        <div className="vp-transition-blue-field" />
        <div className="vp-transition-blue-lines">
          <TopographicField />
        </div>
        <div className="vp-transition-red-mass" />
        <p className="vp-transition-label vp-display">
          Catálogo en <span className="accent">vivo</span>
        </p>
      </section>

      <section className="vp-catalog" id="catalogo">
        <div className="vp-rail">
          <div className="vp-rail-head">
            <h2>Destacados Switch 2</h2>
            <span>Consultar disponibilidad</span>
          </div>
          <div className="vp-rail-track">
            {RAIL_ITEMS.map((item) => (
              <div
                key={item.title}
                className={`vp-card${item.featured ? ' is-featured' : ''}`}
                style={{ ['--card-a' as string]: item.a, ['--card-b' as string]: item.b }}
              >
                <span className="vp-card-note">Placeholder</span>
                <span className="vp-card-title">{item.title}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="vp-rail">
          <div className="vp-rail-head">
            <h2>Explorados esta semana</h2>
            <span>Consultar disponibilidad</span>
          </div>
          <div className="vp-rail-track">
            {RAIL_ITEMS_2.map((item) => (
              <div
                key={`w-${item.title}`}
                className={`vp-card${item.featured ? ' is-featured' : ''}`}
                style={{ ['--card-a' as string]: item.a, ['--card-b' as string]: item.b }}
              >
                <span className="vp-card-note">Placeholder</span>
                <span className="vp-card-title">{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="vp-transition vp-transition--variant-b">
        <div className="vp-transition-blue-field" />
        <div className="vp-transition-blue-lines">
          <TopographicField />
        </div>
        <div className="vp-transition-red-mass" />
        <p className="vp-transition-label vp-display">
          Streaming · IA · <span className="accent">privacidad</span>
        </p>
      </section>

      <section className="vp-services" id="servicios">
        <div className="vp-service">
          <h4>Streaming</h4>
          <p>Familias de servicio agrupadas por catálogo.</p>
          <span className="price">Consultar</span>
        </div>
        <div className="vp-service">
          <h4>IA</h4>
          <p>Suscripciones y herramientas por caso de uso.</p>
          <span className="price">Consultar</span>
        </div>
        <div className="vp-service">
          <h4>Privacidad</h4>
          <p>Servicios asociados a buenas prácticas digitales.</p>
          <span className="price">Consultar</span>
        </div>
        <a className="vp-btn vp-btn-primary" href="#servicios">Hablar por WhatsApp</a>
      </section>

      <footer className="vp-footer">
        <div className="vp-logo" style={{ fontSize: 16 }}>
          Game<span>Master</span>
        </div>
        <nav className="vp-footer-nav">
          <a href="#universos">Gaming</a>
          <a href="#universos">Streaming</a>
          <a href="#universos">IA</a>
          <a href="#servicios">Contacto</a>
        </nav>
        <p className="vp-footer-note">
          Prototipo visual experimental para evaluar dirección artística. No representa precios,
          disponibilidad, catálogo final ni afiliación con marcas de terceros.
        </p>
      </footer>
    </div>
  );
}
