"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import Link from "next/link";

export default function Hero() {
  const heroRef = useRef(null);
  const videoContainerRef = useRef(null);
  const contentRef = useRef(null);

  // useEffect(() => {
  //   gsap.registerPlugin(ScrollTrigger);

  //   // Set the initial position to fixed
  //   gsap.set(videoContainerRef.current, {
  //     position: "fixed",
  //     top: 0,
  //     left: 0,
  //     width: "100%",
  //     height: "100%",
  //     zIndex: -10,
  //   });

  //   // Animate the content
  //   gsap.from(contentRef.current, {
  //     y: 100,
  //     opacity: 0,
  //     duration: 1.2,
  //     ease: "power3.out",
  //   });

  //   // Create the scroll animation
  //   const animation = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: heroRef.current,
  //       start: "top top",
  //       end: "+=500",
  //       scrub: 1,
  //       pin: true,
  //       pinSpacing: true,
  //       onLeave: () => {
  //         gsap.to(videoContainerRef.current, {
  //           position: "absolute",
  //           duration: 0.1,
  //         });
  //       },
  //       onEnterBack: () => {
  //         gsap.to(videoContainerRef.current, {
  //           position: "absolute",
  //           duration: 0.1,
  //         });
  //       },
  //     },
  //   });

  //   // Add a delay before starting the shrinking animation
  //   animation
  //     .to(videoContainerRef.current, {
  //       height: "50%",
  //       duration: 0.3,
  //     })
  //     .to(videoContainerRef.current, {
  //       height: "30%",
  //       duration: 0.7,
  //     });

  //   return () => {
  //     animation.scrollTrigger?.kill();
  //   };
  // }, []);

  return (
    <div
      ref={heroRef}
      className="rounded-xls relative h-[70vh] w-full overflow-hidden"
    >
      <div
        ref={videoContainerRef}
        className="absolute top-0 left-0 -z-10 h-full w-full"
      >
        <span className="absolute h-full w-full bg-[#163448] opacity-55" />
        <video
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          src="/banner.mp4"
          className="h-full w-full object-cover"
          aria-label="City Survey Banner"
        />
      </div>

      {/* Hero Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 mt-5 flex flex-col items-center justify-center px-4 text-white md:px-8"
      >
        <div className="max-w-4xl text-center">
          <h1 className="mb-4 text-4xl font-bold drop-shadow-lg md:text-6xl">
            Transformando El Quisco <br /> con tu voto
          </h1>
          <p className="mx-auto mb-8 max-w-3xl text-xl drop-shadow-md md:text-2xl">
            Encuestas urbanas que mejoran la calidad de vida de la comuna
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/encuestas"
              className="transform rounded-lg bg-blue-600 px-8 py-3 font-bold text-white transition-all hover:scale-105 hover:bg-blue-700"
            >
              Quiero Participar
            </Link>
            <Link
              href="/resultados"
              className="transform rounded-lg bg-white px-8 py-3 font-bold text-blue-800 transition-all hover:scale-105 hover:bg-gray-100"
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
