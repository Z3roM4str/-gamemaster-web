# Detailed Chromostereopsis Research Notes — Corrected Implementation Reading

This file preserves the implementation-relevant substance of the owner's supplied chromostereopsis research so Codex can reason from it without needing the original PDFs.

## Critical interpretation rule

The research distinguishes chromostereopsis from an anaglyph. **Do not translate the research into red/blue duplicate offsets.**

A traditional anaglyph creates stereo disparity from two displaced image channels. Chromostereopsis can arise from a **single 2D image** containing spectrally separated color regions, especially red and blue, because of binocular ocular chromatic aberration and related observer-dependent factors.

For GameMaster, the safe translation is:

- one geometry per object;
- distinct red, blue and neutral regions;
- crisp color boundaries;
- red often used as a focal/front plane;
- blue often used as a structural/rear plane;
- black/near-black used as neutral space;
- no red/blue ghost copies of the same text, icon, border, image or card.

See `docs/CODEX_VISUAL_GUARDRAILS.md` for implementation rules.

## 1. Core mechanism

The research frames chromostereopsis as a binocular depth phenomenon in which different colors—especially red and blue—can produce different retinal positions because of ocular chromatic aberration. The principal mechanism discussed is transverse chromatic aberration (TCA), modulated by pupil position and the Stiles–Crawford effect.

Important implications:

- binocular viewing is central to the phenomenon;
- red and blue are commonly used because they are spectrally far apart;
- pupil position can affect which color appears nearer;
- a minority of observers may see an inverted result;
- luminance and adaptation can alter magnitude and direction;
- display spectral output matters, so hex values alone are not a physical guarantee.

## 2. Evidence hierarchy and uncertainty

The research distinguishes stronger evidence from inference/hypothesis. Codex must not flatten all recommendations into “scientific facts”.

### Relatively strong / repeatedly supported

- red/blue separation is an effective chromostereoscopic pair;
- the phenomenon is binocular;
- pupil geometry and TCA affect direction/magnitude;
- luminance/adaptation matter;
- observer-to-observer variability is real;
- crisp, separate color regions are useful for isolating the chromatic cue.

### More conditional / not universal

- black is always the best background;
- maximum saturation always maximizes perceived depth;
- one universal optimal line thickness;
- one universal optimal spatial frequency;
- periodic repetition always strengthens the effect;
- any one visual style such as Op Art is intrinsically “the best”.

The later research explicitly warns against treating these as absolute rules.

## 3. Parameter map from the research

### Spectral separation

Research direction: wide spectral separation between red and blue is a strong starting point.

Status for web design: **FIXED DIRECTION / TUNABLE VALUES**

Implementation:

- keep red and blue clearly separated;
- use them in different real regions of the composition;
- tune digital colors for the actual display context;
- never claim a particular hex pair is universally optimal.

### Chromaticity / saturation

Research direction: highly saturated colors are common in successful stimuli, but the exact saturation-vs-depth curve is not firmly established.

Status: **RANGE / TEST**

Implementation:

- start vivid in focal art;
- reduce saturation/density in long-reading or fatigue-prone areas;
- test hero vs card strengths separately.

### Luminance

Research direction: luminance can materially alter perceived depth and may even invert it under some conditions. Equiluminance can be useful experimentally to isolate chromatic mechanisms but is not automatically the strongest artistic configuration.

Status: **RANGE / TEST**

Implementation:

- do not assume equal CSS lightness means perceptual equiluminance;
- keep body text neutral;
- vary chromatic accents deliberately rather than blindly maximizing brightness.

### Background luminance

Research direction: dark backgrounds often make the effect visually strong, but “black always wins” is too absolute. Gray/neutral backgrounds are useful in controlled benchmarks.

Status: **RANGE**

Implementation:

- GameMaster may use near-black as the brand base;
- use slightly lighter neutral surfaces for legibility and fatigue control;
- test very dark vs dark-gray modules rather than forcing pure black everywhere.

### Border / edge quality

Research direction: crisp chromatic boundaries are useful; blur and antialiasing can weaken separation in fine structures.

Status: **STRONGLY PREFERRED FOR ART DIRECTION**

Correct implementation:

- favor hard boundaries between genuinely different red/blue regions;
- favor solid planes, vector lines and posterized shapes;
- avoid soft RGB glow as the default treatment;
- do **not** interpret “hard edge” as permission to put red and blue offset copies around the same contour.

### Spatial frequency / density

Research direction: exact optimum is not established. Very fine patterns may become noisy or fatiguing; very broad fields may provide fewer boundaries.

Status: **TEST**

Implementation:

- use medium-scale structural motifs;
- reduce density on mobile;
- never place dense chromatic vibration behind body copy.

### Orientation

Research explores whether vertical boundaries may translate chromatic displacement into effective binocular disparity more directly than other orientations, but this remains an implementation hypothesis rather than a universal aesthetic rule.

Status: **TEST**

Implementation:

- vertical red/blue region boundaries are a valid experiment;
- compare with curved/topographic, horizontal and diagonal structures;
- the two colors should still occupy separate regions rather than duplicate one boundary as ghost outlines.

### Repetition / regularity

Research notes repeated geometric patterns as promising but not conclusively proven to increase the effect.

Status: **TEST**

Implementation:

- useful for identity, rhythm and multiple chromatic boundaries;
- do not assume denser repetition = better;
- alternate actual cells/modules rather than cloning the same module in two offset colors.

### Antialiasing / blur

Research direction: hard edges are favored for controlled stimuli; blur can dilute boundaries.

Status: **PREFER HARD / TEST SOFT**

Implementation:

- CSS borders, SVG lines and posterized shapes are preferred;
- if raster artwork uses halftone, preserve crisp color separation;
- avoid red/blue blur halos and chromatic-aberration effects.

### Display / medium

Research direction: OLED/LCD/SPD/gamut/calibration can change actual output.

Status: **UNCONTROLLED IN PUBLIC WEB**

Implementation:

- design robustly for consumer displays;
- do not promise laboratory reproducibility;
- use color as a branded depth cue, with conventional layout hierarchy underneath.

### Viewing distance and observer

Research recommends controlled distances in experiments, but a public website cannot enforce this. Observer IPD, pupil position, vision correction and binocular function vary.

Status: **UNCONTROLLED**

Implementation:

- design must remain understandable without the effect;
- never require users to perceive chromostereopsis to navigate.

## 4. Experimental benchmark described in the research

The research proposes a deliberately simple reference stimulus roughly consisting of:

- neutral gray or controlled background;
- adjacent large red and blue rectangles/regions;
- matched or known luminance for controlled testing;
- hard shared boundary;
- no textures, gradients or pictorial depth cues;
- controlled viewing distance and display calibration.

This is important because it demonstrates the intended logic: **adjacent color regions in one image**, not two displaced copies of an image.

A future internal `/lab` page could reproduce simplified variants to tune GameMaster's web palette, region size, density and background luminance subjectively.

## 5. Visual language candidates identified by the research

### Geometric / Op-art structures

Strengths:

- crisp boundaries;
- easy repetition;
- strong planar separation.

Risks:

- can feel generic or fatiguing if overused.

### Technical/vector diagrams

Strengths:

- excellent control;
- scalable;
- naturally compatible with Gaming/IA/technology;
- works in SVG and CSS.

Risks:

- can look like a blueprint rather than an entertainment brand if too literal.

### Halftone / engraving

Strengths:

- strong identity;
- compatible with supplied references;
- can bridge figurative art and limited palette.

Risks:

- fine patterns can become noisy on phones;
- raster assets need careful compression.

### Topographic/cartographic lines

Strengths:

- natural layering metaphor;
- elegant and procedural;
- can scale from abstract background to category identity.

Risks:

- dense contours can reduce legibility.

### Polygonal / tessellation systems

Strengths:

- modular and generative;
- supports red/blue region encoding;
- useful for dynamic placeholders.

Risks:

- easy to become decorative without clear purpose.

### Flow fields / generative lines

Strengths:

- distinctive and dynamic;
- strong AI/technology association;
- procedural generation is feasible.

Risks:

- uncontrolled curves may create visual noise;
- must be simplified on mobile.

### Circuit / network diagrams

Strengths:

- aligns with the business's digital/AI identity;
- easy to render as crisp SVG;
- good for subtle background structure.

Risks:

- overuse becomes cliché cyberpunk.

### Modular symbols / typography

Strengths:

- could become an ownable identity independent of color;
- useful for category glyphs, navigation and procedural covers.

Risks:

- needs a consistent grammar, not random symbols.

## 6. Reference-image reading

The owner's supplied visual references are especially useful because they demonstrate **plane hierarchy without duplicated stereo contours**.

Recurring patterns include:

- red engraved/halftone figure against blue repeating geometric structure;
- blue technical/halftone portrait with one solid red vertical bar;
- red architectural/ornamental frame around a blue/black scene;
- mostly blue field with one small red object as a focal/front plane;
- strong black negative space separating red and blue systems.

These should be treated as compositional precedents, not copied literally.

## 7. Production pipeline implied by the research

A high-control asset workflow is:

1. define structural composition;
2. generate or draw geometry;
3. vectorize/clean if necessary;
4. segment the geometry into distinct red/blue/neutral regions;
5. remap colors into the restricted palette;
6. preserve hard boundaries;
7. check relative area of red/blue/neutral;
8. export losslessly where practical;
9. test on phone and desktop;
10. evaluate comfort/readability;
11. confirm no duplicated red/blue geometry was introduced;
12. iterate.

For AI-generated imagery, the research favors using AI for structure and deterministic post-processing for color/edges rather than trusting unconstrained generation to preserve exact color relationships.

## 8. Comfort and fatigue

The research explicitly notes possible visual fatigue from dense saturated red/blue combinations.

GameMaster guardrails:

- strongest chromatic effects only in focal zones;
- neutral reading surfaces;
- pauses/negative space between dense modules;
- reduced chromatic density on mobile;
- no rapid flashing;
- no continuous oscillating red/blue animation;
- provide reduced-motion behavior.

## 9. Observer variability

A key limitation is that not every observer sees the same depth direction. Some may perceive blue nearer than red, and some may perceive little or no effect.

Therefore:

- the site's semantic hierarchy must exist through layout, size and spacing too;
- red/blue depth is an enhancement, not a dependency;
- marketing copy should not claim “everyone sees 3D”.

## 10. Practical GameMaster strategy

Use near-black as the dominant canvas, off-white for text, and red/blue for selected planar structures.

A practical starting distribution is mostly neutral/dark space with smaller red and blue regions. Exact percentages are an art-direction variable, not a research-proven optimum.

Best first modules:

- hero with a blue structural rear field and an independent red focal mass;
- procedural game placeholders with segmented red/blue geometry;
- technical line accents around content rails;
- one category-specific motif per universe;
- sparse chromatic section separators.

## 11. What to test next inside the product

Create controlled variants for:

- black vs dark-gray card surfaces;
- sparse vs medium red area;
- sparse vs medium blue structural density;
- low vs medium pattern density;
- circuit vs topographic vs halftone hero background;
- saturated vs slightly reduced red/blue on long pages;
- vertical vs curved shared color boundaries;
- mobile simplified vs full desktop art.

Collect subjective feedback on:

- depth perceived;
- attractiveness;
- professionalism;
- reading comfort;
- brand memorability;
- whether the page ever reads as an anaglyph or RGB glitch.

## Final implementation rule

When translating research into UI, **color-region separation is allowed; cloned chromatic offset is not**. If a technique creates a second displaced copy of the same semantic object, it is outside the intended GameMaster chromostereopsis system.