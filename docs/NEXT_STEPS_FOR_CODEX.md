# Next Steps for Codex

Start by reading `AGENTS.md` and `docs/CODEX_HANDOFF.md`.

## Current starting point

Work from the latest `main`.

The front end was rebuilt as one page-scale composition (see the architecture section in `docs/CODEX_HANDOFF.md`). Claude Code currently leads art direction, composition, front end, motion and responsive work; Codex leads architecture, data, integrations, debugging, audits and heavy technical work.

Always inspect the latest `main` before editing. Do not restart from an older baseline.

## Technical items handed over

These were identified during the composition rebuild and are deliberately left for a technical pass. None of them block the current visual direction.

### 1. Homepage DOM and payload weight

Measured on the homepage at 1440px (dev server):

- ~7,000 DOM nodes;
- 197 game cards across 10 homepage rails;
- 202 `<img>` elements (browser lazy-loading keeps the initial requests to ~20);
- ~1.0 MB of server-rendered HTML.

Every rail renders its full set of games even though only a few cards are visible. Worth evaluating:

- mounting rails on intersection, or capping each rail and linking to a filtered view;
- whether `exploreCatalogShelves` should be code-split rather than rendered on toggle;
- measuring real LCP/TBT on a mid-range phone before optimizing anything.

Do not solve this by deleting rails: the discovery architecture is a commercial requirement.

### 2. Generated art geometry payload

`components/art/geometry.ts` is ~36 KB of path data. It is server-only, so it never reaches the client bundle, but it is inlined into the rendered HTML wherever a field is used (the terrain appears twice on the homepage).

If HTML size becomes a real problem, evaluate emitting the fields as static `.svg` files under `public/art/` and referencing them from CSS, weighing that against losing per-path CSS control (`--i` / `--n` opacity ramps) and the extra requests.

### 3. Sticky offset coupling

`.catalogControls` sticks at `top: 76px`, which is hard-coded to match `.siteHeader`'s `min-height`. Promote the header height to a CSS custom property so the two cannot drift apart.

### 4. Cover asset normalization

Several covers in `public/games/` carry baked-in borders or letterboxing (visible as a frame inside the card). This is an asset/data problem, not a CSS one. A pass over `scripts/sync-game-images.mjs` that normalizes aspect ratio and trims uniform borders would improve the whole catalog at once.

Keep covers in their original colours — no tinting, posterizing or channel effects.

### 5. DepthDriver observer scope

`components/art/DepthDriver.tsx` observes `document.body` with `{ childList: true, subtree: true }` and re-queries every `[data-gm-depth]` element on any mutation. It is cheap today (17 layers), but it will react to unrelated DOM churn. Scope it to the containers that can gain art layers, or expose a registration API.

### 6. Conversion instrumentation

The quote funnel still has no measurable events. `AGENTS.md`'s business backlog asks for this. Useful first events, all already available in `components/experience/useExperience.ts` and the WhatsApp helpers in `lib/contact.ts`:

- game added/removed from the request;
- interest family selected;
- quick-view opened;
- WhatsApp CTA followed (which surface it came from);
- search performed with zero results (this one is directly actionable for catalog gaps).

Keep business facts sourced: an event stream must never become a place where prices or availability are invented.

## Visual constraints Codex must not regress

Do not reintroduce:

- red/blue text ghosting;
- RGB split;
- chromatic aberration;
- paired red/blue shadows used as depth;
- duplicated red/cyan geometry;
- offset duplicate covers, cards or logos;
- generic neon cyberpunk blur;
- purple overlap as the main spatial device.

And do not:

- wrap every rail in the same container treatment again;
- add a fourth CSS file that overrides the other three;
- cross a game cover through its middle with a red element;
- publish a price, plan, duration, benefit or availability claim without a canonical source.

## Validation before finishing any pass

- `npm run lint`;
- `npm run build`;
- desktop review around 1440px;
- mobile review around 390px and 430px;
- no horizontal overflow;
- keyboard focus and modal behaviour still work;
- `prefers-reduced-motion` still zeroes every parallax offset;
- body text remains readable on neutral surfaces;
- covers remain recognizable and untinted;
- the page still works if chromostereopsis is perceived weakly or inverted;
- the result does not resemble an anaglyph/RGB-glitch demo.

After completion, commit/push the work and report the resulting SHA.
