# GameMaster Web

Repositorio maestro del sitio de **GameMaster**, un catálogo digital de Gaming, Streaming e IA con experiencia visual premium, mobile-first y una identidad propia basada en cromoestereopsis.

Este repositorio está preparado para que ChatGPT y Codex trabajen sobre la misma fuente de verdad.

## Regla visual crítica

**Cromoestereopsis no significa anaglifo.**

La web debe usar una sola composición 2D con regiones rojas, azules y neutras en planos visuales diferentes. No se deben duplicar textos, logos, cards, imágenes o bordes en rojo/azul o rojo/cian con offsets para simular 3D.

No usar como lenguaje principal:

- RGB split;
- chromatic aberration;
- red/cyan ghosting;
- `text-shadow` rojo/azul alrededor de la misma palabra;
- `box-shadow` rojo/azul simétrico para duplicar el borde de un objeto;
- copias desplazadas del mismo elemento.

La autoridad final sobre esta regla es `docs/CODEX_VISUAL_GUARDRAILS.md`.

## Objetivo

Construir una web comercial que combine:

- descubrimiento por carruseles y categorías, inspirado en la facilidad de exploración de plataformas de entretenimiento sin copiar su interfaz;
- un catálogo claro de videojuegos digitales para Nintendo Switch / Switch 2;
- secciones independientes para Streaming e IA;
- contacto y cierre de venta por WhatsApp / Facebook;
- una dirección artística reconocible basada en rojo, azul y negro, regiones cromáticas nítidas, planos reales de composición y cromoestereopsis;
- experiencia completa y específica para móvil y escritorio.

## Fuente de verdad para Codex

Antes de modificar la web, leer en este orden:

1. `AGENTS.md`
2. `docs/CODEX_VISUAL_GUARDRAILS.md`
3. `docs/PRODUCT_VISION.md`
4. `docs/BUSINESS_RULES.md`
5. `docs/CHROMOSTEREOPSIS.md`
6. `docs/VISUAL_SYSTEM.md`
7. `docs/REFERENCE_IMAGES.md`
8. `data/catalog.ts`

Para profundizar en la investigación: `docs/research/CHROMO_RESEARCH_NOTES.md`.

## Dirección visual resumida

- rojo = plano focal/delantero;
- negro o casi negro = plano neutro y espacio negativo;
- azul = plano estructural/posterior;
- texto de lectura = neutro;
- cada color debe ocupar geometría real diferente;
- arte técnico, topográfico, modular, halftone/engraving y diagramático son familias prioritarias;
- el diseño debe seguir siendo coherente aunque el espectador no perciba la profundidad cromática.

## Estado actual

Se incluye una base funcional en Next.js/TypeScript para que Codex no empiece desde cero. El diseño debe evolucionar, no degradarse a una plantilla genérica.

Existe deuda visual en la base actual: algunos tratamientos CSS anteriores pueden parecer anaglifo. Codex debe reemplazarlos antes de considerar terminada la siguiente iteración visual. Ver `docs/NEXT_STEPS_FOR_CODEX.md`.

## Contacto comercial

- WhatsApp: `+52 55 2769 9426`
- Facebook: `https://www.facebook.com/share/1JKTPgejVZ/?mibextid=wwXIfr`

## Regla crítica de precios

No inventar precios ni disponibilidad. Cuando no exista precio confirmado, mostrar **“Consultar precio”** o llevar al usuario a WhatsApp.
