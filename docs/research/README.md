# GameMaster Chromostereopsis Research Library

This folder is the research layer behind the GameMaster visual system. It exists so Codex can distinguish **source-derived findings**, **later corrections/audits**, **implementation decisions**, and **open hypotheses** instead of flattening everything into a generic red/blue 3D effect.

## Mandatory interpretation rule

Chromostereopsis is **not** anaglyph stereoscopy. The source set describes binocular depth induced by chromatic relationships in a single 2D stimulus. Do not implement the phenomenon by duplicating the same object in red/cyan or red/blue with positional offsets.

The project-level anti-anaglyph rule in `../CODEX_VISUAL_GUARDRAILS.md` is mandatory for implementation.

## Research sources supplied by the owner

### Source A — `Investigación y Especificación Visual de la Cromostereopsis.pdf`

Role: broad technical specification and evidence map.

Major sections include:

- audit of prior claims;
- source × variable × result evidence matrix;
- parameter map;
- interaction matrix;
- Visual Chromostereopsis Specification v1.0;
- benchmark stimulus;
- screening and optimization experiments;
- display and print specifications;
- procedural-generator schema;
- AI + deterministic post-processing pipeline;
- uncertainty map and final gates.

Repository companion: `SOURCE_A_INVESTIGACION_ESPECIFICACION.md`.

### Source B — `Lenguajes visuales para explotar la cromoestereopsis.pdf`

Role: visual-language exploration grounded in the perceptual phenomenon.

Major sections include:

- mechanism and state of evidence;
- perceptual-variable matrix;
- design specification;
- reference-image audit;
- visual-language search beyond pixel art;
- finalists and hybrid systems;
- display vs print considerations;
- observer variability and visual fatigue;
- experimental protocol;
- AI generation and production pipeline;
- identity-system considerations.

Repository companion: `SOURCE_B_LENGUAJES_VISUALES.md`.

### Source C — `1. Auditoría del informe anterior.pdf`

Role: explicit audit/correction of earlier operational claims.

Major sections include:

- claim-by-claim audit;
- Perceptual Constraint Set v2;
- morphological design space;
- candidate systems;
- white-space territories;
- decisive answers and recommendations.

Repository companion: `SOURCE_C_AUDITORIA.md`.

## Precedence when the sources disagree

Do **not** silently merge contradictory claims.

Use this order:

1. Direct/strong evidence explicitly identified in the source set.
2. Later audit/correction when it directly revises an earlier operational recommendation.
3. Earlier design exploration as hypothesis/context, not as upgraded fact.
4. GameMaster implementation rules, which may choose a pragmatic design default without claiming scientific universality.

Example: the source set contains differing treatments of black background, saturation and equiluminance. Codex must preserve that uncertainty. A brand choice such as a near-black canvas is an **implementation decision**, not proof that black is universally optimal.

## Files Codex should use

- `EVIDENCE_MAP.md` — what the sources support strongly vs conditionally vs experimentally.
- `IMPLEMENTATION_RULES.md` — translation from research to web decisions.
- `CHROMO_RESEARCH_NOTES.md` — existing deeper implementation-oriented synthesis.
- `SOURCE_A_INVESTIGACION_ESPECIFICACION.md` — source-derived map of Source A.
- `SOURCE_B_LENGUAJES_VISUALES.md` — source-derived map of Source B.
- `SOURCE_C_AUDITORIA.md` — source-derived map of Source C.
- `PDF_MANIFEST.md` — original file names and SHA-256 identifiers.

## What Codex must never do with this research

- turn “red + blue” into red/cyan ghost copies;
- treat a CSS RGB-split filter as chromostereopsis;
- claim every viewer will perceive red in front;
- claim one hex pair is scientifically optimal on every display;
- convert hypotheses about repetition, density, line width, spatial frequency or artistic style into facts;
- use visual effects that break usability merely to maximize chromatic intensity;
- present GameMaster as a laboratory-calibrated perceptual experiment.

## Product objective

Use the research to create an ownable premium entertainment interface in which red, blue and neutral areas act as **distinct real regions of a single composition**. The visual system must remain coherent, legible and commercially useful even for users who perceive weak, inverted or no chromostereoscopic depth.