"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { addNewUser, updateUser } from "@/app/lib/actions/usuarios";
import { useState } from "react";
import { User } from "@/app/dashboard/usuarios/page";

export default function UserModal({ userData }: { userData?: User }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [rut, setRut] = useState("");
  const [user, setUser] = useState(
    userData || {
      name: "",
      user_role: "",
      user_hash: "",
    },
  );

  const handleCloseModal = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("agregar");
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const formAction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user.user_hash && !rut) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }
    if (!user.name || !user.user_role) {
      toast.error("Por favor, complete todos los campos.");
      return;
    }

    // Si es una actualización, hay user_hash
    if (user.user_hash) {
      const toastId = toast.loading("Actualizando cambios...");
      try {
        const response = await updateUser(
          user.user_hash,
          user.name,
          user.user_role,
        );
        if (!response.success) {
          throw new Error(response.message);
        }
        toast.success("Usuario actualizado exitosamente.", { id: toastId });
        handleCloseModal();
      } catch (error) {
        console.log(
          error instanceof Error ? error.message : "Error desconocido",
        );
        const message =
          error instanceof Error
            ? error.message
            : "No se pudo actualizar el usuario, intente nuevamente";
        toast.error(message, { id: toastId });
      }
      // Si es un nuevo usuario, se ingresa el rut
    } else {
      const toastId = toast.loading("Guardando cambios...");
      try {
        const response = await addNewUser(rut, user.name, user.user_role);
        if (!response.success) {
          throw new Error(response.message);
        }
        toast.success("Usuario añadido exitosamente.", { id: toastId });
        router.refresh();
        setRut("");
        setUser({
          name: "",
          user_role: "",
          user_hash: "",
        });
      } catch (error) {
        console.log(
          error instanceof Error ? error.message : "Error desconocido",
        );
        const message =
          error instanceof Error
            ? error.message
            : "No se pudo ingresar el usuario, intente nuevamente";
        toast.error(message, { id: toastId });
      }
    }
  };

  return (
    <div className="fixed top-0 left-0 z-2000 h-full w-full transform p-4">
      <div
        onClick={handleCloseModal}
        className="fixed top-0 left-0 h-full w-full bg-gray-900/50"
      />
      <form
        onSubmit={formAction}
        className="absolute top-1/2 left-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-xl bg-white shadow-xl transition-all duration-300"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-8 pb-0">
          <div className="mb-1.5 flex flex-col gap-1">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Añadir Usuario
              </h3>
            </div>
            <p className="text-sm text-gray-500">
              Completa los campos para añadir un nuevo usuario al sistema.
            </p>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4 px-6 py-3">
          {/* RUT */}
          {!user.user_hash && (
            <div>
              <label className="mb-1.5 ml-4 block text-[13px] font-bold text-gray-800">
                RUT
              </label>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                required
                placeholder="12345678-9"
                value={rut}
                onChange={(e) => setRut(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm text-slate-700 transition-colors outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          )}

          {/* Nombre */}
          <div>
            <label className="mb-1.5 ml-4 block text-[13px] font-bold text-gray-800">
              Nombre
            </label>
            <input
              type="text"
              autoComplete="off"
              required
              placeholder="Juan"
              value={user.name}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-sm text-slate-700 transition-colors outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Rol */}
          <div>
            <label className="mb-1.5 ml-4 block text-[13px] font-bold text-gray-800">
              Rol
            </label>
            <select
              required
              value={user.user_role}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, user_role: e.target.value }))
              }
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-slate-700 transition-colors outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="" disabled>
                Selecciona un rol
              </option>
              <option value="admin">Admin</option>
              <option value="encuestador">Encuestador</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between gap-3 p-6 pt-0">
          <button
            type="button"
            onClick={handleCloseModal}
            className="cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="cursor-pointer rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            Guardar Usuario
          </button>
        </div>
      </form>
    </div>
  );
}
