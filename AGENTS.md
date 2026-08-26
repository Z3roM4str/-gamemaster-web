# AGENTS.md — GameMaster

## Mission

GameMaster is **not only a website project**.

The mission is to build and improve the best possible **business system** for GameMaster: customer-facing website, catalog, marketing, sales support, content production, lead handling, customer communication, internal tools, analytics, automations and integrations that help the business **sell more, reduce repetitive work, improve trust and scale reliably**.

The website in this repository is one important part of that wider system, not the whole project.

Read `docs/PROJECT_SCOPE.md` before making project-wide decisions.

## Maximum-capability rule

Always use the **best combination of available capabilities, tools and integrations** when they materially improve the outcome.

Do not artificially limit a solution to one tool or medium. Depending on the task, use or combine as appropriate:

- reasoning and planning;
- web research;
- connected apps/plugins;
- GitHub;
- Codex/code;
- Work or other workspace/artifact capabilities when available;
- Image Gen;
- procedural graphics / SVG / CSS;
- automation and scheduling tools;
- data analysis;
- other available integrations.

The objective is **the best practical result for GameMaster**, not demonstrating a particular technology.

If a hybrid solution is better, use it. Example: Image Gen can create high-quality art layers while code handles responsive layout, parallax, interaction and performance.

Do not default to SVG/CSS merely because it is easy to generate. Do not default to Image Gen when procedural/code art is clearly better. Choose the strongest combination.

## Business-first operating rule

For each task, consider whether the best improvement belongs to:

- the website;
- customer acquisition;
- publication/image/copy production;
- lead capture and follow-up;
- WhatsApp/customer-service workflows;
- catalog maintenance;
- price/availability workflows;
- analytics and conversion measurement;
- repetitive administrative work;
- scheduled or conditional automations;
- internal tools;
- integrations between systems.

Do not assume every GameMaster problem is a website change.

Proactively notice high-value opportunities to reduce manual work, prevent errors, improve conversion, improve trust or make future growth easier. Preserve working functionality and avoid unrelated complexity.

## Communication with the owner

The owner is not expected to be technical.

When explaining or asking anything:

- use plain Spanish;
- be brief by default;
- explain the result/business impact before technical implementation details;
- avoid jargon unless necessary;
- if a technical term is necessary, explain it simply;
- ask only when the answer is genuinely needed;
- keep questions short and easy to answer;
- do not make the owner choose between technical options that can be decided safely by the implementation agent.

If a reasonable professional default can be chosen without changing a business rule, choose it and continue.

## Current website mission

Build the best possible commercial website for GameMaster: a premium digital catalog for Gaming, Streaming and AI memberships/services, with a distinctive chromostereoscopic visual identity.

Do not reduce the site to a generic landing page. The product should feel like a real entertainment catalog: discovery-first, visual, fast, navigable, credible and optimized for conversion.

The site should also be structured so future automation, analytics, quote flows and integrations can connect to it without a rebuild.

## Current art-direction target

The current target is **STYLITES × Game Pass × Netflix**, interpreted as follows:

- **Game Pass** → catalog architecture, categories, rails, game-first discovery;
- **Netflix** → cinematic hierarchy, immediate browsing familiarity and content-led navigation;
- **STYLITES** (`https://www.mek.gallery/releases/stylites`) → page-scale graphic composition, bold chromatic planes, motion/parallax ideas and stronger exploitation of chromostereoscopic depth;
- **GameMaster research** → the perceptual constraints and anti-anaglyph rules.

Do not clone any of those products/sites. GameMaster must remain its own brand.

The next visual iteration should be treated as a **composition rebuild**, not a cosmetic recolor of the current UI. Preserve working commercial/catalog functionality while rebuilding page-scale visual structure where necessary.

## Highest-priority visual rule

**GameMaster uses chromostereopsis, NOT anaglyph stereoscopy, NOT RGB split and NOT a chromatic-aberration/glitch effect.**

Never duplicate the same text, icon, logo, border, card or image in red/blue or red/cyan with lateral offsets to simulate depth. Never use paired red/blue shadows as the primary depth device.

Depth must come from a **single 2D composition containing distinct red, blue and neutral geometric regions**. Red can operate as a foreground/focal plane, blue as a rear/structural plane and black/near-black as a neutral plane, but those planes must be materially different visual elements rather than colored copies of the same contour.

If any older repository wording conflicts with `docs/CODEX_VISUAL_GUARDRAILS.md`, the guardrail file wins.

## Image Gen + layered web art

Do **not** depend only on SVG/CSS for the main artistic identity when that produces a rigid, generic or lower-quality result.

Image Gen may and should be used when it improves the artistic quality of:

- blue rear/background worlds;
- transparent or isolated red foreground overlays;
- hero artwork;
- section-transition artwork;
- technical/gaming decorative layers;
- desktop/mobile-specific art assets.

Image Gen should create **art layers/assets**, not replace the whole functional page with a flat screenshot.

Preferred hybrid model:

1. black/near-black neutral base;
2. blue rear artistic layer;
3. optional blue intermediate structure;
4. red foreground/focal layer;
5. real functional UI/content on top or integrated into the composition.

Use PNG/WebP or transparency where useful. Generate separate desktop/mobile assets when needed rather than forcing one crop everywhere.

Reference images supplied by the owner are **visual research only** unless the owner explicitly says to use them as page assets. Do not simply place those reference images as backgrounds.

Original game covers remain normal full-color content objects. Do not apply destructive red/blue effects to them.

## Parallax / motion rule

Use **parallax or differential motion** when it improves the page and reinforces the perception of separate planes.

Current intended relationship:

- black = neutral/base plane;
- blue = rear/background plane and generally slower movement;
- red = front/focal plane and generally more noticeable movement;
- functional catalog/content = stable or minimally moving so usability remains strong.

Strong parallax candidates:

- hero;
- page-scale background art;
- editorial transitions;
- large section headers;
- universe visual fields;
- red foreground interventions around catalog movement/scroll.

Do not make the catalog itself difficult to browse. Motion should be subtle, premium and purposeful.

Forbidden motion/look:

- jitter;
- glitch;
- RGB separation;
- oscillating red/blue duplicates;
- movement that causes nausea, reading difficulty or accidental taps.

Respect `prefers-reduced-motion`. Mobile should use a lighter, specifically recomposed version rather than desktop motion copied wholesale.

## Mandatory read order before changing code

Read in this order:

1. `docs/PROJECT_SCOPE.md`
2. `docs/CODEX_VISUAL_GUARDRAILS.md`
3. `docs/DESIGN_DIRECTION_STYLITES.md`
4. `docs/research/README.md`
5. `docs/research/EVIDENCE_MAP.md`
6. `docs/research/IMPLEMENTATION_RULES.md`
7. `docs/PRODUCT_VISION.md`
8. `docs/BUSINESS_RULES.md`
9. `docs/CHROMOSTEREOPSIS.md`
10. `docs/VISUAL_SYSTEM.md`
11. `docs/REFERENCE_IMAGES.md`
12. `data/catalog.ts`

For deeper visual/perceptual reasoning, also read:

- `docs/research/SOURCE_A_INVESTIGACION_ESPECIFICACION.md`
- `docs/research/SOURCE_B_LENGUAJES_VISUALES.md`
- `docs/research/SOURCE_C_AUDITORIA.md`
- `docs/research/CHROMO_RESEARCH_NOTES.md`
- `docs/research/PDF_MANIFEST.md`

Treat these files as the source of truth unless the user explicitly changes a business rule or visual direction.

## Research precedence

Do not silently reconcile contradictions in the research.

When sources differ:

1. preserve direct/strong evidence as strong;
2. use later audit/correction when it explicitly revises an earlier operational statement;
3. keep unresolved items labeled as hypotheses/tests;
4. distinguish GameMaster product decisions from scientific claims.

Near-black background, vivid red/blue and red-forward/blue-rear are useful product defaults, but must not be presented as universal perceptual laws.

## Product principles

1. **Mobile is a first-class product.** Do not merely shrink desktop. Recompose layouts for phones.
2. **Discovery beats walls of text.** Use rails, filters, search, genres, collections and featured areas.
3. **The page is one composition.** Do not build a generic component stack and decorate it afterward. Large chromatic fields, negative space and editorial structures may span section boundaries.
4. **Black remains the neutral/base environment.** Blue is a substantial rear artistic field, red a focal foreground plane. Balance for contrast and fatigue rather than filling every section with color.
5. **Art direction must be ownable.** Use the GameMaster red/blue/black system, crisp chromatic regions, engraving/halftone ideas, technical structures, generated art layers where useful and strong negative space. Avoid generic SaaS cards.
6. **Chromostereopsis must be intentional.** Use real color-plane relationships. Never fake it with duplicated chromatic offsets.
7. **Original game cover art should remain recognizable.** Do not globally tint or split covers into red/blue; integrate them inside the chromatic architecture instead.
8. **Commercial clarity matters.** A user should understand what is sold, how it works and how to ask for a quote within seconds.
9. **Never invent price, stock, availability, promotions or included benefits.** Unknown values remain “Consultar”.
10. **Do not imply official affiliation** with Nintendo, Netflix, OpenAI, Spotify or other brands.
11. **Performance matters.** Optimize generated assets, minimize layout shift, oversized JS and unnecessary animation.
12. **Accessibility matters.** Chromatic effects are decoration, never the only carrier of information. Respect reduced motion.
13. **The page must still look premium if the viewer perceives weak, inverted or no chromostereoscopic depth.**
14. **Maximum chromatic intensity must be localized.** Hero, editorial transitions and selected states can be strong; long browsing/reading zones should be calmer.
15. **The website is part of a larger business system.** Prefer structured data, reusable flows and measurable events over one-off hacks when practical.

## Information architecture

Primary sections:

- Inicio
- Gaming
- Streaming
- IA
- Cómo funciona
- Preguntas frecuentes
- Contacto

Gaming should support:

- search by title;
- filter by category / franchise / genre;
- collections such as Switch 2, Mario, Zelda, Pokémon, RPG, Shooter, Indie, destacados;
- product detail route or modal;
- “Consultar precio” CTA.

Streaming and AI should initially use service-family cards and WhatsApp consultation until the user supplies a canonical price catalog.

## Chromostereoscopic visual grammar

### Preferred

- one geometry per object;
- solid or strongly separated red/blue regions;
- crisp boundaries;
- black/near-black negative space;
- blue technical/topographic/network structures behind independent red focal elements;
- red foreground mass against blue rear structure;
- alternating cells, modules or bars where each color occupies its own real region;
- posterized/engraved/halftone imagery with clean color segmentation;
- Image Gen artwork segmented into usable rear/front layers where quality benefits;
- neutral body text and reading surfaces;
- page-scale chromatic masses that can span multiple sections;
- original game covers placed as recognizable normal-color objects inside the composition;
- subtle differential parallax between rear blue and front red planes.

### Forbidden

- `text-shadow` generating red and blue ghost copies;
- paired red/blue `box-shadow` around one object to fake stereo depth;
- cloned pseudo-elements offset left/right in different colors;
- RGB channel split;
- chromatic-aberration filters;
- cyan ghosting;
- duplicated red/blue cards, logos, posters or typography;
- duplicated/offset game covers;
- blur halos that merge red and blue;
- transparent red/blue overlap that makes purple the main depth mechanism;
- generic cyberpunk/neon treatment presented as chromostereopsis;
- turning every section into rectangular blue/red cards;
- using user reference artwork directly as wallpaper unless explicitly authorized.

## Visual system

- Base: near-black / black neutral plane
- Front/focal chromatic plane: electric red; assertive and spatially foregrounded
- Rear/structural chromatic plane: spectral/electric blue; substantial and artistic
- Neutral text: off-white
- Hard color boundaries preferred over soft neon blur
- Build depth through different planar regions, negative space, area hierarchy, figure/background relations, scale, motion and composition
- Do not create depth by cloning the same geometry at different offsets
- Use neutral breathing space to reduce fatigue
- Preserve normal/color-accurate game artwork by default
- Use Image Gen when it creates better art than SVG/CSS alone; use code when it creates better controllable structure; combine them when strongest

## Catalog composition

The catalog should retain familiar Game Pass/Netflix browsing mechanics without becoming a literal clone.

- use horizontal rails and large cover art;
- keep interaction patterns consistent while allowing different sections to have different surrounding art composition;
- do not wrap every rail in the same container treatment;
- let blue rear structures, red foreground interventions and black apertures continue across section boundaries;
- parallax red layers may respond to page/catalog scroll as decorative foreground art, but must not obstruct browsing;
- alternate dense discovery areas with calmer breathing zones;
- avoid turning every card into a blue tile;
- let cover art carry recognition and commercial value.

## Universe visual grammars

Use these as supporting structural languages, not wallpaper:

- **Gaming:** circuits, modular grids, game-control geometry, technical glyphs, controlled halftone, tessellations
- **Streaming:** cinematic apertures, signal bands, frame systems, waveforms
- **IA:** node networks, vector fields, topology/scientific diagrams, data-flow systems

Image Gen may provide sophisticated art fields for these universes; code should retain layout, semantics and responsive control.

## Business automation principles

When implementing or proposing wider GameMaster workflows:

- automate repetitive, rule-based work first;
- keep business facts sourced and editable;
- avoid brittle automations that silently invent or overwrite commercial data;
- make failure states visible;
- preserve a human decision point for ambiguous pricing, availability or customer-specific promises;
- prefer reusable templates/data over copy-paste repetition;
- measure useful outcomes when feasible;
- do not automate spam or platform-rule evasion;
- maintain customer trust and clear communication.

Potential automation areas include publication asset variation, copy variants, catalog synchronization, lead tracking, follow-ups, customer-service assistance, reporting and recurring operational checks.

## Coding conventions

- Next.js App Router + TypeScript
- Keep catalog/content data outside visual components
- Prefer semantic HTML and CSS variables
- Components should be reusable and small enough to reason about
- No hidden magic numbers for important visual tokens: put them in CSS custom properties
- No hardcoded price claims in UI components
- Keep WhatsApp CTA centralized so contact copy can be changed once
- Name chromostereoscopic primitives by actual role (`frontPlane`, `rearGrid`, `redMarker`, `blueField`, `neutralAperture`) rather than ambiguous names such as `chromaticEdge`
- Keep page-scale art composition separable from catalog data so visual experimentation does not mutate business content
- Keep generated art assets organized and optimized, with clear desktop/mobile roles
- Prefer future-friendly structured events/data when adding lead, quote or analytics flows

## Current visual debt to remove

The existing baseline may still contain anaglyph-like implementation or over-componentized composition. Before declaring a major visual iteration complete, audit and replace at least:

- `.chromaticEdge`
- `.inverseEdge`
- `.heroAccent` red/blue `text-shadow`
- `.brandMark` paired chromatic `box-shadow`
- `.posterBlue` / `.posterRed` if they function as duplicate offset copies of one poster
- any new duplicated red/blue pseudo-elements
- repeated generic card-shell treatments that make the page feel component-stacked instead of composition-led
- flat SVG-only art where a richer Image Gen + code solution would materially improve quality

Do not preserve these merely because they already exist.

## Quality bar before finishing a website task

Run or reason through:

- `npm run lint`
- `npm run build`
- desktop width around 1440px
- phone widths around 390px and 430px
- keyboard focus states
- reduced motion
- empty search state
- very long game title wrapping
- grayscale/single-geometry sanity check: important objects must not reveal duplicated copies
- visual check: page must not resemble a red/cyan 3D-glasses demo
- fatigue check: long catalog/reading zones calmer than hero/editorial zones
- cover-art check: game covers remain recognizable and are not globally tinted/split
- continuity check: homepage feels like one visual composition, not an art hero followed by generic ecommerce rows
- asset check: generated images are optimized and correctly cropped/recomposed for desktop/mobile
- parallax check: red/blue differential motion reinforces planes without hurting usability
- research check: visual claims are traceable as strong, conditional, test/hypothesis or product decision

## Quality bar before finishing a business/automation task

Check:

- does it reduce meaningful manual work or improve sales/trust?
- are business facts sourced rather than invented?
- is the workflow understandable to a non-technical owner?
- are failure/edge cases visible?
- does it create unnecessary maintenance?
- can the process be reused instead of repeated manually?
- is there a useful way to measure whether it helps?

## Current priority backlog

### Website / brand

1. Rebuild the page-scale composition around the STYLITES × Game Pass × Netflix direction while preserving catalog/business functionality.
2. Develop a stronger layered art system using the best mix of Image Gen, procedural graphics and CSS rather than SVG-only decoration.
3. Implement purposeful parallax: blue rear plane slower, red focal plane more active, with reduced-motion/mobile variants.
4. Reconstruct the hero as the strongest chromostereoscopic editorial area with materially different red and blue geometries.
5. Integrate discovery rails into the continuous composition instead of stacking visually identical sections.
6. Simplify cards so original game cover art dominates and chromatic identity lives around/behind it.
7. Remove anaglyph-like CSS/markup and preserve the single-geometry invariant.
8. Give Gaming, Streaming and IA distinct structural/art motifs inside one shared system.
9. Recompose mobile as a vertical cinematic layout rather than scaled desktop.
10. Add/refine individual game detail pages with related titles and WhatsApp quote CTA.

### Business growth / automation

1. Map the current sales workflow from customer discovery to quote, payment, delivery and follow-up.
2. Identify repetitive publication/image/copy work that can be automated safely.
3. Create reusable variation workflows for marketing assets and listing copy.
4. Organize lead/customer follow-up so inquiries are less likely to be lost.
5. Structure catalog/price/availability maintenance so commercial facts can be updated once and reused.
6. Add useful analytics and conversion measurement where appropriate.
7. Build automations/integrations incrementally, prioritizing the highest manual burden and sales impact.
