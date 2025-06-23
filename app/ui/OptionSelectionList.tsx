"use client";

import { Question } from "./SurveyLayout";

type OptionSelectionListProps = {
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
  selectedSubOption: string;
  setSelectedSubOption: (subOption: string) => void;
  question: Question;
};

export default function OptionSelectionList({
  selectedOptions,
  setSelectedOptions,
  selectedSubOption,
  setSelectedSubOption,
  question,
}: OptionSelectionListProps) {
  const isTramoConectorSelected = selectedOptions.some(
    (option) => option === "1",
  );

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
            {selectedOptions.length}/{question.answers} seleccionados
          </span>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
        {question.options.map((option) => (
          <OptionItem
            option={option}
            key={option.name}
            isSelected={selectedOptions.includes(option.id)}
            onSelect={handleOptionSelect}
          />
        ))}
      </div>

      {/* Conditionaly rendered for Tramo conector */}
      {isTramoConectorSelected && question.step === "Componentes urbanos" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-700">
              {question.options[0].question}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="inline-block h-3 w-3 rounded-full bg-blue-500"></span>
              <span>
                {selectedSubOption ? "1" : "0"}/{question.options[0].answers}{" "}
                seleccionados
              </span>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {/* Arreglar esto, solo debiese elegir 1 opcion y por separado del optionSelect state */}
            {question.options
              .find((option) => option.options)
              ?.options?.map((option) => (
                <OptionItem
                  option={option}
                  key={option.name}
                  isSelected={selectedSubOption === option.id}
                  onSelect={() => setSelectedSubOption(option.id)}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

type Option = {
  id: string;
  name: string;
  description?: string;
};

type OptionItemProps = {
  option: Option;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
};

function OptionItem({ option, isSelected, onSelect }: OptionItemProps) {
  return (
    <div
      onClick={() => onSelect(option.id)}
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

      <div className="mb-1 flex items-center gap-2">
        <input
          type="radio"
          name={`option-${option.id}`}
          className="size-4 cursor-pointer accent-[#0F69C4]"
          checked={isSelected}
          onChange={() => onSelect(option.id)}
        />
        <h5 className="font-medium text-slate-700 group-hover:text-blue-700">
          {option.name}
        </h5>
      </div>

      <p className="line-clamp-2 text-xs text-gray-500">{option.description}</p>
    </div>
  );
}
