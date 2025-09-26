"use client";

import { useEffect, useRef, useState } from "react";
import { TeamMember } from "./PermissionsModal";

type PermissionsDropdownProps = {
  member: TeamMember;
  handleSelection: (member: TeamMember) => void;
};

export default function PermissionsDropdown({
  member,
  handleSelection,
}: PermissionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const dropdownOptionStyle =
    "cursor-pointer pl-4 pr-6 py-2.5 text-[13px] font-medium divide-y flex items-center gap-2 rounded-md group transition-all text-slate-600 duration-300 hover:bg-slate-200/65 hover:text-slate-700";

  const getRoleColor = (role: string) => {
    switch (role) {
      default:
        return "text-gray-700 bg-slate-100";
    }
  };

  const closeDropdown = (e: MouseEvent): void => {
    if (
      dropdownRef.current &&
      !(dropdownRef.current as HTMLElement).contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setIsOpen(false);
    document.addEventListener("click", closeDropdown);
    return () => {
      document.removeEventListener("click", closeDropdown);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      onClick={() => setIsOpen((prev) => !prev)}
      className={`relative flex cursor-pointer items-center gap-1 rounded border border-slate-200 px-2 py-1 text-xs font-medium focus:ring-0 ${getRoleColor(
        member.access,
      )}`}
    >
      <input
        type="button"
        name="permission"
        value={member.access}
        autoComplete="off"
        readOnly
        required
        className="cursor-pointer"
      />
      {member.access !== "Propietario" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-3"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-.118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z" />
        </svg>
      )}

      {isOpen && member.access !== "Propietario" && (
        <ul className="absolute top-6.5 right-0 z-10 list-none overflow-hidden rounded-lg border border-slate-200 bg-white p-0.5 text-sm text-nowrap shadow-sm transition-all">
          <li>
            <button
              onClick={() => handleSelection({ ...member, access: "Editor" })}
              className={`w-full ${dropdownOptionStyle}`}
            >
              <span className="border-none text-left">Editor</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => handleSelection({ ...member, access: "Lector" })}
              className={`w-full ${dropdownOptionStyle}`}
            >
              <span className="border-none text-left">Lector</span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
