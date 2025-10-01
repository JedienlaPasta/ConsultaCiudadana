"use client";
import { TeamMember } from "@/app/lib/definitions/usuarios";
import { useState, useMemo } from "react";

// const userList = [
//   {
//     id: 1,
//     name: "Olivia Rhye",
//     username: "@olivia",
//     avatar: "OR",
//     access: "Propietario",
//     isYou: true,
//   },
//   {
//     id: 2,
//     name: "Candice Wu",
//     username: "@candice",
//     avatar: "CW",
//     access: "Editor",
//     isYou: false,
//   },
//   {
//     id: 3,
//     name: "Orlando Diggs",
//     username: "@orlando",
//     avatar: "OD",
//     access: "Lector",
//     isYou: false,
//   },
//   {
//     id: 4,
//     name: "Andi Lane",
//     username: "@andi",
//     avatar: "AL",
//     access: "Lector",
//     isYou: false,
//   },
// ];

type SearchBarProps = {
  allUsers: TeamMember[];
  onUserSelect: (user: TeamMember) => void;
};

export default function UserSearchBar({
  allUsers,
  onUserSelect,
}: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filtrado optimizado con useMemo
  const filteredUsers = useMemo(() => {
    if (searchTerm.length < 2) return []; // Cambiar a 2 caracteres mínimo

    return allUsers.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    // return props.allUsers.filter(
    //   (user) =>
    //     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     user.username.toLowerCase().includes(searchTerm.toLowerCase()),
    // );
  }, [searchTerm]);

  const handleTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  const handleUserSelect = (user: TeamMember) => {
    onUserSelect(user);
    setSearchTerm("");
  };

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
          placeholder="Buscar usuarios..."
          onChange={handleTermChange}
          value={searchTerm}
          className="w-full rounded-lg border border-gray-200 py-2 pr-10 pl-10 text-sm text-slate-700 transition-colors outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />

        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-full p-0.5 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600"
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

        {/* Lista de resultados mejorada */}
        {filteredUsers.length > 0 && (
          <ul className="absolute top-full left-0 z-20 mt-1 !ml-0 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg">
            {filteredUsers.map((user) => {
              const splitName = user.name.split(" ");
              const avatar = splitName[0][0] + splitName[1][0];
              return (
                <li
                  key={user.user_hash}
                  onClick={() => handleUserSelect(user)}
                  className="flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm text-gray-800 transition-colors first:rounded-t-lg last:rounded-b-lg hover:bg-indigo-50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-xs font-medium text-white">
                      {avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.username}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {user.survey_access}
                  </span>
                </li>
              );
            })}
          </ul>
        )}

        {/* Mensaje cuando no hay resultados */}
        {searchTerm.length >= 2 && filteredUsers.length === 0 && (
          <div className="absolute top-full left-0 z-20 mt-1 w-full rounded-lg border border-gray-200 bg-white p-4 text-center text-sm text-gray-500 shadow-lg">
            No se encontraron usuarios para '{searchTerm}''
          </div>
        )}
      </div>
    </div>
  );
}
