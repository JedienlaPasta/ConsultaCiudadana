// import MapSection from "@/app/ui/piimep/MapSection";

import Image from "next/image";
// import Link from "next/link";

export default function Piimep() {
  return (
    <>
      <div className="flexs container mx-auto w-full flex-col items-center justify-center p-8">
        <div className="w-[1024px]s">
          {/* <h1 className="mb-4 text-3xl font-bold">
            Proyecto de Investigación e Innovación en Manejo de Plagas y
            Enfermedades en el Perú
          </h1>
          <p className="mb-8 text-lg">
            El Proyecto de Investigación e Innovación en Manejo de Plagas y
            Enfermedades en el Perú (PIIMEP) es un programa de investigación y
            desarrollo que tiene como objetivo principal mejorar la gestión de
            las plagas y enfermedades en el Perú. El programa se enfoca en la
            investigación, desarrollo tecnológico y aplicación de soluciones
            para abordar las problemáticas relacionadas con el manejo de plagas
            y enfermedades en la región.
          </p> */}
          {/* <MapSection /> */}
        </div>
      </div>
      <div className="relative h-[70vh] w-full">
        <div className="bg-[#153D6E]s opacity-55s pointer-events-none absolute top-0 left-0 z-10 h-full w-full" />

        <Image
          src="/Blob19.svg"
          width={1920}
          height={1080}
          alt="Footer Banner"
          className="absolute -top-[180%] left-0 -z-10 h-[280%] w-full object-cover"
          priority
        />

        {/* Hero Content */}
        <div className="inset-0 z-10 container mx-auto flex h-full items-center justify-center text-white">
          <div className="relative container -mt-10 flex max-w-[80rem] grow flex-col items-start px-4 text-center md:px-8 md:text-left">
            {/* <h1 className="mb-6 text-left text-4xl font-bold drop-shadow-lg md:text-5xl lg:text-6xl">
              Transformando El Quisco <br /> con tu voto
            </h1>
            <p className="mx-autos mb-10 max-w-3xl text-left text-xl drop-shadow-md md:mx-0 md:text-2xl">
              Participa en la mejora de la calidad de vida de toda la comuna
            </p> */}

            {/* <Image
              src="/phone.svg"
              width={300}
              height={600}
              alt="Footer Banner"
              className="-top-[30%]s absolute right-20 hidden lg:-top-[10%] lg:right-[10] lg:block lg:w-40 xl:-top-[30%] xl:w-75"
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}
