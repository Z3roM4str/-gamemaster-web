'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, Plus } from 'lucide-react';
import type { Game } from '@/app/data/catalog';
import { useExperience } from '@/components/experience/useExperience';

export function GameCard({ game, index }: { game: Game; index: number }) {
  const { isSelected, openPreview, toggleGame } = useExperience();
  const selected = isSelected(game.id);

  return (
    <article className={`gameCard ${selected ? 'isSelected' : ''}`}>
      <div className="gameCardVisual">
        <button type="button" className="gameCoverButton" onClick={() => openPreview(game.slug)} aria-label={`Abrir vista rápida de ${game.title}`}>
          <Image
            src={game.image}
            alt={`Portada de ${game.title}`}
            fill
            sizes="(max-width: 720px) 68vw, (max-width: 1100px) 29vw, 220px"
          />
        </button>
        <span className="platformBadge">{game.platform === 'Nintendo Switch 2' ? 'SWITCH 2' : 'SWITCH'}</span>
        <button
          type="button"
          className="gameAddButton"
          onClick={() => toggleGame(game)}
          aria-label={selected ? `Quitar ${game.title} de la cotización` : `Agregar ${game.title} a la cotización`}
          aria-pressed={selected}
        >
          {selected ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}
        </button>
      </div>
      <div className="gameCardBody">
        <p>{String(index + 1).padStart(2, '0')} · {game.sourceCategory}</p>
        <h3><Link href={`/juegos/${game.slug}`}>{game.title}</Link></h3>
        <div className="gameCardFooter">
          <span>{selected ? 'Seleccionado' : 'Consultar precio'}</span>
          <button type="button" onClick={() => openPreview(game.slug)}>Vista rápida</button>
        </div>
      </div>
    </article>
  );
}
