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
    <div className="group mb-8">
      <div className="relative overflow-hidden rounded-xl border border-purple-100 bg-gradient-to-br from-white via-purple-50/30 to-indigo-50/50">
        {/* Content container */}
        <div className="relative p-5 sm:px-8 sm:py-7">
          {/* Icon and title */}
          <div className="mb-2 flex items-center gap-3">
            <div>
              <h4 className="bg-gradient-to-r from-purple-700 to-indigo-700 bg-clip-text text-xl font-bold text-transparent">
                Preguntas Frecuentes
              </h4>
              <p className="mt-1 mb-3 text-sm text-slate-500">
                Encuentra respuestas a las dudas más frecuentes sobre el proceso
                de participación
              </p>
            </div>
          </div>

          {/* FAQ items */}
          <div className="space-y-4">
            {faq?.map((item, index) => (
              <div key={index} className="group/item">
                <div className="flex gap-3 rounded-xl border border-purple-100/50 bg-gradient-to-r from-white to-purple-50/30 p-4 transition-all duration-200 hover:border-indigo-200 hover:shadow-md sm:gap-4 sm:p-5">
                  {/* Question */}
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-300 to-indigo-500 text-xs font-bold text-white shadow-sm">
                    {index + 1}
                  </div>

                  {/* Answer */}
                  <div className="flex-1">
                    <h5 className="leading-relaxed font-semibold text-indigo-800">
                      {item.question}
                    </h5>
                    <div
                      className="leading-relaxed whitespace-pre-line text-slate-600"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHTML(item.answer),
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
