# Codex Visual Guardrails — GameMaster

## Highest-priority rule

GameMaster uses **chromostereopsis**, not anaglyph stereoscopy and not an RGB-split/glitch effect.

This rule overrides any older wording in the repository that could be interpreted as permission to duplicate red/blue versions of the same object.

## The distinction Codex must preserve

### Chromostereopsis

A single 2D composition can create perceived depth through chromatic relationships, especially strong red/blue separation, binocular vision, luminance/adaptation and observer-specific ocular chromatic aberration.

For GameMaster this means designing **real, single geometric elements** in distinct chromatic planes:

- red foreground/focal elements;
- black or near-black neutral elements/surfaces;
- blue rear/structural elements;
- crisp boundaries between color regions;
- controlled adjacency and repetition;
- enough neutral space for comfort and legibility.

### Anaglyph / forbidden look

An anaglyph-like treatment duplicates or offsets the same geometry in red/cyan or red/blue to imitate stereoscopic disparity. GameMaster must not use this as its visual language.

The following are **forbidden as depth effects**:

- red/cyan or red/blue duplicate copies of the same text, icon, logo, card, image or border;
- `text-shadow` that creates red and blue copies on opposite sides of the same glyph;
- paired red/blue `box-shadow` used to make one object look doubled;
- `filter: drop-shadow(...)` that produces chromatic ghost copies;
- pseudo-elements that clone the same shape with a lateral red/blue offset;
- duplicated DOM nodes with `translateX`, `translate`, `left/right` offsets or transforms solely to fake stereoscopic separation;
- RGB channel splitting;
- chromatic-aberration filters;
- cyan ghosting;
- glitch aesthetics presented as chromostereopsis;
- large red/blue blur halos;
- transparent red/blue overlap that turns the main cue purple.

## Single-geometry invariant

For every meaningful object, ask:

> If red and blue were converted to grayscale, would I still see only one copy of this object?

If the answer is no, the implementation is probably anaglyph-like and must be redesigned.

A heading should have one heading shape. A button should have one button body. A logo should have one logo. A card should have one card body. Depth comes from **neighboring or layered but semantically distinct color regions**, not from cloning the same contour.

## Owner-reference images: study material only

The red/blue/black images supplied by the owner are **visual references for understanding color-plane composition and chromostereoscopic behavior**. They are not site assets.

Unless the owner explicitly asks for one specific image to be used, Codex must **not**:

- place those reference images as page backgrounds;
- crop them into banners, hero backgrounds or section textures;
- reuse their figures, frames or scenes as page artwork;
- treat them as a moodboard that can simply be pasted into the product.

What should be extracted from them is the **logic**: black negative space, a substantial blue structural/rear plane, a red focal/front plane, hard chromatic boundaries, line-based or engraved detail, and a composition that still reads as art without the depth illusion.

## Current art-first priority

The immediate priority is not another conventional UI polish pass. It is to establish a recognisable **art system** for the entire site.

Required hierarchy:

1. **Black** is the neutral base and negative space. It prevents white or generic interface surfaces from taking over the experience.
2. **Blue** is a large secondary background plane, but it must carry artwork and structure rather than behave as a flat fill. Use technical networks, controller/circuit geometries, topographic contours, signals, modular systems, scientific diagrams, flow fields or similarly coherent graphic systems.
3. **Red** is the strongest focal plane. It should appear in independent foreground masses, typographic blades, selection/status shapes and artistic interruptions that genuinely sit in front of the blue structure.
4. **White/black text** is chosen for legibility based on the actual surface beneath it. Readability wins over chromatic purity.

Do not solve the page by adding more rectangles. Rectangles remain appropriate for real game covers and functional controls, but the surrounding visual language should use irregular clipped planes, paths, topology, circuits, contours, symbols, angled blades, ornamental systems and negative space.

## Game-cover invariant

Game covers are commercial content, not chromostereoscopic art.

- Keep covers in their **normal original full colour**.
- Do not recolour, posterize, duotone, split RGB channels, add red/blue filters, apply chromatic aberration, or convert every cover into the site palette.
- Prefer official Nintendo/eShop artwork or other legitimate official publisher artwork when sourcing or replacing a cover.
- The site art must frame the covers; it must not destroy their identity.

## Allowed chromatic depth patterns

These are acceptable starting patterns because the red and blue regions are different structural elements, not ghost copies:

1. **Red object / blue environment** — e.g. a red foreground glyph or motif against a blue structural field on black.
2. **Blue rear framework / red focal mass** — a blue grid, topology or circuit system behind a red independent figure.
3. **Alternating solid regions** — red and blue cells, bars, polygons or modules sharing crisp boundaries.
4. **Separate rails and separators** — one red rail in one location and one blue rail elsewhere, each with its own layout role.
5. **Three-plane composition** — red foreground, black/neutral middle, blue rear.
6. **Posterized or halftone art** — red and blue areas remain cleanly segmented and do not become offset copies of the same contour.

## Typography

Body text is neutral/off-white.

Hero typography may contain a red word, a blue word, red/blue blocks behind or around it, or separate colored typographic modules. It must not use duplicated chromatic shadows to create fake 3D.

Forbidden example:

```css
/* DO NOT USE */
.hero-title {
  text-shadow: -2px 0 red, 2px 0 blue;
}
```

Preferred direction:

```css
.hero-title {
  color: var(--gm-white);
}

.hero-title__accent {
  color: var(--gm-red);
}

.hero-title__rear-marker {
  background: var(--gm-blue);
}
```

The accent and rear marker are different visual elements with different layout roles.

## Cards and controls

A card should have one card shell. Do not make a red copy and a blue copy of the same shell behind it.

Use instead:

- a blue structural strip or corner in the rear area;
- a red status/selection bar in the front area;
- neutral body surface;
- independent red and blue motifs inside the card;
- red and blue only where they convey separate spatial regions.

Buttons should not use paired red/blue shadows. A primary button can be red, neutral, or use one real red foreground accent with a separate blue neighboring marker.

## Hero art

The hero should look like a premium digital artwork, not a 3D-glasses demo.

Strong candidates from the owner's references/research:

- blue technical/topographic rear field + red independent focal object;
- red posterized/engraved foreground mass + blue repeating glyph system;
- blue halftone figure + one red vertical foreground bar;
- black negative space separating chromatic structures;
- red ornamental frame with a separate blue scene or background system;
- abstract gaming hardware/circuit systems drawn as a coherent blue rear artwork, interrupted by one red focal mass.

Do not create three identical poster rectangles offset in red/neutral/blue. If multiple planes exist, their geometry/content must be materially different.

## Image generation

Image generation is optional, not mandatory. Prefer procedural/vector/CSS/SVG artwork when it gives better control over colour, edge quality and responsiveness.

If generated imagery is used, it should create **new independent art** based on gaming/technology concepts, not reproduce the owner's reference scenes. Generated artwork must respect the same hard constraints: no duplicated red/blue contours, no anaglyph, no blur-based colour mixing, and no destruction of game-cover artwork.

## Motion

Motion may change the position of independent planes slightly, but must not temporarily turn them into duplicated stereo copies.

Avoid oscillating red/blue separation, channel splitting and continuous chromatic jitter.

## Mobile

Mobile is not a compressed desktop. Recompose the art:

- fewer chromatic structures at once;
- larger, clearer solid regions;
- no thin doubled edges;
- no horizontal overflow;
- neutral reading surfaces;
- red/blue density reduced where necessary;
- preserve at least one clearly visible blue structural artwork and one red focal intervention rather than deleting the art entirely.

## Current-code audit required

Before the next major visual iteration, inspect the current implementation for anaglyph-like patterns. At minimum audit:

- `.chromaticEdge`
- `.inverseEdge`
- `.heroAccent`
- `.brandMark`
- `.posterBlue`
- `.posterRed`
- any red/blue `text-shadow`
- any paired red/blue `box-shadow`
- any duplicate red/blue pseudo-elements or transformed copies

Replace them with single-geometry chromostereoscopic composition.

## Acceptance test

A visual iteration fails if any of the following are true:

- it looks like something intended for red/cyan 3D glasses;
- text appears doubled;
- card or logo edges have symmetric red/blue ghost copies;
- the main depth cue is lateral offset of cloned geometry;
- RGB glitch/chromatic aberration is the dominant aesthetic;
- the site falls back to black rectangles plus coloured borders with no independent art system;
- the supplied reference images are pasted into the site as backgrounds;
- normal game covers have been recoloured to match the cromo palette.

A visual iteration passes when:

- the page remains a single clean composition;
- red, blue and neutral regions form distinct spatial planes;
- a substantial amount of blue exists as designed rear artwork rather than flat paint;
- red creates clear foreground/focal interruptions;
- gaming/technology has a visible graphic vocabulary beyond icons and rectangular cards;
- the effect is strongest in focal art rather than body text;
- original full-colour game covers remain visually intact;
- the design remains premium and readable without perceiving the depth illusion;
- desktop and mobile have intentional compositions;
- the user can browse Gaming, Streaming and IA without visual fatigue.

## Instruction to Codex

When uncertain, choose **real color-plane composition over fake stereo offset**. Never interpret “cromoestereopsis”, “chromostereoscopic depth” or “red/blue depth” as permission to implement an anaglyph, RGB split, chromatic aberration or duplicate-offset effect.

When the page still looks like a standard dark catalogue with red/blue accents, the art direction is not finished.