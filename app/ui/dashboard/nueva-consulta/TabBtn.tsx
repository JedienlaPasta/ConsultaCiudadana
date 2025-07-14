"use client";

type TabBtnProps = {
  children: string;
  isActive: boolean;
  onClick: () => void;
};

export default function TabBtn({ children, isActive, onClick }: TabBtnProps) {
  return (
    <button
      onClick={onClick}
      className={`relative cursor-pointer border-b-4 px-6 py-4 text-sm font-medium transition-all duration-200 hover:bg-gray-100 ${
        isActive
          ? "border-[#0a4c8a] bg-white text-[#0a4c8a] shadow-sm"
          : "border-transparent text-gray-600 hover:text-gray-900"
      } first:rounded-tl-none last:rounded-tr-none`}
    >
      {children}
    </button>
  );
}
