'use client';

import { MessageCircle } from 'lucide-react';
import { useExperience } from './experience/useExperience';

export function MobileQuoteBar() {
  const { selectedCount, whatsappUrl } = useExperience();
  return (
    <a className="mobileQuoteBar" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label={`Cotizar por WhatsApp${selectedCount ? ` con ${selectedCount} juegos seleccionados` : ''}`}>
      <MessageCircle aria-hidden="true" /><span>Cotizar{selectedCount ? ` · ${selectedCount}` : ''}</span>
    </a>
  );
}
