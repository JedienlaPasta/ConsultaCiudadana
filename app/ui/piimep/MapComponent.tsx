"use client";
import React, { useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON as RLGeoJSON,
  Polygon,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as GeoJSONType from "geojson";
import L from "leaflet";

export type MapComponentProps = {
  geojsonData: GeoJSONType.FeatureCollection;
  boundaryData: GeoJSONType.FeatureCollection;
  selectedSector: string | null;
  onSectorSelect: (sectorName: string) => void;
};

/**
 * Ajusta y restringe los bounds del mapa al límite comunal,
 * bloqueando el zoom out y evitando que se arrastre fuera.
 */
function BoundsUpdater({
  boundaryRef,
}: {
  boundaryRef: React.RefObject<L.GeoJSON | null>;
}) {
  const map = useMap();
  useEffect(() => {
    const layer = boundaryRef.current;
    if (!layer) return;
    const bounds = layer.getBounds();
    const padded = bounds.pad(0);

    // Ajusta vista y bloquea zoom out al nivel actual
    // Para pantallas móviles el maxZoom debiese ser 12 // Para pantallas de escritorio 13
    map.fitBounds(padded, { padding: [20, 20], maxZoom: 13 });
    map.setMinZoom(map.getZoom());

    // Fija max bounds y viscosidad para no permitir arrastrar fuera
    map.setMaxBounds(padded);
    map.options.maxBoundsViscosity = 1.0;

    // Dentro de estos bounds, evita salirse al arrastrar
    map.on("drag", () => map.panInsideBounds(padded, { animate: false }));
  }, [boundaryRef, map]);
  return null;
}

export default function MapComponent({
  geojsonData,
  boundaryData,
  selectedSector,
  onSectorSelect,
}: MapComponentProps) {
  const sectRef = useRef<L.GeoJSON>(null);
  const boundaryRef = useRef<L.GeoJSON>(null);

  // Rectángulo mundial como máscara externa
  const worldCoords: [number, number][] = [
    [-0, -180],
    [-90, 180],
    [90, 180],
    [90, -180],
  ];

  // Extraer anillos interiores (huecos) del geojson comunal
  const maskHoles = boundaryData.features.flatMap((feature) => {
    const geom = feature.geometry;
    let rings: number[][][] = [];
    if (geom.type === "Polygon") rings = geom.coordinates;
    else if (geom.type === "MultiPolygon") rings = geom.coordinates.flat();
    return rings.map((ring) =>
      ring.map(([lng, lat]) => [lat, lng] as [number, number]),
    );
  });

  // Estilos de los sectores
  const defaultStyle: L.PathOptions = {
    fillColor: "gray",
    weight: 2,
    opacity: 1,
    color: "#6b6f82",
    dashArray: "3",
    fillOpacity: 0.1,
  };
  const selectedStyle: L.PathOptions = {
    fillColor: "#88b0f2",
    weight: 2,
    opacity: 1,
    color: "#357bf0",
    fillOpacity: 0.3,
    className: "sector-seleccionado",
  };

  interface CustomPathLayer extends L.Path {
    isSelected: boolean;
  }

  // Eventos hover, mouseout y click en cada sector
  const onEachFeature = (
    feature: GeoJSONType.Feature,
    layer: CustomPathLayer,
  ) => {
    layer.isSelected = false;

    layer.on({
      mouseover: () => {
        if (!layer.isSelected) {
          layer.setStyle({
            color: "#ffdf69",
            fillColor: "#ede8d5",
            fillOpacity: 0.3,
            weight: 2,
            dashArray: "",
          });
          layer.bindTooltip(feature.properties?.ZONA || "Sector Desconocido", {
            permanent: true,
            direction: "center",
            className: "my-tooltip",
          });
          layer.bringToFront();
        }
      },
      mouseout: () => {
        layer.setStyle(layer.isSelected ? selectedStyle : defaultStyle);
        layer.bindTooltip(feature.properties?.ZONA || "Sector Desconocido", {
          permanent: false,
          direction: "center",
          className: "my-tooltip",
        });
      },
      click: () => {
        // Deseleccionar todos
        sectRef.current?.eachLayer((l) => {
          const layer = l as CustomPathLayer;
          layer.isSelected = false;
          layer.setStyle(defaultStyle);
        });
        // Seleccionar este sector
        layer.isSelected = true;
        layer.setStyle(selectedStyle);
        layer.bringToFront();
        onSectorSelect(
          feature.properties?.ZONA || "Ningún sector seleccionado",
        );
      },
    });
  };

  return (
    <MapContainer
      zoomAnimation={false}
      center={[-33.41, -71.65]}
      zoom={13}
      // minZoom={13}
      scrollWheelZoom
      //Para moviles w-[30rem] // escritorio w-[60rem]
      className="aspect-[4/3] w-full rounded-md outline-none"
    >
      <TileLayer
        noWrap
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Límite comunal */}
      <RLGeoJSON
        ref={boundaryRef}
        data={boundaryData}
        style={{ fillOpacity: 0, color: "#444", weight: 3 }}
      />

      {/* Sectores interactivos */}
      <RLGeoJSON
        ref={sectRef}
        data={geojsonData}
        style={(feature) =>
          feature?.properties.ZONA === selectedSector
            ? selectedStyle
            : defaultStyle
        }
        onEachFeature={onEachFeature}
      />

      {/* Máscara: capa que cubre todo menos el interior de la comuna */}
      <Polygon
        positions={[worldCoords, ...maskHoles]}
        pathOptions={{
          fillColor: "gray", // puede ser el color del fondo de tu app
          color: "#6b6f82",
          weight: 1,
          fillOpacity: 0.5,
          stroke: true,
          fillRule: "evenodd",
        }}
        interactive={false}
      />

      <BoundsUpdater boundaryRef={boundaryRef} />
    </MapContainer>
  );
}
