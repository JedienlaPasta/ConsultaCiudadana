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
  const hasValidSelections = () => {
    if (!mapQuestion) {
      return questionsWithAnswers.length > 0;
    }
    return mapQuestion?.answer?.sector_id && questionsWithAnswers.length > 0;
  };

  return (
    <div className="space-y-8">
      {/* Header mejorado con gradiente */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-8 text-white shadow-xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="hidden size-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm md:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-3xl font-bold">Confirma tu Voto</h2>
              <p className="mt-1 text-blue-100">
                Revisa que toda la información sea correcta antes de enviar tu
                voto
              </p>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-white/10"></div>
        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-white/5"></div>
      </div>

      {/* Sector Selection Summary */}
      {selectedSector && (
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/70 p-6 shadow-lg transition-all duration-300 hover:shadow-xl">
          <div className="relative z-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">
                  Sector de Votación
                </h3>
                <p className="text-sm text-slate-600">
                  Tu área de participación seleccionada
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:scale-[1.01] hover:shadow-md">
              <div className="flex items-center">
                <div
                  className={`rounded-l-xls flex h-20 w-13 flex-shrink-0 items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 font-bold text-white shadow-lg`}
                >
                  1
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="text-lg font-semibold text-slate-700">
                    {selectedSector?.option_name}
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    <div className="py-0.5s flex items-center gap-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4 text-slate-500"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                      </svg>
                      <span className="text-xs font-medium text-slate-500">
                        {selectedSector.sector_population} habitantes
                      </span>
                    </div>
                    <div className="py-0.5s flex items-center gap-2 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="size-4 text-slate-500"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M3 7l6 -3l6 3l6 -3v13l-6 3l-6 -3l-6 3v-13" />
                        <path d="M9 4v13" />
                        <path d="M15 7v13" />
                      </svg>
                      <span className="text-xs font-medium text-slate-500">
                        {selectedSector.sector_area}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Questions Summary mejorado */}
      {questionsWithAnswers?.map((question, questionIndex) => {
        const selectedOptions = getSelectedOptionsForQuestion(question);
        const colors = [
          {
            bg: "from-emerald-500 to-emerald-600",
            accent: "emerald-500",
            icon: "emerald-600",
          },
          {
            bg: "from-purple-500 to-purple-600",
            accent: "purple-500",
            icon: "purple-600",
          },
          {
            bg: "from-orange-500 to-orange-600",
            accent: "orange-500",
            icon: "orange-600",
          },
          {
            bg: "from-teal-500 to-teal-600",
            accent: "teal-500",
            icon: "teal-600",
          },
        ];
        const colorScheme = colors[questionIndex % colors.length];

        return (
          <div
            key={question.id}
            className={`group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/70 p-6 shadow-lg transition-all duration-300 hover:shadow-xl`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            <div className="relative z-10">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${colorScheme.bg} shadow-lg`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800">
                      {question.step}
                    </h3>
                    <p className="text-sm text-slate-600">
                      Tus opciones seleccionadas
                    </p>
                  </div>
                </div>
                <div
                  className={`hidden rounded-2xl bg-gradient-to-br md:block ${colorScheme.bg} px-4 py-2 shadow-lg`}
                >
                  <span className="text-sm font-bold text-white">
                    {selectedOptions.length}/{question.maxOptions}
                  </span>
                </div>
              </div>

              {selectedOptions.length > 0 ? (
                <div className="space-y-3">
                  {selectedOptions.map((item, index) => {
                    if (!item) return null;

                    return (
                      <div
                        key={`${item.option.id}-${index}`}
                        className="group/item"
                      >
                        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 group-hover/item:scale-[1.01] hover:shadow-md">
                          <div className="flex items-center">
                            <div
                              className={`rounded-l-xls flex h-20 w-13 flex-shrink-0 items-center justify-center bg-gradient-to-br ${colorScheme.bg} font-bold text-white shadow-lg`}
                            >
                              {index + 1}
                            </div>
                            <div className="ml-4 flex-1">
                              <h4 className="text-lg font-semibold text-slate-700">
                                {item.subOption
                                  ? item.subOption.option_name
                                  : item.option.option_name}
                              </h4>
                              {(item.subOption?.option_description ||
                                item.option?.option_description) && (
                                <p className="mt-1 text-sm leading-relaxed text-slate-600">
                                  {item.subOption
                                    ? item.subOption.option_description
                                    : item.option.option_description}
                                </p>
                              )}
                            </div>
                            <div className="mr-4">
                              <div
                                className={`flex size-8 items-center justify-center rounded-full`}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`size-5 text-${colorScheme.icon}`}
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-white p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-red-800">
                        No has seleccionado opciones para esta pregunta
                      </p>
                      <p className="mt-1 text-sm text-red-600">
                        Selecciona al menos una opción para continuar
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Validation Message mejorado */}
      {!hasValidSelections() && (
        <div className="relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-6 shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <p className="text-lg font-bold text-amber-800">
                  Completa todas las selecciones
                </p>
                <p className="mt-1 text-sm text-amber-700">
                  Asegúrate de responder todas las preguntas antes de confirmar
                  tu voto
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
