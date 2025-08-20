"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import RexLoader from "../RexAnimation";
import SectorSelectionList from "./SectorSelectionList";
import { Question } from "@/app/lib/definitions/encuesta";

// Importación dinámica del componente de mapa para desactivar SSR
const DynamicMapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false, // Desactiva el Server-Side Rendering para este componente
});

// const sectoresPath = "/sectores_prueba.geojson";
const sectoresPath = "/output-buffer.geojson";
// const comunaPath = "/quisco_comuna.geojson";
const comunaPath = "/output-limite.geojson";

type MapSectionProps = {
  selectedSectorId: string | null;
  setSelectedSectorId: (sectorId: string) => void;
  sectoresSurveyList: Question;
};

export default function MapSection({
  selectedSectorId,
  setSelectedSectorId,
  sectoresSurveyList,
}: MapSectionProps) {
  const [sectores, setSectores] = useState(null);
  const [comuna, setComuna] = useState(null);
  const [lines, setLines] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    Promise.all([
      fetch(sectoresPath).then((response) => response.json()),
      fetch(comunaPath).then((response) => response.json()),
    ])
      .then(([sectoresData, comunaData]) => {
        setSectores(sectoresData);
        setComuna(comunaData);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        console.error("Error al cargar los GeoJSON:", err);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }, []);

  const handleSectorSelect = (sectorId: string) => {
    setSelectedSectorId(sectorId);
  };

  return (
    <div className="">
      {/* <div className="rounded-lg border-gray-200 shadow-gray-200/80 md:border md:p-6 md:shadow-md"> */}
      <div className="">
        <span className="mb-1 flex items-baseline">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-map-icon lucide-map mt-1 mr-2 hidden size-5 text-[#0a4c8a] sm:block"
          >
            <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
            <path d="M15 5.764v15" />
            <path d="M9 3.236v15" />
          </svg>
          <h2 className="text-xl font-bold text-[#23396f] md:text-2xl">
            Selecciona tu Sector de Votación
          </h2>
        </span>
        <p className="mb-2 text-sm text-gray-500 md:mb-4 md:text-base">
          Haz clic en el mapa para seleccionar el sector donde vives.
        </p>

        <div className="borders mb-4 flex items-center rounded-lg border-gray-200 bg-blue-50 p-4">
          <div className="mr-2 flex size-6 items-center justify-center rounded-full bg-[#0A4C8A]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-4 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex flex-col items-baseline md:flex-row md:gap-1">
            <p className="font-medium text-gray-700">Sector seleccionado:</p>
            <p className="-mt-1.5 font-semibold text-[#0A4C8A] md:mt-0">
              {selectedSectorId || "Ningún sector seleccionado"}
            </p>
          </div>
        </div>

        <div className="">
          <div className="col-span-2">
            {loading && (
              <div className="shadow-mds flex aspect-[4/3] items-center justify-center rounded-lg bg-gray-100 p-4 md:aspect-[16/8]">
                <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-gray-200">
                  <div className="flex flex-col items-center gap-1 rounded-lg bg-white px-4 py-5 md:gap-2 md:px-10 md:py-8">
                    <RexLoader />
                    <p className="animate-pulse text-sm text-slate-500">
                      Cargando mapa y sectores...
                    </p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="rounded-lg bg-red-50 p-6 shadow-md">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-6 w-6 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-red-700">
                    Error al cargar el mapa o los sectores:{" "}
                    {error instanceof Error ? error.message : String(error)}
                  </p>
                </div>
              </div>
            )}

            {!loading && !error && sectores && comuna && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-100 shadow-md shadow-gray-200/80 md:aspect-[16/8]">
                <div className="absolute top-2 right-2 z-[1000] flex flex-col rounded-md bg-white px-2 py-1.5 shadow-lg md:top-5 md:right-5 md:space-y-1">
                  {/* <h5 className="text-xs font-medium text-slate-800 md:text-sm">
                    Información
                  </h5> */}
                  <div className="flex items-center gap-1">
                    <span className="size-3.5 rounded bg-[#357bf0]"></span>
                    <p className="text-[10px] text-gray-600 md:text-xs">
                      Sector seleccionado
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="size-3.5 rounded bg-[#ffdf69]"></span>
                    <p className="text-[10px] text-gray-600 md:text-xs">
                      Sector señalado
                    </p>
                  </div>
                </div>
                <DynamicMapComponent
                  geojsonData={sectores}
                  boundaryData={comuna}
                  selectedSector={selectedSectorId}
                  onSectorSelect={handleSectorSelect}
                />
              </div>
            )}

            {!loading && !error && !sectores && (
              <div className="rounded-lg bg-yellow-50 p-6 shadow-md">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 h-6 w-6 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <p className="text-yellow-700">
                    No se encontraron datos de sectores para mostrar.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <SectorSelectionList
          selectedSector={selectedSectorId}
          setSelectedSector={setSelectedSectorId}
          sectoresSurveyList={sectoresSurveyList}
        />
      </div>
    </div>
  );
}
