import Navbar from "@/app/ui/Navbar";
import SurveyHeader from "@/app/ui/SurveyHeader";
import React from "react";
import { getSession } from "@/app/lib/actions/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  console.log("Session in layout:", session);

  return (
    <div>
      <Navbar isLoggedIn={session !== null} />
      <SurveyHeader />
      {children}
    </div>
  );
}
