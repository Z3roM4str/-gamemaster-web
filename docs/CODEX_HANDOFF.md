# Codex Handoff — GameMaster

Use this file when starting the next Codex session.

## Current baseline

Continue from the latest `main`. Do **not** reset to an older visual baseline and do not rebuild from memory.

Current reference commit when this handoff was refreshed:

- `05e2245d7b8aa860a82ddc7a5ab14f81e32c8757` — `Strengthen contextual chromostereoscopic depth`

That pass already strengthens the blue rear world, red foreground plane, contextual rail art and differential motion. Treat it as the current starting point, not as a disposable prototype.

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

## Reference behavior to retain from the latest pass

The latest implementation intentionally strengthened:

- blue rear-world presence;
- red as a coherent foreground plane rather than ghost outline;
- game covers / functional UI above decorative color planes;
- independent blue/red motion in contextual catalog rails;
- black as a neutral visual layer rather than eliminating it.

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
