"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const filterTabs = [
  { key: "todas", label: "Todas" },
  { key: "activa", label: "Activa" },
  { key: "terminada", label: "Terminada" },
];

export default function SurveyFilter({
  defaultFilter,
}: {
  defaultFilter: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [currentTab, setCurrentTab] = useState(defaultFilter);

  useEffect(() => {
    const filter = searchParams.get("filter") || defaultFilter;
    setCurrentTab(filter);
  }, [searchParams, defaultFilter]);

  const handleTabChange = (tabKey: string) => {
    setCurrentTab(tabKey);
    const params = new URLSearchParams(searchParams.toString());
    if (tabKey === defaultFilter) {
      params.delete("filter");
    } else {
      params.set("filter", tabKey);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-2">
      {filterTabs.map((tab) => (
        <Tab
          key={tab.key}
          title={tab.label}
          tabKey={tab.key}
          isActive={tab.key === currentTab}
          onClick={() => handleTabChange(tab.key)}
        />
      ))}
    </div>
  );
}

type TabProps = {
  title: string;
  tabKey: string;
  isActive: boolean;
  onClick: () => void;
};

function Tab({ title, isActive, onClick }: TabProps) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer rounded-lg border px-6 py-2 text-sm font-medium shadow-sm transition-all duration-200 ${
        isActive
          ? "border-[#0A4581] bg-[#0A4581] text-white shadow-[#0A4581]/50"
          : "border-gray-200 bg-white text-gray-700 hover:bg-gray-200/90"
      }`}
    >
      {title}
    </button>
  );
}
