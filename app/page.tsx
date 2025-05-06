"use client";
// import MapComponent from "./ui/MapComponent";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// Importación dinámica del componente de mapa para desactivar SSR
const DynamicMapComponent = dynamic(() => import("./ui/MapComponent"), {
  ssr: false, // Desactiva el Server-Side Rendering para este componente
});

const geojsonFilePath = "/sectores_prueba.geojson";

export default function Home() {
  const [geojsonData, setGeojsonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSectorName, setSelectedSectorName] = useState("Ninguno");

  useEffect(() => {
    // Cargar el archivo GeoJSON cuando el componente se monte en el cliente
    fetch(geojsonFilePath)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setGeojsonData(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        console.error("Error al cargar el GeoJSON:", err);
      });
  }, []); // El array vacío asegura que esto solo se ejecuta una vez al montar

  // Opcional: Función para manejar la selección si necesitas el ID en la página
  const handleSectorSelect = (sectorId, sectorName) => {
    console.log("Sector seleccionado en la página:", sectorName, sectorId);
    setSelectedSectorName(sectorName);
    // Aquí puedes actualizar un estado en la página o un formulario
  };

  return (
    <div>
      <h1>Página de Consulta Ciudadana - El Quisco</h1>

      <div style={{ padding: "20px" }}>
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
          <p>Error al cargar el mapa o los sectores: {error.message}</p>
        )}
        {!loading && !error && geojsonData && (
          <DynamicMapComponent
            geojsonData={geojsonData}
            // Opcional: pasar una función callback
            onSectorSelect={handleSectorSelect}
          />
        )}
        {!loading && !error && !geojsonData && (
          <p>No se encontraron datos de sectores para mostrar.</p>
        )}
      </div>

      {/* Aquí iría el resto de tu formulario de consulta */}
    </div>
  );
}
