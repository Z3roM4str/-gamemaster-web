# Next Steps for Codex

Start by reading `AGENTS.md` and `docs/CODEX_HANDOFF.md`.

This file describes the **current** next stage. Earlier anti-anaglyph cleanup has already been substantially implemented; do not restart from an old baseline.

## Current starting point

Work from the latest `main`.

The visual baseline immediately before this handoff refresh was:

- `05e2245d7b8aa860a82ddc7a5ab14f81e32c8757` — `Strengthen contextual chromostereoscopic depth`

A handoff refresh was committed after that. Always inspect the latest `main` before editing.

## Current priority — Art direction at page scale

The site is functional enough to support the next design pass. The priority now is to make it feel like a distinctive premium entertainment experience rather than another incremental UI variation.

Target synthesis:

- STYLITES → large-scale art composition, depth, motion, asymmetry;
- Game Pass → discovery-first catalog and rails;
- Netflix → cinematic hierarchy and browsing clarity;
- GameMaster → chromostereopsis through independent red / blue / black regions.

Do not copy any reference literally.

## Phase 1 — Inspect the current implementation

Before changing anything:

- read the mandatory documents in `AGENTS.md`;
- inspect the latest page/component/CSS implementation;
- inspect the most recent commits;
- identify what already works visually and commercially;
- preserve functioning catalog, search, filters, detail/modal, WhatsApp, Facebook and accessibility behavior.

Do not undo working functionality to make visual experimentation easier.

## Phase 2 — Strengthen the hero

The hero should be the clearest expression of the GameMaster visual system.

Improve the existing layered model rather than replacing it with chromatic duplicates:

- near-black neutral base;
- substantial blue rear artistic/technical environment;
- one sparse but dominant red foreground/focal intervention;
- normal full-color game artwork above decorative planes;
- stronger editorial asymmetry and scale;
- clear proposition and CTAs;
- desktop and mobile compositions designed independently.

Avoid decorative clutter that weakens the hierarchy.

## Phase 3 — Make the full page one composition

Reduce the feeling of vertically stacked independent components.

Use:

- art fields that continue across section boundaries;
- black negative space as deliberate relief;
- contextual blue rear structures;
- red foreground interventions at selected moments;
- visual rhythm between dense and calm zones;
- transitions that make Gaming / Streaming / IA feel related without identical shells.

The page should remain legible and commercially clear.

## Phase 4 — Refine discovery rails

Keep the familiar horizontal discovery mechanics but make their surrounding compositions more authored.

- retain normal recognizable covers;
- allow collection/genre-specific contextual art;
- avoid identical container treatments for every rail;
- keep controls, headings and cards above decorative layers;
- use motion decoratively, never in a way that harms browsing.

Do not invent catalog data or prices.

## Phase 5 — Distinguish the three universes

Use one GameMaster system with different supporting grammars:

- Gaming → circuits, modular grids, controller/game geometry, controlled halftone/tessellation;
- Streaming → cinematic apertures, signal bands, frame systems, waveforms;
- IA → node networks, vector fields, topology/scientific/data-flow structures.

All three still obey the red / blue / black spatial model.

## Phase 6 — Mobile recomposition

At ~390px and ~430px:

- recompose hero art rather than cropping desktop blindly;
- reduce decorative density;
- simplify parallax;
- preserve tap targets and hierarchy;
- remove horizontal overflow;
- keep catalog exploration fast and natural.

Mobile is a first-class design target.

## Phase 7 — Motion and polish

Only after the composition works:

- refine differential parallax;
- tune typography and vertical rhythm;
- refine hover/focus states;
- optimize generated/procedural art assets;
- reduce any fatigue from excessive blue/red intensity;
- keep long reading/catalog regions calmer than hero/editorial moments.

Respect `prefers-reduced-motion`.

## Forbidden regression

Do not reintroduce:

- red/blue text ghosting;
- RGB split;
- chromatic aberration;
- paired red/blue shadows as depth;
- duplicated red/cyan geometry;
- offset duplicate covers/cards/logos;
- generic neon cyberpunk blur;
- purple overlap as the main spatial device.

## Definition of done for this iteration

A major revision is complete only when:

- it looks intentionally composed at ~1440px, ~430px and ~390px;
- the hero is materially stronger than the current baseline;
- the page reads as one composition rather than stacked sections;
- black remains meaningful negative/neutral space;
- blue has strong rear-world presence without exhausting the page;
- red remains a selective focal/front plane;
- catalog items remain easy to discover;
- original covers remain recognizable;
- WhatsApp conversion still works;
- unknown prices/availability remain unknown;
- `npm run lint` passes;
- `npm run build` passes;
- no important object exists as displaced red/blue duplicates;
- the page does not resemble an anaglyph/RGB-glitch demo;
- reduced motion and accessibility remain intact.

After completion, commit/push the work and report the resulting SHA.
