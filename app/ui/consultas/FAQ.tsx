import { FAQ } from "@/app/lib/definitions/encuesta";
import React from "react";

export default function FAQComponent({ faq }: { faq: FAQ[] }) {
  return (
    <div
      className={`border-t border-gray-200 p-6 py-10 md:mb-6 md:rounded-lg md:border md:py-6 md:shadow-md md:shadow-gray-200/80`}
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
          <h5 className="mb-1 font-semibold">{item.question}</h5>
          <p className="text-gray-600">{item.answer}</p>
        </div>
      ))}
    </div>
  );
}
