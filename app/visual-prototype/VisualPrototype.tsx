'use client';

import { useEffect, useRef } from 'react';
import { mountDepthWorld } from './depth-engine';
import './visual-prototype.css';

/* Placeholders de portada. Se tratan como objetos de contenido normales:
   color propio, sin tratamiento rojo/azul, opacos para poder ocluir el
   plano rojo que pasa por detrás. */
type Cover = { title: string; meta: string; c1: string; c2: string; mark: number };

const COVERS: Record<string, Cover> = {
  odyssey: { title: 'Mario Odyssey', meta: 'Switch', c1: '#7d4a1c', c2: '#180f07', mark: 0 },
  zelda: { title: 'The Legend of Zelda', meta: 'Switch 2', c1: '#2c4b39', c2: '#0b120e', mark: 1 },
  pokemon: { title: 'Pokémon', meta: 'Switch', c1: '#4d4118', c2: '#12100a', mark: 2 },
  metroid: { title: 'Metroid', meta: 'Switch 2', c1: '#24394f', c2: '#090e14', mark: 3 },
  hades: { title: 'Hades', meta: 'Switch', c1: '#4c2029', c2: '#13090c', mark: 4 },
  kirby: { title: 'Kirby', meta: 'Switch', c1: '#5a2f45', c2: '#140b10', mark: 1 },
  splatoon: { title: 'Splatoon', meta: 'Switch 2', c1: '#1f4a4a', c2: '#081212', mark: 2 },
  fire: { title: 'Fire Emblem', meta: 'Switch', c1: '#523524', c2: '#130d09', mark: 0 },
};

function CoverMark({ variant }: { variant: number }) {
  const stroke = 'rgba(244,244,239,0.34)';
  return (
    <div className="dw-cover-mark" aria-hidden="true">
      <svg viewBox="0 0 120 160" fill="none" stroke={stroke} strokeWidth="1.1">
        {variant === 0 && (
          <>
            <circle cx="60" cy="62" r="30" />
            <path d="M30 62h60M60 32v60" />
            <path d="M18 122h84" strokeWidth="2" />
          </>
        )}
        {variant === 1 && (
          <>
            <path d="M60 22 96 84 60 132 24 84z" />
            <path d="M60 48 78 84 60 110 42 84z" />
          </>
        )}
        {variant === 2 && (
          <>
            <path d="M20 96c14-40 66-40 80 0" />
            <circle cx="60" cy="70" r="12" />
            <path d="M20 96h80" strokeWidth="2" />
          </>
        )}
        {variant === 3 && (
          <>
            <path d="M26 130V54l34-30 34 30v76" />
            <path d="M46 130V78h28v52" />
          </>
        )}
        {variant === 4 && (
          <>
            <path d="M34 34l52 96M86 34l-52 96" strokeWidth="1.6" />
            <circle cx="60" cy="82" r="24" />
          </>
        )}
      </svg>
    </div>
  );
}

function CoverObject({ id }: { id: keyof typeof COVERS }) {
  const c = COVERS[id];
  return (
    <div
      className="dw-cover"
      style={{ ['--c1' as string]: c.c1, ['--c2' as string]: c.c2 }}
    >
      <CoverMark variant={c.mark} />
      <div className="dw-cover-meta">
        <strong>{c.title}</strong>
        <span>{c.meta} · Consultar</span>
      </div>
    </div>
  );
}

function Rail({ ids }: { ids: (keyof typeof COVERS)[] }) {
  return (
    <div className="dw-rail dw-fore" data-depth="-6">
      {ids.map((id) => (
        <div className="dw-item" key={id}>
          <CoverObject id={id} />
        </div>
      ))}
    </div>
  );
}

function Field({
  className,
  kind = 'terrain',
  depth,
  opts,
}: {
  className: string;
  kind?: 'terrain' | 'contour';
  depth: number;
  opts: Record<string, number>;
}) {
  return (
    <div className={`dw-field ${className}`} data-depth={depth} aria-hidden="true">
      <canvas data-field={kind} data-opts={JSON.stringify(opts)} />
    </div>
  );
}

export default function VisualPrototype() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    return mountDepthWorld(el);
  }, []);

  return (
    <div className="dw" ref={rootRef}>
      <header className="dw-nav">
        <div className="dw-logo">
          Game<b>Master</b>
        </div>
        <div className="dw-nav-links">
          <a href="#universos">Gaming</a>
          <a href="#universos">Streaming</a>
          <a href="#universos">IA</a>
          <a href="#catalogo" className="is-cta">Explorar</a>
        </div>
        <span className="dw-flag">Prototipo visual · v2</span>
      </header>

      {/* ---------- 1. HERO: la tesis completa en un viewport ---------- */}
      <section className="dw-ch dw-hero">
        <Field
          className="dw-hero-field"
          depth={120}
          opts={{ horizon: 0.04, reach: 0.92, spread: 1.5, amp: 78, freq: 6.2, phase: 0.4, cols: 34, rows: 24, wash: 0.42, washY: 0.08 }}
        />
        <div className="dw-red dw-hero-red" data-depth={-34} aria-hidden="true" />

        <div className="dw-hero-copy dw-fore" data-depth={-4}>
          <p className="dw-eyebrow">Gaming · Streaming · IA</p>
          <h1 className="dw-hero-title dw-display">
            Un catálogo
            <em>con fondo</em>
          </h1>
          <p>
            Juegos de Nintendo, streaming y servicios de IA. Todo lo que ves está disponible bajo
            consulta directa, sin letra pequeña.
          </p>
          <div className="dw-cta">
            <a className="dw-btn dw-btn--solid" href="#catalogo">Explorar catálogo</a>
            <a className="dw-btn dw-btn--ghost" href="#contacto">Consultar</a>
          </div>
        </div>

        <div className="dw-hero-object dw-fore" data-depth={-12}>
          <CoverObject id="odyssey" />
          <div className="dw-hero-object-second">
            <CoverObject id="zelda" />
          </div>
        </div>
      </section>

      {/* ---------- 2. VACÍO: estructura azul gigantesca cruzando ---------- */}
      <section className="dw-ch dw-void" id="universos">
        <Field
          className="dw-void-field"
          kind="contour"
          depth={150}
          opts={{ cx: 0.36, cy: 0.52, scale: 1.15, stretch: 1.35, rings: 30, alpha: 0.9, wash: 0.16, washY: 0.2 }}
        />
        <div className="dw-fore" data-depth={0} style={{ width: '100%' }}>
          <ul className="dw-universes">
            <li>
              <span className="u-name">Gaming</span>
              <span className="u-note">Nintendo Switch y Switch 2, por franquicia y colección</span>
            </li>
            <li>
              <span className="u-name">Streaming</span>
              <span className="u-note">Familias de servicio bajo consulta directa</span>
            </li>
            <li>
              <span className="u-name">IA</span>
              <span className="u-note">Herramientas y suscripciones por caso de uso</span>
            </li>
            <li>
              <span className="u-name">Privacidad</span>
              <span className="u-note">Buenas prácticas y servicios asociados</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ---------- 3. RAIL A: placa roja por detrás de las portadas ---------- */}
      <section className="dw-ch dw-railA" id="catalogo">
        <Field
          className="dw-railA-field"
          kind="contour"
          depth={110}
          opts={{ cx: 0.28, cy: 0.48, scale: 1.05, stretch: 1.5, rings: 28, wash: 0.3, washY: 0.05 }}
        />
        <div className="dw-red dw-railA-red" data-depth={-30} aria-hidden="true" />
        <div className="dw-fore" data-depth={-2}>
          <div className="dw-rail-head">
            <h2>Destacados Switch 2</h2>
            <span>Consultar disponibilidad</span>
          </div>
        </div>
        <Rail ids={['zelda', 'metroid', 'odyssey', 'splatoon', 'pokemon', 'hades']} />
      </section>

      {/* ---------- 4. VACÍO: negro, tipografía monumental ---------- */}
      <section className="dw-ch dw-void dw-void--right">
        <Field
          className="dw-void-field"
          depth={165}
          opts={{ horizon: 0.3, reach: 0.7, spread: 1.9, amp: 52, freq: 4.4, phase: 2.1, cols: 30, rows: 18, alpha: 0.45 }}
        />
        <h2 className="dw-void-title dw-display dw-fore" data-depth={0}>
          Detrás de cada portada hay <i>un catálogo entero</i>
        </h2>
      </section>

      {/* ---------- 5. RAIL B: arquitectura azul dominante ---------- */}
      <section className="dw-ch dw-railB">
        <Field
          className="dw-railB-field"
          depth={95}
          opts={{ horizon: 0.02, reach: 1, spread: 1.35, amp: 92, freq: 7.4, phase: 1.2, cols: 36, rows: 26, wash: 0.36, washY: 0.02 }}
        />
        <div className="dw-red dw-railB-red" data-depth={-26} aria-hidden="true" />
        <div className="dw-fore" data-depth={-2}>
          <div className="dw-rail-head">
            <h2>Mundo Mario</h2>
            <span>Colección</span>
          </div>
        </div>
        <Rail ids={['odyssey', 'kirby', 'pokemon', 'fire', 'zelda', 'metroid']} />
      </section>

      {/* ---------- 6. RAIL C: gran intervención roja atravesando ---------- */}
      <section className="dw-ch dw-railC">
        <Field
          className="dw-railC-field"
          kind="contour"
          depth={155}
          opts={{ cx: 0.72, cy: 0.42, scale: 1.1, stretch: 1.6, rings: 26, alpha: 0.6, wash: 0.15, washY: 0.25 }}
        />
        <div className="dw-red dw-railC-red" data-depth={-24} aria-hidden="true" />
        <div className="dw-fore" data-depth={-2}>
          <div className="dw-rail-head">
            <h2>RPG y aventuras</h2>
            <span>Consultar disponibilidad</span>
          </div>
        </div>
        <Rail ids={['hades', 'fire', 'zelda', 'splatoon', 'odyssey', 'kirby']} />
      </section>

      {/* ---------- 7. CIERRE ---------- */}
      <section className="dw-ch dw-close" id="contacto">
        <Field
          className="dw-close-field"
          depth={125}
          opts={{ horizon: 0.06, reach: 0.95, spread: 1.6, amp: 70, freq: 5.6, phase: 3.1, cols: 32, rows: 22, wash: 0.3, washY: 0.1 }}
        />
        <div className="dw-red dw-close-red" data-depth={-28} aria-hidden="true" />
        <div className="dw-fore" data-depth={-4}>
          <h2 className="dw-close-title dw-display">
            Dinos qué buscas y te decimos si lo tenemos
          </h2>
          <div className="dw-close-lines">
            <div>
              <strong>Streaming</strong>
              <p>Familias de servicio agrupadas por catálogo.</p>
              <em>Consultar</em>
            </div>
            <div>
              <strong>IA</strong>
              <p>Suscripciones y herramientas por caso de uso.</p>
              <em>Consultar</em>
            </div>
            <div>
              <strong>Privacidad</strong>
              <p>Servicios asociados a buenas prácticas digitales.</p>
              <em>Consultar</em>
            </div>
          </div>
        </div>
      </section>

      <footer className="dw-footer">
        <div className="dw-logo" style={{ fontSize: 16 }}>
          Game<b>Master</b>
        </div>
        <nav>
          <a href="#universos">Gaming</a>
          <a href="#universos">Streaming</a>
          <a href="#universos">IA</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <p>
          Prototipo visual experimental para evaluar dirección artística. No representa precios,
          disponibilidad, catálogo final ni afiliación con marcas de terceros.
        </p>
      </footer>
    </div>
  );
}
