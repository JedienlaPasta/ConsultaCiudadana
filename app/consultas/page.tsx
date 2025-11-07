import { getSession } from "../lib/actions/auth";
import Footer from "../ui/Footer";
import SurveysList from "../ui/SurveysList";
import Navbar from "../ui/Navbar";
import SurveyFilter from "../ui/consultas/SurveyFilter";
import { getFilteredSurveysList } from "../lib/data/encuesta";
import SurveySearchBar from "../ui/consultas/SurveySearchBar";
import { Metadata } from "next";

type PageProps = {
  searchParams?: Promise<{ query?: string; filter?: string }>;
};

export default async function SurveysPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const filter = searchParams?.filter || "todas";
  const session = await getSession();
  const surveys = await getFilteredSurveysList(query, filter);

  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar session={session} />
      <Header />
      <div className="container mx-auto max-w-[80rem] flex-1 space-y-6 px-4 pt-6 pb-12 md:px-8 md:pt-8">
        <SurveyFilter defaultFilter="todas" />
        <SurveysList surveys={surveys} />
      </div>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-[#0b59a8] via-[#093d8f] to-[#0d2452] text-white">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-blue-900/30" />
      <div className="absolute top-0 right-0 size-64 translate-x-32 -translate-y-32 rounded-full bg-white/5 md:size-96 md:translate-x-48 md:-translate-y-48" />
      <div className="absolute bottom-0 left-0 size-48 -translate-x-24 translate-y-24 rounded-full bg-white/5 md:size-64 md:-translate-x-32 md:translate-y-32" />
      {/* Navbar placeholder */}
      <div className="bg-[#0e4194]s h-[72px]"></div>
      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-blue-800/30 via-[#0e4194]/30 to-[#0b1934]/40" />
      <div className="relative z-10 container mx-auto max-w-[80rem] px-4 pt-3 pb-6 md:px-8 md:pt-5 md:pb-10">
        <h1 className="text-2xl font-bold md:text-3xl">Todas las Consultas</h1>
        <div className="flex items-center text-sm">
          <span>Buscar consultas activas o terminadas</span>
        </div>
        <SurveySearchBar placeholder="Buscar por título o descripciónes" />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Todas las Consultas — Consultas Ciudadanas El Quisco",
  description:
    "Revisa todas las consultas ciudadanas activas y terminadas en El Quisco. Participa en las encuestas y ayuda a mejorar la comunidad.",
  alternates: {
    canonical: "https://participacion.munielquisco.gob.cl/consultas",
  },
  openGraph: {
    title: "Todas las Consultas — Consultas Ciudadanas El Quisco",
    description:
      "Revisa todas las consultas ciudadanas activas y terminadas en El Quisco. Participa en las encuestas y ayuda a mejorar la comunidad.",
  },
};
