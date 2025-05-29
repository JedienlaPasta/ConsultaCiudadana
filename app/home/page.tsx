import Hero from "@/app/ui/home/Hero";
import SurveysList from "@/app/ui/home/SurveysList";
import Navbar from "@/app/ui/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relatives flexs bg-slate-800s m-4s h-[calc(100vh-32px)]s">
        <Hero />
        <div className="container mx-auto max-w-[80rem] px-8 py-12">
          <SurveysList />
        </div>
      </div>
      <div className="h-200">.</div>
    </>
  );
}
