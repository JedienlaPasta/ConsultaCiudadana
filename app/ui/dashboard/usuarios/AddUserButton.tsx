"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function AddUserButton() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    params.set("agregar", "true");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <button
      className="inline-block cursor-pointer rounded-md bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:from-blue-700 hover:to-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      onClick={handleClick}
    >
      Añadir Usuario
    </button>
  );
}
