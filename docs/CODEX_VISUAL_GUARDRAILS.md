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
- red ornamental frame with a separate blue scene or background system.

Do not create three identical poster rectangles offset in red/neutral/blue. If multiple planes exist, their geometry/content must be materially different.

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
- red/blue density reduced where necessary.

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
- RGB glitch/chromatic aberration is the dominant aesthetic.

A visual iteration passes when:

- the page remains a single clean composition;
- red, blue and neutral regions form distinct spatial planes;
- the effect is strongest in focal art rather than body text;
- the design remains premium and readable without perceiving the depth illusion;
- desktop and mobile have intentional compositions;
- the user can browse Gaming, Streaming and IA without visual fatigue.

## Instruction to Codex

When uncertain, choose **real color-plane composition over fake stereo offset**. Never interpret “cromoestereopsis”, “chromostereoscopic depth” or “red/blue depth” as permission to implement an anaglyph, RGB split, chromatic aberration or duplicate-offset effect.