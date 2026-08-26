'use client';

import { Check, Search, SlidersHorizontal, X } from 'lucide-react';
import { collections, genres, platforms, worlds, type Platform } from '@/app/data/catalog';

export type CatalogFilterState = {
  platform: 'Todas' | Platform;
  genres: string[];
  worlds: string[];
  collections: string[];
};

type FacetName = 'genres' | 'worlds' | 'collections';

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
  onFiltersOpenChange: (open: boolean) => void;
  onClear: () => void;
}) {
  const activeFacetCount = filters.genres.length + filters.worlds.length + filters.collections.length;
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
            <p>Destacados, Switch 2 y otros grupos editoriales viven en Colecciones.</p>
            {hasAnyFilter && <button type="button" className="clearFilters" onClick={onClear}>Limpiar selección</button>}
          </div>
          <div className="filterFacetGrid">
            <FacetGroup label="Género" values={genres} selected={filters.genres} onToggle={(value) => onFacetToggle('genres', value)} />
            <FacetGroup label="Mundo / franquicia" values={worlds} selected={filters.worlds} onToggle={(value) => onFacetToggle('worlds', value)} />
            <FacetGroup label="Colección" values={collections} selected={filters.collections} onToggle={(value) => onFacetToggle('collections', value)} />
          </div>
        </div>
      )}
    </div>
  );
}
