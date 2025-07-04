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
          <div className="container mx-auto flex max-w-[80rem] flex-col gap-4 px-8 py-24">
            <div className="flex flex-col gap-1">
              <h2 className="grow text-3xl font-bold text-[#23396f]">
                Consultas en Curso
              </h2>
              <p className="text-lg text-gray-600">
                Participa en las consultas ciudadanas activas y ayuda a mejorar
                nuestra comuna.
              </p>
            </div>
            <SurveysList />
            <Link
              href="/consultas"
              className="font-semibolds mx-auto mt-5 cursor-pointer rounded-lg border border-[#0A4C8A] bg-white px-5 py-2 text-center text-[#0A4C8A] transition-colors hover:text-[#002F4C]"
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
