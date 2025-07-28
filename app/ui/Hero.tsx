"use client";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const handleCTABtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const element = document.getElementById("surveys");
    if (element) {
      const isMobile = window.innerWidth <= 768;
      const headerOffset = isMobile ? 30 : 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="relative h-[70vh] w-full">
      <div className="pointer-events-none absolute z-10 h-full w-full" />

      <Image
        src="/Blob19.svg"
        width={1920}
        height={1080}
        alt="Banner"
        className="absolute -top-[180%] left-0 -z-10 h-[285%] w-full object-cover md:h-[280%]"
        priority
      />

      {/* Hero Content */}
      <div className="containers inset-0 z-10 mx-auto flex h-full items-center justify-center text-white">
        <div className="relative container mx-auto -mt-10 flex max-w-[80rem] grow flex-col items-start px-4 py-12 text-center md:px-8 md:text-left">
          <h1 className="mb-4 text-left text-4xl font-bold drop-shadow-lg md:mb-6 md:text-5xl lg:text-6xl">
            Transformando El Quisco <br /> con tu voto
          </h1>
          <p className="mx-autos mb-8 max-w-3xl text-left text-lg drop-shadow-md md:mx-0 md:mb-10 md:text-2xl">
            Participa en la mejora de la calidad de vida de toda la comuna
          </p>

          <div className="grid w-full max-w-[34rem] grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              onClick={handleCTABtn}
              className="cursor-pointer rounded-lg bg-[#0F69C4] px-8 py-3 text-center font-semibold text-white transition-all hover:bg-[#2275C9] hover:shadow-lg"
            >
              Quiero Participar
            </button>
            <Link
              href="#"
              className="rounded-lg bg-white px-8 py-3 text-center font-semibold text-[#153D6E] transition-all hover:bg-[#e0f0fa] hover:shadow-lg"
            >
              Ver Resultados
            </Link>
          </div>

          <Image
            src="/phone.svg"
            width={300}
            height={600}
            alt="Footer Banner"
            className="absolute -top-[30%] right-20 hidden lg:top-[7%] lg:right-[30] lg:block lg:w-40 xl:-top-[10%] xl:w-75"
          />
        </div>
      </div>
    </div>
  );
}
