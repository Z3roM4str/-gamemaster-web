# Business Rules — GameMaster

This file records business facts supplied by the owner. Do not silently replace them with assumptions.

## Contact

- WhatsApp: `+52 55 2769 9426`
- WhatsApp deep link: `https://wa.me/525527699426`
- Facebook: `https://www.facebook.com/share/1JKTPgejVZ/?mibextid=wwXIfr`

## Nintendo Switch offer

Source framing:

- Nintendo Switch 1 and 2, digital.
- Most quoted game prices have historically fallen around **$300–$600 MXN depending on the game**, but this is a reference range, not a guaranteed per-title price.
- Delivery is described as original titles downloaded on the user's Switch.
- Payment source text: transfer or deposit.
- To quote: ask which game(s) the customer wants and confirm current price and availability.

### Purchase / access options

#### Opción 1 — Cuenta Principal

- Can be played with any user/profile on the console.
- Source text says it can be used 100% offline and can also be played online.
- Positioned as the most convenient option.

#### Opción 2 — Cuenta Secundaria (Económica)

- Played from the profile supplied for the game.
- Internet is needed to open the game for a quick verification.
- Same complete game, positioned as the lower-cost option.
- Source text says only some titles can be played online under this option.

## Pricing rule

The website must never fabricate exact prices.

Allowed UI states:

- `Consultar precio`
- `Cotizar por WhatsApp`
- a confirmed value only when it exists in a canonical data source supplied by the owner

If a title may be unavailable, say `Sujeto a disponibilidad` or `Consultar disponibilidad`.

## Availability rule

The current source catalog explicitly asks customers to provide the main titles they are interested in so price and stock/availability can be checked. Preserve that operational reality.

## Commercial service families

The current commercial architecture is:

- Gaming → Nintendo Switch / Nintendo Switch 2 digital.
- Streaming & music.
- AI → ChatGPT and Claude.
- Privacy / digital services → Proton VPN.

The supplied material positions GameMaster as a broader digital-membership business, but no canonical price/availability table for Streaming & music, AI or Privacy / digital services has been supplied in the repository yet.

Therefore:

- list service families for discovery;
- do not invent plan names, prices, durations, account rules or warranties;
- use `Consultar precio` when no canonical value exists;
- route the customer to WhatsApp for a current quote;
- do not imply official affiliation with third-party brands.

### AI offer

- The current AI offer is **ChatGPT and Claude**.
- **Abacus is not part of the current offer.** Historical references or legacy assets must not be interpreted as present availability and must not make Abacus visible as an available product.
- Do not describe ChatGPT or Claude as the only tool offered beyond the explicit current pair unless the owner changes this rule.
- Do not publish a price, plan, duration, benefit or availability claim without a canonical source supplied by the owner.

### Privacy / digital services

- **Proton VPN** belongs to the separate family **Privacy / digital services**.
- Proton VPN must not be classified as AI or Streaming & music.
- Do not publish a price, plan, duration, benefit or availability claim without a canonical source supplied by the owner.

## Tone

Commercial copy should be concise, clear and credible. Avoid exaggerated claims such as “el más barato de México”, “100% garantizado para siempre” or fake scarcity unless the owner later provides substantiation.

## Catalog provenance

The commercial game list in `app/data/catalog.ts` descends from the owner's source catalog. It is not a market-verified database. Preserve its provenance and `sourceCategory`; owner-confirmed normalization rules, such as the exclusions below, take precedence over historical titles or records.

## Current catalog exclusions and normalization

- **Fortnite is not part of the current GameMaster offer.** It must not appear as an available product, taxonomy record, rail item, filter result or related game.
- **`Resident Evil 9 Requiem, 8, 7` is one confirmed 3-in-1 product.** Keep the three games together in a single catalog record; do not flag the grouping as doubtful or pending manual review.
- GameMaster does not offer separate **Pase de expansión / Expansion Pass** catalog records.
- When a pass record and a base-game record both exist, keep only the base game and remove the pass record.
- When only a pass record exists, convert that record into the base game instead of deleting the entire game. Remove pass wording and any pass-specific metadata, and update its ID/slug only when needed to represent the base game correctly.
