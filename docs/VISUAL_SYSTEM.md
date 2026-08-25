# Visual System — GameMaster

## Design thesis

GameMaster should feel like a premium entertainment interface crossed with a digital art object. The site should be immediately usable, but its visual identity should not look interchangeable with a generic ecommerce template.

The core visual language is **chromatic planar depth**: red, blue and neutral black arranged as separate spatial regions in one composition.

**Do not use anaglyph logic.** Red and blue must not be offset clones of the same text, border, logo, card or image.

## Visual hierarchy

The default hierarchy is:

- **Red:** front/focal plane; sparse, assertive, commercial or editorial emphasis.
- **Black / near-black:** neutral plane; reading surface, negative space and compositional separator.
- **Blue:** rear/structural plane; grids, diagrams, patterns, contours, secondary spatial systems.
- **Off-white:** neutral content and typography.

The red and blue planes do not need equal area. A small red element can dominate a much larger blue field.

## Layout language

Use:

- large editorial hero areas;
- horizontal content rails;
- cinematic crop ratios for featured content;
- vertical poster ratios for games;
- clear section titles;
- oversized category labels;
- asymmetric art in hero areas;
- controlled negative space;
- strong figure/background relationships;
- materially different red and blue structural regions.

Avoid:

- duplicated red/blue geometry;
- dozens of identical generic cards;
- fully rounded “app bubbles” everywhere;
- excessive centered text;
- generic gradient blobs;
- unreadable tiny metadata;
- RGB-split/glitch styling;
- chromatic-aberration filters;
- red/cyan ghosting.

## Grid

Desktop:

- max content width around 1500–1600px;
- 24–40px horizontal page padding depending on viewport;
- 12-column mental model;
- art may break the content grid, but utility/navigation should not.

Mobile:

- 16px outer padding;
- one-column structural flow;
- rails may intentionally extend toward the right edge for discovery;
- hero artwork must be recomposed, not merely scaled down.

## Type

Use a distinctive display face only if it is web-safe/licensed and loaded responsibly. Until then use a strong system fallback stack.

Suggested hierarchy:

- Display / hero: very large, tight tracking, 700–900 weight
- Section headers: 28–40px desktop, 24–30px mobile
- Card titles: 15–18px
- Metadata: 12–14px

Body text must remain neutral/off-white.

### Chromatic typography rule

Allowed:

- a real red word inside a neutral heading;
- a separate blue label or structural module near the heading;
- a red bar, tab or marker intersecting the composition;
- blue typography in a separate rear-information layer.

Forbidden:

- red/blue `text-shadow` around one copy of the heading;
- cloned pseudo-elements containing the same text;
- two offset copies of the same word;
- cyan ghost text.

## Components

### Hero

Should include:

- GameMaster emblem or typographic mark;
- one main proposition;
- concise support text;
- CTA to explore catalog;
- CTA to WhatsApp;
- substantial artistic visual mass on desktop;
- recomposed stacked version on mobile.

Hero art should use **different red and blue geometries**. Strong directions:

- blue technical/topographic rear field + red independent focal object;
- red posterized/halftone mass + blue modular background;
- blue engraved/technical figure + one red foreground bar;
- black negative aperture between red ornamental frame and blue inner field.

Do not construct the hero from multiple identical poster rectangles offset in red/neutral/blue.

### Universe cards

Three high-level cards:

- Gaming
- Streaming
- IA

Each gets a distinct internal motif while sharing the same system. One card shell only.

Possible internal grammars:

- Gaming: modular glyphs / halftone / game-grid geometry;
- Streaming: signal bands / cinematic frames / waveform-like structures;
- IA: network diagrams / node fields / vector systems.

Each may contain one blue rear motif and one red focal motif, but these must not be duplicate outlines.

### Game cards

Poster-oriented, with:

- artwork area;
- title;
- small category/platform metadata;
- no invented price;
- clear hover/focus affordance;
- one card shell;
- optional independent red front marker and blue internal background motif.

When artwork is missing, use a procedural abstract placeholder based on category, not a gray box.

### Rails

- horizontally scrollable;
- snap behavior optional;
- desktop arrows optional;
- first item aligns with section title;
- card size should hint that more content exists;
- chromatic decoration must not interfere with swipe/touch affordance.

### Filter chips

Dark neutral base. Active state can use:

- a real red fill or left marker;
- a blue secondary indicator in a different region;
- text weight/icon change.

Do not use symmetric red/blue shadow copies around the chip.

### CTA

Primary actions should be commercially clear before they are artistic.

Preferred treatments:

- red body + neutral text;
- neutral body + red foreground tab;
- neutral body + separate blue side marker;
- solid red CTA surrounded by black negative space.

Do not use paired red/blue shadows to make the CTA look doubled.

## Image strategy

Game covers and service logos are useful, but the repo should not become dependent on uncontrolled hotlinks.

Preferred order:

1. owner-supplied assets;
2. official/authorized assets with a documented source;
3. procedural placeholders.

Do not fabricate fake box art that could be mistaken for official art.

## Procedural art direction

The owner's reference images show strong potential in a style combining:

- limited red/blue/black palette;
- engraved / halftone figurative imagery;
- technical frames;
- repeated geometric glyphs;
- hard posterized color regions;
- large black negative space;
- asymmetric red-vs-blue area distribution.

Use that as a direction, not as a requirement that every surface look pixelated.

Good procedural motifs:

- circuit traces;
- contour maps;
- radial nodes;
- modular glyphs;
- topology lines;
- halftone masks;
- geometric frames;
- tessellations;
- scientific/diagrammatic structures.

## Chromostereoscopic composition patterns

### Pattern A — Focal red / rear blue

One red focal form, one materially different blue structural field, black between them.

### Pattern B — Segmented field

Red and blue occupy separate cells or regions in one pattern. Shared boundaries are crisp; there is no ghost copy.

### Pattern C — Editorial window

A red frame, black aperture and blue visual content inside. Each region has a distinct geometric role.

### Pattern D — Sparse red accent

Large blue/black composition with one small red object or marker that carries visual priority.

### Pattern E — Halftone split by role

One subject rendered red/black and a separate background rendered blue/black, or vice versa. Do not trace the same silhouette twice.

## Interaction

- hover: slight whole-component translation, scale or independent movement of genuinely separate planes;
- focus: strong visible outline;
- click/tap: fast, no excessive transition delays;
- scrolling: smooth only where it does not interfere with native behavior.

Do not use hover to increase red/blue ghost separation around the same object.

## Motion timing

Keep most UI motion between 140–260ms. Large hero transitions may reach ~450ms. Avoid endless ambient animation on high-contrast red/blue elements.

## Accessibility

- maintain sufficient text contrast;
- never use color alone to denote selected state;
- provide visible keyboard focus;
- honor reduced motion;
- avoid flashing patterns;
- do not put dense red/blue patterns directly behind paragraph text;
- ensure the interface remains understandable for viewers who do not perceive the intended chromostereoscopic depth.

## Anti-anaglyph code audit

The current baseline must be audited for older visual debt. Replace patterns such as:

- `.chromaticEdge` paired red/blue `box-shadow`;
- `.inverseEdge` paired chromatic shadows;
- `.heroAccent` red/blue `text-shadow`;
- paired chromatic shadow on `.brandMark`;
- red/blue duplicate poster planes if they are copies of the same geometry;
- future pseudo-elements that duplicate one contour in two colors.

Use `docs/CODEX_VISUAL_GUARDRAILS.md` as the final authority.

## Responsive acceptance criteria

At approximately 390px width:

- no horizontal page overflow;
- nav collapses cleanly;
- hero remains fully understandable;
- primary CTA visible without awkward wrapping;
- rails are thumb-scrollable;
- game card title wraps safely;
- section headings do not collide with controls;
- chromatic art uses fewer, larger regions rather than thin doubled edges.

At 1440px+:

- layout should use available width and not look like a narrow mobile column floating in space;
- hero art should feel substantial;
- rails should expose several items at once;
- chromatic depth should come from rich plane composition, not red/blue ghosting.

## Grayscale sanity check

Temporarily view the page in grayscale. If important text, cards, logos or icons reveal multiple displaced copies, the design has drifted toward anaglyph and must be corrected.

The page should remain one coherent composition even when the chromatic illusion is absent.