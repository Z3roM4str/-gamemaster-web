import Image from 'next/image';

export function BrandMark() {
  return (
    <span className="brandMark" aria-label="GameMaster">
      <span className="brandEmblem" aria-hidden="true">
        <Image src="/brand/game-master-emblem-v4.png" alt="" fill sizes="48px" priority />
      </span>
      <span className="brandWordmark">
        <span><strong>Game</strong><b>Master</b></span>
        <small>Digital entertainment</small>
      </span>
    </span>
  );
}
