import { useEffect, useState } from "react";
import { Spinner } from "./Spinner";
import { useRouter } from "next/navigation";

type InfoModalProps = {
  show: boolean;
  isLoading: boolean;
  response: {
    success: boolean;
    message: string;
  };
  onClose: (e: React.MouseEvent) => void;
};

export default function VoteResponseModal({
  show,
  isLoading,
  response,
  onClose,
}: InfoModalProps) {
  const [shouldRender, setShouldRender] = useState(show);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      setTimeout(() => {
        setIsVisible(true);
      }, 50);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        setShouldRender(false);
      }, 300);
    }
  }, [show]);

  if (!shouldRender) {
    return null;
  } else if (isLoading) {
    return <LoadingModal message={response.message} isVisible={isVisible} />;
  } else if (response.success) {
    return <SuccessModal message={response.message} isVisible={isVisible} />;
  } else if (!response.success) {
    return (
      <ErrorModal
        message={response.message}
        isVisible={isVisible}
        onClose={onClose}
      />
    );
  }
}

type ModalProps = {
  message: string;
  isVisible: boolean;
  onClose?: (e: React.MouseEvent) => void;
};

function LoadingModal({ message, isVisible }: ModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? "" : "pointer-events-none"
      }`}
    >
      {/* Overlay con blur */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/50 to-slate-900/60 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Modal Container */}
      <div
        className={`relative z-10 w-full max-w-md transform transition-all duration-300 ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-95 opacity-0"
        }`}
      >
        {/* Card principal */}
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200/50">
          {/* Contenido */}
          <div className="px-8 py-12">
            {/* Spinner mejorado */}
            <div className="mb-3 flex justify-center">
              <div className="relative">
                <Spinner />
                {/* Anillo decorativo */}
                <div className="absolute inset-0 rounded-full border-2 border-slate-100" />
              </div>
            </div>

            {/* Mensaje */}
            <div className="text-center">
              <p className="mb-1 text-lg font-black text-slate-700">
                Guardando tu voto
              </p>
              <p className="animate-pulse text-sm leading-relaxed text-slate-500">
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessModal({ message, isVisible }: ModalProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (isVisible) {
      // Reiniciar el contador cuando el modal se hace visible
      setCountdown(5);
      setProgress(100);
      
      // Contador que se actualiza cada segundo
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            // Cuando llega a 0, redirigir
            router.push("/");
            return 0;
          }
          return prev - 1;
        });
        
        setProgress((prev) => Math.max(0, prev - 20)); // 100/5 = 20% por segundo
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [isVisible, router]);

  return (
    <div
      className={`fixed top-0 left-0 z-2000 h-full w-full transform p-4 ${
        isVisible ? "" : "pointer-events-none"
      }`}
    >
      {/* Full page Modal */}
      <div
        className={`expand-blob pointer-events-none absolute inset-0 top-1/2 left-1/2 z-10 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gradient-to-br from-[#0f69c4] via-[#0e4194] to-[#0b1934] transition-all duration-500 ${
          isVisible ? "scale-100 opacity-100" : "scale-0s opacity-0"
        }`}
        style={{
          borderRadius: "50% 50% 50% 50% / 50% 50% 50% 50%",
        }}
      />
      <div
        className={`absolute top-1/2 left-1/2 z-20 w-md max-w-[80%] -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-xl ${
          isVisible ? "opacity-100" : "opacity-0"
        } transition-all duration-300`}
      >
        {/* Modal Container */}
        <div
          className={`expand-modal relative z-10 w-full max-w-md transition-all duration-300 ${
            isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          {/* Card principal */}
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200/50">
            {/* Contenido */}
            <div className="px-8 pt-10">
              {/* Mensaje */}
              <div className="text-center">
                <p className="emoji mb-2 text-4xl">🎉</p>
                <span className="mb-1 text-lg font-black text-slate-700">
                  Gracias por Participar!
                </span>
                <p className="mb-2 text-sm leading-relaxed text-slate-400">
                  {message}
                </p>
                <p className="mb-2 text-xs text-slate-400">
                  Serás redirigido automáticamente en{" "}
                  <span className="font-semibold text-blue-600">
                    {countdown}
                  </span>{" "}
                  segundo{countdown !== 1 ? "s" : ""}...
                </p>
                
                {/* Barra de progreso */}
                <div className="mb-4 mx-auto w-32">
                  <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-1000 ease-linear"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                
                <div className="flex justify-center gap-3 rounded-b-xl px-5 pt-0 pb-10">
                  <button
                    onClick={() => router.push("/")}
                    className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 px-6 py-2 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md focus:outline-none active:scale-95"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <span className="relative">Volver al Inicio Ahora</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorModal({ message, isVisible, onClose }: ModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? "" : "pointer-events-none"
      }`}
    >
      {/* Overlay con blur */}
      <div
        className={`absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-800/50 to-slate-900/60 transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Modal Container */}
      <div
        className={`relative z-10 w-full max-w-md transform transition-all duration-300 ${
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-4 scale-95 opacity-0"
        }`}
      >
        {/* Card principal */}
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-slate-200/50">
          {/* Contenido */}
          <div className="px-8 pt-12">
            {/* Mensaje */}
            <div className="text-center">
              <p className="mb-1 text-lg font-black text-slate-700">
                Ha ocurrido un Error
              </p>
              <p className="mx-auto mb-4 max-w-[20rem] text-sm leading-relaxed text-slate-500">
                {message}
              </p>
              <div className="flex justify-center gap-3 rounded-b-xl px-5 pb-10">
                <button
                  onClick={onClose}
                  className="group relative inline-flex cursor-pointer items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 px-6 py-2 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md focus:outline-none active:scale-95"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative">Volver a Intentar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
