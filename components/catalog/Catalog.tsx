'use client';

import { useMemo, useState } from 'react';
import { ArrowRight, Search } from 'lucide-react';
import { catalog, catalogShelves } from '@/app/data/catalog';
import { toWhatsApp } from '@/lib/contact';
import { CatalogShelf } from './CatalogShelf';
import { Filters, type CatalogFilterState } from './Filters';
import { GameCard } from './GameCard';

const initialFilters: CatalogFilterState = {
  platform: 'Todas',
  genres: [],
  franchises: [],
  collections: [],
  featured: false,
};

export function Catalog() {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<CatalogFilterState>(initialFilters);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('es');
    return catalog.filter((game) => {
      const queryMatch = !normalizedQuery || game.title.toLocaleLowerCase('es').includes(normalizedQuery);
      const platformMatch = filters.platform === 'Todas' || game.platform === filters.platform;
      const genresMatch = !filters.genres.length || filters.genres.some((genre) => game.genres.includes(genre));
      const franchiseMatch = !filters.franchises.length || Boolean(game.franchise && filters.franchises.includes(game.franchise));
      const collectionMatch = !filters.collections.length || filters.collections.some((collection) => game.collections.includes(collection));
      const featuredMatch = !filters.featured || game.featured;
      return queryMatch && platformMatch && genresMatch && franchiseMatch && collectionMatch && featuredMatch;
    }).sort((a, b) => a.title.localeCompare(b.title, 'es'));
  }, [filters, query]);

  const isExploring = Boolean(query.trim())
    || filters.platform !== 'Todas'
    || filters.genres.length > 0
    || filters.franchises.length > 0
    || filters.collections.length > 0
    || filters.featured;

  const toggleFacet = (facet: 'genres' | 'franchises' | 'collections', value: string) => {
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
    <section className="catalogSection sectionShell" id="catalogo" aria-labelledby="catalog-title">
      <div className="splitHeading catalogHeading">
        <div>
          <p className="eyebrow"><span /> BIBLIOTECA NINTENDO DIGITAL</p>
          <h2 id="catalog-title">Encuentra tu<br /><em>próxima partida.</em></h2>
        </div>
        <p>Busca por título o combina plataforma, género, franquicia, colección y destacados. La categoría original de los {catalog.length} registros se conserva intacta.</p>
      </div>

      <Filters
        query={query}
        filters={filters}
        resultsCount={results.length}
        filtersOpen={filtersOpen}
        onQueryChange={setQuery}
        onPlatformChange={(platform) => setFilters((current) => ({ ...current, platform }))}
        onFacetToggle={toggleFacet}
        onFeaturedToggle={() => setFilters((current) => ({ ...current, featured: !current.featured }))}
        onFiltersOpenChange={setFiltersOpen}
        onClear={clearFilters}
      />

      {isExploring ? (
        results.length ? (
          <div className="catalogResults">
            <div className="resultsHeading"><strong>{results.length} {results.length === 1 ? 'resultado' : 'resultados'}</strong><span>Filtros combinados</span></div>
            <div className="gameGrid">
              {results.map((game, index) => <GameCard game={game} index={index} key={game.id} />)}
            </div>
          </div>
        ) : (
          <div className="emptyResults" role="status">
            <Search aria-hidden="true" />
            <p className="eyebrow">BÚSQUEDA SIN COINCIDENCIAS</p>
            <h3>No aparece en esta selección</h3>
            <p>Prueba otra combinación o consúltanos el título. Nada se presenta como disponible hasta confirmarlo.</p>
            <div><button type="button" onClick={clearFilters}>Limpiar filtros</button><a href={freeSearchUrl} target="_blank" rel="noreferrer">Consultar por WhatsApp <ArrowRight aria-hidden="true" /></a></div>
          </div>
        )
      ) : (
        <div className="catalogShelves">
          {catalogShelves.map((shelf) => <CatalogShelf {...shelf} key={shelf.id} />)}
        </div>
      )}
    </section>
  );
}
