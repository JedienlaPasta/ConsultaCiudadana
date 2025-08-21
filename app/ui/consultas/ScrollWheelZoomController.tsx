"use client";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function ScrollWheelZoomController() {
  const map = useMap();

  useEffect(() => {
    let isAtMinZoom = false;
    let isMouseOverMap = false;
    let scrollTimeout: NodeJS.Timeout | null = null;

    const checkZoomLevel = () => {
      const currentZoom = map.getZoom();
      const minZoom = map.getMinZoom();
      isAtMinZoom = currentZoom <= minZoom;
    };

    // Verificar el nivel de zoom inicialmente y en cada cambio
    checkZoomLevel();
    map.on("zoomend", checkZoomLevel);

    const handleMouseEnter = () => {
      isMouseOverMap = true;
    };

    const handleMouseLeave = () => {
      isMouseOverMap = false;
      // Limpiar cualquier timeout pendiente cuando el mouse sale del mapa
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
        scrollTimeout = null;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Si estamos en zoom mínimo y se intenta hacer zoom out
      if (isAtMinZoom && e.deltaY > 0) {
        // Deshabilitar el scroll wheel zoom del mapa
        map.scrollWheelZoom.disable();

        // Limpiar timeout anterior si existe
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }

        // Re-habilitar solo si el mouse sigue sobre el mapa
        scrollTimeout = setTimeout(() => {
          if (map.scrollWheelZoom && isMouseOverMap) {
            map.scrollWheelZoom.enable();
          }
          scrollTimeout = null;
        }, 100);

        return true;
      }
    };

    const mapContainer = map.getContainer();

    // Agregar event listeners
    mapContainer.addEventListener("mouseenter", handleMouseEnter);
    mapContainer.addEventListener("mouseleave", handleMouseLeave);
    mapContainer.addEventListener("wheel", handleWheel, {
      passive: true,
      capture: true,
    });

    return () => {
      // Cleanup
      map.off("zoomend", checkZoomLevel);
      mapContainer.removeEventListener("mouseenter", handleMouseEnter);
      mapContainer.removeEventListener("mouseleave", handleMouseLeave);
      mapContainer.removeEventListener("wheel", handleWheel, { capture: true });

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [map]);

  return null;
}
