# Product Vision — GameMaster

## What GameMaster is

GameMaster is a digital entertainment storefront/catalog centered on three universes:

1. **Gaming** — primarily Nintendo Switch / Switch 2 digital titles.
2. **Streaming** — memberships/services consulted and quoted directly.
3. **IA** — memberships/services for AI tools, also quoted directly when canonical pricing is unavailable.

The website is not meant to behave like a traditional ecommerce checkout in its first stage. Its main job is to make discovery easy, build trust, explain the purchase model clearly and move high-intent users to WhatsApp.

## Desired experience

The user wants a browsing experience that combines:

- **Game Pass** — gaming-native discovery, collections, genres, horizontal rails and strong cover hierarchy;
- **Netflix** — cinematic content hierarchy, immediate browsing familiarity and low-friction exploration;
- **STYLITES** (`https://www.mek.gallery/releases/stylites`) — a page that behaves as one authored visual composition rather than a stack of conventional UI sections;
- **GameMaster chromostereopsis research** — red/blue/black planar depth with real independent geometries, not anaglyph or RGB-split tricks.

This is inspiration at the interaction/composition level, not permission to clone Netflix, Game Pass, STYLITES or any other service pixel-for-pixel.

## Current product-art direction

The next major iteration should preserve working catalog/business functionality while substantially rebuilding the visual composition.

Key goals:

- the overall site reads primarily as black/near-black, not blue;
- blue acts as a rear structural field, not as the default surface for everything;
- red acts as a sparse but stronger front/focal plane;
- original game cover art remains recognizable and largely color-accurate;
- the chromostereoscopic identity lives mainly in the architecture around the content;
- the homepage and catalog feel like one continuous composition;
- long browsing zones remain calmer than hero/editorial focal zones to reduce visual fatigue.

Use `docs/DESIGN_DIRECTION_STYLITES.md` as the current detailed art-direction specification.

## Brand personality

- digital
- artistic
- premium
- technological
- gaming-native
- visually experimental without looking amateur
- clean enough to sell and build trust
- composition-led rather than component-template-led

Avoid:

- generic gradient SaaS aesthetics
- excessive glassmorphism
- random RGB glitch effects
- tiny text
- overloading every surface with red/blue
- giant uninterrupted blue fields
- generic cyberpunk/neon styling
- fake countdowns, fake scarcity or fabricated discounts
- turning all game covers into brand-colored red/blue art

## Homepage hierarchy

### 1. Hero

A strong editorial composition with the GameMaster identity, a concise proposition and direct access to the catalog/universes.

Suggested headline direction:

> Tu universo digital, en un solo lugar.

Supporting message should make clear that the catalog includes videojuegos, streaming and IA, and that price/availability are confirmed at the moment of consultation.

The hero should be the strongest chromostereoscopic area: black breathing space, a substantial blue rear structure, an independent red focal structure and recognizable featured content where available.

### 2. Universe selector / gateways

Three substantial visual gateways:

- Gaming
- Streaming
- IA

Each should feel like its own content universe while remaining inside one visual system. They should not read as three generic SaaS cards.

### 3. Featured / trending rails

Examples:

- Nintendo Switch 2
- Destacados
- Mundo Mario
- Zelda
- Pokémon
- RPG y aventuras
- Indie esenciales
- Shooters
- Otros destacados

Rails should use familiar streaming/game-library interaction patterns, but their surrounding art composition should vary. Do not repeat one identical visual wrapper for every section.

### 4. How it works

Keep the explanation short and operational.

For Nintendo Switch, preserve the two source options:

- Cuenta Principal
- Cuenta Secundaria (Económica)

Do not rewrite them into promises not supported by the source material.

### 5. Trust / contact

Persistent but non-aggressive WhatsApp CTA. Facebook can be secondary.

## Catalog philosophy

The browsing surface should prioritize recognizable commercial content.

- covers are the primary recognition objects;
- keep covers normal/color-accurate by default;
- do not apply a global red/blue tint or duplicated chromatic split to game artwork;
- let GameMaster identity appear in the surrounding page-scale structures, selection markers, transitions and editorial fields;
- keep metadata concise on the browsing surface;
- surface deeper information in product detail views.

This allows the site to be visually experimental without making the catalog harder to scan.

## Mobile behavior

The mobile experience must be intentionally recomposed as a **vertical cinematic composition**:

- black-dominant background;
- fewer but larger red/blue structures;
- hero text narrower and shorter;
- rails optimized for thumb scrolling;
- cards sized to reveal the next item partially;
- chromatic fields may enter from viewport edges without creating page overflow;
- sticky or easily reachable contact action;
- filters in compact chips / drawers;
- no desktop navigation squeezed into a phone;
- no horizontal page overflow;
- calmer chromatic density than desktop when needed for comfort.

## Product detail pattern

Each game detail should eventually support:

- title
- cover / hero artwork
- platform
- source category
- genre/tags
- concise description
- related games
- availability status = consultation unless confirmed
- price = consultation unless confirmed
- WhatsApp quote action with prefilled game title

The detail view can use stronger editorial composition than a standard ecommerce modal, but the reading surface and purchase information must remain neutral and clear.

## Conversion philosophy

The site should not force a user to understand every technical detail before contacting. Discovery first, reassurance second, explanation when needed, CTA always available.

Visual experimentation must never obscure:

- what is sold;
- where to browse;
- which game/service is selected;
- whether price/availability must be consulted;
- how to contact GameMaster.

## Product success test

The direction is successful when a new visitor can browse it as easily as a modern entertainment catalog while the overall experience feels like a distinctive GameMaster artwork rather than a generic store template.
