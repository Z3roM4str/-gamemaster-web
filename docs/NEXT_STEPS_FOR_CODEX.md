# Next Steps for Codex

Start by reading `AGENTS.md`. The repository now contains a dedicated research library derived from the owner's three chromostereopsis investigations. Before touching visual code, read `docs/CODEX_HANDOFF.md` and follow the mandatory research order in `AGENTS.md`.

## Phase 0 — Correct the visual model

Before adding new polish, remove the current anaglyph-like implementation.

Audit at minimum:

- `.chromaticEdge`
- `.inverseEdge`
- `.heroAccent`
- `.brandMark`
- `.posterBlue`
- `.posterRed`
- all red/blue `text-shadow`
- all paired red/blue `box-shadow`
- duplicate red/blue pseudo-elements or transformed copies

Replace them with a **single-geometry chromostereoscopic composition**:

- one object per semantic object;
- red focal/foreground regions;
- black/near-black neutral regions;
- blue rear/structural regions;
- crisp boundaries;
- no duplicated red/blue copies of the same contour.

The site must not resemble content intended for red/cyan 3D glasses.

## Research check before implementation

Read:

- `docs/research/README.md`
- `docs/research/EVIDENCE_MAP.md`
- `docs/research/IMPLEMENTATION_RULES.md`
- `docs/research/SOURCE_A_INVESTIGACION_ESPECIFICACION.md`
- `docs/research/SOURCE_B_LENGUAJES_VISUALES.md`
- `docs/research/SOURCE_C_AUDITORIA.md`
- `docs/research/CHROMO_RESEARCH_NOTES.md`

Do not silently reconcile research contradictions. Keep a distinction between:

- strong/direct findings;
- conditional findings;
- hypotheses/tests;
- GameMaster product decisions.

## Phase 1 — Validate and stabilize

- install dependencies;
- run `npm run lint`;
- run `npm run build`;
- fix version-specific Next.js issues without changing product intent;
- inspect at desktop (~1440px) and mobile (~390/430px);
- confirm no horizontal overflow;
- confirm important objects exist only once geometrically.

## Phase 2 — Raise the art direction

The current site is a functional foundation, not the final visual target.

Improve it toward a premium editorial entertainment experience using the supplied visual language:

- red / blue / black planar depth;
- engraving / halftone references;
- technical diagrams, topology, modular glyphs;
- crisp color-region boundaries;
- asymmetry and negative space;
- sparse red focal objects against larger blue structural systems;
- one chromatic language per module, not every visual idea at once.

Do not replace the design with a generic component-library aesthetic.

Do not use:

- red/blue text ghosting;
- RGB split;
- chromatic aberration;
- offset duplicate card borders;
- cyan ghost copies;
- blur-heavy neon cyberpunk as the default language.

## Phase 3 — Rebuild the hero correctly

The hero should be the strongest expression of the brand.

Recommended directions to prototype one at a time:

1. blue topographic/technical rear field + red independent focal mass;
2. red engraved/halftone focal art + blue repeating glyph field;
3. blue technical portrait/system + one red vertical foreground bar;
4. red ornamental frame + black aperture + blue inner scene.

Do not use multiple identical poster rectangles offset in red, neutral and blue.

Keep the proposition and CTAs clear at first glance.

## Phase 4 — Content discovery

Transform Gaming from a large grid into a richer discovery system:

- featured hero rail;
- horizontal collection rails;
- search;
- category filters;
- optional genre tags;
- “related games” logic;
- individual game detail pages.

Use `data/catalog.ts` as source data. Do not invent prices.

## Phase 5 — Artwork architecture

Create a maintainable asset layer:

- `public/games/...` for owner/authorized covers;
- procedural fallback component for titles without art;
- metadata field for artwork source/provenance;
- no uncontrolled hotlink dependency.

The fallback should look intentionally GameMaster, not like a missing-image placeholder.

Procedural fallbacks should use real segmented red/blue/black regions, not anaglyph outlines.

## Phase 6 — Streaming and IA

Keep these sections commercially useful without fabricating plans/prices:

- service discovery cards;
- current-quote CTA;
- dedicated landing sections;
- later migrate to canonical data files when owner supplies exact offerings.

Give each universe a related but distinct internal visual grammar.

## Phase 7 — Conversion and polish

- prefilled WhatsApp messages per game/service;
- FAQ;
- trust/explanation section;
- sticky mobile CTA if it improves usability;
- metadata / OpenGraph;
- favicon / brand assets;
- performance audit;
- accessibility audit.

## Definition of done for a major design iteration

A revision is not complete until:

- it looks intentionally designed at 390px and 1440px;
- the mobile page is not merely a squeezed desktop layout;
- red/blue regions remain crisp and legible;
- the strongest chromatic effect does not overwhelm body copy;
- all catalog items remain discoverable;
- WhatsApp conversion works;
- unknown prices remain unknown;
- build passes;
- no text, logo, icon, card or poster is represented by red/blue displaced copies;
- the grayscale sanity check still shows one coherent geometry;
- the page does not read as an anaglyph, RGB glitch or chromatic-aberration demo;
- unresolved research variables are described as tests/hypotheses rather than facts.
