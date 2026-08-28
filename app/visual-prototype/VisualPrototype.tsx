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

/* Masas rojas. Cada una es UNA forma calada por sustracción (grabado,
   halftone, aperturas). Ninguna repite la composición de otra. */
type Pt = [number, number];
type RedSpec = {
  shape: Pt[];
  engrave?: { angle?: number; spacing?: number; width?: number; edge?: string; from?: number };
  halftone?: { step?: number; edge?: string; from?: number };
  fade?: { edge?: string; from?: number };
  apertures?: Pt[][];
};

function RedMass({ className, depth, spec }: { className: string; depth: number; spec: RedSpec }) {
  return (
    <div className={`dw-red ${className}`} data-depth={depth} aria-hidden="true">
      <canvas data-red={JSON.stringify(spec)} />
    </div>
  );
}

function Field({
  className,
  kind = 'mesh',
  depth,
  opts,
}: {
  className: string;
  kind?: 'mesh' | 'contour' | 'ornament';
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
          opts={{ horizon: 0.04, reach: 0.92, spread: 1.5, amp: 78, freq: 6.2, phase: 0.4, cols: 34, rows: 24, density: 1 }}
        />
        <RedMass
          className="dw-hero-red"
          depth={-34}
          spec={{
            shape: [[0.14, 0.08], [0.62, 0], [1, 0.18], [1, 0.88], [0.46, 1], [0.06, 0.74], [0, 0.34]],
            engrave: { angle: 74, spacing: 16, width: 2.4, edge: 'bottom', from: 0.5 },
            fade: { edge: 'left', from: 0.42 },
            apertures: [
              [[0.63, 0.13], [0.9, 0.18], [0.88, 0.3], [0.61, 0.25]],
              [[0.68, 0.36], [0.95, 0.41], [0.94, 0.47], [0.67, 0.42]],
            ],
          }}
        />

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
          kind="ornament"
          depth={150}
          opts={{ tile: 21, density: 0.7, cx: 0.72, cy: 0.52, radius: 0.26 }}
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
          kind="ornament"
          depth={110}
          opts={{ tile: 23, density: 0.6, cx: 0.3, cy: 0.44, radius: 0.28 }}
        />
        <RedMass
          className="dw-railA-red"
          depth={-30}
          spec={{
            shape: [[0, 0.22], [0.34, 0], [0.76, 0.12], [1, 0.48], [0.88, 1], [0.3, 0.88], [0.05, 0.96]],
            halftone: { step: 31, edge: 'bottom', from: 0.6 },
          }}
        />
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
          opts={{ horizon: 0.3, reach: 0.7, spread: 1.9, amp: 52, freq: 4.4, phase: 2.1, cols: 30, rows: 18, density: 0.5 }}
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
          opts={{ horizon: 0.02, reach: 1, spread: 1.35, amp: 92, freq: 7.4, phase: 1.2, cols: 36, rows: 26, density: 1 }}
        />
        <RedMass
          className="dw-railB-red"
          depth={-26}
          spec={{
            shape: [[0.24, 0], [1, 0.06], [0.78, 1], [0, 0.92]],
            engrave: { angle: 90, spacing: 20, width: 5, edge: 'top', from: 0.68 },
            apertures: [
              [[0.1, 0.42], [0.92, 0.44], [0.92, 0.47], [0.1, 0.45]],
              [[0.12, 0.55], [0.9, 0.57], [0.9, 0.61], [0.12, 0.59]],
              [[0.14, 0.7], [0.88, 0.72], [0.88, 0.74], [0.14, 0.72]],
            ],
          }}
        />
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
          opts={{ cx: 0.7, cy: 0.42, scale: 1.1, stretch: 1.6, rings: 26, density: 0.75 }}
        />
        <RedMass
          className="dw-railC-red"
          depth={-24}
          spec={{
            shape: [[0, 0.34], [1, 0], [1, 0.62], [0, 1]],
            engrave: { angle: 18, spacing: 18, width: 3.6, edge: 'bottom', from: 0.8 },
            halftone: { step: 28, edge: 'top', from: 0.82 },
          }}
        />
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
          opts={{ horizon: 0.06, reach: 0.95, spread: 1.6, amp: 70, freq: 5.6, phase: 3.1, cols: 32, rows: 22, density: 1 }}
        />
        <RedMass
          className="dw-close-red"
          depth={-28}
          spec={{
            shape: [[0.18, 0], [1, 0.22], [0.86, 0.86], [0.3, 1], [0, 0.44]],
            engrave: { angle: 118, spacing: 17, width: 4, edge: 'right', from: 0.5 },
            fade: { edge: 'bottom', from: 0.45 },
            apertures: [[[0.34, 0.3], [0.62, 0.35], [0.58, 0.6], [0.31, 0.55]]],
          }}
        />
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
