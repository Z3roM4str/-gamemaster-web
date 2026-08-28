/**
 * Motor visual — v3.
 *
 * Cambio de criterio respecto a v2: el rasterizado 1-bit con píxel virtual de
 * 3-4px producía inevitablemente lectura de "imagen ampliada". Aquí se dibuja
 * a resolución de dispositivo con trazo vectorial fino (0.5-1.4px). El color
 * sigue siendo puro; la jerarquía la lleva el GROSOR y la DENSIDAD de línea,
 * y grandes áreas nunca se rellenan con azul translúcido (eso era lo que
 * ensuciaba el azul a marino).
 *
 * El azul se compone por capas —retícula en perspectiva, trayectorias, nodos,
 * curvas de nivel, reglas de medida, barridos— con zonas densas, zonas
 * tenues y vacíos negros. Es composición, no patrón repetido.
 *
 * El rojo se construye como sistema modular: placas sólidas achaflanadas con
 * muescas, ranuras caladas, disolución por rampa de frecuencia y elementos
 * satélite. Sigue siendo masa opaca para que las portadas la ocluyan.
 *
 * Planos: negro (vacío) <- AZUL (fondo) <- ROJO (intermedio) <- portadas.
 * Cada objeto existe una sola vez; nada se duplica ni desplaza en dos colores.
 */

const BLUE = '27, 52, 255';
const BLUE_HI = '92, 122, 255';
const RED = '#ff2020';

type Layer = Record<string, number | string | undefined>;
type Spec = { layers?: Layer[] };

/* ---------- utilidades ---------- */

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function smooth(a: number, b: number, t: number) {
  const x = clamp01((t - a) / (b - a || 1));
  return x * x * (3 - 2 * x);
}

/** Ruido determinista: la composición no cambia entre repintados. */
function rnd(seed: number) {
  let s = seed * 9301 + 49297;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function num(l: Layer, k: string, d: number) {
  const v = l[k];
  return typeof v === 'number' ? v : d;
}

/* ---------- capas azules ---------- */

/** Retícula en perspectiva: escala y profundidad, líneas de 0.6px. */
function layerGrid(ctx: CanvasRenderingContext2D, W: number, H: number, l: Layer) {
  const cols = num(l, 'cols', 26);
  const rows = num(l, 'rows', 18);
  const horizon = num(l, 'horizon', 0.16);
  const depth = num(l, 'depth', 0.92);
  const spread = num(l, 'spread', 1.9);
  const warp = num(l, 'warp', 26);
  const freq = num(l, 'freq', 2.2);
  const phase = num(l, 'phase', 0);
  const a = num(l, 'alpha', 1);
  const flip = num(l, 'flip', 0) ? -1 : 1;

  const pts: [number, number][][] = [];
  for (let r = 0; r <= rows; r++) {
    const t = r / rows;
    const s = 0.06 + Math.pow(t, 2.2) * 1.5;
    const yBase = H * horizon + flip * Math.pow(t, 2) * H * depth;
    const row: [number, number][] = [];
    for (let c = 0; c <= cols; c++) {
      const u = c / cols - 0.5;
      const w = Math.sin(u * freq * Math.PI + phase) * Math.cos(t * 3.1 + phase);
      row.push([W / 2 + u * W * spread * s, yBase - w * warp * s * flip]);
    }
    pts.push(row);
  }

  ctx.lineCap = 'butt';
  for (let r = 0; r <= rows; r++) {
    const t = r / rows;
    ctx.beginPath();
    pts[r].forEach((p, i) => (i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])));
    ctx.lineWidth = 0.55 + t * 0.5;
    ctx.strokeStyle = `rgba(${BLUE}, ${(0.06 + t * 0.5) * a})`;
    ctx.stroke();
  }
  for (let c = 0; c <= cols; c++) {
    ctx.beginPath();
    for (let r = 0; r <= rows; r++) {
      const p = pts[r][c];
      r ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]);
    }
    ctx.lineWidth = 0.55;
    ctx.strokeStyle = `rgba(${BLUE}, ${0.2 * a})`;
    ctx.stroke();
  }
}

/** Trayectorias: pocos arcos larguísimos que salen del lienzo. */
function layerArcs(ctx: CanvasRenderingContext2D, W: number, H: number, l: Layer) {
  const n = num(l, 'count', 4);
  const cx = W * num(l, 'cx', 0.5);
  const cy = H * num(l, 'cy', 0.55);
  const base = num(l, 'r', 0.5) * Math.max(W, H);
  const step = num(l, 'step', 0.22);
  const squash = num(l, 'squash', 0.42);
  const rot = (num(l, 'rot', -12) * Math.PI) / 180;
  const a = num(l, 'alpha', 1);

  for (let i = 0; i < n; i++) {
    const r = base * (1 + i * step);
    ctx.beginPath();
    ctx.ellipse(cx, cy, r, r * squash, rot, 0, Math.PI * 2);
    ctx.lineWidth = i === 0 ? 1.1 : 0.6;
    ctx.strokeStyle = `rgba(${BLUE}, ${(0.34 - i * 0.05) * a})`;
    ctx.stroke();
  }
}

/** Red de nodos: puntos pequeños, cuerdas cortas, marcadores cuadrados. */
function layerNodes(ctx: CanvasRenderingContext2D, W: number, H: number, l: Layer) {
  const n = num(l, 'count', 22);
  const seed = num(l, 'seed', 7);
  const x0 = W * num(l, 'x', 0);
  const y0 = H * num(l, 'y', 0);
  const w = W * num(l, 'w', 1);
  const h = H * num(l, 'h', 1);
  const link = num(l, 'link', 0.26) * Math.min(w, h);
  const a = num(l, 'alpha', 1);
  const r = rnd(seed);

  const pts: [number, number][] = [];
  for (let i = 0; i < n; i++) pts.push([x0 + r() * w, y0 + r() * h]);

  ctx.lineWidth = 0.55;
  ctx.strokeStyle = `rgba(${BLUE}, ${0.3 * a})`;
  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dx = pts[i][0] - pts[j][0];
      const dy = pts[i][1] - pts[j][1];
      if (Math.hypot(dx, dy) < link) {
        ctx.moveTo(pts[i][0], pts[i][1]);
        ctx.lineTo(pts[j][0], pts[j][1]);
      }
    }
  }
  ctx.stroke();

  pts.forEach((p, i) => {
    if (i % 5 === 0) {
      ctx.strokeStyle = `rgba(${BLUE_HI}, ${0.7 * a})`;
      ctx.lineWidth = 0.9;
      ctx.strokeRect(p[0] - 2.5, p[1] - 2.5, 5, 5);
    } else {
      ctx.fillStyle = `rgba(${BLUE_HI}, ${0.55 * a})`;
      ctx.fillRect(p[0] - 0.9, p[1] - 0.9, 1.8, 1.8);
    }
  });
}

/** Curvas de nivel: topografía confinada a una región, no a todo el lienzo. */
function layerContour(ctx: CanvasRenderingContext2D, W: number, H: number, l: Layer) {
  const rings = num(l, 'rings', 16);
  const cx = W * num(l, 'cx', 0.5);
  const cy = H * num(l, 'cy', 0.5);
  const base = num(l, 'r', 0.3) * Math.min(W, H);
  const stretch = num(l, 'stretch', 1.6);
  const seed = num(l, 'seed', 3);
  const a = num(l, 'alpha', 1);
  const r = rnd(seed);
  const k = [r(), r(), r()];

  for (let i = 0; i < rings; i++) {
    const g = (i + 1) / rings;
    ctx.beginPath();
    for (let s = 0; s <= 220; s++) {
      const th = (s / 220) * Math.PI * 2;
      const wob =
        1 +
        Math.sin(th * 3 + k[0] * 6 + i * 0.3) * 0.1 +
        Math.sin(th * 5 - k[1] * 6 - i * 0.2) * 0.055 +
        Math.sin(th * 9 + k[2] * 6) * 0.02;
      const rr = base * (0.18 + g) * wob;
      const x = cx + Math.cos(th) * rr * stretch;
      const y = cy + Math.sin(th) * rr;
      s ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.closePath();
    ctx.lineWidth = i % 4 === 0 ? 0.95 : 0.55;
    ctx.strokeStyle = `rgba(${BLUE}, ${(i % 4 === 0 ? 0.4 : 0.2) * a})`;
    ctx.stroke();
  }
}

/** Reglas de medida: banda de marcas cortas, alta frecuencia, muy fina. */
function layerRules(ctx: CanvasRenderingContext2D, W: number, H: number, l: Layer) {
  const vertical = num(l, 'vertical', 0) === 1;
  const x0 = W * num(l, 'x', 0);
  const y0 = H * num(l, 'y', 0);
  const len = (vertical ? H : W) * num(l, 'len', 1);
  const pitch = num(l, 'pitch', 9);
  const size = num(l, 'size', 7);
  const a = num(l, 'alpha', 1);
  const count = Math.floor(len / pitch);

  ctx.lineWidth = 0.7;
  for (let i = 0; i <= count; i++) {
    const major = i % 10 === 0;
    const mid = i % 5 === 0;
    const s = major ? size * 2.1 : mid ? size * 1.35 : size;
    ctx.strokeStyle = `rgba(${major ? BLUE_HI : BLUE}, ${(major ? 0.6 : 0.26) * a})`;
    ctx.beginPath();
    if (vertical) {
      const y = y0 + i * pitch;
      ctx.moveTo(x0, y);
      ctx.lineTo(x0 + s, y);
    } else {
      const x = x0 + i * pitch;
      ctx.moveTo(x, y0);
      ctx.lineTo(x, y0 + s);
    }
    ctx.stroke();
  }
}

/** Barrido: líneas horizontales cuyo espaciado se abre progresivamente. */
function layerScan(ctx: CanvasRenderingContext2D, W: number, H: number, l: Layer) {
  const x0 = W * num(l, 'x', 0);
  const w = W * num(l, 'w', 1);
  const y0 = H * num(l, 'y', 0);
  const h = H * num(l, 'h', 0.4);
  const n = num(l, 'count', 40);
  const a = num(l, 'alpha', 1);

  ctx.lineWidth = 0.6;
  for (let i = 0; i < n; i++) {
    const t = i / (n - 1);
    const y = y0 + Math.pow(t, 1.9) * h;
    ctx.strokeStyle = `rgba(${BLUE}, ${(0.32 * (1 - t) + 0.03) * a})`;
    ctx.beginPath();
    ctx.moveTo(x0, y);
    ctx.lineTo(x0 + w * (1 - t * 0.35), y);
    ctx.stroke();
  }
}

/* ---------- sistema rojo ---------- */

/** Rectángulo achaflanado con muesca opcional: pieza de un sistema, no mancha. */
function platePath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  ch: number,
  notch: number,
) {
  const c = Math.min(ch, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + c, y);
  if (notch > 0) {
    ctx.lineTo(x + w * (0.52 - notch / 2), y);
    ctx.lineTo(x + w * (0.52 - notch / 2), y + h * 0.13);
    ctx.lineTo(x + w * (0.52 + notch / 2), y + h * 0.13);
    ctx.lineTo(x + w * (0.52 + notch / 2), y);
  }
  ctx.lineTo(x + w - c, y);
  ctx.lineTo(x + w, y + c);
  ctx.lineTo(x + w, y + h - c);
  ctx.lineTo(x + w - c, y + h);
  ctx.lineTo(x + c, y + h);
  ctx.lineTo(x, y + h - c);
  ctx.lineTo(x, y + c);
  ctx.closePath();
}

function paintRed(ctx: CanvasRenderingContext2D, W: number, H: number, spec: Spec) {
  const layers = spec.layers ?? [];

  // 1. Placas sólidas: la masa que las portadas ocluyen.
  for (const l of layers) {
    if (l.t !== 'plate') continue;
    const x = W * num(l, 'x', 0);
    const y = H * num(l, 'y', 0);
    const w = W * num(l, 'w', 0.5);
    const h = H * num(l, 'h', 0.3);
    ctx.save();
    platePath(ctx, x, y, w, h, num(l, 'chamfer', 0.06) * Math.min(w, h), num(l, 'notch', 0));
    ctx.fillStyle = RED;
    ctx.fill();
    ctx.restore();
  }

  // 2. Sustracción: ranuras finas y rampa de frecuencia. Calado, no borrón.
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  for (const l of layers) {
    if (l.t === 'slots') {
      const x = W * num(l, 'x', 0);
      const y = H * num(l, 'y', 0);
      const w = W * num(l, 'w', 0.3);
      const n = num(l, 'count', 6);
      const gap = num(l, 'gap', 9);
      const th = num(l, 'thickness', 2.5);
      for (let i = 0; i < n; i++) {
        const k = i / Math.max(1, n - 1);
        ctx.fillStyle = '#000';
        ctx.fillRect(x + w * 0.06 * k, y + i * gap, w * (1 - 0.18 * k), th);
      }
    }
    if (l.t === 'ramp') {
      // Barras que engordan hacia el borde: disolución de alta frecuencia,
      // mucho más fina que un halftone de puntos.
      const x = W * num(l, 'x', 0);
      const w = W * num(l, 'w', 1);
      const y = H * num(l, 'y', 0);
      const h = H * num(l, 'h', 0.3);
      const n = num(l, 'count', 26);
      const dir = String(l.dir ?? 'down');
      for (let i = 0; i < n; i++) {
        const t = i / (n - 1);
        const k = smooth(0, 1, t);
        const band = h / n;
        const cut = band * (0.12 + k * 0.86);
        const yy = dir === 'up' ? y + h - (i + 1) * band : y + i * band;
        ctx.fillStyle = '#000';
        ctx.fillRect(x, yy, w, cut);
      }
    }
    if (l.t === 'aperture') {
      const x = W * num(l, 'x', 0);
      const y = H * num(l, 'y', 0);
      const w = W * num(l, 'w', 0.1);
      const h = H * num(l, 'h', 0.1);
      platePath(ctx, x, y, w, h, num(l, 'chamfer', 0.14) * Math.min(w, h), 0);
      ctx.fillStyle = '#000';
      ctx.fill();
    }
  }
  ctx.restore();

  // 3. Satélites: reglas y marcas que pertenecen al mismo sistema.
  for (const l of layers) {
    if (l.t === 'bar') {
      ctx.fillStyle = RED;
      ctx.fillRect(W * num(l, 'x', 0), H * num(l, 'y', 0), W * num(l, 'w', 0.1), num(l, 'h', 2));
    }
    if (l.t === 'ticks') {
      const x = W * num(l, 'x', 0);
      const y = H * num(l, 'y', 0);
      const n = num(l, 'count', 10);
      const pitch = num(l, 'pitch', 10);
      const size = num(l, 'size', 6);
      ctx.fillStyle = RED;
      for (let i = 0; i < n; i++) {
        const major = i % 4 === 0;
        ctx.fillRect(x + i * pitch, y, 1.4, major ? size * 1.9 : size);
      }
    }
    if (l.t === 'frame') {
      ctx.strokeStyle = RED;
      ctx.lineWidth = num(l, 'lw', 1.2);
      ctx.strokeRect(W * num(l, 'x', 0), H * num(l, 'y', 0), W * num(l, 'w', 0.2), H * num(l, 'h', 0.2));
    }
  }
}

/* ---------- pintado ---------- */

function paint(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) return;

  const isRed = canvas.dataset.red !== undefined;
  let spec: Spec = {};
  try {
    const raw = isRed ? canvas.dataset.red : canvas.dataset.art;
    spec = raw ? (JSON.parse(raw) as Spec) : {};
  } catch {
    spec = {};
  }

  // El arte es trazo fino: 1.5x ya es nítido y recorta ~44% de memoria de
  // lienzo frente a 2x, que en estos tamaños es lo que pesa en móvil.
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);
  ctx.lineJoin = 'miter';

  const W = rect.width;
  const H = rect.height;

  if (isRed) {
    paintRed(ctx, W, H, spec);
    return;
  }

  const compact = window.innerWidth <= 720;
  for (const l of spec.layers ?? []) {
    // En móvil se retiran las capas marcadas como densas.
    if (compact && num(l, 'dense', 0) === 1) continue;
    switch (l.t) {
      case 'grid':
        layerGrid(ctx, W, H, l);
        break;
      case 'arcs':
        layerArcs(ctx, W, H, l);
        break;
      case 'nodes':
        layerNodes(ctx, W, H, l);
        break;
      case 'contour':
        layerContour(ctx, W, H, l);
        break;
      case 'rules':
        layerRules(ctx, W, H, l);
        break;
      case 'scan':
        layerScan(ctx, W, H, l);
        break;
    }
  }
}

/* ---------- parallax con inercia ---------- */

export function mountDepthWorld(root: HTMLElement) {
  const canvases = Array.from(
    root.querySelectorAll<HTMLCanvasElement>('canvas[data-art], canvas[data-red]'),
  );
  const layers = Array.from(root.querySelectorAll<HTMLElement>('[data-depth]'));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  const paintAll = () => canvases.forEach(paint);
  paintAll();

  let resizeTimer = 0;
  const onResize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(paintAll, 200);
  };
  window.addEventListener('resize', onResize);

  // Revelado al entrar en viewport: continuidad, no bloques que aparecen.
  const reveal = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
  let io: IntersectionObserver | undefined;
  if (reveal.length && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io?.unobserve(e.target);
          }
        }
      },
      { rootMargin: '-8% 0px -12% 0px' },
    );
    reveal.forEach((el) => io?.observe(el));
  } else {
    reveal.forEach((el) => el.classList.add('is-in'));
  }

  if (reduce.matches) {
    layers.forEach((el) => (el.style.transform = 'none'));
    return () => {
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer);
      io?.disconnect();
    };
  }

  // Cada capa persigue su objetivo con retardo: el movimiento gana inercia y
  // deja de sentirse pegado 1:1 al scroll.
  //
  // La posición en documento se cachea. Leer getBoundingClientRect() de cada
  // capa en cada frame, intercalado con escrituras de transform, fuerza un
  // reflow por capa y hundía el frame por encima de 20ms. Aquí sólo se mide
  // al montar y al redimensionar; el bucle es aritmética pura.
  const state = layers.map(() => ({ cur: 0, tgt: 0, center: 0, depth: 0 }));
  let raf = 0;
  let settled = false;

  const measure = () => {
    const sy = window.scrollY;
    layers.forEach((el, i) => {
      const r = el.getBoundingClientRect();
      state[i].center = r.top + sy + r.height / 2 - state[i].cur;
      state[i].depth = parseFloat(el.dataset.depth ?? '0');
    });
  };

  const retarget = () => {
    const vh = window.innerHeight;
    const sy = window.scrollY;
    const damp = window.innerWidth <= 720 ? 0.55 : 1;
    for (let i = 0; i < state.length; i++) {
      const s = state[i];
      s.tgt = -((s.center - sy - vh / 2) / vh) * s.depth * damp;
    }
  };

  const tick = () => {
    retarget();
    let moving = false;
    for (let i = 0; i < layers.length; i++) {
      const s = state[i];
      const d = s.tgt - s.cur;
      if (Math.abs(d) > 0.05) {
        s.cur += d * 0.085;
        moving = true;
      } else {
        s.cur = s.tgt;
      }
      layers[i].style.transform = `translate3d(0, ${s.cur.toFixed(2)}px, 0)`;
    }
    if (moving || !settled) {
      settled = !moving;
      raf = requestAnimationFrame(tick);
    } else {
      raf = 0;
    }
  };

  const wake = () => {
    settled = false;
    if (!raf) raf = requestAnimationFrame(tick);
  };

  const remeasure = () => {
    measure();
    wake();
  };

  measure();
  retarget();
  layers.forEach((el, i) => {
    state[i].cur = state[i].tgt;
    el.style.transform = `translate3d(0, ${state[i].cur.toFixed(2)}px, 0)`;
  });
  window.addEventListener('scroll', wake, { passive: true });
  window.addEventListener('resize', remeasure);

  return () => {
    window.removeEventListener('scroll', wake);
    window.removeEventListener('resize', remeasure);
    window.removeEventListener('resize', onResize);
    window.clearTimeout(resizeTimer);
    io?.disconnect();
    if (raf) cancelAnimationFrame(raf);
  };
}
