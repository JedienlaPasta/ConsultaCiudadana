"use client";
import Image from "next/image";
import { useState } from "react";
import PermissionsDropdown from "./PermissionsDropdown";

export type TeamMember = {
  id: number;
  name: string;
  username: string;
  avatar: string;
  access: string;
  isYou: boolean;
};

export default function PermissionsModal() {
  const [searchTerm, setSearchTerm] = useState("");

  // Datos de ejemplo para los miembros del equipo
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
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
  ]);

  const handlePermissionsManagement = (member: TeamMember) => {
    setTeamMembers((prevMembers) =>
      prevMembers.map((prevMember) =>
        prevMember.id === member.id
          ? { ...prevMember, access: member.access }
          : { ...prevMember },
      ),
    );
  };

  return (
    <div className="fixed top-0 left-0 z-2000 h-full w-full transform p-4">
      <div className="fixed top-0 left-0 h-full w-full bg-gray-900/50" />
      <div className="absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-xl bg-white shadow-xl transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-0">
          <div className="mb-2 flex items-center gap-1">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Compartir consulta
              </h3>
              <p className="mt-1 text-sm leading-4.5 text-gray-600/80">
                Puedes compartir la consulta con tu equipo para que puedan verla
                y colaborar en ella.
              </p>
            </div>
            <div className="mr-1.5 flex-shrink-0">
              <Image
                src="/share.svg"
                alt="Share"
                className="size-24"
                width={48}
                height={48}
              />
            </div>
          </div>
        </div>

        {/* Invite Team Members */}
        <div className="px-6 pb-4">
          <label className="mb-2 block text-[13px] font-bold text-gray-800">
            Agregar miembros
          </label>
          <div className="flex gap-2">
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
                className="w-full rounded-lg border border-gray-200 py-2 pr-3 pl-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {/* <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              Agregar
            </button> */}
          </div>
        </div>

        {/* Team Members List */}
        <div className="pb-4">
          <div className="mb-0.5 px-6 text-[13px] font-bold text-gray-800">
            Miembros de la consulta
          </div>
          <div className="space-y-3s">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between px-6 py-1.5 hover:bg-gray-100/80"
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-xs font-medium text-white">
                    {member.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">
                        {member.name}
                      </span>
                      {member.isYou && (
                        <span className="rounded bg-blue-100/80 px-2.5 py-0.5 text-xs text-blue-600">
                          Tú
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-600">
                      {member.username}
                    </div>
                  </div>
                </div>
                {/* Permission Dropdown */}
                <PermissionsDropdown
                  member={member}
                  handleSelection={handlePermissionsManagement}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between gap-3 border-t border-gray-100 p-6 pt-4">
          <button className="px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900">
            Descartar cambios
          </button>
          <button className="rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700">
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
