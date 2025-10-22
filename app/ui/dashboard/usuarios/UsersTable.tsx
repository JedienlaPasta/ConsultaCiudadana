"use client";
import { User } from "@/app/dashboard/usuarios/page";
import { revokeUserRole } from "@/app/lib/actions/usuarios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

export default function UsersTable({ users }: { users: User[] }) {
  const [usersList, setUsersList] = useState<User[]>(users);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setUsersList(users);
  }, [users]);

  const handleEditButton = (user_hash: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("agregar", user_hash);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleDeleteButton = async (user_hash: string) => {
    const toastId = toast.loading("Quitando permisos...");
    try {
      const response = await revokeUserRole(user_hash);
      if (!response.success) {
        throw new Error(response.message);
      }
      toast.success("Rol revocado exitosamente.", { id: toastId });
    } catch (error) {}
  };

  return (
    <table className="min-w-full divide-y divide-slate-200">
      <thead className="bg-slate-50">
        <tr>
          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">
            Nombre
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">
            Hash
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">
            Rol
          </th>
          <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">
            Acciones
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-200">
        {usersList?.map((user: User) => (
          <tr key={user.user_hash} className="hover:bg-slate-50/60">
            <td className="px-4 py-3 text-sm text-slate-800">
              {user.name || "Sin nombre"}
            </td>
            <td className="px-4 py-3 text-xs text-slate-500">
              <span className="inline-block max-w-[24ch] truncate align-middle">
                {user.user_hash}
              </span>
            </td>
            <td className="px-4 py-3 text-sm text-slate-800">
              {user.user_role?.charAt(0).toUpperCase() +
                user.user_role?.slice(1) || "Indefinido"}
            </td>
            <td className="flex gap-1.5 px-4 py-3">
              <button
                type="button"
                onClick={() => handleEditButton(user?.user_hash || "")}
                className="inline-block cursor-pointer rounded-md bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors duration-300 hover:from-blue-700 hover:to-blue-600 focus:outline-none"
              >
                <span>Editar</span>
              </button>
              <button
                type="button"
                onClick={() => handleDeleteButton(user?.user_hash || "")}
                className="inline-block cursor-pointer rounded-md bg-gradient-to-r from-rose-600 to-rose-500 px-4 py-2 text-sm font-medium text-nowrap text-white shadow-sm transition-colors duration-300 hover:from-rose-700 hover:to-rose-600 focus:outline-none"
              >
                <span>Quitar Rol</span>
              </button>
            </td>
          </tr>
        ))}
        {(!users || users.length === 0) && (
          <tr>
            <td
              className="px-4 py-6 text-center text-sm text-slate-500"
              colSpan={4}
            >
              No hay usuarios registrados.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
