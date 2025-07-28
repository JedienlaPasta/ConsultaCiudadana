import { SurveyQuestion } from "@/app/lib/definitions/encuesta";

type VoteConfirmationOverviewProps = {
  surveyQuestions: SurveyQuestion[];
};

export default function VoteConfirmationOverview({
  surveyQuestions,
}: VoteConfirmationOverviewProps) {
  // Helper function to get selected options for a question
  const getSelectedOptionsForQuestion = (question: SurveyQuestion) => {
    if (!question.answer?.selected_options) return [];

    return question.answer.selected_options
      .map((selectedOption) => {
        const option = question.options.find(
          (option) => option.id === selectedOption.option_id,
        );
        if (!option) return null;

        // If there's a sub-option selected, find it
        let subOption = null;
        if (selectedOption.sub_option_id) {
          subOption = option.subOptions?.find(
            (subOption) => subOption.id === selectedOption.sub_option_id,
          );
        }

        return {
          option,
          subOption,
        };
      })
      .filter(Boolean);
  };

  // Get sector information (map question)
  const mapQuestion = surveyQuestions?.find(
    (question) => question.isMapQuestion,
  );
  const selectedSector = mapQuestion?.answer?.sector_id
    ? mapQuestion.options.find(
        (option) => option.sector === mapQuestion.answer?.sector_id,
      )
    : null;

  // Get all questions with answers (excluding map questions)
  const questionsWithAnswers = surveyQuestions?.filter(
    (question) =>
      !question.isMapQuestion &&
      question.answer?.selected_options &&
      question.answer.selected_options.length > 0,
  );

  // Check if all required selections are made
  const hasValidSelections =
    mapQuestion?.answer?.sector_id && questionsWithAnswers.length > 0;

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
      {selectedSector && (
        <div className="rounded-lg border border-slate-300 bg-slate-200/60 p-4">
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

          <div className="relative overflow-hidden rounded-lg border border-gray-300/70 bg-white p-3">
            <span className="absolute top-0 left-0 flex h-full w-12 flex-shrink-0 items-center justify-center bg-blue-500 text-sm font-medium text-white">
              1
            </span>
            <div className="ml-12">
              <h4 className="font-medium text-gray-900">
                {selectedSector?.option_name}
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
                  <span className="font-medium">
                    {selectedSector.sector_population}
                  </span>
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
                  <span className="font-medium">
                    {selectedSector.sector_area}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Questions Summary */}
      {questionsWithAnswers?.map((question, questionIndex) => {
        const selectedOptions = getSelectedOptionsForQuestion(question);
        const colors = [
          {
            bg: "bg-emerald-500",
            border: "border-slate-300",
            bgSection: "bg-slate-200/60",
          },
          {
            bg: "bg-purple-500",
            border: "border-purple-300",
            bgSection: "bg-purple-200/60",
          },
          {
            bg: "bg-orange-500",
            border: "border-orange-300",
            bgSection: "bg-orange-200/60",
          },
          {
            bg: "bg-teal-500",
            border: "border-teal-300",
            bgSection: "bg-teal-200/60",
          },
        ];
        const colorScheme = colors[questionIndex % colors.length];

        return (
          <div
            key={question.id}
            className={`rounded-lg border ${colorScheme.border} ${colorScheme.bgSection} p-4`}
          >
            <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-[#23396f]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-emerald-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              {question.question}
              <span className="text-sm font-normal text-gray-600">
                ({selectedOptions.length}/{question.maxOptions})
              </span>
            </h3>

            {selectedOptions.length > 0 ? (
              <div className="space-y-2">
                {selectedOptions.map((item, index) => {
                  if (!item) return null;

                  return (
                    <div key={`${item.option.id}-${index}`}>
                      <div className="relative overflow-hidden rounded-lg border border-gray-300/70 bg-white p-3">
                        <span
                          className={`absolute top-0 left-0 flex h-full w-12 flex-shrink-0 items-center justify-center ${colorScheme.bg} text-sm font-medium text-white`}
                        >
                          {index + 1}
                        </span>
                        <div className="ml-12">
                          <h4 className="font-medium text-gray-900">
                            {/* Show sub-option name if available, otherwise show main option */}
                            {item.subOption
                              ? item.subOption.option_name
                              : item.option.option_name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {item.subOption
                              ? item.subOption.option_description ||
                                "No hay descripción"
                              : item.option.option_description ||
                                "No hay descripción"}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-md border border-red-200 bg-red-50 p-3">
                <p className="text-sm text-red-600">
                  ⚠️ No has seleccionado opciones para esta pregunta
                </p>
              </div>
            )}
          </div>
        );
      })}

      {/* Validation Message */}
      {!hasValidSelections && (
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
