'use client';

import { Fragment, useMemo, useState } from 'react';
import { ArrowRight, ChevronDown, Search } from 'lucide-react';
import { catalog, exploreCatalogShelves, homepageCatalogShelves } from '@/app/data/catalog';
import { toWhatsApp } from '@/lib/contact';
import { CatalogShelf, shelfRhythmCycle } from './CatalogShelf';
import { Filters, type CatalogFilterState } from './Filters';
import { GameCard } from './GameCard';

function normalizeSearch(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('es');
}

const initialFilters: CatalogFilterState = {
  platform: 'Todas',
  genres: [],
  worlds: [],
  collections: [],
};

/** Editorial interruptions that break the rail rhythm without adding claims. */
const interruptions: Record<number, { tone: 'front' | 'rear'; label: string; title: string; line: string; href: string; cta: string }> = {
  1: {
    tone: 'front',
    label: 'Antes de pagar',
    title: 'Nada se da por hecho.',
    line: 'Precio, modalidad y disponibilidad se confirman contigo antes de cualquier pago.',
    href: '#modalidades',
    cta: 'Ver cómo funciona',
  },
  5: {
    tone: 'rear',
    label: 'Una sola solicitud',
    title: 'Agrupa los títulos que te interesan.',
    line: 'Marca varias portadas con el botón + y envía todo junto en un mismo mensaje.',
    href: '#cotizar',
    cta: 'Armar mi solicitud',
  },
};

export function Catalog() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<CatalogFilterState>(initialFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [showExploreMore, setShowExploreMore] = useState(false);

  const results = useMemo(() => {
    const normalizedQuery = normalizeSearch(query.trim());
    return catalog.filter((game) => {
      const queryMatch = !normalizedQuery || normalizeSearch(game.title).includes(normalizedQuery);
      const platformMatch = filters.platform === 'Todas' || game.platform === filters.platform;
      const genresMatch = !filters.genres.length || game.genres.some((genre) => filters.genres.includes(genre));
      const worldsMatch = !filters.worlds.length || game.worlds.some((world) => filters.worlds.includes(world));
      const collectionMatch = !filters.collections.length || game.collections.some((collection) => filters.collections.includes(collection));
      return queryMatch && platformMatch && genresMatch && worldsMatch && collectionMatch;
    }).sort((a, b) => a.title.localeCompare(b.title, 'es'));
  }, [filters, query]);

  const isExploring = Boolean(query.trim())
    || filters.platform !== 'Todas'
    || filters.genres.length > 0
    || filters.worlds.length > 0
    || filters.collections.length > 0

  const toggleFacet = (facet: 'genres' | 'worlds' | 'collections', value: string) => {
    setFilters((current) => ({
      ...current,
      [facet]: current[facet].includes(value)
        ? current[facet].filter((item) => item !== value)
        : [...current[facet], value],
    }));
  };

  const clearFilters = () => {
    setQuery('');
    setFilters(initialFilters);
  };

  const freeSearchUrl = toWhatsApp(
    query.trim()
      ? `Hola, busco ${query.trim()} para Nintendo Switch. ¿Me ayudan a revisar precio y disponibilidad?`
      : 'Hola, busco un juego de Nintendo Switch que no aparece en el catálogo. ¿Me ayudan a revisarlo?',
  );

  return (
    <section className="catalogSection" id="catalogo" aria-labelledby="catalog-title">
      <div className="catalogOpening">
        <span className="catalogOpeningWord" aria-hidden="true">BIBLIOTECA</span>
        <div className="catalogOpeningCopy">
          <p className="eyebrow">Biblioteca Nintendo digital</p>
          <h2 id="catalog-title">
            Encuentra tu<br />
            <em>próxima partida.</em>
          </h2>
          <p>
            Busca por título o combina plataforma, género, franquicia y colección. La categoría original de los {catalog.length}{' '}
            registros se conserva intacta.
          </p>
        </div>
        <span className="catalogOpeningBlade" data-gm-depth="-0.08" aria-hidden="true" />
      </div>

      <div className="catalogDeck">
        <Filters
          query={query}
          filters={filters}
          resultsCount={results.length}
          filtersOpen={filtersOpen}
          onQueryChange={setQuery}
          onPlatformChange={(platform) => setFilters((current) => ({ ...current, platform }))}
          onFacetToggle={toggleFacet}
          onFiltersOpenChange={setFiltersOpen}
          onClear={clearFilters}
        />

        {isExploring ? (
          results.length ? (
            <div className="catalogResults">
              <div className="resultsHeading">
                <strong>{results.length} {results.length === 1 ? 'resultado' : 'resultados'}</strong>
                <span>Filtros combinados</span>
              </div>
              <div className="gameGrid">
                {results.map((game, index) => <GameCard game={game} index={index} key={game.id} />)}
              </div>
            </div>
          ) : (
            <div className="emptyResults" role="status">
              <Search aria-hidden="true" />
              <p className="eyebrow">Búsqueda sin coincidencias</p>
              <h3>No aparece en esta selección</h3>
              <p>Prueba otra combinación o consúltanos el título. Nada se presenta como disponible hasta confirmarlo.</p>
              <div>
                <button type="button" onClick={clearFilters}>Limpiar filtros</button>
                <a href={freeSearchUrl} target="_blank" rel="noreferrer">Consultar por WhatsApp <ArrowRight aria-hidden="true" /></a>
              </div>
            </div>
          )
        ) : (
          <div className="catalogShelves">
            {homepageCatalogShelves.map((shelf, index) => {
              const interruption = interruptions[index];
              return (
                <Fragment key={shelf.id}>
                  <CatalogShelf {...shelf} order={index} rhythm={shelfRhythmCycle[index % shelfRhythmCycle.length]} />
                  {interruption && (
                    <aside className="catalogBreak" data-tone={interruption.tone}>
                      <div className="catalogBreakArt" data-gm-depth={interruption.tone === 'front' ? '-0.07' : '0.03'} aria-hidden="true" />
                      <p className="catalogBreakLabel">{interruption.label}</p>
                      <h3>{interruption.title}</h3>
                      <p className="catalogBreakLine">{interruption.line}</p>
                      <a href={interruption.href}>{interruption.cta} <ArrowRight aria-hidden="true" /></a>
                    </aside>
                  )}
                </Fragment>
              );
            })}

            <div className="exploreMoreControl">
              <div>
                <strong>Explorar más géneros</strong>
                <small>Estrategia, pelea, carreras, terror, puzzle, mundo abierto y más.</small>
              </div>
              <button type="button" aria-expanded={showExploreMore} aria-controls="explore-more-shelves" onClick={() => setShowExploreMore((current) => !current)}>
                {showExploreMore ? 'Mostrar menos' : 'Abrir más rails'} <ChevronDown aria-hidden="true" />
              </button>
            </div>
            {showExploreMore && (
              <div className="exploreMoreShelves" id="explore-more-shelves">
                {exploreCatalogShelves.map((shelf, index) => (
                  <CatalogShelf
                    {...shelf}
                    key={shelf.id}
                    order={homepageCatalogShelves.length + index}
                    rhythm={shelfRhythmCycle[(index + 3) % shelfRhythmCycle.length]}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
