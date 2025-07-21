"use client";

type TabBtnProps = {
  children: string;
  currentStep: number;
  index: number;
  onClick: () => void;
};

export default function TabBtn({
  children,
  currentStep,
  index,
  onClick,
}: TabBtnProps) {
  const isActive = currentStep === index;
  const isCompleted = currentStep > index;

  return (
    <div
      onClick={onClick}
      className={`group relative flex cursor-pointer items-center gap-4 px-6 py-4 transition-all duration-300 hover:bg-gray-50 ${
        isActive
          ? "border-r-1s border-[#06539b] bg-blue-50"
          : isCompleted
            ? "bg-emerald-50"
            : "bg-white hover:bg-gray-50"
      } ${index !== 5 ? "border-b border-gray-100" : ""}`}
    >
      {/* Step Number/Icon */}
      <div
        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 font-semibold transition-all duration-300 ${
          isActive
            ? "border-[#06539b] bg-[#06539b] text-white shadow-lg"
            : isCompleted
              ? "border-emerald-600 bg-emerald-600 text-white"
              : "border-gray-300 bg-white text-gray-500 group-hover:border-gray-400"
        }`}
      >
        {isCompleted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <span className="text-sm">{index}</span>
        )}
      </div>

      {/* Step Content */}
      <div className="flex flex-col">
        <span
          className={`text-sm font-medium transition-colors duration-300 ${
            isActive
              ? "text-blue-800"
              : isCompleted
                ? "text-emerald-800"
                : "text-gray-700 group-hover:text-gray-800"
          }`}
        >
          {children}
        </span>
        <span
          className={`text-xs transition-colors duration-300 ${
            isActive
              ? "text-blue-600"
              : isCompleted
                ? "text-emerald-600"
                : "text-gray-500"
          }`}
        >
          {isActive ? "Paso actual" : isCompleted ? "Completado" : "Pendiente"}
        </span>
      </div>

      {/* Active Indicator */}
      {isActive && (
        <div className="absolute top-[50%] right-0 h-[50%] w-1 -translate-y-[50%] rounded-l-full bg-blue-600" />
      )}
    </div>
  );
}
