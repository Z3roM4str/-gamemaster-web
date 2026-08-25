# AGENTS.md — GameMaster

## Mission

Build the best possible commercial website for GameMaster: a premium digital catalog for Gaming, Streaming and AI memberships/services, with a distinctive chromostereoscopic visual identity.

Do not reduce the site to a generic landing page. The product should feel like a real entertainment catalog: discovery-first, visual, fast, navigable, credible and optimized for conversion.

## Highest-priority visual rule

**GameMaster uses chromostereopsis, NOT anaglyph stereoscopy, NOT RGB split and NOT a chromatic-aberration/glitch effect.**

Never duplicate the same text, icon, logo, border, card or image in red/blue or red/cyan with lateral offsets to simulate depth. Never use paired red/blue shadows as the primary depth device.

Depth must come from a **single 2D composition containing distinct red, blue and neutral geometric regions**. Red can operate as a foreground/focal plane, blue as a rear/structural plane and black/near-black as a neutral plane, but those planes must be materially different visual elements rather than colored copies of the same contour.

If any older repository wording conflicts with `docs/CODEX_VISUAL_GUARDRAILS.md`, the guardrail file wins.

## Mandatory read order before changing code

Read in this order:

1. `docs/CODEX_VISUAL_GUARDRAILS.md`
2. `docs/research/README.md`
3. `docs/research/EVIDENCE_MAP.md`
4. `docs/research/IMPLEMENTATION_RULES.md`
5. `docs/PRODUCT_VISION.md`
6. `docs/BUSINESS_RULES.md`
7. `docs/CHROMOSTEREOPSIS.md`
8. `docs/VISUAL_SYSTEM.md`
9. `docs/REFERENCE_IMAGES.md`
10. `data/catalog.ts`

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
3. **Art direction must be ownable.** Use the GameMaster red/blue/black system, crisp chromatic regions, engraving/halftone ideas, technical structures and strong negative space. Avoid generic SaaS cards.
4. **Chromostereopsis must be intentional.** Use real color-plane relationships. Never fake it with duplicated chromatic offsets.
5. **Commercial clarity matters.** A user should understand what is sold, how it works and how to ask for a quote within seconds.
6. **Never invent price, stock or included benefits.** Unknown values must remain “Consultar”.
7. **Do not imply official affiliation** with Nintendo, Netflix, OpenAI, Spotify or other brands.
8. **Performance matters.** Minimize layout shift, oversized JS and unnecessary animation.
9. **Accessibility matters.** Chromatic effects are decoration, never the only carrier of information. Respect `prefers-reduced-motion`.
10. **The page must still look premium if the viewer perceives weak, inverted or no chromostereoscopic depth.**

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
- black/near-black negative space;
- blue technical/topographic/network structures behind independent red focal elements;
- red foreground mass against blue rear structure;
- alternating cells, modules or bars where each color occupies its own real region;
- posterized/engraved/halftone imagery with clean color segmentation;
- neutral body text and reading surfaces.

### Forbidden

- `text-shadow` that generates red and blue ghost copies;
- paired red/blue `box-shadow` around one object to fake stereo depth;
- cloned pseudo-elements offset left/right in different colors;
- RGB channel split;
- chromatic-aberration filters;
- cyan ghosting;
- duplicated red/blue cards, logos, posters or typography;
- blur halos that merge red and blue;
- transparent red/blue overlap that makes purple the main depth mechanism.

## Visual system

- Base: near-black / black
- Front/focal chromatic plane: electric red
- Rear/structural chromatic plane: spectral/electric blue
- Neutral text: off-white
- Hard color boundaries are preferred over soft neon blur
- Build depth through **different planar regions**, negative space, area hierarchy, figure/background relations, scale and composition
- Do not create depth by cloning the same geometry at different offsets
- Use neutral breathing space to reduce visual fatigue

## Coding conventions

- Next.js App Router + TypeScript
- Keep catalog/content data outside visual components
- Prefer semantic HTML and CSS variables
- Components should be reusable and small enough to reason about
- No hidden magic numbers for important visual tokens: put them in CSS custom properties
- No hardcoded price claims in UI components
- Keep WhatsApp CTA centralized so contact copy can be changed once
- Name chromostereoscopic primitives by their actual role (`frontPlane`, `rearGrid`, `redMarker`, `blueField`) rather than ambiguous names such as `chromaticEdge`

## Current visual debt to remove

The existing baseline may still contain anaglyph-like implementation. Before declaring the next visual iteration complete, audit and replace at least:

- `.chromaticEdge`
- `.inverseEdge`
- `.heroAccent` red/blue `text-shadow`
- `.brandMark` paired chromatic `box-shadow`
- `.posterBlue` / `.posterRed` if they function as duplicate offset copies of one poster
- any new duplicated red/blue pseudo-elements

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
- research check: every visual claim should be traceable as strong, conditional, test/hypothesis or product decision

## Current priority backlog

1. Remove existing anaglyph-like CSS/markup and rebuild the chromostereoscopic system with single-geometry color planes.
2. Strengthen the homepage hero and discovery rails using the supplied red/blue/black reference language.
3. Add real product artwork only through a maintainable/licensing-conscious asset strategy.
4. Build individual game detail pages with related titles and WhatsApp quote CTA.
5. Expand genre taxonomy beyond the source list without mutating source facts.
6. Add Streaming and IA canonical catalogs once pricing/content is supplied.
7. Refine chromostereopsis through controlled visual tests, not arbitrary RGB effects.
