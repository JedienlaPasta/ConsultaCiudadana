"use client";

import { useEffect, useState } from "react";

export default function RexLoader() {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % 2); // T-Rex has 2 running frames
    }, 150); // Animation speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="size-12 opacity-70"
      style={{
        backgroundImage: "url('/trex-sprite.png')",
        backgroundSize: "1233px 68px", // Original sprite dimensions
        backgroundPosition:
          currentFrame === 0
            ? "-782px -2px" // First running frame position
            : "-827px -2px", // Second running frame position
      }}
    />
  );
}
