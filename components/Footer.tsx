import { ArrowUpRight } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { FACEBOOK_URL, GENERAL_CONTACT_URL } from '@/lib/contact';

export function Footer() {
  return (
    <footer>
      <div className="sectionShell footerTop">
        <BrandMark />
        <p>Gaming Nintendo digital, streaming e IA en una experiencia de descubrimiento clara, visual y atendida directamente.</p>
        <div className="footerContact">
          <a href={GENERAL_CONTACT_URL} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight aria-hidden="true" /></a>
          <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Facebook <ArrowUpRight aria-hidden="true" /></a>
        </div>
      </div>
      <div className="sectionShell footerBottom">
        <span>© {new Date().getFullYear()} GAMEMASTER</span>
        <p>Negocio independiente. Las marcas y artes mostradas pertenecen a sus respectivos titulares; no implican afiliación ni patrocinio.</p>
      </div>
    </footer>
  );
}
