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

## Streaming and AI

The supplied visual material shows GameMaster as a broader digital-membership business including examples such as streaming platforms and AI tools. However, no canonical price/availability table for those products has been supplied in the repository yet.

Therefore:

- list service families for discovery;
- do not invent plan names, prices, durations, account rules or warranties;
- route the customer to WhatsApp for a current quote;
- do not imply official affiliation with third-party brands.

## Tone

Commercial copy should be concise, clear and credible. Avoid exaggerated claims such as “el más barato de México”, “100% garantizado para siempre” or fake scarcity unless the owner later provides substantiation.

## Catalog provenance

The game list in `data/catalog.ts` is transcribed from the owner's source catalog. It is not a market-verified database. Preserve source titles as entered unless the owner asks for a factual catalog audit.
