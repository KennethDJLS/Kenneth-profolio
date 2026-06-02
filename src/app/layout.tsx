import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kenneth Lascarro — Ingeniero Electrónico",
  description:
    "Portafolio de Kenneth De Jesús Lascarro Santiago · Hardware Designer · IoT Engineer · Electronic Engineer",
  keywords: [
    "Ingeniero Electrónico",
    "Kenneth Lascarro",
    "Hardware Designer",
    "IoT",
    "Sistemas Embebidos",
    "Barranquilla",
  ],
  openGraph: {
    title: "Kenneth Lascarro — Ingeniero Electrónico",
    description: "The real world speaks in analog. I translate.",
    url: "https://kennethdjls.vercel.app",
    siteName: "Kenneth Lascarro",
    images: [],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
