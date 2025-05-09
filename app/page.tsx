import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="relative">
        <div className="absolute top-0 left-0 -z-10 h-full w-full">
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
        <div className="bg-[#163448]s container mx-auto w-full flex-col px-8 py-70">
          <h1 className="text-5xl font-semibold text-white">
            Consultas Ciudadanas - El Quisco
          </h1>
          <Link href="/consultas/piimep" className="text-white">
            Consulta Piimep
          </Link>
        </div>
      </div>
      <div className="h-200">.</div>
    </>
  );
}
