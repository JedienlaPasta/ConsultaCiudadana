"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";

export default function SurveySearchBar({
  placeholder,
}: {
  placeholder: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [inputValue, setInputValue] = useState(
    searchParams.get("query")?.toString() || ""
  );

  // Update input value when URL changes
  useEffect(() => {
    setInputValue(searchParams.get("query")?.toString() || "");
  }, [searchParams]);

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 300);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    handleSearch(value);
  };

  const handleClear = () => {
    setInputValue("");
    handleSearch("");
  };

  return (
    <div className="relative mt-4">
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute left-3 z-10 flex items-center">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder={placeholder}
          onChange={handleInputChange}
          value={inputValue}
          className="w-full rounded-lg border border-gray-300 bg-white py-3 pr-4 pl-10 text-slate-700 placeholder-gray-400 shadow-lg transition-all duration-200 hover:shadow-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        {/* Clear text button - only show when there's text */}
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-3 cursor-pointer rounded-full p-0.5 text-gray-400 hover:bg-gray-300 hover:text-gray-600"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
