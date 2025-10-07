export default function HowToParticipateHeader() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0b59a8] via-[#093d8f] to-[#0d2452] text-white">
      {/* Navbar placeholder */}
      <div className="h-[72px]"></div>

      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 h-full w-full">
        <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-blue-400/10 blur-xl"></div>
        <div className="absolute top-20 right-20 h-48 w-48 rounded-full bg-indigo-400/10 blur-2xl"></div>
        <div className="absolute bottom-10 left-1/3 h-24 w-24 rounded-full bg-blue-300/10 blur-lg"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-blue-800/20 via-[#0e4194]/20 to-[#0b1934]/30" />

      <div className="relative z-10 container mx-auto max-w-[45rem] px-4 pt-8 pb-16 md:px-8 md:pt-12 md:pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-4 text-3xl leading-tight font-bold md:text-5xl">
            ¿Cómo Participar?
          </h1>
          <p className="mb-8 leading-relaxed text-blue-100 md:text-lg">
            A continuación se explica brevemente el funcionamiento del proceso
            de participación en las Consultas Ciudadanas.
          </p>
        </div>
      </div>
    </div>
  );
}
