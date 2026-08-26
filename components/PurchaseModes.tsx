import { ArrowRight, Check, Gamepad2, ShieldCheck, UserRound, UsersRound, Wifi, WifiOff } from 'lucide-react';

export function PurchaseModes() {
  const steps = [
    ['01', 'Elige tus juegos', 'Busca en el catálogo y agrega los títulos que quieres revisar.'],
    ['02', 'Confirmamos contigo', 'Revisamos precio, modalidad y disponibilidad antes de cualquier pago.'],
    ['03', 'Realiza tu pago', 'Transferencia o depósito después de validar tu solicitud.'],
    ['04', 'Descarga y juega', 'Recibes las indicaciones para descargar el título en tu consola.'],
  ];

  return (
    <section className="modesSection" id="modalidades" aria-labelledby="modes-title">
      <div className="sectionShell">
        <div className="splitHeading splitHeadingDark">
          <div>
            <p className="eyebrow"><span /> DOS FORMAS DE ACCESO</p>
            <h2 id="modes-title">Elige cómo<br /><em>quieres jugar.</em></h2>
          </div>
          <p>Ambas opciones corresponden al mismo juego digital completo. La forma de acceso y la verificación de internet son distintas.</p>
        </div>
        <div className="modeGrid">
          <article className="modeCard modePrincipal">
            <div className="modeLabel"><UserRound aria-hidden="true" /><span>MAYOR COMODIDAD</span></div>
            <span className="modeNumber" aria-hidden="true">01</span>
            <h3>Cuenta<br />Principal</h3>
            <ul>
              <li><Check aria-hidden="true" /><span>Juega con cualquier usuario o perfil de la consola.</span></li>
              <li><WifiOff aria-hidden="true" /><span>Puede abrirse y jugarse sin conexión a internet.</span></li>
              <li><Gamepad2 aria-hidden="true" /><span>La opción de mayor comodidad según la información fuente.</span></li>
            </ul>
            <a href="#cotizar">Consultar esta modalidad <ArrowRight aria-hidden="true" /></a>
          </article>
          <article className="modeCard modeSecondary">
            <div className="modeLabel"><UsersRound aria-hidden="true" /><span>OPCIÓN ECONÓMICA</span></div>
            <span className="modeNumber" aria-hidden="true">02</span>
            <h3>Cuenta<br />Secundaria</h3>
            <ul>
              <li><Check aria-hidden="true" /><span>Se juega desde el perfil proporcionado para el título.</span></li>
              <li><Wifi aria-hidden="true" /><span>Necesita una conexión breve al abrir para verificar.</span></li>
              <li><UserRound aria-hidden="true" /><span>El juego en línea depende del título y se confirma antes.</span></li>
            </ul>
            <a href="#cotizar">Consultar esta modalidad <ArrowRight aria-hidden="true" /></a>
          </article>
          <aside className="modeAssistance">
            <ShieldCheck aria-hidden="true" />
            <span>DECISIÓN ASISTIDA</span>
            <strong>Te ayudamos a elegir.</strong>
            <p>No necesitas decidir a ciegas: revisamos contigo el título, la modalidad y las condiciones aplicables.</p>
          </aside>
        </div>
        <ol className="purchaseSteps">
          {steps.map(([number, title, description]) => (
            <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
