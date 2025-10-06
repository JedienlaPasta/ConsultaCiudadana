import { Suspense } from "react";
import AuthErrorHandler from "@/app/ui/error/AuthErrorHandler";
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
        </div>
        <Footer />
      </div>
    </>
  );
}
