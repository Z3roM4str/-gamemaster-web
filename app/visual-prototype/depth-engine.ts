/**
 * Motor de profundidad — rasterizado 1-bit.
 *
 * Regla aprendida de las referencias: el color NUNCA se diluye. No hay
 * gradientes, alpha ni mezclas. Solo existen tres valores: negro, rojo puro
 * y azul puro. El tono se consigue con TRAMADO ORDENADO (Bayer 8x8): más o
 * menos píxeles del mismo color puro sobre negro. Un azul con alpha 0.2 se
 * convierte en marino sucio y destruye el efecto; un azul puro tramado al
 * 20% sigue siendo azul puro y se lee como lejanía.
 *
 * Por eso todo se dibuja a mano en un búfer de píxeles virtuales y se escala
 * con imageSmoothingEnabled=false: sin antialias, bordes duros, color exacto.
 *
 * Planos: negro (vacío) <- AZUL (mundo posterior) <- ROJO (plano intermedio)
 * <- portadas (plano más cercano). Cada objeto existe una sola vez: la
 * profundidad viene de oclusión y densidad, nunca de copias desplazadas.
 */

type RGB = [number, number, number];
type Pt = [number, number];

const RED: RGB = [255, 30, 30];
const BLUE: RGB = [22, 22, 255];

/** Matriz de Bayer 8x8 normalizada: umbral de tramado por posición. */
const BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44, 4, 36, 14, 46, 6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
  3, 35, 11, 43, 1, 33, 9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47, 7, 39, 13, 45, 5, 37,
  63, 31, 55, 23, 61, 29, 53, 21,
].map((v) => (v + 0.5) / 64);

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

function smooth(a: number, b: number, t: number) {
  const x = clamp01((t - a) / (b - a || 1));
  return x * x * (3 - 2 * x);
}

/* ---------------- búfer de píxeles ---------------- */

type Bmp = { w: number; h: number; data: Uint8ClampedArray };

function makeBmp(w: number, h: number): Bmp {
  return { w, h, data: new Uint8ClampedArray(w * h * 4) };
}

function plot(b: Bmp, x: number, y: number, c: RGB) {
  if (x < 0 || y < 0 || x >= b.w || y >= b.h) return;
  const i = ((y | 0) * b.w + (x | 0)) * 4;
  b.data[i] = c[0];
  b.data[i + 1] = c[1];
  b.data[i + 2] = c[2];
  b.data[i + 3] = 255;
}

/** Dibuja el píxel solo si la densidad supera el umbral de tramado. */
function ink(b: Bmp, x: number, y: number, c: RGB, density: number) {
  if (density <= 0) return;
  if (density >= 1 || BAYER[((y | 0) & 7) * 8 + ((x | 0) & 7)] < density) plot(b, x, y, c);
}

function inkLine(b: Bmp, x0: number, y0: number, x1: number, y1: number, c: RGB, density: number) {
  let x = x0 | 0;
  let y = y0 | 0;
  const xe = x1 | 0;
  const ye = y1 | 0;
  const dx = Math.abs(xe - x);
  const dy = -Math.abs(ye - y);
  const sx = x < xe ? 1 : -1;
  const sy = y < ye ? 1 : -1;
  let err = dx + dy;
  let guard = 0;
  for (;;) {
    ink(b, x, y, c, density);
    if ((x === xe && y === ye) || guard++ > 20000) break;
    const e2 = 2 * err;
    if (e2 >= dy) {
      err += dy;
      x += sx;
    }
    if (e2 <= dx) {
      err += dx;
      y += sy;
    }
  }
}

/* ---------------- mundos azules ---------------- */

type FieldOptions = {
  kind?: string;
  horizon?: number;
  reach?: number;
  spread?: number;
  amp?: number;
  freq?: number;
  phase?: number;
  cols?: number;
  rows?: number;
  /** Densidad global del campo: sustituye a cualquier opacidad. */
  density?: number;
  tile?: number;
  cx?: number;
  cy?: number;
  radius?: number;
  scale?: number;
  stretch?: number;
  rings?: number;
};

/** Malla en perspectiva: estructura, sensación de vastedad. */
function paintMesh(b: Bmp, o: FieldOptions) {
  const W = b.w;
  const H = b.h;
  const cols = o.cols ?? 30;
  const rows = o.rows ?? 22;
  const horizon = o.horizon ?? 0.1;
  const reach = o.reach ?? 1;
  const spread = o.spread ?? 1.4;
  const amp = (o.amp ?? 64) * (H / 900);
  const freq = o.freq ?? 6.5;
  const phase = o.phase ?? 0;
  const dens = o.density ?? 1;

  const grid: Pt[][] = [];
  for (let r = 0; r <= rows; r++) {
    const t = r / rows;
    const s = 0.12 + Math.pow(t, 1.9) * 1.9;
    const rowY = H * horizon + Math.pow(t, 1.75) * H * reach;
    const line: Pt[] = [];
    for (let c = 0; c <= cols; c++) {
      const u = c / cols - 0.5;
      const wave =
        Math.sin(u * freq + phase) * Math.cos(t * 5.2 + phase * 0.6) +
        Math.sin(u * freq * 2.3 - phase * 1.4) * 0.35;
      line.push([W / 2 + u * W * spread * s, rowY - wave * amp * s]);
    }
    grid.push(line);
  }

  // Horizontales: lo lejano no se aclara, se trama menos.
  for (let r = 0; r <= rows; r++) {
    const t = r / rows;
    const d = (0.16 + t * 0.84) * dens;
    for (let c = 0; c < cols; c++) {
      inkLine(b, grid[r][c][0], grid[r][c][1], grid[r][c + 1][0], grid[r][c + 1][1], BLUE, d);
    }
  }
  // Verticales
  for (let c = 0; c <= cols; c++) {
    for (let r = 0; r < rows; r++) {
      const t = r / rows;
      const d = (0.1 + t * 0.6) * dens;
      inkLine(b, grid[r][c][0], grid[r][c][1], grid[r + 1][c][0], grid[r + 1][c][1], BLUE, d);
    }
  }
}

/**
 * Campo de ornamento teselado: así es como el azul ocupa ÁREA sin dejar de
 * ser azul puro. La densidad decae hacia los bordes por tramado, no por
 * transparencia, de modo que nunca corta en seco contra el negro.
 */
function paintOrnament(b: Bmp, o: FieldOptions) {
  const W = b.w;
  const H = b.h;
  const T = Math.max(8, Math.round(o.tile ?? 30));
  const dens = o.density ?? 1;
  const cx = W * (o.cx ?? 0.5);
  const cy = H * (o.cy ?? 0.5);
  const R = Math.max(W, H) * (o.radius ?? 0.8);
  const half = T / 2;

  for (let y = 0; y < H; y++) {
    const dy = (y - cy) / R;
    for (let x = 0; x < W; x++) {
      const dx = (x - cx) / R;
      const env = clamp01(1.18 - Math.sqrt(dx * dx + dy * dy) * 1.25) * dens;
      if (env <= 0.02) continue;

      const u = (x % T) - half;
      const v = (y % T) - half;
      const diamond = Math.abs(u) + Math.abs(v);
      let weight = 0;
      // anillo romboidal
      if (Math.abs(diamond - half * 0.72) < 1.2) weight = 1;
      // barras en cruz
      else if ((Math.abs(u) < 1.2 || Math.abs(v) < 1.2) && diamond < half * 0.5) weight = 0.92;
      // núcleo
      else if (diamond < half * 0.14) weight = 1;
      // marcas de esquina
      else if (Math.abs(Math.abs(u) - half * 0.86) < 1 && Math.abs(Math.abs(v) - half * 0.86) < 1) weight = 0.7;
      if (!weight) continue;

      ink(b, x, y, BLUE, env * weight);
    }
  }
}

/** Curvas de nivel: topografía como estructura de línea. */
function paintContour(b: Bmp, o: FieldOptions) {
  const W = b.w;
  const H = b.h;
  const rings = o.rings ?? 24;
  const cx = W * (o.cx ?? 0.5);
  const cy = H * (o.cy ?? 0.5);
  const scale = o.scale ?? 1;
  const stretch = o.stretch ?? 1.5;
  const dens = o.density ?? 1;
  const base = Math.min(W, H);

  for (let i = 0; i < rings; i++) {
    const rr = (i + 1) / rings;
    const d = (i % 5 === 0 ? 0.95 : 0.3 + rr * 0.45) * dens;
    let px = 0;
    let py = 0;
    for (let a = 0; a <= 200; a++) {
      const th = (a / 200) * Math.PI * 2;
      const wob =
        1 +
        Math.sin(th * 3 + i * 0.45) * 0.11 +
        Math.sin(th * 5 - i * 0.28) * 0.06 +
        Math.sin(th * 8 + i * 0.9) * 0.03;
      const Rr = rr * base * scale * wob;
      const x = cx + Math.cos(th) * Rr * stretch;
      const y = cy + Math.sin(th) * Rr;
      if (a) inkLine(b, px, py, x, y, BLUE, d);
      px = x;
      py = y;
    }
  }
}

/* ---------------- masas rojas ---------------- */

type RedOptions = {
  shape?: Pt[];
  engrave?: { angle?: number; spacing?: number; width?: number; edge?: string; from?: number };
  halftone?: { step?: number; edge?: string; from?: number };
  /** Disolución fina por tramado hacia un borde. */
  fade?: { edge?: string; from?: number };
  apertures?: Pt[][];
};

function edgeProgress(x: number, y: number, W: number, H: number, edge?: string) {
  if (edge === 'left') return 1 - x / W;
  if (edge === 'right') return x / W;
  if (edge === 'top') return 1 - y / H;
  return y / H;
}

function inside(poly: Pt[], W: number, H: number, x: number, y: number) {
  let hit = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0] * W;
    const yi = poly[i][1] * H;
    const xj = poly[j][0] * W;
    const yj = poly[j][1] * H;
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
  }
  return hit;
}

/**
 * La masa roja es UNA forma opaca de bordes duros, calada por sustracción:
 * grabado de líneas, disolución en halftone, tramado fino y aperturas por las
 * que se ve el mundo azul. Nunca es una copia desplazada de otra cosa.
 */
function paintRed(b: Bmp, o: RedOptions) {
  const W = b.w;
  const H = b.h;
  const poly = o.shape ?? [[0, 0], [1, 0], [1, 1], [0, 1]];

  let minX = W;
  let maxX = 0;
  let minY = H;
  let maxY = 0;
  for (const p of poly) {
    minX = Math.min(minX, p[0] * W);
    maxX = Math.max(maxX, p[0] * W);
    minY = Math.min(minY, p[1] * H);
    maxY = Math.max(maxY, p[1] * H);
  }
  minX = Math.max(0, Math.floor(minX));
  minY = Math.max(0, Math.floor(minY));
  maxX = Math.min(W - 1, Math.ceil(maxX));
  maxY = Math.min(H - 1, Math.ceil(maxY));

  const e = o.engrave;
  const ea = e ? ((e.angle ?? 0) * Math.PI) / 180 : 0;
  const enx = -Math.sin(ea);
  const eny = Math.cos(ea);
  const espacing = Math.max(3, (e?.spacing ?? 16) * (W / 700));
  const ewidth = Math.max(1, (e?.width ?? 3.4) * (W / 700));

  const h = o.halftone;
  const hstep = Math.max(4, (h?.step ?? 22) * (W / 700));

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (!inside(poly, W, H, x + 0.5, y + 0.5)) continue;

      if (e) {
        const k = smooth(e.from ?? 0.3, 1, edgeProgress(x, y, W, H, e.edge));
        if (k > 0.02) {
          let m = (x * enx + y * eny) % espacing;
          if (m < 0) m += espacing;
          if (m < ewidth * k) continue;
        }
      }

      if (h) {
        const k = smooth(h.from ?? 0.42, 1, edgeProgress(x, y, W, H, h.edge));
        if (k > 0.03) {
          const row = Math.floor(y / hstep);
          const ox = (row % 2) * hstep * 0.5;
          const ccx = Math.floor((x - ox) / hstep) * hstep + hstep * 0.5 + ox;
          const ccy = row * hstep + hstep * 0.5;
          const dx = x - ccx;
          const dy = y - ccy;
          if (Math.sqrt(dx * dx + dy * dy) < hstep * 0.62 * k) continue;
        }
      }

      if (o.apertures) {
        let cut = false;
        for (const a of o.apertures) {
          if (inside(a, W, H, x + 0.5, y + 0.5)) {
            cut = true;
            break;
          }
        }
        if (cut) continue;
      }

      let density = 1;
      if (o.fade) {
        density = 1 - smooth(o.fade.from ?? 0.5, 1, edgeProgress(x, y, W, H, o.fade.edge));
      }
      ink(b, x, y, RED, density);
    }
  }
}

/* ---------------- pintado ---------------- */

function paint(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) return;

  const isRed = canvas.dataset.red !== undefined;
  let opts: FieldOptions & RedOptions = {};
  try {
    const raw = isRed ? canvas.dataset.red : canvas.dataset.opts;
    opts = raw ? JSON.parse(raw) : {};
  } catch {
    opts = {};
  }

  const compact = window.innerWidth <= 720;
  // Tamaño del píxel virtual: la retícula que hace que esto sea 1-bit.
  const PX = compact ? 4 : 3;
  const vw = Math.max(1, Math.round(rect.width / PX));
  const vh = Math.max(1, Math.round(rect.height / PX));

  const bmp = makeBmp(vw, vh);
  if (isRed) {
    paintRed(bmp, opts as RedOptions);
  } else {
    const kind = canvas.dataset.field ?? 'mesh';
    if (kind === 'ornament') paintOrnament(bmp, opts);
    else if (kind === 'contour') paintContour(bmp, opts);
    else paintMesh(bmp, opts);
  }

  const off = document.createElement('canvas');
  off.width = vw;
  off.height = vh;
  const octx = off.getContext('2d');
  if (!octx) return;
  const img = octx.createImageData(vw, vh);
  img.data.set(bmp.data);
  octx.putImageData(img, 0, 0);

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(off, 0, 0, rect.width, rect.height);
}

export function mountDepthWorld(root: HTMLElement) {
  const fields = Array.from(
    root.querySelectorAll<HTMLCanvasElement>('canvas[data-field], canvas[data-red]'),
  );
  const layers = Array.from(root.querySelectorAll<HTMLElement>('[data-depth]'));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  const paintAll = () => fields.forEach(paint);
  paintAll();

  let resizeTimer = 0;
  const onResize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(paintAll, 200);
  };
  window.addEventListener('resize', onResize);

  if (reduce.matches) {
    layers.forEach((el) => (el.style.transform = 'none'));
    return () => {
      window.removeEventListener('resize', onResize);
      window.clearTimeout(resizeTimer);
    };
  }

  let raf = 0;
  const update = () => {
    const vh = window.innerHeight;
    const damp = window.innerWidth <= 720 ? 0.5 : 1;
    for (const el of layers) {
      const rect = el.getBoundingClientRect();
      const delta = (rect.top + rect.height / 2 - vh / 2) / vh;
      const depth = parseFloat(el.dataset.depth ?? '0') * damp;
      el.style.transform = `translate3d(0, ${(-delta * depth).toFixed(2)}px, 0)`;
    }
    raf = 0;
  };
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(update);
  };

  update();
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);

  return () => {
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    window.removeEventListener('resize', onResize);
    window.clearTimeout(resizeTimer);
    if (raf) cancelAnimationFrame(raf);
  };
}
