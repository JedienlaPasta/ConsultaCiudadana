import { SubOption } from "@/app/lib/definitions/encuesta";
import { useEffect, useRef, useState } from "react";

type Sectors = {
  sector_name: string;
};

type DropdownProps = {
  name: keyof SubOption;
  options?: Sectors[];
  value: string | null;
  questionIndex: number;
  optionIndex: number;
  subIndex: number;
  readOnly?: boolean;
  setValue: (
    questionIndex: number,
    optionIndex: number,
    subIndex: number,
    field: keyof SubOption,
    value: string,
  ) => void;
  //   setValue: (name: keyof FormField | string, value: string) => void;
};

export default function NewSurveyDropdown({
  name,
  options,
  value,
  questionIndex,
  optionIndex,
  subIndex,
  readOnly,
  setValue,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // De aqui para abajo, son valores/funciones para cerrar el dropdown cuando se hace click fuera de el
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const cerrarDropdown = (e: MouseEvent): void => {
    if (
      dropdownRef.current &&
      !(dropdownRef.current as HTMLElement).contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setIsOpen(false);
    document.addEventListener("click", cerrarDropdown);
    return () => {
      document.removeEventListener("click", cerrarDropdown);
    };
  }, []);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!setValue) return;
    setValue(questionIndex, optionIndex, subIndex, name, e.target.value);
  };

  return (
    <div
      ref={dropdownRef}
      onClick={toggleDropdown}
      className="relative flex grow flex-col gap-2 select-none"
    >
      {/* <label
        htmlFor={label}
        className="flex items-center text-sm font-semibold text-gray-700"
      >
        {label}
        <span className="ml-1 text-red-500">*</span>
      </label> */}
      <input
        id={String(subIndex)}
        name={name}
        type="text"
        value={value ? value : ""}
        readOnly={readOnly}
        onChange={(e) => handleOnChange(e)}
        placeholder="Sector..."
        autoComplete="off"
        required
        className={`${readOnly && "cursor-pointer"} h-10 w-full rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all outline-none placeholder:text-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:ring-offset-1`}
      />
      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute top-11 right-0 z-10 max-h-[242px] w-[200%] divide-y divide-gray-200 overflow-y-auto rounded-lg border border-gray-200 bg-white text-slate-700 shadow-lg">
          {options && options.length > 0 ? (
            options.map((option, index) => (
              <li
                key={index}
                onClick={() =>
                  setValue(
                    questionIndex,
                    optionIndex,
                    subIndex,
                    name,
                    option.sector_name,
                  )
                }
                className="flex h-12 w-full cursor-pointer flex-col justify-center px-4 text-sm hover:bg-[#0A4581] hover:text-white"
              >
                <span>{option.sector_name}</span>
                {/* <span className="text-xs text-slate-500">{option.type}</span> */}
              </li>
            ))
          ) : (
            <li className="flex h-12 w-full flex-col justify-center px-4 text-sm text-slate-500">
              No hay opciones disponibles
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
