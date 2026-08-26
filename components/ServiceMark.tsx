export function ServiceMark({ src, className = '' }: { src: string; className?: string }) {
  return (
    <span
      className={`serviceMark ${className}`}
      style={{ WebkitMaskImage: `url(${src})`, maskImage: `url(${src})` }}
      aria-hidden="true"
    />
  );
}
