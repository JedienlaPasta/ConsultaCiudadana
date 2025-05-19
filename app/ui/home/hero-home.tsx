"use client";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative h-[70vh] w-full">
      <div className="bg-[#153D6E]s opacity-55s pointer-events-none absolute top-0 left-0 z-10 h-full w-full" />

      <Image
        src="/Blob13.svg"
        width={1920}
        height={1080}
        alt="Footer Banner"
        className="absolute -top-[180%] left-0 -z-10 h-[280%] w-full object-cover"
        priority
      />

      {/* Hero Content */}
      <div className="inset-0 z-10 container mx-auto flex h-full items-center justify-center text-white">
        <div className="relative container -mt-10 flex max-w-[80rem] grow flex-col items-start px-4 text-center md:px-8 md:text-left">
          <h1 className="mb-6 text-left text-4xl font-bold drop-shadow-lg md:text-5xl lg:text-6xl">
            Transformando El Quisco <br /> con tu voto
          </h1>
          <p className="mx-autos mb-10 max-w-3xl text-left text-xl drop-shadow-md md:mx-0 md:text-2xl">
            Participa en la mejora de la calidad de vida de toda la comuna
          </p>

          <div className="grid w-full max-w-[34rem] grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById("surveys");
                if (element) {
                  const headerOffset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition =
                    elementPosition + window.pageYOffset - headerOffset;

                  window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                  });
                }
              }}
              className="cursor-pointer rounded-lg bg-[#0F69C4] px-8 py-4 text-center font-semibold text-white transition-all hover:bg-[#2275C9] hover:shadow-lg"
            >
              Quiero Participar
            </button>
            <Link
              href="/resultados"
              className="rounded-lg bg-white px-8 py-4 text-center font-semibold text-[#153D6E] transition-all hover:bg-[#e0f0fa] hover:shadow-lg"
            >
              Todas las Consultas
            </Link>
          </div>

          <Image
            src="/phone.svg"
            width={300}
            height={600}
            alt="Footer Banner"
            className="-top-[30%]s absolute right-20 hidden lg:-top-[10%] lg:right-[10] lg:block lg:w-40 xl:-top-[30%] xl:w-75"
          />
        </div>
      </div>
    </div>
  );
}
