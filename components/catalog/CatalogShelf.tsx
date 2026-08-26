'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Game } from '@/app/data/catalog';
import { GameCard } from './GameCard';

export function CatalogShelf({ id, title, description, games }: {
  id: string;
  title: string;
  description: string;
  games: Game[];
}) {
  const railRef = useRef<HTMLDivElement>(null);

  const moveRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * Math.max(280, rail.clientWidth * 0.78), behavior: 'smooth' });
  };

  return (
    <section className="catalogShelf" aria-labelledby={`${id}-title`}>
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
