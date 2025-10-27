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
                de participación.
              </p>
            </div>
          </div>

          {/* FAQ items */}
          <div className="space-y-6 sm:space-y-4">
            {faq?.map((item, index) => (
              <div key={index} className="group/item">
                <div className="relative flex flex-col gap-3 rounded-xl border border-purple-100/50 bg-gradient-to-r from-white to-purple-50/30 p-4 transition-all duration-200 hover:shadow-md sm:flex-row sm:items-start sm:gap-3.5 sm:p-5">
                  {/* Question */}
                  <div className="absolute -top-3 left-3 flex h-7 w-[calc(30%)] items-center justify-center rounded-full bg-gradient-to-br from-indigo-300 to-indigo-500 text-xs font-bold text-white shadow-sm sm:static sm:h-6 sm:w-6">
                    {index + 1}
                  </div>

                  {/* Answer */}
                  <div className="mt-2 flex-1 px-1.5 sm:mt-0 sm:px-0">
                    <h5 className="leading-relaxed font-semibold text-indigo-800">
                      {item.question}
                    </h5>
                    <div
                      className="text-sm leading-relaxed whitespace-pre-line text-slate-700 sm:text-base"
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
