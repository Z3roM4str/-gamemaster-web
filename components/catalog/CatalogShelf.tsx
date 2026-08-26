'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Game } from '@/app/data/catalog';
import { GameCard } from './GameCard';

type ShelfTheme = 'switch2' | 'mario' | 'pokemon' | 'zelda' | 'shooter' | 'indie' | 'gaming';

function resolveShelfTheme(id: string, title: string): { theme: ShelfTheme; label: string } {
  const key = `${id} ${title}`.toLocaleLowerCase('es');
  if (key.includes('switch 2') || key.includes('switch2')) return { theme: 'switch2', label: 'SWITCH 2 // NEXT PLAY' };
  if (key.includes('mario')) return { theme: 'mario', label: 'MARIO // WORLD GRID' };
  if (key.includes('pokémon') || key.includes('pokemon')) return { theme: 'pokemon', label: 'POKÉMON // CAPTURE FIELD' };
  if (key.includes('zelda')) return { theme: 'zelda', label: 'HYRULE // TOPO FIELD' };
  if (key.includes('shooter') || key.includes('disparo')) return { theme: 'shooter', label: 'ACTION // TARGET FIELD' };
  if (key.includes('indie')) return { theme: 'indie', label: 'INDIE // PIXEL FIELD' };
  return { theme: 'gaming', label: 'NINTENDO // DIGITAL FIELD' };
}

export function CatalogShelf({ id, title, description, games }: {
  id: string;
  title: string;
  description: string;
  games: Game[];
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const { theme, label } = resolveShelfTheme(id, title);

  const syncRailDepth = (rail: HTMLDivElement) => {
    const maxScroll = Math.max(1, rail.scrollWidth - rail.clientWidth);
    const progress = Math.min(1, Math.max(0, rail.scrollLeft / maxScroll));
    const amplitude = window.innerWidth <= 720 ? 42 : 96;
    const shift = (progress - 0.5) * amplitude;
    const shelf = rail.closest<HTMLElement>('.catalogShelf');
    shelf?.style.setProperty('--gm-rail-blue-shift', `${shift * -0.42}px`);
    shelf?.style.setProperty('--gm-rail-red-shift', `${shift * 0.82}px`);
    shelf?.style.setProperty('--gm-rail-glyph-shift', `${shift * -0.2}px`);
  };

  const moveRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * Math.max(280, rail.clientWidth * 0.78), behavior: 'smooth' });
  };

  return (
    <section className="catalogShelf" data-shelf-theme={theme} aria-labelledby={`${id}-title`}>
      <div className="shelfContextArt" aria-hidden="true">
        <span className="shelfContextBlue" data-gm-depth="0.018"><i /><i /><i /></span>
        <span className="shelfContextRed" data-gm-depth="-0.052" />
        <span className="shelfContextGlyph">{label}</span>
      </div>
      <div className="shelfHeading">
        <div>
          <h3 id={`${id}-title`}>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="shelfMeta">
          <span>{games.length} títulos</span>
          <div className="shelfControls" aria-label={`Mover carrusel ${title}`}>
            <button type="button" onClick={() => moveRail(-1)} aria-label={`Ver títulos anteriores en ${title}`}><ChevronLeft aria-hidden="true" /></button>
            <button type="button" onClick={() => moveRail(1)} aria-label={`Ver más títulos en ${title}`}><ChevronRight aria-hidden="true" /></button>
          </div>
        </div>
      </div>
      <div
        ref={railRef}
        className="catalogRail"
        tabIndex={0}
        role="region"
        aria-label={`Carrusel ${title}. Usa las flechas izquierda y derecha para desplazarte.`}
        onScroll={(event) => syncRailDepth(event.currentTarget)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            moveRail(-1);
          }
          if (event.key === 'ArrowRight') {
            event.preventDefault();
            moveRail(1);
          }
        }}
      >
        {games.map((game, index) => <GameCard game={game} index={index} key={game.id} />)}
      </div>
    </section>
  );
}
