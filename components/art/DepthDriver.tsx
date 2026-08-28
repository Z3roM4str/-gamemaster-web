'use client';

import { useEffect, useState } from 'react';

/**
 * Drives the composition's differential motion.
 *
 * Plane relationship (see docs/CODEX_VISUAL_GUARDRAILS.md):
 *   blue rear field  -> slowest, driven by page progress;
 *   black/base       -> effectively still;
 *   red front plane  -> the most noticeable, driven per element.
 *
 * Nothing here duplicates geometry: every element moves once, as itself.
 */

const zones = [
  ['inicio', 'SEÑAL'],
  ['universos', 'UNIVERSOS'],
  ['catalogo', 'BIBLIOTECA'],
  ['modalidades', 'ACCESO'],
  ['servicios', 'SERVICIOS'],
  ['cotizar', 'CONTACTO'],
] as const;

export function DepthDriver() {
  const [activeZone, setActiveZone] = useState(0);
  const [presentZones, setPresentZones] = useState<number[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let layers = Array.from(document.querySelectorAll<HTMLElement>('[data-gm-depth]'));
    let frame = 0;

    const render = () => {
      frame = 0;
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));
      root.style.setProperty('--gm-progress', progress.toFixed(4));

      if (reducedMotion.matches) {
        layers.forEach((layer) => layer.style.setProperty('--gm-depth-y', '0px'));
        root.style.setProperty('--gm-pointer-x', '0px');
        root.style.setProperty('--gm-pointer-y', '0px');
        return;
      }

      const middle = window.innerHeight / 2;
      layers.forEach((layer) => {
        const bounds = layer.getBoundingClientRect();
        if (bounds.bottom < -window.innerHeight || bounds.top > window.innerHeight * 2) return;
        const speed = Number(layer.dataset.gmDepth ?? 0);
        const distance = Math.max(-window.innerHeight, Math.min(window.innerHeight, bounds.top + bounds.height / 2 - middle));
        layer.style.setProperty('--gm-depth-y', `${(distance * speed).toFixed(2)}px`);
      });
    };

    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const handlePointer = (event: PointerEvent) => {
      if (reducedMotion.matches || window.innerWidth < 1024) return;
      root.style.setProperty('--gm-pointer-x', `${((event.clientX / window.innerWidth - 0.5) * 20).toFixed(2)}px`);
      root.style.setProperty('--gm-pointer-y', `${((event.clientY / window.innerHeight - 0.5) * 14).toFixed(2)}px`);
    };

    render();

    const observer = new MutationObserver(() => {
      layers = Array.from(document.querySelectorAll<HTMLElement>('[data-gm-depth]'));
      requestRender();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const sections = zones
      .map(([id], index) => ({ index, element: document.getElementById(id) }))
      .filter((zone): zone is { index: number; element: HTMLElement } => Boolean(zone.element));
    // Deferred: the spine only exists once the document's zones are known.
    const spineFrame = window.requestAnimationFrame(() => setPresentZones(sections.map((zone) => zone.index)));

    const zoneObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;
        const top = visible.reduce((best, entry) => (entry.boundingClientRect.top < best.boundingClientRect.top ? entry : best));
        const match = sections.find((zone) => zone.element === top.target);
        if (match) setActiveZone(match.index);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );
    sections.forEach((zone) => zoneObserver.observe(zone.element));

    window.addEventListener('scroll', requestRender, { passive: true });
    window.addEventListener('resize', requestRender);
    window.addEventListener('pointermove', handlePointer, { passive: true });
    reducedMotion.addEventListener('change', requestRender);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(spineFrame);
      observer.disconnect();
      zoneObserver.disconnect();
      window.removeEventListener('scroll', requestRender);
      window.removeEventListener('resize', requestRender);
      window.removeEventListener('pointermove', handlePointer);
      reducedMotion.removeEventListener('change', requestRender);
      root.style.removeProperty('--gm-progress');
      root.style.removeProperty('--gm-pointer-x');
      root.style.removeProperty('--gm-pointer-y');
      layers.forEach((layer) => layer.style.removeProperty('--gm-depth-y'));
    };
  }, []);

  if (presentZones.length < 2) return null;

  return (
    <div className="pageSpine" aria-hidden="true">
      <span className="pageSpineRule" />
      <ol className="pageSpineTicks">
        {presentZones.map((zoneIndex) => (
          <li className={zoneIndex === activeZone ? 'isActive' : ''} key={zones[zoneIndex][0]}>
            <i />
            <b>{zones[zoneIndex][1]}</b>
          </li>
        ))}
      </ol>
    </div>
  );
}
