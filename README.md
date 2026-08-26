# GameMaster

GameMaster is a **business growth and automation project**, not only a website project.

The website in this repository is the customer-facing storefront for a wider system whose objective is to help GameMaster **sell more, reduce repetitive manual work, improve customer trust and scale operations**.

The wider project can include the website, marketing, publication workflows, lead follow-up, customer-service flows, catalog operations, analytics, internal tools, automations and integrations.

See `docs/PROJECT_SCOPE.md` for the project-wide operating rules.

## Maximum-capability rule

For every GameMaster task, use the best combination of available capabilities and tools when they materially improve the result. Do not artificially restrict solutions to only code, only SVG, only Image Gen, only the website, or any single tool.

The owner is not expected to be technical. Questions and explanations should be brief, plain-language and easy to understand. If a safe professional default can be chosen without changing a business rule, choose it and continue.

## GameMaster Web

This repository contains the commercial website: a catalog for Gaming, Streaming and IA with a premium, mobile-first experience and a distinctive identity based on chromostereopsis.

ChatGPT and Codex should work from the same source of truth.

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

## Objetivo de la web

Construir una web comercial que combine:

- descubrimiento por carruseles y categorías, inspirado en la facilidad de exploración de plataformas de entretenimiento sin copiar su interfaz;
- un catálogo claro de videojuegos digitales para Nintendo Switch / Switch 2;
- secciones independientes para Streaming e IA;
- contacto y cierre de venta por WhatsApp / Facebook;
- una dirección artística reconocible basada en rojo, azul y negro, regiones cromáticas nítidas, planos reales de composición y cromoestereopsis;
- experiencia completa y específica para móvil y escritorio;
- una estructura preparada para futuras automatizaciones, medición e integraciones del negocio.

## Fuente de verdad para Codex

Empieza siempre por `AGENTS.md`. Ahí está el orden obligatorio de lectura.

La biblioteca de investigación está en `docs/research/` e incluye:

- `README.md` — índice y jerarquía de las tres investigaciones;
- `EVIDENCE_MAP.md` — evidencia fuerte, condicional, hipótesis y decisiones de producto;
- `IMPLEMENTATION_RULES.md` — traducción concreta a CSS/React/diseño web;
- `SOURCE_A_INVESTIGACION_ESPECIFICACION.md` — mapa de la investigación técnica de 20 páginas;
- `SOURCE_B_LENGUAJES_VISUALES.md` — mapa de la investigación de lenguajes visuales de 19 páginas;
- `SOURCE_C_AUDITORIA.md` — mapa de la auditoría de 13 páginas;
- `CHROMO_RESEARCH_NOTES.md` — síntesis técnica previa;
- `PDF_MANIFEST.md` — nombres, páginas y SHA-256 de los PDFs originales suministrados por el propietario.

Para iniciar una nueva sesión de Codex, usar `docs/CODEX_HANDOFF.md`.

## Dirección visual resumida

- rojo = plano focal/delantero intencional;
- negro o casi negro = plano neutro y espacio negativo;
- azul = plano estructural/posterior intencional;
- texto de lectura = neutro;
- cada color debe ocupar geometría real diferente;
- arte técnico, topográfico, modular, halftone/engraving y diagramático son familias prioritarias;
- Image Gen puede producir capas artísticas cuando supere la calidad alcanzable con SVG/CSS;
- parallax puede reforzar la separación de planos: azul más lento/trasero, rojo más activo/delantero;
- el diseño debe seguir siendo coherente aunque el espectador no perciba la profundidad cromática o la perciba invertida.

Estos son defaults de producto; no deben venderse como leyes perceptuales universales.

## Estado actual

Se incluye una base funcional en Next.js/TypeScript para que Codex no empiece desde cero. El diseño debe evolucionar, no degradarse a una plantilla genérica.

Existe deuda visual en la base actual: algunos tratamientos CSS anteriores pueden parecer anaglifo. Codex debe reemplazarlos antes de considerar terminada la siguiente iteración visual. Ver `docs/NEXT_STEPS_FOR_CODEX.md` e Issue #1.

## Contacto comercial

- WhatsApp: `+52 55 2769 9426`
- Facebook: `https://www.facebook.com/share/1JKTPgejVZ/?mibextid=wwXIfr`

## Regla crítica de precios

No inventar precios ni disponibilidad. Cuando no exista precio confirmado, mostrar **“Consultar precio”** o llevar al usuario a WhatsApp.
