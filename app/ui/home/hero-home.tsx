"use client";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="rounded-xls relative h-[70vh] w-full">
      <div className="bg-[#153D6E]s opacity-55s pointer-events-none absolute top-0 left-0 z-10 h-full w-full" />

      {/* First video */}
      <Image
        src="/Blobs.svg"
        width={1920}
        height={1080}
        alt="Hero Banner"
        className={`absolute top-0 left-0 h-full w-full border-none object-cover transition-opacity duration-500 ease-in-out outline-none`}
      />

      {/* Hero Content */}
      <div className="absolute inset-0 z-10 mt-5 flex flex-col items-center justify-center px-4 text-white md:px-8">
        <div className="max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold drop-shadow-lg md:text-6xl">
            Transformando El Quisco <br /> con tu voto
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl drop-shadow-md md:text-2xl">
            Encuestas urbanas que mejoran la calidad de vida de la comuna
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/consultas"
              className="rounded-lg bg-[#0F69C4] px-8 py-3 font-bold text-white transition-colors hover:bg-[#0B4E91]"
            >
              Quiero Participar
            </Link>
            <Link
              href="/resultados"
              className="rounded-lg bg-white px-8 py-3 font-bold text-[#153D6E] transition-all hover:bg-[#e0f0fa]"
            >
              Ver Resultados
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
