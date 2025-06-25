import { redirect } from "next/navigation";
import { logout } from "../lib/actions/auth";

export default async function LogoutPage() {
  await logout();
  redirect(
    "https://accounts.claveunica.gob.cl/api/v1/accounts/app/logout?redirect=" +
      encodeURIComponent(process.env.NEXTAUTH_URL! + "/auth/login"),
  );
}
