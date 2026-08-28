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

type Mass = { c?: string; shape: number[][]; mshape?: number[][]; inner?: Layer[]; holes?: number[][][]; mholes?: number[][][] };
type Scene = { masses?: Mass[]; layers?: Layer[] };

function Art({ className, depth, scene }: { className: string; depth: number; scene: Scene }) {
  return (
    <div className={`dw-art ${className}`} data-depth={depth} aria-hidden="true">
      <canvas data-art={JSON.stringify(scene)} />
    </div>
  );
}

/* Pieza roja: sistema modular de placas, ranuras, rampas y satélites. */
function Red({ className, depth, scene }: { className: string; depth: number; scene: Scene }) {
  return (
    <div className={`dw-red ${className}`} data-depth={depth} aria-hidden="true">
      <canvas data-red={JSON.stringify(scene)} />
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
          depth={58}
          scene={{
            /* Arquitectura azul: nace fuera del viewport por arriba y por la
               derecha. La retícula va tallada en negro dentro de la masa. */
            masses: [
              {
                c: 'blue',
                shape: [[0.52, -0.05], [1.1, -0.05], [1.1, 0.72], [0.95, 0.72], [0.95, 0.6], [0.74, 0.6], [0.74, 0.68], [0.52, 0.64], [0.46, 0.3]],
                mshape: [[0.34, -0.06], [1.12, -0.06], [1.12, 0.4], [0.72, 0.45], [0.3, 0.24]],
                mholes: [[[0.74, 0.06], [1.0, 0.05], [1.0, 0.13], [0.74, 0.14]]],
                inner: [
                  { t: 'grid', ink: 'black', cols: 26, rows: 18, horizon: 0.4, depth: 0.5, spread: 2.2, warp: 26, freq: 2.2, alpha: 1.5 },
                  { t: 'route', ink: 'black', cols: 6, rows: 4, x: 0.48, y: 0.02, w: 0.6, h: 0.5, seed: 12, alpha: 1.1 },
                ],
                holes: [
                  [[0.66, 0.1], [0.84, 0.1], [0.84, 0.17], [0.66, 0.17]],
                  [[0.56, 0.42], [0.7, 0.42], [0.7, 0.46], [0.56, 0.46]],
                ],
              },
            ],
            layers: [
              { t: 'arcs', count: 5, cx: 0.5, cy: 0.7, r: 0.34, step: 0.24, squash: 0.5, rot: -12, alpha: 0.85 },
              { t: 'route', cols: 5, rows: 3, x: 0.06, y: 0.62, w: 0.34, h: 0.28, seed: 21, alpha: 0.55, dense: 1 },
              { t: 'rules', x: 0.06, y: 0.2, len: 0.34, pitch: 11, size: 7, vertical: 1, alpha: 0.7, dense: 1 },
            ],
          }}
        />
        <Red
          className="dw-hero-red"
          depth={-22}
          scene={{
            /* Banda roja que cruza por detrás de las portadas y sale del
               viewport por la derecha. */
            masses: [
              {
                c: 'red',
                shape: [[0.41, 0.44], [1.08, 0.32], [1.08, 0.6], [0.45, 0.68]],
                mshape: [[0.18, 0.26], [1.12, 0.19], [1.12, 0.38], [0.22, 0.44]],
                mholes: [[[0.8, 0.23], [1.02, 0.22], [1.02, 0.28], [0.8, 0.29]]],
                inner: [{ t: 'rules', ink: 'black', x: 0.44, y: 0.46, len: 0.5, pitch: 13, size: 9, alpha: 1.3 }],
                holes: [[[0.78, 0.36], [0.95, 0.34], [0.95, 0.4], [0.78, 0.42]]],
              },
            ],
            layers: [
              { t: 'plate', x: 0.53, y: 0.14, w: 0.22, h: 0.22, chamfer: 0.08, notch: 0.16 },
              { t: 'slots', x: 0.55, y: 0.18, w: 0.08, count: 6, gap: 6, thickness: 1.6 },
              { t: 'ramp', x: 0.53, y: 0.29, w: 0.22, h: 0.07, count: 12, dir: 'down' },
              { t: 'ticks', x: 0.46, y: 0.72, count: 12, pitch: 8, size: 5 },
            ],
          }}
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
          scene={{
            /* Gran territorio azul bajo el índice, con mapa de rutas tallado:
               es el capítulo "mapa de mundos". El texto queda sobre negro. */
            masses: [
              {
                c: 'blue',
                shape: [[0.66, 0.18], [1.08, 0.12], [1.08, 0.92], [0.78, 1.0], [0.62, 0.6]],
                mshape: [[-0.1, 0.8], [1.12, 0.75], [1.12, 0.94], [-0.1, 0.96]],
                mholes: [[[0.06, 0.84], [0.42, 0.825], [0.42, 0.9], [0.06, 0.915]]],
                inner: [
                  { t: 'route', ink: 'black', cols: 4, rows: 6, x: 0.64, y: 0.16, w: 0.44, h: 0.8, seed: 8, alpha: 1.3 },
                  { t: 'rules', ink: 'black', vertical: 1, x: 0.68, y: 0.24, len: 0.6, pitch: 13, size: 9, alpha: 1.3 },
                ],
                holes: [
                  [[0.7, 0.26], [0.94, 0.23], [0.94, 0.31], [0.7, 0.34]],
                  [[0.72, 0.64], [0.98, 0.62], [0.98, 0.69], [0.72, 0.71]],
                ],
              },
            ],
            layers: [
              { t: 'contour', rings: 12, cx: 0.3, cy: 0.72, r: 0.22, stretch: 1.6, seed: 5, alpha: 0.6, dense: 1 },
            ],
          }}
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
          scene={{
            /* Campo azul continuo detrás de todo el rail: las portadas se
               apoyan sobre él y el rojo queda en medio. */
            masses: [
              {
                c: 'blue',
                shape: [[-0.08, 0.29], [0.5, 0.265], [1.08, 0.285], [1.08, 0.9], [0.46, 0.97], [-0.08, 0.93]],
                mshape: [[-0.1, 0.29], [1.12, 0.27], [1.12, 0.94], [-0.1, 0.98]],
                mholes: [[[0.05, 0.85], [0.44, 0.845], [0.44, 0.93], [0.05, 0.935]]],
                inner: [
                  { t: 'grid', ink: 'black', cols: 30, rows: 16, horizon: 0.26, depth: 0.72, spread: 2.4, warp: 20, freq: 1.8, alpha: 1.6 },
                  { t: 'nodes', ink: 'black', count: 24, seed: 14, x: 0.05, y: 0.8, w: 0.9, h: 0.16, link: 0.3, alpha: 1.3, dense: 1 },
                ],
                holes: [
                  [[0.03, 0.83], [0.22, 0.825], [0.22, 0.91], [0.03, 0.915]],
                  [[0.78, 0.8], [0.99, 0.795], [0.99, 0.87], [0.78, 0.875]],
                ],
              },
            ],
          }}
        />
        <Red
          className="dw-hero-red"
          depth={-19}
          scene={{
            masses: [
              {
                c: 'red',
                shape: [[-0.06, 0.45], [0.66, 0.41], [0.8, 0.53], [0.64, 0.65], [-0.06, 0.69]],
                mshape: [[-0.1, 0.46], [0.78, 0.42], [0.9, 0.55], [-0.1, 0.66]],
                inner: [{ t: 'rules', ink: 'black', x: 0.02, y: 0.49, len: 0.55, pitch: 12, size: 9, alpha: 1.4 }],
                holes: [[[0.46, 0.45], [0.62, 0.44], [0.62, 0.49], [0.46, 0.5]]],
              },
            ],
            layers: [
              { t: 'ramp', x: -0.06, y: 0.6, w: 0.72, h: 0.09, count: 14, dir: 'down' },
              { t: 'ticks', x: 0.78, y: 0.56, count: 12, pitch: 8, size: 5 },
              { t: 'bar', x: 0.88, y: 0.48, w: 0.1, h: 1.8 },
            ],
          }}
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
          scene={{
            masses: [
              {
                c: 'red',
                shape: [[-0.08, 0.8], [1.08, 0.68], [1.08, 0.99], [-0.08, 0.99]],
                mshape: [[-0.1, 0.82], [1.12, 0.76], [1.12, 0.99], [-0.1, 0.99]],
                inner: [
                  { t: 'signal', ink: 'black', x: 0.02, y: 0.86, w: 0.7, h: 0.15, lanes: 3, pitch: 14, seed: 9, alpha: 1.3 },
                ],
                holes: [
                  [[0.16, 0.88], [0.38, 0.86], [0.38, 0.93], [0.16, 0.95]],
                  [[0.72, 0.8], [0.96, 0.77], [0.96, 0.83], [0.72, 0.86]],
                ],
              },
            ],
            layers: [
              { t: 'nodes', count: 26, seed: 21, x: 0.04, y: 0.16, w: 0.38, h: 0.44, link: 0.26, alpha: 0.9 },
              { t: 'arcs', count: 3, cx: 0.22, cy: 0.3, r: 0.24, step: 0.3, squash: 0.55, rot: 8, alpha: 0.5, dense: 1 },
            ],
          }}
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
          scene={{
            masses: [
              {
                c: 'blue',
                shape: [[0.58, 0.29], [1.08, 0.255], [1.08, 0.9], [0.68, 0.95], [0.52, 0.6]],
                mshape: [[-0.1, 0.3], [1.12, 0.27], [1.12, 0.9], [-0.1, 0.95]],
                mholes: [[[0.58, 0.82], [1.0, 0.815], [1.0, 0.89], [0.58, 0.895]]],
                inner: [
                  { t: 'grid', ink: 'black', cols: 24, rows: 16, horizon: 0.26, depth: 0.68, spread: 1.9, warp: 22, freq: 2.4, alpha: 1.6 },
                  { t: 'signal', ink: 'black', x: 0.6, y: 0.79, w: 0.44, h: 0.13, lanes: 3, pitch: 13, seed: 17, alpha: 1.2, dense: 1 },
                ],
                holes: [
                  [[0.63, 0.32], [0.86, 0.31], [0.86, 0.38], [0.63, 0.39]],
                  [[0.72, 0.82], [0.98, 0.81], [0.98, 0.88], [0.72, 0.89]],
                ],
              },
            ],
            layers: [
              { t: 'route', cols: 5, rows: 3, x: 0.08, y: 0.5, w: 0.32, h: 0.28, seed: 33, alpha: 0.6, dense: 1 },
            ],
          }}
        />
        <Red
          className="dw-close-red"
          depth={-17}
          scene={{
            masses: [
              {
                c: 'red',
                shape: [[0.36, 0.28], [0.53, 0.26], [0.49, 0.84], [0.32, 0.82]],
                mshape: [[0.2, 0.29], [0.42, 0.275], [0.38, 0.87], [0.16, 0.855]],
                inner: [{ t: 'rules', ink: 'black', vertical: 1, x: 0.37, y: 0.32, len: 0.48, pitch: 12, size: 10, alpha: 1.4 }],
                holes: [
                  [[0.33, 0.45], [0.52, 0.445], [0.52, 0.49], [0.33, 0.495]],
                  [[0.33, 0.65], [0.51, 0.645], [0.51, 0.685], [0.33, 0.69]],
                ],
              },
            ],
            layers: [
              { t: 'ramp', x: 0.32, y: 0.26, w: 0.21, h: 0.11, count: 12, dir: 'up' },
              { t: 'ticks', x: 0.58, y: 0.5, count: 9, pitch: 9, size: 6 },
            ],
          }}
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
          scene={{
            layers: [
              { t: 'contour', rings: 14, cx: 0.2, cy: 0.5, r: 0.28, stretch: 1.9, seed: 9, alpha: 0.6 },
              { t: 'signal', x: 0.58, y: 0.52, w: 0.4, h: 0.3, lanes: 5, pitch: 9, seed: 4, alpha: 0.55, dense: 1 },
            ],
          }}
        />
        <Red
          className="dw-hero-red"
          depth={-15}
          scene={{
            masses: [
              {
                c: 'red',
                shape: [[-0.08, 0.34], [1.08, 0.325], [1.08, 0.66], [-0.08, 0.74]],
                mshape: [[-0.1, 0.35], [1.12, 0.33], [1.12, 0.64], [-0.1, 0.7]],
                inner: [
                  { t: 'route', ink: 'black', cols: 10, rows: 3, x: -0.05, y: 0.36, w: 1.1, h: 0.34, seed: 27, alpha: 1.2 },
                ],
                holes: [
                  [[0.08, 0.37], [0.28, 0.368], [0.28, 0.43], [0.08, 0.432]],
                  [[0.72, 0.36], [0.94, 0.358], [0.94, 0.41], [0.72, 0.412]],
                ],
              },
            ],
            layers: [
              { t: 'ramp', x: -0.08, y: 0.62, w: 1.16, h: 0.11, count: 14, dir: 'down' },
              { t: 'ticks', x: 0.3, y: 0.75, count: 20, pitch: 8, size: 5 },
            ],
          }}
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
          scene={{
            masses: [
              {
                c: 'blue',
                shape: [[0.64, 0.14], [1.08, 0.08], [1.08, 0.98], [0.74, 1.04], [0.6, 0.5]],
                mshape: [[-0.1, 0.76], [1.12, 0.72], [1.12, 1.08], [-0.1, 1.08]],
                inner: [
                  { t: 'grid', ink: 'black', cols: 22, rows: 16, horizon: 0.16, depth: 0.8, spread: 1.6, warp: 22, freq: 2, alpha: 1.6 },
                  { t: 'nodes', ink: 'black', count: 20, seed: 41, x: 0.62, y: 0.2, w: 0.44, h: 0.7, link: 0.22, alpha: 1.3, dense: 1 },
                ],
                holes: [[[0.68, 0.3], [0.92, 0.27], [0.92, 0.36], [0.68, 0.39]]],
              },
            ],
            layers: [
              { t: 'arcs', count: 4, cx: 0.24, cy: 0.72, r: 0.26, step: 0.26, squash: 0.46, rot: 10, alpha: 0.6, dense: 1 },
            ],
          }}
        />
        <Red
          className="dw-close-red"
          depth={-20}
          scene={{
            masses: [
              {
                c: 'red',
                shape: [[0.52, 0.36], [0.84, 0.3], [0.86, 0.62], [0.56, 0.68], [0.5, 0.5]],
                mshape: [[0.5, 0.78], [0.98, 0.73], [1.0, 0.95], [0.54, 1.0]],
                inner: [{ t: 'signal', ink: 'black', x: 0.53, y: 0.4, w: 0.3, h: 0.16, lanes: 3, pitch: 12, seed: 11, alpha: 1.4 }],
                holes: [[[0.6, 0.56], [0.8, 0.53], [0.8, 0.59], [0.6, 0.62]]],
              },
            ],
            layers: [
              { t: 'ramp', x: 0.5, y: 0.56, w: 0.37, h: 0.12, count: 14, dir: 'down' },
              { t: 'plate', x: 0.88, y: 0.42, w: 0.08, h: 0.08, chamfer: 0.16, notch: 0 },
              { t: 'ticks', x: 0.53, y: 0.72, count: 11, pitch: 8, size: 5 },
            ],
          }}
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
