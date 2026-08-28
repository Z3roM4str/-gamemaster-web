'use client';

import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Game } from '@/app/data/catalog';
import { GameCard } from './GameCard';

type ShelfTheme =
  | 'featured'
  | 'switch2'
  | 'mario'
  | 'pokemon'
  | 'zelda'
  | 'action'
  | 'rpg'
  | 'shooter'
  | 'platform'
  | 'indie'
  | 'tactical'
  | 'arena'
  | 'velocity'
  | 'nocturne'
  | 'archive'
  | 'gaming';

function resolveShelfTheme(id: string, title: string): { theme: ShelfTheme; label: string } {
  const key = `${id} ${title}`.toLocaleLowerCase('es');
  if (key.includes('destacados')) return { theme: 'featured', label: 'GAMEMASTER // EDITORIAL 01' };
  if (key.includes('switch 2') || key.includes('switch2')) return { theme: 'switch2', label: 'SWITCH 2 // NEXT PLAY' };
  if (key.includes('mario')) return { theme: 'mario', label: 'MARIO // WORLD GRID' };
  if (key.includes('pokémon') || key.includes('pokemon')) return { theme: 'pokemon', label: 'POKÉMON // CAPTURE FIELD' };
  if (key.includes('zelda')) return { theme: 'zelda', label: 'HYRULE // TOPO FIELD' };
  if (key.includes('acción') || key.includes('accion')) return { theme: 'action', label: 'ACTION // VECTOR ROUTE' };
  if (key.includes('rpg')) return { theme: 'rpg', label: 'RPG // WORLD MAP' };
  if (key.includes('shooter') || key.includes('disparo')) return { theme: 'shooter', label: 'ACTION // TARGET FIELD' };
  if (key.includes('plataforma')) return { theme: 'platform', label: 'PLATFORM // LEVEL GRID' };
  if (key.includes('indie')) return { theme: 'indie', label: 'INDIE // PIXEL FIELD' };
  if (key.includes('estrategia') || key.includes('táctica') || key.includes('tactica') || key.includes('puzzle')) {
    return { theme: 'tactical', label: 'TACTICAL // DECISION MAP' };
  }
  if (key.includes('pelea') || key.includes('deporte')) return { theme: 'arena', label: 'ARENA // MATCH FIELD' };
  if (key.includes('carrera') || key.includes('fiesta') || key.includes('multijugador')) {
    return { theme: 'velocity', label: 'VELOCITY // PARTY SIGNAL' };
  }
  if (key.includes('terror') || key.includes('mundo abierto') || key.includes('sandbox')) {
    return { theme: 'nocturne', label: 'NIGHT // OPEN TERRITORY' };
  }
  if (key.includes('clásico') || key.includes('clasico') || key.includes('remaster') || key.includes('colecciones')) {
    return { theme: 'archive', label: 'ARCHIVE // RESTORED PLAY' };
  }
  return { theme: 'gaming', label: 'NINTENDO // DIGITAL FIELD' };
}

export function CatalogShelf({ id, title, description, games }: {
  id: string;
  title: string;
  description: string;
  games: Game[];
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);
  const { theme, label } = resolveShelfTheme(id, title);

  const syncRailDepth = (rail: HTMLDivElement) => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const maxScroll = Math.max(1, rail.scrollWidth - rail.clientWidth);
    const progress = Math.min(1, Math.max(0, rail.scrollLeft / maxScroll));
    const amplitude = reducedMotion ? 0 : window.innerWidth <= 720 ? 18 : 82;
    const shift = (progress - 0.5) * amplitude;
    const shelf = rail.closest<HTMLElement>('.catalogShelf');
    shelf?.style.setProperty('--gm-rail-blue-shift', `${shift * -0.42}px`);
    shelf?.style.setProperty('--gm-rail-red-shift', `${shift * 0.82}px`);
    shelf?.style.setProperty('--gm-rail-glyph-shift', `${shift * -0.2}px`);
  };

  const requestRailDepth = (rail: HTMLDivElement) => {
    if (frameRef.current) return;
    frameRef.current = window.requestAnimationFrame(() => {
      frameRef.current = 0;
      syncRailDepth(rail);
    });
  };

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => syncRailDepth(rail);
    sync();
    reducedMotion.addEventListener('change', sync);
    return () => {
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
      reducedMotion.removeEventListener('change', sync);
    };
  }, []);

  const moveRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({
      left: direction * Math.max(280, rail.clientWidth * 0.78),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  return (
    <section className="catalogShelf" data-shelf-id={id} data-shelf-theme={theme} aria-labelledby={`${id}-title`}>
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
        onScroll={(event) => requestRailDepth(event.currentTarget)}
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
