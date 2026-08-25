'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, BrainCircuit, Check, ChevronRight,
  Copy, Gamepad2, Menu, MessageCircle,
  Search, ShieldCheck, Tv2, UserRound, UsersRound, Wifi, WifiOff,
  X,
} from 'lucide-react';
import { catalog, categories, type Game } from './data/catalog';

const WHATSAPP_BASE = 'https://wa.me/525527699426';
const FACEBOOK_URL = 'https://www.facebook.com/share/1JKTPgejVZ/?mibextid=wwXIfr';

function toWhatsApp(message: string) {
  return `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
}

const streamingServices = [
  { name: 'Netflix', logo: '/services/netflix.svg' },
  { name: 'Spotify', logo: '/services/spotify.svg' },
  { name: 'HBO Max', logo: '/services/hbo-max.svg' },
  { name: 'Crunchyroll', logo: '/services/crunchyroll.svg' },
  { name: 'Apple TV+', logo: '/services/apple-tv-plus.svg' },
  { name: 'Disney+', logo: '/services/disney-plus.svg' },
  { name: 'Amazon Prime', logo: '/services/amazon-prime.svg' },
  { name: 'YouTube Music', logo: '/services/youtube-music.svg' },
];
const gamingServices = [
  { name: 'Steam', logo: '/services/steam.svg' },
  { name: 'Nintendo Switch', logo: '/services/nintendo-switch.svg' },
  { name: 'PlayStation', logo: '/services/playstation.svg' },
  { name: 'Xbox Game Pass', logo: '/services/xbox-game-pass.svg' },
];
const categoryRank = new Map(categories.slice(1).map((category, index) => [category, index]));
const catalogShelves = categories.slice(1).map((category) => ({
  category,
  games: catalog.filter((game) => game.category === category).sort((a, b) => a.title.localeCompare(b.title, 'es')),
}));
const heroGame = catalog.find((game) => game.id === 'mario-kart-world') ?? catalog[0];
const heroCompanion = catalog.find((game) => game.id === 'donkey-kong-bananza') ?? catalog[1];

function BrandMark() {
  return (
    <span className="brand-mark" aria-label="Game Master">
      <span className="brand-emblem">
        <Image src="/brand/game-master-emblem-v4.png" alt="" fill sizes="64px" priority />
      </span>
      <span className="brand-wordmark">
        <strong>Game</strong><b>Master</b><small>Entertainment club</small>
      </span>
    </span>
  );
}

function ServiceMark({ src, className = '' }: { src: string; className?: string }) {
  return <span className={`service-mark ${className}`} style={{ WebkitMaskImage: `url(${src})`, maskImage: `url(${src})` }} aria-hidden="true" />;
}

function GameTile({ game, isSelected, onToggle, onOpen, index }: { game: Game; isSelected: boolean; onToggle: () => void; onOpen: () => void; index: number }) {
  return (
    <article className={`catalog-card ${isSelected ? 'is-selected' : ''}`}>
      <button className="game-visual" onClick={onOpen} aria-label={`Ver detalles de ${game.title}`}>
        <Image src={game.image} alt={`Imagen relacionada con ${game.title}`} fill sizes="(max-width: 650px) 44vw, (max-width: 1000px) 28vw, 210px" />
        <span className="platform-badge">{game.platform === 'Nintendo Switch 2' ? 'SWITCH 2' : 'SWITCH'}</span>
        <span className={`select-mark ${isSelected ? 'selected' : ''}`} aria-hidden="true">{isSelected ? <Check /> : '+'}</span>
      </button>
      <div className="game-info">
        <p>{String(index + 1).padStart(2, '0')} · {game.category}</p>
        <h3>{game.title}</h3>
        <button onClick={onToggle} aria-pressed={isSelected}>
          {isSelected ? 'Quitar de cotización' : 'Agregar y consultar'} <ChevronRight size={15} />
        </button>
      </div>
    </article>
  );
}

export default function Home() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [selected, setSelected] = useState<string[]>([]);
  const [interest, setInterest] = useState('');
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusedGame, setFocusedGame] = useState<Game | null>(null);
  const modalRef = useRef<HTMLElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('es');
    return catalog.filter((game) => {
      const categoryMatch = activeCategory === 'Todos' || game.category === activeCategory;
      const queryMatch = !normalized || game.title.toLocaleLowerCase('es').includes(normalized);
      return categoryMatch && queryMatch;
    }).sort((a, b) => (categoryRank.get(a.category) ?? 99) - (categoryRank.get(b.category) ?? 99)
      || a.title.localeCompare(b.title, 'es'));
  }, [activeCategory, query]);

  const quoteMessage = useMemo(() => {
    const focus = interest ? `Me interesa: ${interest}.` : 'Quiero orientación para elegir una opción digital.';
    const games = selected.length ? ` Juegos seleccionados: ${selected.join(', ')}.` : '';
    return `Hola, quiero cotizar con Game Master. ${focus}${games} ¿Me ayudan a revisar precio y disponibilidad?`;
  }, [interest, selected]);

  const whatsappUrl = useMemo(() => toWhatsApp(quoteMessage), [quoteMessage]);

  useEffect(() => {
    if (!focusedGame) return;
    const previousOverflow = document.body.style.overflow;
    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const modal = modalRef.current;
    const focusable = modal?.querySelectorAll<HTMLElement>('button, a[href], input, [tabindex]:not([tabindex="-1"])');
    const handleModalKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFocusedGame(null);
        return;
      }
      if (event.key !== 'Tab' || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleModalKeys);
    focusable?.[0]?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleModalKeys);
      previousFocusRef.current?.focus();
    };
  }, [focusedGame]);

  useEffect(() => {
    if (!menuOpen) return;
    const closeMenu = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', closeMenu);
    return () => window.removeEventListener('keydown', closeMenu);
  }, [menuOpen]);

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
    try {
      await navigator.clipboard.writeText(quoteMessage);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main>
      <header className="site-header">
        <a className="brand-link" href="#inicio" aria-label="Game Master, inicio"><BrandMark /></a>
        <nav id="primary-navigation" className={menuOpen ? 'open' : ''} aria-label="Navegación principal">
          <a href="#inicio" onClick={() => setMenuOpen(false)}>Inicio</a>
          <a href="#catalogo" onClick={() => setMenuOpen(false)}>Gaming</a>
          <a href="#streaming" onClick={() => setMenuOpen(false)}>Streaming</a>
          <a href="#ia" onClick={() => setMenuOpen(false)}>IA</a>
          <a href="#modalidades" onClick={() => setMenuOpen(false)}>Cómo funciona</a>
          <a href="#preguntas" onClick={() => setMenuOpen(false)}>FAQ</a>
        </nav>
        <a className="header-cta" href="#cotizar">{selected.length ? `Cotización · ${selected.length}` : 'Cotizar ahora'} <ArrowUpRight size={15} /></a>
        <button
          className="menu-button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <section className="signal-hero" id="inicio">
        <div className="signal-hero-copy">
          <div className="signal-hero-label">
            <span>GM/01</span>
            <p>CATÁLOGO DIGITAL · MÉXICO</p>
          </div>
          <h1>
            Todo lo que<br />
            quieres <span>jugar.</span>
            <em>En una sola señal.</em>
          </h1>
          <p className="signal-hero-lede">
            Videojuegos, streaming e IA reunidos en una experiencia editorial. Explora con calma y confirma precio y disponibilidad con atención directa.
          </p>
          <div className="signal-hero-actions">
            <a className="signal-primary" href="#catalogo"><Gamepad2 /> Explorar catálogo <ArrowRight /></a>
            <a className="signal-secondary" href={toWhatsApp('Hola, quiero conocer las opciones de Game Master para videojuegos, streaming e IA.')} target="_blank" rel="noreferrer"><MessageCircle /> Hablar por WhatsApp</a>
          </div>
          <div className="signal-hero-proof" aria-label="Resumen del catálogo">
            <span><strong>{catalog.length}</strong><small>títulos</small></span>
            <span><strong>03</strong><small>universos</small></span>
            <span><strong>1:1</strong><small>atención</small></span>
          </div>
        </div>

        <div className="signal-hero-art" aria-label="Selección editorial Game Master">
          <div className="signal-rear-field" aria-hidden="true">
            <span /><span /><span /><span /><span />
          </div>
          <p className="signal-art-code">ARCHIVO / GM—2026</p>
          <button className="signal-cover-main" onClick={() => setFocusedGame(heroGame)} aria-label={`Ver detalles de ${heroGame.title}`}>
            <Image src={heroGame.image} alt={`Portada de ${heroGame.title}`} fill sizes="(max-width: 760px) 62vw, 360px" priority />
            <span><small>AHORA EN CATÁLOGO</small><strong>{heroGame.title}</strong></span>
          </button>
          <button className="signal-cover-companion" onClick={() => setFocusedGame(heroCompanion)} aria-label={`Ver detalles de ${heroCompanion.title}`}>
            <Image src={heroCompanion.image} alt={`Portada de ${heroCompanion.title}`} fill sizes="(max-width: 760px) 34vw, 190px" priority />
            <span>02</span>
          </button>
          <div className="signal-front-plane" aria-hidden="true">
            <strong>PLAY</strong>
            <span>CATÁLOGO VIVO</span>
          </div>
          <div className="signal-art-meta" aria-hidden="true">
            <span>19.4326° N</span><span>99.1332° W</span><span>SWITCH / STREAM / AI</span>
          </div>
        </div>
      </section>

      <section className="quick-launch-section" aria-labelledby="quick-launch-title">
        <div className="quick-launch-heading">
          <div><span>ELIGE TU UNIVERSO</span><h2 id="quick-launch-title">Tres mundos.<br />Una sola entrada.</h2></div>
          <p>Cada universo tiene su propio ritmo visual, con la misma atención directa antes de confirmar cualquier compra.</p>
        </div>
        <div className="quick-launch-grid">
          <a href="#ia" onClick={() => chooseInterest('ChatGPT')} className="launch-card launch-ai">
            <ServiceMark src="/services/chatgpt.svg" className="launch-single-mark" />
            <span><small>INTELIGENCIA ARTIFICIAL</small><strong>IA</strong><em>Consultar ChatGPT</em></span>
            <ArrowRight />
          </a>
          <a href="#streaming" onClick={() => chooseInterest('Streaming')} className="launch-card launch-streaming">
            <span className="launch-brand-stack"><ServiceMark src="/services/netflix.svg" /><ServiceMark src="/services/spotify.svg" /><ServiceMark src="/services/disney-plus.svg" /></span>
            <span><small>SERIES, MÚSICA Y ANIME</small><strong>Streaming</strong><em>Ver membresías</em></span>
            <ArrowRight />
          </a>
          <a href="#catalogo" onClick={() => chooseInterest('Videojuegos')} className="launch-card launch-games">
            <span className="launch-game-icon"><Gamepad2 /></span>
            <span><small>NINTENDO SWITCH Y MÁS</small><strong>Gaming</strong><em>Explorar {catalog.length} títulos</em></span>
            <ArrowRight />
          </a>
        </div>
      </section>

      <section className="catalog-section section-shell" id="catalogo">
        <div className="section-heading catalog-heading">
          <div>
            <p className="eyebrow"><span /> {catalog.length} TÍTULOS PARA ELEGIR</p>
            <h2>Explora como en<br /><em>tu plataforma favorita.</em></h2>
          </div>
          <p>
            Desliza por género, busca por nombre y toca el símbolo + para preparar tu cotización.
          </p>
        </div>

        <div className="catalog-tools">
          <label className="search-box">
            <Search size={19} />
            <span className="sr-only">Buscar juego</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar por título..." />
            <kbd>{results.length}</kbd>
          </label>
          <div className="filter-row" aria-label="Filtrar por categoría">
            {categories.map((category) => (
              <button
                className={activeCategory === category ? 'active' : ''}
                onClick={() => setActiveCategory(category)}
                aria-pressed={activeCategory === category}
                key={category}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {results.length ? (query || activeCategory !== 'Todos' ? (
          <div className="game-grid search-results-grid">
            {results.map((game, index) => (
              <GameTile key={game.id} game={game} index={index} isSelected={selected.includes(game.title)} onToggle={() => toggleGame(game)} onOpen={() => setFocusedGame(game)} />
            ))}
          </div>
        ) : (
          <div className="catalog-shelves">
            {catalogShelves.map(({ category, games }) => (
              <section className="media-shelf" key={category} aria-labelledby={`shelf-${category}`}>
                <div className="shelf-heading">
                  <h3 id={`shelf-${category}`}>{category}</h3>
                  <span>{games.length} títulos <ChevronRight /></span>
                </div>
                <div className="media-row">
                  {games.map((game, index) => (
                    <GameTile key={game.id} game={game} index={index} isSelected={selected.includes(game.title)} onToggle={() => toggleGame(game)} onOpen={() => setFocusedGame(game)} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )) : (
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
                <div className="service-tags service-logo-list ai-logo-list">
                  <button className={`service-logo ${interest === 'ChatGPT' ? 'selected' : ''}`} onClick={() => chooseInterest('ChatGPT')} type="button" aria-label="Elegir ChatGPT" aria-pressed={interest === 'ChatGPT'} title="ChatGPT">
                    <ServiceMark src="/services/chatgpt.svg" />
                  </button>
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
                <div className="service-tags service-logo-list streaming-logo-list" aria-label="Servicios de streaming y música">
                  {streamingServices.map((service) => (
                    <button className={`service-logo ${interest === service.name ? 'selected' : ''}`} onClick={() => chooseInterest(service.name)} type="button" key={service.name} aria-label={`Elegir ${service.name}`} aria-pressed={interest === service.name} title={service.name}>
                      <ServiceMark src={service.logo} />
                    </button>
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
                <div className="service-tags service-logo-list gaming-logo-list" aria-label="Plataformas de videojuegos">
                  {gamingServices.map((service) => (
                    <button className={`service-logo ${interest === service.name ? 'selected' : ''}`} onClick={() => chooseInterest(service.name)} type="button" key={service.name} aria-label={`Elegir ${service.name}`} aria-pressed={interest === service.name} title={service.name}>
                      <ServiceMark src={service.logo} />
                    </button>
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
                <button className={interest === 'ChatGPT' ? 'active' : ''} onClick={() => chooseInterest('ChatGPT')} type="button" aria-pressed={interest === 'ChatGPT'}>ChatGPT</button>
                <button className={interest === 'Streaming' ? 'active' : ''} onClick={() => chooseInterest('Streaming')} type="button" aria-pressed={interest === 'Streaming'}>Streaming</button>
                <button className={interest === 'Videojuegos' ? 'active' : ''} onClick={() => chooseInterest('Videojuegos')} type="button" aria-pressed={interest === 'Videojuegos'}>Videojuegos</button>
              </div>
            </div>
            <div className="selected-games">
              {selected.length ? selected.map((title) => (
                <button key={title} onClick={() => setSelected((current) => current.filter((item) => item !== title))}>{title}<span>×</span></button>
              )) : (
                <p>Si buscas juegos, puedes agregarlos con el botón <strong>+</strong> del catálogo.</p>
              )}
            </div>
            <button className="copy-button" onClick={copyRequest} aria-live="polite">
              {copied ? <><Check /> Solicitud copiada</> : <><Copy /> Copiar solicitud rápida</>}
            </button>
            <a className="whatsapp-button" href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle /> Cotizar por WhatsApp <ArrowUpRight />
            </a>
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
          <div className="footer-contact">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight /></a>
            <a href={FACEBOOK_URL} target="_blank" rel="noreferrer">Facebook <ArrowUpRight /></a>
          </div>
        </div>
        <div className="section-shell footer-bottom">
          <span>© 2026 GAME MASTER</span>
          <p>Negocio independiente. Las marcas y artes mostradas pertenecen a sus respectivos titulares. No implican afiliación o patrocinio.</p>
        </div>
      </footer>

      <a className="mobile-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Cotizar por WhatsApp">
        <MessageCircle /> <span>Cotizar</span>
      </a>

      {focusedGame && (
        <div className="product-modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setFocusedGame(null);
        }}>
          <section ref={modalRef} className="product-modal" role="dialog" aria-modal="true" aria-labelledby="product-modal-title" aria-describedby="product-modal-description">
            <button className="product-modal-close" onClick={() => setFocusedGame(null)} aria-label="Cerrar detalles"><X /></button>
            <div className="product-modal-art">
              <Image src={focusedGame.image} alt={`Imagen relacionada con ${focusedGame.title}`} fill sizes="(max-width: 720px) 100vw, 42vw" />
            </div>
            <div className="product-modal-copy">
              <p>{focusedGame.category} · {focusedGame.platform}</p>
              <h2 id="product-modal-title">{focusedGame.title}</h2>
              <p className="product-modal-description" id="product-modal-description">Título digital para {focusedGame.platform}. El precio, la modalidad y la disponibilidad se confirman contigo al momento de cotizar.</p>
              <div className="product-modal-status">
                <span><small>PRECIO</small><strong>Consultar precio</strong></span>
                <span><small>DISPONIBILIDAD</small><strong>Sujeto a confirmación</strong></span>
              </div>
              <div className="product-modal-actions">
                <button onClick={() => toggleGame(focusedGame)} aria-pressed={selected.includes(focusedGame.title)}>{selected.includes(focusedGame.title) ? <Check /> : '+'} {selected.includes(focusedGame.title) ? 'Agregado a tu solicitud' : 'Agregar a tu solicitud'}</button>
                <a href={toWhatsApp(`Hola, quiero cotizar ${focusedGame.title} para ${focusedGame.platform}. ¿Me ayudan a revisar precio, modalidad y disponibilidad?`)} target="_blank" rel="noreferrer"><MessageCircle /> Cotizar por WhatsApp</a>
              </div>
              <small className="product-modal-note">Game Master es un negocio independiente. La imagen se muestra como referencia del título.</small>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
