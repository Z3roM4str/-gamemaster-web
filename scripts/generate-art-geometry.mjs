// Deterministic generator for GameMaster page-scale art geometry.
// Produces components/art/geometry.ts so the SVG paths are stable between
// server and client renders and cost nothing at runtime.
import { writeFileSync } from 'node:fs';

function hash(x, y, seed) {
  let h = Math.imul(x | 0, 374761393) ^ Math.imul(y | 0, 668265263) ^ Math.imul(seed, 2246822519);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function smooth(t) {
  return t * t * (3 - 2 * t);
}

function noise2(x, y, seed) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = smooth(x - xi);
  const yf = smooth(y - yi);
  const a = hash(xi, yi, seed);
  const b = hash(xi + 1, yi, seed);
  const c = hash(xi, yi + 1, seed);
  const d = hash(xi + 1, yi + 1, seed);
  return (a * (1 - xf) + b * xf) * (1 - yf) + (c * (1 - xf) + d * xf) * yf;
}

function fbm(x, y, seed, octaves = 4) {
  let value = 0;
  let amplitude = 1;
  let total = 0;
  let frequency = 1;
  for (let i = 0; i < octaves; i += 1) {
    value += noise2(x * frequency, y * frequency, seed + i * 37) * amplitude;
    total += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }
  return value / total;
}

const round = (value) => Math.round(value);

// 1. Topographic contour field — one terrain read at many elevations.
function contourField({ count, cx, cy, min, max, seed, squash = 1 }) {
  const paths = [];
  for (let index = 0; index < count; index += 1) {
    const t = index / (count - 1);
    const radius = min + (max - min) * t;
    const steps = 92;
    const points = [];
    for (let step = 0; step < steps; step += 1) {
      const angle = (step / steps) * Math.PI * 2;
      const sample = fbm(Math.cos(angle) * 1.5 + 4, Math.sin(angle) * 1.5 + 4, seed, 4);
      const ridge = fbm(Math.cos(angle) * 4.2 + 11, Math.sin(angle) * 4.2 + 11, seed + 5, 3);
      const deform = 1 + (sample - 0.5) * 0.52 + (ridge - 0.5) * 0.18 * (0.35 + t);
      const r = radius * deform;
      points.push([round(cx + Math.cos(angle) * r), round(cy + Math.sin(angle) * r * squash)]);
    }
    paths.push(`M${points.map((p) => p.join(' ')).join('L')}Z`);
  }
  return paths;
}

// 2. Ridge lines — an elevation profile that can span a full section.
function ridgeLines({ count, width, height, seed, amplitude }) {
  const paths = [];
  for (let index = 0; index < count; index += 1) {
    const t = index / (count - 1);
    const base = height * (0.14 + t * 0.78);
    const steps = 64;
    const points = [];
    for (let step = 0; step <= steps; step += 1) {
      const x = (step / steps) * width;
      const n = fbm(step / 11 + index * 0.55, index * 0.9 + 3, seed, 4);
      const y = base - (n - 0.5) * amplitude * (1.15 - t * 0.55);
      points.push([round(x), round(y)]);
    }
    paths.push(`M${points.map((p) => p.join(' ')).join('L')}`);
  }
  return paths;
}

// 3. Node network — used by the IA grammar.
function nodeNetwork({ count, width, height, seed, radius }) {
  const nodes = [];
  for (let index = 0; index < count; index += 1) {
    const x = hash(index * 7 + 1, 3, seed) * width;
    const y = hash(index * 13 + 5, 9, seed + 11) * height;
    nodes.push([round(x), round(y)]);
  }
  const edges = [];
  for (let a = 0; a < nodes.length; a += 1) {
    for (let b = a + 1; b < nodes.length; b += 1) {
      const dx = nodes[a][0] - nodes[b][0];
      const dy = nodes[a][1] - nodes[b][1];
      if (Math.hypot(dx, dy) < radius) edges.push([a, b]);
    }
  }
  return { nodes, edges };
}

// 4. Halftone rows — engraved dot field with a controlled density falloff.
function halftoneRows({ cols, rows, width, height, seed }) {
  const dots = [];
  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = ((col + (row % 2 ? 0.5 : 0)) / cols) * width;
      const y = (row / rows) * height;
      const density = fbm(col / 4.5, row / 4.5, seed, 3);
      const r = round(Math.max(0, density - 0.3) * 13);
      if (r > 0.6) dots.push([round(x), round(y), r]);
    }
  }
  return dots;
}

const geometry = {
  terrain: contourField({ count: 16, cx: 500, cy: 500, min: 62, max: 486, seed: 1337, squash: 0.92 }),
  basin: contourField({ count: 10, cx: 500, cy: 500, min: 96, max: 470, seed: 8821, squash: 0.62 }),
  ridges: ridgeLines({ count: 13, width: 1600, height: 620, seed: 4242, amplitude: 190 }),
  strata: ridgeLines({ count: 9, width: 1600, height: 420, seed: 991, amplitude: 96 }),
  network: nodeNetwork({ count: 30, width: 1200, height: 760, seed: 616, radius: 268 }),
  halftone: halftoneRows({ cols: 22, rows: 15, width: 680, height: 440, seed: 73 }),
};

const file = `// GENERATED FILE — run \`node scripts/generate-art-geometry.mjs\` to rebuild.
// Deterministic page-scale art geometry for the GameMaster composition.
// One terrain, sampled at different crops and scales across the page, is what
// makes the site read as a single continuous artwork rather than stacked art.

export const terrainContours: string[] = ${JSON.stringify(geometry.terrain, null, 0).replace(/","/g, '",\n  "').replace(/^\[/, '[\n  ').replace(/\]$/, ',\n]')};

export const basinContours: string[] = ${JSON.stringify(geometry.basin, null, 0).replace(/","/g, '",\n  "').replace(/^\[/, '[\n  ').replace(/\]$/, ',\n]')};

export const ridgeLines: string[] = ${JSON.stringify(geometry.ridges, null, 0).replace(/","/g, '",\n  "').replace(/^\[/, '[\n  ').replace(/\]$/, ',\n]')};

export const strataLines: string[] = ${JSON.stringify(geometry.strata, null, 0).replace(/","/g, '",\n  "').replace(/^\[/, '[\n  ').replace(/\]$/, ',\n]')};

export const networkNodes: [number, number][] = ${JSON.stringify(geometry.network.nodes)};

export const networkEdges: [number, number][] = ${JSON.stringify(geometry.network.edges)};

export const halftoneDots: [number, number, number][] = ${JSON.stringify(geometry.halftone)};
`;

writeFileSync(new URL('../components/art/geometry.ts', import.meta.url), file);
console.log('terrain', geometry.terrain.length, 'basin', geometry.basin.length, 'ridges', geometry.ridges.length, 'strata', geometry.strata.length, 'nodes', geometry.network.nodes.length, 'edges', geometry.network.edges.length, 'dots', geometry.halftone.length);
