"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { downloadSurveyAnalytics } from "@/app/lib/actions/analytics";

export default function SurveyOptionsMenu({ publicId }: { publicId: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePermissionsManagement = () => {
    const params = new URLSearchParams(searchParams);
    params.set("permissions", "true");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const dropdownOptionStyle =
    "pl-4 pr-6 py-3 divide-y flex items-center gap-2 rounded-md group transition-all text-slate-700 duration-300 hover:bg-slate-200/65 hover:text-slate-900";

  // Controladores del dropdown vvvv
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  const handleDownload = async () => {
    const result = await downloadSurveyAnalytics(publicId);
  };

  return (
    <div
      ref={modalRef}
      onClick={toggleModal}
      className={`relative cursor-pointer text-xl select-none`}
    >
      <button className="cursor-pointer rounded-lg bg-white/80 p-2.5 text-slate-600 shadow-sm ring-1 ring-slate-200 transition-all hover:bg-white hover:text-slate-900 hover:shadow-md">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
          />
        </svg>
      </button>
      {modalOpen && (
        <ul className="absolute top-11.5 right-0 z-10 list-none overflow-hidden rounded-lg border border-slate-200 bg-white p-1 text-sm text-nowrap shadow-sm transition-all">
          <li
            onClick={handlePermissionsManagement}
            className={`w-full ${dropdownOptionStyle}`}
          >
            <span className="border-none text-left">Compartir Consulta</span>
          </li>
          <li>
            <button
              onClick={() => console.log("exportar votos")}
              className={`w-full cursor-pointer ${dropdownOptionStyle}`}
            >
              <span className="border-none text-left">Descargar Métricas</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => console.log("pending")}
              disabled
              className={`w-full cursor-not-allowed ${dropdownOptionStyle}`}
            >
              <span className="border-none text-left">Editar Consulta</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => console.log("pending")}
              disabled
              className={`w-full cursor-not-allowed ${dropdownOptionStyle}`}
            >
              <span className="border-none text-left">Eliminar Consulta</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
