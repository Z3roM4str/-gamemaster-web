# Codex Handoff — GameMaster

Use this file when starting the next Codex session.

## Immediate task

Do not redesign from memory and do not interpret “red/blue depth” generically.

First read the repository source of truth in the order defined by `AGENTS.md`, especially:

1. `docs/CODEX_VISUAL_GUARDRAILS.md`
2. `docs/research/README.md`
3. `docs/research/EVIDENCE_MAP.md`
4. `docs/research/IMPLEMENTATION_RULES.md`
5. `docs/CHROMOSTEREOPSIS.md`
6. `docs/VISUAL_SYSTEM.md`
7. `docs/REFERENCE_IMAGES.md`
8. the three source-derived research maps under `docs/research/`

Then inspect the current code before proposing changes.

## Goal of the next iteration

Rebuild the current visual implementation so it expresses **chromostereopsis rather than anaglyph stereoscopy** while improving the site into a premium, discovery-first entertainment catalog.

The intended visual model is one 2D composition with materially different regions:

- red = focal/front-oriented region;
- near-black = neutral/reading/commercial region;
- blue = rear/structural region.

These are different shapes/regions, not duplicated versions of the same object.

## Mandatory audit

Search the entire codebase for:

- `text-shadow` using red/blue/cyan;
- paired red/blue `box-shadow`;
- RGB split / chromatic aberration;
- duplicated red/blue pseudo-elements;
- cloned text/icons/cards/posters with transform offsets;
- `chromaticEdge`, `inverseEdge` and other legacy names;
- hero planes that are merely duplicate rectangles of the same geometry.

Remove or redesign any anaglyph-like implementation.

## Visual target

The page should feel like:

- a premium entertainment catalog;
- cinematic/editorial rather than SaaS;
- dark, elegant and highly intentional;
- red/blue/black but not neon-glitch cyberpunk;
- technically/artfully layered using topography, circuit/network structures, modular glyphs, controlled halftone/engraving and negative space;
- visually strong on desktop and independently composed for mobile.

Reference-image DNA is documented in `docs/REFERENCE_IMAGES.md`.

## Suggested hero direction

Prototype **one** coherent hero language first rather than mixing every research candidate.

Recommended first option:

- near-black canvas;
- blue topographic/circuit rear structure;
- neutral editorial content aperture;
- one sparse but dominant red foreground/focal mass;
- crisp edges;
- optional controlled halftone or engraved figurative/procedural element;
- no chromatic ghosting.

## Commercial/product constraints

Preserve:

- Gaming / Streaming / IA architecture;
- Nintendo Switch catalog data;
- price/availability as consultation unless canonical data exists;
- WhatsApp conversion;
- Facebook contact;
- no implied official affiliation with third-party brands;
- mobile-first usability.

Do not invent products, prices, stock or benefits.

## Validation

Before finishing:

- run `npm run lint`;
- run `npm run build`;
- inspect ~1440px desktop;
- inspect ~390px and ~430px mobile;
- confirm no horizontal overflow;
- confirm body text remains readable;
- confirm the site still makes sense in grayscale;
- confirm no important object appears as two red/blue/cyan displaced copies;
- confirm the result does not resemble a red/cyan 3D-glasses demo.

## Response expected from Codex

After making the changes, report:

1. what anaglyph-like implementation was found and removed;
2. which research-backed/product-default rules were applied;
3. files changed;
4. lint/build result;
5. what remains to improve next;
6. any visual assumption that should be tested rather than treated as fact.
