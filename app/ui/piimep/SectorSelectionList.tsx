"use client";

import { useState } from "react";

const sectores = [
  {
    id: "el-quisco-norte",
    nombre: "El Quisco Norte",
    descripcion:
      "Sector residencial al norte de la comuna, caracterizado por viviendas familiares y cercanía a servicios educacionales.",
    poblacion: "~2,300 hab.",
    area: "1.2 km²",
  },
  {
    id: "el-quisco-alto",
    nombre: "El Quisco Alto",
    descripcion:
      "Zona elevada con vista panorámica al océano, principalmente residencial con desarrollo inmobiliario reciente.",
    poblacion: "~1,500 hab.",
    area: "0.8 km²",
  },
  {
    id: "pinomar",
    nombre: "Pinomar",
    descripcion:
      "Sector costero conocido por sus pinares y proximidad a la playa, popular entre turistas y residentes.",
    poblacion: "~1,600 hab.",
    area: "0.6 km²",
  },
  {
    id: "quisco-centro-oriente",
    nombre: "Quisco Centro Oriente",
    descripcion:
      "Parte oriental del centro urbano, incluye servicios comerciales y administrativos principales de la comuna.",
    poblacion: "~1,500 hab.",
    area: "1.5 km²",
  },
  {
    id: "quisco-centro-poniente",
    nombre: "Quisco Centro Poniente",
    descripcion:
      "Sector occidental del centro, con acceso directo a la costanera y actividades turísticas.",
    poblacion: "~2,100 hab.",
    area: "1.3 km²",
  },
  {
    id: "quisco-sur-oriente",
    nombre: "Quisco Sur Oriente",
    descripcion:
      "Zona sur-oriental con desarrollo mixto residencial y comercial, en crecimiento urbano.",
    poblacion: "~1,100 hab.",
    area: "1.0 km²",
  },
  {
    id: "quisco-sur-poniente",
    nombre: "Quisco Sur Poniente",
    descripcion:
      "Sector sur-occidental con acceso a playas y servicios turísticos, popular en temporada estival.",
    poblacion: "~2,300 hab.",
    area: "0.9 km²",
  },
  {
    id: "el-totoral-bajo",
    nombre: "El Totoral Bajo",
    descripcion:
      "Zona costera baja del sector Totoral, caracterizada por su proximidad al mar y actividades pesqueras.",
    poblacion: "~400 hab.",
    area: "0.4 km²",
  },
  {
    id: "punta-de-tralca",
    nombre: "Punta de Tralca",
    descripcion:
      "Sector costero al sur de la comuna, conocido por sus formaciones rocosas y paisajes naturales.",
    poblacion: "~2.500 hab.",
    area: "0.7 km²",
  },
  {
    id: "isla-negra",
    nombre: "Isla Negra",
    descripcion:
      "Famoso sector costero, hogar de la casa museo de Pablo Neruda y destino turístico emblemático.",
    poblacion: "~1,300 hab.",
    area: "1.1 km²",
  },
  {
    id: "el-totoral-medio",
    nombre: "El Totoral Medio",
    descripcion:
      "Zona intermedia del sector Totoral, con desarrollo residencial y acceso a servicios básicos.",
    poblacion: "~500 hab.",
    area: "0.5 km²",
  },
  {
    id: "el-totoral-norte",
    nombre: "El Totoral Norte",
    descripcion:
      "Sector norte del área Totoral, principalmente residencial con crecimiento demográfico sostenido.",
    poblacion: "~200 hab.",
    area: "0.6 km²",
  },
  {
    id: "el-totoral",
    nombre: "El Totoral",
    descripcion:
      "Sector central del área Totoral, con servicios comunitarios y desarrollo urbano planificado.",
    poblacion: "~1,000 hab.",
    area: "0.5 km²",
  },
];

export default function SectorSelectionList() {
  const [selectedSectorId, setSelectedSectorId] = useState<string>("");

  const handleSectorSelect = (sectorId: string) => {
    setSelectedSectorId(sectorId);
    console.log(sectorId);
  };

  return (
    <div className="mt-6 space-y-4">
      <h5 className="font-medium text-slate-700">Seleccione un sector</h5>
      <div className="grid grid-cols-2 gap-4">
        {sectores.map((sector) => (
          <SectorItem
            sector={sector}
            key={sector.nombre}
            isSelected={sector.id === selectedSectorId}
            onSelect={handleSectorSelect}
          />
        ))}
      </div>
    </div>
  );
}

type Sector = {
  id: string;
  nombre: string;
  descripcion: string;
  poblacion: string;
  area: string;
};

type SectorItemProps = {
  sector: Sector;
  isSelected: boolean;
  onSelect: (sectorId: string) => void;
};

function SectorItem({ sector, isSelected, onSelect }: SectorItemProps) {
  return (
    <div
      onClick={() => onSelect(sector.id)}
      className={`flex h-16 cursor-pointer items-center gap-2.5 rounded-lg border-2 px-4 py-2 transition-all hover:border-gray-300 hover:shadow-md ${isSelected ? "!border-[#0F69C4] !bg-blue-50" : "border-gray-200"}`}
    >
      <input
        type="radio"
        name="sectorSelection"
        className="size-4 cursor-pointer"
        checked={isSelected}
        onChange={() => onSelect(sector.id)}
      />
      <span className="flex grow items-center justify-between">
        <h5 className="font-medium text-slate-700">{sector.nombre}</h5>
        {/* <p className="-mt-1 text-sm text-gray-500">{sector.descripcion}</p> */}
        <span className="flex">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-user"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg> */}
          <p className="text-xs font-medium text-gray-500">
            {sector.poblacion}
          </p>
        </span>
      </span>
    </div>
  );
}
