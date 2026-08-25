# Source A — Investigación y Especificación Visual de la Cromostereopsis

Source-derived companion to the owner-supplied 20-page PDF `Investigación y Especificación Visual de la Cromostereopsis.pdf`.

This file is a **structured map**, not a replacement for the source's epistemic distinctions. Where the source labels a claim direct, inferential, hypothetical, unknown or conditional, Codex must preserve that status.

## 1. Research purpose

The report examines chromostereopsis as a phenomenon in which colored 2D stimuli, commonly red and blue, can produce apparent depth. It audits earlier claims, isolates confounds, models optical factors, proposes operational color/display parameters and defines experiments and a practical framework.

A central methodological feature is the separation of evidence into direct, supportive/inferential, hypothetical/unknown and confidence levels.

## 2. Audit findings from the report

The report explicitly rejects simplistic absolutes.

### Binocular requirement

The source treats chromostereopsis as fundamentally binocular and cites evidence that the effect largely disappears monocularly.

**Implementation implication:** never describe the site effect as ordinary pictorial 3D or as an anaglyph system requiring two displaced images.

### TCA is important but not the only factor

The report treats transverse chromatic aberration (TCA) as a major mechanism but adds pupil position and the Stiles–Crawford effect as relevant contributors.

**Implementation implication:** do not reduce the mechanism to a single CSS metaphor or claim that one palette universally determines depth direction.

### Spectral separation

Large red/blue spectral separation is treated as an important starting condition, but the report warns against assuming a universally monotonic “more separation always means more depth” curve.

### Saturation

The report specifically marks “maximum saturation always gives maximum effect” as insufficiently established in the audited evidence. High saturation remains a plausible/strong practical starting point, but the exact curve is not established.

### Background

The report cautions against “black always maximizes chromostereopsis” as an absolute. Dark backgrounds can increase contrast, but adaptation and pupil behavior complicate the relationship.

### Direction of depth

The report states that many observers see red forward / blue rearward under typical conditions, but some observers experience the opposite direction because of pupil geometry and related factors.

**Implementation implication:** GameMaster may use red as the intended focal/front brand plane and blue as the intended rear/structural plane, but navigation and semantic hierarchy cannot depend on viewers seeing that direction.

### Repetition

The report treats the idea that tiling/repetition automatically strengthens the effect as unproven and recommends testing rather than assuming it.

## 3. Evidence matrix — variables emphasized by the source

### Stronger / more directly supported in the report

- binocular vs monocular viewing;
- TCA / pupil displacement and depth direction;
- luminance and adaptation effects;
- observer variability;
- display spectral output as a real physical factor.

### Less directly established / proposed for testing

- exact saturation-response curve;
- exact optimal angular size;
- exact spatial frequency optimum;
- orientation dependence beyond plausible optical geometry;
- edge density;
- repetition/regularity;
- anti-aliasing threshold;
- texture effects.

## 4. Parameter map from the report

The source proposes a FIXED / RANGE / TEST treatment of variables rather than pretending all values are known.

### Spectral separation

- operationalized as wavelength or chromaticity separation;
- red roughly in the long-wavelength region and blue in the short-wavelength region are used as reference conditions;
- status: range/tunable rather than one universal digital hex pair.

### Chromaticity

- saturated red and blue are practical reference conditions;
- actual CIE coordinates / display SPD matter more scientifically than CSS hex alone.

### Luminance

- absolute and relative red/blue luminance materially affect perception;
- very low luminance may alter or invert the effect in some conditions;
- status: range/test.

### Background contrast

- dark/high-contrast backgrounds are useful test conditions;
- neutral gray is also important because it separates contrast effects from “blackness” as a supposed universal optimum.

### Angular size, edge width and spatial frequency

- the report proposes ranges for controlled experiments;
- it does not establish one universal web pixel thickness;
- very fine edges may weaken or destabilize the cue;
- spatial frequency is explicitly a TEST variable.

### Orientation

- vertical edges are presented as a useful starting hypothesis because horizontal retinal displacement may convert more directly into binocular disparity;
- not a universal style rule.

### Gap / adjacency

- direct red/blue adjacency is a useful test configuration;
- increasing gaps may weaken local chromatic correspondence;
- treated as a variable to explore.

### Anti-aliasing / blur

- hard boundaries are preferred in controlled stimuli;
- blur is expected to weaken chromatic boundary definition;
- exact threshold is not established.

### Display and viewing conditions

- display type, gamut, spectral power distribution, gamma, pixel structure, distance and ambient illumination matter;
- public web deployment cannot control these fully.

## 5. Interaction matrix emphasized by the report

The report treats interactions as important rather than optimizing each variable independently.

Key examples:

- luminance × chromaticity;
- luminance × adaptation / ambient light;
- chromaticity × display SPD;
- spatial frequency × anti-aliasing;
- angular size × viewing distance;
- orientation × TCA direction;
- pupil position/size × color contrast.

**GameMaster consequence:** design tokens should be globally tunable. Do not hard-code one visual treatment throughout the entire interface and label it “scientifically optimal”.

## 6. Visual Chromostereopsis Specification v1.0 in the source

The report proposes an initial controlled-stimulus profile using:

- precisely defined color spaces rather than relying only on hex;
- red and blue reference primaries;
- known/fixed luminance conditions;
- neutral/dark background variants;
- high chromatic contrast;
- relatively large, clear elements;
- crisp boundaries;
- controlled spatial frequency;
- simple bars/grids before complex art;
- controlled viewing distance and ambient illumination;
- calibrated display when scientific reproducibility is required.

The report explicitly distinguishes this scientific-isolation profile from a later **artistic-depth** variant, where some controls can be relaxed for aesthetics.

GameMaster belongs to the artistic-depth category, not the laboratory-isolation category.

## 7. Benchmark stimulus

The source proposes a simple reference stimulus with large adjacent red/blue regions on a neutral background, controlled luminance and hard boundaries, without texture, gradient or pictorial depth cues.

**Important:** this benchmark is a test harness. It is not a recommendation that the production website should look like two rectangles.

## 8. Experimental program in the source

### Screening

Candidate factors include:

- red/blue relative luminance;
- spatial frequency;
- element thickness;
- region size;
- chromatic-edge density;
- red:blue:background area ratio;
- repetition/regularity;
- orientation;
- contact vs gap;
- anti-aliasing;
- background level;
- display type.

Suggested responses include perceived depth magnitude/direction, confidence, clarity and discomfort.

### Optimization

The report proposes response-surface or adaptive/Bayesian optimization after screening identifies the dominant factors.

It distinguishes two optimization goals:

- maximize isolated chromostereoscopic signal;
- maximize overall artistic depth while maintaining comfort.

GameMaster should prioritize the second.

## 9. Display specification

For rigorous reproduction the source calls for recording or controlling:

- display model/mode;
- gamut and SPD;
- luminance;
- transfer/gamma;
- resolution/PPI;
- subpixel structure;
- scaling/anti-aliasing;
- chroma subsampling;
- color management / ICC;
- SDR/HDR mode;
- calibration targets.

**Public-web limitation:** GameMaster cannot enforce a calibrated display, so the interface must remain usable without a guaranteed perceptual effect.

## 10. Print specification

The report treats print as a separate medium with different colorimetry, reflectance, illuminant and gamut constraints. Web CSS values do not transfer directly to print.

This matters if GameMaster later produces posters, flyers, cards or packaging: create a separate print profile instead of exporting browser colors blindly.

## 11. Procedural-generator schema

The source proposes storing stimulus/design parameters separately for:

- color and luminance;
- geometry and pattern;
- area and edge density;
- texture/anti-aliasing;
- display/preparation;
- environment/observer metadata.

For the website, this supports a future procedural-art token system rather than ad hoc one-off CSS.

## 12. AI + deterministic post-processing pipeline

The report strongly favors a staged workflow:

1. AI creates structural composition rather than final uncontrolled color output.
2. Segment/vectorize shapes.
3. Clean geometry.
4. Assign calibrated/restricted palette deterministically.
5. Control luminance where relevant.
6. Enforce edge behavior.
7. Validate spatial/color properties.
8. Export without destructive compression.

**Critical GameMaster rule:** AI-generated imagery must not be trusted to preserve exact chromatic separation by itself. Structure can be generative; palette/edges should be normalized where chromostereoscopic behavior matters.

## 13. Ranked experiments from the source

High-value unresolved questions include:

1. luminance × chromaticity;
2. spatial frequency optimum;
3. pupil/adaptation / ambient illumination;
4. saturation vs signal;
5. edge orientation.

These are research questions, not settled design laws.

## 14. Uncertainty map

### The report treats as known / relatively strong

- chromostereopsis exists with strong chromatic separation;
- binocular viewing is central;
- pupil geometry can change direction;
- luminance can modulate magnitude/direction;
- observer variability is substantial.

### The report treats as probable / indirect

- greater spectral separation is generally useful up to practical/physiological limits;
- high saturation and dark contrast are often favorable;
- some edge/spatial-frequency choices may be better than others.

### The report treats as not demonstrated / unknown

- “black is always best”;
- a universal `#FF0000 / #0000FF` optimum;
- one fixed ideal red:blue ratio;
- exact saturation curve;
- exact texture/frequency thresholds;
- typography-specific behavior.

## 15. Final decision gates

The source concludes that controlled artistic experimentation can begin, but with conditions. It describes:

- mechanism: sufficient to proceed;
- sensitivity/parameter tuning: conditional;
- benchmark: available;
- metrics: available;
- rendering: conditional and should be validated;
- observer variability: conditional;
- uncalibrated medium: a major limitation;
- artistic transfer: conditional and still experimental.

## 16. Direct implications for GameMaster

Use this source to justify:

- strong but selective red/blue separation;
- crisp real color regions;
- neutral/dark space;
- tunable tokens instead of one immutable palette claim;
- mobile density reduction;
- comfort constraints;
- accessible semantic hierarchy independent of color depth;
- experimental modules and A/B comparison.

Do **not** use this source to justify:

- duplicated red/blue geometry;
- red/cyan anaglyph ghosting;
- RGB split/glitch;
- universal depth claims;
- arbitrary huge blur or chromatic aberration;
- claiming a particular CSS pixel offset creates chromostereopsis.
