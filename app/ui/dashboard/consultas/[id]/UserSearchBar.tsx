"use client";
import { useState } from "react";

const userList = [
  {
    id: 1,
    name: "Olivia Rhye",
    username: "@olivia",
    avatar: "OR",
    access: "Propietario",
    isYou: true,
  },
  {
    id: 2,
    name: "Candice Wu",
    username: "@candice",
    avatar: "CW",
    access: "Editor",
    isYou: false,
  },
  {
    id: 3,
    name: "Orlando Diggs",
    username: "@orlando",
    avatar: "OD",
    access: "Lector",
    isYou: false,
  },
  {
    id: 4,
    name: "Andi Lane",
    username: "@andi",
    avatar: "AL",
    access: "Lector",
    isYou: false,
  },
];

export default function UserSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="px-6 pb-4">
      <label className="mb-2 block text-[13px] font-bold text-gray-800">
        Agregar miembros
      </label>

      <div className="relative flex-1">
        <svg
          className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-200 py-2 pr-3 pl-10 text-sm transition-colors outline-none focus:border-blue-500"
        />
        {searchTerm.length > 2 && (
          // <div className="absolute top-1/2 right-3 size-4.5 -translate-y-1/2 transform animate-spin text-gray-500/50">
          //   <svg
          //     xmlns="http://www.w3.org/2000/svg"
          //     viewBox="0 0 24 24"
          //     fill="none"
          //     stroke="currentColor"
          //     strokeWidth={2}
          //     strokeLinecap="round"
          //     strokeLinejoin="round"
          //     className=""
          //   >
          //     <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          //     <path d="M12 6l0 -3" />
          //     <path d="M16.25 7.75l2.15 -2.15" />
          //     <path d="M18 12l3 0" />
          //     <path d="M16.25 16.25l2.15 2.15" />
          //     <path d="M12 18l0 3" />
          //     <path d="M7.75 16.25l-2.15 2.15" />
          //     <path d="M6 12l-3 0" />
          //     <path d="M7.75 7.75l-2.15 -2.15" />
          //   </svg>
          // </div>
          <ul className="absolute top-full left-0 z-20 mt-1 !ml-0 h-fit w-full rounded-lg border border-gray-200 bg-white shadow-lg">
            {userList
              .filter((user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((user) => (
                <li
                  key={user.id}
                  className="flex cursor-pointer items-center justify-between px-4 py-2 text-sm text-gray-800 hover:bg-gray-100/80"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-full bg-gray-200 text-center text-xs font-bold text-gray-600">
                      {user.avatar}
                    </div>
                    <div>
                      <p className="font-bold">{user.name}</p>
                      <p className="-mt-0.5 text-xs text-gray-500">
                        {user.username}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        )}
      </div>
    </div>
  );
}
