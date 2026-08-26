export function ServiceMark({ src, className = '' }: { src: string; className?: string }) {
  const usesOriginalArtwork = src.endsWith('/nintendo-switch.svg');

  return (
    <span
      className={`serviceMark ${usesOriginalArtwork ? 'serviceMarkImage' : ''} ${className}`}
      style={usesOriginalArtwork
        ? { backgroundImage: `url(${src})` }
        : { WebkitMaskImage: `url(${src})`, maskImage: `url(${src})` }}
      aria-hidden="true"
    />
  );
}
