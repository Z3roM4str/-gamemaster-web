# Research-to-Web Implementation Rules — GameMaster

This document translates the owner-supplied chromostereopsis research into concrete implementation constraints for the GameMaster website.

It is intentionally stricter than generic “red/blue 3D” art direction because the current project previously drifted into anaglyph-like CSS.

## 1. Single-geometry rule

Every semantic UI object must exist once.

A heading is one heading. A logo is one logo. A card is one card. A button is one button. A game cover is one cover.

Do **not** create a red copy and a blue/cyan copy of the same contour and offset them to simulate depth.

### Reject

```css
/* anaglyph-like: reject */
.title {
  text-shadow: -3px 0 red, 3px 0 cyan;
}
```

```css
/* duplicated stereo-looking border: reject */
.card {
  box-shadow: -4px 0 0 red, 4px 0 0 blue;
}
```

### Prefer

```css
/* one object, different independent regions */
.card {
  background: var(--gm-surface);
  border-inline-start: 3px solid var(--gm-red);
  border-block-end: 2px solid var(--gm-blue);
}
```

Better still: use a real red focal element and a separate blue structural element that do not trace the same contour.

## 2. Three-plane grammar

Use three conceptual regions:

- **red focal/front plane** — selected focal masses, active accents, primary art fragments, key markers;
- **neutral middle plane** — near-black surfaces, off-white typography, commerce information;
- **blue structural/rear plane** — grids, contour systems, circuit/network lines, secondary framing, distant art fields.

These are compositional roles, not promises about what every observer will perceive.

## 3. Typography

### Body text

- neutral/off-white;
- high contrast;
- no red/blue ghost shadows;
- no dense chromatic pattern directly behind paragraphs.

### Hero text

Allowed:

- one red word;
- one blue word;
- a blue independent underline behind a red accent word;
- red/blue blocks occupying different regions;
- a neutral word surrounded by independent red and blue graphic modules.

Forbidden:

- duplicated glyphs;
- red/blue text shadows that reproduce the exact glyph shape;
- RGB split;
- glitch treatment presented as chromostereopsis.

## 4. Cards

A card should be one neutral body with independent chromatic structure.

Good patterns:

- red selection marker on one edge + blue technical pattern in artwork area;
- blue rear topology field + independent red category glyph;
- alternating red/blue modules inside a procedural cover;
- red foreground figure + blue background diagram.

Bad patterns:

- two identical card rectangles offset by 2–5px;
- red and blue duplicate borders tracing the full card;
- hover that increases red/blue ghost separation.

## 5. Hero art

The hero should behave like an editorial composition, not a 3D-glasses demo.

Recommended structure:

1. black/near-black canvas;
2. blue structural field such as grid, topology, circuit, flow or map;
3. neutral content/art aperture;
4. independent red focal mass, bar, glyph or posterized figure;
5. sparse repetition / technical marks;
6. strong empty space.

Do not make the red plane and blue plane identical rectangles or copies of one poster.

## 6. Palette

Keep values centralized as CSS variables.

Starting product palette:

- `--gm-black: #050505`
- `--gm-surface: #0b0b0d`
- `--gm-red: #ff1a1a`
- `--gm-blue: #1616ff`
- `--gm-white: #f4f4ef`

These are **product starting values**, not scientifically universal wavelengths.

Permit later visual tests of:

- red/blue luminance balance;
- slightly different blue/red digital values;
- black vs dark-gray surfaces;
- density and area ratios.

## 7. Gradients, transparency and blur

### Primary chromostereoscopic regions

Prefer solid or posterized color.

Avoid:

- red-to-blue gradients;
- transparent red over blue producing purple;
- neon fog joining the two planes;
- chromatic blur around text/cards.

### Neutral atmosphere

Subtle neutral gradients/blur may be used for ordinary UI atmosphere if they do not become the supposed depth mechanism.

## 8. Edges

Use crisp boundaries where the chromatic cue matters.

Suitable technologies:

- CSS borders and solid backgrounds;
- SVG paths;
- masks/clip-path with hard edges;
- posterized PNG/WebP art;
- vector procedural art.

Do not infer one universal line width from the research. Define responsive tokens and test.

## 9. Pattern families

The research supports exploring these as **design languages**:

- topographic contours;
- circuit/network diagrams;
- technical vectors;
- non-periodic tessellations;
- Voronoi/cellular structures;
- halftone/engraving;
- flow fields;
- modular symbols;
- parametric/architectural patterns;
- restrained ornament;
- fractal/branching systems.

Use one dominant family per module or section. Avoid combining every motif at once.

## 10. Repetition and density

Repetition is an identity/composition tool, not a guaranteed perceptual multiplier.

Rules:

- keep medium density on desktop;
- reduce density on mobile;
- keep empty black regions around dense modules;
- never put high-frequency red/blue vibration behind reading text;
- avoid endless animated repetition.

## 11. Motion

Motion may support the UI but is not required for chromostereopsis.

Allowed:

- ordinary 2–4px hover translation of a whole card;
- small motion of an independent red focal element relative to a blue background field;
- scroll/reveal transitions;
- subtle parallax when comfortable.

Forbidden:

- continuously oscillating red and blue copies of the same shape;
- flashing chromatic patterns;
- animation designed to simulate anaglyph separation.

Honor `prefers-reduced-motion`.

## 12. Responsive behavior

Mobile is a separate composition, not a scaled desktop.

At ~390/430px:

- reduce chromatic pattern density;
- use fewer simultaneous decorative regions;
- preserve one strong red focal element and one blue structural field rather than many tiny cues;
- keep body copy neutral;
- eliminate overflow caused by decorative planes;
- keep tap targets conventional and legible.

Desktop can carry more spatial structure, but the same anti-anaglyph rule applies.

## 13. Accessibility and fallback

Assume some users perceive:

- red nearer;
- blue nearer;
- little/no chromostereoscopic depth.

Therefore selected state, navigation, CTA hierarchy and product information must also use:

- position;
- labels;
- shape;
- weight;
- conventional contrast;
- focus rings;
- spacing.

Never rely on “this is red, therefore it looks closer” as the only signal.

## 14. AI-generated visual assets

Recommended pipeline:

1. generate structure/composition;
2. keep subject and geometry;
3. segment/vectorize/posterize;
4. remap to restricted GameMaster palette;
5. remove gradients and accidental intermediate colors;
6. enforce clean boundaries;
7. verify red/blue regions are different shapes, not displaced duplicates;
8. optimize for web.

Prompt constraints should include concepts such as:

- single coherent image;
- solid red, solid blue, black;
- hard posterized regions;
- no anaglyph;
- no chromatic aberration;
- no red/cyan ghosting;
- no duplicated contours;
- no RGB split;
- no soft neon gradient.

## 15. Game/product artwork

Official/authorized cover art does not need to be recolored into red/blue.

Use chromostereopsis around it through:

- section art;
- frames made of different independent regions;
- procedural placeholders;
- category headers;
- background structures;
- focus/selection markers.

Do not destroy recognizable cover art just to force the brand palette.

## 16. Acceptance checklist for every major visual change

Before completion:

- [ ] No semantic object is duplicated in red/blue or red/cyan to fake depth.
- [ ] No red/blue `text-shadow` reproduces glyph contours.
- [ ] No paired chromatic `box-shadow` reproduces a complete object boundary.
- [ ] Red and blue primary regions remain clearly separated.
- [ ] Purple is not the main depth cue.
- [ ] The layout remains understandable in grayscale.
- [ ] The interface remains usable if the viewer perceives the depth direction inverted.
- [ ] Body text sits on neutral reading surfaces.
- [ ] Mobile has lower decorative density than desktop.
- [ ] `prefers-reduced-motion` is respected.
- [ ] No horizontal overflow at ~390px/430px.
- [ ] The page does not resemble a conventional red/cyan 3D-glasses graphic.
- [ ] `npm run lint` passes.
- [ ] `npm run build` passes.

## 17. Definition of success

A successful GameMaster chromostereoscopic implementation should feel spatial because **different red, blue and neutral regions compete as perceptual planes inside one sophisticated composition**.

It should not need an explanation, glasses, a glitch filter or duplicated contours to look distinctive.
