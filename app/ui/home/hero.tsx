"use client";

// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function Hero() {
  // const heroRef = useRef(null);
  // const videoContainerRef = useRef(null);
  // const contentRef = useRef(null);
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
      // ref={heroRef}
      className="rounded-xls relative h-[70vh] w-full overflow-hidden"
    >
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-full bg-[#163448] opacity-55" />

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
      <div
        // ref={contentRef}
        className="absolute inset-0 z-10 mt-5 flex flex-col items-center justify-center px-4 text-white md:px-8"
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
              href="/consultas"
              className="rounded-lg bg-slate-900 px-8 py-3 font-bold text-white transition-all hover:bg-slate-950"
            >
              Quiero Participar
            </Link>
            <Link
              href="/resultados"
              className="rounded-lg bg-slate-200 px-8 py-3 font-bold text-slate-700 transition-all hover:bg-slate-100"
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
