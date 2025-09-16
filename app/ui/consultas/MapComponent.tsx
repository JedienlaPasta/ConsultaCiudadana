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
import ScrollWheelZoomController from "./ScrollWheelZoomController";

export type MapComponentProps = {
  geojsonData: GeoJSONType.FeatureCollection;
  boundaryData: GeoJSONType.FeatureCollection;
  linesData?: GeoJSONType.FeatureCollection;
  areasData?: GeoJSONType.FeatureCollection;
  routesData?: GeoJSONType.FeatureCollection;
  selectedSector?: string | null;
  selectedComponent?: string[];
  onSectorSelect?: (sectorName: string) => void;
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
    const padded = bounds.pad(0.03);

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
  linesData,
  areasData,
  routesData,
  selectedSector,
  selectedComponent,
  onSectorSelect,
}: MapComponentProps) {
  const sectRef = useRef<L.GeoJSON>(null);
  const boundaryRef = useRef<L.GeoJSON>(null);

  // Function to update layer selection state
  interface CustomPathLayer extends L.Path {
    isSelected: boolean;
    feature?: GeoJSONType.Feature;
  }

  // Then use it without type casting:
  const updateLayerSelection = () => {
    if (!sectRef.current) return;

    sectRef.current.eachLayer((layer) => {
      const customLayer = layer as CustomPathLayer;
      const feature = customLayer.feature;

      if (feature?.properties?.ZONA === selectedSector) {
        customLayer.isSelected = true;
        customLayer.setStyle(selectedStyle);
        customLayer.bringToFront();
      } else {
        customLayer.isSelected = false;
        customLayer.setStyle(defaultStyle);
      }
    });
  };

  // Update layers when selectedSector prop changes
  useEffect(() => {
    updateLayerSelection();

    // Makes sure selected sector is on top after render
    setTimeout(() => {
      if (!sectRef.current || !selectedSector) return;

      sectRef.current.eachLayer((layer) => {
        const customLayer = layer as CustomPathLayer;
        const feature = customLayer.feature;

        if (
          feature?.properties?.ZONA === selectedSector &&
          customLayer.isSelected
        ) {
          customLayer.bringToFront();
        }
      });
    }, 100);
  }, [selectedSector]);

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
    weight: 1,
    opacity: 1,
    color: "#6b6f82",
    dashArray: "3",
    fillOpacity: 0.1,
  };
  const selectedStyle: L.PathOptions = {
    fillColor: "#88b0f2",
    weight: 4,
    opacity: 1,
    color: "#357bf0",
    fillOpacity: 0.3,
    dashArray: "",
    className: "sector-seleccionado",
  };

  // Estilos para modo no interactivo
  const nonInteractiveStyle: L.PathOptions = {
    fillColor: "#f8f9fa",
    weight: 1,
    opacity: 0.5,
    color: "#dee2e6",
    fillOpacity: 0.3,
    dashArray: "2,4",
  };

  const getStyle = (feature?: GeoJSONType.Feature) => {
    if (!feature) return defaultStyle;
    if (linesData || areasData || routesData) {
      if (feature.properties?.ZONA === selectedSector) {
        return selectedStyle;
      }
      return nonInteractiveStyle;
    }

    if (feature.properties?.ZONA === selectedSector) {
      return selectedStyle;
    }
    return defaultStyle;
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

    // Set initial selection state when layer is added
    if (feature.properties?.ZONA === selectedSector) {
      layer.isSelected = true;
      layer.setStyle(selectedStyle);
      layer.bringToFront();
    }

    if (!linesData) {
      layer.on({
        mouseover: () => {
          if (!layer.isSelected) {
            layer.setStyle({
              color: "#ffdf69",
              fillColor: "#ede8d5",
              fillOpacity: 0.3,
              weight: 4,
              dashArray: "",
            });
            layer.bindTooltip(
              feature.properties?.ZONA || "Sector Desconocido",
              {
                permanent: true,
                direction: "center",
                className: "my-tooltip",
                offset: [0, 0],
                opacity: 0.8,
                interactive: false,
              },
            );

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
          if (onSectorSelect) {
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
            setTimeout(() => {
              if (layer.getTooltip()) {
                layer.closeTooltip();
              }
            }, 1500);
          }
        },
      });
    }
  };

  const getSelectedComponentColors = () => {
    const colors = [
      "#9d46fa",
      "#206ef5",
      "#00d681",
      "#f04a5e",
      "#298f7a",
      "#fff833",
      "#272d33",
      "#ff4dff",
    ];

    // Array con todas las opciones posibles en orden fijo
    const allPossibleOptions = [
      "ruta piimep",
      "peatonalización permanente",
      "peatonalización temporal",
      "sentido de tránsito",
      "cruce piimep dubornais",
      "ciclovía táctica",
      "eliminación estacionamiento",
      "sendero quebrada",
    ];

    const colorMap: { [key: string]: string } = {};

    // Asignar colores fijos basados en la posición en el array
    allPossibleOptions.forEach((option, index) => {
      colorMap[option.toLowerCase()] = colors[index % colors.length];
    });

    // Para las subopciones de "tramo conector", usar el mismo color base
    selectedComponent?.forEach((component) => {
      if (component.toLowerCase().includes("ruta piimep")) {
        colorMap[component.toLowerCase()] = colorMap["ruta piimep"];
      }
    });

    return colorMap;
  };

  const componentColors = getSelectedComponentColors();

  return (
    <MapContainer
      zoomAnimation={false}
      center={[-33.41, -71.65]}
      zoom={13}
      // minZoom={13}
      scrollWheelZoom
      //Para moviles w-[30rem] // escritorio w-[60rem]
      className="relative h-full w-full rounded-md outline-none"
    >
      <TileLayer
        noWrap
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ScrollWheelZoomController />

      {false && (
        <div className="absolute top-3 left-14 z-[1000] rounded-lg border border-blue-300 bg-blue-100 px-3 py-2 shadow-md">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <span className="text-sm font-medium text-blue-700">
              Mapa informativo - Selecciona componentes abajo
            </span>
          </div>
        </div>
      )}

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
        style={(feature) => getStyle(feature)}
        onEachFeature={onEachFeature}
      />

      {false && (
        <div className="absolute bottom-4 left-1/2 z-[1000] -translate-x-1/2 transform rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 shadow-md">
          <p className="text-center text-sm text-amber-800">
            💡 Este mapa solo muestra los componentes que selecciones.
          </p>
          <p className="text-center text-xs text-rose-700/80">
            Ten en cuenta que solo se consideran las mejoras dentro del sector
            que seleccionaste.
          </p>
        </div>
      )}

      {linesData && (
        <RLGeoJSON
          key={selectedComponent?.join(",") + "lines"}
          data={
            {
              ...linesData,
              features: linesData.features.filter((feature) =>
                selectedComponent?.some((component) => {
                  if (component.toLowerCase().includes("tramo conector")) {
                    return false;
                  } else {
                    return (
                      feature.properties?.TIPO?.toString().toLowerCase() ===
                      component.toLowerCase()
                    );
                  }
                }),
              ),
            } as GeoJSONType.FeatureCollection
          }
          style={(feature) => {
            const componentName =
              feature?.properties?.TIPO?.toString().toLowerCase() || "default";
            console.log(selectedComponent);

            const matchedComponent = selectedComponent?.find((component) =>
              component.toLowerCase().includes(componentName),
            );
            return {
              color: matchedComponent
                ? componentColors[matchedComponent.toLowerCase()]
                : "#8B4513",
              weight: 6,
            };
          }}
        />
      )}
      {/* {linesData && (
        <RLGeoJSON
          key={selectedComponent?.join(",") + "lines"}
          data={
            {
              ...linesData,
              features: linesData.features.filter((feature) =>
                selectedComponent?.some((component) => {
                  if (component.toLowerCase().includes("tramo conector")) {
                    const tramo = component
                      .toLowerCase()
                      .replace("tramo conector", "")
                      .trim();

                    const isTramo =
                      feature.properties?.TIPO?.toString().toLowerCase() ===
                        "tramo conector" &&
                      feature.properties?.NOMBRE?.toString().toLowerCase() ===
                        tramo;

                    return isTramo;
                  } else {
                    return (
                      feature.properties?.TIPO?.toString().toLowerCase() ===
                      component.toLowerCase()
                    );
                  }
                }),
              ),
            } as GeoJSONType.FeatureCollection
          }
          style={(feature) => {
            const componentName =
              feature?.properties?.TIPO?.toString().toLowerCase() || "default";
            console.log(selectedComponent);

            const matchedComponent = selectedComponent?.find((component) =>
              component.toLowerCase().includes(componentName),
            );
            return {
              color: matchedComponent
                ? componentColors[matchedComponent.toLowerCase()]
                : "#8B4513",
              weight: 5,
            };
          }}
        />
      )} */}
      {routesData && (
        <RLGeoJSON
          key={selectedComponent?.join(",") + "routes"}
          data={
            {
              ...routesData,
              features: routesData.features.filter((feature) =>
                selectedComponent?.some((component) => {
                  if (component.toLowerCase().includes("ruta piimep")) {
                    const tramo = component
                      .toLowerCase()
                      .replace("ruta piimep", "")
                      .trim();

                    const isTramo =
                      feature.properties?.TIPO?.toString().toLowerCase() ===
                        "ruta piimep" &&
                      feature.properties?.NOMBRE?.toString().toLowerCase() ===
                        tramo;

                    return isTramo;
                  }
                }),
              ),
            } as GeoJSONType.FeatureCollection
          }
          style={(feature) => {
            const componentName =
              feature?.properties?.TIPO?.toString().toLowerCase() || "default";
            console.log(selectedComponent);

            const matchedComponent = selectedComponent?.find((component) =>
              component.toLowerCase().includes(componentName),
            );
            return {
              color: matchedComponent
                ? componentColors[matchedComponent.toLowerCase()]
                : "#8B4513",
              weight: 6,
            };
          }}
        />
      )}
      {areasData && (
        <RLGeoJSON
          key={selectedComponent?.join(",") + "areas"}
          data={
            {
              ...areasData,
              features: areasData.features.filter((feature) =>
                selectedComponent?.some(
                  (component) =>
                    feature.properties?.Tipo?.toString().toLowerCase() ===
                    component.toLowerCase(),
                ),
              ),
            } as GeoJSONType.FeatureCollection
          }
          style={(feature) => {
            const componentName =
              feature?.properties?.Tipo?.toString().toLowerCase() || "default";
            const matchedComponent = selectedComponent?.find(
              (comp) => comp.toLowerCase() === componentName,
            );
            return {
              color: matchedComponent
                ? componentColors[matchedComponent.toLowerCase()]
                : "#8B4513",
              weight: 6,
            };
          }}
        />
      )}

      {/* Máscara: capa que cubre todo menos el interior de la comuna */}
      <Polygon
        positions={[worldCoords, ...maskHoles]}
        pathOptions={{
          fillColor: "black",
          color: "#6b6f82",
          weight: 3,
          fillOpacity: 0.55,
          stroke: true,
          fillRule: "evenodd",
        }}
        interactive={false}
      />

      <BoundsUpdater boundaryRef={boundaryRef} />
    </MapContainer>
  );
}
