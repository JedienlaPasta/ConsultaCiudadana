"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);
  const [showFirst, setShowFirst] = useState(true);
  const isShowingFirst = useRef(true);
  const hasCrossfaded = useRef(false);
  const rafId = useRef<number>(null);

  const monitorVideo = () => {
    const currentVideo = isShowingFirst.current
      ? video1Ref.current
      : video2Ref.current;

    if (currentVideo && currentVideo.duration) {
      const timeLeft = currentVideo.duration - currentVideo.currentTime;

      if (timeLeft <= 0.5 && !hasCrossfaded.current) {
        hasCrossfaded.current = true;

        const nextVideo = isShowingFirst.current
          ? video2Ref.current
          : video1Ref.current;
        if (nextVideo) {
          nextVideo.currentTime = 0;
          nextVideo.play();
        }

        isShowingFirst.current = !isShowingFirst.current;
        setShowFirst(isShowingFirst.current);

        // Reset crossfade flag after transition duration
        setTimeout(() => {
          hasCrossfaded.current = false;
        }, 500);
      }
    }

    rafId.current = requestAnimationFrame(monitorVideo);
  };

  useEffect(() => {
    // Start first video
    video1Ref.current?.play();

    // Start monitoring loop
    rafId.current = requestAnimationFrame(monitorVideo);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);
  // bg-[#163448]
  return (
    <div className="rounded-xls relative h-[70vh] w-full overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-full bg-[#153D6E] opacity-55" />

      {/* First video */}
      <video
        ref={video1Ref}
        src="/banner.mp4"
        muted
        playsInline
        preload="auto"
        className={`absolute top-0 left-0 h-full w-full border-none object-cover transition-opacity duration-500 ease-in-out outline-none ${
          showFirst ? "z-0 opacity-100" : "z-0 opacity-0"
        }`}
      />

      {/* Second video */}
      <video
        ref={video2Ref}
        src="/banner.mp4"
        muted
        playsInline
        preload="auto"
        className={`absolute top-0 left-0 h-full w-full border-none object-cover transition-opacity duration-500 ease-in-out outline-none ${
          showFirst ? "z-0 opacity-0" : "z-0 opacity-100"
        }`}
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
      {/* Stats Section */}
      {/* <div className="absolutes right-0 bottom-10 left-0">
        <div className="container mx-auto">
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 rounded-xl bg-white/10 p-4 text-center backdrop-blur-md md:grid-cols-4">
            <div className="p-3">
              <p className="text-3xl font-bold">25+</p>
              <p className="text-sm">Ciudades</p>
            </div>
            <div className="p-3">
              <p className="text-3xl font-bold">10K+</p>
              <p className="text-sm">Encuestas</p>
            </div>
            <div className="p-3">
              <p className="text-3xl font-bold">95%</p>
              <p className="text-sm">Satisfacción</p>
            </div>
            <div className="p-3">
              <p className="text-3xl font-bold">50+</p>
              <p className="text-sm">Proyectos</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
