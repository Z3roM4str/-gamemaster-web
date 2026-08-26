'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Copy, MessageCircle, X } from 'lucide-react';
import { useExperience } from './experience/useExperience';

const interests = ['Nintendo Switch digital', 'Streaming', 'IA / ChatGPT'];

export function QuoteBuilder() {
  const [copied, setCopied] = useState(false);
  const { selectedGames, selectedCount, interest, quoteMessage, whatsappUrl, setInterest, removeGame } = useExperience();

  const copyRequest = async () => {
    try {
      await navigator.clipboard.writeText(quoteMessage);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const chooseInterest = (value: string) => {
    setInterest(value);
    setCopied(false);
  };

  return (
    <section className="quoteSection" id="cotizar" aria-labelledby="quote-title">
      <div className="sectionShell quoteLayout">
        <div className="quoteCopy">
          <p className="eyebrow"><span /> SOLICITUD DIRECTA</p>
          <h2 id="quote-title">Tu acceso empieza<br /><em>con una elección.</em></h2>
          <p>Elige un interés, agrega varios juegos si quieres y envía una solicitud con los títulos incluidos.</p>
          <div className="quoteHuman"><MessageCircle aria-hidden="true" /><span><strong>Atención humana</strong><small>Precio y disponibilidad se revisan al momento.</small></span></div>
        </div>

        <div className="quoteBuilder">
          <div className="quoteBuilderHeader">
            <span>SOLICITUD / GM</span>
            <strong aria-live="polite">{String(selectedCount).padStart(2, '0')}</strong>
          </div>
          <fieldset className="quoteInterests">
            <legend>¿Qué te interesa?</legend>
            <p>{interest || 'Elige una categoría para orientar tu solicitud.'}</p>
            <div>
              {interests.map((option) => {
                const active = interest === option || (option === 'IA / ChatGPT' && interest === 'ChatGPT');
                return (
                  <button type="button" className={active ? 'isActive' : ''} aria-pressed={active} onClick={() => chooseInterest(option)} key={option}>
                    {active && <Check aria-hidden="true" />} {option}
                  </button>
                );
              })}
            </div>
          </fieldset>
          <div className="quoteSelection" aria-live="polite">
            <div className="quoteSelectionHeading"><span>JUEGOS SELECCIONADOS</span><strong>{selectedCount}</strong></div>
            {selectedGames.length ? (
              <ul>
                {selectedGames.map((game) => (
                  <li key={game.id}><span>{game.title}</span><button type="button" onClick={() => removeGame(game.id)} aria-label={`Quitar ${game.title}`}><X aria-hidden="true" /></button></li>
                ))}
              </ul>
            ) : (
              <p>Agrega juegos desde cualquier portada con el botón <strong>+</strong>. Puedes seleccionar más de uno.</p>
            )}
          </div>
          <button className="copyButton" type="button" onClick={copyRequest}>
            {copied ? <><Check aria-hidden="true" /> Solicitud copiada</> : <><Copy aria-hidden="true" /> Copiar solicitud</>}
          </button>
          <a className="whatsappButton" href={whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle aria-hidden="true" /> Cotizar por WhatsApp <ArrowUpRight aria-hidden="true" /></a>
          <small>No se publica un precio fijo: se confirma antes de cada compra.</small>
        </div>
      </div>
    </section>
  );
}
