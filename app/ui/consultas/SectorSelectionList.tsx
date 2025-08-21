"use client";

import { SurveyQuestion } from "@/app/lib/definitions/encuesta";

type SectorSelectionListProps = {
  selectedSector: string | null;
  setSelectedSector: (sector: string) => void;
  sectoresSurveyList: SurveyQuestion;
};

export default function SectorSelectionList({
  selectedSector,
  setSelectedSector,
  sectoresSurveyList,
}: SectorSelectionListProps) {
  const handleSectorSelect = (sectorId: string) => {
    setSelectedSector(sectorId);
  };

  return (
    <div className="mt-4 space-y-4 md:mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-700">
          Seleccione un sector
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="inline-block h-3 w-3 rounded-full bg-blue-500"></span>
          Sector seleccionado
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {sectoresSurveyList.options.map((sector) => (
          <SectorItem
            sector={sector}
            key={sector.option_name}
            isSelected={String(sector.sector) === selectedSector}
            onSelect={handleSectorSelect}
          />
        ))}
      </div>
    </div>
  );
}

type Sector = {
  option_name: string;
  sector: string | null;
  sector_population?: string;
  sector_area?: string;
};

type SectorItemProps = {
  sector: Sector;
  isSelected: boolean;
  onSelect: (sectorId: string) => void;
};

function SectorItem({ sector, isSelected, onSelect }: SectorItemProps) {
  return (
    <div
      onClick={() => onSelect(sector?.sector || "")}
      className={`group md:p-4s relative flex cursor-pointer flex-col rounded-lg border px-4 py-3 transition-all duration-200 select-none hover:border-blue-200 hover:shadow-md ${isSelected ? "!border-[#0F69C4] !bg-blue-50 shadow-md" : "border-gray-200"}`}
    >
      {isSelected && (
        <div className="bg-blue-500s absolute top-2 right-2 flex size-6 items-center justify-center rounded-full border-2 border-[#0F69C4] text-[#0F69C4]">
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

      <div className="mb-1 flex items-center gap-2">
        <input
          type="radio"
          name="sectorSelection"
          className="size-4 cursor-pointer accent-[#0F69C4]"
          checked={isSelected}
          onChange={() => onSelect(sector?.sector || "")}
        />
        <h5
          className={`font-medium group-hover:text-[#0F69C4] ${isSelected ? "text-[#0F69C4]" : "text-slate-700"}`}
        >
          {sector.option_name}
        </h5>
      </div>

      {/* <p className="mb-2 text-xs text-gray-500 line-clamp-2">{sector.descripcion}</p> */}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-3.5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          </svg>
          <p>Población:</p>

          <span className="font-medium">{sector?.sector_population || ""}</span>
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
          <span className="font-medium">{sector?.sector_area || ""}</span>
        </div>
      </div>
    </div>
  );
}
