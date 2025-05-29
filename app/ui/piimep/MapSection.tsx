"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Importación dinámica del componente de mapa para desactivar SSR
const DynamicMapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false, // Desactiva el Server-Side Rendering para este componente
});

// const sectoresPath = "/sectores_prueba.geojson";
const sectoresPath = "/output-buffer.geojson";
// const comunaPath = "/quisco_comuna.geojson";
const comunaPath = "/output-limite.geojson";

export default function MapSection() {
  const [sectores, setSectores] = useState(null);
  const [comuna, setComuna] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

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
        setLoading(false);
      });
  }, []);

  const handleSectorSelect = (sectorName: string) => {
    setSelectedSector(sectorName);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-[#23396f]">
          Selecciona tu Sector de Votación
        </h2>
        <p className="mb-6 text-gray-600">
          Haz clic en el mapa para seleccionar el sector donde vives.
        </p>

        <div className="flex items-center rounded-lg bg-[#f0f7ff] p-4">
          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#0A4C8A]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
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
          <div>
            <p className="text-sm font-medium text-gray-500">
              Sector seleccionado:
            </p>
            <p className="text-lg font-semibold text-[#0A4C8A]">
              {selectedSector || "Ningún sector seleccionado"}
            </p>
          </div>
        </div>
      </div>

      {loading && (
        <div className="flex h-[400px] items-center justify-center rounded-lg bg-white shadow-md">
          <div className="text-center">
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#0A4C8A] border-t-transparent"></div>
            <p className="text-gray-600">Cargando mapa y sectores...</p>
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
        <div className="overflow-hidden rounded-lg shadow-md">
          <DynamicMapComponent
            geojsonData={sectores}
            boundaryData={comuna}
            selectedSector={selectedSector}
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
  );
}
