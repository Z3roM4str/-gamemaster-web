# AGENTS.md — GameMaster

## Mission

Build the best possible commercial website for GameMaster: a premium digital catalog for Gaming, Streaming and AI memberships/services, with a distinctive chromostereoscopic visual identity.

Do not reduce the site to a generic landing page. The product should feel like a real entertainment catalog: discovery-first, visual, fast, navigable, credible and optimized for conversion.

## Current art-direction target

The current target is **STYLITES × Game Pass × Netflix**, interpreted as follows:

- **Game Pass** → catalog architecture, categories, rails, game-first discovery;
- **Netflix** → cinematic hierarchy, immediate browsing familiarity and content-led navigation;
- **STYLITES** (`https://www.mek.gallery/releases/stylites`) → page-scale graphic composition, bold chromatic planes and stronger exploitation of chromostereoscopic depth;
- **GameMaster research** → the perceptual constraints and anti-anaglyph rules.

Do not clone any of those products/sites. GameMaster must remain its own brand.

The next visual iteration should be treated as a **composition rebuild**, not a cosmetic recolor of the current blue-heavy UI. Preserve working commercial/catalog functionality while rebuilding the page-scale visual structure where necessary.

## Highest-priority visual rule

**GameMaster uses chromostereopsis, NOT anaglyph stereoscopy, NOT RGB split and NOT a chromatic-aberration/glitch effect.**

Never duplicate the same text, icon, logo, border, card or image in red/blue or red/cyan with lateral offsets to simulate depth. Never use paired red/blue shadows as the primary depth device.

Depth must come from a **single 2D composition containing distinct red, blue and neutral geometric regions**. Red can operate as a foreground/focal plane, blue as a rear/structural plane and black/near-black as a neutral plane, but those planes must be materially different visual elements rather than colored copies of the same contour.

If any older repository wording conflicts with `docs/CODEX_VISUAL_GUARDRAILS.md`, the guardrail file wins.

## Mandatory read order before changing code

Read in this order:

1. `docs/CODEX_VISUAL_GUARDRAILS.md`
2. `docs/DESIGN_DIRECTION_STYLITES.md`
3. `docs/research/README.md`
4. `docs/research/EVIDENCE_MAP.md`
5. `docs/research/IMPLEMENTATION_RULES.md`
6. `docs/PRODUCT_VISION.md`
7. `docs/BUSINESS_RULES.md`
8. `docs/CHROMOSTEREOPSIS.md`
9. `docs/VISUAL_SYSTEM.md`
10. `docs/REFERENCE_IMAGES.md`
11. `data/catalog.ts`

For deeper visual/perceptual reasoning, also read:

- `docs/research/SOURCE_A_INVESTIGACION_ESPECIFICACION.md`
- `docs/research/SOURCE_B_LENGUAJES_VISUALES.md`
- `docs/research/SOURCE_C_AUDITORIA.md`
- `docs/research/CHROMO_RESEARCH_NOTES.md`
- `docs/research/PDF_MANIFEST.md`

Treat these files as the source of truth unless the user explicitly changes a business rule or visual direction.

## Research precedence

Do not silently reconcile contradictions in the research.

When sources differ:

1. preserve direct/strong evidence as strong;
2. use later audit/correction when it explicitly revises an earlier operational statement;
3. keep unresolved items labeled as hypotheses/tests;
4. distinguish GameMaster product decisions from scientific claims.

Examples: near-black background, vivid red/blue and red-forward/blue-rear are useful product defaults, but must not be presented as universal perceptual laws.

## Product principles

1. **Mobile is a first-class product.** Do not merely shrink desktop. Recompose layouts for phones.
2. **Discovery beats walls of text.** Use rails, filters, search, genres, collections and featured areas.
3. **The page is one composition.** Do not build a generic component stack and decorate it afterward. Large chromatic fields, negative space and editorial structures may span section boundaries.
4. **Black must dominate the overall visual field.** The site should no longer read as predominantly blue. Use the area hierarchy in `docs/DESIGN_DIRECTION_STYLITES.md` as the current target.
5. **Art direction must be ownable.** Use the GameMaster red/blue/black system, crisp chromatic regions, engraving/halftone ideas, technical structures and strong negative space. Avoid generic SaaS cards.
6. **Chromostereopsis must be intentional.** Use real color-plane relationships. Never fake it with duplicated chromatic offsets.
7. **Original game cover art should remain recognizable.** Do not globally tint or split covers into red/blue; integrate them inside the chromatic architecture instead.
8. **Commercial clarity matters.** A user should understand what is sold, how it works and how to ask for a quote within seconds.
9. **Never invent price, stock or included benefits.** Unknown values must remain “Consultar”.
10. **Do not imply official affiliation** with Nintendo, Netflix, OpenAI, Spotify or other brands.
11. **Performance matters.** Minimize layout shift, oversized JS and unnecessary animation.
12. **Accessibility matters.** Chromatic effects are decoration, never the only carrier of information. Respect `prefers-reduced-motion`.
13. **The page must still look premium if the viewer perceives weak, inverted or no chromostereoscopic depth.**
14. **Maximum chromatic intensity must be localized.** Hero, editorial transitions and selected states can be strong; long browsing/reading zones should be calmer.

## Information architecture

Primary sections:

- Inicio
- Gaming
- Streaming
- IA
- Cómo funciona
- Preguntas frecuentes
- Contacto

Gaming should support:

- search by title
- filter by category / franchise / genre
- collections such as Switch 2, Mario, Zelda, Pokémon, RPG, Shooter, Indie, destacados
- product detail route or modal
- “Consultar precio” CTA

Streaming and AI should initially use service-family cards and WhatsApp consultation until the user supplies a canonical price catalog.

## Chromostereoscopic visual grammar

### Preferred

- one geometry per object;
- solid or strongly separated red/blue regions;
- crisp boundaries;
- black/near-black negative space as the dominant environment;
- blue technical/topographic/network structures behind independent red focal elements;
- red foreground mass against blue rear structure;
- alternating cells, modules or bars where each color occupies its own real region;
- posterized/engraved/halftone imagery with clean color segmentation;
- neutral body text and reading surfaces;
- page-scale chromatic masses that can span multiple sections;
- original game covers placed as recognizable neutral/content objects inside the red/blue/black composition.

### Forbidden

- `text-shadow` that generates red and blue ghost copies;
- paired red/blue `box-shadow` around one object to fake stereo depth;
- cloned pseudo-elements offset left/right in different colors;
- RGB channel split;
- chromatic-aberration filters;
- cyan ghosting;
- duplicated red/blue cards, logos, posters or typography;
- duplicated/offset game covers;
- blur halos that merge red and blue;
- transparent red/blue overlap that makes purple the main depth mechanism;
- a mostly-blue site with red used only as decorative trim;
- generic cyberpunk/neon treatment presented as chromostereopsis.

## Visual system

- Base: near-black / black; visually dominant across the complete experience
- Front/focal chromatic plane: electric red; sparse and assertive
- Rear/structural chromatic plane: spectral/electric blue; substantial but not page-filling by default
- Neutral text: off-white
- Current approximate composition target: 55–65% black, 20–30% blue, 10–15% red, <5% white/neutral; use as guidance rather than literal quota
- Hard color boundaries are preferred over soft neon blur
- Build depth through **different planar regions**, negative space, area hierarchy, figure/background relations, scale and composition
- Do not create depth by cloning the same geometry at different offsets
- Use neutral breathing space to reduce visual fatigue
- Preserve normal/color-accurate game artwork by default

## Catalog composition

The catalog should retain familiar Game Pass/Netflix browsing mechanics without becoming a literal clone.

- use horizontal rails and large cover art;
- keep interaction patterns consistent while allowing different sections to have different surrounding art composition;
- do not wrap every rail in the same container treatment;
- let large blue structures, red interventions and black apertures continue across section boundaries;
- alternate dense discovery areas with black breathing zones;
- avoid turning every card into a blue tile;
- let the cover art carry recognition and commercial value.

## Universe visual grammars

Use these as supporting structural languages, not wallpaper:

- **Gaming:** circuits, modular grids, technical glyphs, controlled halftone, tessellations
- **Streaming:** cinematic apertures, signal bands, frame systems, waveforms
- **IA:** node networks, vector fields, topology/scientific diagrams, data-flow systems

## Coding conventions

- Next.js App Router + TypeScript
- Keep catalog/content data outside visual components
- Prefer semantic HTML and CSS variables
- Components should be reusable and small enough to reason about
- No hidden magic numbers for important visual tokens: put them in CSS custom properties
- No hardcoded price claims in UI components
- Keep WhatsApp CTA centralized so contact copy can be changed once
- Name chromostereoscopic primitives by their actual role (`frontPlane`, `rearGrid`, `redMarker`, `blueField`, `neutralAperture`) rather than ambiguous names such as `chromaticEdge`
- Keep page-scale art composition separable from catalog data so visual experimentation does not mutate business content

## Current visual debt to remove

The existing baseline may still contain anaglyph-like implementation or blue-heavy composition. Before declaring the next visual iteration complete, audit and replace at least:

- `.chromaticEdge`
- `.inverseEdge`
- `.heroAccent` red/blue `text-shadow`
- `.brandMark` paired chromatic `box-shadow`
- `.posterBlue` / `.posterRed` if they function as duplicate offset copies of one poster
- any new duplicated red/blue pseudo-elements
- excessive blue background coverage that removes black breathing space
- repeated generic card-shell treatments that make the page feel component-stacked instead of composition-led

Do not preserve these merely because they already exist.

## Quality bar before finishing a task

Run or reason through:

- `npm run lint`
- `npm run build`
- desktop width around 1440px
- phone widths around 390px and 430px
- keyboard focus states
- reduced motion
- empty search state
- very long game title wrapping
- grayscale/single-geometry sanity check: important objects must not reveal duplicated copies
- visual check: the page must not resemble a red/cyan 3D-glasses demo
- composition check: the page must read primarily as black, not blue
- fatigue check: long catalog/reading zones must remain calmer than hero/editorial focal zones
- cover-art check: game covers remain recognizable and are not globally tinted/split
- continuity check: homepage should feel like one visual composition, not an art hero followed by generic ecommerce rows
- research check: every visual claim should be traceable as strong, conditional, test/hypothesis or product decision

## Current priority backlog

1. Rebuild the page-scale composition around the STYLITES × Game Pass × Netflix direction while preserving catalog/business functionality.
2. Make black/near-black the dominant environment and reduce blue saturation/coverage across the whole page.
3. Reconstruct the hero as the strongest chromostereoscopic editorial area with materially different red and blue geometries.
4. Integrate discovery rails into the continuous composition instead of stacking visually identical sections.
5. Simplify cards so original game cover art dominates and chromatic identity lives around/behind it.
6. Remove existing anaglyph-like CSS/markup and preserve the single-geometry invariant.
7. Give Gaming, Streaming and IA distinct procedural structural motifs inside one shared visual system.
8. Recompose mobile as a vertical cinematic layout rather than scaled desktop.
9. Add/refine individual game detail pages with related titles and WhatsApp quote CTA.
10. Refine chromostereopsis through controlled visual tests, not arbitrary RGB effects.
