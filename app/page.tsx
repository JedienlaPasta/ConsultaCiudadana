import Link from "next/link";
import { getSession } from "./lib/actions/auth";
import Footer from "./ui/Footer";
import Hero from "./ui/home/Hero";
import SurveysList from "./ui/SurveysList";
import Navbar from "./ui/Navbar";

export default async function Home() {
  const session = await getSession();
  return (
    <>
      <Navbar isLoggedIn={session !== null} />
      {/* Navbar placeholder */}
      <div className="h-[50px] bg-transparent"></div>
      <div className="relative">
        <div className="">
          <Hero />
          {/* Body - Surveys List */}
          <div className="container mx-auto flex max-w-[80rem] flex-col gap-3 px-4 py-12 md:gap-4 md:px-8 md:py-24">
            <div className="flex flex-col gap-1" id="surveys">
              <h2 className="grow text-2xl font-bold text-[#23396f] md:text-3xl">
                Consultas en Curso
              </h2>
              <p className="text-base text-gray-600 md:text-lg">
                Participa en las consultas ciudadanas activas y ayuda a mejorar
                nuestra comuna.
              </p>
            </div>
            <SurveysList />
            <Link
              href="/consultas"
              className="font-semibolds mx-auto mt-1 w-full cursor-pointer rounded-xl bg-[#0A4C8A] px-8 py-3 text-center text-white transition-colors hover:bg-[#1065b4] md:mt-5 md:w-fit"
            >
              Ver todas las consultas
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
