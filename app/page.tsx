import Image from "next/image";
import Navbar from "./ui/Navbar";
import Hero from "./ui/home/HeroHome";
import SurveysList from "./ui/home/SurveysListHome";
import Footer from "./ui/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative">
        <div className="relatives flexs bg-slate-800s m-4s h-[calc(100vh-32px)]s">
          <Hero />
          <div className="container mx-auto max-w-[80rem] px-8 py-12">
            <SurveysList />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
