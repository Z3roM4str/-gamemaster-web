import { ArrowUpRight } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { FACEBOOK_URL, GENERAL_CONTACT_URL } from '@/lib/contact';

/** The composition terminates rather than stops: the wordmark becomes the last
 *  rear structure, cropped by the bottom edge of the document. */
export function Footer() {
  return (
    <footer className="siteFooter">
      <span className="footerWordmark" aria-hidden="true">GAMEMASTER</span>
      <div className="footerTop">
        <BrandMark />
        <p>Gaming Nintendo digital, streaming, IA y privacidad en una experiencia de descubrimiento clara, visual y atendida directamente.</p>
        <div className="footerContact">
          <a href={GENERAL_CONTACT_URL} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight aria-hidden="true" /></a>
          <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Facebook <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </div>
      <div className="footerBottom">
        <span>© {new Date().getFullYear()} GameMaster</span>
        <p>Negocio independiente. Las marcas y artes mostradas pertenecen a sus respectivos titulares; no implican afiliación ni patrocinio.</p>
      </div>
    </footer>
  );
}
