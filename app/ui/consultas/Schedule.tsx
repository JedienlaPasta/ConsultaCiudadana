import React from "react";

export default function Schedule() {
  return (
    <div>
      <h3 className="mb-2 text-lg font-semibold text-[#23396f]">Cronograma</h3>
      <div className="space-y-6">
        <div className="relative flex">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0A4C8A] text-sm font-bold text-white">
            1
          </div>
          <div className="ml-4">
            <h4 className="font-semibold text-[#0A4C8A]">
              Participación Ciudadana
            </h4>
            <p className="text-sm text-gray-600">
              Recolección de opiniones sobre espacios actuales y necesidades
            </p>
            <p className="mt-1 text-xs text-gray-500">Agosto 2025</p>
          </div>
          <div className="absolute top-10 left-[14px] h-[70%] w-[4px] rounded-full border-blue-400 bg-slate-300 sm:top-[38px]"></div>
        </div>
        <div className="relative flex">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0A4C8A] text-sm font-bold text-white">
            2
          </div>
          <div className="ml-4">
            <h4 className="font-semibold text-[#0A4C8A]">
              Análisis de Propuestas
            </h4>
            <p className="text-sm text-gray-600">
              Análisis de datos y desarrollo de nuevas opciones de diseño
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Agosto - Septiembre 2025
            </p>
          </div>
          <div className="absolute top-10 left-[14px] h-[70%] w-[4px] rounded-full border-blue-400 bg-slate-300 sm:top-[37px] md:top-[38px]"></div>
        </div>
        <div className="relative flex">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0A4C8A] text-sm font-bold text-white">
            3
          </div>
          <div className="ml-4">
            <h4 className="font-semibold text-[#0A4C8A]">Selección Final</h4>
            <p className="text-sm text-gray-600">
              Finalización de cambios basados en la retroalimentación
            </p>
            <p className="mt-1 text-xs text-gray-500">Septiembre 2025</p>
          </div>
          <div className="absolute top-10 left-[14px] h-[70%] w-[4px] rounded-full border-blue-400 bg-slate-300 sm:top-[37px] md:top-[38px]"></div>
        </div>
        <div className="flex">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#0A4C8A] text-sm font-bold text-white">
            4
          </div>
          <div className="ml-4">
            <h4 className="font-semibold text-[#0A4C8A]">Implementación</h4>
            <p className="text-sm text-gray-600">
              Despliegue de nuevas rutas y horarios
            </p>
            <p className="mt-1 text-xs text-gray-500">Octubre 2025</p>
          </div>
        </div>
      </div>
    </div>
  );
}
