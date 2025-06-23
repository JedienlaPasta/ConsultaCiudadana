import { Question } from "./SurveyLayout";

type VoteConfirmationOverviewProps = {
  selectedSectorId: string;
  selectedOptions: string[];
  selectedSubOption: string;
  questions: Question[];
};

export default function VoteConfirmationOverview({
  selectedSectorId,
  selectedOptions,
  selectedSubOption,
  questions,
}: VoteConfirmationOverviewProps) {
  // Get sector information
  const sectorQuestion = questions[0];
  const selectedSector = sectorQuestion.options.find(
    (option) => option.id === selectedSectorId,
  );

  // Get selected urban components
  const urbanComponentsQuestion = questions[1];
  const selectedComponents = urbanComponentsQuestion.options.filter((option) =>
    selectedOptions.includes(option.id),
  );

  // Get selected sub-option (Tramo conector) - Fixed type checking
  const tramoConectorOption = urbanComponentsQuestion.options
    .find((option) => option.options && option.options.length > 0)
    ?.options?.find((subOption) => subOption.id === selectedSubOption);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-left">
        <h2 className="mb-1 text-2xl font-bold text-[#23396f]">
          Confirma tu Voto
        </h2>
        <p className="text-sm text-gray-500 md:text-base">
          Revisa que toda la información sea correcta antes de enviar tu voto
        </p>
      </div>

      {/* Sector Selection Summary */}
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-[#23396f]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          Sector de Votación
        </h3>
        {selectedSector ? (
          <div className="rounded-lg border border-gray-300/70 bg-white p-3">
            <h4 className="font-medium text-gray-900">
              {selectedSector?.name}
            </h4>
            <div className="flex gap-4 text-xs text-gray-500">
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

                <span className="font-medium">{selectedSector.population}</span>
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
                <span className="font-medium">{selectedSector.area}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-md border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-600">
              ⚠️ No has seleccionado un sector
            </p>
          </div>
        )}
      </div>

      {/* Urban Components Summary */}
      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-[#23396f]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
          Componentes Urbanos Seleccionados
          <span className="text-sm font-normal text-gray-600">
            ({selectedComponents.length}/3)
          </span>
        </h3>

        {selectedComponents.length > 0 ? (
          <div className="space-y-2">
            {selectedComponents.map((component, index) => (
              <div
                key={component.id}
                className="rounded-lg border border-gray-300/70 bg-white p-3"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-600 text-sm font-medium text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {component.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {component.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Tramo Conector Sub-option */}
            {tramoConectorOption && (
              <div className="ml-4 rounded-lg border border-blue-200 bg-blue-50 p-3">
                <h5 className="mb-2 text-sm font-medium text-blue-900">
                  Tramo conector seleccionado:
                </h5>
                <p className="font-medium text-blue-800">
                  {tramoConectorOption.name}
                </p>
                <p className="text-sm text-blue-600">
                  {tramoConectorOption.description}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-md border border-red-200 bg-red-50 p-3">
            <p className="text-sm text-red-600">
              ⚠️ No has seleccionado componentes urbanos
            </p>
          </div>
        )}
      </div>

      {/* Validation Message */}
      {(!selectedSectorId || selectedComponents.length === 0) && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="font-medium text-yellow-800">
              Completa todas las selecciones antes de confirmar tu voto
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
