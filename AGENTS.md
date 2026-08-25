# AGENTS.md — GameMaster

## Mission

Build the best possible commercial website for GameMaster: a premium digital catalog for Gaming, Streaming and AI memberships/services, with a distinctive chromostereoscopic visual identity.

Do not reduce the site to a generic landing page. The product should feel like a real entertainment catalog: discovery-first, visual, fast, navigable, credible and optimized for conversion.

## Read before changing code

Always read:

- `docs/PRODUCT_VISION.md`
- `docs/BUSINESS_RULES.md`
- `docs/CHROMOSTEREOPSIS.md`
- `docs/VISUAL_SYSTEM.md`
- `data/catalog.ts`

Treat these files as the source of truth unless the user explicitly changes a business rule.

## Product principles

1. **Mobile is a first-class product.** Do not merely shrink desktop. Recompose layouts for phones.
2. **Discovery beats walls of text.** Use rails, filters, search, genres, collections and featured areas.
3. **Art direction must be ownable.** Use the GameMaster red/blue/black system and crisp chromatic planes. Avoid generic SaaS cards.
4. **Cromoestereopsis should be intentional.** Prefer hard red/blue separations, crisp offsets and dark neutral space. Avoid turning the whole site into an unreadable RGB glitch.
5. **Commercial clarity matters.** A user should understand what is sold, how it works and how to ask for a quote within seconds.
6. **Never invent price, stock or included benefits.** Unknown values must remain “Consultar”.
7. **Do not imply official affiliation** with Nintendo, Netflix, OpenAI, Spotify or other brands.
8. **Performance matters.** Minimize layout shift, oversized JS and unnecessary animation.
9. **Accessibility matters.** Chromatic effects are decoration, never the only carrier of information. Respect `prefers-reduced-motion`.

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

- search by title
- filter by category / franchise / genre
- collections such as Switch 2, Mario, Zelda, Pokémon, RPG, Shooter, Indie, destacados
- product detail route or modal
- “Consultar precio” CTA

Streaming and AI should initially use service-family cards and WhatsApp consultation until the user supplies a canonical price catalog.

## Visual system

- Base: near-black / black
- Primary chromatic plane: electric red
- Secondary chromatic plane: spectral/electric blue
- Neutral text: off-white
- Hard edges are preferred over soft neon blur
- Use chromatic edge offsets sparingly around hero typography, cards, rails and separators
- Build depth through planar layering, overlap and relative scale, not fake 3D everywhere
- Use neutral breathing space to reduce visual fatigue

## Coding conventions

- Next.js App Router + TypeScript
- Keep catalog/content data outside visual components
- Prefer semantic HTML and CSS variables
- Components should be reusable and small enough to reason about
- No hidden magic numbers for important visual tokens: put them in CSS custom properties
- No hardcoded price claims in UI components
- Keep WhatsApp CTA centralized so contact copy can be changed once

## Quality bar before finishing a task

Run or reason through:

- `npm run lint`
- `npm run build`
- desktop width around 1440px
- phone widths around 390px and 430px
- keyboard focus states
- reduced motion
- empty search state
- very long game title wrapping

## Current priority backlog

1. Strengthen the homepage hero and discovery rails.
2. Add real product artwork only through a maintainable/licensing-conscious asset strategy.
3. Build individual game detail pages with related titles and WhatsApp quote CTA.
4. Expand genre taxonomy beyond the source list without mutating source facts.
5. Add Streaming and IA canonical catalogs once pricing/content is supplied.
6. Refine the chromostereoscopic system through controlled visual tests, not arbitrary RGB effects.
