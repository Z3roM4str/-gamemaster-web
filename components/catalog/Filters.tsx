'use client';

import { Check, Search, SlidersHorizontal, X } from 'lucide-react';
import { collections, franchises, genres, platforms, type Platform } from '@/app/data/catalog';

export type CatalogFilterState = {
  platform: 'Todas' | Platform;
  genres: string[];
  franchises: string[];
  collections: string[];
  featured: boolean;
};

type FacetName = 'genres' | 'franchises' | 'collections';

function FacetGroup({ label, values, selected, onToggle }: {
  label: string;
  values: string[];
  selected: string[];
  onToggle: (value: string) => void;
}) {
  return (
    <fieldset className="filterFacet">
      <legend>{label}</legend>
      <div>
        {values.map((value) => {
          const active = selected.includes(value);
          return (
            <button type="button" className={active ? 'isActive' : ''} aria-pressed={active} onClick={() => onToggle(value)} key={value}>
              {active && <Check aria-hidden="true" />} {value}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function Filters({
  query,
  filters,
  resultsCount,
  filtersOpen,
  onQueryChange,
  onPlatformChange,
  onFacetToggle,
  onFeaturedToggle,
  onFiltersOpenChange,
  onClear,
}: {
  query: string;
  filters: CatalogFilterState;
  resultsCount: number;
  filtersOpen: boolean;
  onQueryChange: (value: string) => void;
  onPlatformChange: (value: CatalogFilterState['platform']) => void;
  onFacetToggle: (facet: FacetName, value: string) => void;
  onFeaturedToggle: () => void;
  onFiltersOpenChange: (open: boolean) => void;
  onClear: () => void;
}) {
  const activeFacetCount = filters.genres.length + filters.franchises.length + filters.collections.length + (filters.featured ? 1 : 0);
  const hasAnyFilter = Boolean(query.trim()) || filters.platform !== 'Todas' || activeFacetCount > 0;

  return (
    <div className="catalogControls">
      <div className="catalogControlBar">
        <label className="catalogSearch">
          <Search aria-hidden="true" />
          <span className="srOnly">Buscar juego por título</span>
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Buscar por título…"
            type="search"
          />
          <output aria-live="polite">{resultsCount}</output>
        </label>

        <div className="platformSwitch" aria-label="Filtrar por plataforma">
          {(['Todas', ...platforms] as CatalogFilterState['platform'][]).map((platform) => {
            const active = filters.platform === platform;
            return (
              <button type="button" className={active ? 'isActive' : ''} aria-pressed={active} onClick={() => onPlatformChange(platform)} key={platform}>
                {active && <Check aria-hidden="true" />}
                {platform === 'Todas' ? 'Todos' : platform.replace('Nintendo ', '')}
              </button>
            );
          })}
        </div>

        <button
          className={`filterToggle ${filtersOpen ? 'isOpen' : ''}`}
          type="button"
          aria-expanded={filtersOpen}
          aria-controls="catalog-filter-panel"
          onClick={() => onFiltersOpenChange(!filtersOpen)}
        >
          <SlidersHorizontal aria-hidden="true" /> Filtros
          {activeFacetCount > 0 && <span>{activeFacetCount}</span>}
        </button>
      </div>

      {filtersOpen && (
        <div className="filterPanel" id="catalog-filter-panel">
          <div className="filterPanelTop">
            <div>
              <span>COMBINA DIMENSIONES</span>
              <strong>{resultsCount} {resultsCount === 1 ? 'resultado' : 'resultados'}</strong>
            </div>
            <button type="button" onClick={() => onFiltersOpenChange(false)} aria-label="Cerrar filtros"><X aria-hidden="true" /></button>
          </div>
          <div className="filterFeaturedRow">
            <button type="button" className={filters.featured ? 'isActive' : ''} aria-pressed={filters.featured} onClick={onFeaturedToggle}>
              {filters.featured && <Check aria-hidden="true" />} Solo destacados
            </button>
            {hasAnyFilter && <button type="button" className="clearFilters" onClick={onClear}>Limpiar selección</button>}
          </div>
          <div className="filterFacetGrid">
            <FacetGroup label="Género" values={genres} selected={filters.genres} onToggle={(value) => onFacetToggle('genres', value)} />
            <FacetGroup label="Franquicia" values={franchises} selected={filters.franchises} onToggle={(value) => onFacetToggle('franchises', value)} />
            <FacetGroup label="Colección" values={collections} selected={filters.collections} onToggle={(value) => onFacetToggle('collections', value)} />
          </div>
        </div>
      )}
    </div>
  );
}
