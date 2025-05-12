import Link from "next/link";
import Hero from "./ui/home/hero";
import SurveysList from "./ui/home/surveysList";

export default function Home() {
  return (
    <>
      <div className="relatives flexs bg-slate-800s m-4s h-[calc(100vh-32px)]s">
        <Hero />
        <div className="container mx-auto max-w-[80rem] px-8 py-12">
          {/* <Link href="/consultas/piimep" className="text-slate-600">
            Consulta Piimep
          </Link> */}
          <SurveysList />
        </div>
      </div>
      <div className="h-200">.</div>
    </>
  );
}
