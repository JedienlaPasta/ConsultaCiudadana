"use client";
import { FAQ } from "@/app/lib/definitions/encuesta";
import DOMPurify from "dompurify";

export default function FAQComponent({ faq }: { faq: FAQ[] }) {
  const sanitizeHTML = (html: string) => {
    if (typeof window !== "undefined") {
      return DOMPurify.sanitize(html);
    }
    return html; // Fallback for SSR
  };
  return (
    <div
      className={`border-t border-gray-200 p-6 py-10 md:mb-6 md:rounded-xl md:border md:py-6 md:shadow-md md:shadow-gray-200/80`}
    >
      <h4 className="text-lg font-semibold text-[#0A4C8A]">
        Preguntas Frecuentes
      </h4>
      <p className="text-sm text-gray-500">
        Preguntas comunes sobre esta consulta
      </p>

      {faq?.map((item, index) => (
        <div
          key={index}
          className={`border-gray-200 ${index === faq.length - 1 ? "pt-4 md:border-b-0" : "py-4 md:border-b"}`}
        >
          <h5 className="font-semibold md:mb-0.5">{item.question}</h5>
          <div
            className="whitespace-pre-line text-gray-600"
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(item.answer) }}
          ></div>
        </div>
      ))}
    </div>
  );
}
