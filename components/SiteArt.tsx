'use client';

import { useEffect } from 'react';

export function SiteArt() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let depthLayers = Array.from(document.querySelectorAll<HTMLElement>('[data-gm-depth]'));
    let frame = 0;

    const renderDepth = () => {
      frame = 0;
      if (reducedMotion.matches) {
        root.style.setProperty('--gm-scroll-y', '0px');
        root.style.setProperty('--gm-pointer-x', '0px');
        root.style.setProperty('--gm-pointer-y', '0px');
        depthLayers.forEach((layer) => layer.style.setProperty('--gm-depth-y', '0px'));
        return;
      }

      const viewportCenter = window.innerHeight / 2;
      root.style.setProperty('--gm-scroll-y', `${window.scrollY}px`);
      depthLayers.forEach((layer) => {
        const bounds = layer.getBoundingClientRect();
        const speed = Number(layer.dataset.gmDepth ?? 0);
        const distance = Math.max(-window.innerHeight, Math.min(window.innerHeight, bounds.top + bounds.height / 2 - viewportCenter));
        layer.style.setProperty('--gm-depth-y', `${distance * speed}px`);
      });
    };

    const requestRender = () => {
      if (!frame) frame = window.requestAnimationFrame(renderDepth);
    };

    const handlePointer = (event: PointerEvent) => {
      if (reducedMotion.matches || window.innerWidth < 860) return;
      root.style.setProperty('--gm-pointer-x', `${(event.clientX / window.innerWidth - 0.5) * 18}px`);
      root.style.setProperty('--gm-pointer-y', `${(event.clientY / window.innerHeight - 0.5) * 12}px`);
    };

    renderDepth();
    const observer = new MutationObserver(() => {
      depthLayers = Array.from(document.querySelectorAll<HTMLElement>('[data-gm-depth]'));
      requestRender();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('scroll', requestRender, { passive: true });
    window.addEventListener('resize', requestRender);
    window.addEventListener('pointermove', handlePointer, { passive: true });
    reducedMotion.addEventListener('change', requestRender);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('scroll', requestRender);
      window.removeEventListener('resize', requestRender);
      window.removeEventListener('pointermove', handlePointer);
      reducedMotion.removeEventListener('change', requestRender);
      root.style.removeProperty('--gm-scroll-y');
      root.style.removeProperty('--gm-pointer-x');
      root.style.removeProperty('--gm-pointer-y');
      depthLayers.forEach((layer) => layer.style.removeProperty('--gm-depth-y'));
    };
  }, []);

  return (
    <div className="siteArt" aria-hidden="true">
      <div className="siteArtWorld" />
      <div className="siteArtBlackField" />

      <svg className="siteArtNetwork" viewBox="0 0 1600 1000" fill="none">
        <path d="M-80 180C190 96 338 116 514 258C676 388 854 380 1014 244C1186 98 1354 86 1688 218" />
        <path d="M-120 292C180 192 350 224 526 360C688 486 860 468 1028 342C1214 202 1390 188 1720 306" />
        <path d="M58 790L244 632L438 672L610 514L818 566L982 404L1198 472L1512 226" />
        <circle cx="244" cy="632" r="9" /><circle cx="438" cy="672" r="9" />
        <circle cx="610" cy="514" r="9" /><circle cx="818" cy="566" r="9" />
        <circle cx="982" cy="404" r="9" /><circle cx="1198" cy="472" r="9" />
      </svg>

      <svg className="siteArtTopo" viewBox="0 0 900 1100" fill="none">
        <path d="M88 498C86 278 256 96 483 92C714 88 850 282 816 502C780 730 602 918 374 904C162 892 90 716 88 498Z" />
        <path d="M154 500C152 322 292 168 480 164C670 160 782 318 752 502C722 692 576 844 390 832C214 822 156 680 154 500Z" />
        <path d="M224 502C222 366 330 246 478 244C626 242 712 360 688 504C664 650 552 766 408 758C270 750 226 638 224 502Z" />
        <path d="M298 504C296 412 370 326 478 326C584 326 648 406 630 504C614 608 530 686 424 680C326 674 300 598 298 504Z" />
      </svg>

      <div className="siteArtRedFore" />
      <div className="siteArtCoordinate"><span>GM / DEPTH SYSTEM</span><span>19.4326°N · 99.1332°W</span></div>
    </div>
  );
}
