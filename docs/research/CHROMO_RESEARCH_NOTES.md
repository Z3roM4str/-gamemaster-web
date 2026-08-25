# Detailed Chromostereopsis Research Notes

This file preserves the implementation-relevant substance of the owner's supplied chromostereopsis research so Codex can reason from it without needing the original PDFs.

## 1. Core mechanism

The research frames chromostereopsis as a binocular depth phenomenon in which different colors—especially red and blue—produce different retinal positions because of ocular chromatic aberration. The principal mechanism discussed is transverse chromatic aberration (TCA), modulated by pupil position and the Stiles–Crawford effect.

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
- the effect is binocular;
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
- tune digital colors for the actual display context;
- never claim a particular hex pair is universally optimal.

### Chromaticity / saturation

Research direction: highly saturated colors are common in successful stimuli, but the exact saturation-vs-depth curve is not firmly established.

Status: **RANGE / TEST**

Implementation:

- start vivid;
- reduce saturation in long-reading or fatigue-prone areas;
- test hero vs card strengths separately.

### Luminance

Research direction: luminance can materially alter perceived depth and may even invert it under some conditions. Equiluminance is useful experimentally to isolate chromatic mechanisms but is not automatically the strongest artistic configuration.

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

Implementation:

- favor hard red/blue offsets and solid planes;
- avoid soft RGB glow as the default treatment;
- use blur only for neutral atmospheric layers, not primary chromatic edges.

### Spatial frequency / density

Research direction: exact optimum is not established. Very fine patterns may become noisy or fatiguing; very broad fields may produce less repeated boundary information.

Status: **TEST**

Implementation:

- use medium-scale structural motifs;
- reduce density on mobile;
- never place dense chromatic vibration behind body copy.

### Orientation

Research explores the idea that vertical edges may convert horizontal chromatic displacement into effective binocular disparity more directly than other orientations, but this should be treated as an implementation hypothesis rather than a universal aesthetic rule.

Status: **TEST**

Implementation:

- vertical red/blue framing is a good starting motif;
- compare with diagonal/topographic/curved systems.

### Repetition / regularity

Research notes repeated geometric patterns as promising but not conclusively proven to increase the effect.

Status: **TEST**

Implementation:

- useful for identity, rhythm and multiple chromatic boundaries;
- do not assume denser repetition = better.

### Antialiasing / blur

Research direction: hard edges are favored for controlled stimuli; blur can dilute boundaries.

Status: **PREFER HARD / TEST SOFT**

Implementation:

- CSS borders, SVG lines and posterized shapes are preferred;
- if raster artwork uses halftone, preserve crisp color separation.

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
- never require users to “see” chromostereopsis to navigate.

## 4. Experimental benchmark described in the research

The research proposes a deliberately simple reference stimulus roughly consisting of:

- neutral gray background;
- adjacent large red and blue rectangles;
- matched or known luminance;
- hard central boundary;
- no textures, gradients or pictorial depth cues;
- controlled viewing distance and display calibration.

This benchmark is useful as a test harness, not as a finished website design.

A future internal `/lab` page could reproduce simplified variants to tune GameMaster's web palette and offsets subjectively.

## 5. Visual language candidates identified by the research

The reports explore many structural families. Particularly relevant to GameMaster:

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
- compatible with the supplied reference images;
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
- supports red/blue plane encoding;
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

- could become a truly ownable identity independent of color;
- useful for category glyphs, navigation and procedural covers.

Risks:

- needs a consistent grammar, not random symbols.

## 6. White-space opportunities from the research

Promising less-obvious areas include:

- non-periodic tessellations;
- organic fractal systems;
- scientific diagrams reinterpreted as art;
- architecture/parametric grids;
- modular cultural ornament interpreted abstractly;
- imaginary maps;
- symbolic alphabets;
- reaction-diffusion / cellular structures;
- hybrids such as fractal + circuit, map + L-system, tessellation + ornament.

Codex should explore one family at a time and measure whether it improves the brand, rather than combining all of them in one page.

## 7. Production pipeline implied by the research

A high-control asset workflow is:

1. define structural composition;
2. generate or draw geometry;
3. vectorize/clean if necessary;
4. remap into a restricted palette;
5. preserve hard boundaries;
6. check relative area of red/blue/neutral;
7. export losslessly where practical;
8. test on phone and desktop;
9. evaluate comfort/readability;
10. iterate.

For AI-generated imagery, the research strongly favors using AI for structure and then deterministic post-processing for color/edges rather than trusting unconstrained generation to preserve the exact palette.

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

- the site's semantic depth hierarchy must exist through layout, size and spacing too;
- red/blue depth is an enhancement, not a dependency;
- marketing copy should not claim “everyone sees 3D”.

## 10. Practical GameMaster v1 strategy

Use near-black as the dominant canvas, off-white for text, and red/blue for selected planar structures.

Recommended distribution:

- 70–85% neutral/dark space;
- 5–15% red;
- 5–15% blue;

This ratio is an art-direction starting point, not a research-proven optimum.

Best first modules:

- hero with a neutral content plane between red and blue offset planes;
- procedural game placeholders with red/blue geometry;
- technical line accents around content rails;
- one category-specific motif per universe;
- sparse chromatic section separators.

## 11. What to test next inside the product

Create controlled A/B variants for:

- black vs dark-gray card surfaces;
- 1px / 2px / 3px / 5px red-blue offsets;
- low vs medium pattern density;
- circuit vs topographic vs halftone hero background;
- saturated vs slightly reduced red/blue on long pages;
- mobile simplified vs full desktop art.

Collect subjective feedback on:

- depth perceived;
- attractiveness;
- professionalism;
- reading comfort;
- brand memorability.
