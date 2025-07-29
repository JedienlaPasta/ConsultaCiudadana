"use client";
import { OptionDefinition } from "@/app/lib/definitions/encuesta";
import DOMPurify from "dompurify";

export default function Definitions({
  definitions,
}: {
  definitions: OptionDefinition[];
}) {
  const sanitizeHTML = (html: string) => {
    if (typeof window !== "undefined") {
      return DOMPurify.sanitize(html);
    }
    return html; // Fallback for SSR
  };

  return (
    <div
      className={`border-t border-gray-200 p-6 py-10 md:mb-6 md:rounded-lg md:border md:py-6 md:shadow-md md:shadow-gray-200/80`}
    >
      <h4 className="text-lg font-semibold text-[#0A4C8A]">
        Definición de Términos
      </h4>
      <p className="text-sm text-gray-500">
        A continuación se explican los principales términos utilizados en esta
        consulta.
      </p>

      {definitions?.map((item, index) => (
        <div
          key={index}
          className={`border-gray-200 ${
            index === definitions.length - 1
              ? "pt-4 md:border-b-0"
              : "py-4 md:border-b"
          }`}
        >
          <h5 className="font-semibold md:mb-1">{item.name}</h5>
          <p
            className="whitespace-pre-line text-gray-600"
            dangerouslySetInnerHTML={{
              __html: sanitizeHTML(item.description),
            }}
          />
        </div>
      ))}
    </div>
  );
}
