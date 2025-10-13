"use client";
import { usePathname } from "next/navigation";

export default function CanonicalUrl() {
  const pathname = usePathname();
  const baseUrl = "https://participacion.munielquisco.gob.cl";

  const canonicalUrl = pathname === "/" ? baseUrl : `${baseUrl}${pathname}`;

  return <link rel="canonical" href={canonicalUrl} />;
}
