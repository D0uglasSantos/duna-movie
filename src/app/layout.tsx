import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  weight: ["300", "400", "500"]
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  preload: true,
  weight: ["400", "500", "700"],
  style: ["normal", "italic"]
});

export const metadata: Metadata = {
  title: "Duna: Parte 2 | Uma experiência imersiva de Arrakis",
  description:
    "Viva Arrakis antes mesmo de assistir ao filme. Uma experiência imersiva sobre poder, profecia e sobrevivência no universo de Duna.",
  openGraph: {
    title: "Duna: Parte 2 | O destino de Arrakis está escrito na areia.",
    description:
      "Paul Atreides. Chani. Arrakis. Uma guerra santa começa. Explore o universo de Duna antes de entrar no cinema.",
    type: "website",
    locale: "pt_BR"
  },
  twitter: {
    card: "summary_large_image",
    title: "Duna: Parte 2 | Experiência Imersiva",
    description: "O destino de Arrakis está escrito na areia."
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
