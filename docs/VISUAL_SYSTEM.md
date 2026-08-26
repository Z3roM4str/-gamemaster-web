# Visual System — GameMaster

## Design thesis

GameMaster should feel like a premium entertainment interface crossed with a continuous digital art composition. The site should be immediately usable, but its visual identity should not look interchangeable with a generic ecommerce template.

The current art-direction reference is **STYLITES × Game Pass × Netflix**:

- STYLITES informs page-scale composition and the confidence of the red/blue planar treatment;
- Game Pass informs discovery density, catalog architecture and gaming-native browsing;
- Netflix informs cinematic hierarchy and familiarity of content exploration;
- GameMaster research defines the perceptual rules and anti-anaglyph constraints.

Do not clone any reference literally.

The core visual language is **chromatic planar depth**: red, blue and neutral black arranged as separate spatial regions in one composition.

**Do not use anaglyph logic.** Red and blue must not be offset clones of the same text, border, logo, card or image.

## Page-scale composition

The page should feel like one authored vertical composition, not a stack of independent components with decorative red/blue styling added afterward.

Use:

- large chromatic fields that may span several sections;
- black apertures and negative-space zones between intense regions;
- rails that can visually cross into or out of larger structural fields;
- oversized editorial labels that participate in the composition;
- art that may break the content grid while utility/navigation remains stable;
- varied surrounding art direction around otherwise consistent catalog interactions.

Avoid:

- making every section a separate rounded container;
- repeating the same rail/card treatment down the page;
- switching from an artistic hero to generic ecommerce rows;
- filling the entire viewport with one continuous blue background.

## Visual hierarchy and area balance

The default hierarchy is:

- **Black / near-black:** dominant neutral environment, reading surface, negative space and compositional separator.
- **Blue:** rear/structural plane; grids, diagrams, patterns, contours, secondary spatial systems.
- **Red:** front/focal plane; sparse, assertive, commercial or editorial emphasis.
- **Off-white:** neutral content and typography.

Use this as an approximate full-experience target, not a strict pixel quota:

- 55–65% black / near-black
- 20–30% electric/spectral blue
- 10–15% electric red
- <5% off-white / gray

The key correction is that the site should **read primarily as black**, not blue. A small red element can dominate a much larger blue field.

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
- materially different red and blue structural regions;
- section-to-section visual continuity;
- alternating dense browsing areas and calm black zones.

Avoid:

- duplicated red/blue geometry;
- dozens of identical generic cards;
- fully rounded “app bubbles” everywhere;
- excessive centered text;
- generic gradient blobs;
- unreadable tiny metadata;
- RGB-split/glitch styling;
- chromatic-aberration filters;
- red/cyan ghosting;
- generic cyberpunk/neon styling;
- blue card after blue card.

## Grid

Desktop:

- max utility/content width around 1500–1600px;
- 24–40px horizontal page padding depending on viewport;
- 12-column mental model for utility content;
- art may break the grid, but navigation, controls and key reading surfaces should not;
- use the available viewport aggressively rather than making the whole experience a narrow centered column.

Mobile:

- 16px outer padding for utility content;
- one-column structural flow;
- rails may intentionally extend toward the right edge for discovery;
- hero and art fields must be recomposed, not merely scaled down;
- chromatic fields can enter from viewport edges, but the page itself must never overflow horizontally.

## Type

Use a distinctive display face only if it is web-safe/licensed and loaded responsibly. Until then use a strong system fallback stack.

Suggested hierarchy:

- Display / hero: very large, tight tracking, 700–900 weight
- Section headers: 28–40px desktop, 24–30px mobile
- Card titles: 15–18px
- Metadata: 12–14px

Body text must remain neutral/off-white.

Use oversized editorial labels selectively to connect sections into one composition. Avoid boxing or centering every heading.

### Chromatic typography rule

Allowed:

- a real red word inside a neutral heading;
- a separate blue label or structural module near the heading;
- a red bar, tab or marker intersecting the composition;
- blue typography in a separate rear-information layer;
- oversized colored type used as a real background/editorial region when contrast and legibility remain acceptable.

Forbidden:

- red/blue `text-shadow` around one copy of the heading;
- cloned pseudo-elements containing the same text;
- two offset copies of the same word;
- cyan ghost text.

## Components

### Hero

The hero is the strongest chromostereoscopic/editorial zone.

Should include:

- GameMaster emblem or typographic mark;
- one main proposition;
- concise support text;
- CTA to explore catalog;
- CTA to WhatsApp;
- substantial artistic visual mass on desktop;
- recomposed stacked/cinematic version on mobile;
- visible black negative space;
- one substantial blue rear structure;
- one independent red focal structure;
- recognizable featured artwork when available.

Hero art should use **different red and blue geometries**. Strong directions:

- blue technical/topographic rear field + red independent focal object;
- red posterized/halftone mass + blue modular background;
- blue engraved/technical figure + one red foreground bar;
- black negative aperture between red ornamental frame and blue inner field;
- recognizable cover art held between independent blue and red architectural regions.

Do not construct the hero from multiple identical poster rectangles offset in red/neutral/blue. Do not make the hero a giant blue rectangle.

### Universe cards / gateways

Three high-level gateways:

- Gaming
- Streaming
- IA

They should not feel like three generic SaaS cards. Prefer substantial editorial gateways integrated into the page composition.

Possible internal grammars:

- Gaming: modular glyphs / halftone / game-grid geometry / circuit traces / tessellations;
- Streaming: signal bands / cinematic apertures / frame systems / waveform structures;
- IA: network diagrams / node fields / topology / scientific/vector systems.

Each may contain one blue rear motif and one red focal motif, but these must not be duplicate outlines.

### Game cards

The game cover is the recognition and commercial object. Preserve normal/color-accurate artwork by default.

Preferred:

- large artwork area;
- title;
- small category/platform metadata;
- no invented price;
- clear hover/focus affordance;
- one card shell or no visible shell;
- optional independent red front/selection marker;
- blue structure placed behind the rail or in a genuinely separate card region;
- neutral/black metadata surface where needed.

Avoid globally tinting, posterizing or red/blue splitting normal game cover art.

When artwork is missing, use a procedural abstract placeholder based on category, not a gray box or fake box art.

### Rails

- horizontally scrollable;
- snap behavior optional;
- desktop arrows optional;
- first item aligns with section title when useful;
- card size should hint that more content exists;
- chromatic decoration must not interfere with swipe/touch affordance;
- interaction mechanics should remain consistent;
- surrounding composition should vary so the page does not become repetitive.

A rail can live on black, intersect a blue field, or be punctuated by an independent red editorial structure. Do not wrap every rail in the same container.

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

### Recognition-layer rule

Original game/service artwork should usually remain visually recognizable and close to its source colors. The GameMaster chromostereoscopic identity belongs primarily to the **architecture around the content**, not to blanket recoloring of every asset.

Only stylize artwork when it is a deliberate editorial treatment or a procedural placeholder.

## Procedural art direction

The owner's reference images and current STYLITES direction suggest a system combining:

- limited red/blue/black palette;
- strong black negative space;
- engraved / halftone figurative imagery;
- technical frames;
- repeated geometric glyphs;
- hard posterized color regions;
- asymmetric red-vs-blue area distribution;
- large independent chromatic masses;
- page-scale structures that continue across sections.

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
- scientific/diagrammatic structures;
- vector fields;
- signal/wave structures.

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

### Pattern F — Recognition object between planes

A normal game cover/service artwork sits as a recognizable object between a blue rear structure and an independent red foreground/editorial mass, with black separating the planes.

## Interaction

- hover: slight whole-component translation, scale or independent movement of genuinely separate planes;
- focus: strong visible outline;
- click/tap: fast, no excessive transition delays;
- scrolling: smooth only where it does not interfere with native behavior;
- subtle parallax is allowed only between genuinely different structures.

Do not use hover or scroll to increase red/blue ghost separation around the same object.

## Motion timing

Keep most UI motion between 140–260ms. Large hero transitions may reach ~450ms. Avoid endless ambient animation on high-contrast red/blue elements.

High-frequency chromatic motion is forbidden. The design must remain effective in reduced-motion mode.

## Comfort / anti-fatigue

Maximum chromatic intensity should be localized.

High-intensity zones:

- hero;
- major editorial transitions;
- selected/featured product;
- occasional category artwork.

Calmer zones:

- long browsing rails;
- body copy;
- FAQ;
- how-it-works content;
- modal/detail reading surfaces.

Use black negative space repeatedly so a user can browse for several minutes without the whole viewport feeling visually saturated.

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
- future pseudo-elements that duplicate one contour in two colors;
- duplicated/offset game-cover planes.

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
- chromatic art uses fewer, larger regions rather than thin doubled edges;
- black remains dominant;
- the mobile page reads as an intentional vertical cinematic composition rather than compressed desktop.

At 1440px+:

- layout should use available width and not look like a narrow mobile column floating in space;
- hero art should feel environmental/substantial;
- rails should expose several items at once;
- chromatic depth should come from rich plane composition, not red/blue ghosting;
- multiple sections should feel visually connected by larger page-scale structures;
- black breathing zones should interrupt dense catalog areas.

## Grayscale sanity check

Temporarily view the page in grayscale. If important text, cards, logos, icons or cover art reveal multiple displaced copies, the design has drifted toward anaglyph and must be corrected.

The page should remain one coherent composition even when the chromatic illusion is absent.

## Current acceptance summary

A visual iteration fails if it is predominantly blue, if the red appears only as trim, if the page looks like stacked generic cards, if normal game covers are globally recolored, or if the depth cue comes from duplicated red/blue geometry.

A visual iteration passes when the site feels like one black-dominant commercial artwork, the catalog remains familiar and fast, red and blue occupy materially different planes, original game content remains recognizable, and mobile/desktop each have intentional compositions.
