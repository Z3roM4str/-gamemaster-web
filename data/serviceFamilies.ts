export type ServiceFamily = {
  id: "gaming" | "streaming" | "ai";
  label: string;
  kicker: string;
  description: string;
  examples: string[];
  cta: string;
};

export const serviceFamilies: ServiceFamily[] = [
  {
    id: "gaming",
    label: "Gaming",
    kicker: "Nintendo Switch / Switch 2",
    description: "Explora el catálogo digital por franquicia, colección y tipo de juego. Precio y disponibilidad se confirman al momento.",
    examples: ["Mario", "Zelda", "Pokémon", "RPG", "Indie", "Shooter"],
    cta: "Explorar juegos",
  },
  {
    id: "streaming",
    label: "Streaming",
    kicker: "Entretenimiento digital",
    description: "Consulta opciones disponibles de streaming y sus condiciones actuales directamente por WhatsApp.",
    examples: ["Netflix", "Spotify", "Max", "Crunchyroll", "Apple TV+", "Disney+", "Prime", "YouTube Music"],
    cta: "Consultar streaming",
  },
  {
    id: "ai",
    label: "IA",
    kicker: "Herramientas de inteligencia artificial",
    description: "Descubre servicios de IA disponibles y pide una cotización actualizada según la opción que busques.",
    examples: ["ChatGPT", "Perplexity", "Abacus.AI", "Gemini"],
    cta: "Consultar IA",
  },
];
