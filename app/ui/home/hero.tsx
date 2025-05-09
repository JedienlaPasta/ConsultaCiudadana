"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef(null);
  const videoContainerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // First, set the initial position to fixed
    gsap.set(videoContainerRef.current, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      zIndex: -10,
    });

    // Then create the animation
    const animation = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top", // Start at the top
        end: "+=500",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        onLeave: () => {
          gsap.to(videoContainerRef.current, {
            position: "absolute",
            duration: 0.1,
          });
        },
        onEnterBack: () => {
          gsap.to(videoContainerRef.current, {
            position: "fixed",
            duration: 0.1,
          });
        },
      },
    });

    // Add a delay before starting the shrinking animation
    animation
      .to(videoContainerRef.current, {
        height: "100%", // Stay at full height
        duration: 0.3, // This creates the delay effect
      })
      .to(videoContainerRef.current, {
        height: "30%", // Then shrink to 30%
        top: 5,
        duration: 0.7,
      });

    return () => {
      animation.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div ref={heroRef} className="relative h-screen w-full">
      <div
        ref={videoContainerRef}
        className="absolute top-0 left-0 -z-10 h-full w-full"
      >
        <span className="absolute h-full w-full bg-[#163448] opacity-25" />
        <video
          autoPlay={true}
          muted={true}
          loop={true}
          playsInline={true}
          src="/banner.mp4"
          className="h-full w-full object-cover"
          aria-label="Banner"
        />
      </div>
    </div>
  );
}
