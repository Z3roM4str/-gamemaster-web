import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const catalogPath = path.join(root, 'app', 'data', 'catalog.ts');
const outputDir = path.join(root, 'public', 'games');
const auditPath = path.join(root, 'public', 'games', 'sources.json');
const args = new Set(process.argv.slice(2));
const limitArg = process.argv.find((value) => value.startsWith('--limit='));
const limit = limitArg ? Number(limitArg.split('=')[1]) : Number.POSITIVE_INFINITY;
const idsArg = process.argv.find((value) => value.startsWith('--ids='));
const selectedIds = idsArg ? new Set(idsArg.split('=')[1].split(',').filter(Boolean)) : null;
const refresh = args.has('--refresh');
const userAgent = 'GameMasterCatalog/1.0 (https://game-master-digital-mx.mastr-z3ro.chatgpt.site; visual catalog maintenance)';
let requestQueue = Promise.resolve();
let lastRequestStartedAt = 0;

const aliases = {
  'Pokemon Pokopia': 'Pokémon Pokopia',
  'Resident Evil 9 Requiem, 8, 7': 'Resident Evil Requiem',
  'Super Mario 3D All-Stars (colección 3 en 1)': 'Super Mario 3D All-Stars',
  'Shovel Knight: Treasure Trove (con expansión)': 'Shovel Knight',
  'No More Heroes 1 & 2': 'No More Heroes video game',
  'Pokémon Leyendas: Z-A': 'Pokémon Legends Z-A',
  'Pokémon Leyendas: Arceus': 'Pokémon Legends Arceus',
  'Pokémon Diamante Brillante': 'Pokémon Brilliant Diamond and Shining Pearl',
  'Pokémon Perla Reluciente': 'Pokémon Brilliant Diamond and Shining Pearl',
  'Pokémon Scarlet + Pase de expansión': 'Pokémon Scarlet and Violet',
  'Pokémon Violet (sin expansión)': 'Pokémon Scarlet and Violet',
  'NieR: Automata The End of YoRHa Edition': 'Nier Automata',
  'Dragon Ball FighterZ – FighterZ Edition': 'Dragon Ball FighterZ',
  'Kimetsu no Yaiba: Demon Slayer – The Hinokami Chronicles': 'Demon Slayer The Hinokami Chronicles',
  'Naruto Shippuden: Ultimate Ninja Storm 4 Road to Boruto': 'Naruto Shippuden Ultimate Ninja Storm 4',
  'Dragon Ball Z: Kakarot + A New Power Awakens Set': 'Dragon Ball Z Kakarot',
  'Fire Emblem Engage + Expansion Pass': 'Fire Emblem Engage',
  'Fire Emblem: Three Houses + Expansion Pass': 'Fire Emblem Three Houses',
  'Xenoblade Chronicles 2 + Expansion Pass': 'Xenoblade Chronicles 2',
  'Super Smash Bros. Ultimate + Pase de expansión': 'Super Smash Bros Ultimate',
  'The Legend of Zelda: Breath of the Wild + Pase de expansión': 'The Legend of Zelda Breath of the Wild',
  'The Legend of Zelda: Tears of the Kingdom + Pase de expansión': 'The Legend of Zelda Tears of the Kingdom',
};

const directImageOverrides = {
  'castlestorm-ii': {
    pageTitle: 'CastleStorm II',
    pageUrl: 'https://www.nintendo.com/us/store/products/castlestorm-ii-switch/',
    imageUrls: ['https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000021226/a58600a508aa20f57ec39ccb34fb1b13ddaf65c00e8904e8a82cdb62cc25900b'],
    description: 'Imagen oficial de Nintendo para CastleStorm II',
  },
  membrane: {
    pageTitle: 'Membrane',
    pageUrl: 'https://www.nintendo.com/fr-ca/store/products/membrane-switch/',
    imageUrls: ['https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000002864/f38c43a659c475c70c8aa6a16d1a27ac0bddcbc01ee178c226324524181b9aef'],
    description: 'Imagen oficial de Nintendo para Membrane',
  },
  'pixeljunk-monsters-2': {
    pageTitle: 'PixelJunk Monsters 2',
    pageUrl: 'https://store.steampowered.com/app/749800/PixelJunk_Monsters_2/',
    imageUrls: ['https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/749800/capsule_616x353.jpg?t=1715700492'],
    description: 'Imagen oficial de la ficha de Steam para PixelJunk Monsters 2',
  },
  fortnite: {
    pageTitle: 'Fortnite',
    pageUrl: 'https://commons.wikimedia.org/wiki/File:FortniteLogo.svg',
    imageUrls: ['https://commons.wikimedia.org/wiki/Special:Redirect/file/FortniteLogo.svg'],
    description: 'Logotipo de Fortnite',
  },
  'resident-evil-9-requiem-8-7': {
    pageTitle: 'Resident Evil Requiem, Village y 7: Biohazard',
    pageUrl: 'https://en.wikipedia.org/wiki/Resident_Evil_Requiem',
    imageUrls: [
      'https://upload.wikimedia.org/wikipedia/en/1/15/Resident_Evil_Requiem_Cover_Art.jpg',
      'https://upload.wikimedia.org/wikipedia/en/2/2c/Resident_Evil_Village.png',
      'https://upload.wikimedia.org/wikipedia/en/f/fd/Resident_Evil_7_cover_art.jpg',
    ],
    description: 'Composición de los tres juegos incluidos en la oferta',
  },
  'new-mario-u': {
    pageTitle: 'New Super Mario Bros. U Deluxe',
    pageUrl: 'https://www.nintendo.com/store/products/new-super-mario-bros-u-deluxe-us/',
    imageUrls: ['https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/ncom/en_US/products/games/switch/new-super-mario-bros-u-deluxe/107749-switch-new-super-mario-bros-u-deluxe-us-1200x675'],
    description: 'Imagen oficial de Nintendo para New Super Mario Bros. U Deluxe',
  },
  'fall-guys': {
    pageTitle: 'Fall Guys',
    pageUrl: 'https://www.fallguys.com/?lang=en-US',
    imageUrls: ['https://cdn2.unrealengine.com/fg-10-3-evg-keyart-withlogo-1920x1080-11-1920x1080-198587253bf0.png'],
    description: 'Arte oficial de Fall Guys',
  },
  minecraft: {
    pageTitle: 'Minecraft',
    pageUrl: 'https://commons.wikimedia.org/wiki/File:Minecraft_Logo-en.svg',
    imageUrls: ['https://commons.wikimedia.org/wiki/Special:Redirect/file/Minecraft_Logo-en.svg'],
    description: 'Logotipo oficial de Minecraft',
  },
  portal: {
    pageTitle: 'Portal: Companion Collection',
    pageUrl: 'https://www.nintendo.com/us/store/products/portal-companion-collection-switch/',
    imageUrls: ['https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70070000013722/ff4784d82e93dfed206cd2b3f9bb7cca37d4e4735cef790a4b8af9084816414b'],
    description: 'Imagen oficial de Nintendo para Portal: Companion Collection',
  },
  'no-more-heroes-1-and-2': {
    pageTitle: 'No More Heroes 1 & 2',
    pageUrl: 'https://www.nintendo.com/es-mx/store/products/no-more-heroes-switch/',
    imageUrls: [
      'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000022435/ffd58e667cad903bdec4e013d76e2704c7b30140cbe8bb0f215a6118606ab581',
      'https://assets.nintendo.com/image/upload/c_fill,w_1200/q_auto:best/f_auto/dpr_2.0/store/software/switch/70010000022439/2dbf3253a8b19c579432545ef20c47f3202bdbff1284302e79b62b9e1d539a99',
    ],
    description: 'Composición de las imágenes oficiales de No More Heroes 1 y 2',
  },
};

const normalize = (value) => value
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .toLowerCase()
  .replace(/\(video game\)/g, '')
  .replace(/[^a-z0-9]+/g, ' ')
  .trim();

function readCatalog(source) {
  const value = '"(?:\\\\.|[^"\\\\])*"';
  const expression = new RegExp(`\\{ id: (${value}), title: (${value}), category: (${value}), platform: (${value}), image: (${value}), notionUrl: (${value}) \\}`, 'g');
  return [...source.matchAll(expression)].map((match) => ({
    id: JSON.parse(match[1]),
    title: JSON.parse(match[2]),
    category: JSON.parse(match[3]),
    platform: JSON.parse(match[4]),
    image: JSON.parse(match[5]),
    notionUrl: JSON.parse(match[6]),
  }));
}

async function politeFetch(url) {
  const task = requestQueue.then(async () => {
    const wait = Math.max(0, 750 - (Date.now() - lastRequestStartedAt));
    if (wait) await new Promise((resolve) => setTimeout(resolve, wait));
    lastRequestStartedAt = Date.now();
    return fetch(url, { headers: { 'user-agent': userAgent } });
  });
  requestQueue = task.then(() => undefined, () => undefined);
  return task;
}

async function fetchJson(url, attempt = 1) {
  const response = await politeFetch(url);
  if (!response.ok) {
    if (attempt < 4 && (response.status === 429 || response.status >= 500)) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 5000));
      return fetchJson(url, attempt + 1);
    }
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.json();
}

function scoreCandidate(page, alias) {
  const pageTitle = normalize(page.title);
  const target = normalize(alias.replace(/\bvideo game\b/gi, ''));
  const description = page.terms?.description?.[0]?.toLowerCase() ?? '';
  const targetTokens = new Set(target.split(' ').filter((token) => token.length > 1));
  const pageTokens = new Set(pageTitle.split(' ').filter((token) => token.length > 1));
  const overlap = [...targetTokens].filter((token) => pageTokens.has(token)).length / Math.max(1, targetTokens.size);
  let score = overlap * 140 + Math.max(0, 22 - (page.index ?? 10) * 2);
  if (pageTitle === target) score += 300;
  if (pageTitle.includes(target) || target.includes(pageTitle)) score += 95;
  if (/video game|video game collection|platform game|role-playing game|action-adventure game|racing game|fighting game|shooter game/.test(description)) score += 55;
  if (page.thumbnail?.source) score += 35;
  if (/film|album|song|novel|character|television|disambiguation/.test(description)) score -= 180;
  if (/list of|soundtrack|development of/.test(pageTitle)) score -= 160;
  return Math.round(score);
}

async function resolveImage(game) {
  const direct = directImageOverrides[game.id];
  if (direct) {
    return {
      alias: game.title,
      ...direct,
      imageUrl: direct.imageUrls[0],
      score: 1000,
      candidates: [{ title: direct.pageTitle, description: direct.description, score: 1000 }],
    };
  }
  const alias = aliases[game.title] ?? game.title;
  const endpoint = new URL('https://en.wikipedia.org/w/api.php');
  endpoint.search = new URLSearchParams({
    action: 'query',
    generator: 'search',
    gsrsearch: `${alias} video game`,
    gsrnamespace: '0',
    gsrlimit: '10',
    prop: 'pageimages|pageterms|info',
    pithumbsize: '1200',
    piprop: 'thumbnail|original',
    pilicense: 'any',
    wbptterms: 'description',
    inprop: 'url',
    redirects: '1',
    format: 'json',
    formatversion: '2',
    origin: '*',
  }).toString();
  const payload = await fetchJson(endpoint);
  const candidates = (payload.query?.pages ?? [])
    .filter((page) => !page.missing && (page.thumbnail?.source || page.original?.source))
    .map((page) => ({ ...page, matchScore: scoreCandidate(page, alias) }))
    .sort((a, b) => b.matchScore - a.matchScore);
  const chosen = candidates[0];
  if (!chosen) throw new Error(`No se encontró imagen para ${game.title}`);
  return {
    alias,
    pageTitle: chosen.title,
    pageUrl: chosen.fullurl,
    imageUrl: chosen.original?.source ?? chosen.thumbnail.source,
    description: chosen.terms?.description?.[0] ?? '',
    score: chosen.matchScore,
    candidates: candidates.slice(0, 4).map((page) => ({
      title: page.title,
      description: page.terms?.description?.[0] ?? '',
      score: page.matchScore,
    })),
  };
}

async function downloadBuffer(url, attempt = 1) {
  const response = await politeFetch(url);
  if (!response.ok) {
    if (attempt < 4 && (response.status === 429 || response.status >= 500)) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 5000));
      return downloadBuffer(url, attempt + 1);
    }
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return Buffer.from(await response.arrayBuffer());
}

async function makeCatalogArt(input, outputPath) {
  const buffers = Array.isArray(input) ? input : [input];
  if (buffers.length > 1) {
    const height = Math.floor(1000 / buffers.length);
    const panels = await Promise.all(buffers.map((buffer, index) => sharp(buffer)
      .rotate()
      .resize(800, index === buffers.length - 1 ? 1000 - (height * index) : height, { fit: 'cover', position: 'attention' })
      .modulate({ brightness: 0.84, saturation: 0.92 })
      .webp({ quality: 84 })
      .toBuffer()));
    await sharp({ create: { width: 800, height: 1000, channels: 3, background: '#081019' } })
      .composite(panels.map((inputBuffer, index) => ({ input: inputBuffer, left: 0, top: height * index })))
      .webp({ quality: 84, smartSubsample: true })
      .toFile(outputPath);
    return;
  }
  const buffer = buffers[0];
  const rotated = sharp(buffer).rotate();
  const background = await rotated
    .clone()
    .resize(800, 1000, { fit: 'cover', position: 'attention' })
    .blur(24)
    .modulate({ brightness: 0.34, saturation: 0.72 })
    .webp({ quality: 76 })
    .toBuffer();
  const foreground = await rotated
    .clone()
    .resize(748, 948, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  await sharp(background)
    .composite([{ input: foreground, gravity: 'center' }])
    .webp({ quality: 84, smartSubsample: true })
    .toFile(outputPath);
}

async function exists(file) {
  try { return (await stat(file)).size > 0; } catch { return false; }
}

async function runPool(items, worker, concurrency = 5) {
  const results = new Array(items.length);
  let next = 0;
  async function run() {
    while (next < items.length) {
      const index = next++;
      results[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, run));
  return results;
}

await mkdir(outputDir, { recursive: true });
const catalog = readCatalog(await readFile(catalogPath, 'utf8'));
if (catalog.length !== 134) throw new Error(`Se esperaban 134 juegos y se leyeron ${catalog.length}`);
const selected = (selectedIds ? catalog.filter((game) => selectedIds.has(game.id)) : catalog).slice(0, limit);
if (selectedIds && selected.length !== selectedIds.size) throw new Error('Uno o más ids solicitados no existen en el catálogo');
const audit = [];
const failures = [];

await runPool(selected, async (game, index) => {
  try {
    const resolution = await resolveImage(game);
    const outputPath = path.join(outputDir, `${game.id}.webp`);
    if (refresh || !(await exists(outputPath))) {
      const buffers = await Promise.all((resolution.imageUrls ?? [resolution.imageUrl]).map(downloadBuffer));
      await makeCatalogArt(buffers, outputPath);
    }
    audit[index] = {
      id: game.id,
      title: game.title,
      localPath: `/games/${game.id}.webp`,
      ...resolution,
    };
    process.stdout.write(`OK ${String(index + 1).padStart(3, '0')}/${selected.length} ${game.title} -> ${resolution.pageTitle}\n`);
  } catch (error) {
    failures.push({ id: game.id, title: game.title, error: String(error) });
    process.stderr.write(`FAIL ${game.title}: ${error}\n`);
  }
});

let finalSources = audit.filter(Boolean);
let finalFailures = failures;
if (selectedIds || Number.isFinite(limit)) {
  let previous = { sources: [], failures: [] };
  try { previous = JSON.parse(await readFile(auditPath, 'utf8')); } catch {}
  const replaced = new Set(selected.map((game) => game.id));
  finalSources = [...(previous.sources ?? []).filter((source) => !replaced.has(source.id)), ...finalSources]
    .sort((a, b) => catalog.findIndex((game) => game.id === a.id) - catalog.findIndex((game) => game.id === b.id));
  finalFailures = [...(previous.failures ?? []).filter((failure) => !replaced.has(failure.id)), ...failures];
}
await writeFile(auditPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), total: finalSources.length, sources: finalSources, failures: finalFailures }, null, 2)}\n`);
console.log(`Listas: ${finalSources.length}; fallas: ${finalFailures.length}; auditoría: ${path.relative(root, auditPath)}`);
if (failures.length) process.exitCode = 1;
