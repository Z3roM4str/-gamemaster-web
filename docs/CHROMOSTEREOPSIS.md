# Chromostereopsis Specification — GameMaster

## Purpose

GameMaster uses chromostereopsis as a brand language, not as a gimmick filter. The goal is a site that can feel spatial through color while remaining readable, comfortable and commercially credible.

This document distills the owner's research into a practical web specification. The research itself notes uncertainty and observer variability, so this is an **artistic-depth implementation**, not a laboratory claim of universal depth perception.

## What the research supports strongly

The supplied reports consistently treat the phenomenon as binocular and strongly associated with large spectral separation between red and blue. They also identify observer variability, luminance/adaptation and display characteristics as important factors.

Operational consequences for the website:

- use strongly separated red and blue planes;
- keep boundaries crisp where the effect matters;
- use dark or neutral space around chromatic structures;
- avoid mixing red and blue into purple in the primary depth cues;
- do not rely on the effect as the only way to communicate hierarchy;
- expect some users to perceive weaker, inverted or no chromostereoscopic depth.

## Important nuance from the research set

The research documents are not perfectly uniform on every parameter. Earlier material strongly favors a black background, maximum saturation and hard red/blue contrast. The later audit is more cautious: it treats some claims such as “black is always optimal”, “maximum saturation is always best” and exact spatial-frequency rules as insufficiently demonstrated.

Therefore the site should treat these as adjustable design variables rather than dogma.

## GameMaster implementation profile

### Palette

Use CSS variables so the exact values can be tuned globally.

Initial digital palette:

- `--gm-black: #050505`
- `--gm-surface: #0b0b0d`
- `--gm-red: #ff1a1a`
- `--gm-blue: #1616ff`
- `--gm-white: #f4f4ef`
- `--gm-muted: #a6a6ad`

These are web implementation values, not claims that a specific hex pair is scientifically optimal. The research explicitly warns that actual display output depends on gamut, SPD, luminance and calibration.

### Depth grammar

Use three conceptual planes:

1. **Front plane:** red accents and selected foreground structures.
2. **Neutral plane:** near-black surfaces and off-white text.
3. **Rear plane:** blue structural lines, frames or background motifs.

Do not color all foreground copy red and all backgrounds blue. The effect should emerge from selective planar relationships.

### Hard chromatic edge

Preferred pattern:

- primary neutral object
- red crisp offset on one side
- blue crisp offset on the opposite side
- no large blur radius

Example CSS concept:

```css
.chromatic-edge {
  box-shadow:
    -3px 0 0 var(--gm-red),
     3px 0 0 var(--gm-blue);
}
```

The exact offset should scale down on mobile.

### Borders

Use deliberate red/blue border fragments, rails, corner brackets, underlines and planar strips. Crisp geometry is preferred over neon fog.

### Typography

Primary body copy remains neutral for legibility. Chromatic duplication can be used on large hero words or short labels, not paragraphs.

### Cards

Cards should feel layered, not glassy:

- black/near-black base
- blue rear frame displaced slightly
- red active/front accent
- cover art or procedural graphic centered in its own plane
- strong focus/hover state without dramatic blur

### Backgrounds

Allowed:

- sparse grids
- circuit-like line systems
- topographic contours
- modular diagrams
- halftone fields
- technical/vector motifs

These directions match the owner's research into technical diagrams, vector systems, topography, flow fields, tessellations and generative structures as promising visual grammars.

Avoid using a single repeated “RGB glitch” texture across the entire page.

## Motion

Motion can reinforce layers through small relative translations, but it must not become continuous eye strain.

Recommended:

- hero plane parallax of only a few pixels
- cards translate 2–4px on hover
- red/blue edge offsets react subtly to pointer/focus
- rails use normal inertial scrolling

Always support `prefers-reduced-motion: reduce`.

## Comfort guardrails

The research notes that intense red/blue combinations and dense repetitive patterns can create visual fatigue.

Therefore:

- reserve the strongest effect for hero, section transitions and selected cards;
- keep reading surfaces mostly neutral;
- avoid high-density chromatic vibration behind text;
- include negative/black space;
- do not animate saturated red/blue patterns continuously;
- mobile should use lower chromatic offset amplitudes.

## Responsive rules

### Desktop

- larger chromatic offsets: ~3–5px
- deeper layered hero composition
- more visible structural background patterns

### Mobile

- offsets: ~1–3px
- fewer simultaneous planes
- simplify background ornament
- preserve full-width readability
- never cause horizontal viewport overflow

## What Codex should experiment with next

The owner's research identifies several promising visual territories. Test these as distinct modules rather than mixing all at once:

1. topographic contour system
2. technical/circuit diagram system
3. modular tessellation
4. halftone/engraving reinterpretation
5. flow-field or generative line system
6. abstract typographic symbols

For each experiment, evaluate:

- perceived depth
- readability
- brand distinctiveness
- fatigue after 30–60 seconds
- mobile performance
- whether the system still looks recognizable without the chromatic effect

## Scientific humility

Never present the website as scientifically guaranteed to create the same depth effect for every viewer. The source research explicitly notes individual differences, possible inversion and display-dependent results.
