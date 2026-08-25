import CatalogExplorer from "@/components/CatalogExplorer";
import { serviceFamilies } from "@/data/serviceFamilies";

const whatsappBase = "https://wa.me/525527699426";

export default function HomePage() {
  return (
    <main>
      <header className="siteHeader">
        <a className="brand" href="#top" aria-label="GameMaster inicio">
          <span className="brandMark" aria-hidden="true">GM</span>
          <span className="brandName">GameMaster</span>
        </a>
        <nav className="desktopNav" aria-label="Navegación principal">
          <a href="#gaming">Gaming</a>
          <a href="#universos">Streaming</a>
          <a href="#universos">IA</a>
          <a href="#como-funciona">Cómo funciona</a>
        </nav>
        <a className="miniCta chromaticEdge" href={whatsappBase} target="_blank" rel="noreferrer">
          WhatsApp
        </a>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <p className="eyebrow">GAMING · STREAMING · IA</p>
          <h1>
            Tu universo digital,
            <span className="heroAccent" data-text=" en un solo lugar."> en un solo lugar.</span>
          </h1>
          <p className="heroLead">
            Descubre videojuegos, membresías y herramientas digitales en una experiencia visual hecha para explorar. Precio y disponibilidad se confirman al momento.
          </p>
          <div className="heroActions">
            <a className="primaryCta chromaticEdge" href="#gaming">Explorar catálogo</a>
            <a
              className="secondaryCta"
              href={`${whatsappBase}?text=${encodeURIComponent("Hola, quiero cotizar un producto de GameMaster.")}`}
              target="_blank"
              rel="noreferrer"
            >
              Cotizar por WhatsApp
            </a>
          </div>
          <div className="heroMeta" aria-label="Características">
            <span>Digital</span>
            <span>Switch 1 & 2</span>
            <span>Consulta directa</span>
          </div>
        </div>

        <div className="heroArt" aria-hidden="true">
          <div className="topography topoA" />
          <div className="topography topoB" />
          <div className="signalGrid" />
          <div className="heroGlyph glyphBlue">∞</div>
          <div className="heroGlyph glyphRed">GM</div>
          <div className="orbit orbitOne" />
          <div className="orbit orbitTwo" />
          <div className="posterPlane posterBlue" />
          <div className="posterPlane posterNeutral">
            <span>PLAY</span>
            <strong>DISCOVER</strong>
            <span>CONNECT</span>
          </div>
          <div className="posterPlane posterRed" />
        </div>
      </section>

      <section className="sectionShell" id="universos">
        <div className="sectionHeading">
          <p className="eyebrow">TRES UNIVERSOS</p>
          <h2>Entra por lo que estás buscando.</h2>
        </div>
        <div className="universeGrid">
          {serviceFamilies.map((family, index) => {
            const href = family.id === "gaming"
              ? "#gaming"
              : `${whatsappBase}?text=${encodeURIComponent(`Hola, quiero información de ${family.label} en GameMaster.`)}`;

            return (
              <a
                key={family.id}
                className={`universeCard universe-${family.id}`}
                href={href}
                target={family.id === "gaming" ? undefined : "_blank"}
                rel={family.id === "gaming" ? undefined : "noreferrer"}
              >
                <div className="universeIndex">0{index + 1}</div>
                <p>{family.kicker}</p>
                <h3>{family.label}</h3>
                <span>{family.description}</span>
                <div className="tagRow">
                  {family.examples.slice(0, 4).map((example) => <b key={example}>{example}</b>)}
                </div>
                <strong className="cardLink">{family.cta} →</strong>
              </a>
            );
          })}
        </div>
      </section>

      <section className="catalogSection" id="gaming">
        <div className="sectionShell">
          <div className="sectionHeading splitHeading">
            <div>
              <p className="eyebrow">CATÁLOGO GAMING</p>
              <h2>Encuentra tu siguiente juego.</h2>
            </div>
            <p className="sectionNote">Busca por título o explora las colecciones del catálogo actual.</p>
          </div>
          <CatalogExplorer />
        </div>
      </section>

      <section className="sectionShell processSection" id="como-funciona">
        <div className="sectionHeading">
          <p className="eyebrow">CÓMO FUNCIONA</p>
          <h2>Dos opciones para Nintendo Switch.</h2>
        </div>
        <div className="processGrid">
          <article className="processCard chromaticEdge">
            <span className="processNumber">01</span>
            <p className="eyebrow">MAYOR COMODIDAD</p>
            <h3>Cuenta Principal</h3>
            <ul>
              <li>Puedes jugar con cualquier usuario.</li>
              <li>La fuente comercial indica uso 100% offline para abrir y jugar.</li>
              <li>También puede jugarse en línea.</li>
            </ul>
          </article>
          <article className="processCard chromaticEdge inverseEdge">
            <span className="processNumber">02</span>
            <p className="eyebrow">OPCIÓN ECONÓMICA</p>
            <h3>Cuenta Secundaria</h3>
            <ul>
              <li>Juegas desde el perfil proporcionado.</li>
              <li>Necesita internet al abrir para una comprobación rápida.</li>
              <li>Solo algunos títulos permiten juego en línea bajo esta opción.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="quoteBand">
        <div>
          <p className="eyebrow">PRECIO Y DISPONIBILIDAD AL MOMENTO</p>
          <h2>Ya encontraste algo. Ahora cotízalo.</h2>
        </div>
        <a
          className="primaryCta chromaticEdge"
          href={`${whatsappBase}?text=${encodeURIComponent("Hola, vi el catálogo de GameMaster y quiero cotizar.")}`}
          target="_blank"
          rel="noreferrer"
        >
          Abrir WhatsApp
        </a>
      </section>

      <footer>
        <a className="brand footerBrand" href="#top">
          <span className="brandMark" aria-hidden="true">GM</span>
          <span className="brandName">GameMaster</span>
        </a>
        <p>Gaming · Streaming · IA</p>
        <div className="footerLinks">
          <a href={whatsappBase} target="_blank" rel="noreferrer">WhatsApp</a>
          <a href="https://www.facebook.com/share/1JKTPgejVZ/?mibextid=wwXIfr" target="_blank" rel="noreferrer">Facebook</a>
        </div>
      </footer>
    </main>
  );
}
