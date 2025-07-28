import { getSession } from "../lib/actions/auth";
import Footer from "../ui/Footer";
import SurveysList from "../ui/SurveysList";
import Navbar from "../ui/Navbar";
import SurveyFilter from "../ui/consultas/SurveyFilter";
import { getSurveysList } from "../lib/data/encuesta";

export default async function SurveysPage() {
  const session = await getSession();
  const surveys = await getSurveysList();

  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar isLoggedIn={session !== null} />
      <Header />
      <div className="container mx-auto max-w-[80rem] flex-1 space-y-6 px-8 py-12">
        <SurveyFilter />
        <SurveysList surveys={surveys} />
      </div>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="bg-[#0A4C8A] text-white">
      {/* Navbar placeholder */}
      <div className="h-[68px] bg-[#0A4581]"></div>
      <div className="container mx-auto max-w-[80rem] space-y-2 px-4 py-6 md:px-8 md:py-8">
        <h1 className="text-2xl font-bold md:text-3xl">Todas las Consultas</h1>
        <div className="flex items-center text-sm">
          <span>Buscar consultas activas o terminadas</span>
        </div>
        <SurveySearchBar />
      </div>
    </div>
  );
}

function SurveySearchBar() {
  return (
    <div className="relative mt-4">
      <div className="relative flex items-center">
        {/* Search Icon */}
        <div className="absolute left-3 z-10 flex items-center">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Buscar por título o descripción"
          className="w-full rounded-lg border border-gray-300 bg-white py-3 pr-4 pl-10 text-slate-700 placeholder-gray-400 shadow-lg transition-all duration-200 hover:shadow-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />

        {/* Clear text button */}
        <button className="hover absolute right-3 cursor-pointer rounded-full p-0.5 text-gray-400 hover:bg-gray-300 hover:text-gray-600">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
