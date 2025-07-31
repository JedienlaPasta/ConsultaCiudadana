"use client";

import {
  OptionAnswer,
  QuestionAnswer,
  QuestionOption,
  SubOption,
  SurveyQuestion,
} from "@/app/lib/definitions/encuesta";

type OptionSelectionListProps = {
  question: SurveyQuestion;
  selectedSectorId: string;
  onAnswerChange: (questionId: number, answer: QuestionAnswer) => void;
};

export default function OptionSelectionList({
  question,
  selectedSectorId,
  onAnswerChange,
}: OptionSelectionListProps) {
  const currentAnswer = question.answer;

  const handleOptionSelect = (optionId: number) => {
    const existingOptions = currentAnswer?.selected_options || [];
    const isSelected = existingOptions.some(
      (option) => option.option_id === optionId,
    );

    let newSelectedOptions: OptionAnswer[];

    if (isSelected) {
      // Remover opción
      newSelectedOptions = existingOptions.filter(
        (option) => option.option_id !== optionId,
      );
    } else {
      // Agregar opción (respetando maxOptions)
      if (existingOptions.length < question.maxOptions) {
        newSelectedOptions = [...existingOptions, { option_id: optionId }];
      } else {
        return; // No se puede agregar más opciones
      }
    }

    const newAnswer: QuestionAnswer = {
      question_id: question.id,
      selected_options: newSelectedOptions,
      sector_id: question.isMapQuestion ? currentAnswer?.sector_id : undefined,
    };

    onAnswerChange(question.id, newAnswer);
  };

  const handleSubOptionSelect = (
    optionId: number,
    subOptionId: number,
    subQuestionId?: number,
  ) => {
    if (!subQuestionId) return;

    const currentOptions = currentAnswer?.selected_options || [];
    const targetOption = currentOptions.find(
      (option) => option.option_id === optionId,
    );

    // Check if this sub-option is already selected
    const isSubOptionSelected = targetOption?.sub_option_id === subOptionId;

    let updatedOptions: OptionAnswer[];

    if (isSubOptionSelected) {
      // Remove sub-option (clear sub_option_id and sub_question_id)
      updatedOptions = currentOptions.map((option) =>
        option.option_id === optionId
          ? {
              ...option,
              sub_question_id: undefined,
              sub_option_id: undefined,
            }
          : option,
      );
    } else {
      // Add/update sub-option
      if (!targetOption?.sub_option_id) {
        updatedOptions = currentOptions.map((option) =>
          option.option_id === optionId
            ? {
                ...option,
                sub_question_id: subQuestionId,
                sub_option_id: subOptionId,
              }
            : option,
        );
      } else {
        return;
      }
    }

    const newAnswer: QuestionAnswer = {
      question_id: question.id,
      selected_options: updatedOptions,
      sector_id: currentAnswer?.sector_id,
    };

    onAnswerChange(question.id, newAnswer);
  };

  const getSelectedOptions = (): number[] => {
    return (
      currentAnswer?.selected_options?.map((opttion) => opttion.option_id) || []
    );
  };

  const getSelectedSubOption = (optionId: number): number | undefined => {
    const option = currentAnswer?.selected_options?.find(
      (option) => option.option_id === optionId,
    );
    return option?.sub_option_id;
  };

  const selectedOptions = getSelectedOptions();

  const getFilteredSubOptions = (parentOption: QuestionOption) => {
    const allSubOptions = parentOption.subOptions || [];

    const filteredOptions = allSubOptions.filter(
      (subOption) => subOption.sector === selectedSectorId,
    );

    // Si hay opciones para el sector seleccionado, mostrar solo esas
    // Si no hay opciones para el sector, mostrar todas
    const optionsToShow =
      filteredOptions.length > 0 ? filteredOptions : allSubOptions;

    return optionsToShow.map((subOption) => (
      <OptionItem
        option={subOption}
        key={subOption.option_name}
        isSelected={getSelectedSubOption(parentOption.id) === subOption.id}
        onSelect={() =>
          handleSubOptionSelect(
            parentOption.id,
            subOption.id,
            parentOption.subQuestionId,
          )
        }
      />
    ));
  };

  return (
    <div className="mt-4 space-y-4 md:mt-8">
      {/* Normal components */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-700">
          {question.question}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="inline-block h-3 w-3 rounded-full bg-blue-500"></span>
          <span>
            {selectedOptions.length}/{question.maxOptions} seleccionados
          </span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {question.options.map((option) => (
          <OptionItem
            option={option}
            key={option.option_name}
            isSelected={selectedOptions.includes(option.id)}
            onSelect={() => handleOptionSelect(option.id)}
          />
        ))}
      </div>

      {/* Conditionaly rendered subquestion if option is selected && hasSubQuestion */}
      {question.options.map(
        (option, index) =>
          option.subQuestion &&
          selectedOptions.includes(option.id) && (
            <div key={index} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-700">
                  {option.subQuestion}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="inline-block h-3 w-3 rounded-full bg-blue-500"></span>
                  <span>
                    {/* De momento solo 1 opcion por subpregunta */}
                    {getSelectedSubOption(option.id) ? "1" : "0"}/{1}{" "}
                    seleccionados
                  </span>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
                {getFilteredSubOptions(option)}
              </div>
            </div>
          ),
      )}
    </div>
  );
}

type OptionItemProps = {
  option: QuestionOption | SubOption;
  isSelected: boolean;
  onSelect: () => void;
};

function OptionItem({ option, isSelected, onSelect }: OptionItemProps) {
  return (
    <div
      onClick={onSelect}
      className={`group relative flex cursor-pointer flex-col rounded-lg border-2 px-4 py-3 transition-all duration-200 hover:border-blue-200 hover:shadow-md md:p-4 ${isSelected ? "!border-[#0F69C4] !bg-blue-50 shadow-md" : "border-gray-200"}`}
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

      <div className="flex items-center gap-2">
        <input
          type="radio"
          name={`option-${option.id}`}
          className="size-4 cursor-pointer accent-[#0F69C4]"
          checked={isSelected}
          onChange={onSelect}
        />
        <h5
          className={`font-medium group-hover:text-[#0F69C4] ${isSelected ? "text-[#0F69C4]" : "text-slate-700"}`}
        >
          {option.option_name}
        </h5>
      </div>

      {option.option_description ? (
        <p className="mt-1 line-clamp-2 text-xs text-gray-500">
          {option.option_description || ""}
        </p>
      ) : null}
    </div>
  );
}
