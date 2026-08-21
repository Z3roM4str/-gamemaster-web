'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, BadgeCheck, BrainCircuit, Check, ChevronRight,
  Copy, Download, Gamepad2, Menu, MessageCircle,
  Search, ShieldCheck, Tv2, UserRound, UsersRound, Wifi, WifiOff,
  X, Zap,
} from 'lucide-react';
import { catalog, categories, type Game } from './data/catalog';

const featured = catalog.filter((game) => game.image).slice(0, 4);

const categoryStats = [
  ['RPG y aventuras', '30'], ['Otros destacados', '30'], ['Mundo Mario', '22'],
  ['Clásicos y joyas', '14'], ['Shooter', '12'], ['Pokémon', '9'], ['Zelda', '8'],
  ['Switch 2', '5'], ['Indies', '4'],
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-label="Game Master">
      <Image src="/brand/game-master-logo.jpg" alt="Game Master" fill sizes="150px" priority />
    </span>
  );
}

function AbstractCover({ game }: { game: Game }) {
  const initials = game.title.split(/\s+/).slice(0, 2).map((word) => word[0]).join('');
  return (
    <div className={`abstract-cover cover-${game.category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
      <Gamepad2 size={34} strokeWidth={1.4} />
      <strong>{initials}</strong>
      <span>{game.category}</span>
    </div>
  );
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [visible, setVisible] = useState(12);
  const [selected, setSelected] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('es');
    return catalog.filter((game) => {
      const categoryMatch = activeCategory === 'Todos' || game.category === activeCategory;
      const queryMatch = !normalized || game.title.toLocaleLowerCase('es').includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [activeCategory, query]);

  const toggleGame = (game: Game) => {
    setSelected((current) => current.includes(game.title)
      ? current.filter((title) => title !== game.title)
      : [...current, game.title]);
    setCopied(false);
  };

  const copyRequest = async () => {
    const games = selected.length ? selected.join(', ') : 'Aún no he elegido un título';
    const message = `Hola, quiero cotizar juegos digitales con Game Master. Me interesan: ${games}. ¿Me ayudan a revisar precio, modalidad y disponibilidad?`;
    await navigator.clipboard.writeText(message);
    setCopied(true);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand-link" href="#inicio" aria-label="Game Master, inicio"><BrandMark /></a>
        <nav className={menuOpen ? 'open' : ''} aria-label="Navegación principal">
          <a href="#catalogo" onClick={() => setMenuOpen(false)}>Catálogo</a>
          <a href="#modalidades" onClick={() => setMenuOpen(false)}>Cómo funciona</a>
          <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
          <a href="#preguntas" onClick={() => setMenuOpen(false)}>Preguntas</a>
        </nav>
        <a className="header-cta" href="#cotizar">Cotizar ahora <ArrowUpRight size={15} /></a>
        <button
          className="menu-button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-copy">
          <p className="eyebrow"><span /> TU PRÓXIMA PARTIDA EMPIEZA AQUÍ</p>
          <h1>El juego que buscas.<em> Sin complicaciones.</em></h1>
          <p className="hero-text">
            Juegos digitales para Nintendo Switch y Switch 2. Explora el catálogo,
            elige tus títulos y recibe una cotización personalizada.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#catalogo">Explorar catálogo <ArrowRight size={18} /></a>
            <a className="secondary-button" href="#modalidades"><span><Zap size={14} /></span> Cómo funciona</a>
          </div>
          <div className="trust-row">
            <span><BadgeCheck /> Atención personal</span>
            <span><Download /> Entrega digital</span>
            <span><ShieldCheck /> Cotización al momento</span>
          </div>
        </div>

        <div className="hero-stage" aria-label="Selección destacada del catálogo">
          <div className="stage-lines" />
          {featured.slice(0, 3).map((game, index) => (
            <button
              className={`hero-game hero-game-${index + 1}`}
              key={game.id}
              onClick={() => toggleGame(game)}
              aria-label={`Añadir ${game.title} a la cotización`}
            >
              <Image src={game.image!} alt={`Arte oficial de ${game.title}`} fill sizes="(max-width: 700px) 62vw, 300px" />
              <span><small>{game.platform}</small><strong>{game.title}</strong></span>
            </button>
          ))}
          <p className="stage-index">01 <span>/ 03</span></p>
          <p className="stage-kicker">SELECCIÓN GAME MASTER</p>
          <div className="catalog-count"><strong>134</strong><span>TÍTULOS<br />DOCUMENTADOS</span></div>
        </div>
      </section>

      <div className="genre-strip">
        {['SWITCH 2', 'MUNDO MARIO', 'ZELDA', 'POKÉMON', 'INDIES', 'RPG & AVENTURAS'].map((genre) => (
          <span key={genre}>{genre}<i /></span>
        ))}
      </div>

      <section className="catalog-section section-shell" id="catalogo">
        <div className="section-heading catalog-heading">
          <div>
            <p className="eyebrow"><span /> CATÁLOGO DESDE NOTION</p>
            <h2>Encuentra tu<br /><em>próxima aventura.</em></h2>
          </div>
          <p>
            La base maestra reúne 134 títulos. Mostramos una selección para explorar;
            si no ves el tuyo, agrégalo en tu solicitud.
          </p>
        </div>

        <div className="catalog-tools">
          <label className="search-box">
            <Search size={19} />
            <span className="sr-only">Buscar juego</span>
            <input value={query} onChange={(event) => { setQuery(event.target.value); setVisible(12); }} placeholder="Buscar por título..." />
            <kbd>{results.length}</kbd>
          </label>
          <div className="filter-row" aria-label="Filtrar por categoría">
            {categories.map((category) => (
              <button
                className={activeCategory === category ? 'active' : ''}
                onClick={() => { setActiveCategory(category); setVisible(12); }}
                key={category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {results.length ? (
          <>
            <div className="game-grid">
              {results.slice(0, visible).map((game, index) => {
                const isSelected = selected.includes(game.title);
                return (
                  <article className="catalog-card" key={game.id}>
                    <button className="game-visual" onClick={() => toggleGame(game)} aria-label={`${isSelected ? 'Quitar' : 'Añadir'} ${game.title}`}>
                      {game.image ? (
                        <Image src={game.image} alt={`Arte oficial de ${game.title}`} fill sizes="(max-width: 650px) 100vw, (max-width: 1000px) 50vw, 25vw" />
                      ) : <AbstractCover game={game} />}
                      <span className="platform-badge">{game.platform === 'Nintendo Switch 2' ? 'SWITCH 2' : 'SWITCH'}</span>
                      <span className={`select-mark ${isSelected ? 'selected' : ''}`}>{isSelected ? <Check /> : '+'}</span>
                    </button>
                    <div className="game-info">
                      <p>{String(index + 1).padStart(2, '0')} · {game.category}</p>
                      <h3>{game.title}</h3>
                      <button onClick={() => toggleGame(game)}>
                        {isSelected ? 'En tu cotización' : 'Consultar disponibilidad'} <ChevronRight size={15} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
            {visible < results.length && (
              <button className="load-more" onClick={() => setVisible((current) => current + 12)}>
                Ver más juegos <span>{visible} / {results.length}</span>
              </button>
            )}
          </>
        ) : (
          <div className="empty-results">
            <Search />
            <h3>No aparece en esta selección</h3>
            <p>Podemos buscarlo y revisar disponibilidad. Agrégalo como título libre en tu solicitud.</p>
            <a href="#cotizar">Preparar solicitud <ArrowRight /></a>
          </div>
        )}
      </section>

      <section className="process-section" id="modalidades">
        <div className="section-shell">
          <div className="section-heading compact">
            <div>
              <p className="eyebrow"><span /> CLARO DESDE EL PRINCIPIO</p>
              <h2>Elige cómo<br /><em>quieres jugar.</em></h2>
            </div>
            <p>Son juegos digitales completos. La diferencia está en la forma de acceso y el uso de internet.</p>
          </div>

          <div className="mode-grid">
            <article className="mode-card principal">
              <div className="mode-top"><UserRound /><span>MAYOR COMODIDAD</span></div>
              <p className="mode-number">01</p>
              <h3>Cuenta<br />Principal</h3>
              <ul>
                <li><Check /> Juega con cualquier usuario de tu consola.</li>
                <li><WifiOff /> Abre y juega sin conexión a internet.</li>
                <li><Gamepad2 /> Modalidad cómoda para uso cotidiano.</li>
              </ul>
              <a href="#cotizar">Consultar esta modalidad <ArrowRight /></a>
            </article>
            <article className="mode-card secondary">
              <div className="mode-top"><UsersRound /><span>OPCIÓN ECONÓMICA</span></div>
              <p className="mode-number">02</p>
              <h3>Cuenta<br />Secundaria</h3>
              <ul>
                <li><Check /> Mismo juego digital completo.</li>
                <li><Wifi /> Requiere conexión breve al abrir.</li>
                <li><UserRound /> Se juega desde el perfil proporcionado.</li>
              </ul>
              <a href="#cotizar">Consultar esta modalidad <ArrowRight /></a>
            </article>
            <aside className="mode-note">
              <ShieldCheck />
              <strong>Te ayudamos a elegir</strong>
              <p>La modalidad y el juego en línea se verifican para cada título antes de confirmar.</p>
            </aside>
          </div>

          <div className="steps">
            {[
              ['01', 'Elige tus juegos', 'Busca en el catálogo o dinos el título que necesitas.'],
              ['02', 'Revisamos al momento', 'Confirmamos precio, modalidad y disponibilidad real.'],
              ['03', 'Realiza tu pago', 'Transferencia o depósito después de confirmar tu pedido.'],
              ['04', 'Descarga y juega', 'Recibes el acceso digital y descargas en tu consola.'],
            ].map(([number, title, text]) => (
              <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section section-shell" id="servicios">
        <div className="section-heading services-heading">
          <div>
            <p className="eyebrow"><span /> MÁS FORMAS DE DISFRUTAR</p>
            <h2>Tu mundo digital,<br /><em>en un solo lugar.</em></h2>
          </div>
          <p>Esta es la oferta real comunicada por Game Master. Cada membresía, herramienta o plataforma se valida antes de cotizar.</p>
        </div>
        <div className="services-showcase">
          <figure className="services-poster">
            <Image
              src="/brand/servicios-game-master.jpg"
              alt="Servicios Game Master: Netflix, Spotify, HBO Max, Crunchyroll, Apple TV+, Disney+, Amazon Prime, YouTube Music, ChatGPT, Perplexity Pro, Abacus.AI, Gemini, Steam, Nintendo Switch, PlayStation y Xbox Game Pass"
              fill
              sizes="(max-width: 900px) 100vw, 430px"
            />
            <figcaption>Material oficial proporcionado por Game Master</figcaption>
          </figure>

          <div className="service-catalog">
            <article className="service-category streaming-category">
              <div className="service-category-icon"><Tv2 /></div>
              <div className="service-category-copy">
                <small>01 · MEMBRESÍAS</small>
                <h3>Streaming &amp; música</h3>
                <p>Entretenimiento, series, películas, anime y música.</p>
                <div className="service-tags">
                  {['Netflix', 'Spotify', 'HBO Max', 'Crunchyroll', 'Apple TV+', 'Disney+', 'Amazon Prime', 'YouTube Music'].map((service) => <span key={service}>{service}</span>)}
                </div>
              </div>
              <a href="#cotizar" aria-label="Consultar membresías">Consultar <ArrowUpRight /></a>
            </article>

            <article className="service-category ai-category">
              <div className="service-category-icon"><BrainCircuit /></div>
              <div className="service-category-copy">
                <small>02 · PRODUCTIVIDAD</small>
                <h3>Inteligencia artificial</h3>
                <p>Herramientas digitales sujetas a plan y disponibilidad.</p>
                <div className="service-tags">
                  {['ChatGPT', 'Perplexity Pro', 'Abacus.AI', 'Gemini'].map((service) => <span key={service}>{service}</span>)}
                </div>
              </div>
              <a href="#cotizar" aria-label="Consultar herramientas de inteligencia artificial">Consultar <ArrowUpRight /></a>
            </article>

            <article className="service-category gaming-category">
              <div className="service-category-icon"><Gamepad2 /></div>
              <div className="service-category-copy">
                <small>03 · VIDEOJUEGOS</small>
                <h3>Plataformas gamer</h3>
                <p>Opciones digitales para consola y PC.</p>
                <div className="service-tags">
                  {['Steam', 'Nintendo Switch', 'PlayStation', 'Xbox Game Pass'].map((service) => <span key={service}>{service}</span>)}
                </div>
              </div>
              <a href="#cotizar" aria-label="Consultar plataformas de videojuegos">Consultar <ArrowUpRight /></a>
            </article>

            <p className="service-disclaimer">Las marcas pertenecen a sus respectivos titulares. Su presencia indica servicios consultables y no afiliación oficial.</p>
          </div>
        </div>
      </section>

      <section className="quote-section" id="cotizar">
        <div className="section-shell quote-grid">
          <div className="quote-copy">
            <p className="eyebrow"><span /> TU COTIZACIÓN</p>
            <h2>¿Listo para tu<br /><em>próxima partida?</em></h2>
            <p>Selecciona juegos del catálogo y copia una solicitud lista para compartir por tu canal de contacto preferido.</p>
            <div className="quote-benefit"><MessageCircle /><span><strong>Atención humana</strong><small>Precio y disponibilidad revisados al momento.</small></span></div>
          </div>
          <div className="quote-builder">
            <div className="quote-builder-top"><span>JUEGOS SELECCIONADOS</span><strong>{selected.length.toString().padStart(2, '0')}</strong></div>
            <div className="selected-games">
              {selected.length ? selected.map((title) => (
                <button key={title} onClick={() => setSelected((current) => current.filter((item) => item !== title))}>{title}<span>×</span></button>
              )) : (
                <p>Agrega títulos con el botón <strong>+</strong> del catálogo.</p>
              )}
            </div>
            <button className="copy-button" onClick={copyRequest}>
              {copied ? <><Check /> Solicitud copiada</> : <><Copy /> Copiar solicitud de cotización</>}
            </button>
            <small>No se publica un precio fijo: se confirma antes de cada compra.</small>
          </div>
        </div>
      </section>

      <section className="faq-section section-shell" id="preguntas">
        <div className="faq-heading">
          <p className="eyebrow"><span /> RESPUESTAS CLARAS</p>
          <h2>Preguntas<br /><em>frecuentes.</em></h2>
        </div>
        <div className="faq-list">
          {[
            ['¿Los juegos son digitales?', 'Sí. El acceso permite descargar el juego en una consola Nintendo Switch o Switch 2, según compatibilidad.'],
            ['¿Cuánto cuesta cada juego?', 'La mayoría de cotizaciones históricas ronda entre $300 y $600 MXN, pero el precio y la disponibilidad se revisan al momento para cada título.'],
            ['¿Qué diferencia hay entre principal y secundaria?', 'La principal permite jugar desde cualquier usuario y sin conexión. La secundaria se usa desde el perfil proporcionado y requiere internet al abrir el juego.'],
            ['¿Puedo jugar en línea?', 'Depende del título y de la modalidad. Se verifica antes de confirmar para evitar promesas incorrectas.'],
            ['¿Cómo recibo mi juego?', 'Después de confirmar y pagar por transferencia o depósito, recibes el acceso digital y las indicaciones para descargarlo en tu consola.'],
          ].map(([question, answer], index) => (
            <details key={question}>
              <summary><span>{String(index + 1).padStart(2, '0')}</span>{question}<i>+</i></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <footer>
        <div className="section-shell footer-top">
          <BrandMark />
          <p>Juegos digitales y servicios para disfrutar más de tu mundo gamer.</p>
          <a href="#catalogo">Volver al catálogo <ArrowRight /></a>
        </div>
        <div className="section-shell footer-bottom">
          <span>© 2026 GAME MASTER</span>
          <p>Negocio independiente. Las marcas y artes mostradas pertenecen a sus respectivos titulares. No implican afiliación o patrocinio.</p>
        </div>
      </footer>
    </main>
  );
}
