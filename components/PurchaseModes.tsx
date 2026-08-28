import { ArrowRight, Check, ShieldCheck, UserRound, UsersRound, Wifi, WifiOff } from 'lucide-react';
import { StrataField } from './art/Fields';

const steps = [
  ['01', 'Elige tus juegos', 'Busca en el catálogo y agrega los títulos que quieres revisar.'],
  ['02', 'Confirmamos contigo', 'Revisamos precio, modalidad y disponibilidad antes de cualquier pago.'],
  ['03', 'Realiza tu pago', 'Transferencia o depósito después de validar tu solicitud.'],
  ['04', 'Descarga y juega', 'Recibes las indicaciones para descargar el título en tu consola.'],
];

/**
 * The calm plateau of the page: a wide blue stratum behind two neutral reading
 * columns, with a single red rule marking the recommended option. Reading
 * surfaces stay neutral — the chromatic work happens around them.
 */
export function PurchaseModes() {
  return (
    <section className="modesSection" id="modalidades" aria-labelledby="modes-title">
      <div className="modesField" aria-hidden="true">
        <span className="modesStratum" data-gm-depth="0.03"><StrataField /></span>
        <span className="modesBlade" data-gm-depth="-0.05" />
      </div>

      <div className="modesHeading">
        <p className="eyebrow">Dos formas de acceso</p>
        <h2 id="modes-title">
          Elige cómo<br />
          <em>quieres jugar.</em>
        </h2>
        <p>Ambas opciones corresponden al mismo juego digital completo. La forma de acceso y la verificación de internet son distintas.</p>
      </div>

      <div className="modeColumns">
        <article className="modeColumn isRecommended">
          <p className="modeTag"><UserRound aria-hidden="true" /> Mayor comodidad</p>
          <span className="modeNumber" aria-hidden="true">01</span>
          <h3>Cuenta Principal</h3>
          <ul>
            <li><Check aria-hidden="true" /><span>Juega con cualquier usuario o perfil de la consola.</span></li>
            <li><WifiOff aria-hidden="true" /><span>Puede abrirse y jugarse sin conexión a internet.</span></li>
            <li><Check aria-hidden="true" /><span>La opción de mayor comodidad según la información fuente.</span></li>
          </ul>
          <a href="#cotizar">Consultar esta modalidad <ArrowRight aria-hidden="true" /></a>
        </article>

        <span className="modeAperture" aria-hidden="true" />

        <article className="modeColumn">
          <p className="modeTag"><UsersRound aria-hidden="true" /> Opción económica</p>
          <span className="modeNumber" aria-hidden="true">02</span>
          <h3>Cuenta Secundaria</h3>
          <ul>
            <li><Check aria-hidden="true" /><span>Se juega desde el perfil proporcionado para el título.</span></li>
            <li><Wifi aria-hidden="true" /><span>Necesita una conexión breve al abrir para verificar.</span></li>
            <li><UserRound aria-hidden="true" /><span>El juego en línea depende del título y se confirma antes.</span></li>
          </ul>
          <a href="#cotizar">Consultar esta modalidad <ArrowRight aria-hidden="true" /></a>
        </article>

        <aside className="modeAssist">
          <ShieldCheck aria-hidden="true" />
          <strong>Te ayudamos a elegir.</strong>
          <p>No necesitas decidir a ciegas: revisamos contigo el título, la modalidad y las condiciones aplicables.</p>
        </aside>
      </div>

      <ol className="purchaseLedger">
        {steps.map(([number, title, description]) => (
          <li key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
