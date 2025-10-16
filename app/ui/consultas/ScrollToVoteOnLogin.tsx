"use client";

import { useEffect } from "react";

export default function ScrollToVoteOnLogin() {
  useEffect(() => {
    try {
      const flag = sessionStorage.getItem("scrollToVote");
      if (flag !== "1") return;

      sessionStorage.removeItem("scrollToVote");

      const isMobile = window.matchMedia("(max-width: 768px)").matches;
      if (!isMobile) return;

      const target = document.getElementById("vote-section");
      if (!target) return;

      const NAVBAR_OFFSET = 120;
      const rect = target.getBoundingClientRect();
      const absoluteTop = window.pageYOffset + rect.top;
      const y = Math.max(0, absoluteTop - NAVBAR_OFFSET);

      window.scrollTo({ top: y, behavior: "smooth" });
    } catch {
      // Fallback suave si algo falla en el cálculo
      const target = document.getElementById("vote-section");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return null;
}
