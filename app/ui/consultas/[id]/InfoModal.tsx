import { useEffect, useState } from "react";

type InfoModalProps = {
  option: string;
  show: boolean;
  onClose: (e: React.MouseEvent) => void;
};

export default function InfoModal({ option, show, onClose }: InfoModalProps) {
  const [shouldRender, setShouldRender] = useState(show);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      setTimeout(() => {
        setIsVisible(true);
      }, 50);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }
  }, [show]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 z-2000 h-full w-full transform p-4 ${
        isVisible ? "" : "pointer-events-none"
      }`}
    >
      <div
        onClick={onClose}
        className={`fixed top-0 left-0 h-full w-full bg-gray-900/50 ${
          isVisible ? "block" : "pointer-events-none hidden"
        }`}
      />
      <div
        className={`bg-whites absolute top-1/2 left-1/2 w-md max-w-[95%] -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-xl ${
          isVisible ? "opacity-100" : "opacity-0"
        } transition-all duration-300`}
      >
        {/* Header con gradiente */}
        <div className="flex items-center justify-between rounded-t-xl bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-200/20">
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
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">Información</h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/20 hover:text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="bg-white">
          <div className="flex-1 p-6 pb-3">
            <p className="text-sm leading-relaxed text-slate-600">
              <span className="mr-0.5 inline-flex items-center rounded bg-blue-50 px-2 py-0.5 text-sm font-medium text-blue-700 ring-1 ring-blue-200">
                {option}
              </span>{" "}
              tiene subopciones disponibles. Por favor, selecciona una de las
              opciones específicas que aparecen más abajo.
            </p>
          </div>
          <div className="flex justify-end gap-3 rounded-b-xl p-5 pt-0">
            <button
              onClick={onClose}
              className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md focus:outline-none active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
