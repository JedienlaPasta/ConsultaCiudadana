import { getSession } from "@/app/lib/actions/auth";
import Navbar from "@/app/ui/Navbar";
import Footer from "@/app/ui/Footer";
import { getUsersWithRole } from "@/app/lib/data/usuarios";
import Header from "@/app/ui/dashboard/Header";
import UsersTable from "@/app/ui/dashboard/usuarios/UsersTable";
import AddUserButton from "@/app/ui/dashboard/usuarios/AddUserButton";
import AddUserModal from "@/app/ui/dashboard/usuarios/UserModal";
import { redirect } from "next/navigation";

type UsuariosDashboardProps = {
  searchParams?: Promise<{
    agregar?: string;
  }>;
};

export type User = {
  name: string;
  user_role: string;
  user_hash?: string;
  rut?: string;
};

export default async function UsuariosDashboard({
  searchParams,
}: UsuariosDashboardProps) {
  const session = await getSession();
  const addUserModal = (await searchParams)?.agregar;
  const { users } = await getUsersWithRole();

  if (!session || session.role !== "admin") {
    redirect("/");
  }

  const userToEdit = users.find(
    (user) => user.user_hash === addUserModal,
  ) as User;

  return (
    <div className="flex min-h-dvh flex-col bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <Navbar session={session} />
      <Header
        title="Gestión de Usuarios"
        description="Administra roles y permisos de usuarios del sistema."
      />

      {addUserModal && <AddUserModal userData={userToEdit} />}

      <div className="container mx-auto max-w-[80rem] flex-1 px-4 py-8 md:px-8">
        <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 md:text-2xl">
              Listado de usuarios
            </h2>
          </div>
          <AddUserButton />
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-1 gap-0 md:grid-cols-1">
            <div className="overflow-x-auto">
              <UsersTable users={users} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
