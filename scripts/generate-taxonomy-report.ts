import { readFile, writeFile } from 'node:fs/promises';
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

const catalogPath = new URL('../app/data/catalog.ts', import.meta.url);
const reportPath = new URL('../docs/TAXONOMY_REPORT.md', import.meta.url);
const source = await readFile(catalogPath, 'utf8');
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
const taxonomyIds = Object.keys(gameTaxonomy);
const missingTaxonomy = rows.filter((row) => !gameTaxonomy[row.id]).map((row) => row.id);
const orphanTaxonomy = taxonomyIds.filter((id) => !uniqueIds.has(id));

if (rows.length !== 134) throw new Error(`Se esperaban 134 registros fuente y se encontraron ${rows.length}.`);
if (uniqueIds.size !== 134 || duplicateIds.length) throw new Error(`Hay IDs duplicados: ${duplicateIds.join(', ')}`);
if (missingTaxonomy.length) throw new Error(`Falta taxonomía para: ${missingTaxonomy.join(', ')}`);
if (orphanTaxonomy.length) throw new Error(`La taxonomía contiene IDs ajenos al catálogo: ${orphanTaxonomy.join(', ')}`);

const games = rows.map((row) => ({ ...row, ...resolveTaxonomy(row.id, row.platform) }));

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

Generado automáticamente desde los 134 registros fuente y la taxonomía explícita por ID. \`sourceCategory\` se conserva como dato histórico y no participa en la inferencia de géneros.

## Integridad

- Registros fuente: **${rows.length}**
- IDs únicos: **${uniqueIds.size}**
- Registros con taxonomía explícita: **${taxonomyIds.length}**
- IDs duplicados: **${duplicateIds.length}**
- Taxonomías faltantes: **${missingTaxonomy.length}**
- Taxonomías sin registro fuente: **${orphanTaxonomy.length}**
- Registros sin género: **${withoutGenre.length}**

Los campos fuente \`id\`, \`title\`, \`platform\`, \`image\` y \`sourceCategory\` permanecen en el catálogo original; la capa editorial se resuelve por separado.

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

${bullets(withoutGenre.map((game) => `**${game.title}** (\`${game.id}\`)`), 'Ninguno: los 134 registros tienen al menos un género explícito.')}

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
console.log(`Integridad: ${rows.length} juegos, ${uniqueIds.size} IDs únicos, ${taxonomyIds.length} taxonomías.`);
