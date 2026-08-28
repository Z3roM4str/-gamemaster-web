'use client';

import { useEffect, useRef } from 'react';
import { mountDepthWorld } from './depth-engine';
import './visual-prototype.css';

/* Portadas: objetos de contenido normales, con color propio y sin tratamiento
   rojo/azul. Son opacas para poder ocluir el plano rojo que pasa detrás. */
type Cover = { title: string; meta: string; c1: string; c2: string; mark: number };

const COVERS = {
  odyssey: { title: 'Mario Odyssey', meta: 'Switch · Acción', c1: '#8a4a17', c2: '#150d06', mark: 0 },
  zelda: { title: 'The Legend of Zelda', meta: 'Switch 2 · Aventura', c1: '#2c5340', c2: '#0a110d', mark: 1 },
  pokemon: { title: 'Pokémon', meta: 'Switch · RPG', c1: '#55461a', c2: '#110f09', mark: 2 },
  metroid: { title: 'Metroid', meta: 'Switch 2 · Acción', c1: '#213b56', c2: '#080d13', mark: 3 },
  hades: { title: 'Hades', meta: 'Switch · Roguelike', c1: '#57212c', c2: '#12080b', mark: 4 },
  kirby: { title: 'Kirby', meta: 'Switch · Plataformas', c1: '#63334c', c2: '#130a0f', mark: 1 },
  splatoon: { title: 'Splatoon', meta: 'Switch 2 · Shooter', c1: '#1d5352', c2: '#071211', mark: 2 },
  fire: { title: 'Fire Emblem', meta: 'Switch · Estrategia', c1: '#5b3a26', c2: '#120c08', mark: 0 },
  xeno: { title: 'Xenoblade', meta: 'Switch · RPG', c1: '#2a3a63', c2: '#090c15', mark: 3 },
  luigi: { title: "Luigi's Mansion", meta: 'Switch · Aventura', c1: '#3d4a1e', c2: '#0d1008', mark: 4 },
} satisfies Record<string, Cover>;

type CoverId = keyof typeof COVERS;

function CoverMark({ variant }: { variant: number }) {
  const s = 'rgba(242,242,238,0.3)';
  return (
    <div className="dw-cover-mark" aria-hidden="true">
      <svg viewBox="0 0 120 160" fill="none" stroke={s} strokeWidth="0.9">
        {variant === 0 && (
          <>
            <circle cx="60" cy="66" r="26" />
            <circle cx="60" cy="66" r="38" strokeDasharray="2 5" />
            <path d="M22 118h76" />
          </>
        )}
        {variant === 1 && (
          <>
            <path d="M60 26 94 82 60 138 26 82z" />
            <path d="M60 50 78 82 60 114 42 82z" />
          </>
        )}
        {variant === 2 && (
          <>
            <path d="M24 100c12-38 60-38 72 0" />
            <circle cx="60" cy="74" r="10" />
            <path d="M24 100h72" />
          </>
        )}
        {variant === 3 && (
          <>
            <path d="M30 132V56l30-26 30 26v76" />
            <path d="M48 132V84h24v48" />
          </>
        )}
        {variant === 4 && (
          <>
            <path d="M36 36l48 92M84 36l-48 92" />
            <circle cx="60" cy="82" r="22" strokeDasharray="3 4" />
          </>
        )}
      </svg>
    </div>
  );
}

function CoverObject({ id, wide }: { id: CoverId; wide?: boolean }) {
  const c = COVERS[id];
  return (
    <div
      className={`dw-cover${wide ? ' dw-cover--wide' : ''}`}
      style={{ ['--c1' as string]: c.c1, ['--c2' as string]: c.c2 }}
    >
      <CoverMark variant={c.mark} />
      {!wide && (
        <div className="dw-cover-meta">
          <strong>{c.title}</strong>
          <span>{c.meta}</span>
        </div>
      )}
    </div>
  );
}

function Item({ id }: { id: CoverId }) {
  return (
    <div className="dw-item">
      <CoverObject id={id} />
    </div>
  );
}

/* Escena azul: se compone por capas. Zonas densas, zonas tenues y vacío. */
type Layer = Record<string, number | string | undefined>;

function Art({ className, depth, layers }: { className: string; depth: number; layers: Layer[] }) {
  return (
    <div className={`dw-art ${className}`} data-depth={depth} aria-hidden="true">
      <canvas data-art={JSON.stringify({ layers })} />
    </div>
  );
}

/* Pieza roja: sistema modular de placas, ranuras, rampas y satélites. */
function Red({ className, depth, layers }: { className: string; depth: number; layers: Layer[] }) {
  return (
    <div className={`dw-red ${className}`} data-depth={depth} aria-hidden="true">
      <canvas data-red={JSON.stringify({ layers })} />
    </div>
  );
}

function RailHead({ n, title, more }: { n: string; title: string; more: string }) {
  return (
    <div className="dw-rail-head">
      <span className="dw-rail-n">{n}</span>
      <h2>{title}</h2>
      <s />
      <a className="dw-more" href="#catalogo">{more}</a>
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
      <div className="dw-frame" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      <header className="dw-nav">
        <div className="dw-logo">
          Game<i />Master
        </div>
        <div className="dw-nav-links">
          <a href="#catalogo" className="is-on">Catálogo</a>
          <a href="#universos">Streaming</a>
          <a href="#universos">IA</a>
          <a href="#contacto">Contacto</a>
        </div>
        <div className="dw-nav-meta dw-mono">
          <span className="dw-dot" />
          Consulta directa
        </div>
      </header>

      {/* ---------- HERO ---------- */}
      <section className="dw-ch dw-hero">
        <Art
          className="dw-hero-art"
          depth={64}
          layers={[
            { t: 'grid', cols: 30, rows: 20, horizon: 0.52, depth: 0.5, spread: 2.3, warp: 30, freq: 2.4, phase: 0.5, alpha: 0.95 },
            { t: 'arcs', count: 5, cx: 0.63, cy: 0.44, r: 0.3, step: 0.26, squash: 0.5, rot: -14, alpha: 0.9 },
            { t: 'nodes', count: 26, seed: 11, x: 0.44, y: 0.06, w: 0.42, h: 0.34, link: 0.3, alpha: 0.85, dense: 1 },
            { t: 'rules', x: 0.06, y: 0.2, len: 0.5, pitch: 11, size: 7, vertical: 1, alpha: 0.8, dense: 1 },
          ]}
        />
        <Red
          className="dw-hero-red"
          depth={-22}
          layers={[
            /* Ensamblaje, no mancha: placa principal bajo los objetos, una
               pieza secundaria desfasada y satélites que la vinculan. */
            { t: 'plate', x: 0.4, y: 0.16, w: 0.5, h: 0.62, chamfer: 0.055, notch: 0.16 },
            { t: 'slots', x: 0.42, y: 0.2, w: 0.13, count: 8, gap: 6, thickness: 1.6 },
            { t: 'ramp', x: 0.4, y: 0.58, w: 0.5, h: 0.2, count: 20, dir: 'down' },
            { t: 'aperture', x: 0.76, y: 0.24, w: 0.1, h: 0.05, chamfer: 0.22 },
            { t: 'plate', x: 0.2, y: 0.52, w: 0.14, h: 0.16, chamfer: 0.14, notch: 0 },
            { t: 'ramp', x: 0.2, y: 0.62, w: 0.14, h: 0.06, count: 8, dir: 'down' },
            { t: 'bar', x: 0.06, y: 0.44, w: 0.11, h: 1.6 },
            { t: 'bar', x: 0.1, y: 0.472, w: 0.06, h: 1.6 },
            { t: 'ticks', x: 0.14, y: 0.3, count: 14, pitch: 7, size: 5 },
          ]}
        />

        <div className="dw-hero-copy dw-fore" data-depth={-4} data-reveal>
          <p className="dw-eyebrow">
            <span className="dw-dot" />
            Plataforma digital <b>GameMaster</b>
            <s />
          </p>
          <h1 className="dw-hero-title dw-display">
            El catálogo
            <em>y lo que hay detrás</em>
          </h1>
          <p className="dw-hero-lede">
            Juegos de Nintendo, streaming y servicios de IA en un solo sitio. Todo lo que ves está
            disponible bajo consulta directa, sin letra pequeña.
          </p>
          <div className="dw-cta">
            <a className="dw-btn dw-btn--solid" href="#catalogo">Explorar catálogo</a>
            <a className="dw-btn dw-btn--line" href="#contacto">Consultar</a>
          </div>
          <dl className="dw-spec">
            <div>
              <dt>Catálogo</dt>
              <dd><b>134</b> títulos</dd>
            </div>
            <div>
              <dt>Plataformas</dt>
              <dd>Switch · <b>Switch 2</b></dd>
            </div>
            <div>
              <dt>Servicios</dt>
              <dd>Streaming · IA</dd>
            </div>
          </dl>
        </div>

        <div className="dw-hero-stage dw-fore" data-depth={-11} data-reveal>
          <div className="dw-hero-tag dw-mono">
            <b>01</b> Destacado de la semana
          </div>
          <CoverObject id="odyssey" />
          <div className="dw-hero-second">
            <CoverObject id="zelda" />
          </div>
        </div>
      </section>

      {/* ---------- ÍNDICE DE UNIVERSOS ---------- */}
      <section className="dw-ch dw-index" id="universos">
        <Art
          className="dw-index-art"
          depth={78}
          layers={[
            { t: 'contour', rings: 18, cx: 0.78, cy: 0.6, r: 0.42, stretch: 1.5, seed: 5, alpha: 0.95 },
            { t: 'scan', x: 0.02, y: 0.06, w: 0.3, h: 0.34, count: 34, alpha: 0.65, dense: 1 },
            { t: 'rules', x: 0.38, y: 0.9, len: 0.4, pitch: 10, size: 6, alpha: 0.6, dense: 1 },
          ]}
        />
        <div className="dw-fore" data-depth={-2} data-reveal>
          <div className="dw-index-head">
            <span className="dw-mono">Índice</span>
            <s />
            <span className="dw-mono">04 áreas</span>
          </div>
          <ul className="dw-rows">
            {[
              ['01', 'Gaming', 'Nintendo Switch y Switch 2, por franquicia y colección', '134 títulos'],
              ['02', 'Streaming', 'Familias de servicio agrupadas por catálogo', 'Consultar'],
              ['03', 'IA', 'Herramientas y suscripciones por caso de uso', 'Consultar'],
              ['04', 'Privacidad', 'Buenas prácticas y servicios asociados', 'Consultar'],
            ].map(([n, name, note, count]) => (
              <li className="dw-row" key={n}>
                <span className="dw-row-n">{n}</span>
                <span className="dw-row-name">{name}</span>
                <span className="dw-row-note">{note}</span>
                <span className="dw-row-count">{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- RAIL 01: destacado + pósters ---------- */}
      <section className="dw-ch dw-rail-sec" id="catalogo">
        <Art
          className="dw-index-art"
          depth={70}
          layers={[
            { t: 'grid', cols: 26, rows: 16, horizon: 0.06, depth: 0.86, spread: 2, warp: 22, freq: 1.8, phase: 1.4, alpha: 0.85 },
            { t: 'rules', x: 0.03, y: 0.12, len: 0.42, pitch: 10, size: 6, vertical: 1, alpha: 0.7, dense: 1 },
          ]}
        />
        <Red
          className="dw-hero-red"
          depth={-19}
          layers={[
            { t: 'plate', x: 0.04, y: 0.34, w: 0.82, h: 0.3, chamfer: 0.22, notch: 0.1 },
            { t: 'slots', x: 0.06, y: 0.38, w: 0.16, count: 5, gap: 7, thickness: 1.8 },
            { t: 'ramp', x: 0.04, y: 0.52, w: 0.82, h: 0.12, count: 16, dir: 'down' },
            { t: 'ticks', x: 0.62, y: 0.36, count: 16, pitch: 8, size: 5 },
            { t: 'bar', x: 0.88, y: 0.42, w: 0.1, h: 2 },
          ]}
        />
        <div className="dw-fore" data-depth={-2} data-reveal>
          <RailHead n="01" title="Destacados Switch 2" more="Ver los 24" />
        </div>
        <div className="dw-rail dw-rail--tall dw-fore" data-depth={-6}>
          <div className="dw-feature">
            <CoverObject id="zelda" wide />
            <div className="dw-feature-body">
              <h3>The Legend of Zelda</h3>
              <p>Aventura · Switch 2 · disponible bajo consulta</p>
            </div>
          </div>
          {(['metroid', 'odyssey', 'splatoon', 'pokemon', 'hades', 'xeno'] as CoverId[]).map((id) => (
            <Item id={id} key={id} />
          ))}
        </div>
      </section>

      {/* ---------- TRANSICIÓN ---------- */}
      <section className="dw-ch dw-quote">
        <Art
          className="dw-quote-art"
          depth={92}
          layers={[
            { t: 'nodes', count: 30, seed: 21, x: 0.05, y: 0.2, w: 0.4, h: 0.5, link: 0.24, alpha: 0.9 },
            { t: 'arcs', count: 3, cx: 0.2, cy: 0.5, r: 0.28, step: 0.3, squash: 0.55, rot: 8, alpha: 0.55 },
          ]}
        />
        <div className="dw-quote-inner dw-fore" data-depth={-3} data-reveal>
          <h2 className="dw-display">
            Detrás de cada portada hay <i>un catálogo entero</i>
          </h2>
          <p>
            Buscas un título, te decimos si lo tenemos y cómo conseguirlo. Sin catálogos falsos ni
            precios inventados.
          </p>
        </div>
      </section>

      {/* ---------- RAIL 02: pósters altos ---------- */}
      <section className="dw-ch dw-rail-sec">
        <Art
          className="dw-index-art"
          depth={58}
          layers={[
            { t: 'grid', cols: 32, rows: 22, horizon: 0.02, depth: 0.95, spread: 1.7, warp: 34, freq: 2.6, phase: 2.2, alpha: 1 },
            { t: 'nodes', count: 18, seed: 33, x: 0.56, y: 0.04, w: 0.4, h: 0.3, link: 0.32, alpha: 0.7, dense: 1 },
          ]}
        />
        <Red
          className="dw-close-red"
          depth={-17}
          layers={[
            { t: 'plate', x: 0.44, y: 0.04, w: 0.12, h: 0.92, chamfer: 0.12, notch: 0 },
            { t: 'slots', x: 0.455, y: 0.42, w: 0.09, count: 7, gap: 9, thickness: 1.8 },
            { t: 'ramp', x: 0.44, y: 0.04, w: 0.12, h: 0.16, count: 12, dir: 'up' },
            { t: 'ticks', x: 0.62, y: 0.5, count: 9, pitch: 9, size: 6 },
          ]}
        />
        <div className="dw-fore" data-depth={-2} data-reveal>
          <RailHead n="02" title="Mundo Mario" more="Ver los 18" />
        </div>
        <div className="dw-rail dw-rail--tall dw-fore" data-depth={-6}>
          {(['odyssey', 'kirby', 'luigi', 'pokemon', 'fire', 'zelda', 'metroid'] as CoverId[]).map((id) => (
            <Item id={id} key={id} />
          ))}
        </div>
      </section>

      {/* ---------- RAIL 03: compacto ---------- */}
      <section className="dw-ch dw-rail-sec">
        <Art
          className="dw-quote-art"
          depth={104}
          layers={[
            { t: 'contour', rings: 14, cx: 0.24, cy: 0.5, r: 0.3, stretch: 1.9, seed: 9, alpha: 0.6 },
            { t: 'scan', x: 0.6, y: 0.5, w: 0.38, h: 0.4, count: 30, alpha: 0.5, dense: 1 },
          ]}
        />
        <Red
          className="dw-hero-red"
          depth={-15}
          layers={[
            { t: 'plate', x: 0.02, y: 0.3, w: 0.9, h: 0.17, chamfer: 0.09, notch: 0.07 },
            { t: 'ramp', x: 0.02, y: 0.4, w: 0.9, h: 0.07, count: 12, dir: 'down' },
            { t: 'slots', x: 0.7, y: 0.32, w: 0.2, count: 4, gap: 6, thickness: 1.6 },
            { t: 'ticks', x: 0.06, y: 0.5, count: 18, pitch: 7, size: 5 },
            { t: 'bar', x: 0.94, y: 0.34, w: 0.05, h: 1.6 },
          ]}
        />
        <div className="dw-fore" data-depth={-2} data-reveal>
          <RailHead n="03" title="RPG y aventuras" more="Ver los 31" />
        </div>
        <div className="dw-rail dw-rail--dense dw-fore" data-depth={-6}>
          {(['hades', 'xeno', 'fire', 'pokemon', 'zelda', 'splatoon', 'luigi', 'metroid', 'kirby'] as CoverId[]).map(
            (id) => (
              <Item id={id} key={id} />
            ),
          )}
        </div>
      </section>

      {/* ---------- CIERRE ---------- */}
      <section className="dw-ch dw-close" id="contacto">
        <Art
          className="dw-close-art"
          depth={74}
          layers={[
            { t: 'grid', cols: 28, rows: 18, horizon: 0.5, depth: 0.46, spread: 2.1, warp: 26, freq: 2, phase: 3.1, alpha: 0.9 },
            { t: 'arcs', count: 4, cx: 0.34, cy: 0.5, r: 0.32, step: 0.24, squash: 0.46, rot: 10, alpha: 0.7 },
            { t: 'rules', x: 0.92, y: 0.24, len: 0.44, pitch: 10, size: 6, vertical: 1, alpha: 0.65, dense: 1 },
          ]}
        />
        <Red
          className="dw-close-red"
          depth={-20}
          layers={[
            { t: 'plate', x: 0.38, y: 0.14, w: 0.3, h: 0.44, chamfer: 0.08, notch: 0 },
            { t: 'aperture', x: 0.47, y: 0.26, w: 0.13, h: 0.05, chamfer: 0.2 },
            { t: 'slots', x: 0.4, y: 0.18, w: 0.09, count: 7, gap: 6, thickness: 1.6 },
            { t: 'ramp', x: 0.38, y: 0.44, w: 0.3, h: 0.14, count: 15, dir: 'down' },
            { t: 'plate', x: 0.14, y: 0.56, w: 0.11, h: 0.11, chamfer: 0.16, notch: 0 },
            { t: 'bar', x: 0.78, y: 0.2, w: 0.09, h: 1.6 },
            { t: 'ticks', x: 0.2, y: 0.3, count: 11, pitch: 8, size: 5 },
          ]}
        />
        <div className="dw-fore" data-depth={-4} data-reveal>
          <h2 className="dw-display">Dinos qué buscas y te decimos si lo tenemos</h2>
          <div className="dw-close-grid">
            <div>
              <h3>Streaming</h3>
              <p>Familias de servicio agrupadas por catálogo, sin afiliación oficial implícita.</p>
              <span>Consultar</span>
            </div>
            <div>
              <h3>IA</h3>
              <p>Suscripciones y herramientas organizadas por caso de uso real.</p>
              <span>Consultar</span>
            </div>
            <div>
              <h3>Privacidad</h3>
              <p>Servicios asociados a buenas prácticas digitales.</p>
              <span>Consultar</span>
            </div>
          </div>
          <div className="dw-cta">
            <a className="dw-btn dw-btn--solid" href="#contacto">Escribir por WhatsApp</a>
          </div>
        </div>
      </section>

      <footer className="dw-footer">
        <div className="dw-logo" style={{ fontSize: 15 }}>
          Game<i />Master
        </div>
        <nav>
          <a href="#catalogo">Catálogo</a>
          <a href="#universos">Streaming</a>
          <a href="#universos">IA</a>
          <a href="#contacto">Contacto</a>
        </nav>
        <p>
          Prototipo visual experimental para evaluar dirección artística. No representa precios,
          disponibilidad, catálogo final ni afiliación con Nintendo u otras marcas de terceros.
        </p>
      </footer>
    </div>
  );
}
