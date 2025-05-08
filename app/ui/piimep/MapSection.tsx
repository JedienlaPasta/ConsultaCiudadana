"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// Importación dinámica del componente de mapa para desactivar SSR
const DynamicMapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false, // Desactiva el Server-Side Rendering para este componente
});

const sectoresPath = "/sectores_prueba.geojson";
const comunaPath = "/quisco_comuna.geojson";

export default function MapSection() {
  const [sectores, setSectores] = useState(null);
  const [comuna, setComuna] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [selectedSectorName, setSelectedSectorName] = useState("Ninguno");

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

  const handleSectorSelect = (sectorId: string, sectorName: string) => {
    console.log("Sector seleccionado en la página:", sectorName, sectorId);
    setSelectedSectorName(sectorName);
  };

  if (loading) {
    return <div>Cargando Mapa...</div>;
  }

  return (
    <div>
      <div className="info">
        {" "}
        {/* Reutiliza el CSS de la respuesta anterior */}
        <h2>Selecciona tu Sector de Votación</h2>
        <p>Haz clic en el mapa para seleccionar el sector donde vives.</p>
        {/* Este div será actualizado por el componente del mapa */}
        <div id="selected-sector-info">
          Sector seleccionado: {selectedSectorName}
        </div>
      </div>

      {loading && <p>Cargando mapa y sectores...</p>}
      {error && (
        <p>
          Error al cargar el mapa o los sectores:{" "}
          {error instanceof Error ? error.message : String(error)}
        </p>
      )}
      {!loading && !error && sectores && comuna && (
        <DynamicMapComponent
          geojsonData={sectores}
          boundaryData={comuna}
          onSectorSelect={handleSectorSelect}
        />
      )}
      {!loading && !error && !sectores && (
        <p>No se encontraron datos de sectores para mostrar.</p>
      )}
    </div>
  );
}
