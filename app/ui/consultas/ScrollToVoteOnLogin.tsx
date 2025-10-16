"use client";

import { useEffect } from "react";

export default function ScrollToVoteOnLogin() {
  useEffect(() => {
    try {
      const flag = sessionStorage.getItem("scrollToVote");
      if (flag !== "1") return;

      // Limpia el flag para que el scroll ocurra solo una vez
      sessionStorage.removeItem("scrollToVote");

      // Solo en mobile
      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (!isMobile) return;

      const target = document.getElementById("vote-section");
      if (!target) return;

      // Usa scrollIntoView; el offset del navbar se maneja con scroll-mt en el target
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      // Si algo falla, no rompemos la UI
    }
  }, []);

  return null;
}
