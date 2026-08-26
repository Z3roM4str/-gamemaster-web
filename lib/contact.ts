export const WHATSAPP_BASE = 'https://wa.me/525527699426';
export const FACEBOOK_URL = 'https://www.facebook.com/share/1JKTPgejVZ/?mibextid=wwXIfr';

export function toWhatsApp(message: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

export function buildQuoteMessage(interest: string, gameTitles: string[]) {
  const interestLine = interest
    ? `Me interesa: ${interest}.`
    : 'Quiero orientación para elegir una opción digital.';
  const gamesLine = gameTitles.length
    ? ` Juegos seleccionados (${gameTitles.length}): ${gameTitles.join(', ')}.`
    : '';

  return `Hola, quiero cotizar con GameMaster. ${interestLine}${gamesLine} ¿Me ayudan a revisar precio y disponibilidad?`;
}

export function gameQuoteMessage(title: string, platform: string) {
  return `Hola, quiero cotizar ${title} para ${platform}. ¿Me ayudan a revisar precio, modalidad y disponibilidad?`;
}

export const GENERAL_CONTACT_URL = toWhatsApp(
  'Hola, quiero conocer las opciones de GameMaster para Nintendo Switch, streaming, IA o privacidad digital.',
);
