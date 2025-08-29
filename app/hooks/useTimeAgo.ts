import { useEffect, useState } from "react";

// Hook para calcular tiempo transcurrido
export default function useTimeAgo(timestamp?: Date) {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    if (!timestamp) {
      setTimeAgo("");
      return;
    }

    const updateTimeAgo = () => {
      const now = new Date();
      const diffInSeconds = Math.floor(
        (now.getTime() - timestamp.getTime()) / 1000,
      );

      if (diffInSeconds < 60) {
        setTimeAgo(`hace un momento`);
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        setTimeAgo(`hace ${minutes} min`);
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        setTimeAgo(`hace ${hours} h`);
      } else {
        const days = Math.floor(diffInSeconds / 86400);
        setTimeAgo(`hace ${days} días`);
      }
    };

    updateTimeAgo();
    const interval = setInterval(updateTimeAgo, 30000); // Actualiza cada 30 segundos

    return () => clearInterval(interval);
  }, [timestamp]);

  return timeAgo;
}
