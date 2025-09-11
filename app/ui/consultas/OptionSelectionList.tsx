"use client";

import {
  OptionAnswer,
  QuestionAnswer,
  QuestionOption,
  SubOption,
  SurveyQuestion,
} from "@/app/lib/definitions/encuesta";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import RexLoader from "../RexAnimation";
import InfoModal from "./InfoModal";

const DynamicMapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false, // Desactiva el Server-Side Rendering para este componente
});

const sectoresPath = "/output-buffer.geojson";
const comunaPath = "/output-limite.geojson";
const linesPath = "/lines.geojson";
const areaPath = "/areas.geojson";

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
  const [sectores, setSectores] = useState(null);
  const [comuna, setComuna] = useState(null);
  const [lines, setLines] = useState(null);
  const [area, setArea] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [selectedComponent, setSelectedComponent] = useState<string[]>([]);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  const [lastSelectedOptionWithSuboption, setLastSelectedOptionWithSuboption] =
    useState<string>("");

  // useEffect para restaurar selectedComponent desde question.answer
  useEffect(() => {
    if (currentAnswer?.selected_options) {
      const selectedComponentNames = currentAnswer.selected_options
        .filter((selectedOption) => !selectedOption.sub_option_id) // Solo opciones principales
        .map((selectedOption) => {
          const option = question.options.find(
            (option) => option.id === selectedOption.option_id,
          );
          return option?.option_name || "";
        })
        .filter((name) => name !== "");

      // Obtener subopciones seleccionadas
      const selectedSubComponents = currentAnswer.selected_options
        .filter((selectedOption) => selectedOption.sub_option_id)
        .map((selectedOption) => {
          const option = question.options
            .flatMap((option) => option.subOptions || [])
            .find((subOption) => subOption.id === selectedOption.sub_option_id);
          return option?.option_name || "";
        })
        .filter((name) => name !== "");

      // Combinar ambos tipos de componentes
      const allComponents = [
        ...selectedComponentNames,
        ...selectedSubComponents,
      ];
      setSelectedComponent(allComponents);
    } else {
      setSelectedComponent([]);
    }
  }, [question.answer, question.options]); // Dependencias: cuando cambie la respuesta o las opciones

  useEffect(() => {
    Promise.all([
      fetch(sectoresPath).then((response) => response.json()),
      fetch(comunaPath).then((response) => response.json()),
      fetch(linesPath).then((response) => response.json()),
      fetch(areaPath).then((response) => response.json()),
    ])
      .then(([sectoresData, comunaData, linesData, areaData]) => {
        setSectores(sectoresData);
        setComuna(comunaData);
        setLines(linesData);
        setArea(areaData);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        console.error("Error al cargar los GeoJSON:", err);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }, []);

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

        const selectedOption = question.options.find(
          (option) => option.id === optionId,
        );
        if (selectedOption?.hasSubQuestion) {
          setLastSelectedOptionWithSuboption(selectedOption.option_name);
          setShowInfoModal(true);
        }
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

    const selectedComponentNames = newSelectedOptions
      .filter((selectedOption) => !selectedOption.sub_option_id) // Solo opciones principales
      .map((selectedOption) => {
        const option = question.options.find(
          (option) => option.id === selectedOption.option_id,
        );
        return option?.option_name || "";
      })
      .filter((name) => name !== "");

    // Obtener subopciones seleccionadas
    const selectedSubComponents = newSelectedOptions
      .filter((selectedOption) => selectedOption.sub_option_id)
      .map((selectedOption) => {
        const option = question.options
          .flatMap((option) => option.subOptions || [])
          .find((subOption) => subOption.id === selectedOption.sub_option_id);
        return option?.option_name || "";
      })
      .filter((name) => name !== "");

    // Combinar ambos tipos de componentes
    const allComponents = [...selectedComponentNames, ...selectedSubComponents];
    setSelectedComponent(allComponents);
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
      // Add/update sub-option - SIEMPRE permitir la actualización
      updatedOptions = currentOptions.map((option) =>
        option.option_id === optionId
          ? {
              ...option,
              sub_question_id: subQuestionId,
              sub_option_id: subOptionId,
            }
          : option,
      );
    }

    const newAnswer: QuestionAnswer = {
      question_id: question.id,
      selected_options: updatedOptions,
      sector_id: currentAnswer?.sector_id,
    };

    onAnswerChange(question.id, newAnswer);

    const selectedSubComponentName = updatedOptions
      .filter((selectedOption) => selectedOption.sub_option_id) // Solo opciones con subopciones
      .map((selectedOption) => {
        const option = question.options
          .flatMap((option) => option.subOptions || [])
          .find((subOption) => subOption.id === selectedOption.sub_option_id);
        return option?.option_name || "";
      })
      .filter((name) => name !== "");

    // Obtener componentes principales seleccionados
    const selectedMainComponents = updatedOptions
      .filter((selectedOption) => !selectedOption.sub_option_id) // Solo opciones principales
      .map((selectedOption) => {
        const option = question.options.find(
          (option) => option.id === selectedOption.option_id,
        );
        return option?.option_name || "";
      })
      .filter((name) => name !== "");

    // Combinar componentes principales y subopciones
    const allSelectedComponents = [
      ...selectedMainComponents,
      ...selectedSubComponentName,
    ];
    setSelectedComponent(allSelectedComponents);
    selectedComponent.push(...selectedSubComponentName);
  };

  const getSelectedOptions = (): number[] => {
    return (
      currentAnswer?.selected_options?.map((option) => option.option_id) || []
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

  const handleModalClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowInfoModal(false);
  };

  return (
    <div className="space-y-4">
      <InfoModal
        show={showInfoModal}
        option={lastSelectedOptionWithSuboption}
        onClose={handleModalClose}
      />

      {loading && (
        <div className="shadow-mds flex aspect-[4/3] items-center justify-center rounded-lg bg-gray-100 p-4 md:aspect-[16/8]">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-gray-200">
            <div className="flex flex-col items-center gap-1 rounded-lg bg-white px-4 py-5 md:gap-2 md:px-10 md:py-8">
              <RexLoader />
              <p className="animate-pulse text-sm text-slate-500">
                Cargando mapa y sectores...
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-lg bg-red-50 p-6 shadow-md">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-3 h-6 w-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-red-700">
              Error al cargar el mapa o los sectores:{" "}
              {error instanceof Error ? error.message : String(error)}
            </p>
          </div>
        </div>
      )}
      {!loading && !error && sectores && comuna && lines && area && (
        <div className="relative aspect-[4/3] h-fit overflow-hidden rounded-lg bg-gray-100 shadow-md shadow-gray-200/80 md:aspect-[16/8]">
          <div className="absolute top-2 right-2 z-[1000] flex flex-col rounded-md bg-white px-2 py-1.5 shadow-lg md:top-5 md:right-5 md:space-y-1">
            {/* <h5 className="text-xs md:text-sm">Leyenda</h5> */}
            <div className="flex items-center gap-1">
              <span className="size-3.5 rounded bg-[#357bf0]"></span>
              <p className="text-[10px] text-gray-500 md:text-xs">
                Sector seleccionado
              </p>
            </div>
          </div>
          <DynamicMapComponent
            geojsonData={sectores}
            boundaryData={comuna}
            linesData={lines}
            areasData={area}
            selectedSector={selectedSectorId}
            selectedComponent={selectedComponent}
          />
        </div>
      )}

      {/* Normal components */}
      <div className="rounded-xl border border-slate-200/80 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 p-6">
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
        <span className="inline-flex flex-wrap items-center gap-1 text-sm text-slate-500">
          {question.question_description}{" "}
        </span>

        <div className="mt-4 grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
          {question.options.map((option) => (
            <OptionItem
              option={option}
              key={option.option_name}
              isSelected={selectedOptions.includes(option.id)}
              onSelect={() => handleOptionSelect(option.id)}
            />
          ))}
        </div>
      </div>

      {/* Conditionaly rendered subquestion if option is selected && hasSubQuestion */}
      {question.options.map(
        (option, index) =>
          option.subQuestion &&
          selectedOptions.includes(option.id) && (
            <div
              key={index}
              className="rounded-xl border border-slate-200/80 bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/50 p-6"
            >
              <div className="space-y-4">
                <div>
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
                  <span className="flex flex-wrap items-center gap-1 text-sm text-slate-500">
                    {option.subQuestionDescription}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-3">
                  {getFilteredSubOptions(option)}
                </div>
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
  const hasSubOption =
    "hasSubQuestion" in option ? option.hasSubQuestion : false;

  return (
    <div
      onClick={onSelect}
      className={`group relative flex cursor-pointer flex-col rounded-lg border px-4 py-3 transition-all duration-300 select-none hover:shadow-md md:p-4 ${isSelected ? "border-[#0F69C4] bg-[#f2f6fe] shadow-md" : "border-gray-200/90 bg-gray-200/30 hover:border-blue-300"}`}
    >
      {isSelected && (
        <div className="absolute top-[50%] right-4 flex size-6 translate-y-[-50%] items-center justify-center rounded-full border-2 border-[#0F69C4] text-[#0F69C4]">
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

      <div
        className={`flex items-center gap-2 ${isSelected ? "text-[#0F69C4]" : "text-slate-600"}`}
      >
        <input
          type="radio"
          name={`option-${option.id}`}
          className="size-4 cursor-pointer accent-[#0F69C4]"
          checked={isSelected}
          onChange={onSelect}
        />
        <h5 className={`font-medium group-hover:text-[#0F69C4]`}>
          {option.option_name}
        </h5>
        {hasSubOption && (
          <span title="Esta opción tiene Subopciones">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-4 group-hover:text-[#0F69C4]"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M20.894 15.553a1 1 0 0 1 -.447 1.341l-8 4a1 1 0 0 1 -.894 0l-8 -4a1 1 0 0 1 .894 -1.788l7.553 3.774l7.554 -3.775a1 1 0 0 1 1.341 .447m0 -4a1 1 0 0 1 -.447 1.341l-8 4a1 1 0 0 1 -.894 0l-8 -4a1 1 0 0 1 .894 -1.788l7.552 3.775l7.554 -3.775a1 1 0 0 1 1.341 .447m-8.887 -8.552q .056 0 .111 .007l.111 .02l.086 .024l.012 .006l.012 .002l.029 .014l.05 .019l.016 .009l.012 .005l8 4a1 1 0 0 1 0 1.788l-8 4a1 1 0 0 1 -.894 0l-8 -4a1 1 0 0 1 0 -1.788l8 -4l.011 -.005l.018 -.01l.078 -.032l.011 -.002l.013 -.006l.086 -.024l.11 -.02l.056 -.005z" />
            </svg>
          </span>
        )}
      </div>

      {option.option_description ? (
        <p className="mt-1 line-clamp-2 text-xs text-gray-500">
          {option.option_description || ""}
        </p>
      ) : null}
    </div>
  );
}
