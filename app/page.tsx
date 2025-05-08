import Link from "next/link";

export default function Home() {
  return (
    <div className="flexs container mx-auto w-full flex-col items-center justify-center px-8 py-12">
      <div className="absolute left-0 -z-10 h-56 w-full bg-[#163448]">
        <video autoPlay src="/banner.mp4" />
      </div>
      <h1 className="text-4xl font-semibold text-[#e0e5ee]">
        Consultas Ciudadanas - El Quisco
      </h1>
      <Link href="/consultas/piimep" className="text-[#e0e5ee]">
        Consulta Piimep
      </Link>
    </div>
  );
}
