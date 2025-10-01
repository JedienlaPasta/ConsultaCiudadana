"use client";
import Image from "next/image";
import { useState } from "react";
import PermissionsDropdown from "./PermissionsDropdown";
import UserSearchBar from "./UserSearchBar";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { TeamMember } from "@/app/lib/definitions/usuarios";
import { updateSurveyUsersPermissions } from "@/app/lib/actions/usuarios";

type PermissionsModalProps = {
  teamMembersList: TeamMember[];
  allUsers: TeamMember[];
};

export default function PermissionsModal({
  teamMembersList,
  allUsers,
}: PermissionsModalProps) {
  // Datos de ejemplo para los miembros del equipo
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(teamMembersList);
  const [newTeamMembers, setNewTeamMembers] = useState<TeamMember[]>([]);
  const [membersToRemove, setMembersToRemove] = useState<TeamMember[]>([]);
  console.log(newTeamMembers);

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCloseModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("permissions");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const onUserSelect = (user: TeamMember) => {
    // console.log("Usuario seleccionado:", user);
    if (teamMembers.some((member) => member.user_hash === user.user_hash)) {
      return;
    }
    user.survey_access = "Lector";
    setNewTeamMembers((prevMembers) => [...prevMembers, user]);
    setTeamMembers((prevMembers) => [...prevMembers, user]);
  };

  const handlePermissionsManagement = (member: TeamMember) => {
    setTeamMembers((prevMembers) =>
      prevMembers.map((prevMember) =>
        prevMember.user_hash === member.user_hash
          ? { ...prevMember, survey_access: member.survey_access }
          : { ...prevMember },
      ),
    );
  };

  const formAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const toastId = toast.loading("Guardando cambios...");
    try {
      const response = await updateSurveyUsersPermissions(teamMembers);
      if (!response.success) {
        throw new Error(response.message);
      }
      toast.success("Cambios guardados exitosamente", { id: toastId });
      handleCloseModal();
    } catch (error) {
      console.log(error instanceof Error ? error.message : "Error desconocido");
      const message =
        error instanceof Error
          ? error.message
          : "No se pudo guardar los cambios, intente nuevamente";
      toast.error(message, { id: toastId });
    }
  };

  return (
    <div className="fixed top-0 left-0 z-2000 h-full w-full transform p-4">
      <div
        onClick={handleCloseModal}
        className="fixed top-0 left-0 h-full w-full bg-gray-900/50"
      />
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
        <UserSearchBar allUsers={allUsers} onUserSelect={onUserSelect} />

        {/* Team Members List */}
        <div className="pb-4">
          <div className="mb-0.5 px-6 text-[13px] font-bold text-gray-800">
            Miembros de la consulta
          </div>
          <div className="space-y-3s">
            {teamMembers.map((member) => {
              const splitName = member.name.split(" ");
              const avatar = splitName[0][0] + splitName[1][0];
              return (
                <div
                  key={member.user_hash}
                  className="flex items-center justify-between px-6 py-1.5 hover:bg-gray-100/80"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-xs font-medium text-white">
                      {avatar}
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
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between gap-3 border-t border-gray-100 p-6 pt-4">
          <button
            onClick={handleCloseModal}
            className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
          >
            Descartar cambios
          </button>
          <button className="cursor-pointer rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700">
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
