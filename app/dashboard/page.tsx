import React from "react";
import { getSession } from "../lib/actions/auth";
import Navbar from "../ui/Navbar";
import SurveyFilter from "../ui/consultas/SurveyFilter";
import SurveysList from "../ui/SurveysList";
import Footer from "../ui/Footer";
import Header from "../ui/dashboard/Header";
import { getSurveysList } from "../lib/data/encuesta";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getSession();
  const surveys = await getSurveysList();

  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar isLoggedIn={session !== null} />
      <Header />
      <div className="container mx-auto max-w-[80rem] flex-1 px-8 py-12">
        <div className="mb-6 flex justify-between">
          <SurveyFilter />
          <Link
            href="/dashboard/nueva-consulta"
            className={`flex min-h-11 w-60 cursor-pointer items-center justify-center rounded-lg border-transparent bg-[#0f69c4] px-5 py-[8px] text-center text-white outline-4 outline-transparent transition-all outline-solid select-none hover:bg-[#07305a] hover:underline focus:outline-[#ffbe5c]`}
          >
            Nueva consulta
          </Link>
        </div>
        {/* Filtrar consultas x permisos de la cuenta */}
        <SurveysList surveys={surveys} />
      </div>
      <Footer />
    </div>
  );
}
