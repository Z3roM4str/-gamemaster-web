# Visual System — GameMaster

## Design thesis

GameMaster should feel like a premium entertainment interface crossed with a digital art object. The site should be immediately usable, but its visual identity should not look interchangeable with a generic ecommerce template.

The core visual language is **chromatic planar depth**: red, blue and neutral black arranged as separate spatial layers.

## Layout language

Use:

- large editorial hero areas
- horizontal content rails
- cinematic crop ratios for featured content
- vertical poster ratios for games
- clear section titles
- oversized category labels
- asymmetric art in hero areas
- controlled negative space
- compact utility chrome

Avoid:

- dozens of identical white cards
- fully rounded “app bubbles” everywhere
- excessive centered text
- generic gradient blobs
- unreadable tiny metadata

## Grid

Desktop:

- max content width around 1500–1600px
- 24–40px horizontal page padding depending on viewport
- 12-column mental model

Mobile:

- 16px outer padding
- one-column structural flow
- rails may intentionally extend toward the right edge for discovery

## Type

Use a distinctive display face only if it is web-safe/licensed and loaded responsibly. Until then use a strong system fallback stack.

Suggested hierarchy:

- Display / hero: very large, tight tracking, 700–900 weight
- Section headers: 28–40px desktop, 24–30px mobile
- Card titles: 15–18px
- Metadata: 12–14px

Body text must remain neutral/off-white.

## Components

### Hero

Should include:

- GameMaster emblem or typographic mark
- one main proposition
- concise support text
- CTA to explore catalog
- CTA to WhatsApp
- large procedural/artistic visual mass on the right on desktop
- recomposed stacked version on mobile

### Universe cards

Three high-level cards:

- Gaming
- Streaming
- IA

Each gets a different internal motif while sharing the same chromatic frame system.

### Game cards

Poster-oriented, with:

- artwork area
- title
- small category/platform metadata
- no invented price
- clear hover/focus affordance

When artwork is missing, use a procedural abstract placeholder based on category, not a gray box.

### Rails

- horizontally scrollable
- snap behavior optional
- desktop arrows optional
- first item aligns with section title
- card size should hint that more content exists

### Filter chips

Dark neutral base. Active state can use red front plane and blue rear border rather than a filled rainbow gradient.

### CTA

Primary action can be red-forward with a blue rear offset. Secondary action neutral with chromatic border.

## Image strategy

Game covers and service logos are useful, but the repo should not become dependent on uncontrolled hotlinks.

Preferred order:

1. owner-supplied assets
2. official/authorized assets with a documented source
3. procedural placeholders

Do not fabricate fake box art that could be mistaken for official art.

## Procedural art direction

The owner's reference images show strong potential in a style combining:

- limited red/blue/black palette
- engraved / halftone figurative imagery
- technical frames
- repeated geometric glyphs
- hard posterized color regions

Use that as a direction, not as a requirement that every surface look pixelated.

Good procedural motifs:

- circuit traces
- contour maps
- radial nodes
- modular glyphs
- topology lines
- halftone masks
- geometric frames

## Interaction

- hover: slight depth shift and frame separation
- focus: strong visible outline
- click/tap: fast, no excessive transition delays
- scrolling: smooth only where it does not interfere with native behavior

## Motion timing

Keep most UI motion between 140–260ms. Large hero transitions may reach ~450ms. Avoid endless ambient animation on high-contrast red/blue elements.

## Accessibility

- maintain sufficient text contrast
- never use color alone to denote selected state
- provide visible keyboard focus
- honor reduced motion
- avoid flashing patterns
- do not put dense red/blue patterns directly behind paragraph text

## Responsive acceptance criteria

At approximately 390px width:

- no horizontal page overflow
- nav collapses cleanly
- hero remains fully understandable
- primary CTA visible without awkward wrapping
- rails are thumb-scrollable
- game card title wraps safely
- section headings do not collide with controls

At 1440px+:

- layout should use available width and not look like a narrow mobile column floating in space
- hero art should feel substantial
- rails should expose several items at once
