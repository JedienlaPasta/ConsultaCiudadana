"use client";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="rounded-xls relative h-[70vh] w-full">
      <div className="bg-[#153D6E]s opacity-55s pointer-events-none absolute top-0 left-0 z-10 h-full w-full" />

      <Image
        src="/Blob13.svg"
        width={1920}
        height={1080}
        alt="Hero Banner"
        className="absolute -top-[180%] left-0 h-[280%] w-full object-cover"
      />

      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex items-center justify-center px-4 text-white md:px-8">
        <div className="container -mt-12 flex max-w-[80rem] grow flex-col items-start px-8 text-center">
          <h1 className="mb-4 text-left text-4xl font-bold drop-shadow-lg md:text-6xl">
            Transformando El Quisco <br /> con tu voto
          </h1>
          <p className="mx-autos mb-8 max-w-3xl text-left text-xl drop-shadow-md md:text-xl">
            Encuestas urbanas que mejoran la calidad de vida de la comuna
          </p>
          <div className="grid max-w-[34rem] grid-cols-2 flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/consultas"
              className="rounded-lg bg-[#0F69C4] px-8 py-3 font-semibold text-white transition-colors hover:bg-[#2275C9]"
            >
              Quiero Participar
            </Link>
            <Link
              href="/resultados"
              className="rounded-lg bg-white px-8 py-3 font-semibold text-[#153D6E] transition-all hover:bg-[#e0f0fa]"
            >
              Todas las Consultas
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
