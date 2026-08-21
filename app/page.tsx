'use client';

import Image from 'next/image';
import { useMemo, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, BadgeCheck, BrainCircuit, Check, ChevronRight,
  Copy, Download, Gamepad2, Menu, MessageCircle,
  Search, ShieldCheck, Tv2, UserRound, UsersRound, Wifi, WifiOff,
  X,
} from 'lucide-react';
import { catalog, categories, type Game } from './data/catalog';

const streamingServices = ['Netflix', 'Spotify', 'HBO Max', 'Crunchyroll', 'Apple TV+', 'Disney+', 'Amazon Prime', 'YouTube Music'];
const gamingServices = ['Steam', 'Nintendo Switch', 'PlayStation', 'Xbox Game Pass'];

function BrandMark() {
  return (
    <span className="brand-mark" aria-label="Game Master">
      <span className="brand-emblem">
        <Image src="/brand/game-master-emblem-v3.png" alt="" fill sizes="64px" priority />
      </span>
      <span className="brand-wordmark">
        <strong>Game</strong><b>Master</b><small>Digital services</small>
      </span>
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
  const [interest, setInterest] = useState('');
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

  const chooseInterest = (value: string) => {
    setInterest(value);
    setCopied(false);
  };

  const copyRequest = async () => {
    const focus = interest ? `Me interesa: ${interest}.` : 'Quiero orientación para elegir una opción digital.';
    const games = selected.length ? ` Juegos seleccionados: ${selected.join(', ')}.` : '';
    const message = `Hola, quiero cotizar con Game Master. ${focus}${games} ¿Me ayudan a revisar precio y disponibilidad?`;
    await navigator.clipboard.writeText(message);
    setCopied(true);
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand-link" href="#inicio" aria-label="Game Master, inicio"><BrandMark /></a>
        <nav className={menuOpen ? 'open' : ''} aria-label="Navegación principal">
          <a href="#inicio" onClick={() => setMenuOpen(false)}>Elegir</a>
          <a href="#catalogo" onClick={() => setMenuOpen(false)}>Videojuegos</a>
          <a href="#modalidades" onClick={() => setMenuOpen(false)}>Cómo funciona</a>
          <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
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
          <p className="eyebrow"><span /> SERVICIOS DIGITALES, CLAROS</p>
          <h1>¿Qué necesitas hoy?<em> Elige una solución.</em></h1>
          <p className="hero-text">
            Ve directo a lo que buscas. Elige una categoría y te ayudamos a revisar
            opciones, precio y disponibilidad.
          </p>
          <div className="quick-choices" aria-label="Elegir categoría">
            <a className="quick-choice choice-ai" href="#ia" onClick={() => chooseInterest('ChatGPT')}>
              <span className="quick-icon"><BrainCircuit /></span>
              <span><small>01 · IA</small><strong>ChatGPT</strong><em>Acceso y disponibilidad</em></span>
              <ArrowUpRight />
            </a>
            <a className="quick-choice choice-streaming" href="#streaming" onClick={() => chooseInterest('Streaming')}>
              <span className="quick-icon"><Tv2 /></span>
              <span><small>02 · STREAMING</small><strong>Netflix y más</strong><em>Series · música · anime</em></span>
              <ArrowUpRight />
            </a>
            <a className="quick-choice choice-games" href="#videojuegos" onClick={() => chooseInterest('Videojuegos')}>
              <span className="quick-icon"><Gamepad2 /></span>
              <span><small>03 · VIDEOJUEGOS</small><strong>Juegos y membresías</strong><em>Consola · PC</em></span>
              <ArrowUpRight />
            </a>
          </div>
          <div className="trust-row">
            <span><BadgeCheck /> Atención personal</span>
            <span><Download /> Opciones digitales</span>
            <span><ShieldCheck /> Cotización al momento</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Tres soluciones digitales de Game Master: inteligencia artificial, streaming y videojuegos">
          <Image src="/brand/game-master-studio-v3.png" alt="Tres accesos digitales representados con una composición arquitectónica sobria" fill sizes="(max-width: 1050px) 100vw, 55vw" priority />
          <div className="hero-visual-shade" />
          <p className="hero-visual-label"><span>GM</span> UNA MARCA. TRES SOLUCIONES.</p>
          <div className="hero-visual-index"><strong>03</strong><span>CATEGORÍAS<br />PARA ELEGIR</span></div>
        </div>
      </section>

      <div className="genre-strip">
        {['CHATGPT', 'NETFLIX', 'SPOTIFY', 'DISNEY+', 'NINTENDO SWITCH', 'PLAYSTATION', 'XBOX GAME PASS'].map((genre) => (
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
            <p className="eyebrow"><span /> ELIGE Y COTIZA</p>
            <h2>Tres caminos,<br /><em>una sola entrada.</em></h2>
          </div>
          <p>Entra por la categoría que necesitas. Cada opción se revisa contigo antes de confirmar precio y disponibilidad.</p>
        </div>
        <div className="services-showcase">
          <div className="service-catalog service-catalog-full">
            <article className="service-category ai-category" id="ia">
              <div className="service-category-icon"><BrainCircuit /></div>
              <div className="service-category-copy">
                <small>01 · INTELIGENCIA ARTIFICIAL</small>
                <h3>ChatGPT</h3>
                <p>La única herramienta de IA ofrecida por Game Master.</p>
                <div className="service-tags">
                  <button className={interest === 'ChatGPT' ? 'selected' : ''} onClick={() => chooseInterest('ChatGPT')} type="button">ChatGPT</button>
                </div>
              </div>
              <a href="#cotizar" onClick={() => chooseInterest('ChatGPT')} aria-label="Cotizar ChatGPT">Elegir ChatGPT <ArrowUpRight /></a>
            </article>

            <article className="service-category streaming-category" id="streaming">
              <div className="service-category-icon"><Tv2 /></div>
              <div className="service-category-copy">
                <small>02 · MEMBRESÍAS</small>
                <h3>Streaming &amp; música</h3>
                <p>Series, películas, anime y música en tus servicios favoritos.</p>
                <div className="service-tags">
                  {streamingServices.map((service) => (
                    <button className={interest === service ? 'selected' : ''} onClick={() => chooseInterest(service)} type="button" key={service}>{service}</button>
                  ))}
                </div>
              </div>
              <a href="#cotizar" onClick={() => chooseInterest('Streaming')} aria-label="Cotizar streaming y música">Elegir streaming <ArrowUpRight /></a>
            </article>

            <article className="service-category gaming-category" id="videojuegos">
              <div className="service-category-icon"><Gamepad2 /></div>
              <div className="service-category-copy">
                <small>03 · VIDEOJUEGOS</small>
                <h3>Juegos &amp; membresías</h3>
                <p>Opciones digitales para consola y PC, además del catálogo de juegos.</p>
                <div className="service-tags">
                  {gamingServices.map((service) => (
                    <button className={interest === service ? 'selected' : ''} onClick={() => chooseInterest(service)} type="button" key={service}>{service}</button>
                  ))}
                </div>
              </div>
              <a href="#catalogo" onClick={() => chooseInterest('Videojuegos')} aria-label="Explorar catálogo de videojuegos">Ver catálogo <ArrowUpRight /></a>
            </article>

            <p className="service-disclaimer">Las marcas pertenecen a sus respectivos titulares. Su presencia indica servicios consultables y no afiliación oficial.</p>
          </div>
        </div>
      </section>

      <section className="quote-section" id="cotizar">
        <div className="section-shell quote-grid">
          <div className="quote-copy">
            <p className="eyebrow"><span /> TU COTIZACIÓN</p>
            <h2>Tu acceso empieza<br /><em>con una elección.</em></h2>
            <p>Elige una categoría o un servicio, agrega juegos si quieres y copia una solicitud lista para compartir.</p>
            <div className="quote-benefit"><MessageCircle /><span><strong>Atención humana</strong><small>Precio y disponibilidad revisados al momento.</small></span></div>
          </div>
          <div className="quote-builder">
            <div className="quote-builder-top"><span>SOLICITUD RÁPIDA</span><strong>{interest ? '01' : '00'}</strong></div>
            <div className="quote-interest">
              <small>TE INTERESA</small>
              <strong>{interest || 'Elige IA, streaming o videojuegos'}</strong>
              <div>
                <button className={interest === 'ChatGPT' ? 'active' : ''} onClick={() => chooseInterest('ChatGPT')} type="button">ChatGPT</button>
                <button className={interest === 'Streaming' ? 'active' : ''} onClick={() => chooseInterest('Streaming')} type="button">Streaming</button>
                <button className={interest === 'Videojuegos' ? 'active' : ''} onClick={() => chooseInterest('Videojuegos')} type="button">Videojuegos</button>
              </div>
            </div>
            <div className="selected-games">
              {selected.length ? selected.map((title) => (
                <button key={title} onClick={() => setSelected((current) => current.filter((item) => item !== title))}>{title}<span>×</span></button>
              )) : (
                <p>Si buscas juegos, puedes agregarlos con el botón <strong>+</strong> del catálogo.</p>
              )}
            </div>
            <button className="copy-button" onClick={copyRequest}>
              {copied ? <><Check /> Solicitud copiada</> : <><Copy /> Copiar solicitud rápida</>}
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
          <p>ChatGPT, streaming y videojuegos en una experiencia digital clara y profesional.</p>
          <a href="#inicio">Volver a elegir <ArrowRight /></a>
        </div>
        <div className="section-shell footer-bottom">
          <span>© 2026 GAME MASTER</span>
          <p>Negocio independiente. Las marcas y artes mostradas pertenecen a sus respectivos titulares. No implican afiliación o patrocinio.</p>
        </div>
      </footer>
    </main>
  );
}
