import type { Metadata } from "next";
import "./globals.css";
import { geist } from "./ui/fonts";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Participa — Municipalidad de El Quisco",
  description:
    "Participa en las consultas ciudadanas de El Quisco. Información, plazos y cómo votar.",
  openGraph: {
    title: "Participa — Municipalidad de El Quisco",
    description: "Participa en las consultas ciudadanas de El Quisco",
    url: "https://participacion.munielquisco.gob.cl/",
    siteName: "Participa — Municipalidad de El Quisco",
    images: [
      {
        url: "https://participacion.munielquisco.gob.cl/og-image.png",
        width: 1200,
        height: 630,
        alt: "Participa — Municipalidad de El Quisco",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Participa — Municipalidad de El Quisco",
    description: "Participa en las consultas ciudadanas de El Quisco",
    images: [
      {
        url: "https://participacion.munielquisco.gob.cl/og-image.png",
        width: 1200,
        height: 630,
        alt: "Participa — Municipalidad de El Quisco",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Color+Emoji"
          rel="stylesheet"
        />
      </head>
      <body className={`${geist.className} antialiased`}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
