import type { Metadata } from "next";
import "./globals.css";
import { geist } from "./ui/fonts";
import { Toaster } from "sonner";

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
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
