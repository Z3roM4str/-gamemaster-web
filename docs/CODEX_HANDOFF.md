# Codex Handoff — GameMaster

Use this file when starting the next Codex session.

## Current baseline

Continue from the latest `main`. Do **not** reset to an older visual baseline and do not rebuild from memory.

The front end was rebuilt as a single page-scale composition in the pass that refreshed this handoff. That rebuild is the current starting point, not a disposable prototype.

## Division of work

- **Claude Code** currently leads front end, UX/UI, art direction, composition, motion and responsive behaviour.
- **Codex** leads architecture, data, integrations, debugging, audits, refactors and heavy technical work.

Either agent may touch any file when necessary, but avoid re-litigating the other's current pass without a concrete reason. `docs/NEXT_STEPS_FOR_CODEX.md` lists the technical items handed over explicitly.

## Current front-end architecture

### CSS

The old four-file cascade (`globals.css` + `art-direction.css` + `art-fixes.css` + `art-pass-v2.css`, ~5,000 lines of mutual overrides) was removed. Three files now own separate layers and must not override each other:

- `app/globals.css` — tokens, reset, typographic primitives, controls, persistent chrome (header, footer, mobile quote bar, product modal).
- `app/composition.css` — the fixed rear world, the navigation spine, the shared art primitives and the parallax helpers.
- `app/sections.css` — per-section layout and local planes.

If a fix needs a fourth file, the architecture is drifting again. Put it in the layer that owns the concern instead.

### Art system

- `scripts/generate-art-geometry.mjs` deterministically generates `components/art/geometry.ts` (topographic contours, ridge/strata profiles, a node network and a halftone field). Re-run the script rather than hand-editing the generated file.
- `components/art/Fields.tsx` exposes those as server components (`TerrainField`, `BasinField`, `RidgeField`, `StrataField`, `NetworkField`, `HalftoneField`, `ModuleField`, `SignalField`). They are server-only so the geometry never enters the client bundle.
- The same terrain is sampled at different crops and scales across the page. That is what makes the site read as one continuous artwork; do not replace a section's field with unrelated decoration.
- `components/SiteArt.tsx` renders the fixed rear world plus `components/art/DepthDriver.tsx`, the only client code driving motion.

### Motion contract

`DepthDriver` writes `--gm-progress`, `--gm-pointer-x`, `--gm-pointer-y` on the root and `--gm-depth-y` on every `[data-gm-depth]` element.

- Positive `data-gm-depth` = rear plane, trails the scroll.
- Negative `data-gm-depth` = front plane, leads the scroll.
- Under `prefers-reduced-motion` every offset is zeroed in both JS and CSS.

### Catalog rhythm

`CatalogShelf` accepts a `rhythm` prop (`editorial`, `open`, `block`, `hairline`) cycled by `shelfRhythmCycle`. Interaction is identical across rhythms; only the surrounding composition changes. `Catalog` also injects two editorial interruptions between rails. Adding rails does not require new CSS — extend the cycle.

## Mandatory first step

Before changing code:

1. pull/read the latest `main`;
2. read `AGENTS.md` completely;
3. read `docs/PROJECT_SCOPE.md`;
4. read `docs/CODEX_VISUAL_GUARDRAILS.md`;
5. read `docs/DESIGN_DIRECTION_STYLITES.md`;
6. read `docs/research/README.md`;
7. read `docs/research/EVIDENCE_MAP.md`;
8. read `docs/research/IMPLEMENTATION_RULES.md`;
9. inspect the current implementation and latest commits before proposing changes.

The repository is the source of truth. Do not assume an older handoff describes the current UI better than the code on `main`.

## Immediate objective

This iteration is **art-direction elevation**, not another small recolor or component shuffle.

Push the current GameMaster site toward a distinctive premium entertainment experience inspired by:

- **STYLITES** → page-scale composition, integrated art, chromatic depth, asymmetry, movement and visual surprise;
- **Game Pass** → discovery, rails, catalog structure and game-first browsing;
- **Netflix** → cinematic hierarchy and effortless content exploration;
- **GameMaster** → real chromostereopsis using independent red / blue / black regions, never anaglyph duplication.

Do not clone any reference literally.

## What must be preserved

Do not break or discard working commercial functionality:

- Gaming / Streaming / IA architecture;
- Nintendo Switch catalog and current data source;
- search / filters / discovery behavior;
- product selection/detail behavior already implemented;
- WhatsApp conversion;
- Facebook contact;
- price / availability consultation rules;
- accessibility behaviors;
- responsive support;
- recognizable, normal-color game cover artwork.

Do not invent prices, stock, promotions, plans or benefits.

## Art-direction target

The page should feel like **one continuous authored composition**, not a hero followed by generic ecommerce sections.

### Spatial system

Use three material planes:

- **black / near-black** = neutral base, reading space, breathing room;
- **blue** = substantial rear structural world;
- **red** = sparse but assertive foreground/focal intervention.

Depth must come from different shapes, fields, scale, contrast and differential motion. Never create depth by offsetting duplicate red/blue versions of the same object.

### Composition

Prioritize:

- large-scale fields that can cross section boundaries;
- stronger use of black negative space so blue does not saturate the whole page;
- blue technical/topographic/network structures as rear environments;
- red focal masses that feel physically nearer without covering critical UI;
- editorial asymmetry;
- controlled halftone / engraving / technical-diagram language;
- art integrated into rails and section transitions, not decorative stickers added afterward;
- clear calm zones between high-intensity chromatic moments.

### Catalog

Keep Game Pass / Netflix-like browsing mechanics, but integrate them into the GameMaster composition:

- horizontal rails remain easy to scan;
- full-color covers remain recognizable;
- surrounding art may vary by collection/genre;
- avoid wrapping every rail in the same rectangular shell;
- use context-specific rear blue structures + independent red foreground interventions;
- functional content should remain above decorative planes and easy to interact with.

### Mobile

Mobile is a separate composition, not a squeezed desktop layout.

At ~390px and ~430px:

- recompose the hero and major art fields;
- simplify motion and art density;
- preserve hierarchy and tap targets;
- prevent horizontal overflow;
- keep key catalog actions immediately usable.

## Behaviour to retain from the current composition

- black dominant, blue as a rear structural world, red as a scarce front plane;
- depth from occlusion between materially different objects (blue mass, black aperture, full-colour cover, red blade), never from duplicated contours;
- full-colour covers always above decorative planes and never crossed through the middle by a red element;
- alternating dense and calm zones down the page;
- mobile recomposed, not scaled.

Improve these ideas rather than reverting to duplicated chromatic effects.

## Forbidden visual shortcuts

Do not introduce:

- red/blue text ghosting;
- RGB split;
- chromatic aberration;
- red/cyan anaglyph duplication;
- paired red/blue box shadows used as depth;
- duplicated card borders;
- offset duplicate game covers;
- blur-heavy generic neon cyberpunk;
- purple overlap as the primary depth mechanism;
- generic SaaS component-library aesthetics.

## Recommended focus for this iteration

Work from highest visual impact downward:

1. **Hero** — make it the strongest brand statement and clearly authored at desktop + mobile.
2. **Page-scale art system** — make black / blue / red depth continue coherently beyond the hero.
3. **Section transitions** — reduce the feeling of stacked independent blocks.
4. **Catalog rails** — keep usability while giving different collections contextual art grammar.
5. **Universe sections** — Gaming / Streaming / IA should belong to one brand but have distinct internal visual languages.
6. **Typography / spacing / rhythm** — refine hierarchy after the composition works.
7. **Motion** — subtle differential parallax only where it improves depth and never usability.

Do not spend the iteration on microscopic polish before the page-scale composition is convincing.

## Validation before finishing

Run and report:

- `npm run lint`;
- `npm run build`;
- desktop review around 1440px;
- mobile review around 390px and 430px;
- no horizontal overflow;
- keyboard focus / modal behavior still works;
- `prefers-reduced-motion` remains respected;
- body text remains readable;
- game covers remain recognizable and untinted;
- the page still works if chromostereopsis is weak or perceived inverted;
- grayscale/single-geometry sanity check shows no duplicated important objects;
- the result does not resemble a 3D-glasses/anaglyph demo.

## Response expected from Codex

After making the changes, report concisely:

1. the main compositional changes;
2. why they improve the current direction;
3. files changed;
4. lint/build result;
5. desktop/mobile checks performed;
6. anything still visually weak;
7. the commit SHA created on `main` (or clearly state if changes were not pushed).
