import {
  basinContours,
  halftoneDots,
  networkEdges,
  networkNodes,
  ridgeLines,
  strataLines,
  terrainContours,
} from './geometry';

/**
 * Rear structural plane primitives.
 *
 * Every field below draws the SAME generated terrain at a different crop or
 * scale, so the page reads as one continuous world seen from different
 * distances instead of unrelated decorations per section. They are server
 * components: the geometry never reaches the client bundle.
 */

type FieldProps = { className?: string };

/** Full topographic terrain. Rear plane, largest scale. */
export function TerrainField({ className = '' }: FieldProps) {
  return (
    <svg className={`artField artFieldTerrain ${className}`} viewBox="0 0 1000 1000" fill="none" aria-hidden="true" focusable="false">
      {terrainContours.map((d, index) => (
        <path d={d} key={index} style={{ '--i': index, '--n': terrainContours.length } as React.CSSProperties} />
      ))}
    </svg>
  );
}

/** Compressed basin — the same terrain read from a lower angle. */
export function BasinField({ className = '' }: FieldProps) {
  return (
    <svg className={`artField artFieldBasin ${className}`} viewBox="0 0 1000 1000" fill="none" aria-hidden="true" focusable="false">
      {basinContours.map((d, index) => (
        <path d={d} key={index} style={{ '--i': index, '--n': basinContours.length } as React.CSSProperties} />
      ))}
    </svg>
  );
}

/** Elevation profile. Reads as a horizon and can span several sections. */
export function RidgeField({ className = '' }: FieldProps) {
  return (
    <svg className={`artField artFieldRidge ${className}`} viewBox="0 0 1600 620" fill="none" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {ridgeLines.map((d, index) => (
        <path d={d} key={index} style={{ '--i': index, '--n': ridgeLines.length } as React.CSSProperties} />
      ))}
    </svg>
  );
}

/** Shallow strata. Used where a section needs structure but not intensity. */
export function StrataField({ className = '' }: FieldProps) {
  return (
    <svg className={`artField artFieldStrata ${className}`} viewBox="0 0 1600 420" fill="none" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {strataLines.map((d, index) => (
        <path d={d} key={index} style={{ '--i': index, '--n': strataLines.length } as React.CSSProperties} />
      ))}
    </svg>
  );
}

/** Node network. The IA grammar. */
export function NetworkField({ className = '' }: FieldProps) {
  return (
    <svg className={`artField artFieldNetwork ${className}`} viewBox="0 0 1200 760" fill="none" aria-hidden="true" focusable="false">
      <g className="artNetworkEdges">
        {networkEdges.map(([a, b], index) => (
          <line x1={networkNodes[a][0]} y1={networkNodes[a][1]} x2={networkNodes[b][0]} y2={networkNodes[b][1]} key={index} />
        ))}
      </g>
      <g className="artNetworkNodes">
        {networkNodes.map(([x, y], index) => (
          <circle cx={x} cy={y} r={index % 7 === 0 ? 7 : 3.4} key={index} />
        ))}
      </g>
    </svg>
  );
}

/** Engraved halftone. Used for posterized editorial mass, never over covers. */
export function HalftoneField({ className = '' }: FieldProps) {
  return (
    <svg className={`artField artFieldHalftone ${className}`} viewBox="0 0 680 440" fill="none" aria-hidden="true" focusable="false">
      {halftoneDots.map(([x, y, r], index) => (
        <circle cx={x} cy={y} r={r} key={index} />
      ))}
    </svg>
  );
}

/** Modular tessellation. The Gaming grammar. */
export function ModuleField({ className = '' }: FieldProps) {
  const cells = Array.from({ length: 84 }, (_, index) => index);
  return (
    <svg className={`artField artFieldModule ${className}`} viewBox="0 0 840 480" fill="none" aria-hidden="true" focusable="false">
      {cells.map((index) => {
        const col = index % 14;
        const row = Math.floor(index / 14);
        const x = col * 60;
        const y = row * 80;
        const kind = (col * 3 + row * 5) % 4;
        if (kind === 0) return <rect x={x + 8} y={y + 8} width={44} height={64} key={index} />;
        if (kind === 1) return <path d={`M${x + 8} ${y + 72}L${x + 30} ${y + 8}L${x + 52} ${y + 72}Z`} key={index} />;
        if (kind === 2) return <circle cx={x + 30} cy={y + 40} r={20} key={index} />;
        return <path d={`M${x + 8} ${y + 40}H${x + 52}M${x + 30} ${y + 12}V${y + 68}`} key={index} />;
      })}
    </svg>
  );
}

/** Signal bands. The Streaming grammar. */
export function SignalField({ className = '' }: FieldProps) {
  const bands = Array.from({ length: 26 }, (_, index) => index);
  return (
    <svg className={`artField artFieldSignal ${className}`} viewBox="0 0 900 420" fill="none" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      {bands.map((index) => {
        const x = index * 36;
        const amplitude = 24 + ((index * 47) % 9) * 18;
        return <rect x={x} y={210 - amplitude / 2} width={12} height={amplitude} key={index} />;
      })}
    </svg>
  );
}
