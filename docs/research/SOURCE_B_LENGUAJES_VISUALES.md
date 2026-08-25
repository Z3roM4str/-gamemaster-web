# Source B — Lenguajes visuales para explotar la cromoestereopsis

Source-derived companion to the owner-supplied 19-page PDF `Lenguajes visuales para explotar la cromoestereopsis.pdf`.

This document maps what the source actually explores: perceptual mechanism, visual constraints, candidate design languages, reference-image analysis, production methods and identity implications. It does **not** upgrade exploratory design proposals into scientific facts.

## 1. Central framing

The report defines chromostereopsis as a binocular depth phenomenon in which strong chromatic differences, especially red/blue, can generate perceived depth in a flat image through ocular chromatic aberration and related mechanisms.

It explicitly distinguishes this from:

- ordinary pictorial depth cues such as perspective, occlusion and shading;
- chromatic vibration;
- a conventional anaglyph, which uses two displaced images and normally expects colored glasses.

**GameMaster consequence:** use one coherent 2D composition. Never fake the phenomenon by cloning the same geometry in two colors.

## 2. Mechanism and observer variability

The source emphasizes:

- transverse chromatic aberration (TCA) as a key mechanism;
- pupil position and Stiles–Crawford effects as modulators;
- typical red-forward / blue-rear perception in many observers under dark-background conditions;
- possible inversion or weak/no effect in a minority of observers;
- sensitivity to illumination, viewing distance and individual optics.

Therefore GameMaster can use red as the intended focal/front plane and blue as the intended structural/rear plane, but conventional layout hierarchy must still carry meaning.

## 3. State of evidence in this source

### Stronger directions

The source repeatedly favors:

- wide red/blue spectral separation;
- high chromatic contrast;
- cleanly separated color regions;
- dark or neutral negative space;
- crisp edges;
- binocular interpretation rather than pictorial duplication.

### Lower-confidence / exploratory directions

The source treats many of these as plausible rather than fully established:

- exact saturation optimum;
- exact element size;
- exact spatial frequency optimum;
- exact amount of detail;
- exact density;
- texture effects;
- whether repetition itself increases the perceptual effect;
- whether one artistic style is intrinsically superior.

Codex must not turn these lower-confidence proposals into hard scientific rules.

## 4. Perceptual-variable matrix from the source

### Spectral separation

The report presents red vs blue as the strongest conventional pair because of wide wavelength separation.

**Web use:** preserve strong red/blue separation in focal chromostereoscopic modules.

### Relative luminance

The report notes that luminance differences can strengthen, weaken, contaminate or even invert perceived depth depending on conditions.

**Web use:** do not assume CSS HSL/lightness or equal hex brightness equals perceptual equiluminance. Treat luminance as a tuning variable.

### Saturation

High saturation is presented as a useful practical direction, but the source acknowledges limited direct quantitative evidence for the exact curve.

### Background

The report strongly explores black/dark backgrounds because of contrast and the common red-forward condition, while also acknowledging contextual effects and possible inversion with lighter backgrounds.

### Size and contours

Moderate-size, clearly resolved regions and hard boundaries are favored. Extremely fine structures may merge or become uncomfortable.

### Spatial frequency

Low-to-medium-frequency repeated structures are proposed as promising; very fine noise may disrupt binocular fusion. The exact optimum is not established.

### Detail and density

The report warns that more detail is not necessarily better. Moderate structure can provide multiple chromatic boundaries; excessive density can increase fatigue.

### Texture

Acromatic or same-color texture may be aesthetically acceptable if it does not dilute red/blue separation.

### Superposition

The source warns against mixing red and blue into intermediate/purple regions when the goal is clean chromatic plane separation.

### Figure / ground

Clear figure-ground assignment is treated as useful for stable perceptual layering.

## 5. Design specification proposed in the source

The report translates its perceptual reading into practical design directions:

- use red/blue with strong spectral separation;
- restrict the palette around red, blue and neutral/black;
- keep color boundaries sharp;
- use solid or posterized regions rather than uncontrolled gradients;
- use repeated geometric structures only when they support clear chromatic segmentation;
- keep figure/background hierarchy legible;
- scale elements so chromatic boundaries remain visible at normal viewing distances.

The source proposes three broad profiles:

### Profile A — maximum chromostereopsis

Prioritizes contrast, saturation, regular geometry and strong red/blue separation even if the result is visually rigid or fatiguing.

### Profile B — balanced

Preserves visible depth while adding neutral breathing room, legibility and richer graphic structure.

### Profile C — artistic identity

Keeps only the minimum perceptual constraints while allowing more stylistic freedom.

**GameMaster should operate primarily between Profile B and Profile C**, not Profile A across every screen.

## 6. Audit of the supplied visual references

The source analyzes the owner's red/blue/black reference imagery and separates what likely matters perceptually from what is merely stylistic.

### Functional/perceptual characteristics identified

- extreme red/blue separation;
- strong dark negative space;
- clean segmentation between chromatic regions;
- repeated structures that provide multiple boundaries;
- crisp linework.

### Stylistic/nonessential characteristics identified

- pixel-art appearance itself;
- dithering as such;
- specific engraving conventions;
- a particular black-outline treatment.

**GameMaster consequence:** preserve the visual DNA without copying the exact pixel/engraving technique everywhere.

## 7. Visual-language families explored

The report intentionally expands beyond “pixel art”. Major families include:

- geometric / Op Art structures;
- technical/vector drawings;
- halftone / engraving reinterpretations;
- polygonal mosaics;
- scientific diagrams and infographics;
- maps/topography/cartography;
- generative/computational systems;
- signal/iconographic systems;
- figurative posterization;
- data/network/circuit structures;
- mathematical patterns and tessellations;
- natural/biomorphic systems;
- symbolic/notational systems.

These families are treated as **design territories**, not validated rankings of perceptual strength.

## 8. Candidate finalists in the source

The report discusses five example finalists:

1. geometric Op Art;
2. technical vector drawing;
3. modified halftone;
4. polygonal mosaic;
5. diagram/infographic language.

The source argues that technical/vector systems may offer a strong balance of controllability, scalability, identity and compatibility with red/blue segmentation, while Op Art may have high pure perceptual potential.

This is a design inference, not a scientific head-to-head result.

## 9. Controlled prototype strategy

The source recommends comparing styles using:

- the same underlying subject/composition;
- the same red/blue/black palette;
- the same size/hierarchy;
- no extra shadows or photorealistic depth cues;
- only the visual language changed between variants.

Negative constraints for AI include avoiding:

- photorealistic 3D shading;
- extra colors;
- blur;
- chromatic aberration filters.

This directly supports the GameMaster anti-anaglyph guardrails.

## 10. Hybrid visual systems proposed

Examples include:

- topographic structure + line hatching;
- vector diagram + pixel/dot matrix;
- ornament + halftone;
- figurative linework + abstract mathematical pattern.

The source recommends describing each hybrid by:

- components;
- structural/decorative role;
- combination rule;
- chromatic assignment;
- perceptual benefit;
- artistic benefit;
- risk;
- AI difficulty;
- repeatability as an identity system.

This is useful for GameMaster because it encourages **consistent grammars**, not random decorative effects.

## 11. Nontraditional design territories

The report explores systems from:

- scientific visualization;
- mathematics/computation;
- cartography;
- architecture/engineering;
- notational systems;
- historical technical interfaces;
- natural/biological diagrams.

These are valuable because they naturally support layers, modules, lines and repeated structures that can be assigned distinct red/blue roles.

## 12. Screen vs print

The source emphasizes that RGB display and CMYK/reflective print behave differently.

For display:

- emitted red/blue primaries can be highly separated;
- actual display output depends on panel/gamut/SPD.

For print:

- ink/paper/illuminant constrain saturation and reflectance;
- print should be calibrated separately.

**GameMaster consequence:** create a separate print art profile later; do not assume browser colors translate directly to flyers/posters.

## 13. Observer variability and comfort

The report explicitly notes:

- not everyone perceives the same depth direction;
- some observers may see little or no effect;
- saturated repeated red/blue patterns can create fatigue or visual vibration;
- long-duration UI should use neutral breathing areas and lower chromatic density.

This is a major product requirement, not an optional polish item.

## 14. Experimental protocol proposed

The source suggests controlled A/B comparison across visual styles with:

- grayscale/monochromatic controls;
- color-inverted controls;
- controlled luminance variants when possible;
- minimized pictorial depth cues;
- measures of perceived depth, clarity, preference and time-to-perceive.

A future GameMaster `/lab` or internal visual test page could operationalize this.

## 15. AI generation guidance

The report warns that text-to-image systems often:

- introduce gradients;
- mix colors;
- add unwanted shades;
- blur boundaries;
- invent pictorial depth cues.

Recommended approach:

- prompt for structure;
- constrain to solid red/blue/black;
- vectorize or posterize;
- deterministically remap palette;
- clean edges;
- validate output.

## 16. Production pipeline

The source proposes a practical sequence:

1. concept / structural sketch;
2. AI or procedural generation;
3. vector cleanup;
4. palette remapping;
5. luminance check;
6. edge cleanup;
7. display/print testing;
8. iteration.

## 17. Identity-system criteria

A strong GameMaster visual language should define:

- invariant rules;
- allowed variables;
- range of variation;
- ability to work figuratively and abstractly;
- recognizable structure even without color;
- consistent grammar across a collection.

This is crucial: the brand cannot depend only on “red + blue”.

## 18. GameMaster takeaways from Source B

### Use

- red/blue/black as a disciplined plane system;
- engraving/halftone selectively;
- topographic, circuit, diagrammatic, tessellated and generative modules;
- strong negative space;
- crisp posterized regions;
- different category motifs under one consistent grammar;
- reduced density on mobile;
- controlled AI + deterministic cleanup.

### Do not use

- anaglyph duplication;
- RGB split;
- red/cyan ghosting;
- uncontrolled neon gradients;
- blur as the main depth cue;
- arbitrary cyberpunk noise;
- one repeated optical pattern behind every section;
- the claim that one candidate style is scientifically proven to be best.
