import Link from "next/link";
import Hero from "./ui/home/hero";

export default function Home() {
  return (
    <>
      <div className="relatives flexs bg-slate-800s m-4s h-[calc(100vh-32px)]">
        <Hero />
        <div className="container mx-auto px-8 py-12">
          {/* <h1 className="text-5xl font-semibold text-slate-600">
            Consultas Ciudadanas - El Quisco
          </h1> */}
          <Link href="/consultas/piimep" className="text-slate-600">
            Consulta Piimep
          </Link>
        </div>
      </div>
      <div className="h-200">.</div>
    </>
  );
}
