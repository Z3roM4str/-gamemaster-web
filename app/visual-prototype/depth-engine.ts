/**
 * Motor de profundidad del prototipo.
 *
 * Dos responsabilidades:
 *  1. Pintar los "mundos azules": estructuras generativas grandes (malla en
 *     perspectiva y curvas de nivel) sobre canvas.
 *  2. Parallax por capas: cada elemento con data-depth se desplaza en función
 *     de su distancia al centro del viewport. depth positivo = lejos (se
 *     queda atrás), depth negativo = cerca (adelanta).
 *
 * Ningún objeto se duplica ni se desplaza en dos colores: cada capa es una
 * geometría distinta ocupando un plano cromático distinto.
 */

type FieldOptions = {
  horizon?: number;
  reach?: number;
  spread?: number;
  amp?: number;
  freq?: number;
  phase?: number;
  cols?: number;
  rows?: number;
  alpha?: number;
  cx?: number;
  cy?: number;
  scale?: number;
  stretch?: number;
  rings?: number;
  /** Atmósfera azul: da AREA al mundo posterior, no solo línea. 0 = ninguna. */
  wash?: number;
  washY?: number;
};

type Pt = [number, number];

type RedOptions = {
  shape?: Pt[];
  engrave?: { angle?: number; spacing?: number; width?: number; edge?: string; from?: number };
  halftone?: { step?: number; edge?: string; from?: number };
  apertures?: Pt[][];
};

const BLUE_DEEP = '28, 59, 255';
const BLUE_LINE = '74, 99, 255';
const RED = '#ff1e1e';

function clamp01(v: number) {
  return v < 0 ? 0 : v > 1 ? 1 : v;
}

/** smoothstep entre a y b. */
function smooth(a: number, b: number, t: number) {
  const x = clamp01((t - a) / (b - a || 1));
  return x * x * (3 - 2 * x);
}

/** Progreso hacia un borde: 1 = pegado a ese borde. */
function edgeProgress(x: number, y: number, W: number, H: number, edge: string) {
  if (edge === 'left') return 1 - x / W;
  if (edge === 'right') return x / W;
  if (edge === 'top') return 1 - y / H;
  return y / H;
}

/**
 * Masa roja trabajada. Sigue siendo UN plano físico opaco con bordes nítidos
 * —las portadas lo siguen ocluyendo— pero se articula por sustracción:
 * grabado de líneas, disolución en halftone hacia un borde y aperturas
 * geométricas por las que se ve el mundo azul que hay detrás.
 *
 * Todo se resta con destination-out: no hay copia desplazada ni segunda
 * geometría en otro color. Es la misma masa, calada.
 */
function drawRedMass(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  o: Record<string, never> | RedOptions,
  compact: boolean,
) {
  const opt = o as RedOptions;
  const pts = opt.shape ?? [[0, 0], [1, 0], [1, 1], [0, 1]];
  const grain = compact ? 1.5 : 1;

  ctx.save();
  ctx.beginPath();
  pts.forEach((p, i) => (i ? ctx.lineTo(p[0] * W, p[1] * H) : ctx.moveTo(p[0] * W, p[1] * H)));
  ctx.closePath();
  ctx.clip();

  ctx.fillStyle = RED;
  ctx.fillRect(0, 0, W, H);

  ctx.globalCompositeOperation = 'destination-out';
  ctx.strokeStyle = '#000';
  ctx.fillStyle = '#000';

  const e = opt.engrave;
  if (e) {
    const spacing = (e.spacing ?? 16) * grain;
    const ang = ((e.angle ?? 0) * Math.PI) / 180;
    const dx = Math.cos(ang);
    const dy = Math.sin(ang);
    const L = Math.hypot(W, H);
    const n = Math.ceil((L * 2) / spacing);
    for (let i = -n; i <= n; i++) {
      const ox = -dy * i * spacing + W / 2;
      const oy = dx * i * spacing + H / 2;
      const k = smooth(e.from ?? 0.3, 1, edgeProgress(ox, oy, W, H, e.edge ?? 'bottom'));
      if (k <= 0.02) continue;
      ctx.lineWidth = (e.width ?? 3.4) * grain * k;
      ctx.beginPath();
      ctx.moveTo(ox - dx * L, oy - dy * L);
      ctx.lineTo(ox + dx * L, oy + dy * L);
      ctx.stroke();
    }
  }

  const h = opt.halftone;
  if (h) {
    const step = (h.step ?? 22) * grain;
    for (let y = 0; y <= H + step; y += step) {
      const row = Math.round(y / step);
      for (let x = -step; x <= W + step; x += step) {
        const px = x + (row % 2) * step * 0.5;
        const k = smooth(h.from ?? 0.42, 1, edgeProgress(px, y, W, H, h.edge ?? 'bottom'));
        if (k <= 0.03) continue;
        ctx.beginPath();
        ctx.arc(px, y, step * 0.7 * k, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  if (opt.apertures) {
    for (const a of opt.apertures) {
      ctx.beginPath();
      a.forEach((p, i) => (i ? ctx.lineTo(p[0] * W, p[1] * H) : ctx.moveTo(p[0] * W, p[1] * H)));
      ctx.closePath();
      ctx.fill();
    }
  }

  ctx.restore();
}

function drawTerrain(ctx: CanvasRenderingContext2D, W: number, H: number, o: FieldOptions, compact: boolean) {
  const cols = Math.round((o.cols ?? 30) * (compact ? 0.55 : 1));
  const rows = Math.round((o.rows ?? 22) * (compact ? 0.6 : 1));
  const horizon = o.horizon ?? 0.1;
  const reach = o.reach ?? 1;
  const spread = o.spread ?? 1.4;
  const amp = o.amp ?? 64;
  const freq = o.freq ?? 6.5;
  const phase = o.phase ?? 0;
  const alpha = (o.alpha ?? 1) * (compact ? 0.85 : 1);

  const grid: [number, number][][] = [];
  for (let r = 0; r <= rows; r++) {
    const t = r / rows;
    const s = 0.12 + Math.pow(t, 1.9) * 1.9;
    const rowY = H * horizon + Math.pow(t, 1.75) * H * reach;
    const line: [number, number][] = [];
    for (let c = 0; c <= cols; c++) {
      const u = c / cols - 0.5;
      const wave =
        Math.sin(u * freq + phase) * Math.cos(t * 5.2 + phase * 0.6) +
        Math.sin(u * freq * 2.3 - phase * 1.4) * 0.35;
      line.push([W / 2 + u * W * spread * s, rowY - wave * amp * s]);
    }
    grid.push(line);
  }

  for (let r = 0; r <= rows; r++) {
    const t = r / rows;
    ctx.beginPath();
    grid[r].forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
    ctx.lineWidth = t > 0.72 ? 1.6 : 1;
    ctx.strokeStyle = `rgba(${BLUE_LINE}, ${(0.07 + t * 0.6) * alpha})`;
    ctx.stroke();
  }
  const colStep = compact ? 2 : 1;
  ctx.lineWidth = 1;
  for (let c = 0; c <= cols; c += colStep) {
    ctx.beginPath();
    for (let r = 0; r <= rows; r++) {
      const [x, y] = grid[r][c];
      r === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = `rgba(${BLUE_DEEP}, ${0.32 * alpha})`;
    ctx.stroke();
  }
}

function drawContour(ctx: CanvasRenderingContext2D, W: number, H: number, o: FieldOptions, compact: boolean) {
  const rings = Math.round((o.rings ?? 20) * (compact ? 0.6 : 1));
  const cx = W * (o.cx ?? 0.5);
  const cy = H * (o.cy ?? 0.5);
  const scale = o.scale ?? 0.95;
  const stretch = o.stretch ?? 1.7;
  const alpha = o.alpha ?? 1;
  const base = Math.min(W, H);

  for (let i = 0; i < rings; i++) {
    const rr = (i + 1) / rings;
    ctx.lineWidth = i % 5 === 0 ? 1.7 : 1;
    ctx.beginPath();
    for (let a = 0; a <= 160; a++) {
      const th = (a / 160) * Math.PI * 2;
      const wob =
        1 +
        Math.sin(th * 3 + i * 0.45) * 0.11 +
        Math.sin(th * 5 - i * 0.28) * 0.06 +
        Math.sin(th * 8 + i * 0.9) * 0.03;
      const R = rr * base * scale * wob;
      const x = cx + Math.cos(th) * R * stretch;
      const y = cy + Math.sin(th) * R;
      a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle =
      i % 5 === 0
        ? `rgba(${BLUE_LINE}, ${0.5 * alpha})`
        : `rgba(${BLUE_DEEP}, ${(0.18 + rr * 0.3) * alpha})`;
    ctx.stroke();
  }
}

/**
 * Atmósfera: una gran región azul de baja intensidad que da AREA al mundo
 * posterior. Las estructuras (líneas) siguen siendo nítidas encima; esto solo
 * evita que el azul exista únicamente como hilo.
 */
function drawWash(ctx: CanvasRenderingContext2D, W: number, H: number, amount: number, washY: number) {
  /* Radial: se apaga hacia todos los bordes del canvas, de modo que el campo
     azul nunca corta en seco contra el negro (sin costuras rectas). */
  const cx = W * 0.5;
  const cy = H * (washY + 0.55);
  const r = Math.max(W, H) * 0.78;
  const g = ctx.createRadialGradient(cx, cy, r * 0.06, cx, cy, r);
  g.addColorStop(0, `rgba(${BLUE_DEEP}, ${0.3 * amount})`);
  g.addColorStop(0.52, `rgba(${BLUE_DEEP}, ${0.15 * amount})`);
  g.addColorStop(1, `rgba(${BLUE_DEEP}, 0)`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
}

function paint(canvas: HTMLCanvasElement) {
  const isRed = canvas.dataset.red !== undefined;
  const kind = canvas.dataset.field ?? 'terrain';
  let opts: FieldOptions = {};
  try {
    const raw = isRed ? canvas.dataset.red : canvas.dataset.opts;
    opts = raw ? (JSON.parse(raw) as FieldOptions) : {};
  } catch {
    opts = {};
  }

  const rect = canvas.getBoundingClientRect();
  if (rect.width < 2 || rect.height < 2) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const compact = window.innerWidth <= 720;
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, rect.width, rect.height);

  if (isRed) {
    drawRedMass(ctx, rect.width, rect.height, opts as unknown as RedOptions, compact);
    return;
  }

  if (opts.wash) drawWash(ctx, rect.width, rect.height, opts.wash, opts.washY ?? 0.1);
  if (kind === 'contour') drawContour(ctx, rect.width, rect.height, opts, compact);
  else drawTerrain(ctx, rect.width, rect.height, opts, compact);
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
    resizeTimer = window.setTimeout(paintAll, 160);
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
