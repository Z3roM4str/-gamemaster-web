"use client";

import { useMemo, useState } from "react";
import { allCatalogTitles, catalogCollections } from "@/data/catalog";

const whatsappBase = "https://wa.me/525527699426";

function initials(title: string) {
  return title
    .replace(/[^A-Za-zÀ-ÿ0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

export default function CatalogExplorer() {
  const [query, setQuery] = useState("");
  const [collection, setCollection] = useState("all");

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("es");

    return allCatalogTitles.filter((item) => {
      const matchesCollection = collection === "all" || item.collectionId === collection;
      const matchesQuery = !normalized || item.title.toLocaleLowerCase("es").includes(normalized);
      return matchesCollection && matchesQuery;
    });
  }, [query, collection]);

  return (
    <div className="catalogExplorer">
      <div className="catalogTools">
        <label className="searchBox">
          <span>Buscar</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Mario, Zelda, Minecraft..."
            type="search"
          />
        </label>
        <div className="filterRail" aria-label="Filtrar catálogo">
          <button
            className={collection === "all" ? "filterChip active" : "filterChip"}
            onClick={() => setCollection("all")}
            type="button"
          >
            Todo
          </button>
          {catalogCollections.map((item) => (
            <button
              key={item.id}
              className={collection === item.id ? "filterChip active" : "filterChip"}
              onClick={() => setCollection(item.id)}
              type="button"
            >
              {item.emoji} {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="resultMeta">
        <span>{results.length} resultados</span>
        <small>Precios y disponibilidad: consultar</small>
      </div>

      {results.length > 0 ? (
        <div className="gameGrid">
          {results.map((item, index) => {
            const message = `Hola, quiero cotizar ${item.title} para Nintendo ${item.platform}.`;
            return (
              <article className="gameCard" key={`${item.collectionId}-${item.title}`}>
                <div className={`gameArt artVariant${index % 6}`} aria-hidden="true">
                  <div className="artRear" />
                  <div className="artGlyph">{initials(item.title)}</div>
                  <div className="artFront" />
                </div>
                <div className="gameInfo">
                  <p>{item.collectionLabel}</p>
                  <h3>{item.title}</h3>
                  <div className="gameBottom">
                    <span>{item.platform}</span>
                    <a href={`${whatsappBase}?text=${encodeURIComponent(message)}`} target="_blank" rel="noreferrer">
                      Cotizar →
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="emptyState">
          <strong>No encontramos ese título en el catálogo cargado.</strong>
          <p>Puedes preguntar por WhatsApp para revisar si está disponible.</p>
          <a
            className="secondaryCta"
            href={`${whatsappBase}?text=${encodeURIComponent(`Hola, estoy buscando ${query || "un juego"}. ¿Lo tienen disponible?`)}`}
            target="_blank"
            rel="noreferrer"
          >
            Preguntar por WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
