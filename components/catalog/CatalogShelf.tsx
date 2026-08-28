'use client';

import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Game } from '@/app/data/catalog';
import { GameCard } from './GameCard';

/**
 * Rails keep one interaction model (scroll, arrows, keyboard) so browsing stays
 * familiar, while the surrounding composition changes rhythm:
 *
 *   editorial — oversized heading, blue structure behind the rail (dense);
 *   open      — full-bleed rail on pure black, no art (calm);
 *   block     — heading on a solid blue slab the covers occlude (dense);
 *   hairline  — a single rule and small caps (very calm).
 */
export type ShelfRhythm = 'editorial' | 'open' | 'block' | 'hairline';

export const shelfRhythmCycle: ShelfRhythm[] = ['editorial', 'open', 'block', 'open', 'hairline', 'editorial', 'open', 'block', 'hairline', 'open'];

export function CatalogShelf({ id, title, description, games, rhythm = 'open', order }: {
  id: string;
  title: string;
  description: string;
  games: Game[];
  rhythm?: ShelfRhythm;
  order?: number;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number>(0);

  const syncRailDepth = (rail: HTMLDivElement) => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const maxScroll = Math.max(1, rail.scrollWidth - rail.clientWidth);
    const progress = Math.min(1, Math.max(0, rail.scrollLeft / maxScroll));
    const amplitude = reducedMotion ? 0 : window.innerWidth <= 760 ? 16 : 74;
    const shift = (progress - 0.5) * amplitude;
    const shelf = rail.closest<HTMLElement>('.catalogShelf');
    // Rear structure trails the rail, the front marker leads it.
    shelf?.style.setProperty('--gm-rail-rear', `${(shift * -0.4).toFixed(2)}px`);
    shelf?.style.setProperty('--gm-rail-front', `${(shift * 0.9).toFixed(2)}px`);
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
      left: direction * Math.max(280, rail.clientWidth * 0.8),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  return (
    <section className="catalogShelf" data-shelf-id={id} data-rhythm={rhythm} aria-labelledby={`${id}-title`}>
      <div className="shelfStructure" aria-hidden="true">
        <span className="shelfStructureRear" />
        <span className="shelfStructureFront" />
      </div>
      <header className="shelfHeading">
        <p className="shelfIndex" aria-hidden="true">{String((order ?? 0) + 1).padStart(2, '0')}</p>
        <div className="shelfTitleGroup">
          <h3 id={`${id}-title`}>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="shelfMeta">
          <span>{games.length} títulos</span>
          <div className="shelfControls">
            <button type="button" onClick={() => moveRail(-1)} aria-label={`Ver títulos anteriores en ${title}`}><ChevronLeft aria-hidden="true" /></button>
            <button type="button" onClick={() => moveRail(1)} aria-label={`Ver más títulos en ${title}`}><ChevronRight aria-hidden="true" /></button>
          </div>
        </div>
      </header>
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
