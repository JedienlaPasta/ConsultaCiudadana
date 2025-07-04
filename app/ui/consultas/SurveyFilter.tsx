"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const filterTabs = [
  { key: "todos", label: "Todos" },
  { key: "activa", label: "Activa" },
  { key: "cerrada", label: "Cerrada" },
];

export default function SurveyFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentTab, setCurrentTab] = useState("todos");

  // Update current tab based on URL params
  useEffect(() => {
    const filter = searchParams.get("filter") || "todos";
    setCurrentTab(filter);
  }, [searchParams]);

  const handleTabChange = (tabKey: string) => {
    setCurrentTab(tabKey);
    const params = new URLSearchParams(searchParams.toString());
    if (tabKey === "todos") {
      params.delete("filter");
    } else {
      params.set("filter", tabKey);
    }
    router.push(`/consultas?${params.toString()}`);
  };

  return (
    <div className="mb-6 flex items-center justify-start">
      <div className="flex items-center overflow-hidden rounded-lg border border-gray-200 bg-white p-1 shadow-sm">
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
      className={`px-6 py-2 text-sm font-medium transition-colors duration-200 ${
        isActive
          ? "bg-[#0A4581] text-white"
          : "bg-white text-gray-700 hover:cursor-pointer hover:bg-gray-50 hover:text-blue-500"
      } sfirst:rounded-l-lg slast:rounded-r-lg rounded-lg border-r border-gray-200 last:border-r-0`}
    >
      {title}
    </button>
  );
}
