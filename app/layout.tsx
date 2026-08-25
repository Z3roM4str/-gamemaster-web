import type { Metadata } from "next";
import "./globals.css";
import "./chromostereopsis.css";

export const metadata: Metadata = {
  title: "GameMaster | Gaming, Streaming e IA",
  description:
    "Catálogo digital de GameMaster para Nintendo Switch, streaming e inteligencia artificial. Consulta precio y disponibilidad por WhatsApp.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
