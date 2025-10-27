"use client";
import { OptionDefinition } from "@/app/lib/definitions/encuesta";
import DOMPurify from "dompurify";
import Link from "next/link";

export default function Definitions({
  definitions,
  description,
  link,
}: {
  definitions: OptionDefinition[];
  description: string;
  link: string;
}) {
  const sanitizeHTML = (html: string) => {
    if (typeof window !== "undefined") {
      return DOMPurify.sanitize(html);
    }
    return html; // Fallback for SSR
  };

  return (
    <div className="group mb-8">
      <div className="relative overflow-hidden rounded-xl border border-emerald-100/70 bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/50">
        {/* Content container */}
        <div className="relative p-5 sm:px-8 sm:py-7">
          <h4 className="bg-gradient-to-r from-emerald-700 to-teal-700 bg-clip-text text-xl font-bold text-transparent">
            Definición de Términos
          </h4>

          {/* Description */}
          <div className="mt-1 mb-6 text-sm text-slate-500">
            {link ? (
              <span className="text-sm leading-relaxed">
                {description}{" "}
                <Link
                  className="inline-flex items-center gap-1 font-medium text-emerald-500 decoration-emerald-500 transition-colors duration-200 hover:text-emerald-800 hover:underline"
                  href={link}
                  target="_blank"
                >
                  Ver recurso completo
                  <svg
                    className="size-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </span>
            ) : (
              <p className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-600">
                A continuación se explican los principales términos utilizados
                en esta consulta.
              </p>
            )}
          </div>

          {/* Definitions list */}
          <div className="space-y-6 sm:space-y-4">
            {definitions?.map((item, index) => (
              <div key={index} className="group/item relative">
                <div className="relative flex flex-col gap-3 rounded-xl border border-emerald-100/80 bg-white/70 p-4 transition-all duration-200 hover:shadow-md sm:flex-row sm:items-start sm:gap-3.5 sm:p-5">
                  {/* Number indicator */}
                  <div className="absolute -top-3 left-3 flex h-7 w-[calc(30%)] items-center justify-center rounded-full bg-gradient-to-br from-emerald-300 to-emerald-500 text-xs font-bold text-white shadow-sm sm:static sm:h-6 sm:w-6">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="mt-2 flex-1 px-1.5 sm:mt-0 sm:px-0">
                    <h5 className="leading-relaxed font-semibold text-emerald-800">
                      {item.name}
                    </h5>
                    <div
                      className="text-sm leading-relaxed whitespace-pre-line text-slate-700 sm:text-base"
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHTML(item.description),
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
