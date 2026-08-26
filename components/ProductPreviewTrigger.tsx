'use client';

import type { ReactNode } from 'react';
import { useExperience } from './experience/useExperience';

export function ProductPreviewTrigger({ slug, label, className, children }: {
  slug: string;
  label: string;
  className: string;
  children: ReactNode;
}) {
  const { openPreview } = useExperience();

  return (
    <button className={className} onClick={() => openPreview(slug)} aria-label={label}>
      {children}
    </button>
  );
}
