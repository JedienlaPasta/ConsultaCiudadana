import type { Metadata } from "next";
import "./globals.css";
import { geist } from "./ui/fonts";
import { Toaster } from "sonner";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://participacion.munielquisco.gob.cl/"),
  title: "Participa — Consultas Ciudadanas El Quisco",
  description:
    "Participa en las consultas ciudadanas de El Quisco, conoce información oficial, plazos de votación, resultados y cómo aportar a la toma de decisiones locales.",
  keywords: [
    "consultas públicas",
    "consultas públicas El Quisco",
    "consultas ciudadanas",
    "consultas ciudadanas El Quisco",
    "participación ciudadana",
    "participación ciudadana El Quisco",
    "encuestas municipales",
    "encuestas municipales El Quisco",
    "opinión ciudadana",
    "opinión ciudadana El Quisco",
    "votar online",
    "votar online El Quisco",
    "municipalidad El Quisco consultas",
    "municipalidad El Quisco consultas ciudadanas",
    "participa",
    "participa El Quisco",
    "participa municipalidad El Quisco",
    "participación",
    "participación El Quisco",
    "participación municipalidad El Quisco",

    "cómo participar en encuestas municipales El Quisco",
    "cómo participar en consultas ciudadanas El Quisco",
    "consultas ciudadanas online El Quisco",
    "encuestas online municipalidad El Quisco",
    "opiniones vecinos El Quisco",
    "donde votar encuestas El Quisco",
    "que es participación ciudadana El Quisco",

    "plataforma participación ciudadana El Quisco",
    "plataforma de participación ciudadana El Quisco",
    "encuestas online municipalidad El Quisco",
  ],

  openGraph: {
    title: "Participa — Consultas Ciudadanas El Quisco",
    description:
      "Participa en las consultas ciudadanas de El Quisco, conoce información oficial, plazos de votación, resultados y cómo aportar a la toma de decisiones locales.",
    url: "https://participacion.munielquisco.gob.cl/",
    siteName: "Participa — Consultas Ciudadanas El Quisco",
    images: [
      {
        url: "https://participacion.munielquisco.gob.cl/og-image.png",
        width: 1200,
        height: 630,
        alt: "Consultas Ciudadanas El Quisco",
      },
    ],
    locale: "es-CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Participa — Consultas Ciudadanas El Quisco",
    description: "Participa en las consultas ciudadanas de El Quisco",
    images: [
      {
        url: "https://participacion.munielquisco.gob.cl/og-image.png",
        width: 1200,
        height: 630,
        alt: "Consultas Ciudadanas El Quisco",
      },
    ],
  },
  alternates: {
    canonical: "https://participacion.munielquisco.gob.cl/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Color+Emoji"
          rel="stylesheet"
        />
        <Script
          id="org-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "GovernmentOrganization",
              name: "Municipalidad de El Quisco",
              url: "https://www.elquisco.cl",
              logo: "https://www.elquisco.cl/wp-content/uploads/2024/02/Recurso-12.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Av. Francia 011",
                addressLocality: "El Quisco",
                addressRegion: "Valparaíso",
                postalCode: "2700000",
                addressCountry: "CL",
              },
              telephone: "+56 35 2 456 100",
              sameAs: [
                "https://www.facebook.com/MuniDeElQuisco",
                "https://x.com/elquiscomuni",
                "https://www.instagram.com/munielquisco",
              ],
            }),
          }}
        />
        <Script
          id="website-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://participacion.munielquisco.gob.cl",
              name: "Participa — Consultas Ciudadanas El Quisco",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://participacion.munielquisco.gob.cl/consultas?page=1&query={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        <link
          rel="canonical"
          href="https://participacion.munielquisco.gob.cl/"
        />
        <meta name="theme-color" content="#0e4194" />
      </head>
      <body className={`${geist.className} antialiased`}>
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
