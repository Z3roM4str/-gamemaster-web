'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { useExperience } from './experience/useExperience';

const navigation = [
  ['Inicio', '#inicio'],
  ['Gaming', '#catalogo'],
  ['Streaming', '#streaming'],
  ['IA', '#ia'],
  ['Privacidad', '#privacidad'],
  ['Cómo funciona', '#modalidades'],
  ['FAQ', '#preguntas'],
  ['Contacto', '#cotizar'],
];

export function Header({ homePath = '' }: { homePath?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { selectedCount } = useExperience();

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const resolveHref = (hash: string) => `${homePath}${hash}`;

  return (
    <header className="siteHeader">
      <a className="brandLink" href={resolveHref('#inicio')} aria-label="GameMaster, ir al inicio">
        <BrandMark />
      </a>
      <nav id="primary-navigation" className={menuOpen ? 'isOpen' : ''} aria-label="Navegación principal">
        {navigation.map(([label, href]) => (
          <a href={resolveHref(href)} onClick={() => setMenuOpen(false)} key={href}>{label}</a>
        ))}
      </nav>
      <a className="headerCta" href={resolveHref('#cotizar')}>
        {selectedCount ? `Cotización · ${selectedCount}` : 'Cotizar ahora'} <ArrowUpRight aria-hidden="true" />
      </a>
      <button
        ref={menuButtonRef}
        className="menuButton"
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((current) => !current)}
      >
        {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>
    </header>
  );
}
