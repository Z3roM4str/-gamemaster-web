# Next Steps for Codex

Start by reading `AGENTS.md` and the linked docs.

## Phase 1 — Validate and stabilize

- install dependencies
- run `npm run lint`
- run `npm run build`
- fix any version-specific Next.js issues without changing product intent
- inspect at desktop (~1440px) and mobile (~390/430px)

## Phase 2 — Raise the art direction

The current site is a functional foundation, not the final visual target.

Improve it toward a premium editorial entertainment experience using the supplied visual language:

- red / blue / black planar depth
- engraved/halftone references
- technical diagrams, topology, modular glyphs
- crisp chromatic edges
- asymmetry and negative space

Do not replace the design with a generic component-library aesthetic.

## Phase 3 — Content discovery

Transform Gaming from a large grid into a richer discovery system:

- featured hero rail
- horizontal collection rails
- search
- category filters
- optional genre tags
- “related games” logic
- individual game detail pages

Use `data/catalog.ts` as source data. Do not invent prices.

## Phase 4 — Artwork architecture

Create a maintainable asset layer:

- `public/games/...` for owner/authorized covers
- procedural fallback component for titles without art
- metadata field for artwork source/provenance
- no uncontrolled hotlink dependency

The fallback should look intentionally GameMaster, not like a missing-image placeholder.

## Phase 5 — Streaming and IA

Keep these sections commercially useful without fabricating plans/prices:

- service discovery cards
- current-quote CTA
- dedicated landing sections
- later migrate to canonical data files when owner supplies exact offerings

## Phase 6 — Conversion and polish

- prefilled WhatsApp messages per game/service
- FAQ
- trust/explanation section
- sticky mobile CTA if it improves usability
- metadata / OpenGraph
- favicon / brand assets
- performance audit
- accessibility audit

## Definition of done for a major design iteration

A revision should not be considered complete until:

- it looks intentionally designed at 390px and 1440px;
- the mobile page is not merely a squeezed desktop layout;
- red/blue effects remain crisp and legible;
- the effect does not overwhelm body copy;
- all catalog items remain discoverable;
- WhatsApp conversion works;
- unknown prices remain unknown;
- build passes.
