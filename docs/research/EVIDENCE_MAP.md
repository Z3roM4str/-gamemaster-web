# Chromostereopsis Evidence Map — GameMaster

This file consolidates the three owner-supplied research documents **without pretending they agree on every parameter**. It is the fast reference Codex should use when deciding whether something is a research-supported direction, an implementation default or an open experiment.

## Epistemic labels used here

- **STRONG** — repeatedly supported or treated as direct/robust in the supplied research set.
- **CONDITIONAL** — supported in some conditions, strongly affected by context or revised by later analysis.
- **HYPOTHESIS / TEST** — plausible design/perceptual proposal that the sources explicitly leave unresolved.
- **PRODUCT DECISION** — a GameMaster implementation choice made for brand/usability; not claimed as scientific optimum.

## Core phenomenon

### Chromostereopsis is binocular color-induced depth

**Status: STRONG**

The research set consistently describes chromostereopsis as a binocular phenomenon associated with chromatic aberration and retinal disparity from different wavelengths.

**Product consequence:** one coherent 2D composition is sufficient. No duplicate stereo pair is required.

### Anaglyph duplication is not chromostereopsis

**Status: STRONG conceptual distinction**

The research set explicitly distinguishes a conventional anaglyph—two displaced images, often red/cyan—from chromostereopsis.

**Product consequence:** red/cyan ghost copies, RGB split and duplicated offset geometry are forbidden as the GameMaster depth language.

## Chromatic pair

### Red/blue spectral separation is a strong starting pair

**Status: STRONG**

All three sources treat red and blue as a conventional, high-separation pair capable of producing the effect.

**Product decision:** GameMaster uses electric red and spectral/electric blue as its two chromatic planes.

### One exact hex pair is universally optimal

**Status: NOT SUPPORTED**

The sources repeatedly note that actual display output depends on gamut, SPD, luminance and calibration.

**Product consequence:** keep palette values in CSS variables and tune them; never call a specific pair scientifically optimal across all displays.

## Direction of depth

### Red tends to appear nearer than blue for many observers in common dark-background conditions

**Status: STRONG / CONDITIONAL**

The research set presents red-forward / blue-rear as the common or majority direction under typical conditions, while also documenting inversion/variation.

### Every viewer will see red in front

**Status: FALSE / NOT SUPPORTED**

Pupil position, optical differences and viewing conditions can alter or invert direction; some viewers may experience little or no effect.

**Product consequence:** semantic hierarchy must also be encoded through layout, size, typography, spacing and conventional contrast.

## Background

### Dark background is a strong practical starting condition

**Status: CONDITIONAL but useful**

Source B and Source C strongly favor dark/black backgrounds in their cited conditions. Source A later warns that “black always maximizes the effect” is too absolute because adaptation and luminance complicate the relationship.

**Product decision:** GameMaster uses near-black as the dominant brand canvas because it supports contrast, mood and the research direction. This is not presented as a universal perceptual optimum.

## Saturation

### Vivid/highly saturated red and blue are useful

**Status: CONDITIONAL / strong practical direction**

The sources repeatedly use vivid colors and Source C treats saturation as favorable. Source A cautions that the exact saturation-response curve is not directly established.

**Product decision:** use stronger saturation in focal art/hero modules and reduce chromatic intensity in long-reading areas when needed for comfort.

### Maximum saturation is always best

**Status: NOT ESTABLISHED**

Do not convert this into a hard rule.

## Luminance

### Luminance materially affects magnitude/direction

**Status: STRONG**

The research set consistently treats luminance and adaptation as important.

### Equiluminance is always strongest

**Status: CONTRADICTED / NOT SUPPORTED AS UNIVERSAL**

Source C explicitly audits this as an overstatement and argues that equal luminance can reduce apparent depth in some demonstrations. Source A still values equiluminance as a scientific isolation condition.

**Product consequence:** use luminance deliberately. Do not optimize GameMaster to a supposed universal equal-brightness rule.

## Edges and segmentation

### Crisp, clearly separated chromatic regions are useful

**Status: STRONG practical direction**

All three sources favor clear separation and hard boundaries for controlled chromatic cues.

**Product consequence:** prioritize SVG/CSS/vector/posterized regions and clean boundaries where chromostereopsis matters.

### Blur / anti-aliasing exact threshold

**Status: HYPOTHESIS / TEST**

Hard edges are preferred, but the sources do not establish one universal blur or pixel threshold.

## Red/blue overlap

### Mixing red and blue into purple weakens clean plane separation

**Status: STRONG practical/optical direction**

The source set repeatedly recommends keeping the main chromatic regions distinct.

**Product consequence:** avoid transparent red/blue overlap as the main depth device.

## Spatial frequency

### One medium spatial frequency is universally optimal

**Status: HYPOTHESIS / TEST**

The sources propose low-to-medium structures as promising but explicitly identify the exact curve as unresolved.

**Product consequence:** test module density rather than hard-coding one “scientific” grid spacing.

## Repetition and regularity

### Repetition automatically strengthens chromostereopsis

**Status: HYPOTHESIS / TEST**

Earlier visual exploration treats repetition as promising; later audit material emphasizes the lack of direct validation.

**Product consequence:** use repetition for rhythm/identity when it helps, not because it is assumed to increase depth monotonically.

## Element density

### More chromatic edges always means more depth

**Status: HYPOTHESIS / TEST**

Excess density may increase fatigue and visual noise.

**Product consequence:** reduce dense chromatic structures on mobile and keep reading surfaces neutral.

## Orientation

### Vertical edges may be a useful starting configuration

**Status: HYPOTHESIS / plausible optical direction**

Source A discusses vertical edges as potentially favorable because of horizontal disparity geometry.

**Product consequence:** vertical rails/bars are a reasonable motif, but curved/topographic/diagonal structures remain valid experiments.

## Observer variability

### Individual differences are material

**Status: STRONG**

The research set repeatedly documents different depth directions and strengths among viewers.

**Product consequence:** never make the visual effect a prerequisite for understanding the interface.

## Display variability

### Device output changes the physical stimulus

**Status: STRONG**

OLED/LCD, gamut, SPD, brightness, gamma and ambient conditions vary.

**Product consequence:** GameMaster is an artistic-depth web implementation, not a calibrated laboratory guarantee.

## Visual language rankings

### Op Art, technical drawing, halftone, topography, tessellation, circuits, flow fields and symbolic systems are promising

**Status: DESIGN EXPLORATION**

The sources identify these as candidates because they can support clean planes, crisp lines, repetition and identity.

### One of these is scientifically proven to be best

**Status: NOT SUPPORTED**

Any ranking is a design inference until compared experimentally.

## AI generation

### AI should define structure; deterministic processing should protect palette/edges

**Status: STRONG production recommendation in the research set**

The sources warn that unconstrained image models introduce gradients, extra colors, blur and unwanted depth cues.

**Product consequence:** for critical chromostereoscopic art, generate structure, then posterize/remap/vector-clean deterministically.

## Comfort and fatigue

### Dense saturated red/blue can be visually tiring

**Status: STRONG practical concern**

**Product consequence:** strongest chromatic modules should be focal, not continuous. Body copy and commerce flows remain neutral and readable.

## GameMaster defaults vs research claims

The following are **product defaults**, not universal scientific claims:

- near-black dominant canvas;
- red as intended focal/front plane;
- blue as intended structural/rear plane;
- off-white body text;
- limited use of high-saturation focal regions;
- topographic/circuit/modular/halftone motifs;
- reduced chromatic density on mobile;
- strong negative space;
- no anaglyph-like duplication.

## Fast Codex decision test

Before adding a visual effect, ask:

1. Does it create a single coherent geometry, or does it duplicate one object? If duplicated: reject.
2. Does it preserve distinct red/blue regions, or merge them into glow/purple? If merged: usually reject for primary depth cues.
3. Is the rule supported strongly, conditional, or merely experimental? Label it correctly.
4. Does the interface still work if chromostereopsis is weak or inverted? It must.
5. Does the effect increase fatigue or hurt reading? If yes, reduce or localize it.
