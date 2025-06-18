"use client";

const sectores = [
  {
    id: "EL QUISCO NORTE",
    nombre: "El Quisco Norte",
    descripcion:
      "Sector residencial al norte de la comuna, caracterizado por viviendas familiares y cercanía a servicios educacionales.",
    poblacion: "~2,300 hab.",
    area: "1.2 km²",
  },
  {
    id: "EL QUISCO ALTO",
    nombre: "El Quisco Alto",
    descripcion:
      "Zona elevada con vista panorámica al océano, principalmente residencial con desarrollo inmobiliario reciente.",
    poblacion: "~1,500 hab.",
    area: "0.8 km²",
  },
  {
    id: "PINOMAR",
    nombre: "Pinomar",
    descripcion:
      "Sector costero conocido por sus pinares y proximidad a la playa, popular entre turistas y residentes.",
    poblacion: "~1,600 hab.",
    area: "0.6 km²",
  },
  {
    id: "EL QUISCO CENTRO ORIENTE",
    nombre: "Quisco Centro Oriente",
    descripcion:
      "Parte oriental del centro urbano, incluye servicios comerciales y administrativos principales de la comuna.",
    poblacion: "~1,500 hab.",
    area: "1.5 km²",
  },
  {
    id: "EL QUISCO CENTRO PONIENTE",
    nombre: "Quisco Centro Poniente",
    descripcion:
      "Sector occidental del centro, con acceso directo a la costanera y actividades turísticas.",
    poblacion: "~2,100 hab.",
    area: "1.3 km²",
  },
  {
    id: "EL QUISCO SUR ORIENTE",
    nombre: "Quisco Sur Oriente",
    descripcion:
      "Zona sur-oriental con desarrollo mixto residencial y comercial, en crecimiento urbano.",
    poblacion: "~1,100 hab.",
    area: "1.0 km²",
  },
  {
    id: "EL QUISCO SUR PONIENTE",
    nombre: "Quisco Sur Poniente",
    descripcion:
      "Sector sur-occidental con acceso a playas y servicios turísticos, popular en temporada estival.",
    poblacion: "~2,300 hab.",
    area: "0.9 km²",
  },
  {
    id: "EL TOTORAL BAJO",
    nombre: "El Totoral Bajo",
    descripcion:
      "Zona costera baja del sector Totoral, caracterizada por su proximidad al mar y actividades pesqueras.",
    poblacion: "~400 hab.",
    area: "0.4 km²",
  },
  {
    id: "PUNTA DE TRALCA",
    nombre: "Punta de Tralca",
    descripcion:
      "Sector costero al sur de la comuna, conocido por sus formaciones rocosas y paisajes naturales.",
    poblacion: "~2.500 hab.",
    area: "0.7 km²",
  },
  {
    id: "ISLA NEGRA",
    nombre: "Isla Negra",
    descripcion:
      "Famoso sector costero, hogar de la casa museo de Pablo Neruda y destino turístico emblemático.",
    poblacion: "~1,300 hab.",
    area: "1.1 km²",
  },
  {
    id: "EL TOTORAL MEDIO",
    nombre: "El Totoral Medio",
    descripcion:
      "Zona intermedia del sector Totoral, con desarrollo residencial y acceso a servicios básicos.",
    poblacion: "~500 hab.",
    area: "0.5 km²",
  },
  {
    id: "EL TOTORAL NORTE",
    nombre: "El Totoral Norte",
    descripcion:
      "Sector norte del área Totoral, principalmente residencial con crecimiento demográfico sostenido.",
    poblacion: "~200 hab.",
    area: "0.6 km²",
  },
  {
    id: "EL TOTORAL",
    nombre: "El Totoral",
    descripcion:
      "Sector central del área Totoral, con servicios comunitarios y desarrollo urbano planificado.",
    poblacion: "~1,000 hab.",
    area: "0.5 km²",
  },
];

type SectorSelectionListProps = {
  selectedSector: string | null;
  setSelectedSector: (sector: string) => void;
};

export default function SectorSelectionList({
  selectedSector,
  setSelectedSector,
}: SectorSelectionListProps) {
  const handleSectorSelect = (sectorId: string) => {
    setSelectedSector(sectorId);
    console.log(sectorId);
  };

  return (
    <div className="mt-8 space-y-4">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col items-start justify-between">
          <h3 className="text-lg font-semibold text-slate-700">
            Seleccione un sector
          </h3>
          <p className="text-sm text-gray-500">
            Si no puedes usar el mapa, selecciona tu sector de la lista a
            continuación
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="inline-block h-3 w-3 rounded-full bg-blue-500"></span>
          Sector seleccionado
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sectores.map((sector) => (
          <SectorItem
            sector={sector}
            key={sector.nombre}
            isSelected={sector.id === selectedSector}
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
      className={`group relative flex cursor-pointer flex-col rounded-lg border-2 p-4 transition-all duration-200 hover:border-blue-200 hover:shadow-md ${isSelected ? "!border-[#0F69C4] !bg-blue-50 shadow-md" : "border-gray-200"}`}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-blue-500 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-4"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      <div className="mb-2 flex items-center gap-2">
        <input
          type="radio"
          name="sectorSelection"
          className="size-4 cursor-pointer accent-blue-500"
          checked={isSelected}
          onChange={() => onSelect(sector.id)}
        />
        <h5 className="font-medium text-slate-700 group-hover:text-blue-500">
          {sector.nombre}
        </h5>
      </div>

      {/* <p className="mb-2 text-xs text-gray-500 line-clamp-2">{sector.descripcion}</p> */}

      <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-3.5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
          <span className="font-medium">{sector.poblacion}</span>
        </div>

        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-3.5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <span className="font-medium">{sector.area}</span>
        </div>
      </div>
    </div>
  );
}
