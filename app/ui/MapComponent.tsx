"use client";
import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import L from "leaflet";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "leaflet/images/marker-icon-2x.png",
  iconUrl: "leaflet/images/marker-icon.png",
  shadowUrl: "leaflet/images/marker-shadow.png",
});

type Props = {
  geojsonData: any;
  onSectorSelect: (sectorId: string, sectorName: string) => void;
};

export default function MapComponent({ geojsonData, onSectorSelect }: Props) {
  const [selectedSectorId, setSelectedSectorId] = useState(null);
  const [hoveredSectorId, setHoveredSectorId] = useState(null);
  const geojsonLayerRef = useRef(null);

  // Agregar clases de Tailwind para los estilos
  // useEffect(() => {
  //     // Crear estilos para el sector seleccionado usando Tailwind
  //     const styleElement = document.createElement('style');
  //     styleElement.innerHTML = `
  //         .sector-seleccionado {
  //             @apply fill-blue-500 opacity-70;
  //             animation: pulso 2s infinite;
  //         }

  //         @keyframes pulso {
  //             0% { opacity: 0.6; }
  //             50% { opacity: 0.8; }
  //             100% { opacity: 0.6; }
  //         }

  //         .tooltip-seleccionado {
  //             @apply bg-blue-500 text-white font-bold px-3 py-1 rounded shadow-md;
  //         }

  //         .tooltip-seleccionado::before {
  //             display: none;
  //         }

  //         /* Eliminar outlines */
  //         .leaflet-container *,
  //         .leaflet-interactive,
  //         .leaflet-pane * {
  //             outline: none !important;
  //             box-shadow: none !important;
  //         }
  //     `;
  //     document.head.appendChild(styleElement);

  //     return () => {
  //         document.head.removeChild(styleElement);
  //     };
  // }, []);

  const defaultSectorStyle = {
    fillColor: "#ffffff",
    weight: 2,
    opacity: 1,
    color: "gray",
    dashArray: "3",
    fillOpacity: 0.2,
  };

  const selectedSectorStyle = {
    fillColor: "#3b82f6", // Color blue-500 de Tailwind
    weight: 2,
    opacity: 1,
    color: "#1d4ed8", // Color blue-700 de Tailwind
    dashArray: "",
    fillOpacity: 0.7,
    className: "sector-seleccionado",
  };

  const style = (feature) => {
    return feature.properties && feature.properties.id === selectedSectorId
      ? selectedSectorStyle
      : defaultSectorStyle;
  };

  const onEachFeature = (feature, layer) => {
    const sectorName =
      feature.properties && feature.properties.name
        ? feature.properties.name
        : "Sector Desconocido";

    layer.bindTooltip(sectorName, {
      permanent: true,
      direction: "center",
      className: "my-tooltip",
    });

    layer.on({
      click: (e) => {
        const clickedLayer = e.target;
        // Add proper checks to ensure the ID exists
        if (
          clickedLayer.feature &&
          clickedLayer.feature.properties &&
          clickedLayer.feature.properties.id !== undefined
        ) {
          const clickedSectorId = clickedLayer.feature.properties.id;
          console.log("Clicked sector ID:", clickedSectorId);

          // Update state with the valid ID
          setSelectedSectorId(clickedSectorId);

          // If you have an onSectorSelect callback, call it with the sector info
          if (onSectorSelect && typeof onSectorSelect === "function") {
            const sectorName =
              clickedLayer.feature.properties.name || "Sector Desconocido";
            onSectorSelect(clickedSectorId, sectorName);
          }
        } else {
          console.warn("Clicked on a sector without a valid ID");
        }

        // Get the bounds of the hovered feature and zoom to it
        if (layer.getBounds) {
          const map = e.target._map;
          // Store the current zoom level to restore it on mouseout
          layer._previousZoom = map.getZoom();
          // Zoom to the bounds of the feature with a slight padding
          map.fitBounds(layer.getBounds(), {
            padding: [20, 20],
            maxZoom: 15, // Limit how far it can zoom in
            animate: true,
            duration: 1, // Animation duration in seconds
          });
        }
      },
      mouseover: (e) => {
        const layer = e.target;
        const layerId = layer.feature.properties.id;
        // if (layer.feature.properties.id !== selectedSectorId) {
        //   layer.setStyle({
        //     weight: 2,
        //     color: "#9ca3af",
        //     dashArray: "",
        //     fillColor: "#fbbf24",
        //     fillOpacity: 0.7,
        //   });
        //   if (!L.Browser.ie && L.Browser.chrome) {
        //     layer.bringToFront();
        //   }
        // }
        if (layerId !== selectedSectorId) {
          setHoveredSectorId(layerId);
        }
      },
      mouseout: (e) => {
        // const layer = e.target;
        // console.log(layer.feature.properties.id);
        // if (layer.feature.properties.id !== selectedSectorId) {
        //   layer.setStyle(defaultSectorStyle);
        // }
        // const layer = e.target;
        // // Add a check to ensure the property exists
        // if (
        //   layer.feature &&
        //   layer.feature.properties &&
        //   layer.feature.properties.id !== undefined
        // ) {
        //   console.log("Mouseout sector ID:", layer.feature.properties.id);
        //   console.log(selectedSectorId);
        //   // Only reset style if this is NOT the selected sector
        //   if (layer.feature.properties.id !== selectedSectorId) {
        //     layer.setStyle(defaultSectorStyle);
        //     console.log(layer.feature.properties.id !== selectedSectorId);
        //   } else {
        //     // Ensure the selected sector keeps its style
        //     console.log(layer.feature.properties.id !== selectedSectorId);
        //     layer.setStyle(selectedSectorStyle);
        //   }
        // }
      },
    });
  };

  useEffect(() => {
    console.log(selectedSectorId);
  }, [selectedSectorId]);

  // Effect para aplicar estilos cuando cambia el sector seleccionado
  // useEffect(() => {
  //     if (geojsonLayerRef.current) {
  //         geojsonLayerRef.current.eachLayer(layer => {
  //             // Aplica el estilo basado en si el ID de la capa coincide con el seleccionado
  //             const currentStyle = layer.feature.properties && layer.feature.properties.id === selectedSectorId
  //                 ? selectedSectorStyle
  //                 : defaultSectorStyle;
  //             layer.setStyle(currentStyle);

  //             // Añadir tooltip permanente al sector seleccionado
  //             if (layer.feature.properties && layer.feature.properties.id === selectedSectorId) {
  //                 // Obtener el nombre del sector
  //                 const sectorName = layer.feature.properties.name || 'Sector Seleccionado';

  //                 // Cerrar cualquier tooltip existente
  //                 if (layer.getTooltip()) {
  //                     layer.unbindTooltip();
  //                 }

  //                 // Crear una etiqueta permanente
  //                 layer.bindTooltip(sectorName, {
  //                     permanent: true,
  //                     direction: 'center',
  //                     className: 'tooltip-seleccionado'
  //                 }).openTooltip();

  //                 if (!L.Browser.ie && L.Browser.chrome) {
  //                     layer.bringToFront();
  //                 }
  //             } else {
  //                 // Para los demás sectores, asegurarse de que no tengan etiquetas permanentes
  //                 if (layer.getTooltip() && layer.getTooltip().options.permanent) {
  //                     layer.unbindTooltip();
  //                     // Restaurar el tooltip normal
  //                     const sectorName = layer.feature.properties.name || 'Sector Desconocido';
  //                     layer.bindTooltip(sectorName, {
  //                         permanent: false,
  //                         direction: 'center',
  //                         className: 'my-tooltip'
  //                     });
  //                 }
  //             }
  //         });
  //     }
  //     // Limpiar el texto del sector seleccionado al desmontar (opcional)
  //     return () => {
  //         const sectorInfoDiv = document.getElementById('selected-sector-info');
  //         if(sectorInfoDiv) {
  //             sectorInfoDiv.innerText = 'Sector seleccionado: Ninguno';
  //         }
  //     };
  // }, [selectedSectorId, geojsonData]); // Re-ejecutar si cambia la selección o los datos

  // Effect para actualizar el div de información cuando `selectedSectorId` cambie
  useEffect(() => {
    const sectorInfoDiv = document.getElementById("selected-sector-info");
    if (sectorInfoDiv && geojsonLayerRef.current && selectedSectorId !== null) {
      const selectedLayer = Object.values(geojsonLayerRef.current._layers).find(
        (layer) =>
          layer.feature.properties &&
          layer.feature.properties.id === selectedSectorId,
      );
      if (selectedLayer) {
        const sectorName =
          selectedLayer.feature.properties &&
          // Change this to match the property name you're using elsewhere
          (selectedLayer.feature.properties.name ||
            selectedLayer.feature.properties.nombre)
            ? selectedLayer.feature.properties.name ||
              selectedLayer.feature.properties.nombre
            : "Sector Desconocido";
        sectorInfoDiv.innerText = "Sector seleccionado: " + sectorName;
      } else {
        sectorInfoDiv.innerText =
          "Sector seleccionado: Desconocido (ID: " + selectedSectorId + ")";
      }
    } else if (sectorInfoDiv && selectedSectorId === null) {
      sectorInfoDiv.innerText = "Sector seleccionado: Ninguno";
    }
  }, [selectedSectorId]); // Re-ejecutar si cambia la selección

  // Coordenadas aproximadas para centrar el mapa en El Quisco
  const elQuiscoCoords = [-33.41, -71.65];
  const initialZoom = 13; // Ajusta el nivel de zoom inicial

  return (
    <div className="relative">
      <MapContainer
        center={elQuiscoCoords}
        zoom={initialZoom}
        scrollWheelZoom={true}
        className="h-[600px] w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Carga la capa GeoJSON con los sectores */}
        {geojsonData && (
          <GeoJSON
            ref={geojsonLayerRef}
            data={geojsonData}
            style={style}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
    </div>
  );
}
