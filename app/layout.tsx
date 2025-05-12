import type { Metadata } from "next";
import "./globals.css";
import { geist } from "./ui/fonts";
import Navbar from "./ui/navbar";

export const metadata: Metadata = {
  title: "Participa El Quisco",
  description: "Consultas ciudadanas - El Quisco",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geist.className} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
