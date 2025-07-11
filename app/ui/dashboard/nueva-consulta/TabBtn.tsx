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
      className={`
        relative px-6 py-4 font-medium text-sm transition-all duration-200 
        border-b-2 border-transparent hover:bg-white/50
        ${
          isActive
            ? "text-[#0a4c8a] border-[#0a4c8a] bg-white shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }
        first:rounded-tl-none last:rounded-tr-none
        focus:outline-none focus:ring-2 focus:ring-[#0a4c8a]/20
      `}
    >
      {children}
      {isActive && (
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-[#0a4c8a] to-[#0d5aa7]" />
      )}
    </button>
  );
}
