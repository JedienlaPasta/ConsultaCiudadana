"use client";

import {
  Question,
  QuestionOption,
  SubOption,
} from "@/app/lib/definitions/encuesta";

type OptionSelectionListProps = {
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
  selectedSubOption: string;
  setSelectedSubOption: (subOption: string) => void;
  question: Question;
  selectedSectorId: string;
};

export default function OptionSelectionList({
  selectedOptions,
  setSelectedOptions,
  selectedSubOption,
  setSelectedSubOption,
  question,
  selectedSectorId,
}: OptionSelectionListProps) {
  // const isTramoConectorSelected = selectedOptions.some(
  //   (option) => option === "1",
  // );

  const handleOptionSelect = (optionId: string) => {
    // Check if the option is already selected
    if (selectedOptions.includes(optionId)) {
      // If selected, remove it
      setSelectedOptions(selectedOptions.filter((id) => id !== optionId));
      if (optionId === "1") {
        setSelectedSubOption("");
      }
    } else {
      if (selectedOptions.length < 3) {
        setSelectedOptions([...selectedOptions, optionId]);
      }
    }
  };

  const getSubOptions = () => {
    const allSubOptions =
      question.options.find((option) => option.subOptions)?.subOptions || [];

    const filteredOptions = allSubOptions.filter(
      (option) => option.sector_id === selectedSectorId,
    );

    // Si hay opciones para el sector seleccionado, mostrar solo esas
    // Si no hay opciones para el sector, mostrar todas
    const optionsToShow =
      filteredOptions.length > 0 ? filteredOptions : allSubOptions;

    return optionsToShow.map((option) => (
      <OptionItem
        option={option}
        key={option.option_name}
        isSelected={selectedSubOption === option.id}
        onSelect={() => setSelectedSubOption(option.id)}
      />
    ));
  };

  const subOptions = getSubOptions();

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
            isSelected={selectedOptions.includes(String(option.id))}
            onSelect={handleOptionSelect}
          />
        ))}
      </div>

      {/* Conditionaly rendered for Tramo conector */}
      {question.options[0].subQuestion && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-700">
              {question.options[0].subQuestion}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="inline-block h-3 w-3 rounded-full bg-blue-500"></span>
              <span>
                {selectedSubOption ? "1" : "0"}/{question.maxOptions}{" "}
                seleccionados
              </span>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {subOptions}
          </div>
        </div>
      )}
    </div>
  );
}

type OptionItemProps = {
  option: QuestionOption | SubOption;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
};

function OptionItem({ option, isSelected, onSelect }: OptionItemProps) {
  return (
    <div
      onClick={() => onSelect(String(option.id))}
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
          onChange={() => onSelect(String(option.id))}
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
