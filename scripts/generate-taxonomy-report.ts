import { access, readFile, writeFile } from 'node:fs/promises';
// @ts-expect-error Node 22 ejecuta este script con type stripping y exige la extensión TypeScript explícita.
const taxonomyModule = await import('../app/data/game-taxonomy.ts');
const {
  catalogRailDefinitions,
  collectionOrder,
  gameTaxonomy,
  genreOrder,
  matchesCatalogRail,
  resolveTaxonomy,
  worldOrder,
} = taxonomyModule;

type SourceRow = {
  id: string;
  title: string;
  sourceCategory: string;
  platform: 'Nintendo Switch' | 'Nintendo Switch 2';
  image: string;
};

type SourceAudit = {
  total: number;
  sources: Array<{ id: string; title: string; localPath: string }>;
};

const EXPECTED_CATALOG_COUNT = 130;

const catalogPath = new URL('../app/data/catalog.ts', import.meta.url);
const sourceAuditPath = new URL('../public/games/sources.json', import.meta.url);
const reportPath = new URL('../docs/TAXONOMY_REPORT.md', import.meta.url);
const source = await readFile(catalogPath, 'utf8');
const sourceAudit = JSON.parse(await readFile(sourceAuditPath, 'utf8')) as SourceAudit;
const recordPattern = /\{ id: "([^"]+)", title: "([^"]+)", category: "([^"]+)", platform: "(Nintendo Switch(?: 2)?)", image: "([^"]+)", notionUrl: "[^"]+" \}/g;

const rows: SourceRow[] = [...source.matchAll(recordPattern)].map((match) => ({
  id: match[1],
  title: match[2],
  sourceCategory: match[3],
  platform: match[4] as SourceRow['platform'],
  image: match[5],
}));

const uniqueIds = new Set(rows.map((row) => row.id));
const duplicateIds = [...uniqueIds].filter((id) => rows.filter((row) => row.id === id).length > 1);
const uniqueSlugs = new Set(rows.map((row) => row.id));
const duplicateSlugs = [...uniqueSlugs].filter((slug) => rows.filter((row) => row.id === slug).length > 1);
const taxonomyIds = Object.keys(gameTaxonomy);
const missingTaxonomy = rows.filter((row) => !gameTaxonomy[row.id]).map((row) => row.id);
const orphanTaxonomy = taxonomyIds.filter((id) => !uniqueIds.has(id));
const sourceAuditIds = new Set(sourceAudit.sources.map((entry) => entry.id));
const missingSourceAudit = rows.filter((row) => !sourceAuditIds.has(row.id)).map((row) => row.id);
const orphanSourceAudit = sourceAudit.sources.filter((entry) => !uniqueIds.has(entry.id)).map((entry) => entry.id);
const mismatchedSourceAssets = rows.filter((row) => sourceAudit.sources.find((entry) => entry.id === row.id)?.localPath !== row.image).map((row) => row.id);
const forbiddenPassRecords = rows.filter((row) => /Pase de expansión|Expansion Pass/i.test(row.title));
const forbiddenFortniteRecords = rows.filter((row) => /fortnite/i.test(`${row.id} ${row.title}`));
const missingAssets: string[] = [];

for (const row of rows) {
  try {
    await access(new URL(`../public${row.image}`, import.meta.url));
  } catch {
    missingAssets.push(row.image);
  }
}

if (rows.length !== EXPECTED_CATALOG_COUNT) throw new Error(`Se esperaban ${EXPECTED_CATALOG_COUNT} registros fuente y se encontraron ${rows.length}.`);
if (uniqueIds.size !== EXPECTED_CATALOG_COUNT || duplicateIds.length) throw new Error(`Hay IDs duplicados: ${duplicateIds.join(', ')}`);
if (uniqueSlugs.size !== EXPECTED_CATALOG_COUNT || duplicateSlugs.length) throw new Error(`Hay slugs duplicados: ${duplicateSlugs.join(', ')}`);
if (missingTaxonomy.length) throw new Error(`Falta taxonomía para: ${missingTaxonomy.join(', ')}`);
if (orphanTaxonomy.length) throw new Error(`La taxonomía contiene IDs ajenos al catálogo: ${orphanTaxonomy.join(', ')}`);
if (missingAssets.length) throw new Error(`Faltan assets requeridos: ${missingAssets.join(', ')}`);
if (sourceAudit.total !== EXPECTED_CATALOG_COUNT || sourceAudit.sources.length !== EXPECTED_CATALOG_COUNT) throw new Error('El manifiesto de fuentes visuales no coincide con el catálogo.');
if (missingSourceAudit.length) throw new Error(`Falta auditoría visual para: ${missingSourceAudit.join(', ')}`);
if (orphanSourceAudit.length) throw new Error(`La auditoría visual contiene IDs huérfanos: ${orphanSourceAudit.join(', ')}`);
if (mismatchedSourceAssets.length) throw new Error(`La auditoría visual apunta a otro asset para: ${mismatchedSourceAssets.join(', ')}`);
if (forbiddenPassRecords.length) throw new Error(`Persisten registros de Pase de expansión / Expansion Pass: ${forbiddenPassRecords.map((row) => row.id).join(', ')}`);
if (forbiddenFortniteRecords.length) throw new Error('Fortnite persiste en el catálogo comercial.');

const games = rows.map((row) => ({ ...row, ...resolveTaxonomy(row.id, row.platform) }));
const residentEvilBundle = games.filter((game) => game.id === 'resident-evil-9-requiem-8-7');

if (residentEvilBundle.length !== 1 || residentEvilBundle[0].title !== 'Resident Evil 9 Requiem, 8, 7') {
  throw new Error('Resident Evil 9 Requiem, 8, 7 debe conservarse como un único producto 3 en 1.');
}
if (residentEvilBundle[0].confidence !== 'alta' || residentEvilBundle[0].manualReview) {
  throw new Error('El producto 3 en 1 de Resident Evil no debe quedar como dudoso ni en revisión manual.');
}

function countBy<T extends string>(values: readonly T[], pick: (game: (typeof games)[number]) => readonly T[]) {
  return values
    .map((value) => ({ value, count: games.filter((game) => pick(game).includes(value)).length }))
    .filter(({ count }) => count > 0);
}

function countTable(rowsToRender: Array<{ value: string; count: number }>) {
  return ['| Clasificación | Juegos |', '|---|---:|', ...rowsToRender.map(({ value, count }) => `| ${value} | ${count} |`)].join('\n');
}

function bullets(items: string[], emptyMessage: string) {
  return items.length ? items.map((item) => `- ${item}`).join('\n') : `- ${emptyMessage}`;
}

const genreCounts = countBy(genreOrder, (game) => game.genres);
const worldCounts = countBy(worldOrder, (game) => game.worlds);
const collectionCounts = countBy(collectionOrder, (game) => game.collections);
const withoutGenre = games.filter((game) => game.genres.length === 0);
const doubtful = games.filter((game) => game.confidence !== 'alta');
const manualReview = games.filter((game) => game.manualReview);
const multiClassified = games.filter((game) => (
  game.genres.length + game.worlds.length + game.collections.length + game.features.length
) > 1);
const rails = catalogRailDefinitions.map((rail) => ({
  ...rail,
  games: games.filter((game) => matchesCatalogRail(game, rail)),
}));
const defaultRails = rails.filter((rail) => rail.homepage);
const optionalRails = rails.filter((rail) => !rail.homepage);

const report = `# Reporte de taxonomía editorial — GameMaster

Generado automáticamente desde los ${EXPECTED_CATALOG_COUNT} registros comerciales vigentes y la taxonomía explícita por ID. \`sourceCategory\` se conserva como dato histórico y no participa en la inferencia de géneros.

## Integridad

- Registros fuente: **${rows.length}**
- IDs únicos: **${uniqueIds.size}**
- Slugs únicos: **${uniqueSlugs.size}**
- Registros con taxonomía explícita: **${taxonomyIds.length}**
- IDs duplicados: **${duplicateIds.length}**
- Slugs duplicados: **${duplicateSlugs.length}**
- Taxonomías faltantes: **${missingTaxonomy.length}**
- Taxonomías sin registro fuente: **${orphanTaxonomy.length}**
- Assets requeridos faltantes: **${missingAssets.length}**
- Registros en auditoría visual: **${sourceAudit.sources.length}**
- Auditorías visuales faltantes o huérfanas: **${missingSourceAudit.length + orphanSourceAudit.length}**
- Registros sin género: **${withoutGenre.length}**

Los campos \`id\`, \`title\`, \`platform\`, \`image\` y \`sourceCategory\` forman la base comercial vigente; la capa editorial se resuelve por separado.

## 1. Cantidad de juegos por género

${countTable(genreCounts)}

## 2. Cantidad de juegos por mundo / franquicia

${countTable(worldCounts)}

Nota: un juego sin mundo explícito no se fuerza dentro de una franquicia genérica.

## 3. Cantidad de juegos por colección

${countTable(collectionCounts)}

Las colecciones pueden provenir de una decisión editorial explícita, de la plataforma Switch 2, de \`featured\` o de una característica fiable como multijugador, mundo abierto, remake o remaster.

## 4. Juegos con más de una clasificación

**${multiClassified.length} de ${games.length} juegos** tienen más de una etiqueta entre género, mundo/franquicia, colección y característica. La multiplicidad es deliberada y permite que un título aparezca en varios rails.

${bullets(multiClassified.map((game) => {
  const groups = [
    game.genres.length ? `géneros: ${game.genres.join(', ')}` : '',
    game.worlds.length ? `mundos: ${game.worlds.join(', ')}` : '',
    game.collections.length ? `colecciones: ${game.collections.join(', ')}` : '',
    game.features.length ? `características: ${game.features.join(', ')}` : '',
  ].filter(Boolean);
  return `**${game.title}** — ${groups.join(' · ')}`;
}), 'Ninguno.')}

## 5. Juegos sin género

${bullets(withoutGenre.map((game) => `**${game.title}** (\`${game.id}\`)`), `Ninguno: los ${games.length} registros tienen al menos un género explícito.`)}

## 6. Clasificación dudosa o condicionada

Se incluyen todas las fichas con confianza media o baja. La nota explica el matiz conservado.

${bullets(doubtful.map((game) => `**${game.title}** — confianza ${game.confidence}. ${game.reviewNote ?? 'Clasificación editorial condicionada.'}`), 'Ninguna.')}

## 7. Revisión manual recomendada

${bullets(manualReview.map((game) => `**${game.title}** (\`${game.id}\`) — ${game.reviewNote ?? 'Revisar clasificación con el propietario.'}`), 'Ninguna.')}

## 8. Rails por defecto en la homepage

${defaultRails.map((rail, index) => `${index + 1}. **${rail.title}** — ${rail.games.length} juegos`).join('\n')}

## Rails disponibles en “Explorar más”

${optionalRails.map((rail) => `- **${rail.title}** — ${rail.games.length} juegos`).join('\n')}

## Criterio operativo

- Los filtros combinan dimensiones distintas con lógica acumulativa: plataforma + género + mundo/franquicia + colección.
- Dentro de una misma dimensión se puede elegir más de un valor.
- Super Smash Bros. usa \`Super Smash Bros.\` y \`Nintendo\` como mundos; no se clasifica como franquicia Mario.
- Ningún género se deriva de \`sourceCategory\` ni de coincidencias generales como contener la palabra “Mario”.
`;

await writeFile(reportPath, report, 'utf8');
console.log(`Reporte generado: ${reportPath.pathname}`);
console.log(`Integridad: ${rows.length} juegos, ${uniqueIds.size} IDs/slugs únicos, ${taxonomyIds.length} taxonomías, ${missingAssets.length} assets faltantes.`);
