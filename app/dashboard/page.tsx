import React from "react";
import { getSession } from "../lib/actions/auth";
import Navbar from "../ui/Navbar";
import SurveyFilter from "../ui/consultas/SurveyFilter";
import SurveysList from "../ui/SurveysList";
import Footer from "../ui/Footer";

export default async function Dashboard() {
  const session = await getSession();
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar isLoggedIn={session !== null} />
      <Header />
      <div className="container mx-auto max-w-[80rem] flex-1 px-8 py-12">
        <SurveyFilter />
        <SurveysList />
      </div>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#0A4C8A] text-white">
      {/* Navbar placeholder */}
      <div className="h-[68px] bg-[#0A4581]"></div>
      <div className="container mx-auto max-w-[80rem] space-y-2 px-4 py-6 md:px-8 md:py-8">
        <h1 className="text-2xl font-bold md:text-3xl">Todas las Consultas</h1>
        <div className="flex items-center text-sm">
          <span>Buscar consultas activas o terminadas</span>
        </div>
        {/* <SurveySearchBar /> */}
      </div>
    </div>
  );
}
