'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Check, Plus } from 'lucide-react';
import type { Game } from '@/app/data/catalog';
import { useExperience } from '@/components/experience/useExperience';

/**
 * The cover is the object. No shell, no tint, no chromatic duplication —
 * identity lives in the red selection marker and in the composition around the
 * rail, never on the artwork itself.
 */
export function GameCard({ game, index }: { game: Game; index: number }) {
  const { isSelected, openPreview, toggleGame } = useExperience();
  const selected = isSelected(game.id);

  return (
    <article className={`gameCard ${selected ? 'isSelected' : ''}`}>
      <div className="gameCover">
        <button type="button" className="gameCoverButton" onClick={() => openPreview(game.slug)} aria-label={`Abrir vista rápida de ${game.title}`}>
          <Image
            src={game.image}
            alt={`Portada de ${game.title}`}
            fill
            sizes="(max-width: 720px) 62vw, (max-width: 1100px) 28vw, 224px"
          />
          <span className="gameCoverPeek" aria-hidden="true">Vista rápida</span>
        </button>
        <span className="gameMark" aria-hidden="true">{game.platform === 'Nintendo Switch 2' ? 'S2' : 'S1'}</span>
        <button
          type="button"
          className="gameAddButton"
          onClick={() => toggleGame(game)}
          aria-label={selected ? `Quitar ${game.title} de la cotización` : `Agregar ${game.title} a la cotización`}
          aria-pressed={selected}
        >
          {selected ? <Check aria-hidden="true" /> : <Plus aria-hidden="true" />}
        </button>
        <span className="gameSelectMarker" aria-hidden="true" />
      </div>
      <div className="gameInfo">
        <h3><Link href={`/juegos/${game.slug}`}>{game.title}</Link></h3>
        <p>
          <span className="gameInfoIndex">{String(index + 1).padStart(2, '0')}</span>
          {selected ? 'En tu solicitud' : 'Consultar precio'}
        </p>
      </div>
    </article>
  );
}
