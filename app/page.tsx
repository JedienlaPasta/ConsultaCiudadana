import { Suspense } from "react";
import AuthErrorHandler from "@/app/ui/error/AuthErrorHandler";
import Link from "next/link";
import { getSession } from "./lib/actions/auth";
import Footer from "./ui/Footer";
import Hero from "./ui/Hero";
import SurveysList from "./ui/SurveysList";
import { getFilteredSurveysList } from "./lib/data/encuesta";
import Navbar from "./ui/Navbar";

export default async function Home() {
  const session = await getSession();
  const surveys = await getFilteredSurveysList("", "activa");

  return (
    <>
      <Suspense fallback={null}>
        <AuthErrorHandler />
      </Suspense>
      <Navbar isLoggedIn={session !== null} />
      {/* Navbar placeholder */}
      {/* <div className="h-18 bg-transparent"></div> */}
      <div className="relative">
        <Hero />
        {/* Body - Surveys List */}
        <div className="container mx-auto flex max-w-[80rem] flex-col gap-3 px-4 py-12 md:gap-4 md:px-8 md:py-24">
          <div className="flex flex-col gap-1" id="surveys">
            <h2 className="grow text-2xl font-bold text-[#23396f] md:text-3xl">
              Últimas consultas
            </h2>
            <p className="text-base text-gray-600 md:text-lg">
              Participa en las consultas ciudadanas activas y ayuda a mejorar
              nuestra comuna.
            </p>
          </div>
          <SurveysList surveys={surveys} />
          <Link
            href="/consultas"
            className="group relative mx-auto mt-3 w-full max-w-100 overflow-hidden rounded-full bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 px-8 py-4 text-center font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-103 hover:shadow-blue-700/25 active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              Ver todas las consultas
            </span>
            {/* <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-in-out group-hover:translate-x-[100%]" /> */}
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
}
